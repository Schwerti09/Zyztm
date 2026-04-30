#!/usr/bin/env node

/**
 * shop-tweet.mjs — Täglicher Fortnite Shop Tweet
 *
 * Fetcht den aktuellen Item Shop von fortnite-api.com,
 * formatiert einen Tweet und postet ihn via Twitter API v2.
 *
 * Usage:
 *   node scripts/shop-tweet.mjs              # Dry-Run (kein Post)
 *   node scripts/shop-tweet.mjs --post       # Live-Post
 *   node scripts/shop-tweet.mjs --format=gem # Hidden Gem Format
 *
 * ENV:
 *   TWITTER_API_KEY, TWITTER_API_SECRET,
 *   TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET
 *
 * Cron: Täglich 00:15 UTC (15 Min nach Shop-Rotation)
 */

import { postTweet, dryRunTweet } from './lib/twitter-client.mjs';
import { shopUpdateTweet, hiddenGemTweet, validateTweet } from './lib/tweet-templates.mjs';

const FN_API = 'https://fortnite-api.com/v2';

// ─── Shop-Daten fetchen ──────────────────────────────────────────────────────

async function fetchShop() {
  // /v2/shop (flat entries list) — /v2/shop/br ist deprecated (410)
  const res = await fetch(`${FN_API}/shop?language=de`);
  if (!res.ok) throw new Error(`Shop API ${res.status}`);
  const json = await res.json();
  return json.data;
}

// ─── Rarity-Score berechnen (Tage seit letztem Erscheinen) ───────────────────

function calcDaysSince(dateStr) {
  if (!dateStr) return 0;
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function extractItems(raw) {
  const allItems = [];
  const seen = new Set();

  // /v2/shop returns flat { entries: [...] }
  const entries = raw.entries || [];
  for (const entry of entries) {
    if (!entry.brItems || entry.brItems.length === 0) continue;
    const item = entry.brItems[0];

    // Deduplizieren nach Item-ID
    if (seen.has(item.id)) continue;
    seen.add(item.id);

    const shopHistory = item.shopHistory || [];
    // lastSeen = vorletzte Erscheinung (nicht die heutige)
    const lastSeen = shopHistory.length > 1 ? shopHistory[shopHistory.length - 2] : null;
    const daysSinceLast = lastSeen ? calcDaysSince(lastSeen) : 0; // 0 = keine History bekannt

    const rarityCap = item.rarity.value.charAt(0).toUpperCase() + item.rarity.value.slice(1);

    allItems.push({
      name: item.name,
      rarity: rarityCap,
      price: entry.finalPrice,
      type: item.type?.displayValue || 'Cosmetic',
      featured: entry.sortPriority <= 0,
      daysSinceLast,
    });
  }

  return allItems;
}

// ─── Tweet generieren ────────────────────────────────────────────────────────

function buildTweet(items, format) {
  // Rare Items (90+ Tage nicht gesehen)
  const rare = items
    .filter((i) => i.daysSinceLast >= 90)
    .sort((a, b) => b.daysSinceLast - a.daysSinceLast);

  // Hidden Gem Format: wenn ein richtig seltenes Item da ist
  if (format === 'gem' && rare.length > 0) {
    return hiddenGemTweet(rare[0]);
  }

  // Auto-detect: wenn ein Item 180+ Tage nicht da war → Hidden Gem
  if (format === 'auto' && rare.some((r) => r.daysSinceLast >= 180)) {
    return hiddenGemTweet(rare.find((r) => r.daysSinceLast >= 180));
  }

  // Default: Shop Update
  const featured = items
    .filter((i) => i.featured)
    .slice(0, 4);

  // Fallback wenn keine featured Items
  const displayItems = featured.length > 0 ? featured : items.slice(0, 4);

  return shopUpdateTweet({
    totalItems: items.length,
    featured: displayItems,
    rare: rare.slice(0, 2),
  });
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const shouldPost = args.includes('--post');
  const formatArg = args.find((a) => a.startsWith('--format='));
  const format = formatArg ? formatArg.split('=')[1] : 'auto';

  console.log('🛒 Fetching Fortnite Item Shop...');
  const raw = await fetchShop();
  const items = extractItems(raw);
  console.log(`   ${items.length} Items gefunden.`);

  const tweet = buildTweet(items, format);
  const validation = validateTweet(tweet);

  if (!validation.valid) {
    console.error(`❌ Tweet zu lang: ${validation.length}/280 (+${validation.over} Zeichen)`);
    process.exit(1);
  }

  if (shouldPost) {
    console.log('📤 Posting to Twitter...');
    try {
      const result = await postTweet(tweet);
      console.log(`✅ Tweet gepostet: https://twitter.com/i/web/status/${result.id}`);
    } catch (err) {
      console.error('❌ Posting fehlgeschlagen:', err.message);
      process.exit(1);
    }
  } else {
    dryRunTweet(tweet);
    console.log('ℹ️  Nutze --post zum tatsächlichen Posten.');
  }
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
