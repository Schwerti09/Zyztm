/**
 * useToolLimit Hook
 * Manages tool usage limits based on user subscription tier
 */

import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

const FREE_DAILY_LIMITS: Record<string, number> = {
  'sensitivity-converter': 10,
  'loadout-optimizer': 5,
  'stats-dashboard': 3,
  'drop-location-analyzer': 5,
  'build-trainer': 10,
  'meta-predictor': 1,
  'rotation-planner': 1,
  'keybind-optimizer': 3,
};

export function useToolLimit(toolName: string) {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [hasReachedLimit, setHasReachedLimit] = useState(false);

  const checkLimit = useCallback(async () => {
    if (!isAuthenticated || !user) {
      return true; // Allow for non-authenticated users (will be tracked by IP)
    }

    if (user.tier === 'pro' || user.tier === 'elite') {
      return true; // Unlimited for premium users
    }

    setIsLoading(true);
    try {
      const response = await fetch('/.netlify/functions/check-tool-limit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          toolName,
          userId: user.id,
        }),
      });

      const data = await response.json();
      setRemaining(data.remaining);
      setHasReachedLimit(data.hasReachedLimit);
      return !data.hasReachedLimit;
    } catch (error) {
      console.error('Limit check error:', error);
      return true; // Allow on error
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user, toolName]);

  const incrementUsage = useCallback(async () => {
    if (!isAuthenticated || !user) {
      return;
    }

    if (user.tier === 'pro' || user.tier === 'elite') {
      return; // No tracking for premium users
    }

    try {
      await fetch('/.netlify/functions/increment-tool-usage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          toolName,
          userId: user.id,
        }),
      });
    } catch (error) {
      console.error('Usage increment error:', error);
    }
  }, [isAuthenticated, user, toolName]);

  const getDailyLimit = useCallback(() => {
    if (!user || user.tier === 'pro' || user.tier === 'elite') {
      return Infinity;
    }
    return FREE_DAILY_LIMITS[toolName] || 3;
  }, [user, toolName]);

  return {
    checkLimit,
    incrementUsage,
    remaining,
    hasReachedLimit,
    isLoading,
    dailyLimit: getDailyLimit(),
    isUnlimited: user?.tier === 'pro' || user?.tier === 'elite',
  };
}
