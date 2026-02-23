/**
 * POST /.netlify/functions/tiktok-like
 * Like a TikTok clip – costs 1 JOJOJO Coin.
 *
 * Body: { clipId: string, userId?: string, email?: string }
 *
 * Required env vars: DATABASE_URL
 */
import pg from 'pg';

const { Pool } = pg;
const LIKE_COST = 1;

async function resolveUser(pool, userId, email) {
  if (userId) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    return rows[0] ?? null;
  }
  if (email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows[0]) return rows[0];
    // Auto-register
    const insert = await pool.query(
      'INSERT INTO users (email) VALUES ($1) ON CONFLICT (email) DO NOTHING RETURNING *',
      [email],
    );
    if (insert.rows[0]) return insert.rows[0];
    const retry = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return retry.rows[0] ?? null;
  }
  return null;
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  if (!process.env.DATABASE_URL) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'DATABASE_URL env var not configured' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body ?? '{}');
  } catch {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { clipId, userId, email } = body;
  if (!clipId) {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'clipId is required' }) };
  }
  if (!userId && !email) {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'userId or email is required' }) };
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    const user = await resolveUser(pool, userId, email);
    if (!user) {
      return { statusCode: 404, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'User not found' }) };
    }

    // Check clip exists
    const clipResult = await pool.query('SELECT id, likes FROM clips WHERE id = $1', [clipId]);
    if (clipResult.rows.length === 0) {
      return { statusCode: 404, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Clip not found' }) };
    }
    const clip = clipResult.rows[0];

    // Check for existing like
    const existingLike = await pool.query(
      'SELECT id FROM tiktok_likes WHERE user_id = $1 AND clip_id = $2',
      [user.id, clipId],
    );
    if (existingLike.rows.length > 0) {
      return { statusCode: 409, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Already liked', likes: clip.likes }) };
    }

    // Check coin balance
    if ((user.coins ?? 0) < LIKE_COST) {
      return {
        statusCode: 402,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Not enough coins', required: LIKE_COST, balance: user.coins ?? 0 }),
      };
    }

    // Deduct coin
    await pool.query('UPDATE users SET coins = coins - $1 WHERE id = $2', [LIKE_COST, user.id]);
    await pool.query(
      `INSERT INTO coin_transactions (user_id, amount, type, reason)
       VALUES ($1, $2, 'tiktok_like', 'TikTok Clip geliket')`,
      [user.id, -LIKE_COST],
    );

    // Record like and increment counter
    await pool.query(
      'INSERT INTO tiktok_likes (user_id, clip_id) VALUES ($1, $2)',
      [user.id, clipId],
    );
    const updated = await pool.query(
      'UPDATE clips SET likes = likes + 1 WHERE id = $1 RETURNING likes',
      [clipId],
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, likes: updated.rows[0]?.likes ?? clip.likes + 1 }),
    };
  } catch (err) {
    console.error('[tiktok-like] Error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  } finally {
    await pool.end();
  }
};
