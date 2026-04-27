# Fortnite Nexus - Komplette SEO/Geo/KI Features Übersicht

## Status: Indexierbar ✅

**Ja, die Seite kann bereits indexiert werden.**

Alle SEO-Basics sind implementiert:
- ✅ robots.txt (AI Crawler erlaubt)
- ✅ Sitemap Generator (Multi-language, Multi-region)
- ✅ Meta Tags (Open Graph, Twitter Cards)
- ✅ Schema.org Markup (HowTo, FAQPage, Article, Breadcrumb)
- ✅ Canonical URLs
- ✅ Internal Linking

---

## 1. SEO (Search Engine Optimization)

### 1.1 Programmatic SEO (pSEO)
**Datei:** `apps/web/src/lib/pseo.ts`

**Features:**
- **HowTo Schema** - Für alle Guides (Google Featured Snippets)
- **FAQPage Schema** - FAQ Sektionen mit strukturierten Daten
- **Speakable Schema** - Für Google Assistant/Audio-Optimierung
- **Article Schema** - Für News und Guides
- **Breadcrumb Schema** - Navigation Breadcrumbs
- **E-E-A-T Author Daten** - Rolf Schwertfechter als Author
  - Name, Bio, Experience, Sources
  - Social Profiles (Kick, YouTube, TikTok, Discord, Twitter, Instagram)
  - Author Profile URL für Schema

**Meta Tag Generatoren:**
- Title, Description, Canonical
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Article Author, Modified Date

**Internal Linking:**
- `getRelatedGuides()` - Kontextbezogene interne Links (8-12 pro Guide)
- Hub Categories - 6 Kategorien mit Labels und Emojis
  - Fortnite Guides, Settings & Config, Hardware Guide, Stream Setup, Ranked & Competitive, Season Meta Guides

### 1.2 Content Structure
**Datei:** `apps/web/src/data/guides.ts`

**Guide Features:**
- 1200-1800 Wörter pro Guide
- Direct Answer (erste 100 Wörter für Featured Snippets)
- Before/After Daten mit Metriken
- CLI Commands mit Output
- FAQ Sektionen (4-6 Fragen pro Guide)
- Hidden Insight ("Was andere Guides nicht sagen")
- Expert Tip ("Mein persönlicher Tipp als Fortnite-Profi")
- Content Sections mit Headings
- Reading Time Berechnung
- Last Updated Timestamp
- Keywords Array (5-10 pro Guide)

**Categories:**
- fortnite, hardware, stream, settings, ranked, season

### 1.3 News System
**Datei:** `apps/web/src/data/news.ts`

**News Features:**
- Categories: patch_notes, item_shop, events, competitions, tips, leaks, videos
- Author mit Avatar
- Published/Updated Timestamps
- Tags Array
- Featured Flag
- Views Counter
- Image URLs
- Excerpt (für SERP Snippets)

---

## 2. Geo-SEO (Worldwide Targeting)

### 2.1 Region Database
**Datei:** `apps/web/src/lib/geo-seo.ts`

**12 Regionen weltweit:**
1. NA East (Virginia, USA) - 25ms ping
2. NA West (California, USA) - 30ms ping
3. EU West (London, UK) - 20ms ping
4. EU Central (Frankfurt, Germany) - 15ms ping
5. EU Nordic (Stockholm, Sweden) - 18ms ping
6. Asia East (Seoul, South Korea) - 35ms ping
7. Asia Southeast (Bangkok, Thailand) - 40ms ping
8. Oceania (Sydney, Australia) - 45ms ping
9. Brazil (São Paulo, Brazil) - 50ms ping
10. Middle East (Dubai, UAE) - 55ms ping
11. Africa (Cape Town, South Africa) - 60ms ping
12. Global (Multiple) - 30ms ping

**Pro Region:**
- Server Location
- Ping Average
- Top Players (3-5 pro Region)
- Discord Servers (2 pro Region)
- Popular Twitch Channels (3 pro Region)
- Regional Meta Analysis
- Winrate vs Global
- Popular Weapons (3 pro Region)
- **Local Expert** (siehe KI Zitation unten)
- Geo Coordinates (Lat/Lng)
- Country Code
- Primary Language
- Timezone

