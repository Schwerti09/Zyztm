/**
 * Fortnite Nexus Subscriptions API
 * Handles all subscription-related requests for Netlify Functions
 *
 * Required env vars: DATABASE_URL, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, FRONTEND_URL
 */
import { neon } from '@neondatabase/serverless';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

const SUBSCRIPTION_PRICES = {
  pro_monthly: 499,
  pro_yearly: 4999,
  elite_monthly: 999,
  elite_yearly: 9999,
};

export const handler = async (event) => {
  const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
  const path = event.path.replace('/.netlify/functions/subscriptions', '').replace('/api/subscriptions', '');
  const method = event.httpMethod;

  try {
    // GET /plans - Get available subscription plans
    if (method === 'GET' && path === '/plans') {
      const plans = [
        {
          id: 1,
          name: 'Pro Monthly',
          plan_type: 'pro_monthly',
          price_monthly: 4.99,
          price_yearly: 49.99,
          features: ['Ad-free experience', 'Early access to news', 'Custom profile badges', 'Discord Pro role', 'Exclusive guides'],
          is_active: true
        },
        {
          id: 2,
          name: 'Pro Yearly',
          plan_type: 'pro_yearly',
          price_monthly: 4.99,
          price_yearly: 49.99,
          features: ['Ad-free experience', 'Early access to news', 'Custom profile badges', 'Discord Pro role', 'Exclusive guides', '2 months free'],
          is_active: true
        },
        {
          id: 3,
          name: 'Elite Monthly',
          plan_type: 'elite_monthly',
          price_monthly: 9.99,
          price_yearly: 99.99,
          features: ['All Pro benefits', 'Monthly coaching session', 'Exclusive skin templates', 'Priority support', 'Beta access', 'Creator spotlight'],
          is_active: true
        },
        {
          id: 4,
          name: 'Elite Yearly',
          plan_type: 'elite_yearly',
          price_monthly: 9.99,
          price_yearly: 99.99,
          features: ['All Pro benefits', 'Monthly coaching session', 'Exclusive skin templates', 'Priority support', 'Beta access', 'Creator spotlight', '2 months free'],
          is_active: true
        }
      ];
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plans }),
      };
    }

    // GET /status - Get user's subscription status
    if (method === 'GET' && path === '/status') {
      const userId = event.queryStringParameters?.userId;
      const email = event.queryStringParameters?.email;

      if (!userId && !email) {
        return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'userId or email is required' }) };
      }

      if (!sql) {
        return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'DATABASE_URL not configured' }) };
      }

      // For now, return null (will be implemented with full DB integration)
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription: null, benefits: [] }),
      };
    }

    // POST /create - Create new subscription
    if (method === 'POST' && path === '/create') {
      const body = JSON.parse(event.body);
      const { userId, email, planType, successUrl, cancelUrl } = body;

      if (!userId && !email) {
        return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'userId or email is required' }) };
      }

      const validPlans = ['pro_monthly', 'pro_yearly', 'elite_monthly', 'elite_yearly'];
      if (!validPlans.includes(planType)) {
        return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Invalid plan type' }) };
      }

      const priceInCents = SUBSCRIPTION_PRICES[planType];
      const interval = planType.includes('yearly') ? 'year' : 'month';

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: `Fortnite Nexus ${planType.replace('_', ' ').toUpperCase()}`,
                description: planType.includes('yearly') ? 'Yearly subscription (2 months free)' : 'Monthly subscription',
              },
              unit_amount: priceInCents,
              recurring: {
                interval: interval,
              },
            },
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          userId: userId || '',
          email: email || '',
          planType,
        },
        allow_promotion_codes: true,
      });

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: session.url }),
      };
    }

    // POST /cancel - Cancel subscription
    if (method === 'POST' && path === '/cancel') {
      const body = JSON.parse(event.body);
      const { subscriptionId } = body;

      if (!subscriptionId) {
        return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'subscriptionId is required' }) };
      }

      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });

      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true }),
      };
    }

    return {
      statusCode: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Endpoint not found' }),
    };
  } catch (err) {
    console.error('Subscriptions API error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
