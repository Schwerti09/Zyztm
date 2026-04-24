import { Router, Request, Response } from 'express';
import { z } from 'zod';
import Stripe from 'stripe';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

// Subscription plan prices (in cents)
const SUBSCRIPTION_PRICES = {
  pro_monthly: 499, // €4.99
  pro_yearly: 4999, // €49.99
  elite_monthly: 999, // €9.99
  elite_yearly: 9999, // €99.99
};

// GET /api/subscriptions/plans - Get available subscription plans
router.get('/plans', async (req: Request, res: Response) => {
  try {
    // Return static plans for now (will be dynamic once DB schema is integrated)
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
    
    return res.json({ plans });
  } catch (err) {
    console.error('Error fetching subscription plans:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/subscriptions/status - Get user's subscription status
router.get('/status', async (req: Request, res: Response) => {
  try {
    const userId = req.query['userId'] as string | undefined;
    const email = req.query['email'] as string | undefined;
    
    if (!userId && !email) {
      return res.status(400).json({ error: 'userId or email is required' });
    }
    
    // For now, return null (will be implemented with DB integration)
    return res.json({ subscription: null, benefits: [] });
  } catch (err) {
    console.error('Error fetching subscription status:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/subscriptions/create - Create new subscription
router.post('/create', async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      userId: z.string().uuid().optional(),
      email: z.string().email().optional(),
      planType: z.enum(['pro_monthly', 'pro_yearly', 'elite_monthly', 'elite_yearly']),
      successUrl: z.string().url(),
      cancelUrl: z.string().url(),
    }).refine((d) => d.userId || d.email, { message: 'userId or email is required' });
    
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }
    
    const { userId, email, planType, successUrl, cancelUrl } = parsed.data;
    
    const priceInCents = SUBSCRIPTION_PRICES[planType];
    const interval = planType.includes('yearly') ? 'year' : 'month';
    
    // Create Stripe checkout session
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
              interval: interval as 'month' | 'year',
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
    
    return res.json({ url: session.url });
  } catch (err) {
    console.error('Error creating subscription:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/subscriptions/cancel - Cancel subscription
router.post('/cancel', async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      subscriptionId: z.string(),
    });
    
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.errors });
    }
    
    const { subscriptionId } = parsed.data;
    
    // Cancel at period end in Stripe
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
    
    return res.json({ success: true });
  } catch (err) {
    console.error('Error cancelling subscription:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/subscriptions/webhook - Stripe webhook handler
router.post('/webhook', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }
  
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    
    // Handle webhook events (will be expanded with DB integration)
    console.log('Webhook received:', event.type);
    
    return res.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    return res.status(400).json({ error: err.message });
  }
});

export default router;
