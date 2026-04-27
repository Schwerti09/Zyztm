/**
 * Database Client - Neon Serverless Postgres
 * Replaces Supabase SDK with direct Neon connection
 * Used in Netlify Functions (server-side only)
 */

import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

let _sql: NeonQueryFunction<false, false> | null = null;

/**
 * Get the Neon SQL tagged-template client (lazy init)
 */
export function getDb(): NeonQueryFunction<false, false> {
  if (!_sql) {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('DATABASE_URL environment variable is required');
    }
    _sql = neon(dbUrl);
  }
  return _sql;
}

/**
 * Check if the database is properly configured
 */
export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Generate a download URL for a product file
 * Replaces Supabase Storage signed URLs
 *
 * Files are served via a Netlify Function that validates the token
 */
export function generateDownloadUrl(
  orderId: string,
  token: string,
  baseUrl?: string
): string {
  const base = baseUrl || process.env.URL || 'https://fortnitenexus.com';
  return `${base}/api/download/${orderId}?token=${token}`;
}
