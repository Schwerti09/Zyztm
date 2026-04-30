# Viral Growth Playbook — Zwischenstand

**Stand:** 30. April 2026, 11:56 UTC+2
**Letzter Commit:** `30f34f1` (Phase 1: Live Data + Programmatic SEO — DEPLOYED)
**Phase 2 (Viral Distribution):** IN ARBEIT — ca. 40% fertig, noch nicht committet

---

## ✅ ABGESCHLOSSEN & DEPLOYED (Commit 30f34f1)

### Front 1: Live Data Moat
- `apps/web/src/lib/fortnite-api.ts` — Fortnite API Client mit 30-Min-Cache, Rarity-Algorithmus
- `apps/web/src/components/shop/LiveItemShop.tsx` — Live Shop mit SAC-Code-Modal
- `apps/web/src/pages/ShopLivePage.tsx` — Route `/item-shop` mit FAQ & Schema.org

### Front 2: Programmatic SEO (75 URLs indexierbar)
- `apps/web/src/data/pro-players.ts` — 20 Pros (inkl. 6 DACH-Pros)
- `apps/web/src/pages/ProsHubPage.tsx` — Route `/pros` mit Style/Region-Filter
- `apps/web/src/pages/ProPlayerPage.tsx` — Route `/pro/:slug` (20 Pages)
- `apps/web/src/pages/WeaponsHubPage.tsx` — Route `/weapons` mit Type/Sort-Filter
- `apps/web/src/pages/WeaponPage.tsx` — Route `/weapon/:slug` (27 Pages)
- `apps/web/scripts/generate-sitemap.mjs` — Auto-Sitemap (75 URLs)
- `apps/web/src/pages/FortniteSpacePage.tsx` — Homepage mit "Live Data Hub" Section

---

## 🚧 IN ARBEIT — Phase 2 Viral Distribution (UNCOMMITTED)

### ✅ FERTIG (im Filesystem, aber noch nicht committet)

1. **`apps/web/src/lib/share-image.ts`** (vollständig)
   - Canvas-basierter Share-Image-Generator
   - 3 Formate: `og` (1200×630), `story` (1080×1920), `square` (1080×1080)
   - 5 High-Level-Generatoren:
     - `generateSensitivityImage(data)` — für SensitivityConverter
     - `generateLoadoutImage(data)` — für LoadoutOptimizer
     - `generateStatsImage(data)` — für StatsDashboard
     - `generateWeaponImage(data)` — für Weapon-Pages
     - `generateProImage(data)` — für Pro-Pages
   - Utilities: `downloadBlob`, `copyBlobToClipboard`, `shareViaWebAPI`, `openTwitterIntent`
   - SAC-Code "ZYZTM" ist auf allen Images hardcoded eingebrannt (Revenue-Hook!)

2. **`apps/web/src/components/share/ShareButton.tsx`** (vollständig)
   - Re-usable Share-Button-Komponente
   - Dropdown-Menü mit 6 Optionen:
     - Native Share (Web Share API) für iOS/Android → direkt zu WhatsApp/Instagram/TikTok
     - Twitter Intent (öffnet Compose-Fenster)
     - Clipboard-Copy (Bild → Discord/etc.)
     - Download PNG (OG 1200×630)
     - Download Story (1080×1920)
     - Download Square (1080×1080)
   - Preview-Modal
   - 3 Varianten: `primary` / `secondary` / `compact`

### ❌ ABGEBROCHEN BEI (hier morgen weitermachen!)

3. **`apps/web/src/components/seo/MetaTags.tsx`** — **NUR HALB FERTIG, wird Syntax-Error werfen!**
   - Datei wurde abgebrochen mitten in der `setLink()`-Funktion
   - **TODO morgen als ERSTES:** Datei entweder löschen oder fertig schreiben
   - Soll ein React-Component werden der alle SEO/OG/Twitter-Card Meta-Tags dynamisch setzt und cleant
   - Ersetzt das aktuelle manuelle `useEffect(() => { document.title = ... })` in jeder Page

---

## 📋 TODO MORGEN (priorisierte Reihenfolge)

### Priority 1 — Phase 2 fertigstellen (ca. 2h Arbeit)
1. **`MetaTags.tsx` reparieren/fertigschreiben**
   - Datei fertig schreiben mit `setLink()` für canonical URL + hreflang
   - Dann: Alle `useEffect(() => { document.title; meta description })` Blöcke in Pages durch `<MetaTags />` ersetzen:
     - `ShopLivePage.tsx`, `ProPlayerPage.tsx`, `ProsHubPage.tsx`, `WeaponPage.tsx`, `WeaponsHubPage.tsx`, `FortniteSpacePage.tsx`
     - Plus alle 8 Tool-Pages unter `src/pages/tools/`
   - Jeder Call setzt auch ein OG-Image (pro Page-Type ein passendes statisches Default-PNG unter `public/og/`)

