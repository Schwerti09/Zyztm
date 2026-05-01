/**
 * POST /.netlify/functions/create-checkout-session
 * Creates a Stripe Checkout session for a Fortnite Nexus Exclusive Drop purchase.
 *
 * Required env vars: STRIPE_SECRET_KEY, FRONTEND_URL
 * Body: { productId: string, email?: string }
 */
import Stripe from 'stripe';

interface RequestBody {
  productId?: string;
  email?: string;
}

const SHOP_PRODUCTS = [
  {
    id: 'soundboard_pro',
    name: 'Nexus Soundboard Pro',
    description: '200+ Fortnite FX, custom sweaty sounds, pro stream-ready pack. Sofort-Download nach Kauf.',
    price: 1999,
    emoji: '🎛️',
  },
  {
    id: 'preset_pack',
    name: 'Pro Preset Pack',
    description: "Fortnite Nexus persönliche Color-Grading LUTs & Lightroom-Presets. Sofort-Download nach Kauf.",
    price: 1499,
    emoji: '🎨',
  },
  {
    id: 'ai_skin_generator',
    name: 'AI Skin & Thumbnail Generator',
    description: 'KI-generierte Fortnite Skins & Thumbnails – unbegrenzte Generierungen für 30 Tage.',
    price: 2499,
    emoji: '🤖',
  },
  {
    id: 'vod_highlight_pack',
    name: 'Exclusive VOD + Highlight Pack',
    description: 'Exklusive Stream-VODs & Highlight-Clips von Fortnite Nexus – nie veröffentlicht, direkt als Download.',
    price: 2999,
    emoji: '🎬',
  },
  {
    id: 'loadout_guide',
    name: 'Custom Loadout Guide + Crosshair Pack',
    description: 'Chapter 6 Meta-Loadouts, Keybinds, Settings & Custom Crosshair-Pack.',
    price: 999,
    emoji: '🎯',
  },
];

export const handler = async (event: { httpMethod: string; body: string | null }) => {
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

  let body: RequestBody;
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

  const product = SHOP_PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    return {
      statusCode: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Produkt nicht gefunden' }),
    };
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2024-04-10' });
  const frontendUrl = process.env.FRONTEND_URL || 'https://fortnitenexus.space';

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
      success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}&product=${product.id}`,
      cancel_url: `${frontendUrl}/#daily-item-shop`,
      customer_email: email || undefined,
      metadata: { productId: product.id },
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    const error = err as Error;
    console.error('Stripe checkout error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Stripe Fehler: ' + error.message }),
    };
  }
};
