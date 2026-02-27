// REAL-TIME LIVE STATS 2026: SSE endpoint – streams live stats to all connected clients
import { Router, Request, Response } from 'express';
import { liveStats, LiveStatsData } from '../lib/live-stats';

const router = Router();

// REAL-TIME LIVE STATS 2026: GET /api/live-stats  →  Server-Sent Events stream
router.get('/', (req: Request, res: Response) => {
  // REAL-TIME LIVE STATS 2026: Required SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // REAL-TIME LIVE STATS 2026: Push helper – serialises stats to SSE data frame
  const sendStats = (data: LiveStatsData): void => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Send current snapshot immediately on connect
  sendStats(liveStats.get());

  // REAL-TIME LIVE STATS 2026: Subscribe for instant push on every check
  const unsubscribe = liveStats.subscribe(sendStats);

  // Also broadcast every 3 seconds to keep connections alive
  const interval = setInterval(() => sendStats(liveStats.get()), 3000);

  // REAL-TIME LIVE STATS 2026: Cleanup when client disconnects
  req.on('close', () => {
    unsubscribe();
    clearInterval(interval);
  });
});

export default router;
