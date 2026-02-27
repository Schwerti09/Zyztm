// REAL-TIME LIVE STATS 2026: React hook – connects to SSE stream and exposes live stats
import { useState, useEffect, useRef } from 'react';

export interface LiveStatsData {
  totalChecks: number;
  exposedInstances: number;
  authBypassRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  checksToday: number;
  activeUsers: number;
  lastUpdated: string;
}

// REAL-TIME LIVE STATS 2026: Fallback values shown while connecting or after disconnect
const DEFAULT_STATS: LiveStatsData = {
  totalChecks: 128457,
  exposedInstances: 21639,
  authBypassRisk: 'LOW',
  checksToday: 0,
  activeUsers: 0,
  lastUpdated: new Date().toISOString(),
};

// REAL-TIME LIVE STATS 2026: Format number in German dot-separated style (128.457)
export function formatGermanNumber(num: number): string {
  return num.toLocaleString('de-DE');
}

export type FlashType = 'green' | 'red' | null;

export function useLiveStats() {
  const [stats, setStats] = useState<LiveStatsData>(DEFAULT_STATS);
  const [connected, setConnected] = useState(false);
  // REAL-TIME LIVE STATS 2026: Flash state for green/red number animations
  const [flash, setFlash] = useState<FlashType>(null);
  const prevChecks = useRef(DEFAULT_STATS.totalChecks);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // REAL-TIME LIVE STATS 2026: Open EventSource connection to SSE endpoint
    const es = new EventSource('/api/live-stats');

    es.onopen = () => setConnected(true);

    es.onmessage = (event: MessageEvent) => {
      try {
        const data: LiveStatsData = JSON.parse(event.data);

        // REAL-TIME LIVE STATS 2026: Trigger green flash when checks increase
        if (data.totalChecks > prevChecks.current) {
          setFlash('green');
          if (flashTimer.current) clearTimeout(flashTimer.current);
          flashTimer.current = setTimeout(() => setFlash(null), 1200);
        }
        prevChecks.current = data.totalChecks;

        setStats(data);
      } catch (err) {
        // Keep last known values on parse errors; log for debugging
        console.error('[useLiveStats] Failed to parse SSE data:', err);
      }
    };

    // REAL-TIME LIVE STATS 2026: Fallback – keep last known values on disconnect
    es.onerror = () => {
      setConnected(false);
      es.close();
    };

    return () => {
      es.close();
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, []);

  return { stats, connected, flash, formatGermanNumber };
}
