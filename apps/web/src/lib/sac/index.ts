/**
 * SAC Code Management System
 * Export all SAC-related functionality
 */

export { SAC_CONFIG } from './sac-config';
export type { SACContext, SACReminderRule } from './sac-config';

export {
  getSACSessionData,
  saveSACSessionData,
  trackSACView,
  trackSACCopy,
  trackSACConversion,
  shouldDisplaySACCode,
  getSACDismissalData,
  dismissSACCode,
  copySACCode,
  getSACUsageStats,
} from './sac-tracking';
export type { SACSessionData, SACDismissalData } from './sac-tracking';

export {
  formatSACCode,
  validateSACCode,
  generateSACShareUrl,
  calculateProjectedRevenue,
  getSACDisplayPriority,
  getSACDisplayText,
  shouldShowSACReminder,
  handleSACCopy,
  getSACStatistics,
  sacUtils,
} from './sac-utils';
