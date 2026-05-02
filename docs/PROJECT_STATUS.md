# Fortnite Nexus – Project Status

> **Stand:** 2026-04-27  
> **Netlify Site:** https://subtle-lollipop-b110ae.netlify.app  
> **Ziel-Domain:** https://fortnitenexus.com

---

## Architektur-Übersicht

```
Frontend:  React + Vite + TailwindCSS (apps/web/)
Backend:   Netlify Functions (netlify/functions/ + apps/web/functions/)
Datenbank: Neon Serverless Postgres (via DATABASE_URL)
Payments:  Stripe (Checkout Sessions + Webhooks)
E-Mail:    Resend (Bestätigungen, Downloads)
Hosting:   Netlify (Static + Functions)
```

### Entscheidungen

| Datum | Entscheidung | Begründung |
|---|---|---|
| 2026-04-27 | **Supabase entfernt** → Alles auf Neon | Doppelte DB-Infrastruktur war unnötig. Alle bestehenden Functions nutzen schon Neon via `DATABASE_URL`. Supabase SDK nur im neuen Shop-Code genutzt – auf raw SQL umgestellt. |
| 2026-04-27 | File-Storage: Token-basierte Downloads | Statt Supabase Storage Signed URLs → Download-Token in DB + Netlify Function als Proxy. Produkt-Files können auf R2/S3/externem Host liegen. |

---

## Datenbank-Schema

### Bestehende Tabellen (Core)

| Tabelle | Zweck | Quelle |
|---|---|---|
| `clips` | YouTube, TikTok, Kick Clips | `sql/create_clips_table.sql` |
| `users` | User-Accounts (Coins, Likes) | `netlify/functions/db-init.js` |
| `coin_transactions` | Coin-Buchungen | `netlify/functions/db-init.js` |
| `tiktok_likes` | TikTok Like-Tracking | `netlify/functions/db-init.js` |

### Shop-Tabellen (Digital Products)

| Tabelle | Zweck | Quelle |
|---|---|---|
| `products` | Digitale Produkte (+ `file_url`) | `apps/web/src/lib/database-schema.sql` |
| `customers` | Kundendaten + Stats | `apps/web/src/lib/database-schema.sql` |
| `orders` | Bestellungen + Download-Tokens | `apps/web/src/lib/database-schema.sql` |
| `subscriptions` | Stripe Subscriptions | `apps/web/src/lib/database-schema.sql` |
| `email_logs` | E-Mail-Tracking | `apps/web/src/lib/database-schema.sql` |
| `download_logs` | Download-Tracking | `apps/web/src/lib/database-schema.sql` |

### Noch auszuführen

```sql
-- Nach database-schema.sql:
ALTER TABLE products ADD COLUMN IF NOT EXISTS file_url TEXT;
```

---

## Digitale Produkte (fertig gebaut)

Alle unter `products/` – Build-Script: `products/build-all.ps1`

| Produkt | Ordner | Inhalt | Status |
|---|---|---|---|
| Pro Settings Pack | `products/pro-settings-pack/` | Fortnite-Settings, NVIDIA Guide, Sensitivity Calculator, Video-Script | ✅ Fertig |
| Season Checklist | `products/season-checklist/` | Checklist, XP Guide, Quest Tracker (CSV), Secret Missions | ✅ Fertig |
| Creator Setup Guide | `products/creator-setup-guide/` | OBS Config, Content Calendar, Monetarisierung, Setup Guide | ✅ Fertig |
| VOD Review Service | `products/vod-review/` | Service-Beschreibung, Briefing-Fragebogen | ✅ Fertig |
| Weekly Meta Report | `products/weekly-meta-report/` | Sample Issue, E-Mail Template, Welcome Page | ✅ Fertig |

**Master-Index:** `products/README.md`

---

## Code-Architektur

### `apps/web/src/lib/` – Shared Libraries

| Datei | Zweck | Status |
|---|---|---|
| `db-client.ts` | Neon DB-Client (ersetzt supabase-client) | ✅ Neu |
| `order-service.ts` | Bestellungen, Downloads, Fulfillment | ✅ Auf Neon SQL umgebaut |
| `email-service.ts` | Resend E-Mail-Integration | ✅ Auf Neon SQL umgebaut |
| `stripe-client.ts` | Stripe Client + Server Instanz | ✅ Unverändert |
| `database-schema.sql` | Komplettes Shop-Schema | ✅ Kommentare aktualisiert |
| `database-types.ts` | TypeScript DB-Types | ✅ Kommentar aktualisiert |
| `supabase-client.ts` | ~~Alter Supabase Client~~ | ⚠️ Dead Code – kann gelöscht werden |

### `apps/web/functions/` – Shop Netlify Functions

| Datei | Zweck | Status |
|---|---|---|
| `create-checkout.ts` | Stripe Checkout erstellen | ✅ Auf Neon umgebaut |
| `get-checkout-session.ts` | Session-Info abrufen | ✅ Auf Neon umgebaut |
| `stripe-webhook.ts` | Stripe Events verarbeiten | ✅ Auf Neon umgebaut |

---

## Nächste Schritte

### Sofort (Keys besorgen)
- [ ] `DATABASE_URL` in Netlify eintragen (Neon Connection String)
- [ ] `STRIPE_SECRET_KEY` + `VITE_STRIPE_PUBLISHABLE_KEY` + `STRIPE_WEBHOOK_SECRET`
- [ ] `YOUTUBE_API_KEY` + `YOUTUBE_CHANNEL_ID`
- [ ] `ADMIN_SECRET` generieren
- [ ] `FRONTEND_URL` + `URL` setzen

### Danach
- [ ] SQL-Schema auf Neon ausführen (`database-schema.sql`)
- [ ] Stripe Produkte anlegen + Price IDs in DB eintragen
- [ ] Stripe Webhook-Endpoint konfigurieren
- [ ] Resend Domain verifizieren + API Key
- [ ] Produkt-Files hosten (R2/S3) + `file_url` in DB setzen
- [ ] E2E Test: Checkout → Webhook → E-Mail → Download

### Backlog
- [ ] `supabase-client.ts` löschen (Dead Code)
- [ ] SEO-Optimierung der Produkt-Landingpages
- [ ] Discord Webhook für Bestellbenachrichtigungen
- [ ] SAC Code nexus Reminder-System
- [ ] Affiliate-Links Integration

---

## Dependencies

### `apps/web/package.json`
```
@neondatabase/serverless  ^0.10.4   (ersetzt @supabase/supabase-js)
@stripe/stripe-js         ^9.3.1
stripe                    ^15.7.0
resend                    ^6.12.2
react                     ^18.3.0
vite                      ^5.2.0
tailwindcss               ^3.4.0
```

### `netlify/functions/package.json`
```
@neondatabase/serverless  ^0.10.4
pg                        ^8.11.3
stripe                    ^15.7.0
```
