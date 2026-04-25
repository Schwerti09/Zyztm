/**
 * SAC Code Tracking System
 * Tracks SAC code usage, copies, and conversions for analytics
 */

import { SAC_CONFIG } from './sac-config';

export interface SACSessionData {
  viewCount: number;
  copyCount: number;
  lastViewTime: number;
  lastCopyTime: number;
  contexts: string[];
}

export interface SACDismissalData {
  dismissedAt: number;
  dismissedContexts: string[];
}

/**
 * Get current session data from session storage
 */
export function getSACSessionData(): SACSessionData {
  if (typeof window === 'undefined') {
    return {
      viewCount: 0,
      copyCount: 0,
      lastViewTime: 0,
      lastCopyTime: 0,
      contexts: [],
    };
  }

  try {
    const data = sessionStorage.getItem(SAC_CONFIG.ANALYTICS.SESSION_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading SAC session data:', error);
  }

  return {
    viewCount: 0,
    copyCount: 0,
    lastViewTime: 0,
    lastCopyTime: 0,
    contexts: [],
  };
}

/**
 * Save session data to session storage
 */
export function saveSACSessionData(data: SACSessionData): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem(SAC_CONFIG.ANALYTICS.SESSION_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving SAC session data:', error);
  }
}

/**
 * Track SAC code view
 */
export function trackSACView(context: string): void {
  if (!SAC_CONFIG.ANALYTICS.TRACK_VIEWS) return;

  const data = getSACSessionData();
  data.viewCount += 1;
  data.lastViewTime = Date.now();
  
  if (!data.contexts.includes(context)) {
    data.contexts.push(context);
  }

  saveSACSessionData(data);

  // Send to analytics (placeholder for actual analytics integration)
  console.log(`[SAC Tracking] View tracked in context: ${context}`);
}

/**
 * Track SAC code copy
 */
export function trackSACCopy(context: string): void {
  if (!SAC_CONFIG.ANALYTICS.TRACK_COPIES) return;

  const data = getSACSessionData();
  data.copyCount += 1;
  data.lastCopyTime = Date.now();
  
  if (!data.contexts.includes(context)) {
    data.contexts.push(context);
  }

  saveSACSessionData(data);

  // Send to analytics (placeholder for actual analytics integration)
  console.log(`[SAC Tracking] Copy tracked in context: ${context}`);
}

/**
 * Track SAC code conversion (when user actually uses code in-game)
 */
export function trackSACConversion(context: string, value?: number): void {
  if (!SAC_CONFIG.ANALYTICS.TRACK_CONVERSIONS) return;

  // Send to analytics (placeholder for actual analytics integration)
  console.log(`[SAC Tracking] Conversion tracked in context: ${context}`, value);
  
  // Reset session data after conversion
  saveSACSessionData({
    viewCount: 0,
    copyCount: 0,
    lastViewTime: 0,
    lastCopyTime: 0,
    contexts: [],
  });
}

/**
 * Check if SAC code should be displayed based on rules
 */
export function shouldDisplaySACCode(context: string): boolean {
  const data = getSACSessionData();
  const now = Date.now();

  // Check max frequency
  if (data.viewCount >= SAC_CONFIG.DISPLAY_RULES.MAX_FREQUENCY) {
    return false;
  }

  // Check minimum interval
  if (data.lastViewTime > 0) {
    const timeSinceLastView = now - data.lastViewTime;
    if (timeSinceLastView < SAC_CONFIG.DISPLAY_RULES.MIN_INTERVAL) {
      return false;
    }
  }

  // Check if dismissed
  const dismissalData = getSACDismissalData();
  if (dismissalData) {
    const timeSinceDismissal = now - dismissalData.dismissedAt;
    if (timeSinceDismissal < SAC_CONFIG.DISPLAY_RULES.DISMISS_DURATION) {
      return false;
    }
  }

  return true;
}

/**
 * Get dismissal data from local storage
 */
export function getSACDismissalData(): SACDismissalData | null {
  if (typeof window === 'undefined') return null;

  try {
    const data = localStorage.getItem(SAC_CONFIG.ANALYTICS.LOCAL_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading SAC dismissal data:', error);
  }

  return null;
}

/**
 * Dismiss SAC code for specified duration
 */
export function dismissSACCode(context: string): void {
  if (typeof window === 'undefined') return;

  try {
    const data: SACDismissalData = {
      dismissedAt: Date.now(),
      dismissedContexts: [context],
    };
    localStorage.setItem(SAC_CONFIG.ANALYTICS.LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error dismissing SAC code:', error);
  }
}

/**
 * Copy SAC code to clipboard
 */
export async function copySACCode(context: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(SAC_CONFIG.CREATOR_CODE);
    trackSACCopy(context);
    return true;
  } catch (error) {
    console.error('Error copying SAC code:', error);
    return false;
  }
}

/**
 * Get SAC code usage statistics
 */
export function getSACUsageStats() {
  const sessionData = getSACSessionData();
  const dismissalData = getSACDismissalData();

  return {
    sessionViews: sessionData.viewCount,
    sessionCopies: sessionData.copyCount,
    contextsViewed: sessionData.contexts,
    isDismissed: dismissalData !== null,
    dismissedAt: dismissalData?.dismissedAt || null,
  };
}
