#!/usr/bin/env node

/**
 * tiktok-script-generator.mjs — Generiert 15s Video-Scripts für TikTok/Reels
 *
 * Basiert auf 5 Video-Formaten aus dem Masterplan:
 *   1. Shop Speedrun — "Alle Items in 15 Sekunden"
 *   2. Hidden Gem Alert — "Dieser Skin war 200 Tage weg"
 *   3. Sensitivity Guide — "Die perfekte Sens in 15s"
 *   4. Pro Settings Reveal — "So spielt [Pro Name]"
 *   5. Stats Reaction — "Wenn du siehst was ich gestern gebaut hab"
 *
 * Usage:
 *   node scripts/tiktok-script-generator.mjs              # Auto-Format wählen
 *   node scripts/tiktok-script-generator.mjs --format=gem # Hidden Gem Script
 *   node scripts/tiktok-script-generator.mjs --all        # Alle 5 Formate
 *
 * Output: Fertige Scripts mit Timing-Markern (0-15s)
 */

const FN_API = 'https://fortnite-api.com/v2';

// ─── Shop-Daten fetchen ──────────────────────────────────────────────────────

async function fetchShop() {
  const res = await fetch(`${FN_API}/shop?language=de`);
  if (!res.ok) throw new Error(`Shop API ${res.status}`);
  const json = await res.json();

  const items = [];
  const seen = new Set();

  for (const entry of json.data.entries || []) {
    if (!entry.brItems?.length) continue;
    const item = entry.brItems[0];
    if (seen.has(item.id)) continue;
    seen.add(item.id);

    const shopHistory = item.shopHistory || [];
    const lastSeen = shopHistory.length > 1 ? shopHistory[shopHistory.length - 2] : null;
    const daysSinceLast = lastSeen
      ? Math.floor((Date.now() - new Date(lastSeen).getTime()) / (1000 * 60 * 60 * 24))
      : 0;

    items.push({
      name: item.name,
      price: entry.finalPrice,
      rarity: item.rarity?.value || 'Common',
      image: item.images?.featured || item.images?.icon || '',
      daysSinceLast,
    });
  }

  return { date: json.data.date, items };
}

// ─── Video Format 1: Shop Speedrun ───────────────────────────────────────────

function shopSpeedrunScript(shop) {
  const hotItems = shop.items
    .filter((i) => i.price >= 1500)
    .slice(0, 5);

  return {
    format: 'Shop Speedrun',
    hook: 'POV: Fortnite Shop Rotation in 15 Sekunden ⚡',
    duration: '0:00-0:15',
    visual: 'Schnelle Cuts zwischen Top-Items, Preise einblenden',
    audio: 'Trending Sound: "Oh no, oh no, oh no no no"',
    script: `
[0:00-0:03] HOOK: "Diese 5 Skins sind JETZT im Shop"
[0:03-0:06] Cut 1: "${hotItems[0]?.name || 'Skin 1'} — ${hotItems[0]?.price || 1500} V-Bucks"
[0:06-0:09] Cut 2: "${hotItems[1]?.name || 'Skin 2'} — ${hotItems[1]?.price || 1500} V-Bucks"
[0:09-0:12] Cut 3: "${hotItems[2]?.name || 'Skin 3'} — ${hotItems[2]?.price || 1500} V-Bucks"
[0:12-0:15] CTA: "Link in Bio für alle Items 👆"
    `.trim(),
    hashtags: '#Fortnite #ItemShop #FortniteShop #Gaming #FYP',
    caption: `Shop Rotation ${new Date(shop.date).toLocaleDateString('de-DE')} 📅 Alle Items auf fortnitenexus.space`,
  };
}

// ─── Video Format 2: Hidden Gem Alert ────────────────────────────────────────

function hiddenGemScript(shop) {
  const rare = shop.items
    .filter((i) => i.daysSinceLast >= 90)
    .sort((a, b) => b.daysSinceLast - a.daysSinceLast)[0];

  if (!rare) return null;

  return {
    format: 'Hidden Gem Alert',
    hook: `Dieser Skin war ${rare.daysSinceLast} Tage nicht im Shop 😱`,
    duration: '0:00-0:15',
    visual: 'Dramatic Zoom auf Item, Roter Kreis, Countdown-Overlay',
    audio: 'Trending Sound: Suspense/Alert Sound',
    script: `
[0:00-0:03] HOOK: "${rare.name} ist ZURÜCK"
[0:03-0:06] "Letztes Mal: vor ${rare.daysSinceLast} Tagen"
[0:06-0:10] "Das ist über ${Math.floor(rare.daysSinceLast / 30)} Monate"
[0:10-0:13] "Nur ${rare.price} V-Bucks"
[0:13-0:15] CTA: "Schnell holen bevor weg! ⏰"
    `.trim(),
    hashtags: '#Fortnite #RareSkin #ItemShop #FortniteLeaks #FYP',
    caption: `🔥 ${rare.name} ist nach ${rare.daysSinceLast} Tagen zurück!`,
  };
}

// ─── Video Format 3: Sensitivity Guide ───────────────────────────────────────

