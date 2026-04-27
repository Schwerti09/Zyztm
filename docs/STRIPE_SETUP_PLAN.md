# Stripe Setup Plan - Automatic Product Sync

## Problem Analysis

### Current Issue
- Some Stripe checkouts work, others don't
- Root cause: Missing `stripe_price_id` in database for some products
- Manual process: Had to create Stripe products in Dashboard and copy IDs manually
- Error in `create-checkout.ts`: "Product not configured for checkout" when `stripe_price_id` is NULL

### Why Some Products Work
If a product has a `stripe_price_id` in the database, checkout works. If NULL, it fails.

Current state:
- `digital-products.ts` has 5 products with `stripePriceId?: string` (undefined for all)
- Database has all `stripe_price_id = NULL`
- No automated sync between code and Stripe

---

## Solution Implemented

### Automatic Stripe Product Sync Function

Created: `apps/web/functions/sync-stripe-products.ts`

**What it does:**
1. Reads all products from `digital-products.ts`
2. For each product:
   - Creates Stripe Product (if not exists)
   - Creates Stripe Price (if not exists)
   - Updates database with `stripe_product_id` and `stripe_price_id`
3. Protected by `ADMIN_SECRET` (security)
4. Supports `force` parameter to recreate all products

**Endpoint:**
```
POST /api/admin/sync-stripe-products
Authorization: Bearer {ADMIN_SECRET}
Body: { "force": false }
```

**Response:**
```json
{
  "success": true,
  "synced": 5,
  "errors": 0,
  "results": [
    {
      "productId": "pro-settings-pack",
      "productName": "Pro Settings Pack",
      "stripeProductId": "prod_xxx",
      "stripePriceId": "price_xxx",
      "price": 9.99,
      "currency": "eur",
      "status": "synced"
    }
  ]
}
```

---

## Complete Setup Plan

### Phase 1: Database Setup (Required)
- [ ] Execute `database-schema.sql` in Neon SQL Editor
  - Creates all tables: products, customers, orders, subscriptions, etc.
  - Inserts initial product data (with NULL stripe_price_id)
  - Sets up indices, triggers, RLS policies

### Phase 2: Stripe Sync (Required)
- [ ] Wait for Netlify deploy to complete
- [ ] Run Stripe sync:
  ```bash
  curl -X POST https://fortnitenexus.space/api/admin/sync-stripe-products \
    -H "Authorization: Bearer {ADMIN_SECRET}" \
    -H "Content-Type: application/json" \
    -d '{"force": false}'
  ```
- [ ] Verify all 5 products synced successfully
- [ ] Check database: all `stripe_price_id` should be populated

### Phase 3: Stripe Webhook Configuration (Required)
- [ ] Get webhook URL: `https://fortnitenexus.space/.netlify/functions/stripe-webhook`
- [ ] Go to Stripe Dashboard > Developers > Webhooks
- [ ] Add endpoint with the above URL
- [ ] Select events:
  - `checkout.session.completed`
  - `checkout.session.async_payment_succeeded`
  - `invoice.paid`
  - `invoice.payment_failed`
  - `customer.subscription.deleted`
  - `charge.refunded`
- [ ] Copy webhook signing secret
- [ ] Add to Netlify Environment Variables: `STRIPE_WEBHOOK_SECRET`

### Phase 4: Resend Email Setup (Optional but Recommended)
- [ ] Go to Resend Dashboard
- [ ] Verify domain: `fortnitenexus.space`
- [ ] Create DKIM records in DNS
- [ ] Create API key
- [ ] Add to Netlify: `RESEND_API_KEY`
- [ ] Add to Netlify: `FROM_EMAIL=orders@fortnitenexus.space`
- [ ] Add to Netlify: `FROM_NAME=Fortnite Nexus`

### Phase 5: Product Files Hosting (Required for Downloads)
- [ ] Upload product files to R2/S3 or similar
- [ ] Get public URLs for each file
- [ ] Update database:
  ```sql
  UPDATE products SET file_url = 'https://...' WHERE id = 'pro-settings-pack';
  ```
- [ ] Alternative: Use token-based download via Netlify Function (already implemented)

### Phase 6: Testing (Required)
- [ ] Test checkout for each product:
  - Pro Settings Pack (€9.99)
  - Season Checklist (€4.99)
  - Weekly Meta Report (€7.99/month subscription)
  - Creator Setup Guide (€19.99)
  - VOD Review (€29.99)
- [ ] Test payment flow with test card: `4242 4242 4242 4242`
- [ ] Verify order creation in database
- [ ] Verify email delivery (if Resend configured)
- [ ] Verify download link generation

---

## Product Details

### 1. Pro Settings Pack
- Price: €9.99 (999 cents)
- Type: One-time payment
- Delivery: Instant download
- Files: .ini, .pdf, .zip, .xlsx, .mp4 (450 MB)

### 2. Season Checklist
- Price: €4.99 (499 cents)
- Type: One-time payment
- Delivery: Instant download
- Files: .pdf, Notion template (15 MB)

### 3. Weekly Meta Report
- Price: €7.99/month (799 cents)
- Type: Subscription (monthly)
- Delivery: Email subscription
- Files: Email + PDF

### 4. Creator Setup Guide
- Price: €19.99 (1999 cents)
- Type: One-time payment
- Delivery: Instant download
- Files: .mp4, .pdf, .psd, .xlsx (2.5 GB)

### 5. VOD Review
- Price: €29.99 (2999 cents)
- Type: One-time payment
- Delivery: Manual review (24-48h)
- Files: .mp4, .pdf (~500 MB)

---

## Troubleshooting

### Stripe Sync Fails
- Check `STRIPE_SECRET_KEY` is set in Netlify
- Check `ADMIN_SECRET` is set in Netlify
- Check Stripe API key has product creation permissions
- Check logs in Netlify Functions

### Checkout Fails
- Verify `stripe_price_id` exists in database for product
- Check Stripe Dashboard for product/price existence
- Check `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` are set

### Webhook Not Receiving Events
- Verify webhook endpoint URL is correct
- Check webhook signing secret matches
- Check Stripe Dashboard webhook status

### Email Not Sending
- Verify `RESEND_API_KEY` is set
- Check domain is verified in Resend
- Check DKIM records in DNS
- Check email logs in Resend Dashboard

---

## Environment Variables Required

### Stripe
- `STRIPE_SECRET_KEY` - Required for API calls
- `STRIPE_WEBHOOK_SECRET` - Required for webhook verification
- `VITE_STRIPE_PUBLISHABLE_KEY` - Required for frontend (optional for backend-only)

### Database
- `DATABASE_URL` - Neon connection string

### Email
- `RESEND_API_KEY` - Resend API key
- `FROM_EMAIL` - Sender email (e.g., orders@fortnitenexus.space)
- `FROM_NAME` - Sender name (e.g., Fortnite Nexus)

### Admin
- `ADMIN_SECRET` - Protects admin endpoints (generate random string)

### Site
- `URL` - Site URL (e.g., https://fortnitenexus.space)
- `FRONTEND_URL` - Frontend URL (same as URL for single-page app)

---

## Next Actions

1. **Execute SQL Schema** - Run `database-schema.sql` in Neon
2. **Deploy & Sync** - Wait for deploy, then run Stripe sync
3. **Configure Webhook** - Add webhook endpoint in Stripe Dashboard
4. **Setup Email** - Configure Resend (optional but recommended)
5. **Host Files** - Upload product files to R2/S3
6. **Test Checkout** - Test all 5 products end-to-end

---

*Created: April 27, 2026*
*Status: Ready to execute*
