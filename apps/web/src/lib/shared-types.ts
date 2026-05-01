/**
 * Fortnite Nexus – Komplette Type Definitions (Mai 2026)
 * Chapter 7 Season 2
 * 
 * Der fundamentale Baustein, auf dem alles Weitere aufbaut:
 * - Alle 8 Tools nutzen diese Typen
 * - State Management baut darauf auf
 * - Datenbank-Schema wird daraus abgeleitet
 * - API-Responses und Components werden typensicher
 */

export type Tier = 'free' | 'pro' | 'elite';

export type GameMode = 
  | 'ranked_solo'
  | 'zero_build_solo'
  | 'zero_build_duos'
  | 'reload'
  | 'cash_cup'
  | 'og'
  | 'creative'
  | 'zone_wars';

export type Playstyle = 
  | 'aggressive' 
  | 'zerobuild' 
  | 'sniper' 
  | 'mobility' 
  | 'allround' 
  | 'reload_specialist';

export type Rarity = 
  | 'Common' 
  | 'Uncommon' 
  | 'Rare' 
  | 'Epic' 
  | 'Legendary' 
  | 'Mythic';

export type WeaponType = 
  | 'shotgun' 
  | 'smg' 
  | 'ar' 
  | 'dmr' 
  | 'sniper' 
  | 'utility' 
  | 'healing' 
  | 'mobility';

export type WeakSpotCategory = 
  | 'close_range' 
  | 'mid_range' 
  | 'long_range' 
  | 'build_fight' 
  | 'edit_speed' 
  | 'tracking' 
  | 'flicking';

// =============================================
// CORE ENTITIES
// =============================================

export interface LoadoutSlot {
  slotNumber: 1 | 2 | 3 | 4 | 5;
  itemName: string;
  rarity: Rarity;
  type: WeaponType;
  imageUrl?: string;
  stats?: {
    damage: number;
    fireRate: number;
    magazineSize: number;
    dps?: number;
  };
}

export interface Loadout {
  id: string;
  userId?: string;
  createdAt: Date;
  updatedAt?: Date;
  season: string;                    // z.B. "C7S2"
  mode: GameMode;
  playstyle: Playstyle;
  skillLevel: number;                // 1-10
  title: string;
  subtitle: string;
  slots: LoadoutSlot[];
  projectedWinrate: number;          // 0-100
  explanation: string;
  tags: string[];
  flexScore: number;                 // 0-100
  isDailyGodLoadout?: boolean;
  metaVersion: string;               // z.B. "meta-2026-05-01"
}

export interface PlayerProfile {
  epicUsername: string;
  epicId?: string;
  platform: 'pc' | 'console' | 'mobile';
  avatarUrl?: string;
  nexusScore: number;                // Gesamtscore 0-100
  seasonStats: SeasonStats;
  lifetimeStats?: LifetimeStats;
  loadoutPerformance: Record<string, LoadoutPerformance>;
  weakSpots: WeakSpotAnalysis[];
  lastUpdated: Date;
}

export interface SeasonStats {
  season: string;
  matchesPlayed: number;
  wins: number;
  winrate: number;
  kills: number;
  kd: number;
  avgDamage: number;
  top10Rate: number;
  avgPlacement: number;
}

export interface LifetimeStats {
  totalMatches: number;
  totalWins: number;
  totalKills: number;
  bestKd: number;
}

export interface LoadoutPerformance {
  loadoutId: string;
  winrate: number;
  avgKills: number;
  usageCount: number;
}

export interface WeakSpotAnalysis {
  category: WeakSpotCategory;
  winrate: number;
  sampleSize: number;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
}

export interface SensitivityProfile {
  id: string;
  userId?: string;
  gameFrom: string;
  sensFrom: number;
  dpi: number;
  cm360: number;
  targetGame: string;
  recommendedSens: number;
  playstyleAdjustment: number;
  notes?: string;
  createdAt: Date;
}

// Meta System
export interface WeaponMetaEntry {
  name: string;
  tier: 'SS' | 'S' | 'A' | 'B' | 'C' | 'D';
  usageRate: number;                 // Prozent in Top 1%
  winrateDelta: number;              // Veränderung letzte Woche
  predictedChange: 'buff' | 'nerf' | 'stable' | 'unknown';
  synergyWith: string[];
  lastUpdated: Date;
}

export interface MetaPrediction {
  weaponName: string;
  nextPatchPrediction: string;
  confidence: number;                // 0-100
  sources: string[];
}

// Drop Location
export interface DropSpot {
  poiName: string;
  map: string;                       // "Chapter7_Map"
  mode: GameMode;
  season: string;
  avgPlacement: number;
  winrate: number;
  lootTier: 'low' | 'medium' | 'high' | 'god';
  earlyFightProbability: number;
  recommendation: string;
  heatmapColor?: string;
}

// Rotation
export interface RotationPlan {
  id: string;
  startPoi: string;
  targetZonePhase: number;
  mobilityItems: string[];
  estimatedTimeSeconds: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendedLoadout: LoadoutSlot[];
  alternatives: RotationPlan[];
}

// User & Subscription
export interface NexusUser {
  id: string;
  username: string;
  tier: Tier;
  nexusCode?: string;                // ZYZTM Support Code
  savedLoadouts: number;
  lastActive: Date;
  preferences: {
    favoritePlaystyle?: Playstyle;
    preferredMode?: GameMode;
  };
}

// Flex Card
export interface FlexCardData {
  loadout: Loadout;
  username?: string;
  nexusScore?: number;
  generatedAt: Date;
  branding: string;
  backgroundVariant?: 'default' | 'neon' | 'dark';
}

// Global App State
export interface NexusAppState {
  currentSeason: string;
  currentMetaVersion: string;
  globalMeta: Record<string, WeaponMetaEntry>;
  user: NexusUser | null;
  isLoading: boolean;
}

// =============================================
// UTILITY TYPES
// =============================================

export type ToolName = 
  | 'loadout-god'
  | 'stats-dashboard'
  | 'sensitivity-converter'
  | 'drop-analyzer'
  | 'meta-predictor'
  | 'rotation-planner'
  | 'build-trainer'
  | 'keybind-optimizer';

export interface ToolAccess {
  toolName: ToolName;
  minTier: Tier;
  isUnlocked: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    lastUpdated?: Date;
    version?: string;
  };
}