function sensGuideScript() {
  return {
    format: 'Sensitivity Guide',
    hook: 'Die perfekte Fortnite Sens in 15 Sekunden 🎯',
    duration: '0:00-0:15',
    visual: 'Text-Overlay mit Werten, Maus-Hand-Demo',
    audio: 'Trending Sound: Educational/Quick Tips',
    script: `
[0:00-0:03] HOOK: "So findest du DIE perfekte Sens"
[0:03-0:06] "Schritt 1: 800 DPI einstellen"
[0:06-0:09] "Schritt 2: 0.07-0.10 in-game"
[0:09-0:12] "Schritt 3: 25-35cm für 360°"
[0:12-0:15] CTA: "Converter in Bio für dein Spiel 👆"
    `.trim(),
    hashtags: '#Fortnite #Aim #Sensitivity #GamingSetup #ProSettings',
    caption: 'Die meisten Pros spielen zwischen 25-35cm/360° 🎯 Teste es!',
  };
}

// ─── Video Format 4: Pro Settings Reveal ─────────────────────────────────────

function proSettingsScript() {
  const pros = [
    { name: 'Bugha', sens: '0.072', dpi: 800, cm360: '33.8' },
    { name: 'TaySon', sens: '0.10', dpi: 800, cm360: '24.3' },
    { name: 'Mongraal', sens: '0.113', dpi: 400, cm360: '33.8' },
  ];
  const pro = pros[Math.floor(Math.random() * pros.length)];

  return {
    format: 'Pro Settings Reveal',
    hook: `So spielt ${pro.name} 🏆`,
    duration: '0:00-0:15',
    visual: 'Split Screen: Pro-Gameplay + Settings Overlay',
    audio: 'Trending Sound: Hype/Ambition',
    script: `
[0:00-0:03] HOOK: "${pro.name} Fortnite Settings"
[0:03-0:06] "Sens: ${pro.sens} @ ${pro.dpi} DPI"
[0:06-0:09] "Das sind ${pro.cm360}cm für 360°"
[0:09-0:12] "Low/Medium Sens = besseres Aim"
[0:12-0:15] CTA: "Alle 20 Pros auf der Website 👆"
    `.trim(),
    hashtags: '#Fortnite #ProSettings #${pro.name} #Esports #FYP',
    caption: `${pro.name}'s Settings: ${pro.sens} @ ${pro.dpi} DPI | ${pro.cm360}cm/360° 🎯`,
  };
}

// ─── Video Format 5: Stats Reaction ──────────────────────────────────────────

function statsReactionScript() {
  return {
    format: 'Stats Reaction',
    hook: 'Wenn du siehst was ich gestern gebaut hab 💀',
    duration: '0:00-0:15',
    visual: 'Gameplay-Aufnahme + Reaction-Cam (optional)',
    audio: 'Trending Sound: "How is that possible?"',
    script: `
[0:00-0:03] HOOK: "Meine Stats nach 1 Woche mit neuem Loadout"
[0:03-0:06] "Vorher: 1.2 K/D"
[0:06-0:10] "Nachher: 2.8 K/D"
[0:10-0:13] "Dank Loadout Optimizer"
[0:13-0:15] CTA: "Link in Bio, gratis testen 👆"
    `.trim(),
    hashtags: '#Fortnite #Stats #BeforeAfter #Gaming #FYP',
    caption: 'Loadout Optimizer hat meine Stats verdoppelt 📈 Link in Bio!',
  };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const formatArg = args.find((a) => a.startsWith('--format='));
  const showAll = args.includes('--all');

  console.log('🎬 TikTok Script Generator\n');

  let shop = null;
  try {
    shop = await fetchShop();
    console.log(`✅ Shop geladen: ${shop.items.length} Items\n`);
  } catch (err) {
    console.warn('⚠️ Shop nicht ladbar, nutze Fallback-Daten');
    shop = { date: new Date().toISOString(), items: [] };
  }

  const scripts = {
    speedrun: () => shopSpeedrunScript(shop),
    gem: () => hiddenGemScript(shop),
    sens: () => sensGuideScript(),
    pro: () => proSettingsScript(),
    stats: () => statsReactionScript(),
  };

  if (showAll) {
    for (const [name, fn] of Object.entries(scripts)) {
      const script = fn();
      if (!script) continue;

      console.log('═'.repeat(70));
      console.log(`FORMAT: ${script.format.toUpperCase()}`);
      console.log('─'.repeat(70));
      printScript(script);
      console.log();
    }
    return;
  }

  // Auto-Format: Priorisiere Hidden Gem wenn seltenes Item da ist
  const format = formatArg
    ? formatArg.split('=')[1]
    : shop.items.some((i) => i.daysSinceLast >= 90)
      ? 'gem'
      : 'speedrun';

  const fn = scripts[format];
  if (!fn) {
    console.error(`❌ Unbekanntes Format: ${format}`);
    console.error(`Verfügbar: ${Object.keys(scripts).join(', ')}`);
    process.exit(1);
  }

  const script = fn();
  if (!script) {
    console.log('ℹ️ Kein passendes Script für aktuellen Shop (keine raren Items)');
    console.log('Versuche: --format=speedrun oder --format=sens');
    return;
  }

  console.log('═'.repeat(70));
  console.log(`FORMAT: ${script.format.toUpperCase()}`);
  console.log('═'.repeat(70));
  printScript(script);
}

function printScript(s) {
  console.log(`
🪝 HOOK (erste 3 Sekunden):
   "${s.hook}"

⏱️  TIMING: ${s.duration}

🎥 VISUAL:
   ${s.visual}

🔊 AUDIO:
   ${s.audio}

📝 SCRIPT:
${s.script}

#️⃣ HASHTAGS:
   ${s.hashtags}

✍️  CAPTION:
   ${s.caption}
  `);
}

main().catch(console.error);
