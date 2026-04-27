/**
 * Order Service - Digital Product Fulfillment
 * Handles order creation, download link generation, and delivery
 * Uses Neon Serverless Postgres directly (no Supabase SDK)
 */

import { getDb, generateDownloadUrl } from './db-client';
import { sendOrderConfirmation } from './email-service';
import crypto from 'crypto';

/**
 * Create or update a customer
 */
export async function upsertCustomer(params: {
  email: string;
  stripeCustomerId?: string;
  firstName?: string;
  lastName?: string;
  sacCode?: string;
}): Promise<{ customerId?: string; error?: string }> {
  try {
    const sql = getDb();
    const rows = await sql`
      INSERT INTO customers (email, stripe_customer_id, first_name, last_name, sac_code_used)
      VALUES (${params.email}, ${params.stripeCustomerId ?? null}, ${params.firstName ?? null}, ${params.lastName ?? null}, ${params.sacCode ?? null})
      ON CONFLICT (email) DO UPDATE SET
        stripe_customer_id = COALESCE(EXCLUDED.stripe_customer_id, customers.stripe_customer_id),
        first_name = COALESCE(EXCLUDED.first_name, customers.first_name),
        last_name = COALESCE(EXCLUDED.last_name, customers.last_name),
        sac_code_used = COALESCE(EXCLUDED.sac_code_used, customers.sac_code_used),
        updated_at = NOW()
      RETURNING id
    `;
    return { customerId: rows[0]?.id };
  } catch (err) {
    console.error('Error upserting customer:', err);
    return { error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Create a new order
 */
export async function createOrder(params: {
  customerId: string;
  productId: string;
  stripeCheckoutSessionId: string;
  amountTotal: number;
  currency?: string;
  quantity?: number;
  metadata?: Record<string, string>;
}): Promise<{ orderId?: string; error?: string }> {
  try {
    const sql = getDb();
    const rows = await sql`
      INSERT INTO orders (
        customer_id, product_id, stripe_checkout_session_id,
        amount_total, currency, quantity, status, download_limit,
        ip_address, user_agent, referrer
      ) VALUES (
        ${params.customerId}, ${params.productId}, ${params.stripeCheckoutSessionId},
        ${params.amountTotal}, ${params.currency || 'eur'}, ${params.quantity || 1},
        'pending', 3,
        ${params.metadata?.ip_address ?? null},
        ${params.metadata?.user_agent ?? null},
        ${params.metadata?.referrer ?? null}
      )
      RETURNING id
    `;
    return { orderId: rows[0]?.id };
  } catch (err) {
    console.error('Error creating order:', err);
    return { error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Mark order as paid and generate download
 */
export async function fulfillOrder(params: {
  orderId: string;
  stripePaymentIntentId?: string;
}): Promise<{ success: boolean; downloadUrl?: string; error?: string }> {
  try {
    const sql = getDb();

    // 1. Get order with product and customer info
    const orders = await sql`
      SELECT o.*, 
             p.name AS product_name, p.description AS product_description,
             p.file_path AS product_file_path, p.file_url AS product_file_url,
             p.download_limit AS product_download_limit,
             c.email AS customer_email
      FROM orders o
      LEFT JOIN products p ON p.id = o.product_id
      LEFT JOIN customers c ON c.id = o.customer_id
      WHERE o.id = ${params.orderId}
    `;
    const order = orders[0];

    if (!order) {
      throw new Error('Order not found');
    }

    // 2. Generate download token
    const downloadToken = generateDownloadToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 72); // 72 hours

    // 3. Generate download URL
    let downloadUrl: string;
    
    if (order.product_file_url) {
      // Direct file URL (stored externally, e.g. R2/S3)
      downloadUrl = generateDownloadUrl(params.orderId, downloadToken);
    } else if (order.product_file_path) {
      // File path based download
      downloadUrl = generateDownloadUrl(params.orderId, downloadToken);
    } else {
      // Email-based delivery (for subscriptions)
      downloadUrl = `https://fortnitenexus.com/dashboard/orders/${order.id}`;
    }

    // 4. Update order
    await sql`
      UPDATE orders SET
        status = 'fulfilled',
        stripe_payment_intent_id = ${params.stripePaymentIntentId ?? null},
        download_url = ${downloadUrl},
        download_token = ${downloadToken},
        download_expires_at = ${expiresAt.toISOString()},
        download_limit = ${order.product_download_limit || 3}
      WHERE id = ${params.orderId}
    `;

    // 5. Update customer stats
    await sql`
      UPDATE customers SET
        total_orders = COALESCE(total_orders, 0) + 1,
        total_spent = COALESCE(total_spent, 0) + ${order.amount_total},
        updated_at = NOW()
      WHERE id = ${order.customer_id}
    `;

    // 6. Send email
    await sendOrderConfirmation({
      to: order.customer_email,
      orderId: order.id,
      productId: order.product_id,
      productName: order.product_name || 'Digital Product',
      downloadUrl: downloadUrl,
      deliverables: extractDeliverables(order.product_description),
      downloadLimit: order.product_download_limit || 3,
    });

    return { success: true, downloadUrl };
  } catch (err) {
    console.error('Error fulfilling order:', err);
    
    // Mark order as failed
    try {
      const sql = getDb();
      await sql`UPDATE orders SET status = 'failed' WHERE id = ${params.orderId}`;
    } catch { /* non-critical */ }

    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Verify and process a download request
 */
export async function processDownload(params: {
  orderId: string;
  token: string;
  ipAddress?: string;
  userAgent?: string;
}): Promise<{ 
  success: boolean; 
  downloadUrl?: string; 
  expiresAt?: string;
  remainingDownloads?: number;
  error?: string;
  errorCode?: 'INVALID_TOKEN' | 'EXPIRED' | 'LIMIT_REACHED' | 'NOT_FOUND';
}> {
  try {
    const sql = getDb();

    // 1. Get order
    const orders = await sql`
      SELECT o.*, p.file_path AS product_file_path, p.file_url AS product_file_url
      FROM orders o
      LEFT JOIN products p ON p.id = o.product_id
      WHERE o.id = ${params.orderId}
        AND o.download_token = ${params.token}
        AND o.status = 'fulfilled'
    `;
    const order = orders[0];

    if (!order) {
      return { success: false, error: 'Invalid download link', errorCode: 'INVALID_TOKEN' };
    }

    // 2. Check expiry
    if (order.download_expires_at && new Date(order.download_expires_at) < new Date()) {
      return { success: false, error: 'Download link expired', errorCode: 'EXPIRED' };
    }

    // 3. Check download limit
    if ((order.download_count || 0) >= order.download_limit) {
      return { success: false, error: 'Download limit reached', errorCode: 'LIMIT_REACHED' };
    }

    // 4. Increment download count
    await sql`
      UPDATE orders SET download_count = COALESCE(download_count, 0) + 1
      WHERE id = ${params.orderId}
    `;

    // 5. Log download
    await sql`
      INSERT INTO download_logs (order_id, ip_address, user_agent, success)
      VALUES (${params.orderId}, ${params.ipAddress ?? null}, ${params.userAgent ?? null}, true)
    `;

    // 6. Return the download URL (product file URL or the stored download URL)
    const freshUrl = order.product_file_url || order.download_url;

    return {
      success: true,
      downloadUrl: freshUrl,
      expiresAt: order.download_expires_at,
      remainingDownloads: order.download_limit - ((order.download_count || 0) + 1),
    };
  } catch (err) {
    console.error('Error processing download:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Get customer orders for dashboard
 */
export async function getCustomerOrders(customerEmail: string): Promise<{
  orders?: any[];
  error?: string;
}> {
  try {
    const sql = getDb();
    const orders = await sql`
      SELECT o.*, p.name AS product_name, p.description AS product_description,
             p.slug AS product_slug
      FROM orders o
      LEFT JOIN products p ON p.id = o.product_id
      LEFT JOIN customers c ON c.id = o.customer_id
      WHERE c.email = ${customerEmail}
        AND o.status = 'fulfilled'
      ORDER BY o.created_at DESC
    `;
    return { orders };
  } catch (err) {
    console.error('Error getting customer orders:', err);
    return { error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Handle subscription creation
 */
export async function createSubscription(params: {
  stripeSubscriptionId: string;
  customerId: string;
  orderId: string;
  productId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const sql = getDb();
    await sql`
      INSERT INTO subscriptions (id, customer_id, order_id, product_id, status, current_period_start, current_period_end)
      VALUES (
        ${params.stripeSubscriptionId}, ${params.customerId}, ${params.orderId},
        ${params.productId}, 'active',
        ${params.currentPeriodStart.toISOString()}, ${params.currentPeriodEnd.toISOString()}
      )
    `;
    return { success: true };
  } catch (err) {
    console.error('Error creating subscription:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Handle refund
 */
export async function processRefund(orderId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const sql = getDb();
    await sql`
      UPDATE orders SET
        status = 'refunded',
        download_expires_at = ${new Date().toISOString()}
      WHERE id = ${orderId}
    `;
    return { success: true };
  } catch (err) {
    console.error('Error processing refund:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

// =============================================================================
// Helper Functions
// =============================================================================

function generateDownloadToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function extractDeliverables(description: string | null): string[] {
  if (!description) return ['Digital Product'];
  
  // Parse common patterns like "✅ Item 1, ✅ Item 2"
  const matches = description.match(/[✅✓\-•]\s*([^,\n]+)/g);
  if (matches) {
    return matches.map(m => m.replace(/[✅✓\-•]\s*/, '').trim());
  }
  
  // Fallback: split by sentences
  return description
    .split(/[.!?]/)
    .map(s => s.trim())
    .filter(s => s.length > 10)
    .slice(0, 5);
}

// =============================================================================
// SQL Migration for Neon (run once via psql or migration tool)
// =============================================================================

/*
-- Customer stats function (replaces Supabase RPC):
-- Already handled inline in fulfillOrder above

-- Ensure products table has file_url column:
ALTER TABLE products ADD COLUMN IF NOT EXISTS file_url TEXT;
*/

export default {
  upsertCustomer,
  createOrder,
  fulfillOrder,
  processDownload,
  getCustomerOrders,
  createSubscription,
  processRefund,
};
