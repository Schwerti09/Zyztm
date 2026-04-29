/**
 * Loadout Optimizer — Decision Engine
 *
 * Berechnet optimale 5-Slot-Loadouts für Fortnite basierend auf:
 * - Spielstil (Aggressive / Balanced / Passive)
 * - Zone-Phase (Early / Mid / End)
 * - Kartenbereich (Open / Urban / Coastal)
 * - User-Skill-Level (Casual / Ranked / Competitive)
 *
 * Algorithmus: Multi-Criteria Scoring
 * Jede Waffe erhält einen "Situational Score" basierend auf den 4 Dimensionen.
 * Die Top-5 Waffen (eine pro Kategorie) werden empfohlen.
 */

import { WEAPONS, type Weapon } from '../data/weapons-data';

export type PlayStyle = 'aggressive' | 'balanced' | 'passive';
export type ZonePhase = 'early' | 'mid' | 'end';
export type MapArea = 'open' | 'urban' | 'coastal';
export type SkillLevel = 'casual' | 'ranked' | 'competitive';

export interface LoadoutContext {
  playStyle: PlayStyle;
  zonePhase: ZonePhase;
  mapArea: MapArea;
  skillLevel: SkillLevel;
}

export interface SlotRecommendation {
  slot: number;
  role: string;
  weapon: Weapon;
  score: number;
  reasoning: string;
}

export interface LoadoutResult {
  context: LoadoutContext;
  recommendations: SlotRecommendation[];
  totalScore: number;
  tips: string[];
}

/**
 * Berechnet den Situational Score einer Waffe in einem Kontext.
 * Höher = besser geeignet.
 */
function scoreWeapon(weapon: Weapon, ctx: LoadoutContext): number {
  let score = 0;

  // Base: DPS gewichtet (0-220 → 0-50)
  score += Math.min(50, (weapon.dps / 220) * 50);

  // Tier-Boost (S=25, A=15, B=10, C=5, D=0)
  const tierBoost: Record<Weapon['tier'], number> = {
    S: 25,
    A: 15,
    B: 10,
    C: 5,
    D: 0,
  };
  score += tierBoost[weapon.tier];

  // Playstyle-Modifier
  switch (ctx.playStyle) {
    case 'aggressive':
      if (weapon.type === 'Shotgun') score += 20;
      if (weapon.type === 'SMG') score += 15;
      if (weapon.type === 'AR' && weapon.fireRate >= 5) score += 10;
      if (weapon.type === 'Sniper') score -= 5;
      break;
    case 'passive':
      if (weapon.type === 'Sniper') score += 20;
      if (weapon.type === 'AR' && weapon.range >= 50) score += 10;
      if (weapon.type === 'Shotgun') score -= 10;
      break;
    case 'balanced':
      if (weapon.type === 'AR') score += 10;
      if (weapon.type === 'Shotgun') score += 5;
      break;
  }

  // Zone-Phase Modifier
  switch (ctx.zonePhase) {
    case 'early':
      // Früh: Mobile Kämpfe, viel Loot
      if (weapon.type === 'SMG') score += 10;
      if (weapon.type === 'Shotgun') score += 10;
      if (weapon.type === 'Explosive') score -= 10;
      break;
    case 'mid':
      // Mitte: Rotations, mittlere Reichweite
      if (weapon.type === 'AR') score += 15;
      if (weapon.type === 'Sniper') score += 5;
      break;
    case 'end':
      // End: Box-Fights, Explosive
      if (weapon.type === 'Shotgun') score += 15;
      if (weapon.type === 'Explosive') score += 15;
      if (weapon.type === 'SMG') score += 10;
      if (weapon.type === 'Sniper') score -= 5;
      break;
  }

  // Map-Area Modifier
  switch (ctx.mapArea) {
    case 'open':
      if (weapon.range >= 80) score += 15;
      if (weapon.type === 'Shotgun') score -= 15;
      break;
    case 'urban':
      if (weapon.range <= 30) score += 10;
      if (weapon.type === 'Shotgun') score += 10;
      break;
    case 'coastal':
      // Mixed
      if (weapon.type === 'AR') score += 5;
      break;
  }

  // Skill-Level Modifier
  switch (ctx.skillLevel) {
    case 'casual':
      // Einfacher zu bedienende Waffen
      if (weapon.fireRate >= 5) score += 5; // Forgiving Auto
      if (weapon.type === 'Sniper') score -= 10; // Schwerer
      break;
    case 'competitive':
      // Pro-Level
      if (weapon.tier === 'S') score += 10;
      if (weapon.rarity === 'Legendary') score += 5;
      break;
  }

  return Math.max(0, score);
}

