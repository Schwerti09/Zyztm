import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Feature {
  id: string;
  label: string;
  votes: number;
  recentVoters?: string[];
}

// Simulated voter name pool for demo (shows community engagement feel)
const DEMO_VOTERS = [
  'xXProGamerXx', 'FortniteKing99', 'ZyztmFan2000', 'NightOwl_GG', 'DropMasterZ',
  'VictoryRoyale7', 'StreamLegend', 'ChillBro420', 'TryhardMode', 'LootLlamaFan',
  'KickViewer42', 'DiggahSupport', 'NexusPlayer', 'ClutchKing', 'SniperElite99',
];

function getRecentVoters(seed: number, count: number): string[] {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(DEMO_VOTERS[(seed + i * 3) % DEMO_VOTERS.length]);
  }
  return result;
}

export default function GamerVoting() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('gamer-votes');
      return stored ? new Set<string>(JSON.parse(stored) as string[]) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });
  const [voting, setVoting] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/vote')
      .then((r) => r.json())
      .then((data: Feature[]) => setFeatures(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleVote = async (featureId: string) => {
    if (voted.has(featureId) || voting) return;
    setVoting(featureId);
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featureId }),
      });
      const data = (await res.json()) as { votes?: number; error?: string };
      if (res.ok && data.votes !== undefined) {
        setFeatures((prev) =>
          prev.map((f) => (f.id === featureId ? { ...f, votes: data.votes as number } : f)),
        );
        const newVoted = new Set(voted).add(featureId);
        setVoted(newVoted);
        localStorage.setItem('gamer-votes', JSON.stringify([...newVoted]));
        setNotification('✅ Stimme gezählt!');
      } else if (res.status === 409) {
        const newVoted = new Set(voted).add(featureId);
        setVoted(newVoted);
        localStorage.setItem('gamer-votes', JSON.stringify([...newVoted]));
        setNotification('ℹ️ Bereits abgestimmt');
      } else {
        setNotification('❌ Fehler beim Abstimmen');
      }
    } catch {
      setNotification('❌ Verbindungsfehler');
    } finally {
      setVoting(null);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const totalVotes = features.reduce((acc, f) => acc + f.votes, 0);

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            GAMER'S <span className="text-neon-gold" style={{ textShadow: '0 0 20px #ffd700' }}>CHOICE</span>
          </h2>
          <p className="text-white/50">Was soll als nächstes kommen? Du entscheidest!</p>
          {totalVotes > 0 && (
            <p className="text-white/30 text-xs font-cyber mt-2 tracking-widest">
              {totalVotes.toLocaleString()} STIMMEN INSGESAMT
            </p>
          )}
        </motion.div>

        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded font-cyber text-sm tracking-widest"
              style={{
                background: 'rgba(0,0,0,0.9)',
                border: '1px solid rgba(255,215,0,0.4)',
                color: '#ffd700',
              }}
            >
              {notification}
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="cyber-card rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-white/10 rounded mb-3 w-3/4" />
                <div className="h-2 bg-white/5 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => {
              const isVoted = voted.has(feature.id);
              const isVoting = voting === feature.id;
              const percentage =
                totalVotes > 0 ? Math.round((feature.votes / totalVotes) * 100) : 0;

              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="cyber-card rounded-lg p-6 relative overflow-hidden group"
                  style={{
                    borderColor: isVoted ? 'rgba(255,215,0,0.4)' : 'rgba(255,255,255,0.1)',
                    background: 'linear-gradient(135deg, rgba(13,17,23,0.75) 0%, rgba(10,12,21,0.80) 100%)',
                  }}
                >
                  {/* vote bar fill */}
                  <div
                    className="absolute inset-0 origin-left transition-all duration-700"
                    style={{
                      background: isVoted
                        ? 'rgba(255,215,0,0.06)'
                        : 'rgba(0,242,255,0.04)',
                      width: `${percentage}%`,
                    }}
                  />

                  <div className="relative z-10">
                    <p className="font-cyber text-base font-bold text-white mb-3">
                      {feature.label}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-1.5 rounded-full transition-all duration-700"
                          style={{
                            width: `${Math.max(percentage * 1.2, 8)}px`,
                            background: isVoted ? '#ffd700' : '#00f2ff',
                            boxShadow: isVoted ? '0 0 6px #ffd700' : '0 0 6px #00f2ff',
                          }}
                        />
                        <span className="text-white/50 text-xs font-cyber">
                          {feature.votes} Stimmen ({percentage}%)
                        </span>
                      </div>
                      <button
                        onClick={() => handleVote(feature.id)}
                        disabled={isVoted || !!voting}
                        className="text-xs font-cyber px-4 py-2 rounded border transition-all duration-200 disabled:cursor-not-allowed"
                        style={{
                          borderColor: isVoted ? 'rgba(255,215,0,0.4)' : 'rgba(0,242,255,0.4)',
                          color: isVoted ? '#ffd700' : '#00f2ff',
                          background: isVoted ? 'rgba(255,215,0,0.08)' : 'transparent',
                          opacity: voting && !isVoting ? 0.5 : 1,
                        }}
                      >
                        {isVoting ? '⏳' : isVoted ? '✓ GEWÄHLT' : 'WÄHLEN'}
                      </button>
                    </div>
                    {/* Recent voters */}
                    {feature.votes > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {getRecentVoters(i * 7 + feature.votes, Math.min(3, feature.votes)).map((name, vi) => (
                          <span key={vi} className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.35)', fontSize: '10px' }}>
                            👤 {name}
                          </span>
                        ))}
                        {feature.votes > 3 && (
                          <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.25)', fontSize: '10px' }}>
                            +{feature.votes - 3} weitere
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
