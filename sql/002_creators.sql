-- Creators Table for Creator Code Marketplace
CREATE TABLE IF NOT EXISTS creators (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  creator_code VARCHAR(20) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  avatar_url TEXT,
  bio TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  revenue_share_percentage DECIMAL(5,2) DEFAULT 50.00,
  total_revenue DECIMAL(10,2) DEFAULT 0.00,
  total_code_uses INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Creator Revenue Tracking
CREATE TABLE IF NOT EXISTS creator_revenue (
  id SERIAL PRIMARY KEY,
  creator_id INTEGER REFERENCES creators(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  source VARCHAR(50) NOT NULL, -- 'creator_code', 'subscription', 'affiliate', 'direct'
  transaction_id VARCHAR(100),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User-Creator Association (which creator a user supports)
CREATE TABLE IF NOT EXISTS user_creator_selection (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  creator_id INTEGER REFERENCES creators(id) ON DELETE SET NULL,
  selected_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Creator Code Usage Tracking
CREATE TABLE IF NOT EXISTS creator_code_uses (
  id SERIAL PRIMARY KEY,
  creator_id INTEGER REFERENCES creators(id) ON DELETE CASCADE,
  user_id VARCHAR(100),
  session_id VARCHAR(100),
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Creator Payouts
CREATE TABLE IF NOT EXISTS creator_payouts (
  id SERIAL PRIMARY KEY,
  creator_id INTEGER REFERENCES creators(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'paid', 'failed'
  payment_method VARCHAR(50),
  payment_details JSONB DEFAULT '{}'::jsonb,
  processed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_creators_code ON creators(creator_code);
CREATE INDEX idx_creators_active ON creators(is_active) WHERE is_active = true;
CREATE INDEX idx_creator_revenue_creator ON creator_revenue(creator_id);
CREATE INDEX idx_creator_revenue_created ON creator_revenue(created_at);
CREATE INDEX idx_user_creator_user ON user_creator_selection(user_id);
CREATE INDEX idx_user_creator_creator ON user_creator_selection(creator_id);
CREATE INDEX idx_creator_code_uses_creator ON creator_code_uses(creator_id);
CREATE INDEX idx_creator_code_uses_created ON creator_code_uses(created_at);
CREATE INDEX idx_creator_payouts_creator ON creator_payouts(creator_id);
CREATE INDEX idx_creator_payouts_status ON creator_payouts(status);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_creators_updated_at BEFORE UPDATE ON creators
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default creator (Zyztm as first creator)
INSERT INTO creators (name, creator_code, display_name, bio, social_links, is_verified, revenue_share_percentage)
VALUES (
  'Zyztm',
  'JOJOJO',
  'Zyztm',
  '#1 Fortnite Creator - Pro Streamer & Content Creator',
  '{"kick": "https://kick.com/zyztm", "youtube": "https://www.youtube.com/@Zyztm", "tiktok": "https://www.tiktok.com/@zyztm"}'::jsonb,
  true,
  50.00
) ON CONFLICT (creator_code) DO NOTHING;