/**
 * Rolle eines Slots.
 */
const SLOT_ROLES = [
  { role: 'Primär (Mid-Range)', types: ['AR'] },
  { role: 'Sekundär (Close-Range)', types: ['Shotgun', 'SMG'] },
  { role: 'Long-Range', types: ['Sniper'] },
  { role: 'Utility/Explosive', types: ['Explosive', 'Pistol'] },
  { role: 'Flex-Slot', types: ['AR', 'SMG', 'Shotgun'] },
];

/**
 * Erzeugt Reasoning-Text basierend auf Kontext.
 */
function buildReasoning(weapon: Weapon, ctx: LoadoutContext, role: string): string {
  const parts: string[] = [];

  if (weapon.tier === 'S') parts.push('S-Tier Waffe');
  if (weapon.dps > 180) parts.push(`hohe DPS (${weapon.dps.toFixed(0)})`);

  if (ctx.playStyle === 'aggressive' && (weapon.type === 'Shotgun' || weapon.type === 'SMG')) {
    parts.push('ideal für aggressive Close-Range-Pushes');
  }
  if (ctx.playStyle === 'passive' && weapon.type === 'Sniper') {
    parts.push('perfekt für passive Long-Range-Plays');
  }
  if (ctx.zonePhase === 'end' && (weapon.type === 'Shotgun' || weapon.type === 'Explosive')) {
    parts.push('Endgame-Meta für Box-Fights');
  }
  if (ctx.mapArea === 'open' && weapon.range >= 80) {
    parts.push('großer Effektivbereich in offenem Gelände');
  }

  if (parts.length === 0) {
    parts.push(`solide ${role.toLowerCase()}-Option`);
  }

  return parts.join(', ');
}

/**
 * Optimiert ein 5-Slot-Loadout.
 */
export function optimizeLoadout(ctx: LoadoutContext): LoadoutResult {
  const recommendations: SlotRecommendation[] = [];
  const usedWeapons = new Set<string>();

  for (let i = 0; i < SLOT_ROLES.length; i++) {
    const slot = SLOT_ROLES[i];
    const candidates = WEAPONS.filter(
      (w) => slot.types.includes(w.type) && !usedWeapons.has(w.id),
    );

    if (candidates.length === 0) continue;

    const scored = candidates.map((w) => ({
      weapon: w,
      score: scoreWeapon(w, ctx),
    }));

    scored.sort((a, b) => b.score - a.score);
    const best = scored[0];

    recommendations.push({
      slot: i + 1,
      role: slot.role,
      weapon: best.weapon,
      score: Math.round(best.score),
      reasoning: buildReasoning(best.weapon, ctx, slot.role),
    });

    usedWeapons.add(best.weapon.id);
  }

  const totalScore = recommendations.reduce((sum, r) => sum + r.score, 0);

  // Tipps generieren
  const tips = generateTips(ctx, recommendations);

  return {
    context: ctx,
    recommendations,
    totalScore,
    tips,
  };
}

/**
 * Erzeugt situationsbezogene Tipps.
 */
function generateTips(ctx: LoadoutContext, recs: SlotRecommendation[]): string[] {
  const tips: string[] = [];

  if (ctx.playStyle === 'aggressive' && ctx.zonePhase === 'end') {
    tips.push('Endgame + Aggressiv: Fokussiere auf Box-Fights. Halte deine Shotgun immer in der Primary-Hand.');
  }

  if (ctx.mapArea === 'open' && ctx.zonePhase === 'mid') {
    tips.push('Offenes Mid-Game: Baue aktiv Ramps für Cover. Halte Sniper-Schildbatterien bereit.');
  }

  if (ctx.skillLevel === 'competitive') {
    tips.push('Competitive-Modus: Swap-Reihenfolge ist kritisch. Übe Muscle-Memory für Slot-1→Slot-2 Shotgun-Swap unter 0.3s.');
  }

  const hasExplosive = recs.some((r) => r.weapon.type === 'Explosive');
  if (hasExplosive && ctx.zonePhase === 'end') {
    tips.push('Explosive im Endgame: Nutze sie gegen Mega-Builds. Keine unnötigen Rockets im Eröffnungskampf.');
  }

  const hasSniper = recs.some((r) => r.weapon.type === 'Sniper');
  if (!hasSniper && ctx.mapArea === 'open') {
    tips.push('Offenes Gelände ohne Sniper: Hol dir einen im nächsten Loot-Drop oder Supply.');
  }

  if (tips.length === 0) {
    tips.push('Solides Balanced-Setup. Fokussiere auf Weapon-Swap-Speed und Material-Management.');
  }

  return tips;
}
