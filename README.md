# Fortnite Nexus — Die Nr. 1 Fortnite-Kommandozentrale auf Deutsch

Eine statische Website für fortnitenexus.space mit Content-Integration-System und automatisierter Content-Produktion.

## 🚀 Features

- **NEXUS IQ** — Fortnite Battle DNA Scanner (5 Fragen → personalisiertes Spielerprofil)
- **Loadout God** — Der schnellste Fortnite-Loadout-Builder der Welt
- **Creator Hub** — Die besten deutschen Fortnite-Creator an einem Ort
- **Classic** — Guides, Meta-Updates, Patch-Notes
- **Shared Foundation** — Einheitliches Design-System für alle Seiten
- **Content Integration** — JSON-basiertes Data-Layer System

## 📁 Projektstruktur

```
fortnitenexus.space/
├── apps/web/public/
│   ├── index.html (Homepage)
│   ├── nexus-iq.html (NEXUS IQ Seite)
│   ├── loadout-god.html (Loadout God Seite)
│   ├── creators.html (Creator Hub)
│   ├── classic.html (Guides & Meta)
│   ├── shared.css (Global Design System)
│   ├── shared.js (Global Routing & Interactions)
│   ├── data-loader.js (JSON Data Loader)
│   └── data/
│       ├── meta.json (Waffen-Meta & Tier-Listen)
│       ├── news.json (Patch-Updates & News-Artikel)
│       ├── creators.json (Creator-Daten)
│       └── profiles.json (NEXUS IQ Profil-Typen)
├── AGENTS.md (Global Agent Instructions)
├── CONTENT_AGENTS.md (Content Production Agents)
└── README.md
```

## 🎨 Design-System

- **Farben:**
  - `--bg: #050510` (Hintergrund)
  - `--cyan: #00d4ff` (Akzent)
  - `--orange: #ff6b00` (Sekundär)
  - `--gold: #ffc300` (Tertiary)
- **Typography:**
  - Orbitron (Headlines)
  - Exo 2 (Body)
- **Spacing-Skala:** `--space-xs` bis `--space-2xl`
- **Utility-Klassen:** `.btn-primary`, `.btn-secondary`, `.btn-gold`, `.card`

## 🔄 Content-Workflow

### GitHub Workflow

1. Agent-Prompt feuern → JSON/HTML Output erhalten
2. Output in richtige `/data/` Datei kopieren
3. HTML-Datei erstellen/aktualisieren
4. Commit: `git add . && git commit -m "Update: {Agent-Name}"`
5. Push: `git push`
6. Netlify/Vercel deployt automatisch in 30 Sekunden

### Content-Agents

Siehe `CONTENT_AGENTS.md` für 10 strukturierte Content-Production-Agents:

1. **Patch Analyst** — Patch-Notes Analyse
2. **Tier List Updater** — Waffen-Tier-Listen aktualisieren
3. **Guide Generator** — SEO-optimierte Guides erstellen
4. **Meta Analyst** — Meta-Shift Analysen
5. **Creator Spotlight** — Creator Spotlight-Artikel
6. **News Curator** — Fortnite-News kuratieren
7. **Loadout Recommender** — Loadout-Empfehlungen
8. **NEXUS IQ Profile Generator** — Profil-Typen generieren
9. **Social Media Poster** — Social-Media-Posts erstellen
10. **Newsletter Curator** — Wöchentlichen Newsletter kuratieren

## 📊 Data-Layer System

### JSON-Dateien

- **meta.json** — Waffen-Daten, Stats, Tier-Listen
- **news.json** — Patch-Updates, News-Artikel
- **creators.json** — Creator-Daten, Plattform-Links
- **profiles.json** — NEXUS IQ Profil-Typen

### Data Loader

```javascript
// In jeder Seite importieren:
<script src="/data-loader.js"></script>

// Funktionen nutzen:
const meta = await loadMeta();
const news = await loadNews();
const creators = await loadCreators();
const profiles = await loadProfiles();
```

## 🚀 Deployment

### Static Hosting

- **Netlify:** Empfohlen für automatische Deployments
- **Vercel:** Alternative für GitHub-Integration
- **GitHub Pages:** Kostenlos für statische Sites

### Build-Konfiguration

Kein Build-Step erforderlich — reine HTML/CSS/JS.

## 🛠️ Entwicklung

### Lokale Entwicklung

1. Repository klonen
2. Lokalen Server starten (z.B. `python -m http.server` oder `npx serve`)
3. Browser öffnen auf `http://localhost:8000`

### Shared Foundation nutzen

Jede Seite muss diese zwei Tags im `<head>` haben:

```html
<link rel="stylesheet" href="/shared.css">
<script src="/shared.js" defer></script>
```

## 📈 SEO-Optimierung

Jede Seite muss beinhalten:
- Meta title (60 chars max)
- Meta description (160 chars max)
- Canonical URL
- Open Graph tags
- Twitter Card tags
- Schema.org markup (JSON-LD)
- H1 tag (exakt einer)
- Semantisches HTML
- Alt-Text für alle Bilder

## 🤖 Agent Instructions

- **AGENTS.md** — Globale Agent-Instruktionen für Projekt-Monetarisierung
- **CONTENT_AGENTS.md** — Content-Production-Agents für automatisierte Content-Erstellung

## 📄 Lizenz

© 2026 Fortnite Nexus. Alle Rechte vorbehalten.

Nicht mit Epic Games verbunden.

---

*Last Updated: April 29, 2026*
*Version: 1.0 - Content Integration System*