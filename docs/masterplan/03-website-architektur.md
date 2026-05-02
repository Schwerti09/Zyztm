# Masterplan 3: Website-Architektur & UX-Blueprint

## Ziel
Maximale Verweildauer, niedrigste Absprungrate der Nische

## Strategie
Du bist Senior UX-Architekt und hast Websites wie Twitch, GameFAQs und Liquipedia mitaufgebaut. Deine Aufgabe: Entwirf die vollständige Informationsarchitektur für fortnitenexus.space, die User so tief in die Seite zieht, dass sie 10+ Seiten pro Session besuchen.

---

# [1] VOLLSTÄNDIGE SITE-MAP

## Baumstruktur (3 Ebenen tief, 80+ URLs)

```
/ (Startseite)
  Page-Type: Landing Page
  Primäres Keyword: fortnite deutsch
  PageRank: 5

/meta/ (Hub)
  Page-Type: Hub Page
  Primäres Keyword: fortnite meta
  PageRank: 5
  /meta/waffen/ (Hub)
    Page-Type: Hub Page
    Primäres Keyword: fortnite weapons
    PageRank: 4
    /meta/waffen/assault-rifles/ (Guide)
      Page-Type: Guide
      Primäres Keyword: fortnite assault rifles
      PageRank: 3
    /meta/waffen/shotguns/ (Guide)
      Page-Type: Guide
      Primäres Keyword: fortnite shotguns
      PageRank: 3
    /meta/waffen/smg/ (Guide)
      Page-Type: Guide
      Primäres Keyword: fortnite smg
      PageRank: 3
    /meta/waffen/sniper/ (Guide)
      Page-Type: Guide
      Primäres Keyword: fortnite sniper
      PageRank: 3
    /meta/waffen/explosive/ (Guide)
      Page-Type: Guide
      Primäres Keyword: fortnite explosive
      PageRank: 3
    /meta/waffen/chapter-6-season-2/ (Guide)
      Page-Type: Guide
      Primäres Keyword: fortnite chapter 6 season 2 weapons
      PageRank: 3
    /meta/waffen/best-loadouts/ (Guide)
      Page-Type: Guide
      Primäres Keyword: fortnite best loadouts
      PageRank: 4
    /meta/waffen/weapon-stats/ (Tool)
      Page-Type: Tool
      Primäres Keyword: fortnite weapon stats
      PageRank: 3
  /meta/karten/ (Hub)
    Page-Type: Hub Page
    Primäres Keyword: fortnite maps
    PageRank: 4
    /meta/karten/chapter-6-season-2/ (Guide)
      Page-Type: Guide
      Primäres Keyword: fortnite chapter 6 season 2 map
      PageRank: 4
    /meta/karten/beste-landezonen/ (Guide)
      Page-Type: Guide
      Primäres Keyword: fortnite best landing spots
      PageRank: 3
    /meta/karten/chest-spawn-rates/ (Guide)
      Page-Type: Guide
      Primäres Keyword: fortnite chest spawn rates
      PageRank: 3
    /meta/karten/poi-locations/ (Guide)
      Page-Type: Guide
      Primäres Keyword: fortnite poi locations
      PageRank: 3
    /meta/karten/named-landmarks/ (Guide)
      Page-Type: Guide
      Primäres Keyword: fortnite named landmarks
      PageRank: 3
    /meta/karten/rotation-tracker/ (Tool)
      Page-Type: Tool
      Primäres Keyword: fortnite map rotation
      PageRank: 3
    /meta/karten/vehicle-spawns/ (Guide)
      Page-Type: Guide
      Primäres Keyword: fortnite vehicle spawns
      PageRank: 2
    /meta/karten/hiding-spots/ (Guide)
      Page-Type: Guide
      Primäres Keyword: fortnite hiding spots
      PageRank: 2

/guides/ (Hub)
  Page-Type: Hub Page
  Primäres Keyword: fortnite guide
  PageRank: 5
  /guides/fortnite-ultimate-guide-2026/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite guide 2026
    PageRank: 5
  /guides/fortnite-aim-verbessern-2026/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite aim verbessern
    PageRank: 4
  /guides/fortnite-building-guide/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite building guide
    PageRank: 4
  /guides/fortnite-best-settings-2026/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite best settings
    PageRank: 4
  /guides/fortnite-weapon-tier-list/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite weapon tier list
    PageRank: 4
  /guides/fortnite-ranked-tipps/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite ranked tips
    PageRank: 4
  /guides/fortnite-meta-strategie/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite meta strategy
    PageRank: 4
  /guides/fortnite-sensitivity-calculator/ (Tool)
    Page-Type: Tool
    Primäres Keyword: fortnite sensitivity calculator
    PageRank: 3
  /guides/fortnite-keybinds-pro/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite keybinds pro
    PageRank: 3

/ranked/ (Hub)
  Page-Type: Hub Page
  Primäres Keyword: fortnite ranked
  PageRank: 4
  /ranked/tipps/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite ranked tips
    PageRank: 3
  /ranked/strategie/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite ranked strategy
    PageRank: 3
  /ranked/zone-wars/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite zone wars
    PageRank: 3
  /ranked/loadouts/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite ranked loadouts
    PageRank: 3
  /ranked/point-system/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite ranked points
    PageRank: 2
  /ranked/arena-mode/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite arena mode
    PageRank: 2
  /ranked/pro-tips/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite pro tips
    PageRank: 3
  /ranked/elo-calculator/ (Tool)
    Page-Type: Tool
    Primäres Keyword: fortnite elo calculator
    PageRank: 2

/einstellungen/ (Hub)
  Page-Type: Hub Page
  Primäres Keyword: fortnite settings
  PageRank: 4
  /einstellungen/pc/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite pc settings
    PageRank: 3
  /einstellungen/controller/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite controller settings
    PageRank: 3
  /einstellungen/mobile/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite mobile settings
    PageRank: 3
  /einstellungen/nintendo-switch/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite nintendo switch settings
    PageRank: 2
  /einstellungen/ps5/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite ps5 settings
    PageRank: 2
  /einstellungen/xbox-series-x/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite xbox series x settings
    PageRank: 2
  /einstellungen/sensitivity/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite sensitivity
    PageRank: 3
  /einstellungen/graphics/ (Guide)
    Page-Type: Guide
    Primäres Keyword: fortnite graphics settings
    PageRank: 3

/news/ (Hub)
  Page-Type: Hub Page
  Primäres Keyword: fortnite news
  PageRank: 5
  /news/patch-notes/ (News Hub)
    Page-Type: News Hub
    Primäres Keyword: fortnite patch notes
    PageRank: 4
  /news/item-shop/ (News Hub)
    Page-Type: News Hub
    Primäres Keyword: fortnite item shop
    PageRank: 4
  /news/events/ (News Hub)
    Page-Type: News Hub
    Primäres Keyword: fortnite events
    PageRank: 3
  /news/leaks/ (News Hub)
    Page-Type: News Hub
    Primäres Keyword: fortnite leaks
    PageRank: 3
  /news/competitive/ (News Hub)
    Page-Type: News Hub
    Primäres Keyword: fortnite competitive
    PageRank: 3
  /news/creator-updates/ (News Hub)
    Page-Type: News Hub
    Primäres Keyword: fortnite creator updates
    PageRank: 2
  /news/meta-changes/ (News Hub)
    Page-Type: News Hub
    Primäres Keyword: fortnite meta changes
    PageRank: 3
  /news/server-status/ (Tool)
    Page-Type: Tool
    Primäres Keyword: fortnite server status
    PageRank: 2

/tools/ (Hub)
  Page-Type: Hub Page
  Primäres Keyword: fortnite tools
  PageRank: 4
  /tools/waffen-datenbank/ (Tool)
    Page-Type: Tool
    Primäres Keyword: fortnite weapon database
    PageRank: 4
  /tools/loadout-builder/ (Tool)
    Page-Type: Tool
    Primäres Keyword: fortnite loadout builder
    PageRank: 3
  /tools/sensitivity-calculator/ (Tool)
    Page-Type: Tool
    Primäres Keyword: fortnite sensitivity calculator
    PageRank: 3
  /tools/map-tracker/ (Tool)
    Page-Type: Tool
    Primäres Keyword: fortnite map tracker
    PageRank: 3
  /tools/stats-checker/ (Tool)
    Page-Type: Tool
    Primäres Keyword: fortnite stats checker
    PageRank: 3
  /tools/item-shop-tracker/ (Tool)
    Page-Type: Tool
    Primäres Keyword: fortnite item shop tracker
    PageRank: 4

/community/ (Hub)
  Page-Type: Hub Page
  Primäres Keyword: fortnite community
  PageRank: 3
  /community/discord/ (External)
    Page-Type: External Link
    Primäres Keyword: fortnite discord
    PageRank: 2
  /community/lfg/ (Tool)
    Page-Type: Tool
    Primäres Keyword: fortnite lfg
    PageRank: 2
  /community/creators/ (Hub)
    Page-Type: Hub Page
    Primäres Keyword: fortnite creators
    PageRank: 2

/about/ (Static)
  Page-Type: Static Page
  Primäres Keyword: -
  PageRank: 1

/privacy/ (Static)
  Page-Type: Static Page
  Primäres Keyword: -
  PageRank: 1

/impressum/ (Static)
  Page-Type: Static Page
  Primäres Keyword: -
  PageRank: 1
```

