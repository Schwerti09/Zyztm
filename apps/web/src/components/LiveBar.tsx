import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { showToast } from './Toast';

export default function LiveBar() {
  const [viewers, setViewers] = useState(3241);
  const [discord, setDiscord] = useState(1847);
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 34, s: 10 });
  const { coins, setCoins, userEmail, setUserEmail } = useStore();
  const [bonusClaimed, setBonusClaimed] = useState(false);
  const [bonusLoading, setBonusLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);
  const EMAIL_FOCUS_DELAY_MS = 50;

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((v) => v + Math.floor((Math.random() - 0.5) * 100));
      setDiscord((d) => d + Math.floor((Math.random() - 0.5) * 20));
      setTimeLeft((t) => {
        let { h, m, s } = t;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 3; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!userEmail) return;
    fetch(`/api/coins/balance?email=${encodeURIComponent(userEmail)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.coins !== undefined) setCoins(data.coins);
      })
      .catch(() => {});
    const lastClaimed = localStorage.getItem('lastBonusClaimed');
    if (lastClaimed) {
      const d = new Date(lastClaimed);
      const now = new Date();
      if (d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate()) {
        setBonusClaimed(true);
      }
    }
  }, [userEmail, setCoins]);

  useEffect(() => {
    if (showEmailForm) {
      setTimeout(() => emailInputRef.current?.focus(), EMAIL_FOCUS_DELAY_MS);
    }
  }, [showEmailForm]);

  const handleLogin = () => {
    setShowEmailForm(true);
  };

  const handleEmailSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = emailInput.trim().toLowerCase();
    if (!trimmed) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      showToast({ type: 'error', message: 'Bitte eine gültige E-Mail-Adresse eingeben.' });
      return;
    }
    setUserEmail(trimmed);
    setShowEmailForm(false);
    setEmailInput('');
  };

  const handleDailyBonus = async () => {
    if (!userEmail || bonusClaimed || bonusLoading) return;
    setBonusLoading(true);
    try {
      const res = await fetch('/api/coins/daily-bonus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setCoins(data.coins);
        setBonusClaimed(true);
        localStorage.setItem('lastBonusClaimed', new Date().toISOString());
        showToast({ type: 'success', message: `+${data.bonusAwarded} JOJOJO Coins erhalten! 🎁` });
      } else if (res.status === 409) {
        setBonusClaimed(true);
        showToast({ type: 'info', message: 'Bonus heute bereits abgeholt!' });
      } else {
        showToast({ type: 'error', message: data.error || 'Fehler beim Bonus' });
      }
    } catch {
      showToast({ type: 'error', message: 'Verbindungsfehler' });
    } finally {
      setBonusLoading(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-neon-pink/30">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-xs font-cyber">
          <div className="flex items-center gap-4">
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-2 h-2 rounded-full bg-neon-pink shadow-[0_0_8px_#ff0055]" />
              <span className="text-neon-pink font-bold tracking-widest">LIVE AUF KICK</span>
            </motion.div>
            <span className="text-white/50">|</span>
            <span className="text-white/80">👁 {viewers.toLocaleString()} ZUSCHAUER</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span className="text-white/60">
              NÄCHSTER STREAM:{' '}
              <span
                className="text-neon-blue font-bold glitch-text"
                data-text={`${String(timeLeft.h).padStart(2,'0')}:${String(timeLeft.m).padStart(2,'0')}:${String(timeLeft.s).padStart(2,'0')}`}
                style={{ textShadow: '0 0 8px #00f2ff, 0 0 20px #00f2ff' }}
              >
                {String(timeLeft.h).padStart(2,'0')}:{String(timeLeft.m).padStart(2,'0')}:{String(timeLeft.s).padStart(2,'0')}
              </span>
            </span>
            <span className="text-white/80">💬 {discord.toLocaleString()} ONLINE</span>
            <span className="text-white/50">|</span>
            {userEmail ? (
              <div className="flex items-center gap-2">
                <span
                  className="font-bold tracking-widest"
                  style={{ color: '#ff0055', textShadow: '0 0 8px #ff0055' }}
                >
                  💎 JOJOJO COINS: {coins}
                </span>
                <button
                  onClick={handleDailyBonus}
                  disabled={bonusClaimed || bonusLoading}
                  className="text-xs px-2 py-1 rounded border transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    borderColor: bonusClaimed ? 'rgba(255,255,255,0.2)' : '#ff0055',
                    color: bonusClaimed ? 'rgba(255,255,255,0.3)' : '#ff0055',
                    background: bonusClaimed ? 'transparent' : 'rgba(255,0,85,0.1)',
                  }}
                  title={bonusClaimed ? 'Heute bereits abgeholt' : 'Täglichen Bonus holen'}
                >
                  {bonusLoading ? '⏳' : bonusClaimed ? '✅ BONUS' : '🎁 BONUS'}
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="text-xs px-2 py-1 rounded border border-neon-pink/50 text-neon-pink/70 hover:text-neon-pink transition-colors"
              >
                💎 ANMELDEN
              </button>
            )}
          </div>
          <a href="/dashboard" className="text-neon-blue hover:text-white transition-colors text-xs tracking-widest">
            NEXUS →
          </a>
        </div>
      </div>

      {/* Inline email modal */}
      <AnimatePresence>
        {showEmailForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
            onClick={() => setShowEmailForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="cyber-card rounded-xl p-6 w-full max-w-sm"
              style={{ borderColor: 'rgba(255,0,85,0.4)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-cyber text-lg font-bold text-white mb-2">💎 COINS ANMELDEN</h3>
              <p className="text-white/50 text-xs mb-4 font-body">
                Gib deine E-Mail ein, um deinen Coins-Stand zu sehen und den täglichen Bonus abzuholen.
              </p>
              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
                <input
                  ref={emailInputRef}
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="deine@email.de"
                  autoComplete="email"
                  className="w-full bg-black/50 border border-neon-pink/30 rounded px-3 py-2 text-white placeholder-white/30 text-sm focus:outline-none focus:border-neon-pink/70 font-body"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded font-cyber text-xs tracking-widest transition-all"
                    style={{ background: 'rgba(255,0,85,0.2)', border: '1px solid #ff0055', color: '#ff0055' }}
                  >
                    BESTÄTIGEN
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="px-3 py-2 rounded font-cyber text-xs text-white/40 border border-white/15 hover:text-white/60 transition-colors"
                  >
                    ABBRECHEN
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
