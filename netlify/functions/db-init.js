/**
 * GET /.netlify/functions/db-init
 * One-time setup: creates the `clips` and `tiktok_likes` tables if they
 * do not already exist.  Call this once after a fresh database provisioning
 * to resolve the "relation 'clips' does not exist" error.
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
    await pool.query(`
      CREATE TABLE IF NOT EXISTS clips (
        id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
        title       TEXT        NOT NULL DEFAULT '',
        thumbnail   TEXT        NOT NULL DEFAULT '',
        url         TEXT        NOT NULL UNIQUE,
        views       INTEGER     NOT NULL DEFAULT 0,
        product_tag TEXT,
        source      VARCHAR(50)           DEFAULT 'kick',
        tiktok_id   TEXT,
        likes       INTEGER     NOT NULL DEFAULT 0,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_clips_product_tag ON clips (product_tag)
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_clips_source ON clips (source)
    `);

    // tiktok_likes references the users table which must already exist.
    // Wrap in its own try/catch so a missing users table does not prevent
    // the clips table from being created successfully.
    let tiktokLikesNote = null;
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS tiktok_likes (
          id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          clip_id    UUID        NOT NULL REFERENCES clips(id) ON DELETE CASCADE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          UNIQUE(user_id, clip_id)
        )
      `);

      await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_tiktok_likes_user ON tiktok_likes (user_id)
      `);
    } catch (likesErr) {
      // 42P01 = undefined table (users may not exist yet)
      console.warn('[db-init] tiktok_likes skipped:', likesErr.message);
      tiktokLikesNote = `tiktok_likes skipped: ${likesErr.message}`;
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message: 'Database tables initialised',
        ...(tiktokLikesNote && { note: tiktokLikesNote }),
      }),
    };
  } catch (err) {
    console.error('[db-init] Error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  } finally {
    await pool.end();
  }
};
