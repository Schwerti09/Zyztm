/**
 * GET /.netlify/functions/clips-top
 * Returns the top 5 clips ordered by views DESC.
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
      `SELECT id, title, thumbnail, url, views, product_tag, created_at
         FROM clips
        ORDER BY views DESC
        LIMIT 5`,
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clips: result.rows }),
    };
  } catch (err) {
    // Table does not exist yet – return empty list (PostgreSQL error code 42P01).
    if (err.code === '42P01') {
      console.warn('[clips-top] clips table does not exist yet – returning empty list');
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clips: [] }),
      };
    }
    console.error('[clips-top] Error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  } finally {
    await pool.end();
  }
};
