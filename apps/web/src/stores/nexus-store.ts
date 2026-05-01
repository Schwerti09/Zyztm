/**
 * Global Nexus Store (Zustand)
 * User Tier, Current Season, Global Meta, Theme Settings
 * UPDATED: Uses shared-types.ts for unified data structures
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Tier, NexusUser, NexusAppState, WeaponMetaEntry } from '../lib/shared-types';

interface NexusState extends NexusAppState {
  // Theme
  theme: 'dark' | 'light' | 'neon';
  
  // Actions
  setUser: (user: NexusUser | null) => void;
  setCurrentSeason: (season: string) => void;
  setCurrentMetaVersion: (version: string) => void;
  setGlobalMeta: (meta: Record<string, WeaponMetaEntry>) => void;
  setTheme: (theme: 'dark' | 'light' | 'neon') => void;
}

export const useNexusStore = create<NexusState>()(
  persist(
    (set) => ({
      // Initial State
      currentSeason: 'C7S2',
      currentMetaVersion: 'meta-2026-05-01',
      globalMeta: {},
      user: null,
      isLoading: false,
      theme: 'neon',
      
      // Actions
      setUser: (user) => set({ user }),
      setCurrentSeason: (season) => set({ currentSeason: season }),
      setCurrentMetaVersion: (version) => set({ currentMetaVersion: version }),
      setGlobalMeta: (meta) => set({ globalMeta: meta }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'nexus-storage',
    }
  )
);
