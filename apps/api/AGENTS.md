# Fortnite Nexus - API Agent Instructions
## API Integration, Database & Epic Games API

---

# API-SPECIFIC DIRECTIVES

## Primary Focus
This AGENTS.md applies to all API development in `apps/api/`. It supplements the global AGENTS.md with API-specific requirements for Epic Games integration, database schemas, and monetization tracking.

---

# EPIC GAMES API INTEGRATION

## Fortnite API Endpoints
```typescript
const FORTNITE_API = {
  baseUrl: 'https://fortnite-api.com',
  endpoints: {
    STATS: '/v2/stats/br/v2',
    NEWS: '/v2/news',
    SHOP: '/v2/shop/br',
    MAPS: '/v2/maps/br',
    CREATOR_CODE: '/v2/cosmetics/br/search/all'
  }
};
```

## Rate Limiting
```typescript
const RATE_LIMITING = {
  REQUESTS_PER_MINUTE: 60,
  REQUESTS_PER_HOUR: 500,
  BURST_LIMIT: 10, // Max concurrent requests
  RETRY_STRATEGY: 'exponential backoff',
  RETRY_ATTEMPTS: 3
};
```

## Caching Strategy
```typescript
const API_CACHE = {
  SHOP_DATA: '5 minutes', // Update every 5 minutes
  NEWS_DATA: '15 minutes',
  STATS_DATA: '1 hour',
  MAP_DATA: '1 hour',
  COSMETICS: '24 hours'
};
```

## Error Handling
```typescript
const API_ERROR_HANDLING = {
  TIMEOUT: 10000, // 10 seconds
  FALLBACK: 'cached data',
  LOGGING: 'detailed error logs',
  ALERTING: 'critical errors to monitoring'
};
```

---

# DATABASE SCHEMA STANDARDS

## SAC Code Tracking
```sql
CREATE TABLE sac_code_usage (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(100),
  session_id VARCHAR(100),
  code_used VARCHAR(20) NOT NULL,
  context VARCHAR(50), -- 'hero', 'shop', 'guide', 'checkout', 'footer'
  converted BOOLEAN DEFAULT false,
  conversion_value DECIMAL(10,2),
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_user_id (user_id),
  INDEX idx_code_used (code_used),
  INDEX idx_created_at (created_at)
);
```

## Affiliate Performance Tracking
```sql
CREATE TABLE affiliate_performance (
  id SERIAL PRIMARY KEY,
  affiliate_link_id INTEGER REFERENCES affiliate_links(id),
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0.00,
  date DATE DEFAULT CURRENT_DATE,
  UNIQUE(affiliate_link_id, date),
  INDEX idx_date (date),
  INDEX idx_affiliate_link_id (affiliate_link_id)
);
```

## Item Shop History
```sql
CREATE TABLE item_shop_history (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  items JSONB NOT NULL,
  featured_items JSONB,
  rarity_distribution JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(date),
  INDEX idx_date (date)
);
```

## User Wishlists
```sql
CREATE TABLE item_wishlists (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(100),
  item_id VARCHAR(100) NOT NULL,
  item_name VARCHAR(255),
  rarity VARCHAR(20),
  notified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, item_id),
  INDEX idx_user_id (user_id),
  INDEX idx_item_id (item_id)
);
```

---

# API ROUTE STANDARDS

## Response Format
```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}
```

## Authentication
```typescript
const AUTH_CONFIG = {
  STRATEGY: 'JWT',
  TOKEN_EXPIRY: '7 days',
  REFRESH_TOKEN_EXPIRY: '30 days',
  RATE_LIMIT_AUTHENTICATED: '1000 req/hour',
  RATE_LIMIT_PUBLIC: '100 req/hour'
};
```

## CORS Configuration
```typescript
const CORS_CONFIG = {
  ALLOWED_ORIGINS: [
    'https://fortnitenexus.netlify.app',
    'https://fortnitenexus.com'
  ],
  ALLOWED_METHODS: ['GET', 'POST', 'PUT', 'DELETE'],
  ALLOWED_HEADERS: ['Content-Type', 'Authorization'],
  CREDENTIALS: true
};
```

---

# MONETARIZATION TRACKING

## SAC Code Attribution
```typescript
interface SACAttribution {
  trackUsage: (userId: string, code: string, context: string) => Promise<void>;
  trackConversion: (userId: string, value: number) => Promise<void>;
  getUsageStats: (code: string, period: string) => Promise<UsageStats>;
  getTopPerformers: (limit: number) => Promise<TopPerformer[]>;
}
```

## Affiliate Link Tracking
```typescript
interface AffiliateTracking {
  generateLink: (productId: string, affiliateId: string) => string;
  trackClick: (linkId: string, userId?: string) => Promise<void>;
  trackConversion: (linkId: string, value: number) => Promise<void>;
  getPerformance: (linkId: string, period: string) => Promise<PerformanceData>;
}
```

## Engagement Payout Calculation
```typescript
interface EngagementPayout {
  calculatePayout: (islandId: string, period: string) => Promise<Payout>;
  trackPlaytime: (islandId: string, userId: string, minutes: number) => Promise<void>;
  trackRetention: (islandId: string, userId: string, returned: boolean) => Promise<void>;
  trackAcquisition: (islandId: string, referrerId: string) => Promise<void>;
}
```

---

# DATA VALIDATION

