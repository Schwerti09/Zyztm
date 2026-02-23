/**
 * GET /.netlify/functions/tiktok-liked
 * Returns clip IDs that a user has already liked.
 *
 * Query params: userId or email
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

  const { userId, email } = event.queryStringParameters ?? {};
  if (!userId && !email) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likedClipIds: [] }),
    };
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    let userRow = null;
    if (userId) {
      const { rows } = await pool.query('SELECT id FROM users WHERE id = $1', [userId]);
      userRow = rows[0] ?? null;
    } else if (email) {
      const { rows } = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      userRow = rows[0] ?? null;
    }

    if (!userRow) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likedClipIds: [] }),
      };
    }

    const result = await pool.query(
      'SELECT clip_id FROM tiktok_likes WHERE user_id = $1',
      [userRow.id],
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likedClipIds: result.rows.map((r) => r.clip_id) }),
    };
  } catch (err) {
    console.error('[tiktok-liked] Error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  } finally {
    await pool.end();
  }
};
