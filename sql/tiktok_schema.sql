-- TikTok Infinity Wall – schema additions.
-- Run once against your Postgres/Neon database.

-- 1. Extend the clips table
ALTER TABLE clips
  ADD COLUMN IF NOT EXISTS source     VARCHAR(50) DEFAULT 'kick',
  ADD COLUMN IF NOT EXISTS tiktok_id  TEXT,
  ADD COLUMN IF NOT EXISTS likes      INTEGER NOT NULL DEFAULT 0;

-- 2. Create the tiktok_likes table
CREATE TABLE IF NOT EXISTS tiktok_likes (
  id         UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  clip_id    UUID      NOT NULL REFERENCES clips(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, clip_id)
);

CREATE INDEX IF NOT EXISTS idx_tiktok_likes_user ON tiktok_likes (user_id);
CREATE INDEX IF NOT EXISTS idx_clips_source      ON clips (source);
