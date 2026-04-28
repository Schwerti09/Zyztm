# Masterplan 9: Technischer Stack & Performance-Optimierung

## Ziel
100/100 PageSpeed Score für Gaming-Websites

## Strategie
Du bist Performance-Optimierungsexperte der Websites von 30/100 auf 100/100 PageSpeed Score gebracht hat. Entwickle den vollständigen technischen Stack und Performance-Optimierungs-Plan für fortnitenexus.space – ein System das auf Gaming-spezifische Anforderungen optimiert ist, extrem schnell lädt, und für Core Web Vitals optimiert ist.

---

# [1] TECHNISCHER STACK

## Frontend-Framework

### Next.js 14 (App Router)
- **Warum:** React-basiert, Server-Side Rendering, Static Site Generation
- **Version:** 14.x (latest stable)
- **Features:** App Router, Server Components, Edge Runtime
- **Deployment:** Netlify (Edge Functions)

### TypeScript
- **Warum:** Type-Safety, bessere Developer Experience
- **Version:** 5.x
- **Strict Mode:** Enabled
- **Configuration:** tsconfig.json mit strikten Regeln

### TailwindCSS
- **Warum:** Utility-first CSS, extrem kleine Bundle-Size
- **Version:** 3.x
- **Configuration:** tailwind.config.js mit custom theme
- **Plugins:** @tailwindcss/typography, @tailwindcss/forms

## Backend-Framework

### Netlify Functions (Serverless)
- **Warum:** Serverless, Edge Functions, CDN-integriert
- **Runtime:** Node.js 18.x
- **Features:** Edge Functions, Background Functions, Scheduled Functions
- **Deployment:** Automatisch via Git Push

### Neon Serverless Postgres
- **Warum:** Serverless, PostgreSQL-kompatibel, Edge-optimiert
- **Version:** Latest
- **Connection:** @neondatabase/serverless
- **Features:** Auto-scaling, Serverless Driver, Connection Pooling

## State Management

### Zustand
- **Warum:** Lightweight, TypeScript-first, kein Boilerplate
- **Version:** 4.x
- **Persistenz:** Zustand mit localStorage
- **DevTools:** Zustand DevTools für Debugging

## Daten-Fetching

### SWR (Stale-While-Revalidate)
- **Warum:** Automatic Caching, Revalidation, Background Updates
- **Version:** 2.x
- **Configuration:** Global SWRConfig
- **Features:** Pagination, Infinite Scroll, Mutation

## Bild-Optimierung

### Next.js Image Optimization
- **Warum:** Automatic WebP/AVIF Konvertierung, Lazy Loading, Responsive Images
- **Configuration:** next.config.js mit image domains
- **Features:** Remote Patterns, Device Sizes, Formats

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
```typescript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true
  }
};
```

### Strategie 2: Image Preloading
```tsx
// Preload critical images
<link rel="preload" href="/images/hero.webp" as="image" type="image/webp" />
```

### Strategie 3: Font Optimization
```typescript
// next.config.js
module.exports = {
  optimizeFonts: true,
  fonts: {
    families: {
      'Orbitron': [{ url: '/fonts/orbitron.woff2', weight: '400' }],
      'Rajdhani': [{ url: '/fonts/rajdhani.woff2', weight: '400' }]
    }
  }
};
```

### Strategie 4: Server-Side Rendering für Critical Content
```tsx
// Server Component für Hero Section
export default function HeroSection() {
  // Server-side rendered, kein JavaScript für initial render
  return (
    <section className="hero">
      <h1>Fortnite Nexus</h1>
      <p>Die ultimative deutsche Fortnite Community</p>
    </section>
  );
}
```

## FID Optimierung (First Input Delay)

### Strategie 1: Code Splitting
```typescript
// Dynamic Imports für non-critical Components
const WeaponDatabase = dynamic(() => import('./WeaponDatabase'), {
  loading: () => <LoadingSpinner />,
  ssr: false
});
```

### Strategie 2: Event Delegation
```typescript
// Statt individual event listeners
document.addEventListener('click', (e) => {
  if (e.target.matches('.button')) {
    // Handle button click
  }
});
```

### Strategie 3: Web Workers für Heavy Computations
```typescript
// Web Worker für Waffen-Datenbank Berechnungen
const worker = new Worker('/workers/weapon-calculations.js');
worker.postMessage({ weapons: WEAPONS });
```

## CLS Optimierung (Cumulative Layout Shift)

### Strategie 1: Reserve Space für Images
```tsx
// Image mit expliziten Dimensionen
<Image
  src="/images/weapon.jpg"
  alt="Weapon"
  width={800}
  height={600}
  placeholder="blur"
/>
```

### Strategie 2: Skeleton Loading
```tsx
// Skeleton für Content Loading
<div className="skeleton">
  <div className="skeleton-image" />
  <div className="skeleton-text" />
  <div className="skeleton-text" />
</div>
```

### Strategie 3: Font Display Swap
```css
/* Font Display */
@font-face {
  font-family: 'Orbitron';
  src: url('/fonts/orbitron.woff2') format('woff2');
  font-display: swap; /* Verhindert CLS durch Font Loading */
}
```

---

# [3] BILD-OPTIMIERUNG

## WebP/AVIF Konvertierung

```typescript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.fortnite.com',
        pathname: '/**'
      }
    ]
  }
};
```

## Lazy Loading Strategie

```tsx
// Intersection Observer für Lazy Loading
const LazyImage = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef}>
      {isVisible ? (
        <Image src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="placeholder" />
      )}
    </div>
  );
};
```

## Responsive Images

