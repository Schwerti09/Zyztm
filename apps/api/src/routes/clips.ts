import { Router, Request, Response } from 'express';
import { eq, desc, sql } from 'drizzle-orm';
import { db } from '../db';
import { clips } from '../db/schema';

const router = Router();

/** GET /api/clips/top – top 5 clips by views */
router.get('/top', async (_req: Request, res: Response) => {
  try {
    const rows = await db
      .select({
        id: clips.id,
        title: clips.title,
        thumbnail: clips.thumbnail,
        url: clips.url,
        views: clips.views,
        productTag: clips.productTag,
        createdAt: clips.createdAt,
      })
      .from(clips)
      .orderBy(desc(clips.views))
      .limit(5);

    return res.json({ clips: rows });
  } catch (err) {
    console.error('[clips/top]', err);
    return res.json({ clips: [] });
  }
});

/** GET /api/clips/by-tag?tag=:tag – random clip for a product tag */
router.get('/by-tag', async (req: Request, res: Response) => {
  const tag = (req.query['tag'] as string | undefined)?.trim();
  if (!tag) {
    return res.status(400).json({ error: 'Missing ?tag= query parameter' });
  }

  try {
    const [row] = await db
      .select({
        id: clips.id,
        title: clips.title,
        thumbnail: clips.thumbnail,
        url: clips.url,
        views: clips.views,
      })
      .from(clips)
      .where(eq(clips.productTag, tag))
      .orderBy(sql`RANDOM()`)
      .limit(1);

    if (!row) {
      return res.json({ clip: null, fallback: true, message: `No clips found for tag "${tag}"` });
    }

    return res.json({ clip: row, fallback: false });
  } catch (err) {
    console.error('[clips/by-tag]', err);
    return res.json({ clip: null, fallback: true, message: 'Database unavailable' });
  }
});

export default router;
