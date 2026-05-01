/**
 * Subscription Service — Paywall-System
 *
 * Verwaltet User-Subscription-Status, Limits und Premium-Features.
 */

export type SubscriptionTier = 'free' | 'pro' | 'elite';

export interface SubscriptionLimits {
  sensitivityConversions: number;
  loadoutOptimizations: number;
  statsLookups: number;
  dropLocationAnalysis: number;
  buildTrainerDrills: number;
  metaPredictions: number;
  rotationPlans: number;
  keybindOptimizations: number;
}

export interface SubscriptionFeatures {
  unlimitedTools: boolean;
  weeklyReports: boolean;
  discountPercentage: number;
  prioritySupport: boolean;
  adFree: boolean;
  earlyAccess: boolean;
  coachingSessions: number;
  customConfig: boolean;
}

export const FREE_DAILY_LIMITS: SubscriptionLimits = {
  sensitivityConversions: 10,
  loadoutOptimizations: 5,
  statsLookups: 3,
  dropLocationAnalysis: 5,
  buildTrainerDrills: 10,
  metaPredictions: 1,
  rotationPlans: 1,
  keybindOptimizations: 3,
};

const PRO_FEATURES: SubscriptionFeatures = {
  unlimitedTools: true,
  weeklyReports: true,
  discountPercentage: 10,
  prioritySupport: true,
  adFree: true,
  earlyAccess: false,
  coachingSessions: 0,
  customConfig: false,
};

const ELITE_FEATURES: SubscriptionFeatures = {
  unlimitedTools: true,
  weeklyReports: true,
  discountPercentage: 10,
  prioritySupport: true,
  adFree: true,
  earlyAccess: true,
  coachingSessions: 1,
  customConfig: true,
};

const STORAGE_KEY = 'nexus-subscription-v1';
const USAGE_KEY = 'nexus-usage-v1';

interface StoredSubscription {
  tier: SubscriptionTier;
  expiresAt: string | null;
}

interface StoredUsage {
  date: string; // YYYY-MM-DD
  sensitivityConversions: number;
  loadoutOptimizations: number;
  statsLookups: number;
  dropLocationAnalysis: number;
  buildTrainerDrills: number;
  metaPredictions: number;
  rotationPlans: number;
  keybindOptimizations: number;
}

function loadSubscription(): StoredSubscription {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { tier: 'free', expiresAt: null };
  } catch {
    return { tier: 'free', expiresAt: null };
  }
}

function saveSubscription(sub: StoredSubscription) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sub));
  } catch {
    // ignore
  }
}

function loadUsage(): StoredUsage {
  try {
    const raw = localStorage.getItem(USAGE_KEY);
    const today = new Date().toISOString().split('T')[0];
    
    if (raw) {
      const stored = JSON.parse(raw);
      if (stored.date === today) {
        return stored;
      }
    }
    
    // Reset für neuen Tag
    return {
      date: today,
      sensitivityConversions: 0,
      loadoutOptimizations: 0,
      statsLookups: 0,
      dropLocationAnalysis: 0,
      buildTrainerDrills: 0,
      metaPredictions: 0,
      rotationPlans: 0,
      keybindOptimizations: 0,
    };
  } catch {
    const today = new Date().toISOString().split('T')[0];
    return {
      date: today,
      sensitivityConversions: 0,
      loadoutOptimizations: 0,
      statsLookups: 0,
      dropLocationAnalysis: 0,
      buildTrainerDrills: 0,
      metaPredictions: 0,
      rotationPlans: 0,
      keybindOptimizations: 0,
    };
  }
}

function saveUsage(usage: StoredUsage) {
  try {
    localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
  } catch {
    // ignore
  }
}

/**
 * Prüft ob User Premium-Features hat.
 */
export function isPremium(): boolean {
  const sub = loadSubscription();
  return sub.tier === 'pro' || sub.tier === 'elite';
}

/**
 * Prüft ob User Elite-Features hat.
 */
export function isElite(): boolean {
  const sub = loadSubscription();
  return sub.tier === 'elite';
}

/**
 * Holt aktuelle Subscription-Tier.
 */
export function getSubscriptionTier(): SubscriptionTier {
  const sub = loadSubscription();
  
  // Prüfe ob Subscription abgelaufen ist
  if (sub.expiresAt && new Date(sub.expiresAt) < new Date()) {
    saveSubscription({ tier: 'free', expiresAt: null });
    return 'free';
  }
  
  return sub.tier;
}

/**
 * Holt Features für aktuellen Tier.
 */
export function getSubscriptionFeatures(): SubscriptionFeatures {
  const tier = getSubscriptionTier();
  if (tier === 'elite') return ELITE_FEATURES;
  if (tier === 'pro') return PRO_FEATURES;
  return {
    unlimitedTools: false,
    weeklyReports: false,
    discountPercentage: 0,
    prioritySupport: false,
    adFree: false,
    earlyAccess: false,
    coachingSessions: 0,
    customConfig: false,
  };
}

/**
 * Prüft ob Usage-Limit erreicht wurde für eine Action.
 */
export function checkUsageLimit(action: keyof SubscriptionLimits): boolean {
  const tier = getSubscriptionTier();
  const features = getSubscriptionFeatures();
  
  if (features.unlimitedTools) return true;
  
  const usage = loadUsage();
  const limit = FREE_DAILY_LIMITS[action];
  
  return usage[action] < limit;
}

/**
 * Inkrementiert Usage-Counter für eine Action.
 */
export function incrementUsage(action: keyof SubscriptionLimits): void {
  const tier = getSubscriptionTier();
  const features = getSubscriptionFeatures();
  
  if (features.unlimitedTools) return;
  
  const usage = loadUsage();
  usage[action]++;
  saveUsage(usage);
}

/**
 * Holt verbleibende Uses für eine Action.
 */
export function getRemainingUses(action: keyof SubscriptionLimits): number {
  const tier = getSubscriptionTier();
  const features = getSubscriptionFeatures();
  
  if (features.unlimitedTools) return Infinity;
  
  const usage = loadUsage();
  const limit = FREE_DAILY_LIMITS[action];
  
  return Math.max(0, limit - usage[action]);
}

/**
 * Setzt Subscription-Tier (für Stripe Webhook Success).
 */
export function setSubscriptionTier(tier: SubscriptionTier, expiresAt: string | null = null): void {
  saveSubscription({ tier, expiresAt });
}

/**
 * Holt verbleibende Tage bis Subscription endet.
 */
export function getDaysRemaining(): number | null {
  const sub = loadSubscription();
  if (!sub.expiresAt) return null;
  
  const expiry = new Date(sub.expiresAt);
  const now = new Date();
  const diff = expiry.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  return Math.max(0, days);
}
