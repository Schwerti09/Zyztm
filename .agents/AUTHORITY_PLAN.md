# Fortnite Nexus – Tiefgründige Website-Analyse & Google Authority Plan
## Phase 14: Von "Indexed" zu "Authority" – Der Master-Plan

> **Mission:** Fortnite Nexus zur unbestrittenen deutschen Fortnite-Autorität machen, die Google in den Knowledge Graph aufnimmt, mit Sitelinks ranked und für deutsche Fortnite-Queries als #1 Quelle erkennt.

---

# TEIL 1: TIEFGRÜNDIGE WEBSITE-ANALYSE

## 1.1 Tech-Stack Bewertung

| Komponente | Status | Authority-Impact |
|---|---|---|
| **Frontend** | Vite 5 + React 18 + TypeScript | ⚠️ **CSR statt SSR** – Google indexiert, aber LLM/AI-Crawler haben Probleme |
| **Routing** | Wouter (Client-side) | ⚠️ Kein SSR/SSG – Initial HTML ist leer |
| **Styling** | TailwindCSS + Framer Motion | ✅ Modern, performant |
| **Hosting** | Netlify mit Functions | ✅ Edge-CDN, gute TTFB |
| **Bundle** | 735 KB gzip (224 KB) Hauptbundle | ❌ **ZU GROSS** für Mobile (52% Traffic) |
| **i18n** | 10 Sprachen, 12 Regionen | ✅ Massive Reichweite, aber Cluttering-Risiko |

### Kritische Erkenntnis #1: Client-Side-Rendering Problem
```
Google Bot lädt: <div id="root"></div>  → Leer
JavaScript wird ausgeführt → Inhalt erscheint
```
**Problem:** Während Google JS rendert, können Bing, Yandex, GPTBot, ClaudeBot, PerplexityBot Inhalte NICHT korrekt indexieren. Das limitiert Authority massiv.

---

## 1.2 SEO-Implementation Audit

### ✅ STÄRKEN
- **40 Guides** mit HowTo + FAQ + Speakable Schema
- **Multi-Language hreflang** (10 Sprachen)
- **Geo-Targeting** mit 12 Regionen + lokale Experten
- **AuthorBox** mit Bio + Quellen + Erfahrung
- **Direct Answers** für Featured Snippets / AEO
- **Sitemap-Generator** über Netlify Function (dynamisch)
- **301 Redirects** preserve Link-Equity
- **Cache-Headers** für Assets (immutable, 1 Jahr)

### ❌ KRITISCHE SCHWÄCHEN

#### ✅ Problem #1: Domain-Inkonsistenz (KRITISCH) – GELÖST
```
BEFORE (inkonsistent):
  index.html         → https://fortnitenexus.com/      (Canonical)
  SEOHead.tsx        → https://fortnitenexus.netlify.app/
  pseo.ts (Schema)   → https://fortnitenexus.netlify.app/
  sitemap-generator  → https://fortnitenexus.netlify.app/
  robots.txt         → https://fortnitenexus.netlify.app/sitemap

AFTER (konsistent):
  ALL FILES          → https://fortnitenexus.com/       ✓ Unified
```
**Folge:** Google sieht konsistente Signale → **Authority wird konsolidiert**. 301 Redirects von .netlify.app → .com preserve Link-Equity. Siehe "Implementation Log" für Details.

#### Problem #2: Fehlende Entity-SEO
- ❌ Kein **Wikidata-Eintrag** für "Fortnite Nexus"
- ❌ Kein **Knowledge Panel** Anspruch
- ❌ Kein **sameAs** für Wikipedia-Quellen
- ❌ Keine **Entity-Verbindung** zu "Epic Games", "Fortnite", "Battle Royale"
- ❌ Keine **Person Schema** für Author auf eigener URL

#### Problem #3: Single-Author Bottleneck
- Nur **EIN Autor** (Rolf Schwertfechter) → Google E-E-A-T benötigt **Diversität**
- Keine spezialisierten Author-Profile (Hardware-Experte, Pro-Player, Streamer-Coach)
- Keine **Co-Author Citations** aus der Fortnite-Community

#### Problem #4: News veraltet
```
news.ts: "Fortnite Patch Notes v28.10" – publishedAt: '2026-02-25'
```
Patch v28.10 ist von **2024**, nicht 2026 → Content ist nicht aktuell. Frische ist Authority-Signal #1 für News.

#### Problem #5: Fehlende Trust-Signale
- ❌ Keine **TÜV/SSL-Badge** sichtbar
- ❌ Keine **Awards/Mentions** ("Featured in...")
- ❌ Keine **Testimonials** von echten Spielern
- ❌ Keine **Case Studies** mit messbaren Ergebnissen
- ❌ Keine **About-Us Page** mit Team & Mission

#### Problem #6: Keine Video-SEO
- ❌ Keine **VideoObject Schema** für YouTube-Embeds
- ❌ Keine **Video-Transkripte** (massive AEO-Chance)
- ❌ Keine **Live-Stream Schema** (BroadcastEvent)
- ❌ Keine eigene Video-Hosting (alle externe YouTube-Embeds)

