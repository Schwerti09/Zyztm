import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '@zyztm/shared-types';
import { useStore } from '../store/useStore';
import { showToast } from './Toast';

async function buyProduct(productId: string) {
  try {
    const res = await fetch('/api/stripe/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      showToast({ type: 'error', message: data.error || 'Checkout nicht verfügbar. Bitte versuche es erneut.' });
    }
  } catch {
    showToast({ type: 'error', message: 'Verbindungsfehler. Bitte Internetverbindung prüfen.' });
  }
}

async function buyWithCoins(
  productId: string,
  email: string,
  onSuccess: (remaining: number) => void,
) {
  if (!email) {
    showToast({ type: 'error', message: 'Bitte zuerst E-Mail in der Live-Bar eintragen!' });
    return;
  }
  try {
    const res = await fetch('/api/coins/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, email }),
    });
    const data = await res.json();
    if (res.ok) {
      onSuccess(data.remainingCoins);
      showToast({ type: 'success', message: `✅ ${data.product} mit ${data.coinsSpent} Coins gekauft!` });
    } else if (res.status === 402) {
      showToast({ type: 'error', message: `Zu wenig Coins! Benötigt: ${data.required}, Dein Stand: ${data.balance}` });
    } else {
      showToast({ type: 'error', message: data.error || 'Kauf fehlgeschlagen' });
    }
  } catch {
    showToast({ type: 'error', message: 'Verbindungsfehler' });
  }
}

const RARITY_CONFIG: Record<string, { color: string; label: string; stars: number; bg: string }> = {
  legendary: {
    color: '#ffd700',
    label: 'LEGENDÄR',
    stars: 4,
    bg: 'linear-gradient(135deg, rgba(255,215,0,0.15) 0%, rgba(255,140,0,0.08) 100%)',
  },
  epic: {
    color: '#a335ee',
    label: 'EPISCH',
    stars: 3,
    bg: 'linear-gradient(135deg, rgba(163,53,238,0.15) 0%, rgba(120,30,200,0.08) 100%)',
  },
  rare: {
    color: '#0070dd',
    label: 'SELTEN',
    stars: 2,
    bg: 'linear-gradient(135deg, rgba(0,112,221,0.15) 0%, rgba(0,80,180,0.08) 100%)',
  },
  common: {
    color: '#9d9d9d',
    label: 'GEWÖHNLICH',
    stars: 1,
    bg: 'linear-gradient(135deg, rgba(157,157,157,0.10) 0%, rgba(100,100,100,0.05) 100%)',
  },
};

const productVideos: Record<string, string> = {
  voice_pack: '/vids/produkt1.mp4',
  deepi_ai: '/vids/produkt2.mp4',
  card_booster: '/vids/produkt3.mp4',
  soundboard: '/vids/produkt4.mp4',
  vip: '/vids/produkt5.mp4',
  gaming_bundle: '/vids/produkt6.mp4',
};

