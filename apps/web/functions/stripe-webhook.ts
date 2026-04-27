/**
 * Stripe Webhook Handler
 * Processes payment events and triggers automated fulfillment
 * 
 * CRITICAL: This must be deployed as a Netlify Function
 * Endpoint: POST /.netlify/functions/stripe-webhook
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { stripeServer, stripeWebhookSecretKey, verifyWebhookSignature, constructEventFromPayload } from '../src/lib/stripe-client';
import { upsertCustomer, createOrder, fulfillOrder, createSubscription, processRefund } from '../src/lib/order-service';
import { getDb } from '../src/lib/db-client';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Get Stripe signature
  const signature = event.headers['stripe-signature'];
  if (!signature) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing Stripe signature' }),
    };
  }

  try {
    let stripeEvent;

    // Verify webhook signature (in production)
    if (stripeWebhookSecretKey && process.env.NODE_ENV === 'production') {
      const { event: verifiedEvent, error } = verifyWebhookSignature(event.body!, signature);
      if (error || !verifiedEvent) {
        console.error('Webhook signature verification failed:', error);
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid signature' }),
        };
      }
      stripeEvent = verifiedEvent;
    } else {
      // Development: parse without verification
      console.warn('⚠️ Running in development mode - webhook signature not verified');
      stripeEvent = constructEventFromPayload(event.body!);
    }

    console.log('📨 Stripe webhook received:', stripeEvent.type);

    // Process based on event type
    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = stripeEvent.data.object;
        // Handle async payment methods (like SEPA)
        if (session.payment_status === 'paid') {
          await handleCheckoutCompleted(session);
        }
        break;
      }

      case 'invoice.paid': {
        const invoice = stripeEvent.data.object;
        // Handle subscription renewal
        await handleSubscriptionRenewal(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = stripeEvent.data.object;
        await handlePaymentFailed(invoice);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = stripeEvent.data.object;
        await handleSubscriptionCanceled(subscription);
        break;
      }

      case 'charge.refunded': {
        const charge = stripeEvent.data.object;
        await handleRefund(charge);
        break;
      }

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    // Return 200 to acknowledge receipt
    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (err) {
    console.error('Webhook error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

/**
 * Handle checkout.session.completed
 */
async function handleCheckoutCompleted(session: any) {
  try {
    console.log('🛒 Processing checkout completion:', session.id);

    // Get metadata
    const metadata = session.metadata || {};
    const productId = metadata.product_id;
    
    if (!productId) {
      throw new Error('No product_id in session metadata');
    }

    // 1. Create or update customer
    const { customerId, error: customerError } = await upsertCustomer({
      email: session.customer_email || session.customer_details?.email,
      stripeCustomerId: session.customer,
      sacCode: metadata.sac_code,
    });

    if (customerError || !customerId) {
      throw new Error(`Failed to upsert customer: ${customerError}`);
    }

    // 2. Create order
    const { orderId, error: orderError } = await createOrder({
      customerId,
      productId,
      stripeCheckoutSessionId: session.id,
      amountTotal: session.amount_total,
      currency: session.currency,
      quantity: 1,
      metadata: {
        ip_address: session.ip_address,
        user_agent: session.metadata?.user_agent,
        referrer: session.metadata?.referrer,
      },
    });

    if (orderError || !orderId) {
      throw new Error(`Failed to create order: ${orderError}`);
    }

    console.log('✅ Order created:', orderId);

    // 3. If payment is successful, fulfill immediately
    if (session.payment_status === 'paid') {
      const paymentIntentId = typeof session.payment_intent === 'string' 
        ? session.payment_intent 
        : session.payment_intent?.id;

      const { success, error: fulfillError } = await fulfillOrder({
        orderId,
        stripePaymentIntentId: paymentIntentId,
      });

      if (!success) {
        throw new Error(`Failed to fulfill order: ${fulfillError}`);
      }

      console.log('✅ Order fulfilled:', orderId);

      // 4. If it's a subscription, create subscription record
      if (session.mode === 'subscription' && session.subscription) {
        const subscriptionId = typeof session.subscription === 'string'
          ? session.subscription
          : session.subscription.id;

        // Get subscription details from Stripe
        if (stripeServer) {
          const subscription = await stripeServer.subscriptions.retrieve(subscriptionId);
          
          await createSubscription({
            stripeSubscriptionId: subscriptionId,
            customerId,
            orderId,
            productId,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          });

          console.log('✅ Subscription created:', subscriptionId);
        }
      }
    } else {
      console.log('⏳ Payment pending, order created but not fulfilled:', orderId);
    }
  } catch (err) {
    console.error('Error handling checkout completion:', err);
    throw err; // Re-throw to return 500 to Stripe (will retry)
  }
}

/**
 * Handle subscription renewal
 */
async function handleSubscriptionRenewal(invoice: any) {
  try {
    console.log('🔄 Processing subscription renewal:', invoice.id);

    // This is where you'd send the weekly/monthly content
    // For now, just log it - the actual content delivery would be handled
    // by a separate scheduled function

    // Update subscription period in database
    if (stripeServer && invoice.subscription) {
      const subscriptionId = typeof invoice.subscription === 'string'
        ? invoice.subscription
        : invoice.subscription.id;

      const subscription = await stripeServer.subscriptions.retrieve(subscriptionId);

      const sql = getDb();
      await sql`
        UPDATE subscriptions SET
          current_period_start = ${new Date(subscription.current_period_start * 1000).toISOString()},
          current_period_end = ${new Date(subscription.current_period_end * 1000).toISOString()},
          status = ${subscription.status}
        WHERE id = ${subscriptionId}
      `;

      console.log('✅ Subscription renewed:', subscriptionId);
    }
  } catch (err) {
    console.error('Error handling subscription renewal:', err);
  }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(invoice: any) {
  try {
    console.log('❌ Payment failed:', invoice.id);
    
    // You could send a dunning email here
    // Or update the subscription status
    
    const subscriptionId = typeof invoice.subscription === 'string'
      ? invoice.subscription
      : invoice.subscription?.id;

    if (subscriptionId) {
      const sql = getDb();
      await sql`
        UPDATE subscriptions SET status = 'past_due' WHERE id = ${subscriptionId}
      `;
    }
  } catch (err) {
    console.error('Error handling failed payment:', err);
  }
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionCanceled(subscription: any) {
  try {
    console.log('🚫 Subscription canceled:', subscription.id);

    const sql = getDb();
    await sql`
      UPDATE subscriptions SET
        status = 'canceled',
        canceled_at = ${new Date().toISOString()}
      WHERE id = ${subscription.id}
    `;

    console.log('✅ Subscription marked as canceled');
  } catch (err) {
    console.error('Error handling subscription cancellation:', err);
  }
}

/**
 * Handle refund
 */
async function handleRefund(charge: any) {
  try {
    console.log('💰 Refund processed:', charge.id);

    // Find order by payment intent
    const sql = getDb();
    const orders = await sql`
      SELECT id FROM orders WHERE stripe_payment_intent_id = ${charge.payment_intent} LIMIT 1
    `;

    if (orders && orders.length > 0) {
      await processRefund(orders[0].id);
      console.log('✅ Order marked as refunded:', orders[0].id);
    }
  } catch (err) {
    console.error('Error handling refund:', err);
  }
}

