/**
 * NewsletterSignup — Email-Signup-Formular für den Weekly Meta Report
 *
 * Features:
 *   - Email-Validierung
 *   - Netlify Function Backend (/api/newsletter-signup)
 *   - Animierter Success-State
 *   - Referral-Code-Tracking
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsletterSignupProps {
  variant?: 'inline' | 'card' | 'footer';
  referralCode?: string;
}

export default function NewsletterSignup({ variant = 'card', referralCode }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email || !email.includes('@')) {
        setErrorMsg('Bitte gib eine gültige E-Mail-Adresse ein.');
        setStatus('error');
        return;
      }

      setStatus('loading');
      try {
        const res = await fetch('/.netlify/functions/newsletter-signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, referralCode }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Signup fehlgeschlagen');
        }

        setStatus('success');
        setEmail('');
      } catch (err: any) {
        setErrorMsg(err.message || 'Etwas ist schiefgelaufen.');
        setStatus('error');
      }
    },
    [email, referralCode],
  );

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
          placeholder="deine@email.de"
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-body text-sm focus:border-neon-pink focus:outline-none flex-1"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 rounded-lg bg-neon-pink/20 border border-neon-pink/40 font-cyber text-xs tracking-widest text-neon-pink hover:bg-neon-pink/30 transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? '...' : 'ANMELDEN'}
        </button>
        {status === 'success' && <span className="text-green-400 text-sm">✅</span>}
        {status === 'error' && <span className="text-red-400 text-xs">{errorMsg}</span>}
      </form>
    );
  }

  return (
    <div
      className={`rounded-2xl border p-6 ${
        variant === 'footer'
          ? 'border-white/10 bg-white/5'
          : 'border-neon-pink/20 bg-gradient-to-br from-neon-pink/5 to-transparent'
      }`}
    >
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="font-cyber text-xl text-neon-pink mb-2">DU BIST DRIN!</h3>
            <p className="text-sm font-body text-white/60">
              Ab jetzt bekommst du den Weekly Meta Report jeden Montag.
            </p>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="font-cyber text-lg tracking-widest text-neon-pink mb-1">
              📬 WEEKLY META REPORT
            </h3>
            <p className="text-sm font-body text-white/60 mb-4">
              Jeden Montag: Meta-Updates, Pro-Tipps & die besten Tools der Woche. Kostenlos.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                placeholder="deine@email.de"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-body text-sm placeholder:text-white/30 focus:border-neon-pink focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 rounded-xl bg-neon-pink/20 border border-neon-pink/40 font-cyber text-sm tracking-widest text-neon-pink hover:bg-neon-pink/30 active:scale-95 transition-all disabled:opacity-50"
              >
                {status === 'loading' ? 'MOMENT...' : 'ANMELDEN'}
              </button>
            </form>

            {status === 'error' && (
              <p className="text-red-400 text-xs font-body mt-2">{errorMsg}</p>
            )}

            <p className="text-[10px] font-body text-white/30 mt-3">
              Kein Spam. Jederzeit abmeldbar. Datenschutz respektiert.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
