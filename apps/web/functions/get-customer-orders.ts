/**
 * Get Customer Orders
 * Returns all orders for a customer email (with simple email-only auth)
 * 
 * Endpoint: POST /.netlify/functions/get-customer-orders
 * Body: { email: string }
 */

import type { Handler, HandlerEvent } from '@netlify/functions';
import { getCustomerOrders } from '../src/lib/order-service';

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

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
    const body = JSON.parse(event.body || '{}');
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email' }),
      };
    }

    const result = await getCustomerOrders(email.toLowerCase().trim());

    if (result.error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: result.error }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ orders: result.orders || [] }),
    };
  } catch (err) {
    console.error('Get orders error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: err instanceof Error ? err.message : 'Internal server error' 
      }),
    };
  }
};