#### Problem #7: Performance Bottleneck Mobile
```
index-DfBOWTRZ.js          735.97 KB │ gzip: 224.61 KB
ParticleField-D1RJDJ-P.js  802.68 KB │ gzip: 216.24 KB
```
Auf 3G/4G Mobile: **5-8 Sekunden LCP** → Authority-Killer (Google PageRank reduziert sich).

---

## 1.3 Content-Authority Audit

### Aktueller Stand
```
Total Guides:     40
Total News:       ~10
Languages:        10
Regional Pages:   480 (40 guides × 12 regions)
Total URLs:       ~5,000 (mit hreflang Variants)
```

### ❌ Authority-Probleme

#### A) Topical Authority unvollständig
**Was Google für deutsche Fortnite-Authority erwartet:**
- ✅ Aim/Settings/Hardware (vorhanden)
- ✅ Building/Ranked (vorhanden)
- ✅ Weapons (10 Weapon Guides – ✅)
- ❌ **Saison-Tracker** (jede Season hat eigene Pillar Page erforderlich)
- ❌ **Item Shop Archive** (täglicher Content für Authority)
- ❌ **Pro-Player-Profile** (Bugha, Clix, etc. → Backlink-Magnet)
- ❌ **Tournament-Archive** (FNCS, World Cup → Top-Traffic)
- ❌ **Map-Wiki** (jede POI als Entity-Page)
- ❌ **Creative Map Codes Database** (Trending Search)
- ❌ **Skin-Datenbank** (jede Skin = eigene URL)
- ❌ **Patch-Notes-Archive** (vollständige Historie ab Chapter 1)
- ❌ **Glossary** (über 200 Fortnite-Begriffe)

#### B) Content-Frische
- News: 1× pro Tag erforderlich für News-Authority
- Item Shop: 1× täglich automatisch
- Patch Notes: Innerhalb 2h nach Release
- Leaks: Innerhalb 30 Min

#### C) Long-Form-Content fehlt
- Keine **5,000+ Wörter** Pillar-Pages (Google liebt Long-Form)
- Keine **Comparison-Posts** ("Fortnite vs. Apex Legends")
- Keine **Annual Review** ("Best of 2026")
- Keine **Definitive Guides** mit Inhaltsverzeichnis + 20+ Sektionen

---

## 1.4 Schema Markup Bewertung

### ✅ Implementiert
- WebSite Schema (Suchfunktion)
- Organization Schema (sameAs für Social)
- TechArticle Schema
- HowTo Schema
- FAQPage Schema
- BreadcrumbList Schema
- Speakable Schema (für Voice Search)

### ❌ Fehlend (massiver Authority-Boost möglich)
- **Person Schema** auf eigener `/author/:slug` Page
- **Course Schema** für mehrteilige Tutorials
- **Quiz Schema** (Skin-Quiz, Map-Quiz – Engagement-Magnet)
- **Game Schema** (für Fortnite als Game-Entity)
- **VideoGame Schema** (für jeden Battle-Pass)
- **Product Schema** für Hardware-Empfehlungen (Affiliate-Link Boost)
- **Review Schema** für Hardware-Reviews (Sterne in SERP)
- **Event Schema** für Tournaments
- **VideoObject Schema** für jeden YouTube-Embed
- **LiveBlogPosting Schema** für Item Shop Live-Updates
- **Dataset Schema** für Stats/Leaderboards (Google Dataset Search)
- **CollectionPage Schema** für Hub-Pages
- **ItemList Schema** für "Top 10"-Listen
- **AggregateRating** für Hardware/Skins
- **HowToTip / HowToTool / HowToSupply** für detaillierte Steps
- **Claim Schema** für Patch-Notes (Fact-Checking-Authority)

---

## 1.5 Internationales SEO Audit

### ✅ Stärken
- 10 Sprachen mit hreflang
- 12 Regionen mit lokalen Experten
- x-default → English

### ❌ Probleme
- **Translation Quality** unbekannt (Auto-Translate?)
- Keine **regionalen Domains** (.de für DACH, .fr für Frankreich, etc.)
- Keine **regionale Hosting** (alle EU-Central → schlechtere LATAM/APAC Performance)
- Keine **lokale Backlinks** in Zielländern
- Keine **regionale Social Media** (z.B. KakaoTalk für KR, VK für RU)

---

## 1.6 Performance-Audit

### Aktuelle Metrics (geschätzt)
| Metric | Wert | Google-Standard | Status |
|---|---|---|---|
| **LCP** | ~3.5s | <2.5s | ❌ |
| **FID** | ~150ms | <100ms | ⚠️ |
| **CLS** | ~0.15 | <0.1 | ⚠️ |
| **TTFB** | ~400ms | <600ms | ✅ |
| **Bundle (gzip)** | 224 KB | <150 KB | ❌ |
| **Mobile Score** | ~65 | >90 | ❌ |
| **Desktop Score** | ~85 | >95 | ⚠️ |

### Bottlenecks
1. **ParticleField (802 KB)** – Wow-Effekt, aber Mobile-Killer
2. **Hauptbundle 735 KB** – zu viele synchrone Imports
3. **Framer Motion** – schwer (~80 KB) für Hero-Animationen
4. **React Three Fiber** – nur auf wenigen Seiten benötigt

---

# TEIL 2: AUTHORITY MASTER-PLAN