---

# [2] NAVIGATION-DESIGN

## Hauptmenü-Struktur (max. 6 Items)

**Desktop Navigation:**
1. **Guides** – Dropdown mit allen Guide-Kategorien
2. **Meta** – Waffen, Karten, Ranked
3. **Tools** – Interaktive Tools
4. **News** – Patch Notes, Item Shop, Events
5. **Ranked** – Ranked-Tipps und Strategien
6. **Community** – Discord, LFG, Creators

**Warum diese Struktur:**
- Guides ist der primäre Entry-Point für neue User
- Meta ist für fortgeschrittene Spieler (wächst mit Popularität)
- Tools erhöhen Engagement und Verweildauer
- News sorgt für wiederkehrende Besucher
- Ranked spricht Competitive-Spieler an
- Community baut Loyalität auf

## Mega-Dropdown-Inhalte pro Menüpunkt

### Guides Dropdown
```
Guides
├─ Aim Guide
├─ Building Guide
├─ Best Settings 2026
├─ Weapon Tier List
├─ Ranked Tips
└─ Meta Strategie
```

### Meta Dropdown
```
Meta
├─ Waffen
│  ├─ Assault Rifles
│  ├─ Shotguns
│  ├─ SMG
│  ├─ Sniper
│  └─ Best Loadouts
├─ Karten
│  ├─ Chapter 6 Season 2
│  ├─ Beste Landezonen
│  └─ POI Locations
└─ Ranked
   ├─ Tipps
   ├─ Strategie
   └─ Zone Wars
```

