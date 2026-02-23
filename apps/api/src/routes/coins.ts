import { Router, Request, Response } from 'express';
import { eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';
import { users, coinTransactions } from '../db/schema';
import { PRODUCTS } from '@zyztm/shared-types';
import { resolveUser } from '../utils/resolveUser';

const router = Router();

const userLookupSchema = z.object({
  userId: z.string().uuid().optional(),
  email: z.string().email().optional(),
}).refine((d) => d.userId || d.email, { message: 'userId or email is required' });

router.get('/balance', async (req: Request, res: Response) => {
  try {
    const userId = req.query['userId'] as string | undefined;
    const email = req.query['email'] as string | undefined;

    const user = await resolveUser(userId, email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.json({ coins: user.coins, userId: user.id, email: user.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/daily-bonus', async (req: Request, res: Response) => {
  try {
    const parsed = userLookupSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

    const user = await resolveUser(parsed.data.userId, parsed.data.email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const now = new Date();
    const lastLogin = user.lastLogin;
    if (lastLogin) {
      const lastLoginDate = new Date(lastLogin);
      const isSameDay =
        lastLoginDate.getFullYear() === now.getFullYear() &&
        lastLoginDate.getMonth() === now.getMonth() &&
        lastLoginDate.getDate() === now.getDate();
      if (isSameDay) {
        return res.status(409).json({ error: 'Bonus already claimed today', coins: user.coins });
      }
    }

    const DAILY_BONUS = 10;
    const [updated] = await db
      .update(users)
      .set({
        coins: sql`${users.coins} + ${DAILY_BONUS}`,
        lastLogin: now,
      })
      .where(eq(users.id, user.id))
      .returning({ coins: users.coins });

    await db.insert(coinTransactions).values({
      userId: user.id,
      amount: DAILY_BONUS,
      type: 'daily_bonus',
      reason: 'Täglicher Bonus',
    });

    return res.json({ coins: updated?.coins ?? user.coins + DAILY_BONUS, bonusAwarded: DAILY_BONUS });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/buy', async (req: Request, res: Response) => {
  try {
    const bodySchema = z.object({
      productId: z.string(),
      userId: z.string().uuid().optional(),
      email: z.string().email().optional(),
    }).refine((d) => d.userId || d.email, { message: 'userId or email is required' });

    const parsed = bodySchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

    const { productId } = parsed.data;
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const user = await resolveUser(parsed.data.userId, parsed.data.email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.coins < product.coinPrice) {
      return res.status(402).json({
        error: 'Not enough coins',
        required: product.coinPrice,
        balance: user.coins,
      });
    }

    const [updated] = await db
      .update(users)
      .set({ coins: sql`${users.coins} - ${product.coinPrice}` })
      .where(eq(users.id, user.id))
      .returning({ coins: users.coins });

    await db.insert(coinTransactions).values({
      userId: user.id,
      amount: -product.coinPrice,
      type: 'purchase',
      reason: `Kauf: ${product.name}`,
      productId,
    });

    return res.json({
      success: true,
      product: product.name,
      coinsSpent: product.coinPrice,
      remainingCoins: updated?.coins ?? user.coins - product.coinPrice,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
