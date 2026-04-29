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

const MOCK_CREATORS: Creator[] = [
  {
    id: 1,
    name: 'NinjaGermany',
    creator_code: 'NINJAGERMANY',
    display_name: 'NinjaGermany',
    avatar_url: 'https://i.pravatar.cc/150?img=1',
    bio: 'Deutscher Fortnite-Creator mit Fokus auf Tipps, Guides und Meta-Analysis. Täglich neue Content auf YouTube und Twitch.',
    social_links: { twitter: 'https://twitter.com/ninjagermany', youtube: 'https://youtube.com/ninjagermany', twitch: 'https://twitch.tv/ninjagermany' },
    is_verified: true,
    total_revenue: 2450.50,
    total_code_uses: 12500,
    created_at: '2024-01-01'
  },
  {
    id: 2,
    name: 'FortniteDE_Pro',
    creator_code: 'FORTNITEDEPRO',
    display_name: 'FortniteDE_Pro',
    avatar_url: 'https://i.pravatar.cc/150?img=2',
    bio: 'Pro-Spieler mit kompetitivem Fokus. Ranked-Strategien, Pro-Matches und Meta-Updates. FNCS-Qualifikant und Cash-Cup Gewinner.',
    social_links: { twitter: 'https://twitter.com/fortnitedepro', youtube: 'https://youtube.com/fortnitedepro', twitch: 'https://twitch.tv/fortnitedepro' },
    is_verified: true,
    total_revenue: 1890.75,
    total_code_uses: 9800,
    created_at: '2024-01-01'
  },
  {
    id: 3,
    name: 'GermanFortnite',
    creator_code: 'GERMANFORTNITE',
    display_name: 'GermanFortnite',
    avatar_url: 'https://i.pravatar.cc/150?img=3',
    bio: 'Wachsende deutsche Fortnite-Community mit News, Updates und Community-Content. Täglich Patch-Notes und Meta-Updates.',
    social_links: { twitter: 'https://twitter.com/germanfortnite', youtube: 'https://youtube.com/germanfortnite', discord: 'https://discord.gg/germanfortnite' },
    is_verified: true,
    total_revenue: 1250.25,
    total_code_uses: 7500,
    created_at: '2024-01-01'
  },
  {
    id: 4,
    name: 'EpicDE',
    creator_code: 'EPICDE',
    display_name: 'EpicDE',
    avatar_url: 'https://i.pravatar.cc/150?img=4',
    bio: 'High-Quality Content mit Production-Value. Guides, Tutorials und Montages. Fortnite-Content auf professionellem Niveau.',
    social_links: { twitter: 'https://twitter.com/epicde', youtube: 'https://youtube.com/epicde', instagram: 'https://instagram.com/epicde' },
    is_verified: true,
    total_revenue: 980.00,
    total_code_uses: 6200,
    created_at: '2024-01-01'
  },
  {
    id: 5,
    name: 'BattleRoyaleDE',
    creator_code: 'BATTLEG',
    display_name: 'BattleRoyaleDE',
    avatar_url: 'https://i.pravatar.cc/150?img=5',
    bio: 'Nische BR-Content mit Fokus auf Fortnite. BR-Strategien, Meta und Competitive-Content. Für echte Battle Royale Fans.',
    social_links: { twitter: 'https://twitter.com/battleroyalede', youtube: 'https://youtube.com/battleroyalede' },
    is_verified: false,
    total_revenue: 750.50,
    total_code_uses: 4800,
    created_at: '2024-01-01'
  },
  {
    id: 6,
    name: 'SettingsMasterDE',
    creator_code: 'SETTINGSDE',
    display_name: 'SettingsMasterDE',
    avatar_url: 'https://i.pravatar.cc/150?img=6',
    bio: 'Settings-Spezialist mit Expertise für alle Plattformen. PC, Console, Mobile - perfekte Settings für maximale Performance.',
    social_links: { twitter: 'https://twitter.com/settingsmasterde', youtube: 'https://youtube.com/settingsmasterde' },
    is_verified: false,
    total_revenue: 620.00,
    total_code_uses: 4100,
    created_at: '2024-01-01'
  },
  {
    id: 7,
    name: 'MobileFortniteDE',
    creator_code: 'MOBILEDE',
    display_name: 'MobileFortniteDE',
    avatar_url: 'https://i.pravatar.cc/150?img=7',
    bio: 'Mobile-Spezialist mit Nischen-Fokus. Mobile-Tips, Settings und Meta für Touch-Controls. Mobile Gaming auf höchstem Niveau.',
    social_links: { twitter: 'https://twitter.com/mobilefortnitede', youtube: 'https://youtube.com/mobilefortnitede' },
    is_verified: false,
    total_revenue: 540.75,
    total_code_uses: 3800,
    created_at: '2024-01-01'
  },
  {
    id: 8,
    name: 'ConsoleFortniteDE',
    creator_code: 'CONSOLEDE',
    display_name: 'ConsoleFortniteDE',
    avatar_url: 'https://i.pravatar.cc/150?img=8',
    bio: 'Console-Spezialist mit Controller-Fokus. Controller-Tips, Settings und Meta für PlayStation, Xbox und Nintendo Switch.',
    social_links: { twitter: 'https://twitter.com/consolefortnitede', youtube: 'https://youtube.com/consolefortnitede' },
    is_verified: false,
    total_revenue: 480.25,
    total_code_uses: 3200,
    created_at: '2024-01-01'
  },
  {
    id: 9,
    name: 'CreativeMapsDE',
    creator_code: 'CREATIVEMAPS',
    display_name: 'CreativeMapsDE',
    avatar_url: 'https://i.pravatar.cc/150?img=9',
    bio: 'Creative Map Spezialist. Map-Recommendations, Codes und Reviews für die besten Fortnite Creative Maps.',
    social_links: { twitter: 'https://twitter.com/creativemapsde', youtube: 'https://youtube.com/creativemapsde', discord: 'https://discord.gg/creativemapsde' },
    is_verified: false,
    total_revenue: 410.00,
    total_code_uses: 2900,
    created_at: '2024-01-01'
  },
  {
    id: 10,
    name: 'FortniteNewsDE',
    creator_code: 'NEWSDE',
    display_name: 'FortniteNewsDE',
    avatar_url: 'https://i.pravatar.cc/150?img=10',
    bio: 'News-Spezialist mit schnellen Updates. Patch-Notes, Leaks und Events - immer aktuell mit den neuesten Fortnite-News.',
    social_links: { twitter: 'https://twitter.com/fortnitenewsde', youtube: 'https://youtube.com/fortnitenewsde' },
    is_verified: false,
    total_revenue: 350.50,
    total_code_uses: 2600,
    created_at: '2024-01-01'
  },
  {
    id: 11,
    name: 'AimMasterDE',
    creator_code: 'AIMMASTER',
    display_name: 'AimMasterDE',
    avatar_url: 'https://i.pravatar.cc/150?img=11',
    bio: 'Aim-Training Spezialist. Aim-Lab Übungen, Sensitivity Guides und Aim-Verbesserung für alle Skill-Levels.',
    social_links: { twitter: 'https://twitter.com/aimmasterde', youtube: 'https://youtube.com/aimmasterde' },
    is_verified: false,
    total_revenue: 290.00,
    total_code_uses: 2200,
    created_at: '2024-01-01'
  },
  {
    id: 12,
    name: 'BuildingProDE',
    creator_code: 'BUILDINGPRO',
    display_name: 'BuildingProDE',
    avatar_url: 'https://i.pravatar.cc/150?img=12',
    bio: 'Building-Experte mit Tutorials und Advanced Techniques. Box Fighting, 90s und Turtle Tunneling - alles über Building.',
    social_links: { twitter: 'https://twitter.com/buildingprode', youtube: 'https://youtube.com/buildingprode' },
    is_verified: false,
    total_revenue: 250.75,
    total_code_uses: 1900,
    created_at: '2024-01-01'
  },
  {
    id: 13,
    name: 'RankedGuideDE',
    creator_code: 'RANKEDGUIDE',
    display_name: 'RankedGuideDE',
    avatar_url: 'https://i.pravatar.cc/150?img=13',
    bio: 'Ranked-Spezialist mit Strategien und Tips. Bronze bis Champion - Ranked-Guides für alle Ränge.',
    social_links: { twitter: 'https://twitter.com/rankedguidede', youtube: 'https://youtube.com/rankedguidede' },
    is_verified: false,
    total_revenue: 220.50,
    total_code_uses: 1700,
    created_at: '2024-01-01'
  },
  {
    id: 14,
    name: 'MetaAnalysisDE',
    creator_code: 'METAANALYSIS',
    display_name: 'MetaAnalysisDE',
    avatar_url: 'https://i.pravatar.cc/150?img=14',
    bio: 'Meta-Analyst mit datenbasierten Insights. Weapon-Tier Lists, Loadouts und Meta-Verschiebungen basierend auf Daten.',
    social_links: { twitter: 'https://twitter.com/metaanalysisde', youtube: 'https://youtube.com/metaanalysisde' },
    is_verified: false,
    total_revenue: 195.00,
    total_code_uses: 1500,
    created_at: '2024-01-01'
  },
  {
    id: 15,
    name: 'FortniteClipsDE',
    creator_code: 'FORTNITECLIPS',
    display_name: 'FortniteClipsDE',
    avatar_url: 'https://i.pravatar.cc/150?img=15',
    bio: 'Highlights und Clips aus der deutschen Community. Die besten Plays, Funny Moments und Pro-Clips.',
    social_links: { twitter: 'https://twitter.com/fortniteclipsde', youtube: 'https://youtube.com/fortniteclipsde', tiktok: 'https://tiktok.com/fortniteclipsde' },
    is_verified: false,
    total_revenue: 175.25,
    total_code_uses: 1400,
    created_at: '2024-01-01'
  },
  {
    id: 16,
    name: 'ZoneWarsDE',
    creator_code: 'ZONEWARS',
    display_name: 'ZoneWarsDE',
    avatar_url: 'https://i.pravatar.cc/150?img=16',
    bio: 'Zone Wars Spezialist. Zone Wars Strategien, Tips und Tricks für Competitive Zone Wars Matches.',
    social_links: { twitter: 'https://twitter.com/zonewarsde', youtube: 'https://youtube.com/zonewarsde' },
    is_verified: false,
    total_revenue: 160.00,
    total_code_uses: 1300,
    created_at: '2024-01-01'
  },
  {
    id: 17,
    name: 'BuildFightDE',
    creator_code: 'BUILDFIGHT',
    display_name: 'BuildFightDE',
    avatar_url: 'https://i.pravatar.cc/150?img=17',
    bio: 'Build Fight Expert. Box Fighting, Edit-Courses und Advanced Building-Techniken für Competitive Players.',
    social_links: { twitter: 'https://twitter.com/buildfightde', youtube: 'https://youtube.com/buildfightde' },
    is_verified: false,
    total_revenue: 145.75,
    total_code_uses: 1200,
    created_at: '2024-01-01'
  },
  {
    id: 18,
    name: 'ControllerProDE',
    creator_code: 'CONTROLLERPRO',
    display_name: 'ControllerProDE',
    avatar_url: 'https://i.pravatar.cc/150?img=18',
    bio: 'Controller-Spezialist. Aim Assist, Controller-Settings und Competitive Controller-Strategien.',
    social_links: { twitter: 'https://twitter.com/controllerprode', youtube: 'https://youtube.com/controllerprode' },
    is_verified: false,
    total_revenue: 130.50,
    total_code_uses: 1100,
    created_at: '2024-01-01'
  },
  {
    id: 19,
    name: 'TacticalDE',
    creator_code: 'TACTICAL',
    display_name: 'TacticalDE',
    avatar_url: 'https://i.pravatar.cc/150?img=19',
    bio: 'Tactical Gameplay Spezialist. Positioning, Rotations und Late-Game-Strategien für Competitive Matches.',
    social_links: { twitter: 'https://twitter.com/tacticalde', youtube: 'https://youtube.com/tacticalde' },
    is_verified: false,
    total_revenue: 120.00,
    total_code_uses: 1000,
    created_at: '2024-01-01'
  },
  {
    id: 20,
    name: 'FortniteTipsDE',
    creator_code: 'FORTNITETIPS',
    display_name: 'FortniteTipsDE',
    avatar_url: 'https://i.pravatar.cc/150?img=20',
    bio: 'All-round Fortnite-Tips für alle Spieler. Quick-Tips, Tricks und tägliche Verbesserungen für dein Gameplay.',
    social_links: { twitter: 'https://twitter.com/fortnitetipsde', youtube: 'https://youtube.com/fortnitetipsde' },
    is_verified: false,
    total_revenue: 110.25,
    total_code_uses: 900,
    created_at: '2024-01-01'
  }
];

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
      // Fallback zu Mock-Daten wenn API nicht verfügbar
      setCreators(MOCK_CREATORS);
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
