# AGENTS.md — FORTNITE NEXUS KOMMANDO-ZENTRALE
> Dieses Dokument ist die einzige Wahrheit für jeden AI-Agent der in diesem Repo arbeitet.
> Lies es vollständig bevor du eine einzige Zeile Code schreibst.

---

## 1. MISSION

Fortnite Nexus (`fortnitenexus.space`) ist die **Nr. 1 Pro-Tool-Suite für deutschsprachige Fortnite-Spieler** in Deutschland, Österreich und der Schweiz.

Wir sind **kein** News-Blog. Wir sind **keine** Community. Wir sind **kein** YouTube-Kanal.  
Wir bauen **Werkzeuge** die Spielern helfen besser zu werden — präzise, sofort, auf Deutsch.

---

## 2. ABSOLUT-REGELN — NIEMALS BRECHEN

### Brand
- Creator-Code ist **`nexus`** (Fallback: `fnexus` wenn bei Epic vergeben)
- Das Wort `zyztm` oder `ZYZTM` existiert in diesem Repo **nicht mehr**
- Wenn du es irgendwo siehst: sofort ersetzen durch `nexus` 
- Projektname: **Fortnite Nexus** — nicht "FNexus", nicht "FortniteNexus", nicht "Nexus Space"

### Code-Qualität
- **Kein Mock-Data** in Production-Code — jede Funktion liefert echte Ergebnisse
- **Kein `// TODO`** committen — entweder fertig bauen oder Issue erstellen
- **Kein `any`** in TypeScript — vollständige Typen, immer
- **Kein `console.log`** in Production — nur `console.error` für echte Fehler
- **Keine Placeholder-UI** — kein "Coming Soon", kein "Demnächst verfügbar"
- **Kein Fake-Social-Proof** — keine erfundenen Zahlen, keine fake Reviews

### Gelöschte Komponenten — nie wieder hinzufügen
Diese Komponenten wurden absichtlich entfernt und kommen nicht zurück:
`AffiliateSection`, `KickEmbed`, `SoundboardDemo`, `GamerVoting`, `BackgroundMusic`, `FanCounter` 

### Monetarisierung
- **Kein Affiliate-Marketing** (keine Razer/NordVPN/Kinguin-Links)
- **Kein Discord** als primärer Traffic-Kanal
- **Kein Social-Media-Posting** als Wachstumsstrategie
- Revenue ausschließlich über: Stripe Subscriptions + Digitale Produkte + Coaching
- Creator-Code `nexus` dezent im Footer — niemals in Hero oder als Pop-up

### Traffic
- **100% organischer SEO-Traffic** — kein Paid Ads, kein Influencer-Deal
- Jede neue Seite braucht: H1, Meta-Title (≤60 Zeichen), Meta-Description (≤160 Zeichen), Canonical-URL, Schema.org Markup
- Sprache: **Deutsch First** — alle User-facing Texte auf Deutsch
- URL-Struktur: `/tools/[tool-name]`, `/waffen/[slug]`, `/pros/[slug]-settings`, `/karte/[slug]` 

---

## 3. TECH-STACK

| Layer | Technologie | Notizen |
|---|---|---|
| Frontend | React + Vite + TypeScript | Monorepo via pnpm-workspaces + Turbo |
| Styling | TailwindCSS + shared.css | Tokens: `--bg:#050510`, `--cyan:#00d4ff`, `--orange:#ff6b00`, `--gold:#ffc300` |
| Fonts | Orbitron (Headlines) + Exo 2 (Body) | Bereits in shared.css eingebunden |
| Routing | Wouter | Kein React Router |
| Backend | Netlify Functions (TypeScript) | Kein separater Server |
| Datenbank | Neon Postgres | Connection via `process.env.NEON_DATABASE_URL` |
| Payments | Stripe | `process.env.STRIPE_SECRET_KEY` + Webhook-Verification |
| AI | Anthropic Claude API | `process.env.ANTHROPIC_API_KEY`, Modell: `claude-sonnet-4-20250514` |
| Externe APIs | Fortnite Tracker API | `process.env.FORTNITE_TRACKER_API_KEY` — nur server-side nutzen |
| Email | Resend | `process.env.RESEND_API_KEY` |
| Analytics | Plausible | DSGVO-konform, kein Google Analytics |
| Hosting | Netlify | Auto-Deploy auf Push zu `main` |
| Testing | Playwright (E2E) + Vitest (Unit) | Jedes Tool braucht mindestens 5 E2E-Tests |

### Wichtige Umgebungsvariablen (alle in .env.example dokumentiert)
```
CREATOR_CODE=nexus
NEON_DATABASE_URL=
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_PRICE_ID=
STRIPE_ELITE_PRICE_ID=
FORTNITE_TRACKER_API_KEY=
ANTHROPIC_API_KEY=
RESEND_API_KEY=
ADMIN_SECRET=
NEXT_PUBLIC_SITE_URL=https://fortnitenexus.space
```

