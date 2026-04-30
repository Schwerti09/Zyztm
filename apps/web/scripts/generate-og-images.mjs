#!/usr/bin/env node

/**
 * generate-og-images.mjs — Generiert OG-Images für Social Media (SVG + PNG)
 *
 * Erzeugt 5 OG-Images für verschiedene Kontexte:
 *   1. default — General Purpose
 *   2. tools — Tool-Seiten
 *   3. shop — Item Shop
 *   4. pros — Pro-Player Settings
 *   5. weapons — Waffen-Datenbank
 *
 * Output: public/og/*.svg und public/og/*.png (wenn canvas installiert)
 *
 * Usage:
 *   node scripts/generate-og-images.mjs              # SVG + PNG (wenn möglich)
 *   node scripts/generate-og-images.mjs --svg-only  # Nur SVG
 *
 * PNG-Konvertierung erfordert: npm install canvas
 */

import { writeFile, mkdir } from 'fs/promises';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'public', 'og');

// Canvas für PNG-Konvertierung (optional)
let canvas;
let loadSVG;
try {
  const canvasModule = await import('canvas');
  canvas = canvasModule.default;
  loadSVG = canvasModule.loadSVG;
} catch {
  console.log('⚠️  Canvas nicht installiert — nur SVG-Output');
  console.log('   Für PNG: npm install canvas');
}

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
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
  }
];

/**
 * Konvertiert SVG zu PNG mit Canvas (wenn verfügbar)
 */
async function convertSvgToPng(svg, outputPath) {
  if (!canvas || !loadSVG) {
    return false;
  }

  try {
    const image = new canvas.Image();
    const svgBuffer = Buffer.from(svg);
    image.src = svgBuffer;

    const cvs = canvas.createCanvas(1200, 630);
    const ctx = cvs.getContext('2d');
    ctx.drawImage(image, 0, 0, 1200, 630);

    const pngBuffer = cvs.toBuffer('image/png');
    await writeFile(outputPath, pngBuffer);
    return true;
  } catch (err) {
    console.warn(`  ⚠️  PNG-Konvertierung fehlgeschlagen: ${err.message}`);
    return false;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const svgOnly = args.includes('--svg-only');

  ensureDir(OUTPUT_DIR);

  const pngAvailable = !!(canvas && loadSVG);
  console.log(pngAvailable ? '✅ Canvas verfügbar — generiere SVG + PNG' : '⚠️  Canvas nicht verfügbar — nur SVG');

  for (const img of images) {
    const svg = generateSvgOg(img);
    const basename = img.filename.replace('.png', '');

    // SVG immer generieren
    const svgPath = join(OUTPUT_DIR, `${basename}.svg`);
    writeFileSync(svgPath, svg);
    console.log(`✅ ${svgPath}`);

    // PNG generieren wenn verfügbar und nicht --svg-only
    if (!svgOnly && pngAvailable) {
      const pngPath = join(OUTPUT_DIR, `${basename}.png`);
      const success = await convertSvgToPng(svg, pngPath);
      if (success) {
        console.log(`✅ ${pngPath}`);
      }
    }
  }

  console.log(`\n📁 ${images.length} OG-Images generiert in ${OUTPUT_DIR}`);
  if (!pngAvailable && !svgOnly) {
    console.log('💡 Für PNG-Output: npm install canvas');
  }
}

main();
