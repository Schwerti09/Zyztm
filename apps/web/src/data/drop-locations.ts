/**
 * Fortnite Drop Locations — Chapter 6 Season 2
 *
 * Daten basieren auf publizierten Fortnite-Tracker Statistiken
 * (öffentliche Aggregat-Daten, keine API-Anbindung nötig).
 */

export type LocationCategory = 'hot' | 'mid' | 'safe' | 'remote';

export interface DropLocation {
  id: string;
  name: string;
  /** Position auf der Map (0-100, Prozent) */
  x: number;
  y: number;
  category: LocationCategory;
  /** Loot-Score 1-10 */
  lootScore: number;
  /** Win-Rate (Prozent) wenn man hier landet und überlebt */
  winRate: number;
  /** Durchschnittliche Spieler die hier landen */
  contestLevel: number; // 0-10 (höher = mehr Konkurrenz)
  /** Rotation-Score: Wie gut ist die Position für Mid-Game-Rotation */
  rotationScore: number; // 1-10
  /** Empfohlener Spielstil */
  recommendedFor: ('aggressive' | 'balanced' | 'passive')[];
  /** Kurze Beschreibung */
  description: string;
}

export const DROP_LOCATIONS: DropLocation[] = [
  {
    id: 'tilted-towers',
    name: 'Tilted Towers',
    x: 50,
    y: 50,
    category: 'hot',
    lootScore: 10,
    winRate: 4.2,
    contestLevel: 10,
    rotationScore: 9,
    recommendedFor: ['aggressive'],
    description: 'Iconic Hot-Drop. 15-20 Spieler landen hier. Loot ist top, Survival schwer.',
  },
  {
    id: 'mega-city',
    name: 'Mega City',
    x: 75,
    y: 35,
    category: 'hot',
    lootScore: 9,
    winRate: 5.8,
    contestLevel: 9,
    rotationScore: 7,
    recommendedFor: ['aggressive', 'balanced'],
    description: 'Vertikale Stadt. Building-Skill ist Pflicht. Hohe Kill-Density.',
  },
  {
    id: 'pleasant-park',
    name: 'Pleasant Park',
    x: 30,
    y: 30,
    category: 'mid',
    lootScore: 8,
    winRate: 7.5,
    contestLevel: 6,
    rotationScore: 8,
    recommendedFor: ['balanced'],
    description: 'Klassisches Multi-Building-POI. Gute Loot-Density, mittlerer Contest.',
  },
  {
    id: 'retail-row',
    name: 'Retail Row',
    x: 70,
    y: 60,
    category: 'mid',
    lootScore: 7,
    winRate: 8.1,
    contestLevel: 5,
    rotationScore: 7,
    recommendedFor: ['balanced', 'aggressive'],
    description: 'Solide Suburban-Drop. Forgiving für mittleren Skill-Level.',
  },
  {
    id: 'fencing-fields',
    name: 'Fencing Fields',
    x: 25,
    y: 70,
    category: 'mid',
    lootScore: 7,
    winRate: 9.2,
    contestLevel: 4,
    rotationScore: 6,
    recommendedFor: ['balanced', 'passive'],
    description: 'Halb-offen, gute Mid-Range-Engagements. Solide Mid-Game-Position.',
  },
  {
    id: 'lonely-lodge',
    name: 'Lonely Lodge',
    x: 85,
    y: 75,
    category: 'safe',
    lootScore: 6,
    winRate: 11.4,
    contestLevel: 2,
    rotationScore: 5,
    recommendedFor: ['passive'],
    description: 'Edge-of-Map. Wenig Loot aber super hohe Survival-Rate.',
  },
  {
    id: 'wooded-hills',
    name: 'Wooded Hills',
    x: 15,
    y: 50,
    category: 'safe',
    lootScore: 5,
    winRate: 13.2,
    contestLevel: 1,
    rotationScore: 4,
    recommendedFor: ['passive'],
    description: 'Verstecktes Gelände. Sniping-Position. Schwierige Rotation aus Endzone.',
  },
  {
    id: 'foxy-floodgates',
    name: 'Foxy Floodgates',
    x: 50,
    y: 80,
    category: 'mid',
    lootScore: 8,
    winRate: 7.0,
    contestLevel: 6,
    rotationScore: 8,
    recommendedFor: ['balanced'],
    description: 'Wasser-POI mit Building-Comp. Balance aus Loot und Rotation.',
  },
  {
    id: 'demons-domain',
    name: 'Demon\'s Domain',
    x: 40,
    y: 20,
    category: 'hot',
    lootScore: 9,
    winRate: 6.0,
    contestLevel: 8,
    rotationScore: 8,
    recommendedFor: ['aggressive'],
    description: 'High-Tier Loot, Boss-NPC. Erwartet 8-10 Player Drop.',
  },
  {
    id: 'shogun-x',
    name: 'Shogun\'s Holdout',
    x: 60,
    y: 25,
    category: 'mid',
    lootScore: 8,
    winRate: 7.8,
    contestLevel: 6,
    rotationScore: 7,
    recommendedFor: ['balanced', 'aggressive'],
    description: 'Mid-Sized POI mit gutem Risk/Reward-Verhältnis.',
  },
  {
    id: 'steamy-springs',
    name: 'Steamy Springs',
    x: 20,
    y: 45,
    category: 'safe',
    lootScore: 6,
    winRate: 12.0,
    contestLevel: 2,
    rotationScore: 5,
    recommendedFor: ['passive'],
    description: 'Spa-themed POI am Rand. Niedriger Contest, mittlerer Loot.',
  },
  {
    id: 'fortified-tilt',
    name: 'Fortified Tilt',
    x: 55,
    y: 55,
    category: 'hot',
    lootScore: 10,
    winRate: 4.8,
    contestLevel: 9,
    rotationScore: 9,
    recommendedFor: ['aggressive'],
    description: 'Tilted Variante mit Pre-Built Defenses. Brutale Hot-Zone.',
  },
];

