/**
 * Stats Dashboard Store (Zustand)
 * Tool-specific store for Stats Dashboard Pro
 * UPDATED: Uses shared-types.ts for unified data structures
 * REAL Fortnite API Integration with fortnite-api.com
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

// Transform Fortnite API response to PlayerProfile format
function transformApiResponse(data: any, username: string): PlayerProfile {
  const stats = data.data?.stats || data.stats;
  const battlePass = data.data?.battlePass || data.battlePass;
  
  // Extract stats from different possible structures
  const allStats = stats?.all || {};
  const soloStats = stats?.solo || {};
  const duoStats = stats?.duo || {};
  const squadStats = stats?.squad || {};
  
  const matchesPlayed = allStats?.matches || soloStats?.matches || duoStats?.matches || squadStats?.matches || 0;
  const wins = allStats?.wins || soloStats?.wins || duoStats?.wins || squadStats?.wins || 0;
  const kd = allStats?.kd || soloStats?.kd || duoStats?.kd || squadStats?.kd || 0;
  const winrate = matchesPlayed > 0 ? (wins / matchesPlayed) * 100 : 0;
  const avgDamage = allStats?.avgDamage || soloStats?.avgDamage || duoStats?.avgDamage || squadStats?.avgDamage || 0;
  const top10Rate = allStats?.top10 || soloStats?.top10 || duoStats?.top10 || squadStats?.top10 || 0;
  
  // Calculate Nexus Score based on multiple factors
  const nexusScore = Math.min(100, Math.floor(
    (kd * 10) +
    (winrate * 1.5) +
    (matchesPlayed > 100 ? 10 : matchesPlayed / 10) +
    (avgDamage > 200 ? 10 : avgDamage / 20)
  ));
  
  // Generate weak spots analysis
  const weakSpots: any[] = [
    {
      category: kd < 1.0 ? 'close_range' : 'tracking',
      winrate: Math.max(0, winrate - (kd * 5)),
      sampleSize: matchesPlayed,
      recommendation: kd < 1.0 ? 'Aim-Training im Creative Mode für 30 Minuten täglich' : 'Konsistente Crosshair-Placement üben',
      priority: kd < 1.0 ? 'high' : 'medium',
    },
    {
      category: 'mid_range',
      winrate: Math.max(0, winrate - (top10Rate)),
      recommendation: 'Späterer Drop und konservative Rotation in Early Game',
      sampleSize: matchesPlayed,
      priority: 'medium',
    },
    {
      category: 'build_fight',
      winrate: Math.max(0, winrate - 10),
      recommendation: '90°-Edits und Box-Fighting Practice',
      sampleSize: matchesPlayed,
      priority: winrate < 10 ? 'high' : 'low',
    },
    {
      category: 'flicking',
      winrate: Math.max(0, winrate - 5),
      recommendation: 'Aggressiver in Late Game wenn du Top 10 bist',
      sampleSize: matchesPlayed,
      priority: 'medium',
    },
  ];
  
  return {
    epicUsername: username,
    platform: 'pc',
    nexusScore,
    seasonStats: {
      season: battlePass?.level ? `C${battlePass.level}` : 'C7S2',
      matchesPlayed,
      wins,
      winrate,
      kd,
      avgDamage: Math.floor(avgDamage),
      top10Rate,
      kills: Math.floor(kd * matchesPlayed),
      avgPlacement: 100 - (winrate * 0.5),
    },
    weakSpots,
    loadoutPerformance: {},
    lastUpdated: new Date(),
  };
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
      const apiKey = import.meta.env.VITE_FORTNITE_API_KEY;
      
      if (!apiKey) {
        throw new Error('Fortnite API Key nicht gefunden. Bitte VITE_FORTNITE_API_KEY in .env.local hinzufügen.');
      }
      
      const response = await fetch(
        `https://fortnite-api.com/v2/stats/br/v2?name=${encodeURIComponent(username)}&accountType=epic&timeWindow=season&image=none`,
        {
          headers: {
            'Authorization': apiKey,
          },
        }
      );
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Spieler nicht gefunden. Überprüfe den Epic-Username.');
        }
        if (response.status === 401) {
          throw new Error('Ungültiger API Key. Bitte VITE_FORTNITE_API_KEY überprüfen.');
        }
        throw new Error('Fehler beim Laden der Stats. Bitte später erneut versuchen.');
      }
      
      const data = await response.json();
      
      if (!data || !data.data) {
        throw new Error('Keine Stats Daten erhalten. Spieler möglicherweise nicht aktiv.');
      }
      
      const profile = transformApiResponse(data, username);
      set({ currentPlayerProfile: profile, isLoading: false });
      
      // Dispatch custom event for share functionality
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('nexus:stats-analyzed', {
          detail: {
            username: profile.epicUsername,
            kd: profile.seasonStats.kd,
            winRate: profile.seasonStats.winrate,
            wins: profile.seasonStats.wins,
            skillScore: profile.nexusScore,
            rank: profile.seasonStats.season,
          },
        }));
      }
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch player stats' 
      });
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
