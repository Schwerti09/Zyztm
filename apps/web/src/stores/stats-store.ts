/**
 * Stats Dashboard Store (Zustand)
 * Tool-specific store for Stats Dashboard Pro
 * UPDATED: Uses shared-types.ts for unified data structures
 */

import { create } from 'zustand';
import type { PlayerProfile } from '../lib/shared-types';

interface StatsState {
  currentPlayerProfile: PlayerProfile | null;
  searchHistory: string[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchPlayerStats: (username: string) => Promise<void>;
  setCurrentPlayerProfile: (profile: PlayerProfile | null) => void;
  addToSearchHistory: (username: string) => void;
  clearSearchHistory: () => void;
}

export const useStatsStore = create<StatsState>()((set) => ({
  // Initial State
  currentPlayerProfile: null,
  searchHistory: [],
  isLoading: false,
  error: null,
  
  // Actions
  fetchPlayerStats: async (username: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // This will use React Query for actual API calls
      // For now, placeholder implementation
      console.log('Fetching stats for:', username);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to fetch player stats' });
    }
  },
  
  setCurrentPlayerProfile: (profile) => {
    set({ currentPlayerProfile: profile });
  },
  
  addToSearchHistory: (username) => {
    set((state) => ({
      searchHistory: [username, ...state.searchHistory.filter((u) => u !== username)].slice(0, 10),
    }));
  },
  
  clearSearchHistory: () => {
    set({ searchHistory: [] });
  },
}));
