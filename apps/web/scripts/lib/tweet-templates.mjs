/**
 * Tweet-Templates — basierend auf docs/masterplan/10-viral-growth-playbook.md
 *
 * 5 Formate:
 *   1. Shop-Update (daily, automatisch)
 *   2. Hidden Gem Discovery (bei seltenen Items)
 *   3. Stat Breakdown (wöchentlich)
 *   4. Quick Win Tip (2x/Woche)
 *   5. Controversial Take (1x/Woche)
 *
 * Viral Trigger Integration: Alle Formate nutzen autoTrigger für maximale Engagement
 */

import { autoTrigger } from './viral-triggers.mjs';

const DOMAIN = 'https://fortnitenexus.space';

const HASHTAGS = '#Fortnite #FortniteShop #FortniteMeta';
const HASHTAGS_SHORT = '#Fortnite #FortniteShop';

// ─── Format 1: Daily Shop Update ─────────────────────────────────────────────

/**
 * @param {{totalItems: number, featured: {name: string, rarity: string, price: number}[], rare: {name: string, daysSinceLast: number}[]}} data
 */
export function shopUpdateTweet(data) {
  const { totalItems, featured, rare } = data;

  const itemList = featured
    .slice(0, 3)
    .map((i) => `• ${i.name} — ${i.price} V-Bucks`)
    .join('\n');

  let rareSection = '';
  if (rare.length > 0) {
    rareSection = `\n\n🔥 ${rare[0].name} — ${rare[0].daysSinceLast}d nicht im Shop!`;
  }

  const base = `Fortnite Shop Update 🛒

${totalItems} Items heute:
${itemList}${rareSection}

${DOMAIN}/item-shop

${HASHTAGS_SHORT}`;

  // Viral Trigger: Scarcity wenn rare Items, sonst Social Proof
  const triggerContext = rare.length > 0
    ? { hours: 12, item: rare[0].name }
    : { count: 1500 };

  return autoTrigger(base, triggerContext);
}

// ─── Format 2: Hidden Gem Discovery ──────────────────────────────────────────

/**
 * @param {{name: string, daysSinceLast: number, rarity: string, price: number}} item
 */
export function hiddenGemTweet(item) {
  const base = `Dieses Item war ${item.daysSinceLast} Tage nicht im Shop 👀

${item.name} (${item.rarity}) ist zurück — nur ${item.price} V-Bucks.

Letztes Mal im Shop: vor ${item.daysSinceLast} Tagen.
Das könnte deine letzte Chance sein.

${DOMAIN}/item-shop

${HASHTAGS}`;

  // Viral Trigger: Scarcity (Zeitlimit + Item)
  return autoTrigger(base, { hours: 12, item: item.name });
}

// ─── Format 3: Stat Breakdown ────────────────────────────────────────────────

/**
 * @param {{weapon: string, dps: number, damage: number, tier: string, comparison: string}} data
 */
export function statBreakdownTweet(data) {
  const base = `${data.weapon} wird komplett unterschätzt 📊

${data.damage} Damage | ${data.dps} DPS | ${data.tier}-Tier

${data.comparison}

Vollständige Analyse:
${DOMAIN}/weapons

${HASHTAGS}`;

  // Viral Trigger: Authority (Stat + Pro-Referenz)
  return autoTrigger(base, { stat: `${data.weapon} ist unterschätzt`, pro: 'Bugha' });
}

// ─── Format 4: Quick Win Tip ─────────────────────────────────────────────────

/**
 * @param {{tip: string, explanation: string, result: string, link: string}} data
 */
export function quickWinTweet(data) {
  const base = `${data.tip} 🎯

${data.explanation}

${data.result}

Full Guide: ${DOMAIN}${data.link}

${HASHTAGS}`;

  // Viral Trigger: Surprise (Fact über den Tip)
  return autoTrigger(base, { fact: 'Die meisten Pros nutzen diesen Tip' });
}

// ─── Format 5: Controversial Take ────────────────────────────────────────────

/**
 * @param {{take: string, argument: string, counterpoint: string}} data
 */
export function controversialTweet(data) {
  const base = `Unpopular Opinion: ${data.take}

${data.argument}

${data.counterpoint}

Was denkt ihr? 👇

${HASHTAGS}`;

  // Viral Trigger: Controversy (Statement ist schon im take)
  return autoTrigger(base, { statement: data.take });
}

// ─── Helper: Zeichen-Check ───────────────────────────────────────────────────

export function validateTweet(text) {
  if (text.length > 280) {
    return { valid: false, length: text.length, over: text.length - 280 };
  }
  return { valid: true, length: text.length, over: 0 };
}
