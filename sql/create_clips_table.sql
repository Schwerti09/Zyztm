-- Create the clips table for DB-managed Kick/YouTube/TikTok clips.
-- Run once against your Postgres/Neon database.

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
);

CREATE INDEX IF NOT EXISTS idx_clips_product_tag ON clips (product_tag);
CREATE INDEX IF NOT EXISTS idx_clips_source      ON clips (source);
