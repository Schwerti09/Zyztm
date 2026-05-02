-- Patch History Table
-- Stores Fortnite patch information for meta tracking

CREATE TABLE IF NOT EXISTS patch_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version TEXT NOT NULL UNIQUE,
  patch_date DATE NOT NULL,
  season TEXT NOT NULL,
  chapter TEXT NOT NULL,
  description TEXT,
  weapon_changes JSONB DEFAULT '{}',
  map_changes JSONB DEFAULT '{}',
  meta_changes JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_patch_history_date ON patch_history(patch_date DESC);
CREATE INDEX IF NOT EXISTS idx_patch_history_season ON patch_history(season, chapter);
