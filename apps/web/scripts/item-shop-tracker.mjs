#!/usr/bin/env node

/**
 * item-shop-tracker.mjs — Item Shop Tracker Automation
 *
 * Implementiert die Item Shop Tracker Rules aus AGENTS.md:
 *   - Daily fetch at 00:00 UTC
 *   - Compare with historical data
 *   - Identify rare items
 *   - Generate ratings with SAC code
 *   - Send Discord alerts for wishlist items
 *
 * Usage:
 *   node scripts/item-shop-tracker.mjs              # Fetch and track
 *   node scripts/item-shop-tracker.mjs --rare      # Identify rare items
 *   node scripts/item-shop-tracker.mjs --sac       # Generate SAC ratings
 *   node scripts/item-shop-tracker.mjs --alert     # Send Discord alerts
 *
 * ENV:
 *   DATABASE_URL — für Shop-Historie in Neon DB
 */

const SAC_CODE = 'ZYZTM';
const DOMAIN = 'https://fortnitenexus.space';

// ─── Fortnite API Fetch ───────────────────────────────────────────────────────

async function fetchItemShop() {
  try {
    const res = await fetch('https://fortnite-api.com/v2/shop/br');
    if (!res.ok) throw new Error(`API ${res.status}`);
    
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.error('Item Shop Fetch fehlgeschlagen:', err.message);
    return [];
  }
}

// ─── Historical Data Comparison ──────────────────────────────────────────────

async function getHistoricalData() {
  // Placeholder für Neon DB Query
  // In Production: Shop-Historie aus DB laden
  
  return {
    lastSeen: new Map(), // itemName -> lastSeenDate
    daysSinceLast: new Map() // itemName -> days
  };
}

async function compareWithHistorical(shopItems) {
  const historical = await getHistoricalData();
  const today = new Date();
  
  return shopItems.map((item) => {
    const lastSeen = historical.lastSeen.get(item.name);
    const daysSinceLast = lastSeen
      ? Math.floor((today - new Date(lastSeen)) / (1000 * 60 * 60 * 24))
      : 999; // Never seen
    
    return {
      ...item,
      daysSinceLast,
      rarity: daysSinceLast >= 90 ? 'RARE' : daysSinceLast >= 30 ? 'UNCOMMON' : 'COMMON'
    };
  });
}

// ─── Rare Items Identification ────────────────────────────────────────────────

function identifyRareItems(shopItems) {
  return shopItems
    .filter((item) => item.daysSinceLast >= 90)
    .sort((a, b) => b.daysSinceLast - a.daysSinceLast);
}

// ─── SAC Code Rating Generator ───────────────────────────────────────────────

function generateSACRating(item) {
  let rating = 0;
  let reasons = [];

  // Rarity Bonus
  if (item.daysSinceLast >= 180) {
    rating += 5;
    reasons.push('Ultra Rare (180+ days)');
  } else if (item.daysSinceLast >= 90) {
    rating += 4;
    reasons.push('Very Rare (90+ days)');
  } else if (item.daysSinceLast >= 30) {
    rating += 3;
    reasons.push('Rare (30+ days)');
  }

  // Price Bonus
  if (item.price && item.price >= 2000) {
    rating += 2;
    reasons.push('Premium Item (2000+ V-Bucks)');
  }

  // Type Bonus
  if (item.type && (item.type.includes('outfit') || item.type.includes('skin'))) {
    rating += 2;
    reasons.push('Skin/Outfit');
  }

  return {
    item: item.name,
    rating: Math.min(rating, 10), // Max 10
    reasons,
    sacCode: SAC_CODE,
    recommendation: rating >= 7 ? 'MUST BUY' : rating >= 5 ? 'RECOMMENDED' : 'OPTIONAL'
  };
}

// ─── Discord Alert Generator ─────────────────────────────────────────────────

function generateDiscordAlert(item, isWishlistItem = false) {
  const rating = generateSACRating(item);
  
  return {
    title: isWishlistItem ? '🔔 WISHLIST ALERT!' : '🛒 Item Shop Update',
    color: isWishlistItem ? 0x22c55e : 0xff0055,
    description: `**${item.name}** ist im Shop!\n\n` +
      `💰 ${item.price || 'N/A'} V-Bucks\n` +
      `⏱️ ${item.daysSinceLast}d nicht im Shop (${item.rarity})\n` +
      `⭐ Rating: ${rating.rating}/10 — ${rating.recommendation}\n\n` +
      `Nutze Creator-Code: **${SAC_CODE}**`,
    url: `${DOMAIN}/item-shop`,
    footer: { text: `Fortnite Nexus · Rating: ${rating.reasons.join(', ')}` }
  };
}

// ─── Wishlist Check ─────────────────────────────────────────────────────────

async function checkWishlist(shopItems) {
  // Placeholder für Discord Bot Wishlist Store
  // In Production: getUsersWantingItem() aufrufen
  
  const wishlistAlerts = [];
  
  for (const item of shopItems) {
    const userIds = []; // Placeholder: await getUsersWantingItem(item.name)
    
    if (userIds.length > 0) {
      wishlistAlerts.push({
        item,
        userIds,
        alert: generateDiscordAlert(item, true)
      });
    }
  }
  
  return wishlistAlerts;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const rareFlag = args.includes('--rare');
  const sacFlag = args.includes('--sac');
  const alertFlag = args.includes('--alert');

  console.log('🛒 Item Shop Tracker\n');

  // 1. Fetch Item Shop
  console.log('📡 Fetching Item Shop...');
  const shopItems = await fetchItemShop();
  console.log(`   ${shopItems.length} Items im Shop`);

  // 2. Compare with Historical Data
  console.log('📊 Comparing with historical data...');
  const enrichedItems = await compareWithHistorical(shopItems);

  // 3. Identify Rare Items
  if (rareFlag) {
    const rareItems = identifyRareItems(enrichedItems);
    console.log(`\n🔥 Rare Items (${rareItems.length}):`);
    rareItems.forEach((item, i) => {
      console.log(`   ${i + 1}. ${item.name} — ${item.daysSinceLast}d nicht im Shop`);
    });
  }

  // 4. Generate SAC Ratings
  if (sacFlag) {
    console.log('\n⭐ SAC Code Ratings:');
    enrichedItems.slice(0, 5).forEach((item) => {
      const rating = generateSACRating(item);
      console.log(`   ${rating.rating}/10 ${item.name} — ${rating.recommendation}`);
    });
  }

  // 5. Wishlist Alerts
  if (alertFlag) {
    console.log('\n🔔 Checking Wishlist...');
    const wishlistAlerts = await checkWishlist(enrichedItems);
    console.log(`   ${wishlistAlerts.length} Wishlist-Alerts generiert`);
  }

  // Summary
  console.log('\n📋 Summary:');
  console.log(`   Total Items: ${enrichedItems.length}`);
  console.log(`   Rare Items (90+ days): ${identifyRareItems(enrichedItems).length}`);
  console.log(`   SAC Code: ${SAC_CODE}`);
  console.log(`   ${DOMAIN}/item-shop`);
}

main();