## 2.1 Authority-Definition (Google's Sicht)

Google sieht **Authority** als Kombination von:
1. **Brand Mentions** (Häufigkeit, Sentiment, Quellen-Qualität)
2. **Backlink-Profil** (DR, Topic-Relevance, Diversität)
3. **E-E-A-T Signale** (Author-Profile, Quellenangaben, Updates)
4. **Topical Coverage** (vollständige Abdeckung des Themas)
5. **User-Engagement** (Dwell Time, Pogo-Sticking, Return-Visits)
6. **Knowledge Graph Verbindung** (Entity-Erkennung, sameAs)
7. **Frische** (regelmäßige Updates, neue Content-Velocity)
8. **Technical Excellence** (Core Web Vitals, Schema-Vollständigkeit)

---

## 2.2 Phase 14: Authority Master-Plan

### 🎯 ZIELE (12 Monate)
| KPI | Aktuell | Ziel |
|---|---|---|
| **Domain Rating (Ahrefs)** | ~10 | **45+** |
| **Organic Keywords** | ~500 | **15,000+** |
| **Top-3 Rankings** | <20 | **500+** |
| **Knowledge Panel** | Nein | **Ja** |
| **Sitelinks** | Nein | **Ja** |
| **Featured Snippets** | <5 | **100+** |
| **Backlinks (Referring Domains)** | ~50 | **2,000+** |
| **Brand Searches/Monat** | ~500 | **50,000+** |

---

## 2.3 PILLAR 1: Critical Technical Fixes (Woche 1-2)

### Task 1.1: Domain-Konsistenz herstellen ⚡ HÖCHSTE PRIORITÄT
```typescript
// SINGLE SOURCE OF TRUTH
const SITE_CONFIG = {
  CANONICAL_DOMAIN: 'https://fortnitenexus.com',
  CDN_DOMAIN: 'https://cdn.fortnitenexus.com',
  API_DOMAIN: 'https://api.fortnitenexus.com',
};
```
**Action Items:**
- [ ] Alle URLs in `pseo.ts`, `geo-seo.ts`, `sitemap-generator.ts`, `SEOHead.tsx` auf `fortnitenexus.com` migrieren
- [ ] Netlify-Domain als Subdomain (`app.fortnitenexus.com`) konfigurieren
- [ ] 301-Redirect von `fortnitenexus.netlify.app` → `fortnitenexus.com`
- [ ] DNS Records für `www.fortnitenexus.com` → Apex
- [ ] Google Search Console für Apex-Domain einrichten
- [ ] Bing Webmaster Tools registrieren
- [ ] Yandex Webmaster registrieren

### Task 1.2: SSR / Pre-Rendering implementieren
**Option A (Empfohlen):** Vite SSG mit `vite-ssg`
```bash
pnpm add -D vite-ssg @vue/server-renderer
```
**Option B:** Netlify Pre-Rendering aktivieren
**Option C:** Migration zu Astro / Next.js (langfristig)

**Pre-Rendering muss abdecken:**
- [ ] Alle Guide-Pages (40 × 10 Sprachen = 400 Pages)
- [ ] Alle News-Pages
- [ ] Hub-Pages
- [ ] Homepage
- [ ] About / Author Pages

### Task 1.3: Bundle-Optimierung
```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom'],
        'framer': ['framer-motion'],
        'three': ['three', '@react-three/fiber'],
        'router': ['wouter'],
      }
    }
  }
}
```
- [ ] ParticleField nur auf Homepage laden (`React.lazy`)
- [ ] Framer Motion durch `motion-one` ersetzen (-60 KB)
- [ ] React Three Fiber nur lokal importieren wo benötigt
- [ ] Critical CSS inline (above-fold)
- [ ] Self-host Google Fonts mit `font-display: swap`
- [ ] Bilder zu WebP/AVIF konvertieren
- [ ] Image-CDN nutzen (Cloudinary / Bunny.net)

### Task 1.4: Core Web Vitals Optimierung
- [ ] LCP < 2.5s: Hero-Image preload, Font-Subsetting
- [ ] FID < 100ms: Long-Tasks aufbrechen (Web Workers)
- [ ] CLS < 0.1: Reserved Space für Ads, Embeds, Images

---

## 2.4 PILLAR 2: E-E-A-T Aufbau (Woche 3-6)

### Task 2.1: Multi-Author-System
Erstelle 5-7 spezialisierte Autoren-Profile:

```typescript
const AUTHORS = {
  'rolf-schwertfechter': {
    role: 'Lead Editor & Pro Streamer',
    expertise: ['Aim Training', 'Building', 'Stream Setup'],
    credentials: ['Unreal-Rang Season 1-OG', '10K+ Hours'],
  },
  'hardware-expert': {
    role: 'Hardware & Performance Specialist',
    expertise: ['PC Builds', 'Peripherals', 'Benchmarks'],
    credentials: ['IT-Engineer', 'PCGH-Tester'],
  },
  'pro-player-coach': {
    role: 'Competitive Coach',
    expertise: ['Ranked', 'FNCS', 'Mental Game'],
    credentials: ['FNCS Top 100', 'Ex-Team-Vitality'],
  },
  'meta-analyst': {
    role: 'Meta & Statistics Analyst',
    expertise: ['Weapon Stats', 'Patch Analysis', 'Win Rates'],
    credentials: ['Data Scientist', 'Fortnite-Tracker Top 1%'],
  },
  'creative-mapper': {
    role: 'Creative Map Specialist',
    expertise: ['UEFN', 'Map Codes', 'Creator Economy'],
    credentials: ['Verified Epic Creator', '10M+ Plays'],
  },
};
```

