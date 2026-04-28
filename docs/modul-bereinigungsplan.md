# Modul-Bereinigungsplan

**Datum:** April 28, 2026  
**Status:** Entwurf  
**Ziel:** Redundante Module entfernen, API-Verbindungen korrigieren, funktionierende Module identifizieren

---

# [1] AKTUELLE SITUATION

## Netlify Functions (24 total)

### YouTube (4 Functions)
- `get-youtube-videos.js` – Braucht YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID
- `youtube-latest.js` – Braucht YOUTUBE_CHANNEL_ID (optional YOUTUBE_API_KEY)
- `fetch-youtube-clips.js` – Scheduled, braucht YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID, DATABASE_URL
- `debug-youtube.js` – Debugging Function

### TikTok (5 Functions)
- `tiktok-latest.js` – Braucht DATABASE_URL, liest aus DB
- `fetch-tiktok-clips.js` – Scheduled, braucht DATABASE_URL, TIKTOK_HANDLE
- `tiktok-like.js` – Like-Function
- `tiktok-liked.js` – Like-Status
- `tiktok-manual.js` – Manual TikTok upload

### Clips (3 Functions)
- `clips-by-tag.js` – Clips by Tag
- `clips-top.js` – Top Clips
- `fetch-clips.js` – Fetch Clips

### Stripe (6 Functions)
- `create-checkout-session.ts` – TypeScript
- `stripe-create-checkout.js` – JavaScript (redundant?)
- `stripe-create-coin-checkout.js` – Coin Checkout
- `verify-checkout-session.ts` – TypeScript
- `subscriptions-webhook.js` – Webhook
- `subscriptions.js` – Subscriptions

### Database (5 Functions)
- `db-init.js` – Database Init
- `coins-balance.js` – Coins Balance
- `coins-daily-bonus.js` – Daily Bonus
- `creators.js` – Creators
- `gallery.js` – Gallery

### SEO (2 Functions)
- `robots.js` – Robots.txt
- `sitemap.js` – Sitemap

---

# [2] PROBLEME IDENTIFIZIERT

## Redundante Module

### YouTube Komponenten
- `LatestYouTubeVideos.tsx` – Nutzt `/.netlify/functions/get-youtube-videos`
- `YouTubeLatest.tsx` – Nutzt auch `/.netlify/functions/get-youtube-videos`
  - **Problem:** Beide machen fast das Gleiche
  - **Lösung:** Eine entfernen, die andere behalten

### Stripe Functions
- `create-checkout-session.ts` – TypeScript
- `stripe-create-checkout.js` – JavaScript
  - **Problem:** Beide machen das Gleiche
  - **Lösung:** TypeScript-Version behalten, JavaScript-Version entfernen

### YouTube Functions
- `get-youtube-videos.js` – API-Key erforderlich
- `youtube-latest.js` – Optionaler API-Key (RSS Fallback)
  - **Problem:** Ähnliche Funktionalität
  - **Lösung:** Eine behalten (youtube-latest.js wegen RSS Fallback)

## Falsche API-Pfade

### TikTokWall.tsx
- Aktuell: `/api/tiktok/latest`
- Sollte: `/.netlify/functions/tiktok-latest`
- **Problem:** Pfad ist falsch, Funktion wird nicht gefunden

### Andere Komponenten
- Viele Komponenten nutzen `/api/` statt `/.netlify/functions/`
- **Problem:** Inkompatible Pfad-Struktur

## Fehlende API-Konfiguration

### .env.example zeigt:
- YOUTUBE_API_KEY
- YOUTUBE_CHANNEL_ID
- TIKTOK_HANDLE (nicht definiert, aber in fetch-tiktok-clips.js genutzt)

### Wahrscheinlich fehlend:
- TIKTOK_HANDLE in .env.example
- YOUTUBE_API_KEY in production .env
- YOUTUBE_CHANNEL_ID in production .env

---

# [3] BEARBEITUNGSPLAN

## Phase 1: API-Pfade korrigieren

### 1.1 TikTokWall.tsx korrigieren
```typescript
// apps/web/src/components/TikTokWall.tsx
// Zeile 40 ändern von:
const res = await fetch(`/api/tiktok/latest?limit=${PAGE_SIZE}&offset=${offset}`);
// zu:
const res = await fetch(`/.netlify/functions/tiktok-latest?limit=${PAGE_SIZE}&offset=${offset}`);
```

### 1.2 Alle /api/ Pfade prüfen und korrigieren
- Alle Komponenten durchsuchen nach `/api/`
- Korrigieren zu `/.netlify/functions/` wo nötig

## Phase 2: Redundante Module entfernen

### 2.1 YouTube Komponenten
- **Entfernen:** `YouTubeLatest.tsx`
- **Behalten:** `LatestYouTubeVideos.tsx`
- **Grund:** LatestYouTubeVideos.tsx ist ausführlicher und besser implementiert

