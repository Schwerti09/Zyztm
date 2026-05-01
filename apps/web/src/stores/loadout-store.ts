/**
 * Loadout God Store (Zustand)
 * Tool-specific store for Nexus Loadout God
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Loadout } from '../lib/shared-types';

interface LoadoutState {
  currentLoadout: Loadout | null;
  savedLoadouts: Loadout[];
  metaDatabase: Record<string, any>; // playstyle → meta data
  
  // Actions
  generateLoadout: (inputs: any) => void;
  saveLoadout: (loadout: Loadout) => void;
  deleteLoadout: (id: string) => void;
  setCurrentLoadout: (loadout: Loadout | null) => void;
  downloadFlexCard: () => Promise<void>;
}

export const useLoadoutStore = create<LoadoutState>()(
  persist(
    (set, get) => ({
      // Initial State
      currentLoadout: null,
      savedLoadouts: [],
      metaDatabase: {},
      
      // Actions
      generateLoadout: (inputs) => {
        // Generate loadout based on inputs (mode, playstyle, skillLevel)
        // This will be implemented with the actual algorithm
        const newLoadout: Loadout = {
          id: crypto.randomUUID(),
          userId: undefined,
          createdAt: new Date(),
          season: 'C7S2',
          mode: inputs.mode,
          playstyle: inputs.playstyle,
          skillLevel: inputs.skillLevel,
          title: 'Generated Loadout',
          subtitle: 'AI-Optimized',
          slots: [],
          projectedWinrate: 0,
          explanation: '',
          tags: [],
          flexScore: 0,
          isDailyGodLoadout: false,
        };
        
        set({ currentLoadout: newLoadout });
      },
      
      saveLoadout: (loadout) => {
        set((state) => ({
          savedLoadouts: [...state.savedLoadouts, loadout],
        }));
      },
      
      deleteLoadout: (id) => {
        set((state) => ({
          savedLoadouts: state.savedLoadouts.filter((l) => l.id !== id),
        }));
      },
      
      setCurrentLoadout: (loadout) => {
        set({ currentLoadout: loadout });
      },
      
      downloadFlexCard: async () => {
        // Implementation with html2canvas + branding
        // This will be implemented later
        console.log('Downloading flex card...');
      },
    }),
    {
      name: 'loadout-storage',
    }
  )
);
