/**
 * Create Checkout Session
 * Initiates Stripe checkout for digital products
 * 
 * Endpoint: POST /.netlify/functions/create-checkout
 * Body: { productId: string, customerEmail?: string, successUrl?: string, cancelUrl?: string }
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { stripeServer } from '../src/lib/stripe-client';
import { getDb } from '../src/lib/db-client';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse body
    const body = JSON.parse(event.body || '{}');
    const { 
      productId, 
      customerEmail, 
      successUrl, 
      cancelUrl,
      sacCode,
      referrer,
    } = body;

    // Validate
    if (!productId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing productId' }),
      };
    }

    // Get product from database
    const sql = getDb();
    const products = await sql`
      SELECT * FROM products WHERE id = ${productId} AND active = true LIMIT 1
    `;
    const product = products[0];

    if (!product) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Product not found' }),
      };
    }

    // Check if product has Stripe price ID
    if (!product.stripe_price_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Product not configured for checkout' }),
      };
    }

    // Default URLs
    const baseUrl = process.env.URL || 'https://fortnitenexus.com';
    const defaultSuccessUrl = `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const defaultCancelUrl = `${baseUrl}/checkout/cancel`;

    // Create Stripe checkout session
    if (!stripeServer) {
      throw new Error('Stripe not configured');
    }

    const session = await stripeServer.checkout.sessions.create({
      payment_method_types: ['card', 'ideal', 'sofort'],
      line_items: [
        {
          price: product.stripe_price_id,
          quantity: 1,
        },
      ],
      mode: product.is_subscription ? 'subscription' : 'payment',
      success_url: successUrl || defaultSuccessUrl,
      cancel_url: cancelUrl || defaultCancelUrl,
      customer_email: customerEmail,
      metadata: {
        product_id: productId,
        sac_code: sacCode || '',
        referrer: referrer || '',
        user_agent: event.headers['user-agent'] || '',
      },
      // EU tax compliance
      automatic_tax: { enabled: true },
      // Allow promotion codes
      allow_promotion_codes: true,
      // Billing address collection (for EU VAT)
      billing_address_collection: 'required',
      // Don't collect shipping (digital products)
      shipping_address_collection: undefined,
      // Custom text
      custom_text: {
        submit: {
          message: product.is_subscription 
            ? 'Abonnement kann jederzeit gekündigt werden.' 
            : 'Sofortiger Download nach Zahlungseingang.',
        },
      },
      // Consent collection for digital products
      consent_collection: {
        terms_of_service: 'required',
      },
    });

    // Return checkout URL
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sessionId: session.id,
        checkoutUrl: session.url,
      }),
    };
  } catch (err) {
    console.error('Checkout error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: err instanceof Error ? err.message : 'Internal server error' 
      }),
    };
  }
};