### 2.2 Stripe Functions
- **Entfernen:** `stripe-create-checkout.js`
- **Behalten:** `create-checkout-session.ts`
- **Grund:** TypeScript ist typsicherer und konsistenter mit dem Projekt

### 2.3 YouTube Functions
- **Entfernen:** `get-youtube-videos.js`
- **Behalten:** `youtube-latest.js`
- **Grund:** youtube-latest.js hat RSS Fallback und funktioniert ohne API-Key

## Phase 3: API-Konfiguration aktualisieren

### 3.1 .env.example aktualisieren
```bash
# Neue Variable hinzufügen
TIKTOK_HANDLE=fortnitenexus
```

### 3.2 .env prüfen
- Prüfen ob YOUTUBE_API_KEY gesetzt ist
- Prüfen ob YOUTUBE_CHANNEL_ID gesetzt ist
- Prüfen ob TIKTOK_HANDLE gesetzt ist

## Phase 4: Nicht genutzte Module identifizieren

### 4.1 Komponenten prüfen
- Prüfen welche Komponenten nicht genutzt werden
- Prüfen welche Komponenten fehlerhaft sind

### 4.2 Netlify Functions prüfen
- Prüfen welche Functions nicht genutzt werden
- Prüfen welche Functions fehlerhaft sind

---

# [4] MODULE ZU BEHALTEN (Kernfunktionalität)

## Essenziell für Monetarisierung
- `create-checkout-session.ts` – Stripe Checkout
- `verify-checkout-session.ts` – Checkout Verification
- `stripe-create-coin-checkout.js` – Coin Checkout
- `subscriptions-webhook.js` – Stripe Webhook
- `subscriptions.js` – Subscription Management

## Essenziell für Content
- `youtube-latest.js` – YouTube Videos (mit RSS Fallback)
- `tiktok-latest.js` – TikTok Clips aus DB
- `fetch-youtube-clips.js` – Scheduled YouTube Fetch
- `fetch-tiktok-clips.js` – Scheduled TikTok Fetch

## Essenziell für SEO
- `robots.js` – Robots.txt
- `sitemap.js` – Sitemap

## Essenziell für Database
- `db-init.js` – Database Init
- `coins-balance.js` – Coins Balance
- `coins-daily-bonus.js` – Daily Bonus
- `creators.js` – Creators
- `gallery.js` – Gallery

## Essenziell für UX
- `LatestYouTubeVideos.tsx` – YouTube Videos Display
- `TikTokWall.tsx` – TikTok Clips Display (nach Pfad-Korrektur)

---

# [5] MODULE ZU ENTFERNEN (Redundant/Nicht genutzt)

## Redundant
- `YouTubeLatest.tsx` – Redundant mit LatestYouTubeVideos.tsx
- `stripe-create-checkout.js` – Redundant mit create-checkout-session.ts
- `get-youtube-videos.js` – Redundant mit youtube-latest.js

## Nicht genutzt (zu prüfen)
- `debug-youtube.js` – Debugging Function
- `tiktok-like.js` – Like Function (wird genutzt?)
- `tiktok-liked.js` – Like Status (wird genutzt?)
- `tiktok-manual.js` – Manual Upload (wird genutzt?)
- `clips-by-tag.js` – Clips by Tag (wird genutzt?)
- `clips-top.js` – Top Clips (wird genutzt?)
- `fetch-clips.js` – Fetch Clips (wird genutzt?)

---

# [6] AUSFÜHRUNGSREIHENFOLGE

## Schritt 1: API-Pfade korrigieren (1 Stunde)
- TikTokWall.tsx korrigieren
- Alle /api/ Pfade prüfen und korrigieren

## Schritt 2: Redundante Module entfernen (30 Minuten)
- YouTubeLatest.tsx entfernen
- stripe-create-checkout.js entfernen
- get-youtube-videos.js entfernen
- LatestYouTubeVideos.tsx an youtube-latest.js anpassen

## Schritt 3: API-Konfiguration aktualisieren (15 Minuten)
- .env.example aktualisieren
- .env prüfen

## Schritt 4: Testen (1 Stunde)
- YouTube Videos testen
- TikTok Clips testen
- Stripe Checkout testen
- Coins System testen

## Schritt 5: Nicht genutzte Module prüfen (2 Stunden)
- Alle Komponenten prüfen
- Alle Netlify Functions prüfen
- Entscheidung treffen welche zu entfernen

---

# [7] ZUSTÄNDIGKEITEN

| Aufgabe | Zuständig | Status |
|---------|-----------|--------|
| API-Pfade korrigieren | Cascade | Pending |
| Redundante Module entfernen | Cascade | Pending |
| API-Konfiguration aktualisieren | User | Pending |
| Testen | Cascade | Pending |
| Nicht genutzte Module prüfen | Cascade | Pending |

---

*Last Updated: April 28, 2026*