**Action Items:**
- [ ] `Person` Schema auf `/author/:slug` Pages
- [ ] Foto + LinkedIn + Twitter für jeden Author
- [ ] Mindestens 3 Articles pro Author
- [ ] Quellen-Verifikation (z.B. FNCS-Tracker-Profile)
- [ ] Author-Schema mit `sameAs` zu offiziellen Profilen

### Task 2.2: Trust-Signale verstärken
- [ ] **About-Page** mit Team-Foto, Mission, Geschichte
- [ ] **Editorial Policy** (Wie wir Content erstellen, Fact-Checking-Prozess)
- [ ] **Methodology Pages** (Wie wir Hardware testen, Stats sammeln)
- [ ] **Awards & Press** ("Featured in Gaming-Aktuell, GameStar, etc.")
- [ ] **User Testimonials** mit echten Discord-Screenshots
- [ ] **Media Kit** für Pressekontakte
- [ ] **Statistics Dashboard** (öffentliche Live-Stats)
- [ ] **TÜV / Trusted Shops Badge** (für Hardware-Empfehlungen)
- [ ] **DSGVO + Impressum** vollständig
- [ ] **Affiliate-Disclosure** auf jeder Seite

### Task 2.3: Quellen-Citation-System
```typescript
interface SourceCitation {
  type: 'official' | 'community' | 'data' | 'expert';
  url: string;
  title: string;
  retrievedAt: string;
  credibility: 1 | 2 | 3 | 4 | 5; // 5 = Epic Games offiziell
}
```
- [ ] Jeder Guide hat 3-10 verifizierte Quellen
- [ ] Schema mit `citation` Property
- [ ] "Fact-Checked by [Author]" Badge
- [ ] Last-Updated Datum prominent

---

## 2.5 PILLAR 3: Topical Authority Domination (Woche 4-12)

### Task 3.1: Content-Pillars vervollständigen

**Pillar A: Fortnite Mechanics (Status: 30% komplett)**
- ✅ Aim, Building, Ranked, Settings (existiert)
- [ ] Movement Tech (Dash, Slide, Mantle)
- [ ] Editing Course (10 Sub-Guides)
- [ ] Audio-Tipps (Soundwhoring, EQ-Settings)
- [ ] Mental Game / Tilt-Management
- [ ] Coaching-Methodologie

**Pillar B: Fortnite Meta (Status: 20% komplett)**
- [ ] Wöchentlicher Meta-Report (jeden Montag)
- [ ] Weapon Tier Lists (Update nach jedem Patch)
- [ ] Item Power Rankings
- [ ] Pro-Settings-Database (Top 100 FNCS-Spieler)
- [ ] Loadout-Konfigurator
- [ ] Heatmap-Analysis (POIs, Win-Rate)

**Pillar C: Fortnite Universe (Status: 5% komplett)**
- [ ] Skin-Database (alle 1500+ Skins, jeder eine eigene URL)
- [ ] Emote-Database
- [ ] Map-Wiki (jede POI seit Chapter 1)
- [ ] Storyline-Wiki (alle Lore-Events)
- [ ] Crossover-Database (Marvel, Star Wars, etc.)
- [ ] Battle-Pass-Archive (alle Saisons)
- [ ] Item-Shop-Historie (jeden Tag seit 2018)

**Pillar D: Esports & Pro-Scene (Status: 0% komplett)**
- [ ] Pro-Player-Profile (200+ Spieler)
- [ ] Team-Profile (alle Orgs)
- [ ] Tournament-Archive (FNCS, World Cup, Cash Cups)
- [ ] Live-Tournament-Tracker
- [ ] Earnings-Database
- [ ] Bracket-Visualizer

**Pillar E: Hardware & Tech (Status: 30% komplett)**
- ✅ Mouse, PC-Build, Windows-Tweaks
- [ ] Monitor-Reviews (240Hz, 360Hz, etc.)
- [ ] Keyboard-Reviews
- [ ] Headset-Reviews
- [ ] Audio-Setup-Guides
- [ ] Streaming-Hardware
- [ ] Network-Optimization

**Pillar F: Streaming & Content Creation (Status: 20% komplett)**
- ✅ OBS Settings
- [ ] Twitch vs. Kick vs. YouTube Vergleich
- [ ] Monetization-Guide
- [ ] Editing-Tutorials (DaVinci, Premiere)
- [ ] Thumbnail-Design
- [ ] SEO für Streamer

**Pillar G: Creative & UEFN (Status: 0% komplett)**
- [ ] UEFN-Tutorial-Series
- [ ] Map Code Database
- [ ] Creator Economy Guide
- [ ] Verlag-Mathematik (Engagement-Payouts)
- [ ] Map-Showcase-Reviews

### Task 3.2: Programmatic SEO Templates

