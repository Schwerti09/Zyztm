#!/usr/bin/env node

/**
 * kpi-monitor.mjs — KPI Monitoring System
 *
 * Implementiert das KPI Monitoring aus AGENTS.md:
 *   - Monetization KPIs (SAC Revenue, Affiliate Revenue, Conversion Rate, ARPU, LTV, CAC)
 *   - Traffic KPIs (Organic, Social, Direct, Referral)
 *   - Engagement KPIs (Page Views, Time on Site, Bounce Rate, Return Visitors)
 *   - Technical KPIs (Page Load, LCP, FID, CLS, Error Rate)
 *
 * Usage:
 *   node scripts/kpi-monitor.mjs              # Alle KPIs anzeigen
 *   node scripts/kpi-monitor.mjs --report   # Weekly Report generieren
 *   node scripts/kpi-monitor.mjs --alert    # Check thresholds und alert
 *
 * ENV:
 *   DATABASE_URL — für KPI-Historie in Neon DB
 */

const DOMAIN = 'https://fortnitenexus.space';

// ─── KPI Thresholds (AGENTS.md) ─────────────────────────────────────────────

const KPI_THRESHOLDS = {
  MONETIZATION: {
    SAC_REVENUE_MONTHLY: { min: 500, target: 2000 }, // €
    AFFILIATE_REVENUE_MONTHLY: { min: 300, target: 3000 }, // €
    CONVERSION_RATE: { min: 0.02, target: 0.05 }, // 2-5%
    ARPU: { min: 1, target: 5 }, // €
    LTV: { min: 10, target: 50 }, // €
    CAC: { max: 20, target: 5 } // €
  },
  TRAFFIC: {
    ORGANIC_TRAFFIC_MONTHLY: { min: 10000, target: 50000 },
    SOCIAL_TRAFFIC_MONTHLY: { min: 2000, target: 10000 },
    DIRECT_TRAFFIC_MONTHLY: { min: 1000, target: 5000 },
    REFERRAL_TRAFFIC_MONTHLY: { min: 500, target: 3000 }
  },
  ENGAGEMENT: {
    PAGE_VIEWS_PER_SESSION: { min: 2, target: 4 },
    TIME_ON_SITE: { min: 60, target: 180 }, // seconds
    BOUNCE_RATE: { max: 0.6, target: 0.3 }, // 60% -> 30%
    RETURN_VISITORS: { min: 0.2, target: 0.4 } // 20% -> 40%
  },
  TECHNICAL: {
    PAGE_LOAD_TIME: { max: 3000, target: 1500 }, // ms
    LCP: { max: 2500, target: 1200 }, // ms
    FID: { max: 200, target: 50 }, // ms
    CLS: { max: 0.2, target: 0.05 },
    ERROR_RATE: { max: 0.05, target: 0.01 } // 5% -> 1%
  }
};

// ─── Mock KPI Data (Placeholder für echte Analytics) ─────────────────────────

function getMockKPIs() {
  return {
    MONETIZATION: {
      SAC_REVENUE_MONTHLY: 750,
      AFFILIATE_REVENUE_MONTHLY: 450,
      CONVERSION_RATE: 0.025,
      ARPU: 2.5,
      LTV: 15,
      CAC: 12
    },
    TRAFFIC: {
      ORGANIC_TRAFFIC_MONTHLY: 15000,
      SOCIAL_TRAFFIC_MONTHLY: 3500,
      DIRECT_TRAFFIC_MONTHLY: 2000,
      REFERRAL_TRAFFIC_MONTHLY: 800
    },
    ENGAGEMENT: {
      PAGE_VIEWS_PER_SESSION: 2.8,
      TIME_ON_SITE: 95,
      BOUNCE_RATE: 0.52,
      RETURN_VISITORS: 0.28
    },
    TECHNICAL: {
      PAGE_LOAD_TIME: 1800,
      LCP: 1400,
      FID: 80,
      CLS: 0.08,
      ERROR_RATE: 0.02
    }
  };
}

// ─── KPI Check & Alert ───────────────────────────────────────────────────────

function checkKPIs(kpis) {
  const alerts = [];

  for (const [category, metrics] of Object.entries(kpis)) {
    const thresholds = KPI_THRESHOLDS[category];

    for (const [metric, value] of Object.entries(metrics)) {
      const threshold = thresholds[metric];

      if (!threshold) continue;

      let status = 'OK';
      let message = '';

      if (threshold.min && value < threshold.min) {
        status = 'ALERT';
        message = `${metric}: ${value} < ${threshold.min} (min)`;
        alerts.push({ category, metric, value, threshold, status, message });
      } else if (threshold.max && value > threshold.max) {
        status = 'ALERT';
        message = `${metric}: ${value} > ${threshold.max} (max)`;
        alerts.push({ category, metric, value, threshold, status, message });
      } else if (threshold.target) {
        if (threshold.min && value >= threshold.target) {
          status = 'EXCELLENT';
        } else if (threshold.max && value <= threshold.target) {
          status = 'EXCELLENT';
        } else {
          status = 'OK';
        }
      }

      console.log(`${status.padEnd(10)} ${category}.${metric.padEnd(30)} ${value}`);
    }
  }

  return alerts;
}

// ─── Weekly Report Generator ─────────────────────────────────────────────────

