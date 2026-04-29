/**
 * Stats Analyzer — Performance-Insights Engine
 *
 * Analysiert Fortnite Spieler-Stats und generiert personalisierte
 * Verbesserungs-Empfehlungen (ohne externe AI API).
 *
 * Input: PlayerStats
 * Output: AnalysisReport mit Stärken, Schwächen, Action-Items
 */

export interface PlayerStats {
  username: string;
  kd: number;
  winRate: number; // Prozent (0-100)
  top10Rate: number; // Prozent
  killsPerMatch: number;
  placementAvg: number; // Durchschnittliche Platzierung
  matchesPlayed: number;
  accuracyEstimate?: number; // Prozent (optional)
  materialsGatheredAvg?: number;
}

export interface Insight {
  type: 'strength' | 'weakness' | 'action';
  category: 'aim' | 'positioning' | 'building' | 'decision' | 'consistency';
  title: string;
  description: string;
  priority: number; // 1-10, höher = wichtiger
}

export interface SkillRating {
  overall: number; // 0-100
  aim: number;
  positioning: number;
  building: number;
  decision: number;
  rank: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Champion' | 'Unreal';
}

export interface AnalysisReport {
  stats: PlayerStats;
  rating: SkillRating;
  insights: Insight[];
  summary: string;
  weeklyGoals: string[];
}

/**
 * Skill-Rating berechnen.
 */
function calculateRating(stats: PlayerStats): SkillRating {
  // Aim-Score: K/D + Kills/Match
  const aim = Math.min(100, (stats.kd * 20) + (stats.killsPerMatch * 8));

  // Positioning-Score: Top10-Rate + Win-Rate
  const positioning = Math.min(100, (stats.top10Rate * 0.7) + (stats.winRate * 2.5));

  // Building-Score: Materials + Placement
  let building = 50;
  if (stats.materialsGatheredAvg) {
    building = Math.min(100, stats.materialsGatheredAvg / 10);
  } else {
    // Fallback: Placement-basiert
    building = Math.min(100, Math.max(0, 100 - stats.placementAvg));
  }

  // Decision-Score: Consistency (Placement-Avg invers + Win-Rate)
  const decision = Math.min(
    100,
    Math.max(0, 100 - stats.placementAvg) * 0.5 + stats.winRate * 5,
  );

  // Overall: gewichteter Schnitt
  const overall = Math.round(
    aim * 0.3 + positioning * 0.25 + building * 0.2 + decision * 0.25,
  );

  // Rank-Mapping
  let rank: SkillRating['rank'] = 'Bronze';
  if (overall >= 90) rank = 'Unreal';
  else if (overall >= 80) rank = 'Champion';
  else if (overall >= 70) rank = 'Diamond';
  else if (overall >= 55) rank = 'Platinum';
  else if (overall >= 40) rank = 'Gold';
  else if (overall >= 25) rank = 'Silver';

  return {
    overall,
    aim: Math.round(aim),
    positioning: Math.round(positioning),
    building: Math.round(building),
    decision: Math.round(decision),
    rank,
  };
}

/**
 * Generiert Insights basierend auf Rating und Stats.
 */
