/**
 * Fortnite Nexus Stripe Webhook Handler
 * Handles Stripe webhook events for subscriptions
 *
 * Required env vars: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
 */
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export const handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Webhook secret not configured' }),
    };
  }

  try {
    const stripeEvent = stripe.webhooks.constructEvent(event.body, sig, webhookSecret);

    console.log('Webhook received:', stripeEvent.type);

    // Handle webhook events (will be expanded with DB integration)
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        console.log('Checkout session completed');
        break;
      case 'customer.subscription.deleted':
        console.log('Subscription deleted');
        break;
      case 'invoice.payment_succeeded':
        console.log('Invoice payment succeeded');
        break;
      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ received: true }),
    };
  } catch (err) {
    console.error('Webhook error:', err);
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