function generateWeeklyReport(kpis) {
  const weekNumber = getWeekNumber(new Date());
  const dateRange = getWeekDateRange();

  return `
# KPI Weekly Report — KW${weekNumber} (${dateRange})

## Monetization
- SAC Revenue: €${kpis.MONETIZATION.SAC_REVENUE_MONTHLY}/month (Target: €${KPI_THRESHOLDS.MONETIZATION.SAC_REVENUE_MONTHLY.target})
- Affiliate Revenue: €${kpis.MONETIZATION.AFFILIATE_REVENUE_MONTHLY}/month (Target: €${KPI_THRESHOLDS.MONETIZATION.AFFILIATE_REVENUE_MONTHLY.target})
- Conversion Rate: ${(kpis.MONETIZATION.CONVERSION_RATE * 100).toFixed(1)}% (Target: ${(KPI_THRESHOLDS.MONETIZATION.CONVERSION_RATE.target * 100).toFixed(1)}%)
- ARPU: €${kpis.MONETIZATION.ARPU} (Target: €${KPI_THRESHOLDS.MONETIZATION.ARPU.target})
- LTV: €${kpis.MONETIZATION.LTV} (Target: €${KPI_THRESHOLDS.MONETIZATION.LTV.target})
- CAC: €${kpis.MONETIZATION.CAC} (Target: €${KPI_THRESHOLDS.MONETIZATION.CAC.target})

## Traffic
- Organic: ${kpis.TRAFFIC.ORGANIC_TRAFFIC_MONTHLY.toLocaleString()} (Target: ${KPI_THRESHOLDS.TRAFFIC.ORGANIC_TRAFFIC_MONTHLY.target.toLocaleString()})
- Social: ${kpis.TRAFFIC.SOCIAL_TRAFFIC_MONTHLY.toLocaleString()} (Target: ${KPI_THRESHOLDS.TRAFFIC.SOCIAL_TRAFFIC_MONTHLY.target.toLocaleString()})
- Direct: ${kpis.TRAFFIC.DIRECT_TRAFFIC_MONTHLY.toLocaleString()} (Target: ${KPI_THRESHOLDS.TRAFFIC.DIRECT_TRAFFIC_MONTHLY.target.toLocaleString()})
- Referral: ${kpis.TRAFFIC.REFERRAL_TRAFFIC_MONTHLY.toLocaleString()} (Target: ${KPI_THRESHOLDS.TRAFFIC.REFERRAL_TRAFFIC_MONTHLY.target.toLocaleString()})

## Engagement
- Pages/Session: ${kpis.ENGAGEMENT.PAGE_VIEWS_PER_SESSION} (Target: ${KPI_THRESHOLDS.ENGAGEMENT.PAGE_VIEWS_PER_SESSION.target})
- Time on Site: ${kpis.ENGAGEMENT.TIME_ON_SITE}s (Target: ${KPI_THRESHOLDS.ENGAGEMENT.TIME_ON_SITE.target}s)
- Bounce Rate: ${(kpis.ENGAGEMENT.BOUNCE_RATE * 100).toFixed(1)}% (Target: ${(KPI_THRESHOLDS.ENGAGEMENT.BOUNCE_RATE.target * 100).toFixed(1)}%)
- Return Visitors: ${(kpis.ENGAGEMENT.RETURN_VISITORS * 100).toFixed(1)}% (Target: ${(KPI_THRESHOLDS.ENGAGEMENT.RETURN_VISITORS.target * 100).toFixed(1)}%)

## Technical
- Page Load: ${kpis.TECHNICAL.PAGE_LOAD_TIME}ms (Target: ${KPI_THRESHOLDS.TECHNICAL.PAGE_LOAD_TIME.target}ms)
- LCP: ${kpis.TECHNICAL.LCP}ms (Target: ${KPI_THRESHOLDS.TECHNICAL.LCP.target}ms)
- FID: ${kpis.TECHNICAL.FID}ms (Target: ${KPI_THRESHOLDS.TECHNICAL.FID.target}ms)
- CLS: ${kpis.TECHNICAL.CLS} (Target: ${KPI_THRESHOLDS.TECHNICAL.CLS.target})
- Error Rate: ${(kpis.TECHNICAL.ERROR_RATE * 100).toFixed(1)}% (Target: ${(KPI_THRESHOLDS.TECHNICAL.ERROR_RATE.target * 100).toFixed(1)}%)

---
Generated by KPI Monitor | ${DOMAIN}
`;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function getWeekDateRange() {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay() + 1);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const fmt = (d) => d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
  return `${fmt(start)} – ${fmt(end)}`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const reportFlag = args.includes('--report');
  const alertFlag = args.includes('--alert');

  console.log('📊 KPI Monitoring System\n');

  const kpis = getMockKPIs();

  if (reportFlag) {
    const report = generateWeeklyReport(kpis);
    console.log(report);
    return;
  }

  console.log('Current KPIs:');
  console.log('─'.repeat(70));

  const alerts = checkKPIs(kpis);

  if (alerts.length > 0) {
    console.log('\n⚠️  ALERTS:');
    for (const alert of alerts) {
      console.log(`   ${alert.message}`);
    }
  } else {
    console.log('\n✅ All KPIs within thresholds');
  }

  console.log('\n💡 Use --report for weekly report');
  console.log('💡 Use --alert for threshold-only output');
}

main();
