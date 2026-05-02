/**
 * Stripe Subscription Webhook
 * Handles subscription events from Stripe
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

export const handler = async (event: HandlerEvent): Promise<HandlerResponse> => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const sig = event.headers['stripe-signature'] || event.headers['Stripe-Signature'];
  
  if (!sig) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No signature provided' }),
    };
  }

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      sig,
      webhookSecret
    );

    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan;

        if (userId && session.subscription) {
          // Update user tier based on plan
          const tier = plan?.includes('elite') ? 'elite' : 'pro';
          
          await sql`
            UPDATE users 
            SET tier = ${tier}
            WHERE id = ${userId}
          `;

          // Create subscription record
          await sql`
            INSERT INTO subscriptions (user_id, stripe_subscription_id, stripe_customer_id, plan_type, status, current_period_start, current_period_end)
            VALUES (${userId}, ${session.subscription}, ${session.customer}, ${plan}, 'active', NOW(), NOW() + INTERVAL '1 month')
            ON CONFLICT (user_id) DO UPDATE SET
              stripe_subscription_id = ${session.subscription},
              plan_type = ${plan},
              status = 'active',
              current_period_end = NOW() + INTERVAL '1 month'
          `;
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Find user by customer ID
        const user = await sql`
          SELECT id FROM users WHERE stripe_customer_id = ${customerId}
        `;

        if (user.length > 0) {
          const userId = user[0].id;
          const status = subscription.status;

          await sql`
            UPDATE subscriptions 
            SET status = ${status},
                current_period_start = to_timestamp(${subscription.current_period_start}),
                current_period_end = to_timestamp(${subscription.current_period_end})
            WHERE user_id = ${userId}
          `;

          // Update user tier based on subscription status
          if (status === 'active' || status === 'trialing') {
            const planType = subscription.items.data[0].price.lookup_key || '';
            const tier = planType.includes('elite') ? 'elite' : 'pro';
            await sql`
              UPDATE users SET tier = ${tier} WHERE id = ${userId}
            `;
          } else if (status === 'canceled' || status === 'past_due') {
            await sql`
              UPDATE users SET tier = 'free' WHERE id = ${userId}
            `;
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Find user by customer ID
        const user = await sql`
          SELECT id FROM users WHERE stripe_customer_id = ${customerId}
        `;

        if (user.length > 0) {
          const userId = user[0].id;

          // Update subscription status
          await sql`
            UPDATE subscriptions 
            SET status = 'canceled'
            WHERE user_id = ${userId}
          `;

          // Downgrade user to free tier
          await sql`
            UPDATE users SET tier = 'free' WHERE id = ${userId}
          `;
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (error) {
    console.error('Webhook error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: 'Webhook signature verification failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
