import { Router, Request, Response } from 'express';
import { eq, desc, sql, and } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';
import { clips, tiktokLikes, users, coinTransactions } from '../db/schema';
import { resolveUser } from '../utils/resolveUser';

const router = Router();

const LIKE_COST = 1;

/** GET /api/tiktok/latest – latest TikTok clips from DB */
router.get('/latest', async (req: Request, res: Response) => {
  const limit = Math.min(parseInt((req.query['limit'] as string) ?? '12', 10), 50);
  const offset = Math.max(parseInt((req.query['offset'] as string) ?? '0', 10), 0);

  try {
    const rows = await db
      .select({
        id: clips.id,
        title: clips.title,
        thumbnail: clips.thumbnail,
        url: clips.url,
        tiktokId: clips.tiktokId,
        likes: clips.likes,
        createdAt: clips.createdAt,
      })
      .from(clips)
      .where(eq(clips.source, 'tiktok'))
      .orderBy(desc(clips.createdAt))
      .limit(limit)
      .offset(offset);

    return res.json({ clips: rows });
  } catch (err) {
    console.error('[tiktok/latest]', err);
    return res.json({ clips: [] });
  }
});

/** POST /api/tiktok/like – like a TikTok clip (costs 1 JOJOJO Coin) */
router.post('/like', async (req: Request, res: Response) => {
  const bodySchema = z.object({
    clipId: z.string().uuid(),
    userId: z.string().uuid().optional(),
    email: z.string().email().optional(),
  }).refine((d) => d.userId || d.email, { message: 'userId or email is required' });

  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors });
  }

  const { clipId } = parsed.data;

  try {
    const user = await resolveUser(parsed.data.userId, parsed.data.email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check clip exists
    const [clip] = await db.select({ id: clips.id, likes: clips.likes }).from(clips).where(eq(clips.id, clipId));
    if (!clip) return res.status(404).json({ error: 'Clip not found' });

    // Check for existing like
    const [existing] = await db
      .select({ id: tiktokLikes.id })
      .from(tiktokLikes)
      .where(and(eq(tiktokLikes.userId, user.id), eq(tiktokLikes.clipId, clipId)));
    if (existing) {
      return res.status(409).json({ error: 'Already liked', likes: clip.likes });
    }

    // Check coin balance
    if ((user.coins ?? 0) < LIKE_COST) {
      return res.status(402).json({
        error: 'Not enough coins',
        required: LIKE_COST,
        balance: user.coins ?? 0,
      });
    }

    // Deduct coin
    await db
      .update(users)
      .set({ coins: sql`${users.coins} - ${LIKE_COST}` })
      .where(eq(users.id, user.id));

    await db.insert(coinTransactions).values({
      userId: user.id,
      amount: -LIKE_COST,
      type: 'tiktok_like',
      reason: 'TikTok Clip geliket',
    });

    // Record like and increment counter
    await db.insert(tiktokLikes).values({ userId: user.id, clipId });

    const [updated] = await db
      .update(clips)
      .set({ likes: sql`${clips.likes} + 1` })
      .where(eq(clips.id, clipId))
      .returning({ likes: clips.likes });

    return res.json({ success: true, likes: updated?.likes ?? clip.likes + 1 });
  } catch (err) {
    console.error('[tiktok/like]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/** GET /api/tiktok/liked – check which clips a user has already liked */
router.get('/liked', async (req: Request, res: Response) => {
  const userId = req.query['userId'] as string | undefined;
  const email = req.query['email'] as string | undefined;

  try {
    const user = await resolveUser(userId, email);
    if (!user) return res.json({ likedClipIds: [] });

    const rows = await db
      .select({ clipId: tiktokLikes.clipId })
      .from(tiktokLikes)
      .where(eq(tiktokLikes.userId, user.id));

    return res.json({ likedClipIds: rows.map((r) => r.clipId) });
  } catch (err) {
    console.error('[tiktok/liked]', err);
    return res.json({ likedClipIds: [] });
  }
});

export default router;
