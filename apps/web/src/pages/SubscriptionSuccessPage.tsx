/**
 * Subscription Success Page
 * Displayed after successful Stripe checkout
 */

import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { CheckCircle } from 'lucide-react';

export default function SubscriptionSuccessPage() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
      // Fetch session details from Stripe
      fetch(`/.netlify/functions/get-subscription-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => setSession(data))
        .catch(console.error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="glass rounded-3xl p-8 bg-black/50 backdrop-blur-sm border border-zinc-800 text-center">
          <div className="w-20 h-20 bg-nexus-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-nexus-green" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Subscription erfolgreich!
          </h1>

          <p className="text-zinc-400 mb-8">
            Vielen Dank für dein Upgrade auf Nexus Pro/Elite. Du hast jetzt Zugriff auf alle Premium-Features.
          </p>

          <Link
            href="/dashboard"
            className="inline-block w-full py-3 bg-gradient-to-r from-nexus-orange to-nexus-purple text-white font-bold rounded-xl hover:opacity-90 transition"
          >
            Zum Dashboard
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