**Template 1: "Best [Setting] for Fortnite 2026"**
- 1500+ Wörter pro Page
- Generiert für: DPI, Sensitivity, Audio, Video, etc.
- Erwartete Pages: 50+

**Template 2: "Fortnite Skin: [Skin-Name]"**
- 800+ Wörter pro Page
- Generiert für alle 1500+ Skins
- Erwartete Pages: 1500+

**Template 3: "Fortnite POI: [Location]"**
- 1200+ Wörter pro Page
- Loot-Spots, Tipps, Geschichte
- Erwartete Pages: 100+

**Template 4: "Fortnite Pro: [Player-Name]"**
- 1000+ Wörter pro Page
- Settings, Earnings, Highlights
- Erwartete Pages: 200+

**Template 5: "Fortnite Patch v[Version]"**
- 2000+ Wörter pro Page
- Vollständiges Archiv
- Erwartete Pages: 500+ (alle Patches seit Chapter 1)

**Total Programmatic Pages: 2,350+**

---

## 2.6 PILLAR 4: Schema-Markup Domination (Woche 5-8)

### Task 4.1: Erweiterte Schema-Implementation
```typescript
// schemas.ts – Vollständige Schema-Bibliothek
export const SCHEMAS = {
  // Existing
  Article, HowTo, FAQ, Breadcrumb, Speakable,
  
  // NEW: Authority-Boosters
  Person,           // /author/:slug Pages
  VideoObject,      // YouTube-Embeds
  LiveBlogPosting,  // Item Shop Updates
  Course,           // Multi-Part Tutorials
  Quiz,             // Engagement-Magnete
  Game,             // Fortnite-Entity
  VideoGame,        // Battle Passes
  Product,          // Hardware
  Review,           // Sterne in SERP
  Event,            // Tournaments
  Dataset,          // Stats/Leaderboards
  CollectionPage,   // Hub-Pages
  ItemList,         // Top 10 Lists
  ClaimReview,      // Fact-Checking
  SoftwareApplication, // Tools
  ImageGallery,     // Skin-Database
};
```

### Task 4.2: Knowledge Graph Connection
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Fortnite Nexus",
  "alternateName": ["FortniteNexus", "Nexus DE"],
  "sameAs": [
    "https://www.wikidata.org/wiki/Q[ID]",
    "https://en.wikipedia.org/wiki/Fortnite_Nexus",
    "https://twitter.com/FortniteNexusDE",
    "https://www.youtube.com/@FortniteNexusDE"
  ],
  "knowsAbout": [
    {
      "@type": "VideoGame",
      "@id": "https://www.wikidata.org/wiki/Q19979849",
      "name": "Fortnite"
    }
  ]
}
```

### Task 4.3: Entity-Linking
- [ ] Wikidata-Eintrag für "Fortnite Nexus" beantragen
- [ ] Wikipedia-Stub mit Quellen erstellen (DE/EN)
- [ ] Crunchbase-Profil
- [ ] LinkedIn Company Page
- [ ] Google Business Profile
- [ ] Knowledge Panel Antrag bei Google

---

## 2.7 PILLAR 5: Backlink & Authority Building (Woche 6-52)

### Task 5.1: Strategische Backlink-Quellen

**Tier 1: Gaming-Authority-Domains (DR 70+)**
- [ ] **GameStar.de** – Gastartikel über Fortnite-Meta
- [ ] **PCGames.de** – Hardware-Reviews crossposten
- [ ] **GamePro.de** – Streamer-Interview-Series
- [ ] **4Players.de** – Patch-Note-Analyse
- [ ] **Computerbase.de** – PC-Build-Guide

**Tier 2: Esport-Spezialdomains (DR 40-70)**
- [ ] **EarlyGame.com** – News-Cross-Posting
- [ ] **Dexerto.com** – Quote als deutscher Experte
- [ ] **Esportsobserver.com** – Industry-Analysen
- [ ] **Liquipedia.net** – Vollständiges Profil + Citations
- [ ] **HLTV.org** – Verlinkung als Quelle

**Tier 3: Reddit & Community (Trust-Signale)**
- [ ] **r/FortniteCompetitive** – Wöchentliche Quellen-Posts
- [ ] **r/FortniteBR** – Patch-Note-Analysen
- [ ] **r/FortniteCreative** – Creative-Map-Reviews
- [ ] **r/de_fortnite** – Deutsche Community-Domination

**Tier 4: YouTube & Twitch Mentions**
- [ ] Sponsoring-Deals mit deutschen Fortnite-Streamern
- [ ] Co-Streams mit Pro-Playern
- [ ] Tournament-Sponsoring (DACH-Region)
- [ ] Creator-Code im Streamer-Setup

**Tier 5: Wikipedia / Wikidata**
- [ ] Wikipedia-Artikel "Fortnite Nexus" (mit Quellen!)
- [ ] Wikidata-Entity erstellen
- [ ] Verlinkung in "Fortnite (Computerspiel)" Artikel als Quelle

### Task 5.2: Linkable Asset Strategy

**Asset 1: "Fortnite Pro Settings Database"**
- Top 100 Pro-Player-Settings
- API-Zugang für Researcher
- Embed-Widget für Streamer
- → **Erwartete Backlinks:** 500+

**Asset 2: "Fortnite Patch History API"**
- Vollständige Patch-Historie
- JSON-API für Entwickler
- → **Erwartete Backlinks:** 200+

**Asset 3: "Fortnite Earnings Tracker"**
- Live-Tournament-Earnings
- Player-Comparison-Tool
- → **Erwartete Backlinks:** 300+

**Asset 4: "Item Shop Analytics"**
- Historische Preisdaten
- Skin-Rarity-Analyse
- → **Erwartete Backlinks:** 150+

**Asset 5: "DPI/Sensitivity Calculator"**
- Tool zum Vergleich
- 360°-Distance-Berechnung
- → **Erwartete Backlinks:** 200+

### Task 5.3: Digital PR Kampagnen
- [ ] **Quartalsweise Reports:** "State of German Fortnite 2026"
- [ ] **Pressemitteilungen:** Über Deutsche Presse Agentur (DPA)
- [ ] **HARO/PressPlugs:** Als Fortnite-Experte registrieren
- [ ] **Original Research:** Mit eigenen Daten (Pro-Settings-Survey, etc.)
- [ ] **Awards verleihen:** "Best German Fortnite Streamer 2026"

---

## 2.8 PILLAR 6: User-Engagement & Behavioral Signals (Woche 7-16)

### Task 6.1: Engagement-Booster
- [ ] **Quiz-System:** "Welcher Fortnite-Pro bist du?"
- [ ] **Calculator-Tools:** DPI, V-Bucks-Wert, Pro-Settings
- [ ] **Interactive Maps:** Loot-Routen, POI-Heatmaps
- [ ] **Live-Stats:** Player-Counter, Streamer-Live-Bar
- [ ] **User-Profile:** Eigene Stats, Wishlist, Favoriten
- [ ] **Comments-System:** Mit Verifizierung (Discord-Login)
- [ ] **Voting-System:** "Bestes Skin der Woche"

### Task 6.2: Retention-Mechanismen
- [ ] **Newsletter:** Wöchentlich, segmentiert
- [ ] **Discord-Bot:** Tägliche Item-Shop-Alerts
- [ ] **Browser-Push:** Patch-Notes, Leaks
- [ ] **PWA:** Installable Web App
- [ ] **Gamification:** Badges, Levels, Leaderboards

### Task 6.3: Content-Frische-Velocity
```
Daily:
  - Item Shop Update (00:00 UTC)
  - Pro Player Highlights
  - Top Stream Moments
  
