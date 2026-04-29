# FORTNITENEXUS.SPACE — WEBSITE-ARCHITEKTUR & UX-BLUEPRINT

## Überblick
Die Website-Architektur ist ein umfassendes UX-Blueprint, das User so tief in die Seite zieht, dass sie 10+ Seiten pro Session besuchen. Maximale Verweildauer, niedrigste Absprungrate der Nische.

## Ziel
Maximale Verweildauer, niedrigste Absprungrate der Nische

## Komponenten

### 1. Site-Map
**Datei:** `apps/web/public/data/site-map.json`

**Struktur:** 3 Ebenen tief, 80+ URLs
- Startseite (Landing Page)
- Meta Hub (Waffen, Karten, Ranked)
- Guides Hub (Aim, Building, Settings, Meta)
- Ranked Hub (Tipps, Strategie, Zone Wars)
- Settings Hub (PC, Controller, Mobile, Konsolen)
- News Hub (Patch Notes, Item Shop, Events)
- Tools Hub (Waffen-Datenbank, Loadout Builder, Stats Checker)
- Community Hub (Discord, LFG, Creators)
- Static Pages (About, Privacy, Impressum)

**Page-Types:**
- Landing Page
- Hub Page
- Guide
- Tool
- News Hub
- External Link
- Static Page

**PageRank:** 1-5 (5 = höchste Priorität)

### 2. Navigation-Design
**Datei:** `apps/web/public/navigation-config.js`

**Desktop Navigation (max. 6 Items):**
1. Guides – Dropdown mit allen Guide-Kategorien
2. Meta – Waffen, Karten, Ranked
3. Tools – Interaktive Tools
4. News – Patch Notes, Item Shop, Events
5. Ranked – Ranked-Tipps und Strategien
6. Community – Discord, LFG, Creators

**Warum diese Struktur:**
- Guides ist der primäre Entry-Point für neue User
- Meta ist für fortgeschrittene Spieler (wächst mit Popularität)
- Tools erhöhen Engagement und Verweildauer
- News sorgt für wiederkehrende Besucher
- Ranked spricht Competitive-Spieler an
- Community baut Loyalität auf

**Mega-Dropdown-Inhalte:**
- Guides Dropdown: Aim Guide, Building Guide, Best Settings, Weapon Tier List, Ranked Tips, Meta Strategie
- Meta Dropdown: Waffen (Assault Rifles, Shotguns, SMG, Sniper, Best Loadouts), Karten (Chapter 6 Season 2, Beste Landezonen, POI Locations), Ranked (Tipps, Strategie, Zone Wars)
- Tools Dropdown: Waffen-Datenbank, Loadout Builder, Sensitivity Calculator, Map Tracker, Stats Checker, Item Shop Tracker

**Mobile-Navigation (Bottom Navigation Bar):**
1. Home – Startseite
2. Guides – Guide-Kategorien
3. Meta – Meta-Hub
4. Tools – Interaktive Tools
5. Profile – User-Profile (wenn eingeloggt)

**Warum Bottom Navigation:**
- Fortnite-Spieler sind 70% mobil
- Thumb-reachable für einhändige Nutzung
- Bekanntes Pattern aus Social Apps
- Maximale Accessibility

**Sticky-Elemente:**
1. Sticky Header – Logo, Navigation, Search
2. Sticky SAC-Reminder – Creator Code Erinnerung (nach 30s)
3. Sticky CTA – "Guide lesen" Button (nach Scroll)
4. Sticky Table of Contents – Inhaltsverzeichnis (bei Guides)
5. Sticky Related Content – Verwandte Artikel (am Ende)

### 3. Homepage-Wireframe
**Datei:** `apps/web/public/homepage-wireframe.js`

**Hero Section (Above Fold):**
- Headline: "Fortnite Nexus – Die ultimative deutsche Fortnite Community 2026"
- Sub-Headline: "Guides, Meta, Tools und News – Alles für Fortnite Spieler auf Deutsch. Von Anfänger bis Pro."
- CTA-Buttons: "Guides lesen", "Tools testen", "News lesen"
- Hero-Visual: Fortnite-spezifisches Hero-Image mit SAC-Code Overlay

**"Frisch gepatch" Widget:**
- Position: Direkt unter Hero
- Content: PATCH ALERT mit Patch Notes Link
- Funktionalität: Auto-Update alle 5 Minuten

**Trending Guides:**
- Position: Mitte der Seite
- Sortierungslogik: Meiste Views in den letzten 7 Tagen, Höchste Engagement-Rate, Neuheit
- Anzeige: 6 Cards in Grid-Layout (3 Spalten Desktop, 2 Spalten Tablet, 1 Spalte Mobile)

**Stats-Teaser:**
- Position: Unter Trending Guides
- Zahl: "12.500+ Fortnite Spieler nutzen unsere Guides每周"
- Zusätzliche Stats: 27 Guides, 8 News-Artikel pro Woche, 10+ Tools, 4.9/5 Bewertung
- CTA: "Community beitreten"

**Newsletter-Block:**
- Position: Vor Footer
- Lead-Magnet: "Wöchentliche Meta-Updates & Patch-Alerts direkt in dein Email-Postfach"
- Form: Email Input, Abonnieren Button, SAC-Code Erinnerung Checkbox
- Incentive: "Exklusive Tipps nur für Newsletter-Abonnenten"

