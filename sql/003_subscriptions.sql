-- Subscriptions Table for Premium Membership System
CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  stripe_subscription_id VARCHAR(100) UNIQUE,
  stripe_customer_id VARCHAR(100),
  plan_type VARCHAR(50) NOT NULL, -- 'pro_monthly', 'pro_yearly', 'elite_monthly', 'elite_yearly'
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'canceled', 'past_due', 'trialing', 'incomplete'
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Subscription Benefits Tracking
CREATE TABLE IF NOT EXISTS user_benefits (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  benefit_type VARCHAR(50) NOT NULL, -- 'ad_free', 'early_access', 'custom_badge', 'beta_access', 'priority_support', 'coaching_session'
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP,
  granted_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Subscription Payments/Invoices
CREATE TABLE IF NOT EXISTS subscription_payments (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(100) NOT NULL,
  subscription_id INTEGER REFERENCES subscriptions(id) ON DELETE SET NULL,
  stripe_payment_intent_id VARCHAR(100),
  stripe_invoice_id VARCHAR(100),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  status VARCHAR(20) NOT NULL, -- 'pending', 'succeeded', 'failed', 'refunded'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscription Plan Definitions
CREATE TABLE IF NOT EXISTS subscription_plans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  plan_type VARCHAR(50) UNIQUE NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_yearly DECIMAL(10,2) NOT NULL,
  stripe_price_monthly_id VARCHAR(100),
  stripe_price_yearly_id VARCHAR(100),
  features JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_sub ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status) WHERE status = 'active';
CREATE INDEX idx_subscriptions_plan ON subscriptions(plan_type);
CREATE INDEX idx_user_benefits_user ON user_benefits(user_id);
CREATE INDEX idx_user_benefits_type ON user_benefits(benefit_type);
CREATE INDEX idx_user_benefits_active ON user_benefits(is_active) WHERE is_active = true;
CREATE INDEX idx_subscription_payments_user ON subscription_payments(user_id);
CREATE INDEX idx_subscription_payments_sub ON subscription_payments(subscription_id);
CREATE INDEX idx_subscription_plans_active ON subscription_plans(is_active) WHERE is_active = true;

-- Trigger to update updated_at timestamp for subscriptions
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update updated_at timestamp for subscription_plans
CREATE TRIGGER update_subscription_plans_updated_at BEFORE UPDATE ON subscription_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default subscription plans
INSERT INTO subscription_plans (name, plan_type, price_monthly, price_yearly, features) VALUES
(
  'Pro Monthly',
  'pro_monthly',
  4.99,
  49.99,
  '["Ad-free experience", "Early access to news", "Custom profile badges", "Discord Pro role", "Exclusive guides"]'::jsonb
),
(
  'Pro Yearly',
  'pro_yearly',
  4.99,
  49.99,
  '["Ad-free experience", "Early access to news", "Custom profile badges", "Discord Pro role", "Exclusive guides", "2 months free"]'::jsonb
),
(
  'Elite Monthly',
  'elite_monthly',
  9.99,
  99.99,
  '["All Pro benefits", "Monthly coaching session", "Exclusive skin templates", "Priority support", "Beta access", "Creator spotlight"]'::jsonb
),
(
  'Elite Yearly',
  'elite_yearly',
  9.99,
  99.99,
  '["All Pro benefits", "Monthly coaching session", "Exclusive skin templates", "Priority support", "Beta access", "Creator spotlight", "2 months free"]'::jsonb
)
ON CONFLICT (plan_type) DO NOTHING;
