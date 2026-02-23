import { Router, Request, Response } from 'express';
import { sql, eq, desc } from 'drizzle-orm';
import { db } from '../../db';
import { pageViews, purchases, users } from '../../db/schema';
import { requireAdmin } from './middleware';

const router = Router();

router.get('/pageviews', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const rows = await db
      .select({
        path: pageViews.path,
        count: sql<number>`count(*)::int`,
      })
      .from(pageViews)
      .groupBy(pageViews.path)
      .orderBy(desc(sql`count(*)`));

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/export', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const rows = await db
      .select({
        id: purchases.id,
        userId: purchases.userId,
        userEmail: users.email,
        productId: purchases.productId,
        amount: purchases.amount,
        status: purchases.status,
        createdAt: purchases.createdAt,
      })
      .from(purchases)
      .leftJoin(users, eq(purchases.userId, users.id))
      .orderBy(desc(purchases.createdAt));

    const header = 'id,userId,userEmail,productId,amount,status,createdAt\n';
    const csvRows = rows.map((r) =>
      [
        r.id,
        r.userId,
        r.userEmail ?? '',
        r.productId,
        r.amount,
        r.status,
        r.createdAt.toISOString(),
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(',')
    );

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=purchases.csv');
    res.send(header + csvRows.join('\n'));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// No requireAdmin — public tracking endpoint
router.post('/track', async (req: Request, res: Response) => {
  try {
    const { path, userId, sessionId } = req.body as {
      path: string;
      userId?: string;
      sessionId?: string;
    };

    if (!path || typeof path !== 'string' || path.length > 2048) {
      return res.status(400).json({ error: 'path is required and must be under 2048 characters' });
    }

    const sanitizedPath = path.trim();
    const sanitizedSessionId =
      sessionId && typeof sessionId === 'string' ? sessionId.slice(0, 255) : null;

    await db.insert(pageViews).values({
      path: sanitizedPath,
      userId: userId ?? null,
      sessionId: sanitizedSessionId,
    });
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
