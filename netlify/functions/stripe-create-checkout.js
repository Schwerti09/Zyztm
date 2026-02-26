/**
 * POST /.netlify/functions/stripe-create-checkout
 * Creates a Stripe Checkout session for a product purchase.
 *
 * Required env vars: STRIPE_SECRET_KEY, FRONTEND_URL
 * Body: { productId: string, email?: string }
 */
import Stripe from 'stripe';

const PRODUCTS = [
  {
    id: 'vip',
    name: "Zyztm's Loot Llama",
    description: 'Monatliche Überraschungsbox mit exklusiven digitalen Goodies: Wallpaper, Clips & Emotes – automatisch per E-Mail!',
    price: 499,
    emoji: '🦙',
  },
  {
    id: 'voice_pack',
    name: 'Victory Royale Voice Pack',
    description: '50 Sprach-Credits + exklusive Sieg-Sprüche von Zyztm – powered by ElevenLabs AI.',
    price: 499,
    emoji: '🎤',
  },
  {
    id: 'zyztm_bro',
    name: 'Zyztm Bro – Dein Gaming-Kumpel',
    description: 'KI-Chatbot, der wie Zyztm labert: Fortnite-Tipps, Stream-Storys und mehr – powered by Gemini AI.',
    price: 999,
    emoji: '🤖',
  },
  {
    id: 'card_booster',
    name: 'Clutch Moments Cards',
    description: 'Booster-Pack mit 5 digitalen Sammelkarten aus deinen Lieblings-Stream-Momenten von Zyztm.',
    price: 199,
    emoji: '🃏',
  },
  {
    id: 'soundboard',
    name: 'Zyztm Soundboard Pro',
    description: '50+ Zyztm-Sprüche als Hotkeys für Discord & Stream – sofort als Download verfügbar.',
    price: 499,
    emoji: '🔊',
  },
];

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Stripe ist nicht konfiguriert. Bitte STRIPE_SECRET_KEY setzen.' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Ungültiger Request-Body' }),
    };
  }

  const { productId, email } = body;
  if (!productId) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'productId fehlt' }),
    };
  }

  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    return {
      statusCode: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Produkt nicht gefunden' }),
    };
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2024-04-10' });
  const frontendUrl = process.env.FRONTEND_URL || 'https://zyztm.de';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'klarna'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${product.emoji} ${product.name}`,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/`,
      customer_email: email || undefined,
      metadata: { productId },
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Stripe Fehler: ' + err.message }),
    };
  }
};
