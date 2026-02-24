import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { z } from 'zod';
import { eq, sql } from 'drizzle-orm';
import { PRODUCTS, COIN_PACKAGES } from '@zyztm/shared-types';
import { db } from '../db';
import { users, coinTransactions } from '../db/schema';
import { resolveUser } from '../utils/resolveUser';

const router = Router();

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: '2024-04-10' }) : null;

const checkoutSchema = z.object({
  productId: z.string(),
  userId: z.string().optional(),
  email: z.string().email().optional(),
});

const coinCheckoutSchema = z.object({
  packageId: z.string(),
  email: z.string().email().optional(),
});

router.post('/create-checkout', async (req: Request, res: Response) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Stripe ist nicht konfiguriert. Bitte STRIPE_SECRET_KEY setzen.' });
  }
  try {
    const { productId, userId, email } = checkoutSchema.parse(req.body);
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'giropay', 'klarna'],
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
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/`,
      customer_email: email,
      metadata: { productId, userId: userId || '' },
    });

    return res.json({ url: session.url });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/create-coin-checkout', async (req: Request, res: Response) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Stripe ist nicht konfiguriert. Bitte STRIPE_SECRET_KEY setzen.' });
  }
  try {
    const { packageId, email } = coinCheckoutSchema.parse(req.body);
    const pkg = COIN_PACKAGES.find((p) => p.id === packageId);
    if (!pkg) {
      return res.status(404).json({ error: 'Coin-Paket nicht gefunden' });
    }

    const totalCoins = pkg.coins + (pkg.bonus ?? 0);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'giropay', 'klarna'],
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
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/coins`,
      customer_email: email,
      metadata: { packageId, coinAmount: String(totalCoins), type: 'coins' },
    });

    return res.json({ url: session.url });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error('Stripe coin checkout error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/webhook', async (req: Request, res: Response) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Stripe ist nicht konfiguriert.' });
  }
  const sig = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log('Payment completed for session:', session.id);

    // Credit coins if this was a coin purchase
    if (session.metadata?.type === 'coins' && session.metadata?.coinAmount) {
      const coinAmount = parseInt(session.metadata.coinAmount, 10);
      const email = session.customer_email;
      if (email && coinAmount > 0) {
        try {
          const user = await resolveUser(undefined, email);
          if (user) {
            await db
              .update(users)
              .set({ coins: sql`${users.coins} + ${coinAmount}` })
              .where(eq(users.id, user.id));
            await db.insert(coinTransactions).values({
              userId: user.id,
              amount: coinAmount,
              type: 'purchase',
              reason: `Coin-Kauf: ${coinAmount} JOJOJO Coins`,
            });
            console.log(`Credited ${coinAmount} coins to user ${email}`);
          }
        } catch (err) {
          console.error('Failed to credit coins:', err);
        }
      }
    } else {
      // TODO: Update database with product purchase record
    }
  }

  return res.json({ received: true });
});

export default router;
