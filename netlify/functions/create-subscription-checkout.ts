/**
 * Create Subscription Checkout Session
 * Creates a Stripe checkout session for Pro/Elite subscriptions
 */

import Stripe from 'stripe';
import { neon } from '@neondatabase/serverless';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const sql = neon(process.env.DATABASE_URL!);

interface HandlerEvent {
  headers: Record<string, string>;
  httpMethod: string;
  body?: string;
}

interface HandlerResponse {
  statusCode: number;
  body: string;
  headers?: Record<string, string>;
}

const PRICE_IDS = {
  pro_monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
  pro_yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID!,
  elite_monthly: process.env.STRIPE_ELITE_MONTHLY_PRICE_ID!,
  elite_yearly: process.env.STRIPE_ELITE_YEARLY_PRICE_ID!,
};

export const handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { plan, userId, email } = JSON.parse(event.body || '{}');

    if (!plan || !userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Plan and userId are required' }),
      };
    }

    const priceId = PRICE_IDS[plan as keyof typeof PRICE_IDS];
    if (!priceId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid plan' }),
      };
    }

    // Get or create Stripe customer
    let customerId: string;
    const existingCustomer = await sql`
      SELECT stripe_customer_id FROM users WHERE id = ${userId}
    `;

    if (existingCustomer.length > 0 && existingCustomer[0].stripe_customer_id) {
      customerId = existingCustomer[0].stripe_customer_id;
    } else {
      const customer = await stripe.customers.create({
        email: email || undefined,
        metadata: { userId },
      });
      customerId = customer.id;

      // Update user with customer ID
      await sql`
        UPDATE users SET stripe_customer_id = ${customerId} WHERE id = ${userId}
      `;
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/subscription/cancel`,
      metadata: {
        userId,
        plan,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id, url: session.url }),
    };
  } catch (error) {
    console.error('Checkout session error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to create checkout session',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
