# Tech Stack & Performance-Optimierungs-Strategie

## Ziel
100/100 PageSpeed Score für Gaming-Websites

---

# [1] TECHNISCHER STACK

## Frontend-Framework

### Next.js 14 (App Router)
- Warum: React-basiert, Server-Side Rendering, Static Site Generation
- Version: 14.x (latest stable)
- Features: App Router, Server Components, Edge Runtime
- Deployment: Netlify (Edge Functions)

### TypeScript
- Warum: Type-Safety, bessere Developer Experience
- Version: 5.x
- Strict Mode: Enabled
- Configuration: tsconfig.json mit strikten Regeln

### TailwindCSS
- Warum: Utility-first CSS, extrem kleine Bundle-Size
- Version: 3.x
- Configuration: tailwind.config.js mit custom theme
- Plugins: @tailwindcss/typography, @tailwindcss/forms

## Backend-Framework

### Netlify Functions (Serverless)
- Warum: Serverless, Edge Functions, CDN-integriert
- Runtime: Node.js 18.x
- Features: Edge Functions, Background Functions, Scheduled Functions
- Deployment: Automatisch via Git Push

### Neon Serverless Postgres
- Warum: Serverless, PostgreSQL-kompatibel, Edge-optimiert
- Version: Latest
- Connection: @neondatabase/serverless
- Features: Auto-scaling, Serverless Driver, Connection Pooling

## State Management

### Zustand
- Warum: Lightweight, TypeScript-first, kein Boilerplate
- Version: 4.x
- Persistenz: Zustand mit localStorage
- DevTools: Zustand DevTools für Debugging

## Daten-Fetching

### SWR (Stale-While-Revalidate)
- Warum: Automatic Caching, Revalidation, Background Updates
- Version: 2.x
- Configuration: Global SWRConfig
- Features: Pagination, Infinite Scroll, Mutation

## Bild-Optimierung

### Next.js Image Optimization
- Warum: Automatic WebP/AVIF Konvertierung, Lazy Loading, Responsive Images
- Configuration: next.config.js mit image domains
- Features: Remote Patterns, Device Sizes, Formats

---

# [2] PERFORMANCE-OPTIMIERUNG

## Core Web Vitals Zielwerte

```typescript
const CWV_TARGETS = {
  LCP: {
    TARGET: 2000, // 2.0s (strenger als Standard)
    WARNING: 2500,
    CRITICAL: 4000
  },
  FID: {
    TARGET: 50, // 50ms (strenger als Standard)
    WARNING: 100,
    CRITICAL: 300
  },
  CLS: {
    TARGET: 0.05, // 0.05 (strenger als Standard)
    WARNING: 0.1,
    CRITICAL: 0.25
  }
};
```

## LCP Optimierung (Largest Contentful Paint)

### Strategie 1: Critical CSS Inline
- Optimize CSS in next.config.js

### Strategie 2: Image Preloading
- Preload critical images mit rel="preload"

### Strategie 3: Font Optimization
- Optimize Fonts in next.config.js
- WOFF2 Format für alle Fonts

### Strategie 4: Server-Side Rendering für Critical Content
- Server Components für Hero Section
- Kein JavaScript für initial render

## FID Optimierung (First Input Delay)

### Strategie 1: Code Splitting
- Dynamic Imports für non-critical Components
- Loading Spinner für lazy-loaded components

### Strategie 2: Event Delegation
- Statt individual event listeners
- Event delegation für bessere Performance

### Strategie 3: Web Workers für Heavy Computations
- Web Worker für Waffen-Datenbank Berechnungen
- Heavy computations aus dem Main Thread

## CLS Optimierung (Cumulative Layout Shift)

### Strategie 1: Reserve Space für Images
- Image mit expliziten Dimensionen
- Placeholder="blur" für smooth loading

### Strategie 2: Skeleton Loading
- Skeleton für Content Loading
- Verhindert Layout Shifts

### Strategie 3: Font Display Swap
- Font Display: swap
- Verhindert CLS durch Font Loading

---

# [3] BILD-OPTIMIERUNG

## WebP/AVIF Konvertierung
- Image Formats: ['image/avif', 'image/webp']
- Device Sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
- Image Sizes: [16, 32, 48, 64, 96, 128, 256, 384]
- Remote Patterns für fortnite.com

