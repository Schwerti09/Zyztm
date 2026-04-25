/**
 * Netlify Function for Sitemap Generation
 * Returns XML sitemap with all regional variants
 */

import { generateSitemapXML, getSitemapStats } from '../src/lib/sitemap-generator';

export const handler = async () => {
  try {
    const sitemapXML = generateSitemapXML();
    const stats = getSitemapStats();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
      body: sitemapXML,
    };
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate sitemap' }),
    };
  }
};

export const config = {
  path: '/sitemap',
  method: 'GET',
};