function generateInsights(stats: PlayerStats, rating: SkillRating): Insight[] {
  const insights: Insight[] = [];

  // === AIM ===
  if (rating.aim >= 70) {
    insights.push({
      type: 'strength',
      category: 'aim',
      title: 'Starker Aim',
      description: `Deine K/D von ${stats.kd.toFixed(2)} liegt über dem Durchschnitt. Nutze das als Waffe in Scrims.`,
      priority: 6,
    });
  } else if (rating.aim < 40) {
    insights.push({
      type: 'weakness',
      category: 'aim',
      title: 'Aim-Training erforderlich',
      description: `K/D von ${stats.kd.toFixed(2)} zeigt: du verlierst Duelle. Aim-Training 30 Min/Tag in Kovaaks oder Aim-Lab.`,
      priority: 9,
    });
    insights.push({
      type: 'action',
      category: 'aim',
      title: 'Aim-Routine etablieren',
      description: 'Tägliche Aim-Routine: 10 Min Tracking, 10 Min Flicks, 10 Min Microcorrection.',
      priority: 8,
    });
  }

  // === POSITIONING ===
  if (rating.positioning >= 70) {
    insights.push({
      type: 'strength',
      category: 'positioning',
      title: 'Gutes Positioning',
      description: `Top-10-Rate von ${stats.top10Rate.toFixed(1)}% zeigt: du überlebst lang. Arbeite an End-Game-Kills.`,
      priority: 5,
    });
  } else if (stats.top10Rate < 30) {
    insights.push({
      type: 'weakness',
      category: 'positioning',
      title: 'Zone-Management schwach',
      description: `Nur ${stats.top10Rate.toFixed(1)}% Top-10 zeigt: du rotierst zu spät. Lerne Zone-Timing.`,
      priority: 9,
    });
    insights.push({
      type: 'action',
      category: 'positioning',
      title: 'Rotation-Planner nutzen',
      description: 'Nutze unseren Rotation-Planner um Zone-Pull-Statistik zu verstehen.',
      priority: 7,
    });
  }

  // === BUILDING ===
  if (rating.building < 50) {
    insights.push({
      type: 'weakness',
      category: 'building',
      title: 'Building-Skill ausbaufähig',
      description: 'Building-Score unter 50. Wenn du Build-Modus spielst: Täglich 20 Min Build-Drills.',
      priority: 8,
    });
    insights.push({
      type: 'action',
      category: 'building',
      title: 'Build Trainer Pro',
      description: 'Starte mit 90s, dann Double-Ramp, dann Tunneling. 15 Min/Tag reichen.',
      priority: 7,
    });
  } else if (rating.building >= 70) {
    insights.push({
      type: 'strength',
      category: 'building',
      title: 'Solide Build-Mechanik',
      description: 'Dein Building-Score ist gut. Nächster Schritt: Edit-Speed und Muscle-Memory.',
      priority: 4,
    });
  }

  // === DECISION MAKING ===
  if (stats.winRate < 2 && stats.matchesPlayed >= 50) {
    insights.push({
      type: 'weakness',
      category: 'decision',
      title: 'Win-Rate kritisch niedrig',
      description: `Nur ${stats.winRate.toFixed(2)}% Wins über ${stats.matchesPlayed} Matches. Problem: End-Game-Entscheidungen.`,
      priority: 10,
    });
  }

  if (stats.kd > 2 && stats.winRate < 3) {
    insights.push({
      type: 'action',
      category: 'decision',
      title: 'Umdenken: Kills sind nicht Wins',
      description: 'Hohe K/D aber wenig Wins: Du pushst zu aggressiv. Priorisiere Placement vor Kills.',
      priority: 9,
    });
  }

  if (stats.placementAvg > 50) {
    insights.push({
      type: 'weakness',
      category: 'consistency',
      title: 'Inkonsistente Placements',
      description: `Durchschnitts-Platz ${stats.placementAvg.toFixed(0)}. Früh-Tode häufig — lande ruhigeren Spot.`,
      priority: 7,
    });
  }

  // Default-Insight falls leer
  if (insights.length === 0) {
    insights.push({
      type: 'action',
      category: 'consistency',
      title: 'Weiter so',
      description: 'Deine Stats sind ausgewogen. Fokus auf Feintuning: Sensitivity, Keybinds, Muscle-Memory.',
      priority: 5,
    });
  }

  // Sort by priority
  insights.sort((a, b) => b.priority - a.priority);

  return insights.slice(0, 6);
}

/**
 * Generiert eine 3-Ziele-Liste für die Woche.
 */
