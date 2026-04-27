# 🛍️ Fortnite Nexus – Digital Products

**Komplette Produktpalette für den Shop**

Stand: April 2026 · Alle 5 Produkte fertig & ZIP-gebaut

---

## 📦 Übersicht

| ID | Produkt | Preis | Format | Auslieferung | Status |
|---|---|---|---|---|---|
| `pro-settings-pack` | Pro Settings Pack v2.1 | **€9.99** | ZIP-Bundle | Sofort-Download | ✅ Ready |
| `fortnite-checklist` | Season Checklist | **€4.99** | ZIP + Notion | Sofort-Download | ✅ Ready |
| `creator-setup-guide` | Creator Setup Guide | **€19.99** | ZIP + Video-Links | Sofort-Download | ✅ Ready |
| `vod-review` | 1-on-1 VOD Review | **€29.99** | Service | Manual 24-48h | ✅ Ready |
| `weekly-meta-report` | Weekly Meta Report | **€7.99/Monat** | Email-Subscription | Wöchentlich | ✅ Ready |

---

## 📁 Produkt-Verzeichnisse

```
products/
├── pro-settings-pack/        # 240 FPS Settings + Windows Tweaks
│   ├── GameUserSettings.ini
│   ├── GameUserSettings.Performance.ini
│   ├── Engine.ini
│   ├── Windows-Optimization-Guide.md  (12 Seiten)
│   ├── NVIDIA-Control-Panel-Setup.md
│   ├── Sensitivity-Calculator.html
│   ├── Walkthrough-Video-Script.md
│   ├── README.md
│   ├── CHANGELOG.md
│   └── build.ps1
│
├── season-checklist/         # Battle Pass Tracker
│   ├── Season-Checklist.md
│   ├── XP-Optimization-Guide.md
│   ├── Secret-Missions-Map.md
│   ├── Notion-Template-Link.txt
│   ├── Weekly-Quest-Tracker.csv
│   └── build.ps1
│
├── creator-setup-guide/      # Streaming-Setup-Guide
│   ├── Creator-Setup-Guide.md  (45 Seiten)
│   ├── Monetarisierung-Strategien.md
│   ├── OBS-Profile/basic.ini
│   ├── OBS-Scene-Collection.json
│   ├── Content-Calendar.csv
│   └── build.ps1
│
├── vod-review/               # Personalisierte Analyse
│   ├── VOD-Review-Service.md
│   ├── Briefing-Fragebogen.md
│   └── build.ps1
│
├── weekly-meta-report/       # Wöchentlicher Email-Report
│   ├── Sample-Issue-001.md
│   ├── Subscription-Welcome.md
│   ├── Email-Template.html
│   └── build.ps1
│
├── dist/                     # Generierte ZIP-Files (von build.ps1)
│   ├── Fortnite-Nexus-Pro-Settings-Pack-v2.1.0.zip
│   ├── Fortnite-Nexus-Season-Checklist-S2.1.zip
│   ├── Fortnite-Nexus-Creator-Setup-Guide-v1.0.zip
│   ├── Fortnite-Nexus-VOD-Review-Service-v1.0.zip
│   └── Fortnite-Nexus-Weekly-Meta-Report-Welcome-Pack-v1.0.zip
│
├── build-all.ps1             # Master-Build-Script
└── README.md                 # Dieses File
```

---

## 🚀 Build-Anleitung

### Alle Produkte gleichzeitig bauen

```powershell
# Schneller Build (ohne PDF-Generation)
.\products\build-all.ps1 -SkipPDF

# Mit PDFs (benötigt pandoc + LaTeX)
.\products\build-all.ps1
```

### Einzelnes Produkt bauen

```powershell
# Pro Settings Pack
.\products\pro-settings-pack\build.ps1 -SkipPDF

# Season Checklist
.\products\season-checklist\build.ps1 -SkipPDF

# usw.
```

### PDF-Generation aktivieren

