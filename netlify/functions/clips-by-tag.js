/**
 * GET /.netlify/functions/clips-by-tag?tag=:tag
 * Returns a random clip associated with a product_tag, or a fallback JSON
 * if no clips are found.
 *
 * Required env vars: DATABASE_URL
 */
import pg from 'pg';

const { Pool } = pg;

export const handler = async (event) => {
  const tag = event.queryStringParameters?.tag ?? '';

  if (!tag) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing ?tag= query parameter' }),
    };
  }

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
      `SELECT id, title, thumbnail, url, views
         FROM clips
        WHERE product_tag = $1
        ORDER BY RANDOM()
        LIMIT 1`,
      [tag],
    );

    if (result.rows.length === 0) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clip: null,
          fallback: true,
          message: `No clips found for tag "${tag}"`,
        }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clip: result.rows[0], fallback: false }),
    };
  } catch (err) {
    console.error('[clips-by-tag] Error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  } finally {
    await pool.end();
  }
};
