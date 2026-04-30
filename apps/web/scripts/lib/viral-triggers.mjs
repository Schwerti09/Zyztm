/**
 * viral-triggers.mjs — Psychologische Trigger für virale Content-Generation
 *
 * Die 5 Trigger basieren auf dem Masterplan (docs/masterplan/10-viral-growth-playbook.md):
 *   1. Surprise — Unerwartete Fakten, "Wusstest du dass...?"
 *   2. Social Proof — "X Leute haben das heute gemacht", User-Stats
 *   3. Scarcity — "Nur X Items", Zeitlimit, "Letzte Chance"
 *   4. Authority — Pro-Player Quotes, Daten-gestützte Aussagen
 *   5. Controversy — Gegen-Meinung, "Die meisten machen es falsch"
 *
 * Usage:
 *   import { addTrigger, addAllTriggers } from './lib/viral-triggers.mjs';
 *   const text = addTrigger('surprise', 'Base text', context);
 *   const text = addAllTriggers('Base text', context, ['surprise', 'social-proof']);
 */

// ─── Trigger 1: Surprise ──────────────────────────────────────────────────────

export function surprise(context) {
  const surprises = [
    `Wusstest du: ${context.fact || 'Die meisten Pros spielen mit 800 DPI'}`,
    `Überraschung: ${context.fact || 'Nur 5% aller Spieler nutzen die optimale Sens'}`,
    `Kannst du glauben: ${context.fact || 'Dieser Skin war 200 Tage nicht im Shop'}`,
    `Fact check: ${context.fact || 'Die durchschnittliche cm/360° ist 28.5'}`,
  ];
  return surprises[Math.floor(Math.random() * surprises.length)];
}

// ─── Trigger 2: Social Proof ─────────────────────────────────────────────────

export function socialProof(context) {
  const proofs = [
    `${context.count || 1500} Nutzer haben diesen Code heute genutzt`,
    `${context.count || 5000} Community-Mitglieder vertrauen fortnitenexus.space`,
    `Schon ${context.count || 1000} Leute haben ihren Loadout optimiert`,
    `${context.count || 2000} Pro-Spieler nutzen diese Settings`,
  ];
  return proofs[Math.floor(Math.random() * proofs.length)];
}

// ─── Trigger 3: Scarcity ─────────────────────────────────────────────────────

export function scarcity(context) {
  const scarcities = [
    `⏰ Nur ${context.hours || 12} Stunden bis Shop-Rotation`,
    `⚡ ${context.remaining || 3} Items sind fast weg`,
    `🔥 Letzte Chance: ${context.item || 'Dieser Skin'} verschwindet bald`,
    `⚠️ Nur ${context.count || 5} Slots verfügbar`,
  ];
  return scarcities[Math.floor(Math.random() * scarcities.length)];
}

// ─── Trigger 4: Authority ────────────────────────────────────────────────────

export function authority(context) {
  const authorities = [
    `Laut Pro-Spieler ${context.pro || 'Bugha'}: "${context.quote || 'Low Sens ist besser'}"`,
    `Daten zeigen: ${context.stat || '65% der Pros spielen Low Sens'}`,
    `Basierend auf 20 Pro-Player Setups`,
    `Wissenschaftlich belegt: ${context.fact || 'Crosshair Placement ist wichtiger als Sens'}`,
  ];
  return authorities[Math.floor(Math.random() * authorities.length)];
}

// ─── Trigger 5: Controversy ─────────────────────────────────────────────────

export function controversy(context) {
  const controversies = [
    `Die meisten machen es falsch: ${context.statement || 'Hohe Sens ist besser'}`,
    `Gegen den Trend: ${context.statement || 'Du brauchst keine 144Hz'}`,
    `Unpopular opinion: ${context.statement || 'Shotguns sind überbewertet'}`,
    `Warum 90% der Spieler es falsch machen: ${context.reason || 'Sie copyen Pros blind'}`,
  ];
  return controversies[Math.floor(Math.random() * controversies.length)];
}

// ─── Compose: Einzelnen Trigger hinzufügen ───────────────────────────────────

export function addTrigger(triggerType, text, context = {}) {
  const triggers = {
    surprise,
    'social-proof': socialProof,
    scarcity,
    authority,
    controversy,
  };

  const fn = triggers[triggerType];
  if (!fn) return text;

  const triggerText = fn(context);
  return `${text}\n\n${triggerText}`;
}

// ─── Compose: Mehrere Trigger hinzufügen ─────────────────────────────────────

export function addAllTriggers(text, context = {}, triggerTypes = []) {
  let result = text;
  for (const type of triggerTypes) {
    result = addTrigger(type, result, context);
  }
  return result;
}

// ─── Smart Auto-Trigger: Wählt passenden Trigger basierend auf Kontext ───────

export function autoTrigger(text, context = {}) {
  const triggers = [];

  // Scarcity wenn Zeitlimit oder Countdown
  if (context.hours || context.remaining || context.item) {
    triggers.push('scarcity');
  }

  // Social Proof wenn User-Count vorhanden
  if (context.count) {
    triggers.push('social-proof');
  }

  // Authority wenn Pro-Name oder Stat
  if (context.pro || context.stat) {
    triggers.push('authority');
  }

  // Surprise wenn Fact
  if (context.fact) {
    triggers.push('surprise');
  }

  // Controversy wenn Statement
  if (context.statement) {
    triggers.push('controversy');
  }

  // Falls kein Kontext, zufälligen Trigger wählen
  if (triggers.length === 0) {
    const allTypes = ['surprise', 'social-proof', 'scarcity', 'authority', 'controversy'];
    triggers.push(allTypes[Math.floor(Math.random() * allTypes.length)]);
  }

  // Max 2 Trigger um nicht zu spammen
  const selected = triggers.slice(0, 2);
  return addAllTriggers(text, context, selected);
}