1. Pandoc installieren: [pandoc.org/installing.html](https://pandoc.org/installing.html)
2. LaTeX (MiKTeX) installieren: [miktex.org/download](https://miktex.org/download)
3. Build ohne `-SkipPDF` Flag laufen lassen

> **Hinweis:** PDF-Generation kann fehlschlagen wenn LaTeX-Pakete fehlen. Markdown-Files sind dann die Fallback-Lieferung.

---

## 📊 Produkt-Inhalte (Detailliert)

### 1. Pro Settings Pack (€9.99)

**Was:** 240+ FPS Setup für Fortnite

**Inhalt:**
- Real GameUserSettings.ini (mit allen Pro-Settings)
- Engine.ini Optimierungen
- 12-Seiten Windows-Optimization-Guide
- NVIDIA Control Panel Setup-Guide
- Interaktiver Sensitivity-Calculator (HTML)
- 15-Min Walkthrough-Video-Script
- Lifetime Updates jede Season

**Zielgruppe:** Spieler mit Mid-High-End Hardware die mehr FPS wollen

### 2. Season Checklist (€4.99)

**Was:** Komplett-Tracker für Battle Pass

**Inhalt:**
- Alle 200 Battle Pass Tiers
- 4 Secret-Missions mit Lokationen
- XP-Optimization-Guide
- Weekly Quest Tracker (CSV)
- Notion-Template-Link
- Lifetime Updates jede Season

**Zielgruppe:** Casual + Engaged Spieler die jede Season grinden wollen

### 3. Creator Setup Guide (€19.99)

**Was:** Vom Zocker zum Streamer

**Inhalt:**
- 45-Seiten Hauptguide
- OBS-Profile (importierbar)
- OBS Scene-Collection (importierbar)
- Monetarisierung-Strategien-Guide
- Content-Calendar (CSV)
- 10 Video-Module (3h via private YouTube-Links)
- Lifetime Updates

**Zielgruppe:** Aspiring Streamers, Content-Creator

### 4. 1-on-1 VOD Review (€29.99)

**Was:** Personalisierte Gameplay-Analyse

**Inhalt:**
- 30-45 Min personalisiertes Review-Video
- PDF mit Action-Items (5-8 Seiten)
- 14-Tage Trainings-Plan
- 7-Tage Discord-Coaching-Q&A
- Manuelle Lieferung 24-48h

**Zielgruppe:** Spieler die ernsthaft besser werden wollen

### 5. Weekly Meta Report (€7.99/Monat)

**Was:** Wöchentlicher Pro-Report

**Inhalt:**
- Wöchentlicher Email-Report (Dienstag 18:00)
- Discord Premium-Channels
- Archiv aller Issues
- Early-Access Patches & Leaks
- Monthly Q&A mit TimoZyztm

**Zielgruppe:** Competitive Spieler, Tournament-Players

---

## 🔄 Update-Workflow (für Maintainer)

### Bei neuer Fortnite-Season (alle 3 Monate)

1. Pro Settings Pack:
   - GameUserSettings.ini aktualisieren mit neuen Defaults
   - Windows-Guide-Versions-Hinweise updaten
   - Sensitivity-Calculator: neue Pro-Presets
   - CHANGELOG.md: neue Version-Entry
   - Build neu

2. Season Checklist:
   - Alle Inhalte komplett neu
   - Battle Pass Tiers + Secret Missions
   - Weekly-Quest-Tracker.csv
   - Build neu

3. Creator Setup Guide:
   - OBS-Version prüfen, ggf. Profile aktualisieren
   - Affiliate-Programme aktualisieren
   - Build neu

### Bei OBS-Update / NVIDIA-Treiber

- Creator Setup Guide: OBS-Profile-Settings prüfen
- Pro Settings Pack: NVIDIA-Treiber-Empfehlung updaten

### Bei Stripe / Plattform-Änderung

- Email-Templates aktualisieren
- README in jedem Produkt: Support-Email/Discord prüfen

---

## 📤 Deployment-Workflow

### Schritt 1: ZIPs zu Supabase

1. Supabase Dashboard → Storage
2. Bucket `products` (RLS: Service Role only)
3. Upload alle ZIPs aus `products/dist/`

### Schritt 2: file_path in DB setzen

```sql
UPDATE products SET file_path = 'pro-settings-pack-v2.1.zip' WHERE id = 'pro-settings-pack';
UPDATE products SET file_path = 'season-checklist-s2.1.zip' WHERE id = 'fortnite-checklist';
UPDATE products SET file_path = 'creator-setup-guide-v1.0.zip' WHERE id = 'creator-setup-guide';
UPDATE products SET file_path = 'vod-review-v1.0.zip' WHERE id = 'vod-review';
UPDATE products SET file_path = 'weekly-meta-welcome-v1.0.zip' WHERE id = 'weekly-meta-report';
```

### Schritt 3: Stripe-Produkte

1. Stripe Dashboard → Produkte
2. Für jedes Produkt:
   - Name + Beschreibung
   - Bild (Hero-Image)
   - Preis (€-Beträge in Cents!)
   - Tax Behavior: Inclusive (EU)
3. Copy Price IDs

### Schritt 4: Stripe-Price-IDs in Supabase

```sql
UPDATE products SET stripe_price_id = 'price_xxxxx' WHERE id = 'pro-settings-pack';
-- etc.
```

### Schritt 5: Stripe Webhook konfigurieren

- Webhook URL: `https://fortnitenexus.com/.netlify/functions/stripe-webhook`
- Events: `checkout.session.completed`, `invoice.paid`, etc.
- Webhook-Secret in Netlify Env Vars

### Schritt 6: Test-Kauf

- Stripe Test-Mode: Karte `4242 4242 4242 4242`
- Email + Download-Link prüfen
- Order in Supabase prüfen

---

## 📈 Verkaufs-Projektion (konservativ)

### Monat 1 (Launch)

| Produkt | Verkäufe | Umsatz |
|---|---|---|
| Pro Settings Pack | 30 × €9.99 | €299 |
| Season Checklist | 50 × €4.99 | €249 |
| Creator Setup Guide | 5 × €19.99 | €99 |
| VOD Review | 8 × €29.99 | €239 |
| Weekly Meta Report | 20 × €7.99 | €159 |
| **TOTAL** | – | **€1.045** |

### Monat 6 (Bei 50K monatlichen Visitors)

| Produkt | Verkäufe | Umsatz |
|---|---|---|
| Pro Settings Pack | 200 × €9.99 | €1.998 |
| Season Checklist | 300 × €4.99 | €1.497 |
| Creator Setup Guide | 30 × €19.99 | €599 |
| VOD Review | 25 × €29.99 | €749 |
| Weekly Meta Report | 100 × €7.99 | €799 |
| **TOTAL** | – | **€5.642** |

> **Conversion-Rate Annahme:** 0.5% (Industry-Standard für Digital Goods)

---

## 🎯 Marketing-Vorbereitung

### Hero-Images für Shop (TODO)

Brauche noch:
- [ ] Pro Settings Pack Hero (1280x720)
- [ ] Season Checklist Hero
- [ ] Creator Setup Guide Hero
- [ ] VOD Review Hero
- [ ] Weekly Meta Report Hero

### Social Media Posts (TODO)

- [ ] Twitter/X Launch-Tweets (5 Stück)
- [ ] TikTok Launch-Videos (Vertical, 30-60s)
- [ ] Discord-Announcement
- [ ] Email-Newsletter an Community

### SEO

- [ ] Product-Pages SEO-Optimization (Meta-Tags, Schema)
- [ ] Blog-Posts: "Wie ich 240 FPS in Fortnite bekommen habe"
- [ ] YouTube-Videos: Pro-Settings-Walkthrough

---

## 📞 Kontakt

- 📧 **Support:** support@fortnitenexus.com
- 💬 **Discord:** [discord.gg/fortnitenexus](https://discord.gg/fortnitenexus)
- 🌐 **Web:** [fortnitenexus.com](https://fortnitenexus.com)

---

**Fortnite Nexus Digital Products v1.0**
© 2026 Fortnite Nexus.

**Code `ZYZTM` 💜**
