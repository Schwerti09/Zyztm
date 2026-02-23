import { Router, Request, Response } from 'express';
import { eq, like, sql, desc } from 'drizzle-orm';
import { db } from '../../db';
import { users, purchases } from '../../db/schema';
import { requireAdmin } from './middleware';

const router = Router();

router.get('/', requireAdmin, async (req: Request, res: Response) => {
  try {
    const search = req.query['search'] as string | undefined;
    const page = Math.max(1, parseInt((req.query['page'] as string) || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt((req.query['limit'] as string) || '20', 10)));
    const offset = (page - 1) * limit;

    const conditions = search ? like(users.email, `%${search}%`) : undefined;

    const rows = await db
      .select({
        id: users.id,
        email: users.email,
        stripeCustomerId: users.stripeCustomerId,
        credits: users.credits,
        coins: users.coins,
        createdAt: users.createdAt,
        isAdmin: users.isAdmin,
        isBanned: users.isBanned,
        bannedReason: users.bannedReason,
      })
      .from(users)
      .where(conditions)
      .orderBy(desc(users.createdAt))
      .limit(limit)
      .offset(offset);

    const totalResult = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(users)
      .where(conditions);

    const total = totalResult[0]?.count ?? 0;
    res.json({ users: rows, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        stripeCustomerId: users.stripeCustomerId,
        credits: users.credits,
        coins: users.coins,
        createdAt: users.createdAt,
        isAdmin: users.isAdmin,
        isBanned: users.isBanned,
        bannedReason: users.bannedReason,
      })
      .from(users)
      .where(eq(users.id, id));

    if (!user) return res.status(404).json({ error: 'User not found' });

    const [purchaseCount] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(purchases)
      .where(eq(purchases.userId, id));

    return res.json({ ...user, purchasesCount: purchaseCount?.count ?? 0 });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { credits, isBanned, bannedReason, isAdmin } = req.body as {
      credits?: number;
      isBanned?: boolean;
      bannedReason?: string | null;
      isAdmin?: boolean;
    };

    const updateData: Partial<{
      credits: number;
      isBanned: boolean;
      bannedReason: string | null;
      isAdmin: boolean;
    }> = {};
    if (credits !== undefined) updateData.credits = credits;
    if (isBanned !== undefined) updateData.isBanned = isBanned;
    if (bannedReason !== undefined) updateData.bannedReason = bannedReason;
    if (isAdmin !== undefined) updateData.isAdmin = isAdmin;

    const [updated] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, id))
      .returning();

    if (!updated) return res.status(404).json({ error: 'User not found' });
    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:id/add-credits', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { credits } = req.body as { credits: number };

    if (typeof credits !== 'number' || credits <= 0) {
      return res.status(400).json({ error: 'credits must be a positive number' });
    }

    const [updated] = await db
      .update(users)
      .set({ credits: sql`${users.credits} + ${credits}` })
      .where(eq(users.id, id))
      .returning();

    if (!updated) return res.status(404).json({ error: 'User not found' });
    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
