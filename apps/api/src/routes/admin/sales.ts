import { Router, Request, Response } from 'express';
import { eq, sql, desc, gte, and } from 'drizzle-orm';
import { db } from '../../db';
import { purchases, users } from '../../db/schema';
import { requireAdmin } from './middleware';

const router = Router();

router.get('/stats', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const [revenue] = await db
      .select({ total: sql<number>`coalesce(sum(${purchases.amount}), 0)::int` })
      .from(purchases)
      .where(eq(purchases.status, 'completed'));

    const [total] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(purchases);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [todayRow] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(purchases)
      .where(gte(purchases.createdAt, today));

    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const [monthRow] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(purchases)
      .where(gte(purchases.createdAt, monthStart));

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const revenueByDay = await db
      .select({
        date: sql<string>`date(${purchases.createdAt})::text`,
        revenue: sql<number>`coalesce(sum(${purchases.amount}), 0)::int`,
      })
      .from(purchases)
      .where(and(gte(purchases.createdAt, thirtyDaysAgo), eq(purchases.status, 'completed')))
      .groupBy(sql`date(${purchases.createdAt})`)
      .orderBy(sql`date(${purchases.createdAt})`);

    const salesByProduct = await db
      .select({
        productId: purchases.productId,
        count: sql<number>`count(*)::int`,
        revenue: sql<number>`coalesce(sum(${purchases.amount}), 0)::int`,
      })
      .from(purchases)
      .where(eq(purchases.status, 'completed'))
      .groupBy(purchases.productId);

    res.json({
      totalRevenue: revenue?.total ?? 0,
      totalSales: total?.count ?? 0,
      todaySales: todayRow?.count ?? 0,
      monthlySales: monthRow?.count ?? 0,
      revenueByDay,
      salesByProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', requireAdmin, async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt((req.query['page'] as string) || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt((req.query['limit'] as string) || '20', 10)));
    const offset = (page - 1) * limit;
    const status = req.query['status'] as string | undefined;

    const condition = status
      ? eq(purchases.status, status as 'pending' | 'completed' | 'refunded')
      : undefined;

    const rows = await db
      .select({
        id: purchases.id,
        userId: purchases.userId,
        userEmail: users.email,
        productId: purchases.productId,
        stripePaymentIntent: purchases.stripePaymentIntent,
        amount: purchases.amount,
        status: purchases.status,
        createdAt: purchases.createdAt,
      })
      .from(purchases)
      .leftJoin(users, eq(purchases.userId, users.id))
      .where(condition)
      .orderBy(desc(purchases.createdAt))
      .limit(limit)
      .offset(offset);

    const [totalRow] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(purchases)
      .where(condition);

    const total = totalRow?.count ?? 0;
    res.json({ sales: rows, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/:id/refund', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await db
      .update(purchases)
      .set({ status: 'refunded' })
      .where(eq(purchases.id, id))
      .returning();

    if (!updated) return res.status(404).json({ error: 'Purchase not found' });
    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
