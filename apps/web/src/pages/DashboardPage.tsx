import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { useStore } from '../store/useStore';
import { ALL_CARDS } from '@zyztm/shared-types';
import type { Card } from '@zyztm/shared-types';

const rarityColors = {
  common: '#9b9b9b',
  rare: '#00f2ff',
  epic: '#9b59b6',
  legendary: '#ffd700',
};

function CardDisplay({ card }: { card: Card }) {
  const color = rarityColors[card.rarity];
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 180 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="cyber-card rounded-lg p-4 text-center cursor-pointer"
      style={{ borderColor: `${color}40` }}
    >
      <div className="text-4xl mb-2">{card.emoji}</div>
      <div className="font-cyber text-sm font-bold text-white mb-1">{card.name}</div>
      <div className="text-xs mb-2" style={{ color }}>{card.rarity.toUpperCase()}</div>
      <p className="text-white/50 text-xs">{card.description}</p>
    </motion.div>
  );
}

export default function DashboardPage() {
  const [, navigate] = useLocation();
  const { credits, cards, setCards } = useStore();
  const [packOpening, setPackOpening] = useState(false);
  const [newCards, setNewCards] = useState<Card[]>([]);

  const openPack = async () => {
    setPackOpening(true);
    try {
      const res = await fetch('/api/cards/open-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 'demo-user' }),
      });
      const data = await res.json();
      setNewCards(data.cards);
      setCards([...cards, ...data.cards]);
    } catch {
      const shuffled = [...ALL_CARDS].sort(() => Math.random() - 0.5).slice(0, 5);
      setNewCards(shuffled);
      setCards([...cards, ...shuffled]);
    } finally {
      setPackOpening(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 pt-4">
          <h1 className="font-cyber text-3xl font-bold text-white">
            <span className="text-neon-pink">NEXUS</span> DASHBOARD
          </h1>
          <button onClick={() => navigate('/')} className="btn-secondary rounded text-xs px-4 py-2">
            ← ZURÜCK
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'VOICE CREDITS', value: credits, icon: '🎙️', color: '#00f2ff' },
            { label: 'KARTEN', value: cards.length, icon: '🃏', color: '#ffd700' },
            { label: 'LEVEL', value: 'VIP', icon: '👑', color: '#ff0055' },
          ].map((stat) => (
            <div key={stat.label} className="cyber-card rounded-lg p-6 text-center" style={{ borderColor: `${stat.color}30` }}>
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="font-cyber text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-white/50 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="cyber-card rounded-xl p-8 mb-8">
          <h2 className="font-cyber text-xl font-bold text-white mb-6">🃏 CARD COLLECTION</h2>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={openPack}
              disabled={packOpening}
              className="btn-primary rounded text-xs disabled:opacity-40"
            >
              {packOpening ? '⚙️ ÖFFNE PACK...' : '🃏 PACK ÖFFNEN (Demo)'}
            </button>
          </div>
          
          {newCards.length > 0 && (
            <div className="mb-6">
              <h3 className="font-cyber text-sm text-neon-gold mb-3">✨ NEUE KARTEN!</h3>
              <div className="grid grid-cols-5 gap-3">
                {newCards.map((card, idx) => <CardDisplay key={`${card.id}-new-${idx}`} card={card} />)}
              </div>
            </div>
          )}
          
          {cards.length > 0 && (
            <div>
              <h3 className="font-cyber text-sm text-white/50 mb-3">MEINE KARTEN ({cards.length})</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-3">
                {cards.map((card, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="cyber-card rounded p-2 text-center"
                    style={{ borderColor: `${rarityColors[card.rarity]}30` }}
                  >
                    <div className="text-2xl">{card.emoji}</div>
                    <div className="text-xs text-white/50 mt-1 truncate">{card.name}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {cards.length === 0 && (
            <p className="text-white/30 text-sm text-center py-8">Keine Karten. Öffne ein Pack um anzufangen!</p>
          )}
        </div>
      </div>
    </div>
  );
}