function generateWeeklyGoals(rating: SkillRating, insights: Insight[]): string[] {
  const goals: string[] = [];

  const weaknesses = insights.filter((i) => i.type === 'weakness').slice(0, 3);

  weaknesses.forEach((w) => {
    switch (w.category) {
      case 'aim':
        goals.push('5× täglich: 30 Min Kovaaks/Aim-Lab. Ziel: +5% Accuracy');
        break;
      case 'positioning':
        goals.push('5× täglich: 5 Ranked-Matches mit Fokus auf Top-10-Placement');
        break;
      case 'building':
        goals.push('5× täglich: 20 Min Build-Drills (Piece-Control, 90s, Tunneling)');
        break;
      case 'decision':
        goals.push('5× täglich: 3 Matches wo du NUR auf Platzierung spielst, nicht Kills');
        break;
      case 'consistency':
        goals.push('5× täglich: gleiche Landezone + gleiche Route, Muscle-Memory aufbauen');
        break;
    }
  });

  if (goals.length === 0) {
    goals.push('Mainta in dein Niveau: täglich 10 Ranked-Matches');
    goals.push('Schau 1 Pro-Replay pro Tag, notiere 3 Learnings');
    goals.push('Arbeite an Edit-Speed: 100 Edits pro Tag im Creative');
  }

  return goals.slice(0, 3);
}

/**
 * Erzeugt eine natursprachliche Summary.
 */
function generateSummary(stats: PlayerStats, rating: SkillRating): string {
  const rankDescriptors: Record<SkillRating['rank'], string> = {
    Bronze: 'Anfänger-Niveau',
    Silver: 'solider Casual-Player',
    Gold: 'überdurchschnittlicher Pub-Spieler',
    Platinum: 'fortgeschrittener Spieler',
    Diamond: 'Ranked-Veteran',
    Champion: 'Top 1% Spieler',
    Unreal: 'Competitive-Level',
  };

  return `${stats.username} ist aktuell ein ${rankDescriptors[rating.rank]} mit einem Overall-Skill-Score von ${rating.overall}/100. Stärke: ${getMaxCategory(rating)}. Schwäche: ${getMinCategory(rating)}. Mit fokussiertem Training kann der Skill in 4 Wochen um 10-15 Punkte steigen.`;
}

function getMaxCategory(r: SkillRating): string {
  const entries: [string, number][] = [
    ['Aim', r.aim],
    ['Positioning', r.positioning],
    ['Building', r.building],
    ['Decision Making', r.decision],
  ];
  return entries.reduce((a, b) => (a[1] > b[1] ? a : b))[0];
}

function getMinCategory(r: SkillRating): string {
  const entries: [string, number][] = [
    ['Aim', r.aim],
    ['Positioning', r.positioning],
    ['Building', r.building],
    ['Decision Making', r.decision],
  ];
  return entries.reduce((a, b) => (a[1] < b[1] ? a : b))[0];
}

/**
 * Haupt-Funktion: Komplette Analyse.
 */
export function analyzeStats(stats: PlayerStats): AnalysisReport {
  const rating = calculateRating(stats);
  const insights = generateInsights(stats, rating);
  const summary = generateSummary(stats, rating);
  const weeklyGoals = generateWeeklyGoals(rating, insights);

  return {
    stats,
    rating,
    insights,
    summary,
    weeklyGoals,
  };
}

/**
 * Mock-Stats für Demo-Zwecke (bis echte API angebunden).
 */
export function generateMockStats(username: string): PlayerStats {
  // Deterministisch aus Username (Hash)
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = ((hash << 5) - hash) + username.charCodeAt(i);
    hash |= 0;
  }
  const seed = Math.abs(hash);

  const kd = 0.5 + ((seed % 300) / 100);
  const winRate = ((seed % 15) + 1) / 2;
  const top10Rate = Math.min(80, 15 + (seed % 60));
  const killsPerMatch = 2 + ((seed % 15) / 3);
  const matchesPlayed = 100 + (seed % 900);
  const placementAvg = Math.max(5, 100 - top10Rate * 0.8);

  return {
    username,
    kd: Number(kd.toFixed(2)),
    winRate: Number(winRate.toFixed(2)),
    top10Rate: Number(top10Rate.toFixed(1)),
    killsPerMatch: Number(killsPerMatch.toFixed(1)),
    placementAvg: Number(placementAvg.toFixed(0)),
    matchesPlayed,
    accuracyEstimate: 18 + (seed % 20),
    materialsGatheredAvg: 300 + (seed % 700),
  };
}
