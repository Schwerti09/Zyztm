/**
 * GET /.netlify/functions/tiktok-manual
 * Returns manually seeded TikTok clips (source = 'tiktok') from the database.
 * Useful for displaying clips that were added via the admin panel or SQL seed.
 *
 * Required env vars: DATABASE_URL
 */
import pg from 'pg';

const { Pool } = pg;

export const handler = async () => {
  if (!process.env.DATABASE_URL) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'DATABASE_URL env var not configured' }),
    };
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const result = await pool.query(
      `SELECT id, title, thumbnail, url, tiktok_id, likes, created_at
         FROM clips
        WHERE source = 'tiktok'
        ORDER BY created_at DESC
        LIMIT 12`,
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clips: result.rows }),
    };
  } catch (err) {
    console.error('[tiktok-manual] Error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  } finally {
    await pool.end();
  }
};
