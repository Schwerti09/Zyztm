import { Router, Request, Response } from 'express';
import { db } from '../db/index';
import { featureVotes } from '../db/schema';
import { eq, sql } from 'drizzle-orm';

const router = Router();

const FEATURES: Record<string, string> = {
  battle_royale_coaching: '🎯 Battle Royale Coaching Sessions',
  merch_store: '👕 Merch Store',
  custom_emotes: '😎 Custom Emotes Pack',
  irl_streams: '📡 IRL Streams',
  tournament_system: '🏆 Community Tournaments',
  clip_contests: '🎬 Clip Contest System',
};

// GET /api/vote - get current vote counts
router.get('/', async (_req: Request, res: Response) => {
  try {
    const counts = await db
      .select({ featureId: featureVotes.featureId, count: sql<number>`count(*)::int` })
      .from(featureVotes)
      .groupBy(featureVotes.featureId);

    const result = Object.entries(FEATURES).map(([id, label]) => {
      const entry = counts.find((c) => c.featureId === id);
      return { id, label, votes: entry?.count ?? 0 };
    });

    return res.json(result);
  } catch {
    // If DB is unavailable, return static fallback
    const fallback = Object.entries(FEATURES).map(([id, label]) => ({
      id,
      label,
      votes: 0,
    }));
    return res.json(fallback);
  }
});

// POST /api/vote - cast a vote
router.post('/', async (req: Request, res: Response) => {
  const { featureId } = req.body as { featureId?: string };

  if (!featureId || !FEATURES[featureId]) {
    return res.status(400).json({ error: 'Ungültiges Feature' });
  }

  const voterIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown';

  try {
    // We allow one vote per IP per feature - check by composite
    const alreadyVoted = await db
      .select({ id: featureVotes.id })
      .from(featureVotes)
      .where(
        sql`${featureVotes.featureId} = ${featureId} AND ${featureVotes.voterIp} = ${voterIp}`,
      )
      .limit(1);

    if (alreadyVoted.length > 0) {
      return res.status(409).json({ error: 'Bereits abgestimmt' });
    }

    await db.insert(featureVotes).values({ featureId, voterIp });

    const [countResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(featureVotes)
      .where(eq(featureVotes.featureId, featureId));

    if (!countResult) {
      return res.status(500).json({ error: 'Datenbankfehler' });
    }

    return res.json({ success: true, featureId, votes: countResult.count });
  } catch {
    return res.status(500).json({ error: 'Datenbankfehler' });
  }
});

export default router;
