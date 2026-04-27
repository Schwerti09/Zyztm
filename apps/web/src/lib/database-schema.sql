-- =============================================================================
-- FORTNITE NEXUS - DIGITAL PRODUCTS DATABASE SCHEMA
-- =============================================================================
-- Purpose: Support automated delivery of digital products
-- Created: 2026-04-26
-- 
-- CRITICAL: Run this in Neon SQL Editor or via psql
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- PRODUCTS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- in cents (e.g., 999 = €9.99)
  file_path TEXT, -- R2/Storage path to digital file
  stripe_price_id TEXT UNIQUE,
  stripe_product_id TEXT,
  is_subscription BOOLEAN DEFAULT FALSE,
  subscription_interval TEXT CHECK (subscription_interval IN ('month', 'year', NULL)),
  active BOOLEAN DEFAULT TRUE,
  download_limit INTEGER DEFAULT 3, -- max downloads per purchase
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product metadata for display
CREATE TABLE IF NOT EXISTS product_metadata (
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  PRIMARY KEY (product_id, key)
);

-- =============================================================================
-- CUSTOMERS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  marketing_consent BOOLEAN DEFAULT FALSE,
  sac_code_used TEXT, -- Support-A-Creator code used
  total_orders INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0, -- in cents
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- ORDERS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  stripe_checkout_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  product_id TEXT REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  amount_total INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'eur',
  status TEXT CHECK (status IN ('pending', 'paid', 'fulfilled', 'failed', 'refunded', 'disputed')) DEFAULT 'pending',
  
  -- Digital delivery fields
  download_url TEXT,
  download_token TEXT UNIQUE, -- signed token for secure download
  download_expires_at TIMESTAMP WITH TIME ZONE,
  download_count INTEGER DEFAULT 0,
  download_limit INTEGER DEFAULT 3,
  
  -- Subscription fields
  subscription_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  ip_address TEXT, -- hashed/anonymized
  user_agent TEXT,
  referrer TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- DOWNLOAD LOGS (Fraud Detection)
-- =============================================================================
CREATE TABLE IF NOT EXISTS download_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id),
  ip_address TEXT, -- optional, consider hashing
  user_agent TEXT,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  success BOOLEAN DEFAULT TRUE
);

-- =============================================================================
-- EMAIL LOGS
-- =============================================================================
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id),
  email_type TEXT CHECK (email_type IN ('order_confirmation', 'download_reminder', 'expiry_warning', 'subscription_renewal', 'failed_payment')),
  recipient_email TEXT NOT NULL,
  subject TEXT,
  status TEXT CHECK (status IN ('queued', 'sent', 'delivered', 'bounced', 'failed')) DEFAULT 'queued',
  provider_message_id TEXT,
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- SUBSCRIPTIONS TABLE (for recurring products)
-- =============================================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id TEXT PRIMARY KEY, -- Stripe subscription ID
  customer_id UUID REFERENCES customers(id),
  order_id UUID REFERENCES orders(id),
  product_id TEXT REFERENCES products(id),
  status TEXT CHECK (status IN ('active', 'canceled', 'incomplete', 'past_due', 'unpaid')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  canceled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- INDICES FOR PERFORMANCE
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON orders(stripe_checkout_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_download_token ON orders(download_token);
CREATE INDEX IF NOT EXISTS idx_download_logs_order ON download_logs(order_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_order ON email_logs(order_id);
CREATE INDEX IF NOT EXISTS idx_customers_stripe ON customers(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Products: readable by all, writable by service role only
CREATE POLICY "Products readable by all" ON products
  FOR SELECT USING (active = TRUE);

-- Customers: users can only see their own data
CREATE POLICY "Customers own data only" ON customers
  FOR ALL USING (auth.uid()::text = id::text);

-- Orders: users can only see their own orders
CREATE POLICY "Orders own data only" ON orders
  FOR ALL USING (
    customer_id IN (SELECT id FROM customers WHERE id::text = auth.uid()::text)
  );

-- =============================================================================
-- TRIGGER FUNCTIONS
-- =============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- INITIAL PRODUCT DATA
-- =============================================================================

-- Pro Settings Pack (€9.99)
INSERT INTO products (id, name, description, price, file_path, stripe_price_id, is_subscription, download_limit)
VALUES (
  'pro-settings-pack',
  'Pro Settings Pack',
  'Optimierte GameUserSettings.ini, Windows 11 Gaming Guide, NVIDIA Setup Screenshots und 15-Min Video-Tutorial für 240 FPS.',
  999,
  'products/pro-settings-pack.zip',
  NULL, -- Add after creating in Stripe
  FALSE,
  3
)
ON CONFLICT (id) DO NOTHING;

-- Fortnite Season Checklist (€4.99)
INSERT INTO products (id, name, description, price, file_path, stripe_price_id, is_subscription, download_limit)
VALUES (
  'fortnite-checklist',
  'Fortnite Season X Checklist',
  'Komplette Checkliste mit allen Challenges, Secret Missions und optimaler Progression-Route. Als Notion-Template und PDF.',
  499,
  'products/fortnite-checklist.zip',
  NULL,
  FALSE,
  5
)
ON CONFLICT (id) DO NOTHING;

-- Weekly Meta Report Subscription (€7.99/month)
INSERT INTO products (id, name, description, price, file_path, stripe_price_id, is_subscription, subscription_interval, download_limit)
VALUES (
  'weekly-meta-report',
  'Weekly Meta Report',
  'Jede Woche aktuelle Meta-Analyse: Weapon Tier List, Map Changes, Pro Loadouts, Secret Tips. Direkt in dein Email-Postfach.',
  799,
  NULL, -- Email-based, no download
  NULL,
  TRUE,
  'month',
  999 -- Unlimited for subscriptions
)
ON CONFLICT (id) DO NOTHING;

-- Creator Setup Guide (€19.99)
INSERT INTO products (id, name, description, price, file_path, stripe_price_id, is_subscription, download_limit)
VALUES (
  'creator-setup-guide',
  'Creator Setup Guide',
  'Kompletter Guide für Streamer: OBS Setup, Scene Konfiguration, Audio-Optimierung, Thumbnail Workflow, Content Planung. 3h Video-Kurs + PDF.',
  1999,
  'products/creator-setup-guide.zip',
  NULL,
  FALSE,
  3
)
ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- VIEWS FOR ANALYTICS
-- =============================================================================

-- Daily sales summary
CREATE OR REPLACE VIEW daily_sales AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_orders,
  SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) as successful_orders,
  SUM(CASE WHEN status = 'paid' THEN amount_total ELSE 0 END) as revenue_cents,
  currency
FROM orders
GROUP BY DATE(created_at), currency
ORDER BY date DESC;

-- Product performance
CREATE OR REPLACE VIEW product_sales AS
SELECT 
  p.id,
  p.name,
  p.price,
  COUNT(o.id) as total_sales,
  SUM(CASE WHEN o.status = 'paid' THEN o.amount_total ELSE 0 END) as total_revenue,
  AVG(o.download_count) as avg_downloads
FROM products p
LEFT JOIN orders o ON p.id = o.product_id
WHERE p.active = TRUE
GROUP BY p.id, p.name, p.price;

-- =============================================================================
-- SETUP INSTRUCTIONS
-- =============================================================================

-- 1. Run this SQL in Neon SQL Editor or via psql
-- 2. Copy the connection string from Neon Console
-- 3. Add to .env:
--    DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
-- 4. Create Stripe products and update stripe_price_id in products table
-- 5. Upload digital files to R2/S3 and add URLs to products.file_url
-- 6. Test the flow end-to-end

-- =============================================================================
