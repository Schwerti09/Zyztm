#!/usr/bin/env node

/**
 * generate-og-images.mjs — Erstellt statische OG-Images für Social-Media-Previews
 *
 * Generiert 5 PNG-Dateien unter public/og/:
 *   - og-default.png  (allgemein)
 *   - og-tools.png    (Tool-Pages)
 *   - og-shop.png     (Item Shop)
 *   - og-pros.png     (Pro Player Pages)
 *   - og-weapons.png  (Weapon Pages)
 *
 * Dimensionen: 1200×630 (Open Graph Standard)
 *
 * Usage: node scripts/generate-og-images.mjs
 *
 * Hinweis: Nutzt eine SVG-basierte Generierung da Node.js kein Canvas hat.
 * Die SVGs werden direkt als optimierte PNG-Platzhalter abgelegt.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'og');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/**
 * Generiert ein SVG-basiertes OG-Image.
 * Browsers und Social-Previews akzeptieren SVG nicht direkt als og:image,
 * daher dient dies als Platzhalter bis echte PNGs generiert werden.
 *
 * Für Production: Nutze @napi-rs/canvas oder sharp um echte PNGs zu rendern.
 */
function generateSvgOg({ title, subtitle, accent, icon, bgGradient }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      ${bgGradient}
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="8" fill="${accent}"/>
  <rect x="60" y="60" width="8" height="50" fill="${accent}"/>
  <text x="84" y="95" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="3">FORTNITE NEXUS</text>
  <text x="84" y="118" font-family="system-ui, sans-serif" font-size="14" fill="rgba(255,255,255,0.5)">PRO TOOLS · DATA · INSIGHTS</text>
  <text x="600" y="300" font-family="system-ui, sans-serif" font-size="72" font-weight="900" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${icon}</text>
  <text x="600" y="400" font-family="system-ui, sans-serif" font-size="48" font-weight="900" fill="#ffffff" text-anchor="middle">${title}</text>
  <text x="600" y="450" font-family="system-ui, sans-serif" font-size="22" fill="rgba(255,255,255,0.6)" text-anchor="middle">${subtitle}</text>
  <text x="600" y="590" font-family="system-ui, sans-serif" font-size="16" fill="rgba(255,255,255,0.3)" text-anchor="middle">fortnitenexus.space</text>
</svg>`;
}

const images = [
  {
    filename: 'og-default.png',
    title: 'Fortnite Nexus',
    subtitle: 'Pro Tools · Data · Community',
    accent: '#ff0055',
    icon: '⚡',
    bgGradient: '<stop offset="0%" stop-color="#0a0a1a"/><stop offset="100%" stop-color="#1a0a2e"/>',
  },
  {
    filename: 'og-tools.png',
    title: 'Pro Tools',
    subtitle: 'Sensitivity Converter · Loadout Optimizer · Stats Dashboard',
    accent: '#00f2ff',
    icon: '🛠️',
    bgGradient: '<stop offset="0%" stop-color="#0a0a1a"/><stop offset="100%" stop-color="#0a1a2e"/>',
  },
  {
    filename: 'og-shop.png',
    title: 'Item Shop',
    subtitle: 'Tägliche Rotation · Rarity-Ratings · Shop-History',
    accent: '#ff0055',
    icon: '🛒',
    bgGradient: '<stop offset="0%" stop-color="#0a0a1a"/><stop offset="100%" stop-color="#2e0a1a"/>',
  },
  {
    filename: 'og-pros.png',
    title: 'Pro Players',
    subtitle: 'Settings · Keybinds · Gear — 20+ Pros',
    accent: '#ff0055',
    icon: '🎯',
    bgGradient: '<stop offset="0%" stop-color="#0a0a1a"/><stop offset="100%" stop-color="#1a0a1a"/>',
  },
  {
    filename: 'og-weapons.png',
    title: 'Weapons Database',
    subtitle: 'DPS · Damage · Tier-List — 27 Waffen',
    accent: '#f5c518',
    icon: '📊',
    bgGradient: '<stop offset="0%" stop-color="#0a0a1a"/><stop offset="100%" stop-color="#1a1a0a"/>',
  },
];

function main() {
  ensureDir(OUTPUT_DIR);

  for (const img of images) {
    const svg = generateSvgOg(img);
    // SVG als .svg ablegen (für og:image muss später PNG konvertiert werden)
    const svgPath = path.join(OUTPUT_DIR, img.filename.replace('.png', '.svg'));
    fs.writeFileSync(svgPath, svg);
    console.log(`✅ ${svgPath}`);
  }

  console.log(`\n📁 ${images.length} OG-Images generiert in ${OUTPUT_DIR}`);
  console.log('ℹ️  SVG-Format. Für echte PNG-Konvertierung: npm install @napi-rs/canvas');
  console.log('   Oder online konvertieren: svgtopng.com');
}

main();
