import { useState } from 'react';
import { motion } from 'framer-motion';

interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  link: string;
  image: string;
  commission: string;
  category: string;
}

const affiliateProducts: AffiliateProduct[] = [
  {
    id: '1',
    name: 'Logitech G Pro X Superlight',
    description: 'Ultraleichtes Gaming-Maus für präzises Gameplay',
    price: '€129.99',
    link: 'https://amzn.to/3example',
    image: '🖱️',
    commission: '5%',
    category: 'Hardware'
  },
  {
    id: '2',
    name: 'SteelSeries Arctis Nova Pro',
    description: 'Premium Gaming-Headset mit kristallklarem Sound',
    price: '€199.99',
    link: 'https://amzn.to/3example',
    image: '🎧',
    commission: '5%',
    category: 'Hardware'
  },
  {
    id: '3',
    name: 'NVIDIA GeForce RTX 4080',
    description: 'High-End GPU für maximale FPS in Fortnite',
    price: '€1,199.00',
    link: 'https://amzn.to/3example',
    image: '💻',
    commission: '2%',
    category: 'Hardware'
  },
  {
    id: '4',
    name: 'Razer BlackWidow V3',
    description: 'Mechanische Gaming-Tastatur mit RGB',
    price: '€149.99',
    link: 'https://amzn.to/3example',
    image: '⌨️',
    commission: '5%',
    category: 'Hardware'
  },
  {
    id: '5',
    name: 'Elgato Stream Deck',
    description: 'Kontrolliere deinen Stream mit einem Klick',
    price: '€149.99',
    link: 'https://amzn.to/3example',
    image: '🎬',
    commission: '5%',
    category: 'Streaming'
  },
  {
    id: '6',
    name: 'OBS Studio Course',
    description: 'Lerne professionelles Streaming',
    price: '€29.99',
    link: 'https://udemy.com/example',
    image: '📚',
    commission: '20%',
    category: 'Education'
  },
];

const NEON_GREEN = '#39FF14';
const GOLD = '#FFD700';

function AffiliateCard({ product, index }: { product: AffiliateProduct; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${GOLD}20 0%, rgba(6,8,15,0.95) 100%)`
          : 'linear-gradient(135deg, rgba(10,12,20,0.92) 0%, rgba(6,8,15,0.96) 100%)',
        border: `1.5px solid ${hovered ? GOLD : GOLD + '30'}`,
        boxShadow: hovered
          ? `0 0 50px ${GOLD}35, 0 10px 50px rgba(0,0,0,0.7)`
          : `0 4px 24px rgba(0,0,0,0.55)`,
        backdropFilter: 'blur(18px)',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
      onClick={() => window.open(product.link, '_blank')}
    >
      <div className="relative z-10 p-6 flex flex-col gap-4">
        <div className="text-6xl text-center mb-2">{product.image}</div>
        
        <div>
          <span className="font-cyber text-[9px] tracking-widest px-2 py-0.5 rounded"
            style={{ background: `${GOLD}20`, color: GOLD, border: `1px solid ${GOLD}40` }}>
            {product.category}
          </span>
          <h3 className="font-cyber text-lg font-bold text-white mt-2">{product.name}</h3>
          <p className="text-white/60 text-sm mt-1">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-cyber text-2xl font-bold text-white">{product.price}</div>
            <div className="text-white/40 text-xs">Affiliate: {product.commission}</div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg font-cyber text-xs tracking-widest font-bold transition-all"
            style={{
              background: hovered ? GOLD : `${GOLD}15`,
              color: hovered ? '#000' : GOLD,
              border: `1px solid ${GOLD}`,
            }}
          >
            KAUFEN
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function AffiliateSection() {
  return (
    <section id="shop" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${GOLD}05 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 80% 100%, ${NEON_GREEN}04 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border font-cyber text-xs tracking-widest"
            style={{ borderColor: `${GOLD}45`, background: `${GOLD}0a`, color: GOLD }}>
            💰 AFFILIATE PARTNER
          </div>
          <h2 className="font-cyber text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            EMPFOHLENE{' '}
            <span style={{ color: GOLD, textShadow: `0 0 20px ${GOLD}, 0 0 50px ${GOLD}60` }}>
              PRODUKTE
            </span>
          </h2>
          <p className="text-white/50 text-sm tracking-wide max-w-2xl mx-auto">
            Gaming-Hardware, Streaming-Equipment und mehr. Kaufe über unsere Links und unterstütze die Community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {affiliateProducts.map((product, index) => (
            <AffiliateCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4">
            <p className="font-cyber text-xs tracking-[0.3em] text-white/30">PARTNERSCHAFT MIT</p>
            <div className="flex flex-wrap justify-center gap-6 text-3xl">
              <span>🛒</span>
              <span>🎮</span>
              <span>🖥️</span>
              <span>📺</span>
            </div>
            <p className="font-cyber text-[10px] text-white/20 tracking-widest">
              AMAZON · STEAM · UDEMY · RAZER
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
