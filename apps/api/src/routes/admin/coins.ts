import { Router, Request, Response } from 'express';
import { sql } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../../db';
import { users, coinTransactions } from '../../db/schema';
import { requireAdmin } from './middleware';
import { resolveUser } from '../../utils/resolveUser';

const router = Router();

const giveCoinsSchema = z.object({
  userId: z.string().uuid().optional(),
  email: z.string().email().optional(),
  amount: z.number().int().positive(),
  reason: z.string().min(1),
}).refine((d) => d.userId || d.email, { message: 'userId or email is required' });

router.post('/give', requireAdmin, async (req: Request, res: Response) => {
  try {
    const parsed = giveCoinsSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

    const { amount, reason } = parsed.data;

    const user = await resolveUser(parsed.data.userId, parsed.data.email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const [updated] = await db
      .update(users)
      .set({ coins: sql`${users.coins} + ${amount}` })
      .where(sql`${users.id} = ${user.id}`)
      .returning({ id: users.id, email: users.email, coins: users.coins });

    await db.insert(coinTransactions).values({
      userId: user.id,
      amount,
      type: 'admin_gift',
      reason,
    });

    return res.json({ success: true, userId: updated?.id, email: updated?.email, coins: updated?.coins });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