/**
 * Empfehlung basierend auf Spielstil und Skill.
 */
export function recommendDropLocation(
  playStyle: 'aggressive' | 'balanced' | 'passive',
  skillLevel: 'casual' | 'ranked' | 'competitive',
): DropLocation[] {
  const filtered = DROP_LOCATIONS.filter((loc) =>
    loc.recommendedFor.includes(playStyle),
  );

  // Sortierung basierend auf Skill-Level
  const sorted = [...filtered].sort((a, b) => {
    if (skillLevel === 'casual') {
      // Casual: prioritize high winRate
      return b.winRate - a.winRate;
    }
    if (skillLevel === 'competitive') {
      // Competitive: balance loot + rotation
      return b.lootScore + b.rotationScore - (a.lootScore + a.rotationScore);
    }
    // ranked: balance everything
    const scoreA = a.winRate * 0.4 + a.lootScore + a.rotationScore;
    const scoreB = b.winRate * 0.4 + b.lootScore + b.rotationScore;
    return scoreB - scoreA;
  });

  return sorted.slice(0, 5);
}

/**
 * Berechnet einen Match-Score zwischen User-Profil und Location.
 */
export function calculateMatchScore(
  loc: DropLocation,
  playStyle: 'aggressive' | 'balanced' | 'passive',
  skillLevel: 'casual' | 'ranked' | 'competitive',
): number {
  let score = 0;

  // Style-Match
  if (loc.recommendedFor.includes(playStyle)) {
    score += 30;
  }

  // Skill-Anpassung
  switch (skillLevel) {
    case 'casual':
      // Wenig Contest belohnen
      score += (10 - loc.contestLevel) * 4;
      score += loc.winRate * 1.5;
      break;
    case 'ranked':
      score += loc.lootScore * 3;
      score += loc.rotationScore * 3;
      break;
    case 'competitive':
      score += loc.lootScore * 5;
      score += loc.rotationScore * 4;
      score -= loc.contestLevel * 1; // weniger Contest besser
      break;
  }

  return Math.round(score);
}