**Footer-Architektur:**
- Spalte 1: Fortnite Nexus (Über uns, Kontakt, Karriere)
- Spalte 2: Guides (Aim Guide, Building Guide, Settings)
- Spalte 3: Meta (Waffen, Karten, Ranked)
- Spalte 4: Tools (Waffen-Datenbank, Loadout Builder, Stats Checker)
- Spalte 5: Legal (Datenschutz, Impressum, AGB)
- Spalte 6: Social (Discord, Twitter, YouTube, TikTok)

### 4. Article-Page-Template
**Datei:** `apps/web/public/article-page-template.js`

**Sidebar-Inhalte (Desktop):**
1. SAC-Reminder – Creator Code Erinnerung (sticky)
2. Table of Contents – Inhaltsverzeichnis (sticky)
3. Related Guides – 3 verwandte Guides
4. Trending Tools – 3 beliebte Tools
5. Newsletter Signup – Email-Form
6. Social Share – Twitter, Discord, Reddit

**In-Content-Module:**
- Nach Paragraph 3: Featured Snippet Block (FAQ-Format), SAC-Code Erinnerung (compact)
- Nach Paragraph 7: Related Content Card (verwandter Guide), Tool Integration
- Nach Paragraph 12: Newsletter Signup, Discord CTA
- Nach Paragraph 18: Related Articles, Community CTA

**Related Content Algorithmus:**
1. Same Category – 40% Gewicht
2. Same Tags – 30% Gewicht
3. Popular – 15% Gewicht
4. Recent – 10% Gewicht
5. User Behavior – 5% Gewicht

**Exit-Intent Mechanik:**
- Trigger: User bewegt Maus zum Tab-Schließen (Desktop), User scrollt nach oben schnell (Mobile)
- Modal: "Willst du besser in Fortnite werden?" mit Guide-CTA
- Cookie: Zeigt nur einmal pro Session, Dismiss für 7 Tage

### 5. Conversion-Funnel
**Schritt-für-Schritt: Besuch → Stammleser**

**Schritt 1: Besuch → Email**
- Maßnahme: Newsletter Signup nach 30 Sekunden
- Trigger: Time-based (30s on page)
- Timing: Nach erstem Guide gelesen

**Schritt 2: Email → Discord**
- Maßnahme: Discord Einladung in Welcome-Email
- Trigger: Email bestätigt
- Timing: Sofort nach Signup

**Schritt 3: Discord → wiederkehrender User**
- Maßnahme: Wöchentliche Discord-Events & Tipps
- Trigger: Discord Membership
- Timing: Wöchentlich

**Schritt 4: wiederkehrender User → Community-Mitglied**
- Maßnahme: Exclusive Content für Discord-Mitglieder
- Trigger: 3+ Discord Besuche
- Timing: Nach 1 Woche

## Integration

### Auf jeder Seite importieren:
```html
<script src="/navigation-config.js"></script>
<script src="/homepage-wireframe.js"></script>
<script src="/article-page-template.js"></script>
```

### Navigation rendern:
```javascript
// Desktop Navigation
const desktopNav = generateDesktopNavigation();
renderDesktopNavigation(desktopNav);

// Mobile Navigation
const mobileNav = generateMobileNavigation();
renderMobileNavigation(mobileNav);

// Sticky Elements
const stickyElements = generateStickyElements();
renderStickyElements(stickyElements);

// Footer
const footer = generateFooter();
renderFooter(footer);
```

### Homepage rendern:
```javascript
const homepage = generateHomepage();
renderHeroSection(homepage.hero);
renderFreshPatchWidget(homepage.fresh_patch);
renderTrendingGuides(homepage.trending_guides);
renderStatsTeaser(homepage.stats);
renderNewsletterBlock(homepage.newsletter);
```

### Article-Page rendern:
```javascript
const sidebar = generateSidebar();
renderSidebar(sidebar);

const modules = generateInContentModules();
renderInContentModules(modules);

const related = generateRelatedContent(currentArticle, allArticles);
renderRelatedContent(related);

const exitIntent = generateExitIntentModal();
renderExitIntentModal(exitIntent);

const funnel = generateConversionFunnel();
initConversionFunnel(funnel);
```

## Best Practices

1. **Mobile-First:** 70% der Fortnite-Spieler sind mobil
2. **Thumb-Reachable:** Bottom Navigation für einhändige Nutzung
3. **Sticky Elements:** Wichtige CTAs immer sichtbar
4. **Related Content:** Algorithmus-basierte Empfehlungen
5. **Exit-Intent:** Modal bei Abbruch-Intention
6. **Conversion Funnel:** Schrittweise User zu Stammleser konvertieren
7. **Newsletter:** Wöchentliche Meta-Updates als Lead-Magnet
8. **Discord:** Community für Loyalität und Engagement

## Monitoring

### KPIs
- Pages per Session (Ziel: 10+)
- Average Session Duration (Ziel: 5+ Minuten)
- Bounce Rate (Ziel: < 30%)
- Conversion Rate (Ziel: 5%)
- Email Signup Rate (Ziel: 10%)
- Discord Join Rate (Ziel: 5%)

### Analytics
- Google Analytics 4
- Hotjar für Heatmaps
- Session Recording
- User Flow Analysis
- Conversion Funnel Tracking

## Next Steps

1. Site-Map implementieren (80+ URLs erstellen)
2. Navigation-Struktur implementieren (Desktop & Mobile)
3. Homepage implementieren (Hero, Trending, Stats, Newsletter)
4. Article-Page implementieren (Sidebar, In-Content, Related Content)
5. Exit-Intent Modal implementieren
6. Conversion Funnel implementieren
7. A/B Testing starten
8. Performance optimieren

---

*Last Updated: April 29, 2026*
*Version: 1.0 — Website-Architektur & UX-Blueprint*
