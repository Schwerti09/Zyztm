# Fortnite Nexus - Frontend Agent Instructions
## SEO, UX & Performance Optimization

---

# FRONTEND-SPECIFIC DIRECTIVES

## Primary Focus
This AGENTS.md applies to all frontend development in `apps/web/`. It supplements the global AGENTS.md with frontend-specific requirements for SEO, UX, and performance optimization.

---

# SEO OPTIMIZATION REQUIREMENTS

## On-Page SEO Standards
Every page must include:

### Meta Tags
```typescript
interface MetaTags {
  title: string; // 50-60 characters max
  description: string; // 150-160 characters max
  keywords: string[]; // 5-10 relevant keywords
  canonical: string; // Absolute URL
  ogTitle: string; // Open Graph title
  ogDescription: string; // Open Graph description
  ogImage: string; // 1200x630px minimum
  ogUrl: string; // Absolute URL
  twitterCard: 'summary_large_image' | 'summary';
}
```

### Schema.org Markup
Every page must include relevant JSON-LD schema:
- **Guide Pages:** HowTo schema
- **News Pages:** Article schema
- **Hub Pages:** CollectionPage schema
- **Home Page:** WebSite schema

### Heading Structure
```html
<h1>Exactly one H1 per page</h1>
<h2>Section headings</h2>
<h3>Sub-section headings</h3>
<h4>Detail headings</h4>
```

### Image Optimization
- **Format:** WebP preferred, AVIF if supported
- **Alt Text:** Descriptive, includes keywords
- **Lazy Loading:** All below-fold images
- **Dimensions:** Explicit width/height to prevent CLS
- **Compression:** Quality 80-85%

## Internal Linking Strategy

### Link Distribution Rules
```typescript
const LINKING_RULES = {
  MAX_INTERNAL_LINKS: 15, // Per page
  MIN_CONTEXTUAL_LINKS: 3, // Related content
  NO_ORPHAN_PAGES: true, // Every page must have inbound links
  ANCHOR_TEXT_VARIETY: true, // Vary anchor text
  LINK_DEPTH: 3, // Max 3 clicks to any page
};
```

### Link Juice Distribution
- Homepage: Highest authority
- Hub Pages: Medium-high authority
- Guide Pages: Medium authority
- News Pages: Low-medium authority

---

# PERFORMANCE BUDGETS

## Core Web Vitals Targets
```typescript
const CORE_WEB_VITALS = {
  LCP: {
    TARGET: 2500, // 2.5 seconds
    GOOD: 2500,
    NEEDS_IMPROVEMENT: 4000,
    POOR: 4000
  },
  FID: {
    TARGET: 100, // 100ms
    GOOD: 100,
    NEEDS_IMPROVEMENT: 300,
    POOR: 300
  },
  CLS: {
    TARGET: 0.1,
    GOOD: 0.1,
    NEEDS_IMPROVEMENT: 0.25,
    POOR: 0.25
  }
};
```

## Page Size Budgets
```typescript
const PAGE_SIZE_LIMITS = {
  HOME: {
    HTML: 15, // KB
    CSS: 50, // KB
    JS: 200, // KB
    IMAGES: 300, // KB
    TOTAL: 500 // KB compressed
  },
  GUIDE: {
    HTML: 20,
    CSS: 50,
    JS: 150,
    IMAGES: 200,
    TOTAL: 400 // KB compressed
  },
  SHOP: {
    HTML: 15,
    CSS: 50,
    JS: 180,
    IMAGES: 250,
    TOTAL: 450 // KB compressed
  }
};
```

## Performance Optimization Techniques

### Code Splitting
- Route-based splitting with React.lazy()
- Component splitting for large features
- Dynamic imports for third-party libraries

### Caching Strategy
```typescript
const CACHE_STRATEGY = {
  STATIC_ASSETS: '1 year', // Images, fonts
  HTML: '1 hour', // With revalidation
  API: '5 minutes', // For dynamic data
  CDN: 'Edge caching enabled'
};
```

### Critical CSS
- Inline critical CSS for above-fold content
- Lazy load non-critical CSS
- Purge unused CSS with Tailwind

---

# MOBILE-FIRST DESIGN

## Responsive Breakpoints
```typescript
const BREAKPOINTS = {
  MOBILE: 0, // 0-640px
  TABLET: 641, // 641-1024px
  DESKTOP: 1025, // 1025-1440px
  WIDE: 1441 // 1441px+
};
```

## Mobile UX Requirements
- Touch targets: Minimum 44x44px
- Font sizes: Minimum 16px for body text
- No horizontal scrolling
- Optimized for one-handed use
- Hamburger menu for navigation

## Mobile Performance
- Reduce JavaScript bundle size
- Optimize images for mobile screens
- Use system fonts when possible
- Minimize render-blocking resources

---

# UX DESIGN PRINCIPLES

## Conversion Optimization

### SAC Code Display
```typescript
const SAC_DISPLAY_RULES = {
  PLACEMENTS: ['hero', 'shop', 'guide', 'footer'],
  MAX_FREQUENCY: 3, // Per session
  MIN_INTERVAL: 300000, // 5 minutes
  DISMISS_DURATION: 86400000, // 24 hours
  COPY_TO_CLIPBOARD: true,
  VISUAL_HIERARCHY: 'prominent'
};
```

