// REAL-TIME LIVE STATS 2026: Check endpoint – records each security check and updates live stats
import { Router, Request, Response } from 'express';
import { liveStats } from '../lib/live-stats';

const router = Router();

// REAL-TIME LIVE STATS 2026: POST /api/check  →  perform a check and push updated stats
router.post('/', (req: Request, res: Response) => {
  const { target } = req.body as { target?: string };

  if (!target || typeof target !== 'string' || target.trim() === '') {
    return res.status(400).json({ error: 'target is required' });
  }

  // REAL-TIME LIVE STATS 2026: Atomic increment – every check updates the global counter
  liveStats.incrementTotalChecks(1);

  // Placeholder exposure detection (replace with real logic later)
  // ~15% mock rate simulates real-world auth-bypass exposure frequency
  const MOCK_EXPOSURE_RATE = 0.15;
  const isExposed = Math.random() < MOCK_EXPOSURE_RATE;
  if (isExposed) {
    liveStats.incrementExposed(1);
  }

  const stats = liveStats.get();

  return res.json({
    success: true,
    target: target.trim(),
    isExposed,
    riskLevel: stats.authBypassRisk,
    stats,
  });
});

export default router;
