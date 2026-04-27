/**
 * Stripe Configuration
 * Client-side and server-side utilities
 */

import { loadStripe, type Stripe } from '@stripe/stripe-js';
import StripeServer from 'stripe';

// Environment variables - support both browser (Vite) and Node contexts
const getEnvVar = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    return (import.meta as any).env[key];
  }
  return undefined;
};

const stripePublishableKey = getEnvVar('VITE_STRIPE_PUBLISHABLE_KEY') || '';
const stripeSecretKey = getEnvVar('STRIPE_SECRET_KEY') || '';
const stripeWebhookSecret = getEnvVar('STRIPE_WEBHOOK_SECRET') || '';

// Client-side Stripe instance (for checkout)
let stripeClient: Stripe | null = null;

/**
 * Initialize Stripe client-side
 */
export async function getStripeClient(): Promise<Stripe | null> {
  if (!stripeClient && stripePublishableKey) {
    stripeClient = await loadStripe(stripePublishableKey);
  }
  return stripeClient;
}

/**
 * Server-side Stripe instance (for webhooks and API calls)
 * ONLY use in Netlify Functions
 * NOTE: Using default API version - Stripe will use account default
 */
export const stripeServer = stripeSecretKey 
  ? new StripeServer(stripeSecretKey, { 
      typescript: true,
    } as any)
  : null;

/**
 * Webhook secret for verifying Stripe events
 */
export const stripeWebhookSecretKey = stripeWebhookSecret;

/**
 * Check if Stripe is properly configured
 */
export function isStripeConfigured(): boolean {
  return Boolean(stripePublishableKey && stripeSecretKey);
}

/**
 * Create a checkout session
 */
export async function createCheckoutSession(params: {
  priceId: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
  mode?: 'payment' | 'subscription';
  metadata?: Record<string, string>;
}): Promise<{ sessionId?: string; error?: string }> {
  try {
    if (!stripeServer) {
      throw new Error('Stripe server not configured');
    }

    const session = await stripeServer.checkout.sessions.create({
      payment_method_types: ['card', 'ideal', 'sofort'], // EU-friendly methods
      line_items: [
        {
          price: params.priceId,
          quantity: 1,
        },
      ],
      mode: params.mode || 'payment',
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      customer_email: params.customerEmail,
      metadata: params.metadata,
      // Digital product settings
      payment_intent_data: params.mode === 'payment' ? {
        metadata: params.metadata,
      } : undefined,
      // EU tax compliance
      automatic_tax: { enabled: true },
      // Allow promotion codes
      allow_promotion_codes: true,
      // Collect minimal data
      billing_address_collection: 'auto',
      shipping_address_collection: undefined, // Digital products don't need shipping
    });

    return { sessionId: session.id };
  } catch (err) {
    console.error('Error creating checkout session:', err);
    return { error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Retrieve a checkout session
 */
export async function getCheckoutSession(sessionId: string) {
  try {
    if (!stripeServer) {
      throw new Error('Stripe server not configured');
    }
    
    const session = await stripeServer.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'line_items', 'payment_intent'],
    });
    
    return { session };
  } catch (err) {
    console.error('Error retrieving checkout session:', err);
    return { error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(payload: string, signature: string): {
  event?: StripeServer.Event;
  error?: string;
} {
  try {
    if (!stripeServer || !stripeWebhookSecretKey) {
      throw new Error('Stripe webhook not configured');
    }
    
    const event = stripeServer.webhooks.constructEvent(
      payload,
      signature,
      stripeWebhookSecretKey
    );
    
    return { event };
  } catch (err) {
    console.error('Error verifying webhook signature:', err);
    return { error: err instanceof Error ? err.message : 'Invalid signature' };
  }
}

/**
 * Construct event without verification (for testing only!)
 */
export function constructEventFromPayload(payload: string): StripeServer.Event {
  return JSON.parse(payload) as StripeServer.Event;
}
