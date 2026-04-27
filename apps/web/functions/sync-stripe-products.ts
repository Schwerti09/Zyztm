/**
 * Sync Stripe Products
 * Creates Stripe products and prices from digital-products.ts
 * Updates database with Stripe IDs
 * 
 * Endpoint: POST /.netlify/functions/sync-stripe-products
 * Body: { force: boolean } - force recreate all products
 */

import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { stripeServer } from '../src/lib/stripe-client';
import { getDb } from '../src/lib/db-client';
import { DIGITAL_PRODUCTS } from '../src/data/digital-products';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    // Verify admin secret (simple protection)
    const authHeader = event.headers['authorization'];
    const adminSecret = process.env.ADMIN_SECRET;
    
    if (!authHeader || !adminSecret || authHeader !== `Bearer ${adminSecret}`) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Unauthorized' }),
      };
    }

    const body = JSON.parse(event.body || '{}');
    const { force = false } = body;

    if (!stripeServer) {
      throw new Error('Stripe not configured');
    }

    const sql = getDb();
    const results = [];
    const errors = [];

    for (const product of DIGITAL_PRODUCTS) {
      try {
        // Check if product already exists in DB
        const existingProducts = await sql`
          SELECT * FROM products WHERE id = ${product.id} LIMIT 1
        `;
        const existingProduct = existingProducts[0];

        let stripeProductId = existingProduct?.stripe_product_id;
        let stripePriceId = existingProduct?.stripe_price_id;

        // If force or missing IDs, create in Stripe
        if (force || !stripeProductId || !stripePriceId) {
          // Create or update Stripe Product
          const stripeProduct = await stripeServer.products.create({
            id: force ? undefined : stripeProductId || undefined,
            name: product.name,
            description: product.shortDescription,
            metadata: {
              product_id: product.id,
              slug: product.slug,
              category: product.category,
            },
            active: product.active,
            images: [], // Add image URLs later if needed
          });

          stripeProductId = stripeProduct.id;

          // Create Stripe Price
          const stripePrice = await stripeServer.prices.create({
            product: stripeProductId,
            unit_amount: product.price,
            currency: product.currency,
            recurring: product.isSubscription ? {
              interval: product.subscriptionInterval || 'month',
            } : undefined,
            metadata: {
              product_id: product.id,
            },
          });

          stripePriceId = stripePrice.id;
        }

        // Update database
        if (existingProduct) {
          await sql`
            UPDATE products SET
              name = ${product.name},
              description = ${product.longDescription},
              price = ${product.price},
              stripe_product_id = ${stripeProductId},
              stripe_price_id = ${stripePriceId},
              is_subscription = ${product.isSubscription},
              subscription_interval = ${product.subscriptionInterval || null},
              download_limit = ${product.downloadLimit},
              active = ${product.active},
              updated_at = NOW()
            WHERE id = ${product.id}
          `;
        } else {
          await sql`
            INSERT INTO products (
              id, name, description, price, stripe_product_id, 
              stripe_price_id, is_subscription, subscription_interval, 
              download_limit, active
            ) VALUES (
              ${product.id}, ${product.name}, ${product.longDescription}, 
              ${product.price}, ${stripeProductId}, ${stripePriceId}, 
              ${product.isSubscription}, ${product.subscriptionInterval || null}, 
              ${product.downloadLimit}, ${product.active}
            )
          `;
        }

        results.push({
          productId: product.id,
          productName: product.name,
          stripeProductId,
          stripePriceId,
          price: product.price / 100,
          currency: product.currency,
          status: 'synced',
        });

      } catch (err) {
        errors.push({
          productId: product.id,
          productName: product.name,
          error: err instanceof Error ? err.message : 'Unknown error',
        });
        console.error(`Error syncing product ${product.id}:`, err);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        synced: results.length,
        errors: errors.length,
        results,
        errors,
      }),
    };

  } catch (err) {
    console.error('Sync error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: err instanceof Error ? err.message : 'Internal server error',
      }),
    };
  }
};
