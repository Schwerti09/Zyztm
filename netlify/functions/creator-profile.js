/**
 * Netlify Function: creator-profile
 * Serves the central creatorProfile with cache headers.
 * All social account data is sourced from this single endpoint.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('@netlify/functions').Handler} */
export const handler = async (_event, _context) => {
  try {
    // Resolve path relative to the repo root
    const profilePath = resolve(__dirname, '../../apps/web/src/creatorProfile.json');
    const data = JSON.parse(readFileSync(profilePath, 'utf8'));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error('[creator-profile] Failed to read profile:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Could not load creator profile' }),
    };
  }
};
