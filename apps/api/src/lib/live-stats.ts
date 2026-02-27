// REAL-TIME LIVE STATS 2026: Central in-memory store for live platform statistics
// Redis-ready architecture: swap liveStats instance for a Redis adapter later

export interface LiveStatsData {
  totalChecks: number;
  exposedInstances: number;
  authBypassRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  checksToday: number;
  activeUsers: number;
  lastUpdated: string;
}

// REAL-TIME LIVE STATS 2026: Atomic increment store – single source of truth
class LiveStatsStore {
  private data: LiveStatsData = {
    totalChecks: 128457,      // platform baseline
    exposedInstances: 21639,  // baseline exposed instances
    authBypassRisk: 'LOW',
    checksToday: 0,
    activeUsers: 0,
    lastUpdated: new Date().toISOString(),
  };

  // REAL-TIME LIVE STATS 2026: SSE subscriber registry
  private subscribers = new Set<(data: LiveStatsData) => void>();

  /** Return a snapshot of current stats */
  get(): LiveStatsData {
    return { ...this.data };
  }

  /** Increment total checks and today's checks, then push update */
  incrementTotalChecks(amount = 1): void {
    this.data.totalChecks += amount;
    this.data.checksToday += amount;
    this.data.lastUpdated = new Date().toISOString();
    this.recalculateRisk();
    this.notifySubscribers();
  }

  /** Increment exposed instances count, then push update */
  incrementExposed(amount = 1): void {
    this.data.exposedInstances += amount;
    this.data.lastUpdated = new Date().toISOString();
    this.recalculateRisk();
    this.notifySubscribers();
  }

  /** Update active user count */
  setActiveUsers(count: number): void {
    this.data.activeUsers = count;
    this.data.lastUpdated = new Date().toISOString();
    this.notifySubscribers();
  }

  // REAL-TIME LIVE STATS 2026: Dynamic risk level based on exposure ratio
  // Thresholds: >30% CRITICAL, >20% HIGH, >10% MEDIUM, ≤10% LOW
  private recalculateRisk(): void {
    const ratio = this.data.exposedInstances / Math.max(this.data.totalChecks, 1);
    if (ratio > 0.3) this.data.authBypassRisk = 'CRITICAL';
    else if (ratio > 0.2) this.data.authBypassRisk = 'HIGH';
    else if (ratio > 0.1) this.data.authBypassRisk = 'MEDIUM';
    else this.data.authBypassRisk = 'LOW';
  }

  /** Subscribe to stat changes; returns unsubscribe function */
  subscribe(callback: (data: LiveStatsData) => void): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notifySubscribers(): void {
    const snapshot = this.get();
    this.subscribers.forEach((cb) => cb(snapshot));
  }

  /** Reset today's check counter – call at midnight */
  resetDailyStats(): void {
    this.data.checksToday = 0;
    this.data.lastUpdated = new Date().toISOString();
  }
}

// REAL-TIME LIVE STATS 2026: Singleton store exported for use across routes
export const liveStats = new LiveStatsStore();
