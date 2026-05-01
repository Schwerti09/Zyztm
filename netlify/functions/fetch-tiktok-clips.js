/**
 * Netlify Scheduled Function – fetch latest TikTok clips for @zyztm.
 * Runs once daily (configured in netlify.toml).
 *
 * This function attempts to extract video IDs from TikTok's public profile
 * page via a lightweight HTTP request + regex strategy. It then upserts the
 * found clips into the `clips` table with source = 'tiktok'.
 *
 * Required env vars:
 *   DATABASE_URL  – Postgres/Neon connection string
 *   TIKTOK_HANDLE – (optional) defaults to zyztm
 */
import pg from 'pg';

const { Pool } = pg;

const TIKTOK_HANDLE = process.env.TIKTOK_HANDLE ?? 'zyztm';

async function fetchTikTokVideos() {
  const url = `https://www.tiktok.com/@${TIKTOK_HANDLE}`;

  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; NexusBot/1.0; +https://fortnitenexus.space)',
      Accept: 'text/html',
    },
  });

  if (!response.ok) {
    throw new Error(`TikTok profile fetch failed: ${response.status}`);
  }

  const html = await response.text();

  // Extract video IDs embedded in the page's JSON data
  const videoIdRegex = /"id":"(\d{15,20})"/g;
  const seen = new Set();
  const videos = [];

  let match;
  while ((match = videoIdRegex.exec(html)) !== null && videos.length < 10) {
    const id = match[1];
    if (seen.has(id)) continue;
    seen.add(id);

    // Try to extract title from nearby text
    const titleRegex = new RegExp(`"id":"${id}"[^}]*?"desc":"([^"]*)"`, 's');
    const titleMatch = titleRegex.exec(html);
    const title = titleMatch ? titleMatch[1] : `TikTok #${id}`;

    videos.push({
      tiktok_id: id,
      url: `https://www.tiktok.com/@${TIKTOK_HANDLE}/video/${id}`,
      thumbnail: `https://www.tiktok.com/api/img/?itemId=${id}&location=0`,
      title: title.substring(0, 255),
    });
  }

  return videos;
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
    const videos = await fetchTikTokVideos();

    if (videos.length === 0) {
      console.warn('[fetch-tiktok-clips] No TikTok videos found.');
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true, upserted: 0, message: 'No videos found' }),
      };
    }

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    for (const video of videos) {
      await pool.query(
        `INSERT INTO clips (title, thumbnail, url, tiktok_id, source, views)
         VALUES ($1, $2, $3, $4, 'tiktok', 0)
         ON CONFLICT (url) DO UPDATE
           SET title      = EXCLUDED.title,
               thumbnail  = EXCLUDED.thumbnail,
               tiktok_id  = EXCLUDED.tiktok_id`,
        [video.title, video.thumbnail, video.url, video.tiktok_id],
      );
    }

    await pool.end();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, upserted: videos.length }),
    };
  } catch (err) {
    console.error('[fetch-tiktok-clips] Error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
