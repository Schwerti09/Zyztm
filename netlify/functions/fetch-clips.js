/**
 * Netlify Scheduled Function – fetch top Kick clips from Streamcharts.
 * Runs on a cron schedule (configured in netlify.toml).
 *
 * NOTE: The CSS selectors below are illustrative examples. Adjust them if
 *       the Streamcharts DOM structure differs when you first deploy.
 *       The site owner has granted permission to scrape this content.
 *
 * Required env vars:
 *   DATABASE_URL       – Postgres/Neon connection string
 *   STREAMCHARTS_URL   – (optional) defaults to https://streamscharts.com/channels/zyztm/clips
 */
import { JSDOM } from 'jsdom';
import pg from 'pg';

const { Pool } = pg;

async function fetchAndUpsertClips() {
  const url =
    process.env.STREAMCHARTS_URL ||
    'https://streamscharts.com/channels/zyztm/clips';

  const html = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; ZyztmBot/1.0; +https://zyztm.com)',
    },
  }).then((r) => r.text());

  const { window } = new JSDOM(html);
  const { document } = window;

  // Example selectors – adjust to match the actual Streamcharts DOM.
  const clipEls = Array.from(document.querySelectorAll('.clip-card')).slice(0, 5);

  if (clipEls.length === 0) {
    console.warn('[fetch-clips] No clip elements found – check CSS selectors.');
  }

  const clips = clipEls.map((el) => ({
    title: el.querySelector('.clip-title')?.textContent?.trim() ?? '',
    thumbnail: el.querySelector('img')?.src ?? '',
    url: el.querySelector('a')?.href ?? '',
    views: parseInt(el.querySelector('.clip-views')?.textContent?.replace(/\D/g, '') ?? '0', 10),
  }));

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
  }

  await pool.end();
  return clips;
}

export const handler = async () => {
  if (!process.env.DATABASE_URL) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'DATABASE_URL env var not configured' }),
    };
  }

  try {
    const clips = await fetchAndUpsertClips();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, upserted: clips.length, clips }),
    };
  } catch (err) {
    console.error('[fetch-clips] Error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