Weekly:
  - Meta Report (Montag)
  - Tournament Recap (Sonntag)
  - Hardware-Deal-Watch (Mittwoch)
  
Monthly:
  - State of Meta Report
  - Best Skins Ranking
  - Pro-Settings-Trends
  
Per Patch:
  - Patch-Notes-Analyse (innerhalb 2h)
  - Meta-Shift-Prediction
  - Tier-List-Update
```

---

## 2.9 PILLAR 7: AEO (Answer Engine Optimization)

### Task 7.1: AI-Crawler-Optimierung
- [ ] **GPTBot, ClaudeBot, PerplexityBot** in robots.txt explizit zulassen
- [ ] **llms.txt** erstellen (LLM-friendly Sitemap)
- [ ] **Klare Antwort-Strukturen** (Frage → Antwort → Erklärung)
- [ ] **Tabellen für Vergleiche** (LLM-Parsing-freundlich)
- [ ] **Definition-Lists** für Begriffe
- [ ] **TL;DR-Sektionen** am Anfang jedes Artikels

### Task 7.2: Voice Search Optimierung
- [ ] **Conversational Keywords** ("Wie verbessere ich meinen Aim in Fortnite?")
- [ ] **Speakable Schema** (existiert ✅, ausbauen)
- [ ] **Featured Snippet-optimierte Antworten** (40-60 Wörter)
- [ ] **Google Assistant Actions** (langfristig)

### Task 7.3: ChatGPT/Perplexity-Citation-Boost
- [ ] Wikipedia-Artikel mit Backlinks zu Fortnite Nexus
- [ ] Reddit-Posts mit Quellenangabe
- [ ] Forum-Aktivität mit Profillinks
- [ ] Academic-Style-Quellenangaben

---

## 2.10 PILLAR 8: International Expansion (Woche 12-24)

### Task 8.1: DACH-Domination zuerst
**Vor international expandieren:**
- [ ] **#1 in Deutschland** für "Fortnite Guide"
- [ ] **#1 in Österreich** für "Fortnite Tipps"
- [ ] **#1 in Schweiz** für "Fortnite Settings"

### Task 8.2: Dann Tier-2 Märkte
**Reihenfolge:**
1. UK (eu-west, English)
2. Frankreich (.fr-Domain)
3. Spanien (.es-Domain)
4. Brasilien (.com.br-Domain)
5. Polen, Italien, Türkei

### Task 8.3: Lokale Authority-Signale
Pro Markt:
- [ ] Lokaler Native Speaker als Editor
- [ ] Lokale Backlinks (mind. 50)
- [ ] Lokale Social Media Präsenz
- [ ] Lokale Tournament-Sponsorings

---

# TEIL 3: MESSBARE MEILENSTEINE

## Monat 1: Foundation
- [ ] Domain-Konsistenz hergestellt
- [ ] SSR/Pre-Rendering live
- [ ] Core Web Vitals grün
- [ ] 5 Author-Profile live
- [ ] About-Page + Editorial Policy
- [ ] Wikidata-Antrag eingereicht
- **KPI:** GSC zeigt 100% Index-Coverage

## Monat 2: Content-Velocity
- [ ] 50 neue Pages live (Programmatic SEO)
- [ ] Item Shop daily-Update automatisch
- [ ] News-Pipeline live (4× täglich)
- [ ] Newsletter mit 1000 Abonnenten
- **KPI:** Organic Traffic 2x

## Monat 3: Authority-Signale
- [ ] 200 Backlinks akquiriert (DR 30+)
- [ ] 5 Gastartikel auf Tier-1-Domains
- [ ] Reddit-Aktivität: 100+ Comments mit Citations
- [ ] YouTube-Channel 10K Subscribers
- **KPI:** Brand Searches 5x

## Monat 6: Domain Authority
- [ ] Domain Rating 25+ (Ahrefs)
- [ ] 1,000+ Organic Keywords ranking
- [ ] 50+ Featured Snippets
- [ ] 1,500+ Programmatic Pages live
- **KPI:** 10K MAU organisch

## Monat 12: Authority-Status
- [ ] **Domain Rating 45+**
- [ ] **15,000+ Organic Keywords**
- [ ] **500+ Top-3 Rankings**
- [ ] **Knowledge Panel** in Google
- [ ] **Sitelinks** für Brand-Search
- [ ] **2,000+ Referring Domains**
- [ ] **50K+ MAU organisch**
- **KPI:** Featured in mainstream Gaming-Press

---

# TEIL 4: AUTOMATISIERUNG & TOOLING

## 4.1 MCP-Server Setup
- [ ] **SE Ranking** – Keyword-Research
- [ ] **Google Search Console API** – Ranking-Monitoring
- [ ] **Brave Search MCP** – Leak-Research
- [ ] **Firecrawl** – Competitor-Scraping
- [ ] **Ahrefs API** – Backlink-Tracking
- [ ] **OpenAI API** – Content-Drafting

## 4.2 Daily Automations
```
00:00 UTC → Item Shop Fetch + News-Article generieren
01:00 UTC → Patch-Notes Check (Epic Games API)
02:00 UTC → Pro-Player-Stats Update
06:00 UTC → Newsletter senden (Tier 1)
12:00 UTC → Social Media Cross-Post
18:00 UTC → Discord Daily Roundup
23:00 UTC → Daily Stats Report (intern)
```

## 4.3 Weekly Automations
```
Monday    → Meta Report Generation
Tuesday   → Backlink-Outreach (50 Mails)
Wednesday → Hardware Deal-Watch
Thursday  → Pro-Settings-DB Update
Friday    → Tournament Preview
Saturday  → Newsletter Tier 2
Sunday    → Tournament Recap + KPI Review
```

---

# TEIL 5: BUDGET & ROI

## 5.1 Investment (12 Monate)
| Position | Kosten/Monat | Total |
|---|---|---|
| **Domain (.com + .de)** | €3 | €36 |
| **Hosting (Netlify Pro)** | €19 | €228 |
| **CDN (Bunny.net)** | €10 | €120 |
| **MCP Server / APIs** | €100 | €1,200 |
| **OpenAI API** | €200 | €2,400 |
| **Backlink-Outreach Tool** | €100 | €1,200 |
| **SE Ranking** | €40 | €480 |
| **Ahrefs Lite** | €99 | €1,188 |
| **Freelance Authors (3×)** | €1,500 | €18,000 |
| **PR/Outreach Agency** | €500 | €6,000 |
| **TOTAL** | **€2,571** | **€30,852** |

## 5.2 Erwartete Returns (Monat 12)
| Stream | Conservative | Aggressive |
|---|---|---|
| **SAC Revenue** | €2,000 | €5,000 |
| **Affiliate** | €3,000 | €8,000 |
| **Engagement Payouts** | €2,000 | €10,000 |
| **Display Ads** | €1,500 | €5,000 |
| **Premium Subs** | €500 | €2,000 |
| **TOTAL/Monat** | **€9,000** | **€30,000** |

**ROI Monat 12:** 3.5× (Conservative) bis 11.7× (Aggressive)

---

# TEIL 6: NÄCHSTE 7 TAGE – KONKRETER ACTION-PLAN

## Tag 1-2: Critical Fixes
1. Domain-Konsistenz: Alle URLs auf `fortnitenexus.com`
2. SSR/Pre-Rendering Setup beginnen
3. ParticleField nur auf Homepage

## Tag 3: Multi-Author
1. Author-Daten erweitern (5 Profile)
2. `/author/:slug` Route + Page erstellen
3. Person Schema implementieren

## Tag 4: Trust-Pages
1. About-Page erstellen
2. Editorial Policy verfassen
3. Methodology Pages

## Tag 5: Schema-Erweiterung
1. VideoObject für YouTube-Embeds
2. Product Schema für Hardware
3. Event Schema für Tournaments

## Tag 6: Item-Shop-Automatisierung
1. Fortnite-API MCP Server
2. Daily-Fetch Cronjob
3. Auto-Article-Generator

## Tag 7: Search Console Setup
1. Property in GSC anlegen
2. Sitemap einreichen
3. Bing Webmaster + Yandex
4. Erste Performance-Baseline messen

---

# FINALE DIREKTIVE

> **Authority bei Google ist kein Ziel – es ist ein Nebenprodukt von:**
> 1. **Vollständigkeit** (Topical Coverage)
> 2. **Glaubwürdigkeit** (E-E-A-T)
> 3. **Konsistenz** (technisch & content)
> 4. **Frische** (Update-Velocity)
> 5. **Engagement** (User-Signale)
> 6. **Verbindungen** (Backlinks & Mentions)

**Das ist nicht ein Sprint – das ist ein 12-Monats-Marathon.**
**Aber wenn wir disziplinieren bleiben, wird Fortnite Nexus zur unangefochtenen deutschen Fortnite-Authority.**

---

# IMPLEMENTATION LOG

## Phase 14 - Tag 1-2: Domain Consolidation (COMPLETED)
**Datum:** April 26, 2026  
**Status:** ✅ CRITICAL FIXES IMPLEMENTED

### Änderungen durchgeführt:

#### 1. Zentrale Domain-Config erstellt
**File:** `apps/web/src/lib/site-config.ts` (NEW)
- Single Source of Truth für alle URLs
- `CANONICAL_DOMAIN = 'https://fortnitenexus.com'`
- URL-Builder-Funktionen: `buildUrl()`, `buildLocalizedUrl()`, `buildRegionalUrl()`
- Social Profile Konstanten
- Schema ID Generatoren
- Validation Helpers: `isCanonicalDomain()`, `needsRedirect()`

#### 2. pseo.ts aktualisiert
**File:** `apps/web/src/lib/pseo.ts`
- Import `CANONICAL_DOMAIN`, `SOCIAL_PROFILES`, `buildAuthorUrl` from site-config
- AUTHOR.socials auf site-config umgestellt
- AUTHOR.url hinzugefügt: `buildAuthorUrl('rolf-schwertfechter')`
- `generateHowToSchema`: Author URL von hardcoded auf `AUTHOR.url`
- `generateArticleSchema`: Publisher URL auf `CANONICAL_DOMAIN`
- `generateArticleSchema`: sameAs für Author und Publisher hinzugefügt
- `buildAllSchemas`: Breadcrumb URLs auf `CANONICAL_DOMAIN`

#### 3. geo-seo.ts aktualisiert
**File:** `apps/web/src/lib/geo-seo.ts`
- Unknown region socialLink: `'https://fortnitenexus.com'`
- `generateGeoSchema` image URL: `'https://fortnitenexus.com/og-image.jpg'`

#### 4. sitemap-generator.ts aktualisiert
**File:** `apps/web/src/lib/sitemap-generator.ts`
- Import `CANONICAL_DOMAIN` from site-config
- `BASE_URL = CANONICAL_DOMAIN` (statt hardcoded)
- `generateSitemapIndexXML`: Sitemap URL auf `${CANONICAL_DOMAIN}/sitemap.xml`

#### 5. SEOHead.tsx aktualisiert
**File:** `apps/web/src/components/SEOHead.tsx`
- Import `CANONICAL_DOMAIN`, `SEO` from site-config
- Default `baseUrl` auf `CANONICAL_DOMAIN` (statt netlify.app)
- Twitter Handle auf `SEO.TWITTER_HANDLE`
- OG Site Name auf `SEO.DEFAULT_TITLE`

#### 6. robots.txt aktualisiert
**File:** `apps/web/public/robots.txt`
- Sitemap URL: `https://fortnitenexus.com/sitemap`
- AI-Crawler explizit erlaubt (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- Update Kommentar hinzugefügt

#### 7. netlify.toml aktualisiert
**File:** `netlify.toml`
- Domain Consolidation Redirects hinzugefügt:
  - `www.fortnitenexus.com/*` → `fortnitenexus.com/:splat` (301)
  - `fortnitenexus.netlify.app/*` → `fortnitenexus.com/:splat` (301)
- Beide mit `force = true`

### Impact:
- ✅ Domain-Konsistenz hergestellt
- ✅ Authority wird nicht mehr zwischen .com und .netlify.app verteilt
- ✅ Alle Schema-Markups zeigen auf canonical Domain
- ✅ Sitemap generiert korrekte URLs
- ✅ AI-Crawler können alle Inhalte indexieren
- ✅ 301 Redirects preserve Link-Equity

### Nächste Schritte:
- [ ] DNS für `fortnitenexus.com` auf Netlify verweisen
- [ ] Google Search Console Property für Apex-Domain erstellen
- [ ] SSL-Zertifikat für .com Domain aktivieren
- [ ] Bing Webmaster Tools + Yandex registrieren

---

*Document Version: 1.1*
*Created: April 26, 2026*
*Updated: April 26, 2026 (Tag 1-2 Domain Consolidation)*
*Author: Cascade (Lead Architect & Growth Strategist)*
*Status: 🚀 PHASE 14 IN PROGRESS – DOMAIN CONSOLIDATION COMPLETED*
