interface SACDisplayConfig {
  maxFrequency: number; // Max 3 reminders per session
  minInterval: number; // 5 minutes between reminders
  dismissDuration: number; // 24 hours after dismiss
  contexts: string[]; // ['hero', 'shop', 'guide', 'checkout', 'footer']
}

const SAC_CONFIG: SACDisplayConfig = {
  maxFrequency: 3,
  minInterval: 300000, // 5 minutes
  dismissDuration: 86400000, // 24 hours
  contexts: ['hero', 'shop', 'guide', 'checkout', 'footer']
};

interface SACSessionData {
  displayCount: number;
  lastDisplay: number | null;
  dismissedUntil: number;
}

export const shouldDisplaySACReminder = (
  context: string,
  sessionData: SACSessionData
): boolean => {
  // Check if context is valid
  if (!SAC_CONFIG.contexts.includes(context)) return false;

  // Check if dismissed
  if (sessionData.dismissedUntil > Date.now()) return false;

  // Check max frequency
  if (sessionData.displayCount >= SAC_CONFIG.maxFrequency) return false;

  // Check min interval
  if (sessionData.lastDisplay && 
      (Date.now() - sessionData.lastDisplay) < SAC_CONFIG.minInterval) {
    return false;
  }

  return true;
};

export const recordSACDisplay = (sessionData: SACSessionData): SACSessionData => {
  return {
    ...sessionData,
    displayCount: sessionData.displayCount + 1,
    lastDisplay: Date.now()
  };
};

export const dismissSACReminder = (sessionData: SACSessionData): SACSessionData => {
  return {
    ...sessionData,
    dismissedUntil: Date.now() + SAC_CONFIG.dismissDuration
  };
};

export const initializeSACSessionData = (): SACSessionData => {
  return {
    displayCount: 0,
    lastDisplay: null,
    dismissedUntil: 0
  };
};