### Tools Dropdown
```
Tools
├─ Waffen-Datenbank
├─ Loadout Builder
├─ Sensitivity Calculator
├─ Map Tracker
├─ Stats Checker
└─ Item Shop Tracker
```

## Mobile-Navigation-Konzept

**Mobile Navigation (Hamburger Menu):**
- Bottom Navigation Bar (wie Instagram/TikTok)
- 5 Icons: Home, Guides, Meta, Tools, Profile
- Swipe-Gestures für schnelle Navigation
- Search-Button prominent oben rechts

**Bottom Navigation Bar Items:**
1. **Home** – Startseite
2. **Guides** – Guide-Kategorien
3. **Meta** – Meta-Hub
4. **Tools** – Interaktive Tools
5. **Profile** – User-Profile (wenn eingeloggt)

**Warum Bottom Navigation:**
- Fortnite-Spieler sind 70% mobil
- Thumb-reachable für einhändige Nutzung
- Bekanntes Pattern aus Social Apps
- Maximale Accessibility

## "Sticky-Elemente" die immer sichtbar bleiben

1. **Sticky Header** – Logo, Navigation, Search
2. **Sticky SAC-Reminder** – Creator Code Erinnerung (nach 30s)
3. **Sticky CTA** – "Guide lesen" Button (nach Scroll)
4. **Sticky Table of Contents** – Inhaltsverzeichnis (bei Guides)
5. **Sticky Related Content** – Verwandte Artikel (am Ende)

