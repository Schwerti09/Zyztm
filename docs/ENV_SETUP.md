# Environment Variables Setup

> **Last Updated:** 2026-04-27  
> **Stack:** Neon Postgres · Stripe · Netlify Functions · Resend  
> **Supabase:** Removed — all database access via `@neondatabase/serverless` + `pg`

---

## 🔴 PFLICHT – Ohne diese geht nichts

| Variable | Wo besorgen | Benutzt von |
|---|---|---|
| `DATABASE_URL` | [Neon Console](https://console.neon.tech) → Connection String | Alle DB-Functions, Shop, API |
| `STRIPE_SECRET_KEY` | [Stripe Dashboard](https://dashboard.stripe.com/apikeys) | Checkout, Webhooks, Subscriptions |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → Webhooks → Signing Secret | Webhook-Verifizierung |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Publishable Key | Frontend Checkout |
| `FRONTEND_URL` | Eigene Netlify-URL | Checkout Redirects, Coin-Checkout |
| `URL` | Eigene Domain (z.B. `https://fortnitenexus.com`) | Download-Links, E-Mail-Links |

## 🟡 WICHTIG – Für volle Funktionalität

| Variable | Wo besorgen | Benutzt von |
|---|---|---|
| `YOUTUBE_API_KEY` | [Google Cloud Console](https://console.cloud.google.com) → YouTube Data API v3 | Video-Fetching, Debug |
| `YOUTUBE_CHANNEL_ID` | YouTube → Kanal → About → Channel ID | Video-Fetching |
| `RESEND_API_KEY` | [Resend Dashboard](https://resend.com/api-keys) | Bestätigungs-E-Mails |
| `FROM_EMAIL` | Standard: `orders@fortnitenexus.com` | Absender-Adresse |
| `FROM_NAME` | Standard: `Fortnite Nexus` | Absender-Name |
| `ADMIN_SECRET` | Selbst generieren: `openssl rand -hex 32` | Admin-Dashboard |

## 🟢 OPTIONAL – Später hinzufügen

| Variable | Default | Benutzt von |
|---|---|---|
| `GEMINI_API_KEY` | – | AI Content-Generierung |
| `ELEVENLABS_API_KEY` | – | Text-to-Speech |
| `ELEVENLABS_VOICE_ID` | – | Voice-Auswahl |
| `DISCORD_WEBHOOK_URL` | – | Discord-Benachrichtigungen |
| `AFFILIATE_AMAZON_ID` | – | Amazon PartnerNet Links |
| `STREAMCHARTS_URL` | `https://streamscharts.com/channels/zyztm/clips` | Clip-Scraper |
| `TIKTOK_HANDLE` | `zyztm` | TikTok Clip-Fetcher |

## ❌ NICHT MEHR BENÖTIGT (Supabase entfernt)

| Variable | Status |
|---|---|
| ~~`VITE_SUPABASE_URL`~~ | Entfernt am 2026-04-27 |
| ~~`VITE_SUPABASE_ANON_KEY`~~ | Entfernt am 2026-04-27 |
| ~~`SUPABASE_SERVICE_ROLE_KEY`~~ | Entfernt am 2026-04-27 |
| ~~`POSTGRES_PASSWORD`~~ | In `DATABASE_URL` enthalten |

> **Nie echte Secrets in Git committen.** Kopiere `.env.example` → `.env` lokal und trage dort die Werte ein.

---

## Database Setup

Alle Datenbank-Operationen laufen über **Neon Serverless Postgres** (`DATABASE_URL`).

### Bestehende Tabellen (aus `sql/` Ordner)

```bash
# Clips-Tabelle
psql "$DATABASE_URL" -f sql/create_clips_table.sql
```

### Shop-Tabellen (Digital Products)

```bash
# Komplettes Shop-Schema (Produkte, Kunden, Bestellungen, Downloads, E-Mails, Subscriptions)
psql "$DATABASE_URL" -f apps/web/src/lib/database-schema.sql
```

### Zusätzliche Migration (nach Schema-Setup)

```sql
-- file_url Spalte für externe Produkt-Downloads
ALTER TABLE products ADD COLUMN IF NOT EXISTS file_url TEXT;
```

---

## Netlify Functions

### Core Functions (`netlify/functions/`)

| Function | Route | Schedule | Benötigt |
|---|---|---|---|
| `gallery.js` | `/api/gallery` | On-demand | `DATABASE_URL` |
| `clips-by-tag.js` | `/api/clips/by-tag?tag=<tag>` | On-demand | `DATABASE_URL` |
| `clips-top.js` | `/api/clips/top` | On-demand | `DATABASE_URL` |
| `creators.js` | `/api/creators` | On-demand | `DATABASE_URL` |
| `youtube-latest.js` | `/api/youtube/latest` | On-demand | `YOUTUBE_API_KEY` |
| `get-youtube-videos.js` | `/api/youtube/videos` | On-demand | `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID` |
| `debug-youtube.js` | `/api/debug/youtube` | On-demand | `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID` |
| `fetch-clips.js` | – | Alle 6h | `DATABASE_URL`, `STREAMCHARTS_URL` |
| `fetch-youtube-clips.js` | – | Scheduled | `DATABASE_URL`, `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID` |
| `fetch-tiktok-clips.js` | – | Scheduled | `DATABASE_URL` |
| `db-init.js` | – | On-demand | `DATABASE_URL` |

### TikTok Functions (`netlify/functions/`)

| Function | Route | Benötigt |
|---|---|---|
| `tiktok-latest.js` | `/api/tiktok/latest` | `DATABASE_URL` |
| `tiktok-manual.js` | `/api/tiktok/manual` | `DATABASE_URL` |
| `tiktok-like.js` | `/api/tiktok/like` | `DATABASE_URL` |
| `tiktok-liked.js` | `/api/tiktok/liked` | `DATABASE_URL` |

### Coins & Commerce (`netlify/functions/`)

| Function | Route | Benötigt |
|---|---|---|
| `coins-balance.js` | `/api/coins/balance` | `DATABASE_URL` |
| `coins-daily-bonus.js` | `/api/coins/daily-bonus` | `DATABASE_URL` |
| `stripe-create-checkout.js` | `/api/stripe/create-checkout` | `STRIPE_SECRET_KEY`, `FRONTEND_URL` |
| `stripe-create-coin-checkout.js` | `/api/stripe/create-coin-checkout` | `STRIPE_SECRET_KEY`, `FRONTEND_URL` |
| `verify-checkout-session.js` | `/api/stripe/verify-session` | `STRIPE_SECRET_KEY` |
| `subscriptions.js` | `/api/subscriptions/*` | `DATABASE_URL`, `STRIPE_SECRET_KEY` |
| `subscriptions-webhook.js` | – | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` |

### Shop Functions (`apps/web/functions/`)

| Function | Route | Benötigt |
|---|---|---|
| `create-checkout.ts` | `/api/shop/create-checkout` | `DATABASE_URL`, `STRIPE_SECRET_KEY` |
| `get-checkout-session.ts` | `/api/shop/get-session` | `DATABASE_URL`, `STRIPE_SECRET_KEY` |
| `stripe-webhook.ts` | `/api/shop/stripe-webhook` | `DATABASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` |

---

## GitHub Actions Backup

`.github/workflows/daily-fetch.yml` → Täglich 01:00 UTC

Repository Secrets:
- `DATABASE_URL`
- `STREAMCHARTS_URL` (optional)

---

## Testing Endpoints

```bash
# YouTube Debug
curl https://<site>/api/debug/youtube

# YouTube Videos
curl https://<site>/api/youtube/latest

# Clips
curl "https://<site>/api/clips/by-tag?tag=voice_pack"
curl https://<site>/api/clips/top

# Gallery
curl https://<site>/api/gallery

# TikTok
curl https://<site>/api/tiktok/latest
```
