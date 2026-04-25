/**
 * SAC Code Utility Functions
 * Helper functions for SAC code management
 */

import { SAC_CONFIG } from './sac-config';
import { shouldDisplaySACCode, copySACCode } from './sac-tracking';

/**
 * Format SAC code for display (with hyphens for readability)
 */
export function formatSACCode(code: string = SAC_CONFIG.CREATOR_CODE): string {
  // If code is already formatted with hyphens, return as-is
  if (code.includes('-')) return code;
  
  // Format as XXX-XX-XX for readability
  if (code.length === 6) {
    return `${code.slice(0, 3)}-${code.slice(3)}`;
  }
  
  return code;
}

/**
 * Validate SAC code format
 */
export function validateSACCode(code: string): boolean {
  const pattern = /^[A-Z0-9-]{3,20}$/;
  return pattern.test(code.toUpperCase());
}

/**
 * Generate SAC code sharing URL (Fortnite item shop with code)
 */
export function generateSACShareUrl(code: string = SAC_CONFIG.CREATOR_CODE): string {
  return `https://fortnite.com/support-a-creator/creators/${code}`;
}

/**
 * Calculate projected revenue based on active users
 */
export function calculateProjectedRevenue(activeUsers: number): number {
  const averageSpendPerUser = 10; // €10 average monthly spend
  const conversionRate = 0.3; // 30% of users use creator code
  
  const projectedRevenue = activeUsers * averageSpendPerUser * conversionRate * SAC_CONFIG.PROVISION_RATE;
  return Math.round(projectedRevenue);
}

/**
 * Get SAC code display priority based on context
 */
export function getSACDisplayPriority(context: string): 'high' | 'medium' | 'low' {
  const priorityMap: Record<string, 'high' | 'medium' | 'low'> = {
    hero: 'high',
    shop: 'high',
    guide: 'medium',
    checkout: 'high',
    footer: 'low',
  };

  return priorityMap[context] || 'medium';
}

/**
 * Get SAC code display text based on context
 */
export function getSACDisplayText(context: string): {
  title: string;
  description: string;
  cta: string;
} {
  const textMap: Record<string, { title: string; description: string; cta: string }> = {
    hero: {
      title: 'Support Fortnite Nexus',
      description: 'Use code ZYZTM in the item shop to support us!',
      cta: 'Copy Code',
    },
    shop: {
      title: 'Get Your Items',
      description: 'Don\'t forget to use code ZYZTM at checkout!',
      cta: 'Copy Code',
    },
    guide: {
      title: 'Enjoyed this guide?',
      description: 'Support us with code ZYZTM in the item shop',
      cta: 'Copy Code',
    },
    checkout: {
      title: 'One more step!',
      description: 'Enter code ZYZTM before completing your purchase',
      cta: 'Copy Code',
    },
    footer: {
      title: 'Support the Community',
      description: 'Use code ZYZTM in Fortnite',
      cta: 'Copy Code',
    },
  };

  return textMap[context] || textMap.hero;
}

/**
 * Check if SAC code reminder should be shown
 */
export function shouldShowSACReminder(context: string): boolean {
  return shouldDisplaySACCode(context);
}

/**
 * Handle SAC code copy with feedback
 */
export async function handleSACCopy(context: string): Promise<{
  success: boolean;
  message: string;
}> {
  const success = await copySACCode(context);
  
  return {
    success,
    message: success ? SAC_CONFIG.COPY_BEHAVIOR.SUCCESS_MESSAGE : 'Failed to copy code',
  };
}

/**
 * Get SAC code statistics for display
 */
export function getSACStatistics() {
  const conservativeRevenue = SAC_CONFIG.REVENUE_PROJECTION.CONSERVATIVE;
  const aggressiveRevenue = SAC_CONFIG.REVENUE_PROJECTION.AGGRESSIVE;
  const conservativeUsers = SAC_CONFIG.TARGET_USERS.CONSERVATIVE;
  const aggressiveUsers = SAC_CONFIG.TARGET_USERS.AGGRESSIVE;

  return {
    creatorCode: SAC_CONFIG.CREATOR_CODE,
    provisionRate: SAC_CONFIG.PROVISION_RATE * 100, // Convert to percentage
    conservativeUsers,
    aggressiveUsers,
    conservativeRevenue,
    aggressiveRevenue,
    projectedRevenue: calculateProjectedRevenue(conservativeUsers),
  };
}

/**
 * Export all SAC utilities
 */
export const sacUtils = {
  formatSACCode,
  validateSACCode,
  generateSACShareUrl,
  calculateProjectedRevenue,
  getSACDisplayPriority,
  getSACDisplayText,
  shouldShowSACReminder,
  handleSACCopy,
  getSACStatistics,
};
