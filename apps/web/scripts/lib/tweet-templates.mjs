/**
 * Tweet-Templates — basierend auf docs/masterplan/10-viral-growth-playbook.md
 *
 * 5 Formate:
 *   1. Shop-Update (daily, automatisch)
 *   2. Hidden Gem Discovery (bei seltenen Items)
 *   3. Stat Breakdown (wöchentlich)
 *   4. Quick Win Tip (2x/Woche)
 *   5. Controversial Take (1x/Woche)
 */

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

  return `Fortnite Shop Update 🛒

${totalItems} Items heute:
${itemList}${rareSection}

${DOMAIN}/item-shop

${HASHTAGS_SHORT}`;
}

// ─── Format 2: Hidden Gem Discovery ──────────────────────────────────────────

/**
 * @param {{name: string, daysSinceLast: number, rarity: string, price: number}} item
 */
export function hiddenGemTweet(item) {
  return `Dieses Item war ${item.daysSinceLast} Tage nicht im Shop 👀

${item.name} (${item.rarity}) ist zurück — nur ${item.price} V-Bucks.

Letztes Mal im Shop: vor ${item.daysSinceLast} Tagen.
Das könnte deine letzte Chance sein.

${DOMAIN}/item-shop

${HASHTAGS}`;
}

// ─── Format 3: Stat Breakdown ────────────────────────────────────────────────

/**
 * @param {{weapon: string, dps: number, damage: number, tier: string, comparison: string}} data
 */
export function statBreakdownTweet(data) {
  return `${data.weapon} wird komplett unterschätzt 📊

${data.damage} Damage | ${data.dps} DPS | ${data.tier}-Tier

${data.comparison}

Vollständige Analyse:
${DOMAIN}/weapons

${HASHTAGS}`;
}

// ─── Format 4: Quick Win Tip ─────────────────────────────────────────────────

/**
 * @param {{tip: string, explanation: string, result: string, link: string}} data
 */
export function quickWinTweet(data) {
  return `${data.tip} 🎯

${data.explanation}

${data.result}

Full Guide: ${DOMAIN}${data.link}

${HASHTAGS}`;
}

// ─── Format 5: Controversial Take ────────────────────────────────────────────

/**
 * @param {{take: string, argument: string, counterpoint: string}} data
 */
export function controversialTweet(data) {
  return `Unpopular Opinion: ${data.take}

${data.argument}

${data.counterpoint}

Was denkt ihr? 👇

${HASHTAGS}`;
}

// ─── Helper: Zeichen-Check ───────────────────────────────────────────────────

export function validateTweet(text) {
  if (text.length > 280) {
    return { valid: false, length: text.length, over: text.length - 280 };
  }
  return { valid: true, length: text.length, over: 0 };
}