---

# [3] HOMEPAGE-WIREFRAME (Text-basiert)

## Hero Section (Above Fold)

**Headline:**
"Fortnite Nexus – Die ultimative deutsche Fortnite Community 2026"

**Sub-Headline:**
"Guides, Meta, Tools und News – Alles für Fortnite Spieler auf Deutsch. Von Anfänger bis Pro."

**CTA-Buttons:**
- Primary: "Guides lesen" → /guides/
- Secondary: "Tools testen" → /tools/
- Tertiary: "News lesen" → /news/

**Hero-Visual:**
- Fortnite-spezifisches Hero-Image (Map oder Waffen)
- Overlay mit SAC-Code: "Nutze Creator Code: nexus"

## "Frisch gepatch" Widget

**Position:** Direkt unter Hero

**Content:**
```
🚨 PATCH ALERT
Chapter 6 Season 2 Patch Notes sind da!

[Button: Patch Notes lesen]
[Button: Meta-Shift ansehen]

Letzter Update: vor 2 Stunden
```

**Funktionalität:**
- Zeigt neuesten Patch/News
- Auto-Update alle 5 Minuten
- Klickbare Cards

## Trending Guides

**Position:** Mitte der Seite

**Sortierungslogik:**
1. Meiste Views in den letzten 7 Tagen
2. Höchste Engagement-Rate
3. Neuheit (neue Guides bevorzugt)

**Anzeige:**
- 6 Cards in Grid-Layout (3 Spalten Desktop, 2 Spalten Tablet, 1 Spalte Mobile)
- Jede Card: Thumbnail, Titel, Excerpt, Views, "Lesen" Button

## Stats-Teaser

**Position:** Unter Trending Guides

**Zahl die am meisten konvertiert:**
"12.500+ Fortnite Spieler nutzen unsere Guides每周"

**Zusätzliche Stats:**
- "27 Guides veröffentlicht"
- "8 News-Artikel pro Woche"
- "10+ Interaktive Tools"
- "4.9/5 User-Bewertung"

**CTA:**
"Community beitreten" → /community/discord

## Newsletter-Block

**Position:** Vor Footer

**Lead-Magnet:**
"Wöchentliche Meta-Updates & Patch-Alerts direkt in dein Email-Postfach"

**Form:**
- Email Input
- "Abonnieren" Button
- SAC-Code Erinnerung Checkbox

**Incentive:**
"Exklusive Tipps nur für Newsletter-Abonnenten"

## Footer-Architektur

**Struktur:**
```
Footer
├─ Spalte 1: Fortnite Nexus
│  ├─ Über uns
│  ├─ Kontakt
│  └─ Karriere
├─ Spalte 2: Guides
│  ├─ Aim Guide
│  ├─ Building Guide
│  └─ Settings
├─ Spalte 3: Meta
│  ├─ Waffen
│  ├─ Karten
│  └─ Ranked
├─ Spalte 4: Tools
│  ├─ Waffen-Datenbank
│  ├─ Loadout Builder
│  └─ Stats Checker
├─ Spalte 5: Legal
│  ├─ Datenschutz
│  ├─ Impressum
│  └─ AGB
└─ Spalte 6: Social
   ├─ Discord
   ├─ Twitter
   ├─ YouTube
   └─ TikTok
```

