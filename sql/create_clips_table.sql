-- Create the clips table for DB-managed Kick/Streamcharts clips.
-- Run once against your Postgres/Neon database.

CREATE TABLE IF NOT EXISTS clips (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT        NOT NULL DEFAULT '',
  thumbnail   TEXT        NOT NULL DEFAULT '',
  url         TEXT        NOT NULL UNIQUE,
  views       INTEGER     NOT NULL DEFAULT 0,
  product_tag TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clips_product_tag ON clips (product_tag);
