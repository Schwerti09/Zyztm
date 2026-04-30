/**
 * DB Client für Discord Bot — Neon Serverless Postgres
 *
 * Minimaler Neon DB Client für Discord Bot (Wishlists, Challenges)
 */

import neon from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

/**
 * Führt eine Query aus und gibt die Ergebnisse zurück
 */
export async function query(text, params = []) {
  try {
    return await sql(text, params);
  } catch (err) {
    console.error('DB Query Error:', err);
    throw err;
  }
}

/**
 * Testet die DB-Verbindung
 */
export async function testConnection() {
  try {
    const result = await query('SELECT NOW()');
    console.log('✅ DB Connection OK:', result[0].now);
    return true;
  } catch (err) {
    console.warn('⚠️  DB Connection failed:', err.message);
    return false;
  }
}