```tsx
// Responsive Image mit verschiedenen Größen
<Image
  src="/images/hero.jpg"
  alt="Fortnite Hero"
  width={1920}
  height={1080}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority // Critical image
/>
```

---

# [4] CODE-OPTIMIERUNG

## Tree Shaking

```typescript
// Nur importieren was benötigt wird
import { Button } from '@/components/ui/button'; // Statt import * as UI
```

## Minification

```typescript
// next.config.js
module.exports = {
  swcMinify: true, // SWC statt Terser (schneller)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};
```

## Bundle Analysis

```bash
# Bundle Analyzer installieren
npm install @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  // Konfiguration
});
```

## Code Splitting

```typescript
// Dynamic Imports für heavy Components
const WeaponDatabase = dynamic(() => import('@/components/WeaponDatabase'), {
  loading: () => <LoadingSpinner />,
  ssr: false // Client-side only
});

// Route-based Code Splitting (automatisch mit Next.js App Router)
// /guides/[slug]/page.tsx wird nur geladen wenn benötigt
```

---

# [5] CACHING STRATEGIE

## Browser Caching

```typescript
// next.config.js
module.exports = {
  headers: async () => {
    return [
      {
        source: '/images/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/static/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  }
};
```

## CDN Caching (Netlify)

```yaml
# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## SWR Caching

```typescript
// Global SWR Configuration
import { SWRConfig } from 'swr';

export default function App() {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000, // 1 Minute
        errorRetryCount: 3,
        errorRetryInterval: 5000,
        fetcher: (url) => fetch(url).then(res => res.json())
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
```

---

# [6] DATABASE OPTIMIZATION

## Connection Pooling

```typescript
// db-client.ts
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!, {
  fetchOptions: {
    cache: 'no-store' // Kein Caching für fresh data
  }
});

export { sql };
```

## Query Optimization

```typescript
// Indexed Queries
CREATE INDEX idx_weapons_type ON weapons(type);
CREATE INDEX idx_weapons_tier ON weapons(tier);
CREATE INDEX idx_weapons_rarity ON weapons(rarity);

// Optimized Query
const weapons = await sql`
  SELECT * FROM weapons
  WHERE type = ${type}
  AND tier = ${tier}
  ORDER BY dps DESC
  LIMIT 10
`;
```

## Read Replicas (für skalierbare Reads)

```typescript
// Read Replica für nicht-kritische Queries
const readSql = neon(process.env.DATABASE_READ_URL!, {
  fetchOptions: {
    cache: 'force-cache' // Cache für read-only queries
  }
});
```

---

# [7] MONITORING

## Core Web Vitals Monitoring

```typescript
// web-vitals.ts
import { getCLS, getFID, getLCP } from 'web-vitals';

export function reportWebVitals(metric) {
  // Send to Analytics
  window.gtag?.('event', metric.name, {
    value: metric.value,
    id: metric.id
  });

  // Send to custom monitoring
  fetch('/api/web-vitals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(metric)
  });
}

getCLS(reportWebVitals);
getFID(reportWebVitals);
getLCP(reportWebVitals);
```

## Error Tracking

```typescript
// error-boundary.tsx
'use client';

import { Component, ReactNode } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Send to error tracking
    fetch('/api/error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error, errorInfo })
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

## Performance Monitoring Dashboard

```typescript
// api/performance-stats.ts
export default async function handler(req, res) {
  const stats = await sql`
    SELECT
      AVG(lcp) as avg_lcp,
      AVG(fid) as avg_fid,
      AVG(cls) as avg_cls,
      COUNT(*) as total_samples
    FROM web_vitals
    WHERE created_at > NOW() - INTERVAL '7 days'
  `;

  res.status(200).json(stats[0]);
}
```

---

# [8] GAMING-SPEZIFISCHE OPTIMIERUNG

## Low-Latency für Competitive Content

```typescript
// Edge Functions für Competitive Data
export default async function handler(req, res) {
  // Edge Function für extrem schnelle Response
  const data = await fetch('https://fortnite-api.com/v2/stats/br/v2', {
    cache: 'no-store' // Fresh data
  });

  const stats = await data.json();

  res.setHeader('Cache-Control', 'public, max-age=60'); // 1 Minute Cache
  res.status(200).json(stats);
}
```

## Real-Time Updates für Item Shop

```typescript
// WebSocket für Real-Time Updates
const ws = new WebSocket('wss://fortnite-api.com/ws/item-shop');

ws.onmessage = (event) => {
  const itemShop = JSON.parse(event.data);
  // Update UI in real-time
};
```

## Prefetching für Competitive Players

```tsx
// Prefetch für预期的 Navigation
<Link href="/ranked/tipps" prefetch={true}>
  Ranked Tips
</Link>

// Prefetch für Mouse Hover
<Link href="/meta/waffen" onMouseEnter={() => prefetch('/meta/waffen')}>
  Weapons
</Link>
```

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

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://fortnitenexus.space
            https://fortnitenexus.space/guides/fortnite-aim-guide
            https://fortnitenexus.space/tools/waffen-datenbank
          uploadArtifacts: true
          temporaryPublicStorage: true
```

## WebPageTest

```bash
# WebPageTest für detaillierte Performance-Analyse
webpagetest https://fortnitenexus.space \
  --location "Dulles:Chrome" \
  --runs 3 \
  --view
```

## Performance Budget Enforcement

```typescript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
  experimental: {
    optimizeCss: true
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.performance = {
        maxAssetSize: 300000, // 300 KB
        maxEntrypointSize: 500000 // 500 KB
      };
    }
    return config;
  }
});
```

---

*Last Updated: April 28, 2026*
