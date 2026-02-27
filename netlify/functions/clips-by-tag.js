/**
 * GET /.netlify/functions/clips-by-tag?tag=:tag
 * Also handles path-param style via splat redirect: /api/clips/by-tag/:tag
 * Returns a random clip associated with a product_tag, or a fallback JSON
 * if no clips are found.
 *
 * Required env vars: DATABASE_URL
 */
import pg from 'pg';

const { Pool } = pg;

export const handler = async (event) => {
  // Support both ?tag= (query param) and /api/clips/by-tag/:tag (path param via splat redirect)
  const pathTag = (event.path ?? '').split('/').filter(Boolean).pop() ?? '';
  const tag =
    event.queryStringParameters?.tag ??
    (pathTag && pathTag !== 'clips-by-tag' ? decodeURIComponent(pathTag) : '');

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
    // Table does not exist yet – return fallback (PostgreSQL error code 42P01).
    if (err.code === '42P01') {
      console.warn('[clips-by-tag] clips table does not exist yet – returning fallback');
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clip: null, fallback: true, message: 'Database not yet initialised' }),
      };
    }
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
