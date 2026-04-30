/**
 * Twitter API v2 Client — Minimal OAuth 1.0a User Context
 *
 * Postet Tweets via POST /2/tweets.
 * Benötigt 4 ENV-Variablen:
 *   TWITTER_API_KEY
 *   TWITTER_API_SECRET
 *   TWITTER_ACCESS_TOKEN
 *   TWITTER_ACCESS_SECRET
 *
 * Nutzt native Node crypto für OAuth-Signatur (kein npm-Paket nötig).
 */

import crypto from 'node:crypto';

const API_BASE = 'https://api.twitter.com';

/**
 * Generiert die OAuth 1.0a Signatur-Header.
 */
function buildOAuthHeader(method, url, body, credentials) {
  const {
    apiKey,
    apiSecret,
    accessToken,
    accessSecret,
  } = credentials;

  const oauthParams = {
    oauth_consumer_key: apiKey,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: accessToken,
    oauth_version: '1.0',
  };

  // Parameter-String (sorted)
  const allParams = { ...oauthParams };
  const paramString = Object.keys(allParams)
    .sort()
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(allParams[k])}`)
    .join('&');

  // Signature Base String
  const signatureBase = [
    method.toUpperCase(),
    encodeURIComponent(url),
    encodeURIComponent(paramString),
  ].join('&');

  // Signing Key
  const signingKey = `${encodeURIComponent(apiSecret)}&${encodeURIComponent(accessSecret)}`;

  // HMAC-SHA1
  const signature = crypto
    .createHmac('sha1', signingKey)
    .update(signatureBase)
    .digest('base64');

  oauthParams.oauth_signature = signature;

  // Build Authorization header
  const authHeader =
    'OAuth ' +
    Object.keys(oauthParams)
      .sort()
      .map((k) => `${encodeURIComponent(k)}="${encodeURIComponent(oauthParams[k])}"`)
      .join(', ');

  return authHeader;
}

/**
 * Postet einen Tweet.
 * @param {string} text - Tweet-Text (max 280 Zeichen)
 * @returns {Promise<{id: string, text: string}>}
 */
export async function postTweet(text) {
  const credentials = {
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
  };

  if (!credentials.apiKey || !credentials.apiSecret || !credentials.accessToken || !credentials.accessSecret) {
    throw new Error(
      'Missing Twitter credentials. Set TWITTER_API_KEY, TWITTER_API_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_SECRET.',
    );
  }

  const url = `${API_BASE}/2/tweets`;
  const body = JSON.stringify({ text });

  const authHeader = buildOAuthHeader('POST', url, body, credentials);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    },
    body,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Twitter API ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.data; // { id, text }
}

/**
 * Dry-Run: Gibt den Tweet-Text aus statt ihn zu posten.
 */
export function dryRunTweet(text) {
  console.log('─'.repeat(60));
  console.log('DRY RUN — Tweet würde gepostet:');
  console.log('─'.repeat(60));
  console.log(text);
  console.log('─'.repeat(60));
  console.log(`Zeichen: ${text.length}/280`);
  if (text.length > 280) {
    console.warn('⚠️  Tweet ist zu lang!');
  }
  console.log();
}
