/**
 * GET /robots.txt → /.netlify/functions/robots
 *
 * Serves a robots.txt that:
 * - Allows all well-behaved crawlers
 * - Blocks admin routes
 * - Points to the dynamic sitemap
 */

const BASE_URL = 'https://fortnitenexus.space';

export const handler = async () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /admin/',
    'Disallow: /api/',
    '',
    `Sitemap: ${BASE_URL}/sitemap.xml`,
  ].join('\n');

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain; charset=UTF-8',
      'Cache-Control': 'public, max-age=86400',
    },
    body,
  };
};
