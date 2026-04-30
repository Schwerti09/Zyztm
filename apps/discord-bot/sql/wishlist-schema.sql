-- Wishlist Schema für Discord Bot
-- Speichert User-Wishlists und Challenge-Daten in Neon DB

-- Wishlist Items
CREATE TABLE IF NOT EXISTS wishlist_items (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  item_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, item_name)
);

-- Challenge Submissions
CREATE TABLE IF NOT EXISTS challenge_submissions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  week_number INTEGER NOT NULL,
  score INTEGER NOT NULL,
  proof_url TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, week_number)
);

-- Indexes für Performance
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist_items(user_id);
CREATE INDEX IF NOT EXISTS idx_challenge_user_week ON challenge_submissions(user_id, week_number);
