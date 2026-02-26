import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

const PRODUCT_INFO: Record<string, { name: string; icon: string; price: string }> = {
  soundboard_pro: { name: 'Zyztm Soundboard Pro', icon: '🎛️', price: '€19.99' },
  preset_pack: { name: 'Pro Preset Pack', icon: '🎨', price: '€14.99' },
  ai_skin_generator: { name: 'AI Skin & Thumbnail Generator', icon: '🤖', price: '€24.99' },
  vod_highlight_pack: { name: 'Exclusive VOD + Highlight Pack', icon: '🎬', price: '€29.99' },
  loadout_guide: { name: 'Custom Loadout Guide + Crosshair Pack', icon: '🎯', price: '€9.99' },
};

const NEON_GREEN = '#39FF14';
const GOLD = '#FFD700';

interface PurchasedItem {
  productId: string;
  name: string;
  icon: string;
  price: string;
  purchasedAt: string;
}

export default function SuccessPage() {
  const [, navigate] = useLocation();
  const [aiReady, setAiReady] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const productId = params.get('product') ?? '';
  const product = PRODUCT_INFO[productId] ?? null;

  // Save purchase to localStorage and simulate AI delivery
  useEffect(() => {
    if (!product || !productId) return;
    try {
      const existing: PurchasedItem[] = JSON.parse(localStorage.getItem('zyztm_purchases') || '[]');
      const alreadyOwned = existing.some((p) => p.productId === productId);
      if (!alreadyOwned) {
        const updated: PurchasedItem[] = [
          ...existing,
          { productId, name: product.name, icon: product.icon, price: product.price, purchasedAt: new Date().toISOString() },
        ];
        localStorage.setItem('zyztm_purchases', JSON.stringify(updated));
      }
    } catch { /* noop */ }

    // Simulate AI generation delay
    const t = setTimeout(() => setAiReady(true), 2200);
    return () => clearTimeout(t);
  }, [productId, product]);

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-6 relative overflow-hidden">
      {/* Victory Royale particle burst */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{ opacity: 0, scale: 0, x: '50vw', y: '50vh' }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              x: `${20 + Math.random() * 60}vw`,
              y: `${10 + Math.random() * 80}vh`,
            }}
            transition={{ duration: 1.2 + Math.random() * 0.8, delay: Math.random() * 0.5 }}
            style={{
              width: 8 + Math.random() * 14,
              height: 8 + Math.random() * 14,
              background: i % 2 === 0 ? NEON_GREEN : GOLD,
              boxShadow: `0 0 12px ${i % 2 === 0 ? NEON_GREEN : GOLD}`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        className="cyber-card rounded-2xl p-10 text-center max-w-lg w-full relative"
        style={{
          background: 'linear-gradient(135deg, rgba(57,255,20,0.08) 0%, rgba(6,8,15,0.97) 50%, rgba(255,215,0,0.06) 100%)',
          border: `2px solid ${NEON_GREEN}`,
          boxShadow: `0 0 60px ${NEON_GREEN}20`,
        }}
      >
        {/* Victory Royale header */}
        <motion.div
          animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.25, 1] }}
          transition={{ duration: 0.7, repeat: 1 }}
          className="text-8xl mb-4"
        >
          🏆
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-cyber text-3xl font-black mb-1"
          style={{ color: GOLD, textShadow: `0 0 20px ${GOLD}` }}
        >
          VICTORY ROYALE!
        </motion.h1>
        <p className="font-cyber text-xs tracking-widest mb-6" style={{ color: NEON_GREEN }}>
          ZAHLUNG ERFOLGREICH
        </p>

        {/* Product card */}
        {product ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl p-5 mb-6 flex flex-col items-center gap-3"
            style={{
              background: `linear-gradient(135deg, ${NEON_GREEN}12, rgba(6,8,15,0.9))`,
              border: `1.5px solid ${NEON_GREEN}40`,
            }}
          >
            <span className="text-5xl">{product.icon}</span>
            <h2 className="font-cyber text-base font-black text-white">{product.name}</h2>
            <span className="font-cyber text-xl font-black" style={{ color: GOLD }}>{product.price}</span>

            {/* AI delivery simulation */}
            {!aiReady ? (
              <div className="flex items-center gap-2 mt-1">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 rounded-full border-2"
                  style={{ borderColor: `${NEON_GREEN} transparent transparent transparent` }}
                />
                <span className="font-cyber text-[11px]" style={{ color: NEON_GREEN }}>
                  KI generiert deinen Download…
                </span>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-2 w-full"
              >
                <p className="font-cyber text-xs" style={{ color: NEON_GREEN }}>
                  ✅ Dein {product.name} ist bereit!
                </p>
                <motion.button
                  onClick={() => alert(`Dein ${product.name} Download wird vorbereitet. Du erhältst eine E-Mail mit dem direkten Download-Link.`)}
                  whileHover={{ scale: 1.04, boxShadow: `0 0 30px ${NEON_GREEN}55` }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 rounded-xl font-cyber text-sm font-black tracking-widest text-center"
                  style={{
                    background: `linear-gradient(135deg, ${NEON_GREEN}, #22cc08)`,
                    color: '#000',
                    cursor: 'pointer',
                    border: 'none',
                    boxShadow: `0 0 20px ${NEON_GREEN}40`,
                  }}
                >
                  ⬇ DOWNLOAD STARTEN
                </motion.button>
                <p className="font-cyber text-[9px] text-white/30 tracking-widest">
                  DOWNLOAD-LINK WURDE AN DEINE E-MAIL GESCHICKT
                </p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <p className="text-white/70 mb-6">
            Krass Diggah! Dein Kauf war erfolgreich. Deine digitalen Produkte werden in Kürze aktiviert.
          </p>
        )}

        <button onClick={() => navigate('/dashboard')} className="btn-primary rounded w-full mb-3">
          ZUM DASHBOARD
        </button>
        <button onClick={() => navigate('/')} className="btn-secondary rounded w-full">
          ZURÜCK ZUM NEXUS
        </button>
      </motion.div>
    </div>
  );
}
