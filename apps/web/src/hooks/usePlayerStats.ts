/**
 * React Query Hooks for Fortnite Nexus
 * Centralized API query management with TanStack Query
 * UPDATED: Uses shared-types.ts for unified data structures
 */

import { useQuery } from '@tanstack/react-query';
import type { PlayerProfile, Loadout, ApiResponse } from '../lib/shared-types';

// API Base URL (configure for your backend)
const API_BASE = '/api';

/**
 * Fetch Player Stats
 */
export function usePlayerStats(username: string) {
  return useQuery({
    queryKey: ['player-stats', username],
    queryFn: async (): Promise<ApiResponse<PlayerProfile>> => {
      const response = await fetch(`${API_BASE}/player/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch player stats');
      }
      return response.json();
    },
    enabled: !!username,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Fetch Loadout by ID
 */
export function useLoadout(loadoutId: string) {
  return useQuery({
    queryKey: ['loadout', loadoutId],
    queryFn: async (): Promise<ApiResponse<Loadout>> => {
      const response = await fetch(`${API_BASE}/loadout/${loadoutId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch loadout');
      }
      return response.json();
    },
    enabled: !!loadoutId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Fetch Global Meta
 */
export function useGlobalMeta() {
  return useQuery({
    queryKey: ['global-meta'],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/meta`);
      if (!response.ok) {
        throw new Error('Failed to fetch global meta');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