function ProductCard({ product, index, userEmail, onCoinPurchase }: {
  product: (typeof PRODUCTS)[0];
  index: number;
  userEmail: string;
  onCoinPurchase: (remaining: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [clipUrl, setClipUrl] = useState<string | null>(null);
  const fetchingRef = useRef(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rarity = RARITY_CONFIG[product.rarity] ?? RARITY_CONFIG.common;
  const fallbackVideo = productVideos[product.id];

  useEffect(() => {
    if (!hovered || clipUrl !== null || fetchingRef.current) return;
    fetchingRef.current = true;
    fetch(`/api/clips/by-tag?tag=${encodeURIComponent(product.tag)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.fallback && data.clip?.url) setClipUrl(data.clip.url);
        else setClipUrl(fallbackVideo ?? '');
      })
      .catch(() => setClipUrl(fallbackVideo ?? ''))
      .finally(() => { fetchingRef.current = false; });
  }, [hovered, clipUrl, product.id, fallbackVideo]);

  const videoSrc = clipUrl ?? fallbackVideo;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateY(x * 14);
    setRotateX(-y * 14);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotateX(0);
    setRotateY(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const rarityStars = '★'.repeat(rarity.stars) + '☆'.repeat(4 - rarity.stars);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        perspective: 800,
        transformStyle: 'preserve-3d',
      }}
      className="group cursor-pointer"
    >
      <div
        className="relative rounded-xl flex flex-col overflow-hidden"
        style={{
          background: `linear-gradient(160deg, rgba(10,12,20,0.92) 0%, rgba(6,8,15,0.96) 100%)`,
          border: `2px solid ${rarity.color}60`,
          boxShadow: hovered
            ? `0 0 30px ${rarity.color}50, 0 0 60px ${rarity.color}20, inset 0 0 30px ${rarity.color}10`
            : `0 4px 20px rgba(0,0,0,0.6), inset 0 0 20px ${rarity.color}05`,
          transform: hovered ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)` : 'rotateX(0deg) rotateY(0deg)',
          transition: hovered ? 'box-shadow 0.2s ease' : 'box-shadow 0.4s ease, transform 0.4s ease',
        }}
      >
        {/* Rarity banner */}
        <div
          className="w-full py-1.5 px-4 flex items-center justify-between"
          style={{ background: `linear-gradient(90deg, ${rarity.color}30, ${rarity.color}15, ${rarity.color}05)` }}
        >
          <span
            className="font-cyber text-xs font-bold tracking-[0.2em]"
            style={{ color: rarity.color, textShadow: `0 0 8px ${rarity.color}` }}
          >
            {rarity.label}
          </span>
          <span className="text-xs tracking-wider" style={{ color: `${rarity.color}cc` }}>
            {rarityStars}
          </span>
        </div>

        {/* Top shine line */}
        <div
          className="absolute top-8 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${rarity.color}80, transparent)` }}
        />

        {/* Video overlay on hover */}
        {videoSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-0 overflow-hidden rounded-xl"
          >
            <video
              ref={videoRef}
              src={videoSrc}
              loop muted playsInline
              className="w-full h-full object-cover"
              style={{ opacity: 0.15 }}
            />
          </motion.div>
        )}

        {/* Shimmer effect on hover */}
        {hovered && (
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: `radial-gradient(ellipse at ${50 + rotateY * 2}% ${50 - rotateX * 2}%, ${rarity.color}20 0%, transparent 65%)`,
            }}
          />
        )}

        <div className="relative z-10 p-6 flex flex-col h-full">
          {/* Icon area */}
          <div className="flex items-center justify-center mb-5">
            <motion.div
              animate={hovered ? { scale: 1.15, rotate: [-3, 3, -3] } : { scale: 1, rotate: 0 }}
              transition={hovered ? { duration: 0.6, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.3 }}
              className="text-6xl drop-shadow-lg"
              style={{ filter: hovered ? `drop-shadow(0 0 12px ${rarity.color})` : 'none' }}
            >
              {product.emoji}
            </motion.div>
          </div>

          <h3 className="font-cyber text-lg font-bold text-white mb-2 text-center leading-tight">
            {product.name}
          </h3>
          <p className="text-white/55 text-xs mb-5 flex-grow text-center leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="text-center mb-4">
            <span
              className="font-cyber text-2xl font-bold"
              style={{ color: rarity.color, textShadow: `0 0 12px ${rarity.color}` }}
            >
              {product.priceLabel}
            </span>
          </div>

          {/* Buy button */}
          <button
            onClick={() => buyProduct(product.id)}
            className="w-full py-2.5 rounded font-cyber text-xs tracking-widest font-bold mb-2 transition-all duration-200"
            style={{
              background: hovered ? `linear-gradient(90deg, ${rarity.color}, ${rarity.color}cc)` : 'transparent',
              border: `1px solid ${rarity.color}80`,
              color: hovered ? '#000' : rarity.color,
              boxShadow: hovered ? `0 0 15px ${rarity.color}50` : 'none',
            }}
          >
            🛒 JETZT KAUFEN
          </button>
          <button
            onClick={() => buyWithCoins(product.id, userEmail, onCoinPurchase)}
            className="w-full text-xs py-2 rounded border font-cyber tracking-widest transition-colors hover:bg-white/5"
            style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.45)' }}
          >
            💎 MIT COINS ({product.coinPrice})
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductGrid() {
  const { userEmail, setCoins } = useStore();

  return (
    <section id="marketplace" className="py-20 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-pink/3 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full border border-neon-gold/30 bg-neon-gold/5">
            <span className="text-neon-gold text-xs font-cyber tracking-widest">🎮 FORTNITE ITEM SHOP</span>
          </div>
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-neon-pink neon-text-pink">LOOT</span> PODS
          </h2>
          <p className="text-white/50 mb-3">Sichere dir exklusive digitale Items – je seltener, desto mächtiger!</p>
          {/* Rarity legend */}
          <div className="flex flex-wrap justify-center gap-3 text-xs font-cyber mt-4">
            {(['legendary', 'epic', 'rare', 'common'] as const).map((r) => (
              <span
                key={r}
                className="px-3 py-1 rounded-full border"
                style={{ borderColor: `${RARITY_CONFIG[r].color}50`, color: RARITY_CONFIG[r].color, background: `${RARITY_CONFIG[r].color}10` }}
              >
                {RARITY_CONFIG[r].label}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-10">
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              userEmail={userEmail}
              onCoinPurchase={setCoins}
            />
          ))}
        </div>

        {/* Payment methods info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-white/40 text-xs font-cyber tracking-widest mb-3">BEZAHLMETHODEN</p>
          <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
            <span className="px-3 py-1 border border-white/10 rounded text-white/60">💳 Kreditkarte</span>
            <span className="px-3 py-1 border border-white/10 rounded text-white/60">🛒 Klarna</span>
            <span className="px-3 py-1 border border-yellow-500/30 rounded text-yellow-400/80">
              🎫 Paysafecard – an jeder Tankstelle/Kiosk erhältlich!
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

