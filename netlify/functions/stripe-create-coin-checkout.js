/**
 * POST /.netlify/functions/stripe-create-coin-checkout
 * Creates a Stripe Checkout session for a JOJOJO Coin package purchase.
 *
 * Required env vars: STRIPE_SECRET_KEY, FRONTEND_URL
 * Body: { packageId: string, email?: string }
 */
import Stripe from 'stripe';

const COIN_PACKAGES = [
  {
    id: 'coins_100',
    name: 'Starter Pack',
    coins: 100,
    price: 100,
    emoji: '💎',
  },
  {
    id: 'coins_500',
    name: 'Fan Pack',
    coins: 500,
    bonus: 50,
    price: 500,
    emoji: '💎💎',
    popular: true,
  },
  {
    id: 'coins_1000',
    name: 'Pro Pack',
    coins: 1000,
    bonus: 200,
    price: 1000,
    emoji: '💎💎💎',
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

  const { packageId, email } = body;
  if (!packageId) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'packageId fehlt' }),
    };
  }

  const pkg = COIN_PACKAGES.find((p) => p.id === packageId);
  if (!pkg) {
    return {
      statusCode: 404,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Coin-Paket nicht gefunden' }),
    };
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2024-04-10' });
  const frontendUrl = process.env.FRONTEND_URL || 'https://zyztm.de';
  const totalCoins = pkg.coins + (pkg.bonus ?? 0);

  try {
    const session = await stripe.checkout.sessions.create({
      automatic_payment_methods: { enabled: true },
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${pkg.emoji} ${pkg.name} – ${totalCoins} JOJOJO Coins`,
              description: `${pkg.coins} Coins${pkg.bonus ? ` + ${pkg.bonus} Bonus-Coins` : ''} für dein Zyztm-Konto`,
            },
            unit_amount: pkg.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${frontendUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/coins`,
      customer_email: email || undefined,
      metadata: { packageId, coinAmount: String(totalCoins), type: 'coins' },
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('Stripe coin checkout error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Stripe Fehler: ' + err.message }),
    };
  }
};