2. **Default OG-Images erstellen** unter `public/og/`
   - `og-default.png` (allgemein)
   - `og-tools.png`, `og-shop.png`, `og-pros.png`, `og-weapons.png`
   - Können wir mit demselben Canvas-Generator statisch erzeugen (einmaliges Skript)

3. **ShareButton in Tools integrieren** (Todo `v3`)
   - `SensitivityConverterPage.tsx` → nach Berechnung: Share-Button mit `generateSensitivityImage()`
   - `LoadoutOptimizerPage.tsx` → nach Loadout-Generation: `generateLoadoutImage()`
   - `StatsDashboardPage.tsx` → nach Stats-Anzeige: `generateStatsImage()`

4. **ShareButton in SEO-Pages integrieren** (Todo `v4`)
   - `ProPlayerPage.tsx` → Hero-Section: `generateProImage()`
   - `WeaponPage.tsx` → Hero-Section: `generateWeaponImage()`
   - `ShopLivePage.tsx` → pro Item im Modal: Share-Button mit individuellem Image

### Priority 2 — Viral Landing Pages (Todo `v5`)
5. **`/share/:type/:id` Route** erstellen
   - Landing-Page die jemand aufruft der einen geteilten Link anklickt
   - Zeigt das geteilte Ergebnis schön formatiert
   - Optimal OG-Meta-Tags damit Twitter/Discord Rich-Previews rendert
   - CTA: "Mach deins selbst" → führt zum Tool

### Priority 3 — Build + Deploy
6. `npx tsc --noEmit` + `npm run build` → alles grün?
7. Commit `feat(viral): Canvas Share System + OG Meta Tags + Share Integration in 8 Pages`
8. Push origin main

### Priority 4 — Nach Deploy (Phase 3 Anfang)
9. **Twitter-Auto-Post Script** (`scripts/twitter-auto-post.mjs`) — cron-basiert, postet täglich den Shop
10. **TikTok Content Pipeline** — AI-generierte 15s Video-Scripts aus News/Shop
11. **Discord-Bot** — Community-Auto-Engagement

---

## 🗂️ RELEVANTE DATEIEN AUF EINEN BLICK

| Status | Pfad |
|--------|------|
| ✅ Committed | `apps/web/src/lib/fortnite-api.ts` |
| ✅ Committed | `apps/web/src/components/shop/LiveItemShop.tsx` |
| ✅ Committed | `apps/web/src/pages/ShopLivePage.tsx` |
| ✅ Committed | `apps/web/src/data/pro-players.ts` |
| ✅ Committed | `apps/web/src/pages/ProsHubPage.tsx` |
| ✅ Committed | `apps/web/src/pages/ProPlayerPage.tsx` |
| ✅ Committed | `apps/web/src/pages/WeaponsHubPage.tsx` |
| ✅ Committed | `apps/web/src/pages/WeaponPage.tsx` |
| ✅ Committed | `apps/web/scripts/generate-sitemap.mjs` |
| 🆕 Uncommitted | `apps/web/src/lib/share-image.ts` |
| 🆕 Uncommitted | `apps/web/src/components/share/ShareButton.tsx` |
| ⚠️ **KAPUTT** | `apps/web/src/components/seo/MetaTags.tsx` (abgeschnitten!) |

---

## 💰 REVENUE-HOOKS (bereits eingebaut)

- **SAC-Code "ZYZTM"** ist hardcoded in jedem generierten Share-Image
- Jede Person die einen Screenshot teilt = automatische Creator-Code-Werbung
- Jede `/pro/:slug` und `/weapon/:slug` Page hat Link zum Sens-Converter/Loadout-Optimizer (Funnel)
- `/item-shop` Modal zeigt SAC-Code bei jedem Item mit Copy-Button

---

## 🎯 NÄCHSTER START-BEFEHL MORGEN

```
Lies VIRAL_PROGRESS.md. Fix MetaTags.tsx (ist kaputt, abgeschnitten).
Dann Priority 1-3 abarbeiten, am Ende committen + pushen.
```

Oder kürzer zu mir: **"weiter mit viral phase 2"**
