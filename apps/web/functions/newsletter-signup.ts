/**
 * Newsletter Signup
 * Speichert E-Mail-Adressen für den Weekly Meta Report in der Neon DB.
 *
 * Endpoint: POST /.netlify/functions/newsletter-signup
 * Body: { email: string, referralCode?: string }
 */

import type { Handler, HandlerEvent } from '@netlify/functions';
import { getDb } from '../src/lib/db-client';

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { email, referralCode } = JSON.parse(event.body || '{}');

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Ungültige E-Mail-Adresse' }),
      };
    }

    const normalizedEmail = email.toLowerCase().trim();

    const sql = getDb();

    // Upsert: existierende Subscriber nicht doppelt anlegen
    await sql`
      INSERT INTO newsletter_subscribers (email, referral_code, subscribed_at)
      VALUES (${normalizedEmail}, ${referralCode || null}, NOW())
      ON CONFLICT (email) DO UPDATE SET
        referral_code = COALESCE(EXCLUDED.referral_code, newsletter_subscribers.referral_code),
        updated_at = NOW()
    `;

    // Referral-Count aktualisieren wenn Code vorhanden
    if (referralCode) {
      await sql`
        UPDATE newsletter_subscribers
        SET referral_count = referral_count + 1
        WHERE email = (
          SELECT email FROM newsletter_subscribers
          WHERE referral_code_own = ${referralCode}
          LIMIT 1
        )
      `;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Anmeldung erfolgreich' }),
    };
  } catch (err: any) {
    console.error('Newsletter Signup Error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Interner Fehler' }),
    };
  }
};
