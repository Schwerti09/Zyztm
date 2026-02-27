/**
 * GET /.netlify/functions/verify-checkout-session?session_id=cs_xxx
 * Verifies a Stripe Checkout session and returns product/coin info.
 *
 * Required env vars: STRIPE_SECRET_KEY
 */
import Stripe from 'stripe';

const PRODUCTS = [
  { id: 'vip', name: "Zyztm's Loot Llama", emoji: '🦙', priceLabel: '€4,99/Monat' },
  { id: 'voice_pack', name: 'Victory Royale Voice Pack', emoji: '🎤', priceLabel: '€4,99' },
  { id: 'zyztm_bro', name: 'Zyztm Bro – Dein Gaming-Kumpel', emoji: '🤖', priceLabel: '€9,99/Monat' },
  { id: 'card_booster', name: 'Clutch Moments Cards', emoji: '🃏', priceLabel: '€1,99' },
  { id: 'soundboard', name: 'Zyztm Soundboard Pro', emoji: '🔊', priceLabel: '€4,99' },
  // create-checkout-session.ts products
  { id: 'soundboard_pro', name: 'Zyztm Soundboard Pro', emoji: '🎛️', priceLabel: '€19,99' },
  { id: 'preset_pack', name: 'Pro Preset Pack', emoji: '🎨', priceLabel: '€14,99' },
  { id: 'ai_skin_generator', name: 'AI Skin & Thumbnail Generator', emoji: '🤖', priceLabel: '€24,99' },
  { id: 'vod_highlight_pack', name: 'Exclusive VOD + Highlight Pack', emoji: '🎬', priceLabel: '€29,99' },
  { id: 'loadout_guide', name: 'Custom Loadout Guide + Crosshair Pack', emoji: '🎯', priceLabel: '€9,99' },
];

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: CORS_HEADERS, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return {
      statusCode: 503,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Stripe ist nicht konfiguriert.' }),
    };
  }

  const sessionId = event.queryStringParameters?.session_id;
  if (!sessionId) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'session_id fehlt' }),
    };
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2024-04-10' });

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (err) {
    console.error('Stripe session retrieve error:', err);
    return {
      statusCode: 404,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Session nicht gefunden' }),
    };
  }

  if (session.payment_status !== 'paid') {
    return {
      statusCode: 402,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Zahlung noch nicht abgeschlossen', status: session.payment_status }),
    };
  }

  const meta = session.metadata ?? {};

  // Coin purchase
  if (meta.type === 'coins') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        type: 'coins',
        packageId: meta.packageId,
        coinAmount: Number(meta.coinAmount ?? 0),
        name: `${meta.coinAmount} JOJOJO Coins`,
        emoji: '💎',
        amountTotal: session.amount_total,
      }),
    };
  }

  // Product purchase
  const productId = meta.productId;
  const product = PRODUCTS.find((p) => p.id === productId) ?? null;

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      type: 'product',
      productId,
      name: product?.name ?? session.line_items?.data?.[0]?.description ?? 'Dein Produkt',
      emoji: product?.emoji ?? '🎮',
      priceLabel: product?.priceLabel ?? (session.amount_total != null ? `€${(session.amount_total / 100).toFixed(2)}` : ''),
      amountTotal: session.amount_total,
    }),
  };
};
