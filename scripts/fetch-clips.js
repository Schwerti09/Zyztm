#!/usr/bin/env node
/**
 * Standalone script that mirrors netlify/functions/fetch-clips.js.
 * Used by the GitHub Actions daily-fetch workflow as a backup to the
 * Netlify scheduled function.
 *
 * Required env vars:
 *   DATABASE_URL       – Postgres/Neon connection string
 *   STREAMCHARTS_URL   – (optional) defaults to https://streamscharts.com/channels/zyztm/clips
 */
import { JSDOM } from 'jsdom';
import pg from 'pg';

const { Pool } = pg;

async function run() {
  const url =
    process.env.STREAMCHARTS_URL ||
    'https://streamscharts.com/channels/zyztm/clips';

  console.log(`[fetch-clips] Fetching ${url}`);

  const html = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; ZyztmBot/1.0; +https://zyztm.com)',
    },
  }).then((r) => r.text());

  const { window } = new JSDOM(html);
  const { document } = window;

  // NOTE: Selectors are examples – adjust if the Streamcharts DOM differs.
  const clipEls = Array.from(document.querySelectorAll('.clip-card')).slice(0, 5);

  if (clipEls.length === 0) {
    console.warn('[fetch-clips] No clip elements found – check CSS selectors.');
  }

  const clips = clipEls.map((el) => ({
    title: el.querySelector('.clip-title')?.textContent?.trim() ?? '',
    thumbnail: el.querySelector('img')?.src ?? '',
    url: el.querySelector('a')?.href ?? '',
    views: parseInt(
      el.querySelector('.clip-views')?.textContent?.replace(/\D/g, '') ?? '0',
      10,
    ),
  }));

  if (!process.env.DATABASE_URL) {
    console.error('[fetch-clips] DATABASE_URL not set – skipping DB upsert.');
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  for (const clip of clips) {
    if (!clip.url) continue;
    await pool.query(
      `INSERT INTO clips (title, thumbnail, url, views)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (url) DO UPDATE
         SET title     = EXCLUDED.title,
             thumbnail = EXCLUDED.thumbnail,
             views     = EXCLUDED.views`,
      [clip.title, clip.thumbnail, clip.url, clip.views],
    );
    console.log(`[fetch-clips] Upserted: ${clip.title}`);
  }

  await pool.end();
  console.log(`[fetch-clips] Done. Upserted ${clips.length} clips.`);
}

run().catch((err) => {
  console.error('[fetch-clips] Fatal error:', err);
  process.exit(1);
});
