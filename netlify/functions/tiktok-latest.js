/**
 * GET /.netlify/functions/tiktok-latest
 * Returns the latest TikTok clips (source = 'tiktok') from the database.
 * Supports ?limit= and ?offset= for pagination.
 *
 * Required env vars: DATABASE_URL
 */
import pg from 'pg';

const { Pool } = pg;

export const handler = async (event) => {
  if (!process.env.DATABASE_URL) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'DATABASE_URL env var not configured' }),
    };
  }

  const limit = Math.min(parseInt(event.queryStringParameters?.limit ?? '12', 10), 50);
  const offset = Math.max(parseInt(event.queryStringParameters?.offset ?? '0', 10), 0);

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const result = await pool.query(
      `SELECT id, title, thumbnail, url, tiktok_id, likes, created_at
         FROM clips
        WHERE source = 'tiktok'
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clips: result.rows }),
    };
  } catch (err) {
    console.error('[tiktok-latest] Error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  } finally {
    await pool.end();
  }
};
