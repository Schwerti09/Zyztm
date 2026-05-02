import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { COIN_PACKAGES } from '@nexus/shared-types';
import { useStore } from '../store/useStore';
import { showToast } from '../components/Toast';

const NEON_PINK = '#ff0055';
const NEON_BLUE = '#00f2ff';
const NEON_GOLD = '#ffd700';

const HOW_TO_EARN = [
  { icon: '🎁', title: 'Täglicher Login-Bonus', desc: '10 Coins täglich – einfach einloggen!', color: NEON_PINK },
  { icon: '💳', title: 'Coins kaufen', desc: '100 Coins = 1€ – direkt über Stripe', color: NEON_GOLD },
  { icon: '🏆', title: 'Events & Gewinnspiele', desc: 'Werden angekündigt – stay tuned!', color: NEON_BLUE },
];

const HOW_TO_SPEND = [
  { icon: '🛒', title: 'Produkte kaufen', desc: 'z.B. Voice Synth für 500 Coins', color: NEON_PINK },
  { icon: '🗳️', title: "Gamer's Choice abstimmen", desc: '1 Coin pro Stimme', color: NEON_BLUE },
  { icon: '❤️', title: 'Clips liken', desc: '1 Coin pro Like', color: '#ff4499' },
  { icon: '✨', title: 'Bald: Noch mehr!', desc: 'Neue Features kommen…', color: NEON_GOLD },
];

async function startCoinCheckout(packageId: string, email: string) {
  try {
    const res = await fetch('/api/stripe/create-coin-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ packageId, email: email || undefined }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      showToast({ type: 'error', message: data.error || 'Checkout nicht verfügbar' });
    }
  } catch {
    showToast({ type: 'error', message: 'Verbindungsfehler' });
  }
}