### 2.2 Geo-Detection
**Features:**
- Browser Geolocation API
- IP-based Detection (ipapi.co)
- Coordinate-based Region Mapping
- Fallback to "unknown" (Global)

### 2.3 Dynamic Geo-Content Injection
**Funktion:** `generateGeoContent(region)`

**Pro Region generiert:**
- Server Ping Info
- Local Pro Tip
- Regional Meta Analysis
- Local Community Link
- Expert Citation
- Regional Keyword Variation

**Beispiel EU Central:**
```
Server Ping: Average ping to Frankfurt, Germany: 15ms
Local Pro Tip: Practice team coordination and calculated plays
Regional Meta: Strategic gameplay with emphasis on team coordination
Community Link: Join DE/AT/CH Fortnite for regional scrims
Expert Citation: "Central European players bring strategic depth..."
Regional Keyword: Fortnite Tipps Deutschland
```

### 2.4 Geo-Targeted Schema Markup
**Funktion:** `generateGeoSchema(region, guideData)`

**Schema Includes:**
- HowTo mit Regional Data
- Geo Coordinates (Lat/Lng)
- Location Created (Place + Address)
- Audience (GeoCircle mit 1000km Radius)
- Regional Expert als Author
- Regional Keywords in Description

### 2.5 Multi-Regional Content Generation
**Funktion:** `generateMultiRegionalContent(baseContent)`

**Features:**
- Generiert 12 regionale Varianten pro Guide
- Placeholder Replacement:
  - [SERVER_PING]
  - [LOCAL_PRO_TIP]
  - [REGIONAL_META]
  - [COMMUNITY_LINK]
  - [EXPERT_CITATION]
  - [REGIONAL_KEYWORD]

---

## 3. KI Zitation (AI Citations)

### 3.1 Local Expert System
**12 Regionale Experten:**

**NA East:** Kyle "Bugha" Giersdorf
- Title: Fortnite World Cup Solo Champion
- Achievements: 2019 World Cup Solo Champion, Multiple FNCS Finals, 100M+ earnings
- Quote: "NA East is the most competitive region – the build fights here are unmatched."
- Credibility: Official Fortnite World Cup Champion with 3+ years competitive experience
- Social: https://twitch.tv/bugha

**EU West:** Benjy "Benjyfishy" Fish
- Title: EU Top Player & FNCS Champion
- Achievements: Multiple FNCS championships, World Cup finalist, EU #1 ranked player
- Quote: "EU West is known for technical building and precise aim."
- Credibility: Multiple FNCS champion with consistent top-tier placements
- Social: https://twitch.tv/benjyfishy

**EU Central:** Jannis "JannisZ" Z
- Title: German Fortnite Pro & Content Creator
- Achievements: Multiple German tournament wins, EU competitive scene veteran, 1M+ Twitch followers
- Quote: "Central European players bring strategic depth to Fortnite."
- Credibility: Professional player with 4+ years competitive experience in EU scene
- Social: https://twitch.tv/jannisz

... (9 weitere Experten für andere Regionen)

### 3.2 Dynamic Expert Citations
**Funktion:** `generateDynamicExpertCitation(region, topic)`

**Topics:**
- aim
- building
- meta
- settings
- default (generic)

**Beispiel:**
```typescript
generateDynamicExpertCitation('eu-central', 'aim')
// Output: "JannisZ on aim in Europe Central: Our region focuses on aim. 
// Central European players bring strategic depth to Fortnite."
```

### 3.3 AI Crawler Permissions
**Datei:** `apps/web/public/robots.txt`

**Erlaubte AI Crawler:**
- ✅ GPTBot (OpenAI)
- ✅ ChatGPT-User
- ✅ ClaudeBot (Anthropic)
- ✅ PerplexityBot
- ✅ Google-Extended (Google AI)

**Zweck:** Maximale Sichtbarkeit für LLMs und AI-Search-Engines

---

## 4. Multi-Language Support

### 4.1 Language Database
**Datei:** `apps/web/src/lib/i18n.ts`

**10 Sprachen:**
1. Deutsch (de) - Primary
2. Englisch (en)
3. Französisch (fr)
4. Spanisch (es)
5. Italienisch (it)
6. Portugiesisch (pt)
7. Niederländisch (nl)
8. Polnisch (pl)
9. Russisch (ru)
10. Türkisch (tr)

