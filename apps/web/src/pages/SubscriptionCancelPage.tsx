/**
 * Subscription Cancel Page
 * Displayed when user cancels Stripe checkout
 */

import { Link } from 'wouter';
import { XCircle } from 'lucide-react';

export default function SubscriptionCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="glass rounded-3xl p-8 bg-black/50 backdrop-blur-sm border border-zinc-800 text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Subscription abgebrochen
          </h1>

          <p className="text-zinc-400 mb-8">
            Du hast den Checkout-Prozess abgebrochen. Keine Sorge, du kannst jederzeit zurückkommen und es erneut versuchen.
          </p>

          <Link
            href="/subscription"
            className="inline-block w-full py-3 bg-gradient-to-r from-nexus-orange to-nexus-purple text-white font-bold rounded-xl hover:opacity-90 transition"
          >
            Zurück zu den Plänen
          </Link>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-sm">
            ← Zurück zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}