export default function CoinsPage() {
  const { coins, userEmail } = useStore();
  const [loading, setLoading] = useState<string | null>(null);

  const handleBuy = async (packageId: string) => {
    setLoading(packageId);
    await startCoinCheckout(packageId, userEmail);
    setLoading(null);
  };

  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-neon-pink/30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <a className="font-cyber text-neon-pink text-sm tracking-widest hover:text-white transition-colors">
              ← ZURÜCK ZUM NEXUS
            </a>
          </Link>
          {userEmail && (
            <span className="font-cyber text-sm" style={{ color: NEON_PINK, textShadow: `0 0 8px ${NEON_PINK}` }}>
              💎 DEIN STAND: {coins} COINS
            </span>
          )}
        </div>
      </div>

      <div className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-7xl mb-6 inline-block"
              style={{ filter: `drop-shadow(0 0 20px ${NEON_GOLD})` }}
            >
              💎
            </motion.div>
            <h1 className="font-cyber text-4xl md:text-6xl font-bold text-white mb-4">
              NEXUS{' '}
              <span
                className="glitch-text"
                data-text="COINS"
                style={{ color: NEON_GOLD, textShadow: `0 0 20px ${NEON_GOLD}, 0 0 40px ${NEON_GOLD}` }}
              >
                COINS
              </span>
            </h1>
            <p className="text-white/60 text-lg font-body max-w-2xl mx-auto">
              Deine Währung im Nexus-Universum – sammle, kaufe und nutze Coins für exklusive Features!
            </p>
          </motion.div>

          {/* What are coins */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cyber-card rounded-xl p-8 mb-12"
            style={{ borderColor: `${NEON_GOLD}30` }}
          >
            <h2 className="font-cyber text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span style={{ color: NEON_GOLD }}>💡</span> WAS SIND NEXUS COINS?
            </h2>
            <p className="text-white/60 font-body leading-relaxed">
              NEXUS Coins sind die virtuelle Währung im Nexus-Universum. Mit ihnen kannst du digitale Produkte
              kaufen, bei Features mitmachen und abstimmen – alles ohne echte Transaktionen für jeden einzelnen
              Klick. Sammle Coins täglich, kaufe Pakete oder gewinne sie bei Events!
            </p>
          </motion.div>

          {/* How to earn / spend */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Earn */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-cyber text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span style={{ color: NEON_PINK }}>⬆️</span> WIE BEKOMME ICH COINS?
              </h2>
              <div className="space-y-4">
                {HOW_TO_EARN.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="cyber-card rounded-lg p-4 flex items-start gap-4"
                    style={{ borderColor: `${item.color}25` }}
                  >
                    <span className="text-3xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-cyber text-sm font-bold" style={{ color: item.color }}>{item.title}</p>
                      <p className="text-white/50 text-sm font-body mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Spend */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-cyber text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span style={{ color: NEON_BLUE }}>💸</span> WOFÜR KANN ICH COINS AUSGEBEN?
              </h2>
              <div className="space-y-4">
                {HOW_TO_SPEND.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="cyber-card rounded-lg p-4 flex items-start gap-4"
                    style={{ borderColor: `${item.color}25` }}
                  >
                    <span className="text-3xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-cyber text-sm font-bold" style={{ color: item.color }}>{item.title}</p>
                      <p className="text-white/50 text-sm font-body mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Coin packages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full border border-neon-gold/30 bg-neon-gold/5">
                <span className="text-neon-gold text-xs font-cyber tracking-widest">🛍️ COIN SHOP</span>
              </div>
              <h2 className="font-cyber text-3xl md:text-4xl font-bold text-white mb-3">
                COINS <span style={{ color: NEON_GOLD, textShadow: `0 0 15px ${NEON_GOLD}` }}>KAUFEN</span>
              </h2>
              <p className="text-white/50 text-sm">100 Coins = 1€ · Sicher über Stripe · Sofort gutgeschrieben</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {COIN_PACKAGES.map((pkg, i) => {
                const totalCoins = pkg.coins + (pkg.bonus ?? 0);
                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    className="relative rounded-xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(160deg, rgba(10,12,20,0.95) 0%, rgba(6,8,15,0.98) 100%)',
                      border: `2px solid ${pkg.popular ? NEON_GOLD : `${NEON_GOLD}40`}`,
                      boxShadow: pkg.popular
                        ? `0 0 30px ${NEON_GOLD}40, 0 0 60px ${NEON_GOLD}15`
                        : '0 4px 20px rgba(0,0,0,0.5)',
                    }}
                  >
                    {pkg.popular && (
                      <div
                        className="w-full py-1 text-center font-cyber text-xs tracking-widest font-bold"
                        style={{ background: `linear-gradient(90deg, ${NEON_GOLD}30, ${NEON_GOLD}15)`, color: NEON_GOLD }}
                      >
                        ⭐ BELIEBTESTES PAKET
                      </div>
                    )}
                    <div className="p-6 text-center">
                      <div className="text-5xl mb-4">{pkg.emoji}</div>
                      <h3 className="font-cyber text-lg font-bold text-white mb-1">{pkg.name}</h3>
                      <div className="font-cyber text-3xl font-bold mb-1" style={{ color: NEON_GOLD, textShadow: `0 0 12px ${NEON_GOLD}` }}>
                        {totalCoins}
                      </div>
                      <p className="text-white/40 text-xs font-cyber mb-1">JOJOJO COINS</p>
                      {pkg.bonus && (
                        <p className="text-xs font-cyber mb-3" style={{ color: NEON_PINK }}>
                          inkl. +{pkg.bonus} Bonus-Coins!
                        </p>
                      )}
                      <div className="font-cyber text-xl font-bold text-white mb-5">{pkg.priceLabel}</div>
                      <button
                        onClick={() => handleBuy(pkg.id)}
                        disabled={loading === pkg.id}
                        className="w-full py-3 rounded font-cyber text-xs tracking-widest font-bold transition-all duration-200 disabled:opacity-50"
                        style={{
                          background: `linear-gradient(90deg, ${NEON_GOLD}, ${NEON_GOLD}cc)`,
                          color: '#000',
                          boxShadow: `0 0 15px ${NEON_GOLD}50`,
                        }}
                      >
                        {loading === pkg.id ? '⏳ WIRD GELADEN…' : '💳 JETZT KAUFEN'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Balance info */}
          {userEmail && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div
                className="inline-block cyber-card rounded-xl px-8 py-6"
                style={{ borderColor: `${NEON_PINK}30` }}
              >
                <p className="text-white/50 text-xs font-cyber tracking-widest mb-2">DEIN AKTUELLER STAND</p>
                <p
                  className="font-cyber text-4xl font-bold"
                  style={{ color: NEON_PINK, textShadow: `0 0 20px ${NEON_PINK}` }}
                >
                  💎 {coins} COINS
                </p>
                <p className="text-white/30 text-xs mt-2 font-body">{userEmail}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
