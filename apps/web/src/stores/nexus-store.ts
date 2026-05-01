/**
 * Global Nexus Store (Zustand)
 * User Tier, Current Season, Global Meta, Theme Settings
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Tier } from '../lib/shared-types';

interface NexusState {
  // User
  userTier: Tier;
  nexusCode?: string;
  savedLoadoutsCount: number;
  
  // Global Meta
  currentSeason: string;
  globalMeta: Record<string, any>;
  
  // Theme
  theme: 'dark' | 'light' | 'neon';
  
  // Actions
  setUserTier: (tier: Tier) => void;
  setNexusCode: (code: string) => void;
  setSavedLoadoutsCount: (count: number) => void;
  setCurrentSeason: (season: string) => void;
  setGlobalMeta: (meta: Record<string, any>) => void;
  setTheme: (theme: 'dark' | 'light' | 'neon') => void;
}

export const useNexusStore = create<NexusState>()(
  persist(
    (set) => ({
      // Initial State
      userTier: 'free',
      nexusCode: undefined,
      savedLoadoutsCount: 0,
      currentSeason: 'C7S2',
      globalMeta: {},
      theme: 'neon',
      
      // Actions
      setUserTier: (tier) => set({ userTier: tier }),
      setNexusCode: (code) => set({ nexusCode: code }),
      setSavedLoadoutsCount: (count) => set({ savedLoadoutsCount: count }),
      setCurrentSeason: (season) => set({ currentSeason: season }),
      setGlobalMeta: (meta) => set({ globalMeta: meta }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'nexus-storage',
    }
  )
);