## Input Validation Rules
```typescript
const VALIDATION_RULES = {
  CREATOR_CODE: {
    LENGTH: { min: 3, max: 20 },
    PATTERN: /^[A-Z0-9]+$/,
    BLACKLIST: ['ADMIN', 'SYSTEM', 'API']
  },
  USER_ID: {
    LENGTH: { min: 1, max: 100 },
    PATTERN: /^[a-zA-Z0-9-_]+$/
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MAX_LENGTH: 255
  }
};
```

## Sanitization
- Remove HTML tags from user input
- Escape SQL injection attempts
- Validate JSON payloads
- Sanitize file uploads

---

# SECURITY REQUIREMENTS

## API Security
```typescript
const SECURITY_CONFIG = {
  HTTPS_ONLY: true,
  HELMET_ENABLED: true,
  RATE_LIMITING: true,
  INPUT_VALIDATION: true,
  OUTPUT_ENCODING: true,
  SECRETS_MANAGEMENT: 'environment variables'
};
```

## SQL Injection Prevention
- Use parameterized queries
- Implement query builders
- Regular security audits
- Input sanitization

## XSS Protection
- Content Security Policy (CSP)
- Input sanitization
- Output encoding
- HTTP-only cookies

---

# MONITORING & LOGGING

## Logging Standards
```typescript
const LOG_LEVELS = {
  ERROR: 'critical',
  WARN: 'warning',
  INFO: 'informational',
  DEBUG: 'debug'
};

const LOG_FORMAT = {
  TIMESTAMP: true,
  REQUEST_ID: true,
  USER_ID: true,
  IP_ADDRESS: true,
  USER_AGENT: true
};
```

## Metrics to Track
```typescript
const API_METRICS = {
  REQUEST_COUNT: 'Total requests',
  RESPONSE_TIME: 'Average response time',
  ERROR_RATE: 'Error percentage',
  RATE_LIMIT_HITS: 'Rate limit violations',
  CACHE_HIT_RATE: 'Cache effectiveness',
  DATABASE_QUERY_TIME: 'Database performance'
};
```

## Alerting
```typescript
const ALERTING_RULES = {
  ERROR_RATE_THRESHOLD: 0.05, // 5%
  RESPONSE_TIME_THRESHOLD: 2000, // 2 seconds
  DATABASE_CONNECTION_FAILURE: 'immediate',
  API_OUTAGE: 'immediate',
  SECURITY_BREACH: 'immediate'
};
```

---

# MCP SERVER INTEGRATION

## SE Ranking Integration
```typescript
const SE_RANKING_CONFIG = {
  API_KEY: process.env.SERANKING_API_KEY,
  ENDPOINTS: {
    KEYWORD_RESEARCH: '/keywords',
    BACKLINK_ANALYSIS: '/backlinks',
    RANK_TRACKING: '/rankings'
  },
  RATE_LIMIT: '100 req/hour'
};
```

## Google Search Console Integration
```typescript
const GSC_CONFIG = {
  CREDENTIALS: process.env.GSC_CREDENTIALS,
  SCOPES: ['https://www.googleapis.com/auth/webmasters.readonly'],
  ENDPOINTS: {
    SEARCH_ANALYTICS: '/searchanalytics/query',
    INDEX_STATUS: '/indexStatus'
  }
};
```

## Brave Search Integration
```typescript
const BRAVE_SEARCH_CONFIG = {
  API_KEY: process.env.BRAVE_API_KEY,
  ENDPOINTS: {
    SEARCH: '/api/search',
    NEWS: '/api/news'
  },
  RATE_LIMIT: '1000 req/day'
};
```

---

# TESTING REQUIREMENTS

## API Testing
```typescript
const API_TESTS = {
  UNIT_TESTS: 'All endpoints',
  INTEGRATION_TESTS: 'Database + External APIs',
  E2E_TESTS: 'Complete user flows',
  LOAD_TESTS: '1000 concurrent users',
  SECURITY_TESTS: 'OWASP Top 10'
};
```

## Test Coverage
- Endpoint testing: 100%
- Error handling: 100%
- Input validation: 100%
- Authentication: 100%
- Rate limiting: 100%

---

# PERFORMANCE OPTIMIZATION

## Database Optimization
```typescript
const DB_OPTIMIZATION = {
  INDEXING: 'All foreign keys and frequently queried columns',
  QUERY_OPTIMIZATION: 'Use EXPLAIN ANALYZE',
  CONNECTION_POOLING: 'Max 20 connections',
  CACHING: 'Redis for frequently accessed data',
  PARTITIONING: 'Large tables by date'
};
```

## Response Optimization
```typescript
const RESPONSE_OPTIMIZATION = {
  COMPRESSION: 'gzip',
  MINIFICATION: 'JSON responses',
  PAGINATION: 'Large datasets',
  FIELD_SELECTION: 'Only requested fields',
  ETAG_SUPPORT: 'Conditional requests'
};
```

---

# DEPLOYMENT CHECKLIST

## Pre-Deployment
- [ ] All tests passing
- [ ] Security audit passed
- [ ] Rate limiting configured
- [ ] Error handling verified
- [ ] Database migrations applied
- [ ] Environment variables set

## Post-Deployment
- [ ] Monitor error rates
- [ ] Check API response times
- [ ] Verify database connections
- [ ] Test external API integrations
- [ ] Monitor cache hit rates
- [ ] Review security logs

---

*Last Updated: April 25, 2026*
*Version: 1.0 - API Integration*