### Datei-Struktur (relevant für Agents)
```
fortnitenexus.space/
├── apps/web/
│   ├── src/
│   │   ├── components/
│   │   │   ├── tools/          ← Alle 8 Tool-Komponenten hier
│   │   │   ├── ui/             ← Shared UI: Button, Card, Toast, etc.
│   │   │   ├── PaywallOverlay.tsx
│   │   │   ├── CreatorCode.tsx ← Dezent, nur Footer
│   │   │   ├── SEOHead.tsx
│   │   │   └── Navbar.tsx / Footer.tsx
│   │   ├── pages/
│   │   │   ├── index.tsx       ← Homepage
│   │   │   ├── preise.tsx      ← Pricing Page
│   │   │   ├── dashboard.tsx   ← User Dashboard
│   │   │   ├── tools/          ← Eine Page pro Tool
│   │   │   ├── waffen/         ← Programmatic SEO
│   │   │   ├── pros/           ← Programmatic SEO
│   │   │   └── karte/          ← Programmatic SEO
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/
│   │   │   └── useToolLimit.ts
│   │   └── lib/
│   │       ├── loadout-engine.ts
│   │       ├── meta-predictor.ts
│   │       └── build-trainer-engine.ts
│   └── public/
│       ├── data/               ← JSON Data-Layer
│       │   ├── weapons.json
│       │   ├── drop-locations.json
│       │   ├── pro-players.json
│       │   ├── meta.json
│       │   └── news.json
│       └── images/
├── netlify/functions/          ← Alle Backend-Funktionen hier
├── sql/                        ← DB-Migrations
└── scripts/                    ← Build + Generation Scripts
```

---

## 4. SUBSCRIPTION-TIERS

| Feature | Free | Nexus Pro (€14,99/Mo) | Nexus Elite (€29,99/Mo) |
|---|---|---|---|
| Alle 8 Tools | 3x/Tag/Tool | Unlimited | Unlimited |
| AI-Coaching (Stats) | 5x/Tag | 50x/Tag | Unlimited |
| Fortschritts-Tracking | ✗ | ✓ | ✓ |
| Meta-Alerts (Email) | ✗ | ✓ | ✓ |
| Monatlicher Meta-Report | ✗ | ✓ PDF | ✓ PDF |
| Coaching-Session | ✗ | ✗ | 1x/Monat inkl. |
| Early Access neue Tools | ✗ | ✗ | ✓ |
| Ad-Free | ✗ | ✓ | ✓ |

**Tool-Limit-Logik:**
- Nicht eingeloggt: 3 Nutzungen/Tool/Tag via IP-Tracking (Neon Postgres)
- Free-User eingeloggt: 3 Nutzungen/Tool/Tag via User-ID
- Pro/Elite: kein Limit, kein Check nötig
- Limit-Reset: täglich um 00:00 UTC
- Bei Limit: `PaywallOverlay.tsx` einblenden

---

## 5. ROADMAP-QUEUE

Status-Flags: `[ ]` offen · `[~]` in Arbeit · `[x]` fertig

