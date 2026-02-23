import { Router, Request, Response } from 'express';
import { eq, sql } from 'drizzle-orm';
import { db } from '../../db';
import { purchases } from '../../db/schema';
import { requireAdmin } from './middleware';
import { PRODUCTS } from '@zyztm/shared-types';

const router = Router();

router.get('/', requireAdmin, async (_req: Request, res: Response) => {
  try {
    const salesByProduct = await db
      .select({
        productId: purchases.productId,
        count: sql<number>`count(*)::int`,
        revenue: sql<number>`coalesce(sum(${purchases.amount}), 0)::int`,
      })
      .from(purchases)
      .where(eq(purchases.status, 'completed'))
      .groupBy(purchases.productId);

    const salesMap = new Map<string, { count: number; revenue: number }>(
      salesByProduct.map((s) => [s.productId, { count: s.count, revenue: s.revenue }])
    );

    const enriched = PRODUCTS.map((p) => ({
      ...p,
      salesCount: salesMap.get(p.id)?.count ?? 0,
      revenue: salesMap.get(p.id)?.revenue ?? 0,
    }));

    res.json(enriched);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, description } = req.body as {
    name?: string;
    price?: number;
    description?: string;
  };
  // Products are static in shared-types; acknowledge update for future extension
  res.json({ success: true, id, name, price, description });
});

router.post('/test-purchase', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { productId, userId } = req.body as { productId: string; userId: string };

    if (!productId || !userId) {
      return res.status(400).json({ error: 'productId and userId are required' });
    }

    const [purchase] = await db
      .insert(purchases)
      .values({
        userId,
        productId,
        stripePaymentIntent: `test_admin_${Date.now()}`,
        amount: 0,
        status: 'completed',
      })
      .returning();

    return res.json(purchase);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