## Lazy Loading Strategie
- Intersection Observer für Lazy Loading
- Placeholder während Loading
- Disconnect Observer nach Loading

## Responsive Images
- Responsive Image mit verschiedenen Größen
- Priority für Critical Images
- Sizes Attribute für Responsive Loading

---

# [4] CODE-OPTIMIERUNG

## Tree Shaking
- Nur importieren was benötigt wird
- Statt import * as UI

## Minification
- SWC statt Terser (schneller)
- Remove Console in Production

## Bundle Analysis
- @next/bundle-analyzer installieren
- Bundle Size Monitoring

## Code Splitting
- Dynamic Imports für heavy Components
- Route-based Code Splitting (automatisch mit Next.js App Router)

---

# [5] CACHING STRATEGIE

## Browser Caching
- Cache-Control für Images: public, max-age=31536000, immutable
- Cache-Control für Static Files: public, max-age=31536000, immutable

## CDN Caching (Netlify)
- Cache-Control für alle Seiten: public, max-age=0, must-revalidate
- Security Headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy

## SWR Caching
- revalidateOnFocus: false
- revalidateOnReconnect: false
- dedupingInterval: 60000 (1 Minute)
- errorRetryCount: 3
- errorRetryInterval: 5000

---

# [6] DATABASE OPTIMIZATION

## Connection Pooling
- Neon Serverless Postgres mit @neondatabase/serverless
- Cache: 'no-store' für fresh data

## Query Optimization
- Indexed Queries für type, tier, rarity
- Optimized Query mit ORDER BY und LIMIT

## Read Replicas
- Read Replica für nicht-kritische Queries
- Cache: 'force-cache' für read-only queries

---

# [7] MONITORING

## Core Web Vitals Monitoring
- web-vitals Library für Monitoring
- Send to Analytics (gtag)
- Send to custom monitoring API

## Error Tracking
- Error Boundary Component
- Send to error tracking API
- componentDidCatch für Error Handling

## Performance Monitoring Dashboard
- API Endpoint für Performance Stats
- Average LCP, FID, CLS
- 7-day window für Analytics

---

# [8] GAMING-SPEZIFISCHE OPTIMIERUNG

## Low-Latency für Competitive Content
- Edge Functions für Competitive Data
- Cache: 'no-store' für Fresh Data
- 1 Minute Cache für Item Shop

## Real-Time Updates für Item Shop
- WebSocket für Real-Time Updates
- Update UI in real-time

## Prefetching für Competitive Players
- Prefetch für erwartete Navigation
- Prefetch auf Mouse Hover

---

# [9] PERFORMANCE-BUDGETS

## Page Size Budgets

```typescript
const PERFORMANCE_BUDGETS = {
  PAGE_SIZE: {
    HOME: 500000, // 500 KB compressed
    GUIDE: 300000, // 300 KB compressed
    SHOP: 400000, // 400 KB compressed
    TOOL: 350000, // 350 KB compressed
  },
  BUNDLE_SIZE: {
    MAIN: 200000, // 200 KB
    VENDOR: 300000, // 300 KB
    CSS: 50000, // 50 KB
  }
};
```

## Load Time Budgets

```typescript
const LOAD_TIME_TARGETS = {
  LCP: {
    HOME: 2000, // 2.0s
    GUIDE: 1500, // 1.5s
    SHOP: 1800, // 1.8s
    TOOL: 1200, // 1.2s
  },
  TTI: {
    HOME: 3500, // 3.5s
    GUIDE: 2500, // 2.5s
    SHOP: 3000, // 3.0s
    TOOL: 2000, // 2.0s
  }
};
```

---

# [10] TESTING

## Lighthouse CI
- GitHub Workflow für Lighthouse CI
- Test URLs: Home, Guide, Waffen-Datenbank
- Upload Artifacts und Temporary Public Storage

## WebPageTest
- WebPageTest für detaillierte Performance-Analyse
- Location: Dulles:Chrome
- 3 Runs für Durchschnitt

## Performance Budget Enforcement
- Bundle Analyzer Integration
- Max Asset Size: 300 KB
- Max Entry Point Size: 500 KB

---
*Basierend auf Masterplan 9: Technischer Stack & Performance-Optimierung*
*Datum: 2026-04-28*