### Phase 1 — Foundation (Woche 1–3)
- [ ] **P1.1** Brand-Migration: `zyztm` → `nexus` repo-weit (siehe `NEXUS_10_MEGAPROMPTS.md` Prompt #1)
- [ ] **P1.2** 6 Legacy-Komponenten löschen: `AffiliateSection`, `KickEmbed`, `SoundboardDemo`, `GamerVoting`, `BackgroundMusic`, `FanCounter` 
- [ ] **P1.3** Homepage "Bombe" — full rebuild `apps/web/src/pages/index.tsx` (Prompt #10)
- [ ] **P1.4** Sensitivity Converter Pro — `apps/web/src/components/tools/SensitivityConverter.tsx` (Prompt #2)
- [ ] **P1.5** Loadout Optimizer AI — `apps/web/src/components/tools/LoadoutOptimizer.tsx` + `apps/web/src/lib/loadout-engine.ts` (Prompt #3)
- [ ] **P1.6** ToolsPage `/tools` als zentrale Landing bauen
- [ ] **P1.7** 5 Quick-Win SEO-Artikel: ping fix, crash fix, lag spikes, mobile FPS boost, Switch settings

### Phase 2 — Real-Data Integration (Woche 4–8)
- [ ] **P2.1** Stats Dashboard Pro — Fortnite-Tracker-API live (Prompt #4)
- [ ] **P2.2** Drop Location Analyzer — SVG-Map + echte Daten (Prompt #5)
- [ ] **P2.3** AI-Coaching via Claude API in Stats Dashboard
- [ ] **P2.4** Weapon Database live (Fortnite-API + auto-sync via Scheduled Function)
- [ ] **P2.5** Email-System via Resend (Welcome-Email, Meta-Alerts)
- [ ] **P2.6** Pillar Pages 1–3: Settings, News, Ultimate Guide

### Phase 3 — Premium-Layer (Woche 9–14)
- [ ] **P3.1** Auth-System: Register, Login, JWT, `/dashboard` (Prompt #7 — Teil Auth)
- [ ] **P3.2** Stripe Subscription-Flow: Free → Pro → Elite (Prompt #7 — Teil Stripe)
- [ ] **P3.3** Tool-Usage-Limiting via Neon Postgres + `useToolLimit` Hook (Prompt #7 — Teil Limits)
- [ ] **P3.4** Build Trainer Pro — Canvas 2D (Prompt #6)
- [ ] **P3.5** Meta Predictor + Patch-History-Timeline (Prompt #9)
- [ ] **P3.6** Digitale Produkte Shop (Guide PDF, Sensitivity Pack, Coaching-Buchung)
- [ ] **P3.7** Pillar Pages 4–6: Weapons, Ranked, Maps
- [ ] **P3.8** Core Web Vitals Audit: LCP <2s, CLS <0.05, Bundle <150KB

### Phase 4 — SEO-Skalierung (Woche 15–24)
- [ ] **P4.1** Programmatic SEO Engine: 200x `/waffen/[slug]` (Prompt #8)
- [ ] **P4.2** Programmatic SEO: 150x `/pros/[slug]-settings` (Prompt #8)
- [ ] **P4.3** Programmatic SEO: 150x `/sensitivity/[game1]-zu-[game2]` (Prompt #8)
- [ ] **P4.4** Programmatic SEO: 500x `/karte/[slug]` (Prompt #8)
- [ ] **P4.5** Rotation Planner Tool (nach Phase 3 als Bonus)
- [ ] **P4.6** Keybind Optimizer Tool (nach Phase 3 als Bonus)
- [ ] **P4.7** Content-Velocity: 10 Artikel/Woche (KI-generiert + human-edited)
- [ ] **P4.8** Plausible Analytics einbinden (DSGVO-konform)

---

## 6. SEO-STANDARDS (gilt für jede neue Seite)

Jede Seite die du erstellst MUSS folgendes haben:

```tsx
// In apps/web/src/components/SEOHead.tsx nutzen:
<SEOHead
  title="[Keyword-optimierter Title, ≤60 Zeichen] | Fortnite Nexus"
  description="[Spezifische Beschreibung, ≤160 Zeichen, enthält Haupt-Keyword]"
  canonical="https://fortnitenexus.space/[pfad]"
  schema={schemaOrgObject} // WebApplication, Article, oder BreadcrumbList
/>
```

**URL-Slugs:** immer lowercase, Bindestriche statt Underscores, Deutsch  
**H1:** genau einer pro Seite, enthält Haupt-Keyword  
**Interne Links:** jede Seite verlinkt mindestens auf 2 andere Seiten  
**Alt-Texte:** jedes `<img>` hat `alt=""` (beschreibend, nicht leer)  
**Schema.org Typen:**
- Tool-Seiten: `WebApplication` 
- Guide-Artikel: `Article` + `BreadcrumbList` 
- Programmatic Pages: `Article` + `BreadcrumbList` 
- Homepage: `WebSite` + `SoftwareApplication` 

---

## 7. QUALITÄTS-CHECKLISTE (vor jedem Commit)

```
[ ] pnpm run build läuft fehlerfrei durch
[ ] pnpm run typecheck — kein TypeScript-Fehler
[ ] grep -ri "zyztm" apps/ — Ergebnis ist LEER
[ ] Alle neuen Komponenten haben vollständige TypeScript-Typen
[ ] Alle neuen Netlify Functions haben Input-Validation
[ ] Alle neuen Netlify Functions haben Error-Handling (try/catch)
[ ] Alle neuen API-Keys bleiben server-side (niemals im Frontend-Bundle)
[ ] Mobile-Test: Neue UI auf 375px Viewport geprüft
[ ] Neue Tools: mind. 5 Playwright-Tests geschrieben
[ ] SEO: Title, Description, Canonical, H1 vorhanden
```

---

## 8. REFERENZ-DOKUMENTE

| Dokument | Inhalt |
|---|---|
| `NEXUS_10_MEGAPROMPTS.md` | Vollständige Baupläne für alle 10 Haupt-Aufgaben |
| `NEXUS_MEGA_PLAN.md` | Ursprüngliche Vision, Revenue-Ziele, Anti-Regeln |
| `SEO_KRIEGSSTRATEGIE.md` | Keyword-Universum, Pillar-Struktur, Content-Velocity |
| `WEBSITE_ARCHITEKTUR.md` | UX-Blueprint, Navigation, Conversion-Funnel |
| `MEGA_MONETARISIERUNG.md` | Digitale Produkte, Pricing-Details |
| `sql/` | Alle Datenbank-Migrations in Reihenfolge |

---

## 9. ZIEL-METRIKEN (12 Monate)

| Metrik | Ziel |
|---|---|
| Monatliche Besucher | 500.000 |
| Tool-Nutzungen/Monat | 2.000.000 |
| Conversion Free → Pro | 5% |
| Monatlicher Umsatz | €125.000 |
| Monatlicher Gewinn (40% Marge) | €50.000 |
| Google-Ranking "fortnite sensitivity" DE | Top 3 |
| Indexierte Seiten Google | 1.000+ |

---

*Fortnite Nexus · fortnitenexus.space · Creator-Code: nexus*  
*Zuletzt aktualisiert: Mai 2026 · Version 2.0*  
*"Andere bauen Communities. Wir bauen Werkzeuge."*
