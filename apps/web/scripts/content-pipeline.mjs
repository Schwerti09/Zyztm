#!/usr/bin/env node

/**
 * content-pipeline.mjs — Content Pipeline Automation
 *
 * Implementiert die Content Pipeline aus AGENTS.md:
 *   - Monitor Reddit/FortniteTracker for leaks
 *   - Auto-draft articles for high-priority news
 *   - Generate SEO-optimized titles
 *   - Create social media posts
 *   - Schedule newsletter inclusion
 *
 * Usage:
 *   node scripts/content-pipeline.mjs              # Check for new content
 *   node scripts/content-pipeline.mjs --draft     # Auto-draft articles
 *   node scripts/content-pipeline.mjs --social    # Generate social posts
 *
 * Priority Levels (AGENTS.md):
 *   Priority 1 (Critical): Item Shop leaks/rumors, Patch notes, Season changes, Major events
 *   Priority 2 (High): Weapon meta shifts, Map updates, Pro player news, Tournament results
 *   Priority 3 (Normal): General guides, Tips & tricks, Community highlights
 */

import { searchWeb } from './lib/web-search.mjs';

const DOMAIN = 'https://fortnitenexus.space';

// ─── Content Sources Monitor ──────────────────────────────────────────────────

const CONTENT_SOURCES = [
  {
    name: 'Reddit r/FortniteBR',
    url: 'https://www.reddit.com/r/FortniteBR/new',
    type: 'leaks',
    priority: 1
  },
  {
    name: 'Reddit r/FortniteCompetitive',
    url: 'https://www.reddit.com/r/FortniteCompetitive/new',
    type: 'meta',
    priority: 2
  },
  {
    name: 'FortniteTracker News',
    url: 'https://fortnitetracker.com/news',
    type: 'news',
    priority: 1
  }
];

// ─── Content Detection ────────────────────────────────────────────────────────

async function detectNewContent() {
  console.log('🔍 Scanning Content Sources for new content...');

  const detected = [];

  for (const source of CONTENT_SOURCES) {
    console.log(`   Checking: ${source.name}`);
    
    // Placeholder für echtes Scraping
    // In Production: Firecrawl nutzen für Reddit/FortniteTracker
    
    const results = await searchWeb(`site:${source.url} fortnite ${source.type}`);
    
    if (results.length > 0) {
      detected.push({
        source: source.name,
        type: source.type,
        priority: source.priority,
        items: results.slice(0, 3).map((r) => ({
          title: r.title,
          url: r.url,
          snippet: r.snippet
        }))
      });
    }
  }

  return detected;
}

// ─── Auto-Draft Article Generator ────────────────────────────────────────────

async function autoDraftArticle(contentItem) {
  console.log(`📝 Auto-drafting article: ${contentItem.title}`);

  // SEO-optimierter Titel generieren
  const seoTitle = generateSeoTitle(contentItem.title, contentItem.type);

  // Article Structure basierend auf Priority
  const structure = getArticleStructure(contentItem.priority);

  return {
    title: seoTitle,
    slug: slugify(seoTitle),
    type: contentItem.type,
    priority: contentItem.priority,
    structure,
    sourceUrl: contentItem.url,
    draftedAt: new Date().toISOString()
  };
}

function generateSeoTitle(originalTitle, contentType) {
  const keywords = {
    leaks: ['LEAK', 'RUMOR', 'UNRELEASED', 'DATAMINED'],
    meta: ['META', 'UPDATE', 'NERF', 'BUFF', 'CHANGES'],
    news: ['NEWS', 'UPDATE', 'PATCH', 'SEASON']
  };

  const relevantKeywords = keywords[contentType] || keywords.news;
  const hasKeyword = relevantKeywords.some((k) => originalTitle.toUpperCase().includes(k));

  if (!hasKeyword) {
    return `${relevantKeywords[0]}: ${originalTitle}`;
  }

  return originalTitle;
}

function getArticleStructure(priority) {
  if (priority === 1) {
    return {
      sections: [
        'TL;DR',
        'Was ist passiert?',
        'Details',
        'Was bedeutet das für dich?',
        'Quellen'
      ],
      estimatedReadingTime: '2-3 min'
    };
  }

  return {
    sections: [
      'Einleitung',
      'Hauptteil',
      'Fazit'
    ],
    estimatedReadingTime: '3-5 min'
  };
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 60);
}

// ─── Social Media Post Generator ─────────────────────────────────────────────

async function generateSocialPost(article) {
  console.log(`📱 Generating social posts for: ${article.title}`);

  return {
    twitter: `🚀 ${article.title}\n\n${DOMAIN}/blog/${article.slug}\n\n#Fortnite #FortniteNews`,
    discord: `**${article.title}**\n\n${article.structure.estimatedReadingTime} Lesezeit\n\n${DOMAIN}/blog/${article.slug}`,
    reddit: `[${article.type.toUpperCase()}] ${article.title}\n\n${DOMAIN}/blog/${article.slug}`
  };
}

// ─── Newsletter Inclusion ───────────────────────────────────────────────────

function scheduleNewsletterInclusion(article) {
  if (article.priority === 1) {
    console.log(`📧 Scheduling for next newsletter: ${article.title}`);
    return {
      included: true,
      newsletter: 'weekly-meta-report',
      section: 'breaking-news'
    };
  }

  return {
    included: false,
    reason: 'Priority too low for immediate newsletter inclusion'
  };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const draftFlag = args.includes('--draft');
  const socialFlag = args.includes('--social');

  console.log('🚀 Content Pipeline Automation\n');

  // 1. Detect new content
  const detected = await detectNewContent();

  if (detected.length === 0) {
    console.log('✅ No new content detected');
    return;
  }

  console.log(`\n📋 Detected ${detected.length} content sources with new items`);

  // 2. Process detected content
  for (const source of detected) {
    console.log(`\n📌 ${source.name} (${source.type}, Priority ${source.priority})`);

    for (const item of source.items) {
      if (draftFlag) {
        const article = await autoDraftArticle(item);
        console.log(`   ✅ Drafted: ${article.title}`);

        if (socialFlag) {
          const posts = await generateSocialPost(article);
          console.log(`   📱 Social posts generated`);
        }

        const newsletter = scheduleNewsletterInclusion(article);
        console.log(`   📧 Newsletter: ${newsletter.included ? 'YES' : 'NO'}`);
      } else {
        console.log(`   - ${item.title}`);
      }
    }
  }

  console.log('\n💡 Use --draft to auto-draft articles');
  console.log('💡 Use --social to generate social media posts');
}

main();
