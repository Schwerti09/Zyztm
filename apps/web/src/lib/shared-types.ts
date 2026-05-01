/**
 * Shared Types for Fortnite Nexus Tools
 * Unified data structures for all 8 tools
 */

// ============================================================================
// Shared Common Types
// ============================================================================

export type Tier = 'free' | 'pro' | 'elite';

export interface NexusUser {
  id: string;
  tier: Tier;
  nexusCode?: string; // ZYZTM / SAC
  savedLoadoutsCount: number;
  lastLogin: Date;
}

export interface FlexCardData {
  loadout: Loadout;
  username?: string;
  nexusScore?: number;
  generatedAt: Date;
  branding: "Nexus Loadout God • THE COMMAND CENTER";
}

// ============================================================================
// 1. Loadout Optimizer AI → "Nexus Loadout God"
// ============================================================================

export interface Loadout {
  id: string;
  userId?: string;
  createdAt: Date;
  season: string; // "C7S2"
  mode: 'ranked_solo' | 'zero_build_duos' | 'reload' | 'cash_cup' | 'og' | 'creative';
  playstyle: 'aggressive' | 'zerobuild' | 'sniper' | 'mobility' | 'allround' | 'reload_specialist';
  skillLevel: number; // 1-10
  title: string;
  subtitle: string;
  slots: LoadoutSlot[];
  projectedWinrate: number;
  explanation: string;
  tags: string[]; // ["boxfight", "thirdparty", "endgame"]
  flexScore: number; // 0-100 (wie "flexbar" das Loadout ist)
  isDailyGodLoadout: boolean;
}

export interface LoadoutSlot {
  slotNumber: 1 | 2 | 3 | 4 | 5;
  itemName: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  type: 'shotgun' | 'smg' | 'ar' | 'dmr' | 'utility' | 'healing' | 'mobility';
  imageUrl?: string;
  stats?: {
    damage: number;
    fireRate: number;
    magazineSize: number;
  };
}

// ============================================================================
// 2. Stats Dashboard Pro
// ============================================================================

export interface PlayerProfile {
  epicId: string;
  username: string;
  platform: 'pc' | 'console' | 'mobile';
  seasonStats: SeasonStats;
  lifetimeStats: LifetimeStats;
  loadoutPerformance: Record<string, LoadoutPerformance>;
  weakSpots: WeakSpotAnalysis[];
  nexusScore: number; // Gesamt-Skill-Score (0-100)
}

export interface SeasonStats {
  wins: number;
  matches: number;
  winrate: number;
  kd: number;
  avgDamage: number;
  top10Rate: number;
}

export interface LifetimeStats {
  wins: number;
  matches: number;
  winrate: number;
  kd: number;
  avgDamage: number;
  top10Rate: number;
}

export interface LoadoutPerformance {
  loadoutId: string;
  matches: number;
  winrate: number;
  avgDamage: number;
}

export interface WeakSpotAnalysis {
  category: 'close_range' | 'mid_range' | 'long_range' | 'build_fight' | 'edit_speed';
  winrate: number;
  recommendation: string;
}

// ============================================================================
// 3. Sensitivity Converter Pro
// ============================================================================

export interface SensitivityProfile {
  gameFrom: string; // "fortnite", "valorant", "cs2", ...
  sensFrom: number;
  dpi: number;
  cm360: number;
  targetGame: string;
  recommendedSens: number;
  playstyleAdjustment: number; // Multiplier je nach aggressive/aim
  notes: string;
}

// ============================================================================
// 4. Drop Location Analyzer
// ============================================================================

export interface DropSpot {
  poiName: string;
  mapRegion: string;
  mode: string;
  season: string;
  avgPlacement: number;
  winrate: number;
  lootTier: 'low' | 'medium' | 'high' | 'god';
  playerStats: {
    fightsEarly: number;
    survivalRate: number;
  };
  recommendation: string;
  heatmapUrl?: string;
}

// ============================================================================
// 5. Meta Predictor
// ============================================================================

export interface WeaponMeta {
  name: string;
  tier: 'SS' | 'S' | 'A' | 'B' | 'C';
  usageRate: number; // % der Top-Spieler
  winrateDelta: number; // Veränderung zur letzten Woche
  predictedChange: 'buff' | 'nerf' | 'stable';
  loadoutSynergy: string[]; // Welche anderen Waffen passen gut
  lastUpdated: Date;
}

export interface MetaPrediction {
  nextPatchPrediction: string;
  confidence: number;
  sources: string[];
}

// ============================================================================
// 6. Rotation Planner
// ============================================================================

export interface RotationPlan {
  startPoi: string;
  targetZone: number; // Zone Phase
  mobilityItems: string[];
  estimatedTime: number; // Sekunden
  riskLevel: 'low' | 'medium' | 'high';
  recommendedLoadout: LoadoutSlot[];
  alternatives: RotationPlan[];
}

// ============================================================================
// 7. Build Trainer / Mechanics Trainer
// ============================================================================

export interface DrillSession {
  drillType: 'boxfight' | 'edit_course' | 'aim_tracking' | 'piece_control';
  duration: number;
  difficulty: number; // 1-10
  score: number;
  improvementAreas: string[];
  recommendedNextDrill: string;
}

// ============================================================================
// 8. Keybind Optimizer
// ============================================================================

export interface KeybindProfile {
  playstyle: string;
  handSize: 'small' | 'medium' | 'large';
  mouse: string;
  keyboard: string;
  recommendedBinds: Record<string, string>; // action → key
  conflictScore: number;
  proComparison: { player: string; similarity: number }[];
}