---

# [4] ARTICLE-PAGE-TEMPLATE

## Sidebar-Inhalte (Desktop)

**Position:** Rechts vom Content

**Inhalte:**
1. **SAC-Reminder** – Creator Code Erinnerung (sticky)
2. **Table of Contents** – Inhaltsverzeichnis (sticky)
3. **Related Guides** – 3 verwandte Guides
4. **Trending Tools** – 3 beliebte Tools
5. **Newsletter Signup** – Email-Form
6. **Social Share** – Twitter, Discord, Reddit

## In-Content-Module

**Nach Paragraph 3:**
- Featured Snippet Block (FAQ-Format)
- SAC-Code Erinnerung (compact)

**Nach Paragraph 7:**
- Related Content Card (verwandter Guide)
- Tool Integration (z.B. Sensitivity Calculator)

**Nach Paragraph 12:**
- Newsletter Signup
- Discord CTA

**Nach Paragraph 18:**
- Related Articles
- Community CTA

## "Related Content" Algorithmus-Logik

**Algorithmus:**
1. **Same Category** – Guides aus derselben Kategorie
2. **Same Tags** – Guides mit gleichen Tags
3. **Popular** – Meistgelesene Guides
4. **Recent** – Neueste Guides
5. **User Behavior** – Basierend auf User-Historie

**Gewichtung:**
- Same Category: 40%
- Same Tags: 30%
- Popular: 15%
- Recent: 10%
- User Behavior: 5%

## Exit-Intent Mechanik

**Trigger:**
- User bewegt Maus zum Tab-Schließen
- Mobile: User scrollt nach oben schnell

**Modal:**
```
🎮 Willst du besser in Fortnite werden?

Unsere Guides haben 12.500+ Spielern geholfen:

- Aim Guide → +25% Accuracy
- Building Guide → +40% Win Rate
- Settings Guide → +30% FPS

[Button: Guides lesen]
[Link: Nein danke]
```

**Cookie:**
- Zeigt nur einmal pro Session
- Dismiss für 7 Tage

---

# [5] CONVERSION-FUNNEL

## Schritt-für-Schritt: Besuch → Stammleser

### Schritt 1: Besuch → Email
**Maßnahme:** Newsletter Signup nach 30 Sekunden
**Trigger:** Time-based (30s on page)
**Timing:** Nach erstem Guide gelesen

### Schritt 2: Email → Discord
**Maßnahme:** Discord Einladung in Welcome-Email
**Trigger:** Email bestätigt
**Timing:** Sofort nach Signup

### Schritt 3: Discord → wiederkehrender User
**Maßnahme:** Wöchentliche Discord-Events & Tipps
**Trigger:** Discord Membership
**Timing:** Wöchentlich

### Schritt 4: wiederkehrender User → Community-Mitglied
**Maßnahme:** Exclusive Content für Discord-Mitglieder
**Trigger:** 3+ Discord Besuche
**Timing:** Nach 1 Woche

## Detaillierte Funnel-Steps

**Besuch → Email:**
- Modal-Popup nach 30s
- Lead-Magnet: "Wöchentliche Meta-Updates"
- SAC-Code Erinnerung im Welcome-Email

**Email → Discord:**
- Welcome-Email mit Discord-Link
- Discord-Exclusive: "Early Access zu Guides"
- CTA: "Community beitreten"

**Discord → wiederkehrender User:**
- Wöchentliche Events: "Meta-Review"
- Tipps & Tricks Channel
- Pro-Player AMA

**wiederkehrender User → Community-Mitglied:**
- Exclusive Badge auf Website
- Priority Support
- Beta-Access zu neuen Features

---

*Last Updated: April 28, 2026*
