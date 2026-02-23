# Environment Variables Setup

This document describes all required and optional environment variables for the Zyztm site, how to apply the database schema, how to trigger scheduled functions, and how to test the API endpoints.

## Required Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL/Neon connection string, e.g. `postgresql://user:pass@host/db` |
| `YOUTUBE_API_KEY` | Google Data API v3 key with YouTube Data access |
| `YOUTUBE_CHANNEL_ID` | YouTube channel ID (default: `UCccyxYt6K8sqVMnppnzd4zQ`) |
| `STRIPE_SECRET_KEY` | Stripe secret key for checkout sessions |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for frontend |
| `GEMINI_API_KEY` | Google Gemini (Generative AI) API key |
| `ELEVENLABS_API_KEY` | ElevenLabs text-to-speech API key |
| `ELEVENLABS_VOICE_ID` | ElevenLabs voice ID to use for synthesis |

## Optional Environment Variables

| Variable | Default | Description |
|---|---|---|
| `STREAMCHARTS_URL` | `https://streamscharts.com/channels/zyztm/clips` | URL to scrape for Kick clips |

> **Never commit real secrets to source control.** Copy `.env.example` to `.env` locally and fill in the values.

---

## Database Setup

Run the SQL migration once against your Postgres/Neon database:

```bash
psql "$DATABASE_URL" -f sql/create_clips_table.sql
```

This creates the `clips` table with a UUID primary key, a unique `url` column, a `product_tag` column, and an index on `product_tag`.

---

## Netlify Functions

The following Netlify Functions are deployed under `netlify/functions/`:

| Function file | Route (via redirect) | Schedule |
|---|---|---|
| `debug-youtube.js` | `/api/debug/youtube` | On-demand |
| `youtube-latest.js` | `/api/youtube/latest` | On-demand |
| `fetch-clips.js` | `/.netlify/functions/fetch-clips` | Every 6 h (`0 */6 * * *`) |
| `clips-by-tag.js` | `/api/clips/by-tag?tag=<tag>` | On-demand |
| `clips-top.js` | `/api/clips/top` | On-demand |

### Trigger `fetch-clips` manually

```bash
# Using Netlify CLI (requires netlify login)
netlify functions:invoke fetch-clips
```

---

## GitHub Actions Backup

The workflow `.github/workflows/daily-fetch.yml` runs `scripts/fetch-clips.js` every day at 01:00 UTC as a backup to the Netlify scheduled function.

Add the following repository secrets in **Settings → Secrets → Actions**:

- `DATABASE_URL`
- `STREAMCHARTS_URL` (optional)

---

## Testing Endpoints

### Check YouTube integration

```bash
curl https://<your-site>/.netlify/functions/debug-youtube
# or via redirect:
curl https://<your-site>/api/debug/youtube
```

### Latest YouTube videos

```bash
curl https://<your-site>/api/youtube/latest
```

### Clips by product tag

```bash
curl "https://<your-site>/api/clips/by-tag?tag=voice_pack"
```

### Top 5 clips

```bash
curl https://<your-site>/api/clips/top
```

---

## Scraper Note

The CSS selectors inside `netlify/functions/fetch-clips.js` (and `scripts/fetch-clips.js`) are **illustrative examples**. If the Streamcharts DOM structure differs, update the selectors accordingly. The site owner has granted permission to scrape this content.