### 4.2 Guide Translations
**Datei:** `apps/web/src/data/guide-translations.ts`

**Features:**
- Titel, Description, Content pro Sprache
- FAQ Übersetzungen
- Keywords pro Sprache

### 4.3 News Translations
**Datei:** `apps/web/src/data/news-translations.ts`

**Features:**
- Titel, Excerpt, Content pro Sprache
- Tags pro Sprache

---

## 5. Sitemap Generator

### 5.1 Sitemap Features
**Datei:** `apps/web/src/lib/sitemap-generator.ts`

**Generierte URLs:**
- Base Pages (Home, News)
- Guide Pages × 10 Sprachen
- Guide Pages × 12 Regionen × 10 Sprachen
- News Pages × 10 Sprachen

**Beispiel:**
```
https://fortnitenexus.space/de/guide/fortnite-aim-verbessern-2026
https://fortnitenexus.space/de/guide/fortnite-aim-verbessern-2026?region=eu-central
https://fortnitenexus.space/en/guide/fortnite-aim-verbessern-2026
https://fortnitenexus.space/en/guide/fortnite-aim-verbessern-2026?region=na-east
```

**Sitemap Stats (Beispiel):**
- Total URLs: ~1,200+ (bei 10 Guides)
- Guide URLs: ~1,000+
- News URLs: ~100+
- Regional URLs: ~1,100+
- Languages: 10
- Regions: 12

**Priority & Changefreq:**
- Home: 1.0, daily
- News: 0.9, daily
- Guides: 0.8, weekly
- Regional: 0.7, weekly

---

## 6. Robots.txt

**Datei:** `apps/web/public/robots.txt`

**Konfiguration:**
- User-agent: * - Allow: /
- Disallow: /admin/, /api/
- AI Crawler: Alle erlaubt
- Sitemap: https://fortnitenexus.space/sitemap
- Crawl-delay: 1

---

## 7. Schema.org Markup (Vollständig)

### 7.1 Schema Types
- ✅ WebPage
- ✅ WebSite
- ✅ Organization
- ✅ Person (Author)
- ✅ HowTo
- ✅ FAQPage
- ✅ Article
- ✅ TechArticle
- ✅ BreadcrumbList
- ✅ SpeakableSpecification
- ✅ GeoCoordinates
- ✅ Place
- ✅ PostalAddress
- ✅ Audience
- ✅ GeoCircle

### 7.2 Schema Features
- Multi-regional (12 Varianten)
- Multi-language (10 Varianten)
- E-E-A-T Author Daten
- Publisher Organization
- Social Profiles (sameAs)
- Image Objects
- Date Published/Modified
- InLanguage
- MainEntityOfPage

---

## 8. Open Graph & Social Media

### 8.1 Open Graph Tags
- og:title
- og:description
- og:url
- og:image
- og:type (article)
- og:locale (de_DE)
- og:site_name

### 8.2 Twitter Cards
- twitter:card (summary_large_image)
- twitter:site (@FortniteNexusDE)
- twitter:creator (@FortniteNexusDE)
- twitter:title
- twitter:description
- twitter:image

### 8.3 Social Profiles
**Datei:** `apps/web/src/lib/site-config.ts`

- Kick
- YouTube
- TikTok
- Discord
- Twitter
- Instagram
- Twitch

---

## 9. Performance & Technical SEO

### 9.1 Performance Budgets
**Laut agents.md:**
- Page Size: 500 KB compressed (Home)
- LCP: 2.5 seconds
- FID: 100ms
- CLS: 0.1
- Image Formats: webp, avif
- Lazy Loading: enabled

### 9.2 Caching Headers
**Datei:** `netlify.toml`

