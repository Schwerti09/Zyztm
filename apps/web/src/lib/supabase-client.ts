/**
 * Supabase Client Configuration
 * Server-side and client-side instances
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Environment variables - support both Vite (browser) and Node (functions)
const getEnvVar = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
    return (import.meta as any).env[key];
  }
  return undefined;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL') || getEnvVar('SUPABASE_URL') || '';
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || getEnvVar('SUPABASE_ANON_KEY') || '';
const supabaseServiceKey = getEnvVar('SUPABASE_SERVICE_ROLE_KEY') || '';

// Validate configuration (only warn at runtime, not build time)
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn('Missing Supabase environment variables');
}

/**
 * Client-side Supabase instance (RLS enabled)
 * Use this in React components
 * NOTE: Untyped intentionally - use service-level type guards instead
 */
export const supabaseClient: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);

/**
 * Server-side Supabase instance (Service Role, bypasses RLS)
 * ONLY use this in Netlify Functions or server contexts
 */
export const supabaseAdmin: SupabaseClient = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : supabaseClient; // Fallback to client if no service key (development)

/**
 * Check if Supabase is properly configured
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

/**
 * Get storage URL for a file
 */
export function getStorageUrl(bucket: string, path: string): string {
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

/**
 * Generate a signed URL for temporary access (server-side only)
 */
export async function generateSignedUrl(
  bucket: string, 
  path: string, 
  expiresIn: number = 3600
): Promise<string | null> {
  try {
    const { data, error } = await supabaseAdmin
      .storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);
    
    if (error) throw error;
    return data?.signedUrl || null;
  } catch (err) {
    console.error('Error generating signed URL:', err);
    return null;
  }
}
