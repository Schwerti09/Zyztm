import { motion } from 'framer-motion';
import { PRODUCTS } from '@zyztm/shared-types';

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

const rarityColors: Record<string, string> = {
  voice: '#00f2ff',
  ai: '#ff0055',
  cards: '#ffd700',
  soundboard: '#9b59b6',
  vip: '#ffd700',
  bundle: '#ff6b00',
};

export default function ProductGrid() {
  return (
    <section className="py-20 px-6 relative">
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
          {PRODUCTS.map((product, i) => {
            const accentColor = rarityColors[product.category];
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="cyber-card rounded-lg p-6 flex flex-col group"
                style={{ borderColor: `${accentColor}30` }}
              >
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
