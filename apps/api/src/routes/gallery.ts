import { Router, Request, Response } from 'express';
import { desc } from 'drizzle-orm';
import { db } from '../db';
import { clips } from '../db/schema';

const router = Router();

/** GET /api/gallery – latest 10 clips sorted by date */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const rows = await db
      .select({
        id: clips.id,
        title: clips.title,
        thumbnail: clips.thumbnail,
        url: clips.url,
        source: clips.source,
        views: clips.views,
        createdAt: clips.createdAt,
      })
      .from(clips)
      .orderBy(desc(clips.createdAt))
      .limit(10);

    return res.json({ clips: rows });
  } catch (err) {
    console.error('[gallery]', err);
    return res.json({ clips: [] });
  }
});

export default router;
