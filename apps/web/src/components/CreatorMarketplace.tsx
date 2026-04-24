import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Creator {
  id: number;
  name: string;
  creator_code: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  social_links: Record<string, string>;
  is_verified: boolean;
  total_revenue: number;
  total_code_uses: number;
  created_at: string;
}

const NEON_GREEN = '#39FF14';
const GOLD = '#FFD700';
const PINK = '#FF2D78';

function CreatorCard({ creator, index, onSelect }: { creator: Creator; index: number; onSelect: (code: string) => void }) {
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
          ? `linear-gradient(135deg, ${NEON_GREEN}20 0%, rgba(6,8,15,0.95) 100%)`
          : 'linear-gradient(135deg, rgba(10,12,20,0.92) 0%, rgba(6,8,15,0.96) 100%)',
        border: `1.5px solid ${hovered ? NEON_GREEN : NEON_GREEN + '30'}`,
        boxShadow: hovered
          ? `0 0 50px ${NEON_GREEN}35, 0 10px 50px rgba(0,0,0,0.7)`
          : `0 4px 24px rgba(0,0,0,0.55)`,
        backdropFilter: 'blur(18px)',
        transition: 'all 0.3s ease',
      }}
      onClick={() => onSelect(creator.creator_code)}
    >
      {creator.is_verified && (
        <div className="absolute top-3 right-3 z-10">
          <span className="font-cyber text-[9px] tracking-widest px-2 py-0.5 rounded"
            style={{ background: GOLD, color: '#000', fontWeight: 800 }}>✓ VERIFIED</span>
        </div>
      )}

      <div className="relative z-10 p-6 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{
              background: hovered ? `radial-gradient(circle, ${NEON_GREEN}30 0%, transparent 70%)` : 'rgba(255,255,255,0.05)',
              border: `2px solid ${NEON_GREEN}50`,
            }}>
            {creator.avatar_url ? (
              <img src={creator.avatar_url} alt={creator.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              '🎮'
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-cyber text-lg font-bold text-white">
              {creator.display_name || creator.name}
            </h3>
            {creator.is_verified && (
              <span className="text-xs" style={{ color: GOLD }}>✓ Verifizierter Creator</span>
            )}
          </div>
        </div>

        {creator.bio && (
          <p className="text-white/60 text-sm leading-relaxed">{creator.bio}</p>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 rounded-lg" style={{ background: `${NEON_GREEN}10`, border: `1px solid ${NEON_GREEN}30` }}>
            <div className="font-cyber text-xl font-bold" style={{ color: NEON_GREEN }}>
              €{creator.total_revenue.toFixed(2)}
            </div>
            <div className="text-white/50 text-xs">Gesamtumsatz</div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ background: `${PINK}10`, border: `1px solid ${PINK}30` }}>
            <div className="font-cyber text-xl font-bold" style={{ color: PINK }}>
              {creator.total_code_uses.toLocaleString()}
            </div>
            <div className="text-white/50 text-xs">Code Nutungen</div>
          </div>
        </div>

        <div className="p-4 rounded-lg text-center"
          style={{
            background: `linear-gradient(135deg, ${NEON_GREEN}15, ${GOLD}10)`,
            border: `1px solid ${NEON_GREEN}40`,
          }}>
          <div className="font-cyber text-xs text-white/50 mb-1 tracking-widest">CREATOR CODE</div>
          <div className="font-cyber text-3xl font-black tracking-widest" style={{ color: NEON_GREEN, textShadow: `0 0 20px ${NEON_GREEN}` }}>
            {creator.creator_code}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl font-cyber text-xs tracking-widest font-black transition-all duration-200"
          style={{
            background: hovered
              ? `linear-gradient(90deg, ${NEON_GREEN}, #22cc08)`
              : `${NEON_GREEN}15`,
            border: `1.5px solid ${NEON_GREEN}`,
            color: hovered ? '#000' : NEON_GREEN,
            boxShadow: hovered ? `0 0 24px ${NEON_GREEN}55` : 'none',
          }}
        >
          ⚡ CODE NUTZEN & SUPPORTEN
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function CreatorMarketplace() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const res = await fetch('/api/creators');
      const data = await res.json();
      if (data.creators) {
        setCreators(data.creators);
      }
    } catch (err) {
      console.error('Error fetching creators:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCreator = async (code: string) => {
    try {
      const res = await fetch('/api/creators/code/' + code.toUpperCase());
      const data = await res.json();
      if (data.creator) {
        setSelectedCreator(data.creator);
        setShowModal(true);
      }
    } catch (err) {
      console.error('Error selecting creator:', err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCreator(null);
  };

  return (
    <section id="creators" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${NEON_GREEN}05 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 80% 100%, ${GOLD}04 0%, transparent 50%)`,
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
            ⭐ CREATOR MARKETPLACE
          </div>
          <h2 className="font-cyber text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            SUPPORTE DEINE{' '}
            <span style={{ color: NEON_GREEN, textShadow: `0 0 20px ${NEON_GREEN}, 0 0 50px ${NEON_GREEN}60` }}>
              LIEBLINGSCREATORS
            </span>
          </h2>
          <p className="text-white/50 text-sm tracking-wide max-w-2xl mx-auto">
            Wähle deinen Creator Code im Fortnite Item Shop und unterstütze deutsche Content Creator. 5-10% gehen direkt an den Creator.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="font-cyber text-neon-green animate-pulse">LADE CREATORS...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((creator, index) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                index={index}
                onSelect={handleSelectCreator}
              />
            ))}
          </div>
        )}

        {!loading && creators.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/50 font-cyber">Keine Creator gefunden.</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4">
            <p className="font-cyber text-xs tracking-[0.3em] text-white/30">BIST DU CREATOR?</p>
            <motion.a
              href="https://discord.gg/fortnitenexus"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: `0 0 60px ${NEON_GREEN}50` }}
              whileTap={{ scale: 0.97 }}
              className="font-cyber text-sm font-black tracking-widest px-8 py-4 rounded-2xl transition-all"
              style={{
                background: `linear-gradient(135deg, ${NEON_GREEN}, #22cc08)`,
                color: '#000',
                boxShadow: `0 0 30px ${NEON_GREEN}40, 0 6px 24px rgba(0,0,0,0.5)`,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              🚀 WERDE CREATOR
            </motion.a>
            <p className="font-cyber text-[10px] text-white/20 tracking-widest">
              COMMUNITY POWER · REVENUE SHARE · WACHSTUM
            </p>
          </div>
        </motion.div>
      </div>

      {showModal && selectedCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)' }}
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full rounded-2xl p-8 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(10,12,20,0.98) 0%, rgba(6,8,15,0.99) 100%)',
              border: `2px solid ${NEON_GREEN}`,
              boxShadow: `0 0 60px ${NEON_GREEN}40`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-6xl mb-4">✅</div>
            <h3 className="font-cyber text-2xl font-black text-white mb-2">
              CODE AUSGEWÄHLT
            </h3>
            <p className="text-white/60 mb-6">
              Du unterstützt <span className="font-bold" style={{ color: NEON_GREEN }}>{selectedCreator.display_name || selectedCreator.name}</span>!
            </p>
            <div className="p-6 rounded-xl mb-6"
              style={{
                background: `linear-gradient(135deg, ${NEON_GREEN}15, ${GOLD}10)`,
                border: `1px solid ${NEON_GREEN}40`,
              }}
            >
              <div className="font-cyber text-xs text-white/50 mb-2 tracking-widest">DEIN CREATOR CODE</div>
              <div className="font-cyber text-4xl font-black tracking-widest" style={{ color: NEON_GREEN, textShadow: `0 0 30px ${NEON_GREEN}` }}>
                {selectedCreator.creator_code}
              </div>
            </div>
            <p className="text-white/40 text-sm mb-6">
              Gib diesen Code im Fortnite Item Shop ein, um den Creator zu unterstützen.
            </p>
            <button
              onClick={handleCloseModal}
              className="w-full py-3 rounded-xl font-cyber text-xs tracking-widest font-black transition-all duration-200"
              style={{
                background: `linear-gradient(90deg, ${NEON_GREEN}, #22cc08)`,
                color: '#000',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              ✓ VERSTANDEN
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
