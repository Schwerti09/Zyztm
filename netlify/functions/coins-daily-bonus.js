/**
 * POST /.netlify/functions/coins-daily-bonus
 * Claims the daily JOJOJO Coin bonus for a user.
 * Returns 409 if already claimed today.
 *
 * Required env vars: DATABASE_URL
 * Body: { email: string }
 */
import { neon } from '@neondatabase/serverless';

const DAILY_BONUS = 10;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Method Not Allowed' }) };
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
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid request body' }),
    };
  }

  const email = body.email;
  if (!email) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'email is required' }),
    };
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Look up user, or create them if they don't exist yet
    const userRows = await sql`
      SELECT id, coins FROM users WHERE email = ${email.trim().toLowerCase()} LIMIT 1
    `;

    let userId;
    if (userRows.length === 0) {
      // Auto-create user on first bonus claim; ON CONFLICT handles races
      const created = await sql`
        INSERT INTO users (email, coins, last_login)
        VALUES (${email.trim().toLowerCase()}, ${DAILY_BONUS}, NOW())
        ON CONFLICT (email) DO NOTHING
        RETURNING id, coins
      `;
      if (created.length === 0) {
        // Race: another request just created this user – re-fetch and fall through
        const retry = await sql`SELECT id FROM users WHERE email = ${email.trim().toLowerCase()} LIMIT 1`;
        if (retry.length === 0) throw new Error('User creation failed');
        userId = retry[0].id;
      } else {
        await sql`
          INSERT INTO coin_transactions (user_id, amount, type, reason)
          VALUES (${created[0].id}, ${DAILY_BONUS}, 'daily_bonus', 'Täglicher Bonus')
        `;
        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ coins: created[0].coins, bonusAwarded: DAILY_BONUS }),
        };
      }
    } else {
      userId = userRows[0].id;
    }

    // Atomic update: only applies when last_login is NULL or on a different UTC date.
    // Using DATE() on both sides ensures timezone-consistent comparison at the DB level
    // and prevents race conditions (a second concurrent request would update 0 rows).
    const updated = await sql`
      UPDATE users
      SET coins = coins + ${DAILY_BONUS}, last_login = NOW()
      WHERE id = ${userId}
        AND (last_login IS NULL OR DATE(last_login) < DATE(NOW()))
      RETURNING coins
    `;

    if (updated.length === 0) {
      // Bonus already claimed today (either by this or a concurrent request)
      const current = await sql`SELECT coins FROM users WHERE id = ${userId} LIMIT 1`;
      return {
        statusCode: 409,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Bonus already claimed today', coins: current[0]?.coins ?? 0 }),
      };
    }

    await sql`
      INSERT INTO coin_transactions (user_id, amount, type, reason)
      VALUES (${userId}, ${DAILY_BONUS}, 'daily_bonus', 'Täglicher Bonus')
    `;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coins: updated[0].coins, bonusAwarded: DAILY_BONUS }),
    };
  } catch (err) {
    console.error('coins-daily-bonus error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