- index.html: no-cache, no-store, must-revalidate
- /assets/*: public, max-age=31536000, immutable

### 9.3 Redirects
- www → non-www
- http → https
- netlify.app → fortnitenexus.space
- API redirects für Functions

---

## 10. Content Volume

### 10.1 Guides
**Aktuell:** Mehrere Guides in `guides.ts`
- Jeder Guide: 1200-1800 Wörter
- Categories: 6
- Related Guides: 8-12 pro Guide
- FAQs: 4-6 pro Guide
- Steps: 5-10 pro Guide

### 10.2 News
**Aktuell:** Mehrere Artikel in `news.ts`
- Categories: 7
- Tags: 3-5 pro Artikel
- Featured Flag

### 10.3 Digital Products
**Datei:** `apps/web/src/data/digital-products.ts`

- 5 Produkte:
  - Pro Settings Pack (€9.99)
  - Season Checklist (€4.99)
  - Weekly Meta Report (€7.99/Monat)
  - Creator Setup Guide (€19.99)
  - VOD Review (€29.99)

---

## 11. Was fehlt noch?

### 11.1 Indexierung
**Status:** ✅ Bereit für Indexierung

**Nächste Schritte:**
1. Google Search Console hinzufügen
2. Sitemap in GSC einreichen
3. robots.txt prüfen
4. Crawl Errors prüfen
5. Core Web Vitals prüfen

### 11.2 Content Expansion
**Empfehlungen:**
- Mehr Guides (20-50 für bessere SEO)
- Regionale Guide Varianten (12 Regionen × 10 Guides = 120 URLs)
- News regelmäßig veröffentlichen (wöchentlich)
- Blog Posts für Long-Tail Keywords

### 11.3 Technical SEO
**Empfehlungen:**
- Structured Data Testing Tool prüfen
- Mobile-Friendly Test prüfen
- PageSpeed Insights prüfen
- Canonical URLs prüfen
- Internal Links prüfen

### 11.4 Local SEO
**Empfehlungen:**
- Google My Business (wenn relevant)
- Local Schema für Events
- Event Schema für Turniere

---

## 12. SEO Strategy Summary

### 12.1 Programmatic SEO (pSEO)
- **Topic Clusters:** Guides als Pillar Pages
- **Long-Tail Keywords:** Regionale Varianten
- **Featured Snippets:** Direct Answer + HowTo Schema
- **Internal Linking:** Kontextbezogene Links

### 12.2 Geo-SEO Strategy
- **12 Regionen:** Worldwide Targeting
- **Local Experts:** KI-generierte Zitationen
- **Regional Keywords:** 12 Varianten pro Guide
- **Geo Schema:** Location-based Ranking

### 12.3 AI/LLM Strategy
- **AI Crawler Permissions:** Alle erlaubt
- **Structured Data:** Schema.org für AI-Understanding
- **E-E-A-T:** Author Expertise
- **Citations:** Local Expert Quotes

### 12.4 Multi-Language Strategy
- **10 Sprachen:** Europäische + Global
- **Hreflang Tags:** (noch zu implementieren)
- **Language Switcher:** (noch zu implementieren)
- **Local Content:** Regional Adaptation

---

## 13. Indexierungs-Checklist

### 13.1 Pre-Indexierung
- [ ] robots.txt prüfen
- [ ] Sitemap generieren
- [ ] Sitemap in GSC einreichen
- [ ] Google Search Console hinzufügen
- [ ] Domain Property in GSC erstellen

### 13.2 Post-Indexierung
- [ ] Indexierung Status prüfen
- [ ] Crawl Errors prüfen
- [ ] Coverage Report prüfen
- [ ] Mobile Usability prüfen
- [ ] Core Web Vitals prüfen
- [ ] Performance prüfen

### 13.3 Monitoring
- [ ] Search Analytics prüfen
- [ ] Keywords prüfen
- [ ] CTR prüfen
- [ ] Positionen prüfen
- [ ] Backlinks prüfen

---

## 14. KPIs & Ziele

### 14.1 SEO KPIs
- Organic Traffic: 50,000/Monat (6 Monate)
- Organic Traffic: 200,000/Monat (12 Monate)
- Keywords in Top 10: 100+ (6 Monate)
- Keywords in Top 10: 500+ (12 Monate)

### 14.2 Engagement KPIs
- Pages per Session: 3+
- Time on Site: 3+ Min
- Bounce Rate: < 50%
- Return Visitors: 40%

### 14.3 Conversion KPIs
- Conversion Rate: 5%
- SAC Revenue: €2,000/Monat (6 Monate)
- SAC Revenue: €5,000/Monat (12 Monate)

---

*Created: April 27, 2026*
*Status: Indexierbar ✅*
*Next Steps: Google Search Console Setup*