### CTA Button Standards
```typescript
const CTA_STANDARDS = {
  MIN_SIZE: '44px height',
  CONTRAST_RATIO: 4.5, // WCAG AA
  HOVER_STATE: 'clear visual feedback',
  LOADING_STATE: 'spinner or skeleton',
  SUCCESS_STATE: 'confirmation message'
};
```

## User Journey Optimization

### Loading States
- Skeleton screens for content
- Progress indicators for actions
- Error boundaries for graceful failures
- Offline support with service workers

### Feedback Systems
- Toast notifications for actions
- Form validation with clear messages
- Success confirmations
- Error explanations with solutions

---

# ACCESSIBILITY REQUIREMENTS

## WCAG 2.1 AA Compliance
- Color contrast ratio: 4.5:1 for text
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators visible
- Alt text for all images
- ARIA labels for interactive elements

## Semantic HTML
- Use proper heading hierarchy
- Semantic elements (nav, main, article, etc.)
- Landmark regions for navigation
- Form labels properly associated
- Button elements for actions

---

# COMPONENT-SPECIFIC RULES

## Hero Section
- **SAC Code:** Prominent display, copy-to-clipboard
- **CTA:** Clear value proposition
- **Loading:** Skeleton before content loads
- **Performance:** Critical CSS inlined

## Item Shop Tracker
- **Real-time Updates:** WebSocket or polling
- **Wishlist:** Local storage persistence
- **Notifications:** Browser notifications for alerts
- **Mobile:** Swipeable card interface

## Guide Pages
- **TOC:** Table of contents for long guides
- **Progress:** Reading progress indicator
- **Related Guides:** 3-5 related guides at bottom
- **SAC Code:** Contextual reminder in sidebar

## News Pages
- **Filtering:** Category and date filters
- **Infinite Scroll:** Or pagination with clear navigation
- **Share Buttons:** Social media sharing
- **Reading Time:** Estimated reading time

---

# STATE MANAGEMENT

## Redux/Zustand Guidelines
```typescript
const STATE_MANAGEMENT_RULES = {
  MINIMIZE_STATE: 'Only store what you need',
  NORMALIZE_DATA: 'Use normalized data structures',
  AVOID_NESTING: 'Flat state is better',
  PERSIST_WISELY: 'Only persist user preferences',
  OPTIMISTIC_UPDATES: 'For better UX'
};
```

## Local Storage Strategy
```typescript
const STORAGE_KEYS = {
  USER_PREFERENCES: 'fn_user_prefs',
  SAC_CODE_DISMISSAL: 'fn_sac_dismissal',
  WISHLIST: 'fn_item_wishlist',
  THEME: 'fn_theme',
  LANGUAGE: 'fn_language'
};
```

---

# TESTING REQUIREMENTS

## Component Testing
- Unit tests for all components
- Integration tests for user flows
- Snapshot tests for UI consistency
- Accessibility tests with axe-core

## E2E Testing
```typescript
const CRITICAL_USER_FLOWS = [
  'SAC code copy and usage',
  'Item shop wishlist creation',
  'Guide navigation and reading',
  'News filtering and reading',
  'Language switching',
  'Mobile menu navigation'
];
```

## Performance Testing
- Lighthouse CI for every PR
- Bundle size monitoring
- Core Web Vitals tracking
- Real User Monitoring (RUM)

---

# MONETARIZATION INTEGRATION

## Affiliate Link Placement
```typescript
const AFFILIATE_PLACEMENT = {
  CONTEXTUAL: true, // Only in relevant content
  LABELED: true, // "Affiliate link" label
  NO_DECEPTION: true, // Clear disclosure
  TRACKING: true, // Click and conversion tracking
  PERFORMANCE: true, // Monitor impact on UX
};
```

## Ad Placement Rules
- Never compromise UX for ad revenue
- Respect ad-blockers gracefully
- No intrusive interstitials
- Above-fold content first, ads second

---

# SEO AUTOMATION

## Dynamic Meta Tags
```typescript
interface DynamicMeta {
  generateTitle: (page: string, data: any) => string;
  generateDescription: (page: string, data: any) => string;
  generateKeywords: (content: string) => string[];
  generateSchema: (page: string, data: any) => object;
}
```

## Sitemap Generation
- Automatic sitemap updates
- Include all language variants
- Include all regional variants
- Priority based on page importance
- Change frequency based on update frequency

## Robots.txt
- Allow all search engines
- Disallow admin routes
- Disallow API routes
- Sitemap reference included

---

# ERROR HANDLING

## Error Boundaries
- Catch React errors gracefully
- Show user-friendly error messages
- Log errors for debugging
- Provide recovery options

## API Error Handling
```typescript
const API_ERROR_HANDLING = {
  RETRY_STRATEGY: 'exponential backoff',
  TIMEOUT: 10000, // 10 seconds
  FALLBACK: 'cached data or default',
  USER_NOTIFICATION: 'clear error message',
  LOGGING: 'detailed error logs'
};
```

---

# DEPLOYMENT CHECKLIST

## Pre-Deployment
- [ ] All tests passing
- [ ] Lighthouse score > 90
- [ ] Bundle size within budget
- [ ] SEO meta tags verified
- [ ] Accessibility audit passed
- [ ] Performance budget met

## Post-Deployment
- [ ] Monitor Core Web Vitals
- [ ] Check SEO indexing
- [ ] Verify affiliate tracking
- [ ] Monitor error rates
- [ ] Track user engagement
- [ ] Review revenue metrics

---

*Last Updated: April 25, 2026*
*Version: 1.0 - Frontend Optimization*
