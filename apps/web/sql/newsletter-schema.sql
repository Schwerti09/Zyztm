-- Newsletter Subscribers Table
-- Für den Fortnite Nexus Weekly Meta Report

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  referral_code VARCHAR(50),           -- Code der zur Anmeldung geführt hat
  referral_code_own VARCHAR(50) UNIQUE, -- Eigener Referral-Code des Users
  referral_count INTEGER DEFAULT 0,     -- Wie viele User dieser Subscriber geworben hat
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed  BOOLEAN DEFAULT FALSE,
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_referral ON newsletter_subscribers(referral_code_own);
