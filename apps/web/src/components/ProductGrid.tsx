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
    if (data.url) window.location.href = data.url;
    else alert('Checkout nicht verfügbar. Bitte API konfigurieren.');
  } catch {
    alert('Demo-Modus: Kein Backend verbunden. In der Produktion wird Stripe verwendet!');
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

const rarityColors: Record<string, string> = {
  voice: '#00f2ff',
  ai: '#ff0055',
  cards: '#ffd700',
  soundboard: '#9b59b6',
  vip: '#ffd700',
  bundle: '#ff6b00',
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [clipUrl, setClipUrl] = useState<string | null>(null);
  const fetchingRef = useRef(false);
  const accentColor = rarityColors[product.category];
  // Static fallback video (used when no API clip is available)
  const fallbackVideo = productVideos[product.id];

  // Fetch a product-tagged clip on first hover
  useEffect(() => {
    if (!hovered || clipUrl !== null || fetchingRef.current) return;
    fetchingRef.current = true;
    fetch(`/api/clips/by-tag?tag=${encodeURIComponent(product.tag)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.fallback && data.clip?.url) {
          setClipUrl(data.clip.url);
        } else {
          // Use static fallback so we don't re-fetch
          setClipUrl(fallbackVideo ?? '');
        }
      })
      .catch(() => setClipUrl(fallbackVideo ?? ''))
      .finally(() => { fetchingRef.current = false; });
  }, [hovered, clipUrl, product.id, fallbackVideo]);

  const videoSrc = clipUrl ?? fallbackVideo;

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.play().catch((err) => {
      console.warn('Video playback failed:', err);
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-lg p-6 flex flex-col group overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(13,17,23,0.75) 0%, rgba(10,12,21,0.80) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${accentColor}40`,
        boxShadow: hovered
          ? `0 8px 40px ${accentColor}30, inset 0 0 30px ${accentColor}08`
          : `0 4px 20px rgba(0,0,0,0.4), inset 0 0 20px ${accentColor}05`,
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />

      {/* Hover video overlay */}
      {videoSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-0 rounded-lg overflow-hidden"
        >
          <video
            ref={videoRef}
            src={videoSrc}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ opacity: 0.18 }}
          />
        </motion.div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <span className="text-5xl">{product.emoji}</span>
          <span
            className="text-xs font-cyber px-2 py-1 border tracking-widest"
            style={{ color: accentColor, borderColor: `${accentColor}50` }}
          >
            {product.category.toUpperCase()}
          </span>
        </div>
        <h3 className="font-cyber text-xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-white/60 text-sm mb-6 flex-grow">{product.description}</p>
        <div className="flex items-center justify-between">
          <span
            className="font-cyber text-2xl font-bold"
            style={{ color: accentColor, textShadow: `0 0 10px ${accentColor}` }}
          >
            {product.priceLabel}
          </span>
          <button
            onClick={() => buyProduct(product.id)}
            className="btn-primary rounded text-xs py-2 px-4 opacity-80 group-hover:opacity-100"
          >
            KAUFEN
          </button>
        </div>
        <button
          onClick={() => buyWithCoins(product.id, userEmail, onCoinPurchase)}
          className="mt-3 w-full text-xs py-2 px-4 rounded border font-cyber tracking-widest transition-colors hover:bg-[#ff0055]/10"
          style={{ borderColor: '#ff005550', color: '#ff0055' }}
        >
          💎 MIT COINS KAUFEN ({product.coinPrice} Coins)
        </button>
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
          className="text-center mb-12"
        >
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-neon-pink neon-text-pink">NEXUS</span> MARKETPLACE
          </h2>
          <p className="text-white/50">Exklusive digitale Produkte für die Community</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <span className="px-3 py-1 border border-white/10 rounded text-white/60">🏦 Giropay</span>
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

