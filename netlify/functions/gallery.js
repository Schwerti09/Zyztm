/**
 * GET /.netlify/functions/gallery
 * Returns the latest 10 clips sorted by created_at DESC.
 *
 * Required env vars: DATABASE_URL
 */
import { neon } from '@neondatabase/serverless';

export const handler = async () => {
  if (!process.env.DATABASE_URL) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'DATABASE_URL env var not configured' }),
    };
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    let rows;
    try {
      rows = await sql`
        SELECT id, title, thumbnail, url, source, views, created_at
          FROM clips
         ORDER BY created_at DESC
         LIMIT 10
      `;
    } catch (colErr) {
      // Fallback when source column has not been migrated yet (PostgreSQL 42703)
      if (colErr.code === '42703') {
        rows = await sql`
          SELECT id, title, thumbnail, url, 'kick' AS source, views, created_at
            FROM clips
           ORDER BY created_at DESC
           LIMIT 10
        `;
      } else {
        throw colErr;
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clips: rows }),
    };
  } catch (err) {
    console.error('[gallery] Error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
