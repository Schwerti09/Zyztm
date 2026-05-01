/**
 * SAC (Support-A-Creator) Configuration
 * Epic Games Creator Code Management for Fortnite Nexus
 */

export const SAC_CONFIG = {
  // Primary creator code for Fortnite Nexus (Community Code, no individual streamer)
  CREATOR_CODE: 'NEXUS',

  // Epic Games commission rate (5%)
  PROVISION_RATE: 0.05,

  // Target user projections
  TARGET_USERS: {
    CONSERVATIVE: 10000, // 10k active users
    AGGRESSIVE: 50000, // 50k+ active users
  },

  // Revenue projections (monthly)
  REVENUE_PROJECTION: {
    CONSERVATIVE: 500, // €500/month
    AGGRESSIVE: 5000, // €5,000/month
  },

  // Display contexts where SAC code should appear
  REMINDER_CONTEXTS: ['hero', 'shop', 'guide', 'checkout', 'footer'],

  // Display rules to prevent user fatigue
  DISPLAY_RULES: {
    MAX_FREQUENCY: 3, // Max 3 reminders per session
    MIN_INTERVAL: 300000, // 5 minutes between reminders
    DISMISS_DURATION: 86400000, // 24 hours after dismiss
  },

  // SAC code copy behavior
  COPY_BEHAVIOR: {
    AUTO_COPY: false, // Don't auto-copy on page load
    SUCCESS_MESSAGE: 'Code copied to clipboard!',
    SUCCESS_DURATION: 3000, // 3 seconds
  },

  // Analytics tracking
  ANALYTICS: {
    TRACK_VIEWS: true,
    TRACK_COPIES: true,
    TRACK_CONVERSIONS: true,
    SESSION_STORAGE_KEY: 'sac_session_data',
    LOCAL_STORAGE_KEY: 'sac_dismissal_data',
  },
} as const;

export type SACContext = typeof SAC_CONFIG.REMINDER_CONTEXTS[number];
export type SACReminderRule = keyof typeof SAC_CONFIG.DISPLAY_RULES;
