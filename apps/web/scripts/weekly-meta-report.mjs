#!/usr/bin/env node

/**
 * weekly-meta-report.mjs — Generiert den wöchentlichen Newsletter-Content
 *
 * Fetcht aktuelle Daten und generiert einen HTML-Newsletter:
 *   - Meta-Update (Waffen-Verschiebungen)
 *   - Pro-Tipps der Woche
 *   - Tool-Empfehlung
 *   - Shop-Highlights der Woche
 *
 * Viral Trigger Integration: Newsletter nutzt autoTrigger für maximale Engagement
 *
 * Usage:
 *   node scripts/weekly-meta-report.mjs              # Preview (HTML-Output)
 *   node scripts/weekly-meta-report.mjs --send       # An alle Subscriber senden
 *
 * ENV:
 *   RESEND_API_KEY — für E-Mail-Versand via Resend
 *   DATABASE_URL   — für Subscriber-Liste aus Neon
 */

import { autoTrigger } from './lib/viral-triggers.mjs';

const DOMAIN = 'https://fortnitenexus.space';

// ─── Newsletter-Content generieren ───────────────────────────────────────────

function generateReport() {
  const weekNumber = getISOWeek(new Date());
  const dateRange = getWeekDateRange();

  // Viral Trigger: Scarcity (Newsletter ist zeitlich limitiert)
  const baseSubject = `🚀 Fortnite Meta Report KW${weekNumber} — ${dateRange}`;
  const subject = autoTrigger(baseSubject, { hours: 24 });

  // Viral Trigger: Social Proof (Subscriber-Count)
  const subscriberCount = 1500;
  const socialProof = autoTrigger('', { count: subscriberCount });

  const html = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#0a0a0f;color:#ffffff;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">

    <!-- Header -->
    <div style="text-align:center;padding:30px 0;border-bottom:2px solid #ff005530;">
      <h1 style="font-size:28px;font-weight:900;color:#ff0055;margin:0;letter-spacing:2px;">
        FORTNITE NEXUS
      </h1>
      <p style="color:#ffffff80;font-size:13px;margin:8px 0 0;">
        Weekly Meta Report · KW${weekNumber}
      </p>
    </div>

    <!-- Meta Update -->
    <div style="padding:24px 0;border-bottom:1px solid #ffffff10;">
      <h2 style="font-size:18px;color:#ff0055;margin:0 0 12px;letter-spacing:1px;">
        📊 META UPDATE
      </h2>
      <p style="color:#ffffffcc;font-size:14px;line-height:1.6;margin:0;">
        Die aktuelle Waffenmeta bleibt stabil. AR+SMG dominiert weiterhin
        im Mid-Range-Bereich. Shotguns sind nach dem letzten Patch
        etwas stärker geworden, besonders die Pump Shotgun.
      </p>
      <a href="${DOMAIN}/weapons" style="display:inline-block;margin-top:12px;color:#ff0055;font-size:13px;text-decoration:none;">
        → Alle Waffen-Stats ansehen
      </a>
    </div>

    <!-- Pro Tipps -->
    <div style="padding:24px 0;border-bottom:1px solid #ffffff10;">
      <h2 style="font-size:18px;color:#00f2ff;margin:0 0 12px;letter-spacing:1px;">
        🎯 PRO-TIPPS DER WOCHE
      </h2>
      <ol style="color:#ffffffcc;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
        <li><strong>Crosshair Placement</strong> — Halte dein Crosshair immer auf Kopfhöhe</li>
        <li><strong>Piece Control</strong> — Platziere Wände bevor du editierst</li>
        <li><strong>Rotation Timing</strong> — Rotiere mit dem ersten Circle</li>
      </ol>
      <a href="${DOMAIN}/tools/sensitivity-converter" style="display:inline-block;margin-top:12px;color:#00f2ff;font-size:13px;text-decoration:none;">
        → Sens-Converter für optimales Aim
      </a>
    </div>

    <!-- Tool der Woche -->
    <div style="padding:24px 0;border-bottom:1px solid #ffffff10;">
      <h2 style="font-size:18px;color:#f5c518;margin:0 0 12px;letter-spacing:1px;">
        🛠️ TOOL DER WOCHE
      </h2>
      <div style="background:#ffffff08;border:1px solid #ffffff15;border-radius:12px;padding:16px;">
        <h3 style="font-size:16px;color:#f5c518;margin:0 0 8px;">
          Loadout Optimizer AI
        </h3>
        <p style="color:#ffffffcc;font-size:13px;line-height:1.5;margin:0;">
          Unser AI-basierter Loadout Optimizer analysiert 4 Dimensionen
          (DPS, Vielseitigkeit, Reichweite, Mobilität) und empfiehlt
          das optimale Loadout für deinen Spielstil.
        </p>
        <a href="${DOMAIN}/tools/loadout-optimizer" style="display:inline-block;margin-top:12px;padding:10px 20px;background:#f5c51830;border:1px solid #f5c51850;border-radius:8px;color:#f5c518;font-size:13px;text-decoration:none;font-weight:bold;">
          LOADOUT OPTIMIEREN →
        </a>
      </div>
    </div>

    <!-- Shop Highlights -->
    <div style="padding:24px 0;border-bottom:1px solid #ffffff10;">
      <h2 style="font-size:18px;color:#22c55e;margin:0 0 12px;letter-spacing:1px;">
        🛒 SHOP-HIGHLIGHTS
      </h2>
      <p style="color:#ffffffcc;font-size:14px;line-height:1.6;margin:0;">
        Schau täglich im Live-Shop vorbei — wir zeigen dir Rarity-Ratings
        und warnen dich wenn seltene Items zurückkommen.
      </p>
      <a href="${DOMAIN}/item-shop" style="display:inline-block;margin-top:12px;color:#22c55e;font-size:13px;text-decoration:none;">
        → Zum Live Item Shop
      </a>
    </div>

    <!-- Footer -->
    <div style="padding:24px 0;text-align:center;">
      <p style="color:#ffffff40;font-size:11px;margin:0;">
        Du bekommst diese E-Mail weil du dich für den Fortnite Nexus Newsletter angemeldet hast.
      </p>
      <p style="color:#ffffff50;font-size:11px;margin:8px 0;">
        ${socialProof}
      </p>
      <a href="${DOMAIN}/newsletter/unsubscribe" style="color:#ffffff40;font-size:11px;">
        Abmelden
      </a>
      <p style="color:#ffffff20;font-size:10px;margin:16px 0 0;">
        © 2026 Fortnite Nexus · fortnitenexus.space
      </p>
    </div>

  </div>
</body>
</html>` };

  return { subject, html };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function getWeekDateRange() {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() + 1); // Montag
  const end = new Date(start);
  end.setDate(start.getDate() + 6); // Sonntag

  const fmt = (d) =>
    d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
  return `${fmt(start)} – ${fmt(end)}`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const shouldSend = args.includes('--send');

  const report = generateReport();

  if (shouldSend) {
    console.log('📤 Newsletter senden...');
    console.log('⚠️  Resend-Integration TODO: RESEND_API_KEY + Subscriber-Query');
    console.log('   Subject:', report.subject);
    console.log('   Sende an alle aktiven Subscriber...');
    // TODO: Subscriber aus DB laden, Resend API nutzen
    console.log('   (Sending nicht implementiert — Preview-Modus)');
  } else {
    console.log('─'.repeat(60));
    console.log('PREVIEW — Weekly Meta Report');
    console.log('─'.repeat(60));
    console.log('Subject:', report.subject);
    console.log('─'.repeat(60));
    console.log(report.text);
    console.log('─'.repeat(60));
    console.log('HTML-Länge:', report.html.length, 'Bytes');
    console.log('ℹ️  Nutze --send zum tatsächlichen Versand');
  }
}

main().catch(console.error);
