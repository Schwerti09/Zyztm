/**
 * Get Checkout Session Info
 * Retrieves session info for success page display
 * 
 * Endpoint: GET /.netlify/functions/get-checkout-session?session_id=xxx
 */

import type { Handler, HandlerEvent } from '@netlify/functions';
import { getCheckoutSession } from '../src/lib/stripe-client';
import { getDb } from '../src/lib/db-client';

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const sessionId = event.queryStringParameters?.session_id;

    if (!sessionId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing session_id parameter' }),
      };
    }

    // Get session from Stripe
    const { session, error } = await getCheckoutSession(sessionId);

    if (error || !session) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: error || 'Session not found' }),
      };
    }

    // Get product info from metadata
    const productId = session.metadata?.product_id;
    let productName = 'Digital Product';

    if (productId) {
      const sql = getDb();
      const products = await sql`
        SELECT name FROM products WHERE id = ${productId} LIMIT 1
      `;
      
      if (products[0]?.name) {
        productName = products[0].name;
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        sessionId: session.id,
        productName,
        productId,
        email: session.customer_email || session.customer_details?.email,
        amountTotal: session.amount_total,
        currency: session.currency,
        status: session.payment_status,
      }),
    };
  } catch (err) {
    console.error('Get session error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: err instanceof Error ? err.message : 'Internal server error' 
      }),
    };
  }
};
