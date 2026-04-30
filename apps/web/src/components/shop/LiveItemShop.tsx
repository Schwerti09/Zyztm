import { useEffect, useState } from 'react';
import {
  getItemShop,
  rateItemRarity,
  getRarityColor,
  getSacCode,
  type ItemShopResponse,
  type ShopItem,
} from '../../lib/fortnite-api';

function RarityBadge({ item }: { item: ShopItem }) {
  const rating = rateItemRarity(item);
  const colorMap: Record<string, string> = {
    legendary: '#F59E0B',
    rare: '#A855F7',
    uncommon: '#3B82F6',
    common: '#9CA3AF',
  };
  const color = colorMap[rating.rating];
  return (
    <span
      className="text-[9px] font-cyber tracking-widest px-2 py-0.5 rounded whitespace-nowrap"
      style={{
        background: `${color}20`,
        color,
        border: `1px solid ${color}50`,
      }}
    >
      {rating.label}
    </span>
  );
}

function ItemCard({ item, onSelect }: { item: ShopItem; onSelect: (i: ShopItem) => void }) {
  const rarityColor = getRarityColor(item.rarity);

  return (
    <button
      onClick={() => onSelect(item)}
      className="group relative p-3 rounded-2xl border text-left bg-gradient-to-b from-white/[0.04] to-transparent hover:from-white/[0.08] transition-all"
      style={{
        borderColor: `${rarityColor}40`,
      }}
    >
      <div
        className="aspect-square rounded-xl overflow-hidden mb-3 relative"
        style={{
          background: `linear-gradient(135deg, ${rarityColor}30, ${rarityColor}10)`,
        }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">
            🎮
          </div>
        )}
        <div className="absolute top-2 left-2">
          <RarityBadge item={item} />
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-cyber text-sm text-white leading-tight line-clamp-2">
          {item.name}
        </h3>
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] font-cyber tracking-widest"
            style={{ color: rarityColor }}
          >
            {item.rarity.toUpperCase()}
          </span>
          <span className="font-mono text-sm text-neon-gold font-bold">
            {item.price} V-Bucks
          </span>
        </div>
      </div>
    </button>
  );
}

function ItemDetailModal({
  item,
  onClose,
}: {
  item: ShopItem;
  onClose: () => void;
}) {
  const rarity = rateItemRarity(item);
  const rarityColor = getRarityColor(item.rarity);
  const sacCode = getSacCode();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sacCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-bg-dark border rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
        style={{ borderColor: `${rarityColor}60` }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60"
          aria-label="Close"
        >
          ×
        </button>

        <div
          className="aspect-square max-h-64 mx-auto rounded-xl overflow-hidden mb-4"
          style={{
            background: `linear-gradient(135deg, ${rarityColor}30, ${rarityColor}10)`,
          }}
        >
          {item.image && (
            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
          )}
        </div>

        <div className="mb-3">
          <RarityBadge item={item} />
        </div>

        <h2 className="font-cyber text-2xl font-bold text-white mb-2">{item.name}</h2>
        {item.description && (
          <p className="text-sm font-body text-white/70 mb-4 leading-relaxed">
            {item.description}
          </p>
        )}

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-3 rounded-lg bg-white/5">
            <div className="text-[10px] font-cyber text-white/40 tracking-widest">PREIS</div>
            <div className="font-mono text-xl text-neon-gold font-bold">
              {item.price} V-Bucks
            </div>
          </div>
          <div className="p-3 rounded-lg bg-white/5">
            <div className="text-[10px] font-cyber text-white/40 tracking-widest">
              IM SHOP GESEHEN
            </div>
            <div className="font-mono text-xl text-white font-bold">
              {item.timesSeen ?? '—'}x
            </div>
          </div>
        </div>

        <div
          className="p-3 rounded-lg mb-5 text-xs font-body leading-relaxed"
          style={{
            background: `${rarityColor}15`,
            border: `1px solid ${rarityColor}40`,
            color: rarityColor,
          }}
        >
          {rarity.description}
        </div>

        {/* SAC CTA — revenue critical */}
        <div className="p-4 rounded-xl border border-neon-pink/50 bg-gradient-to-br from-neon-pink/15 to-neon-gold/5 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-cyber text-xs tracking-widest text-neon-pink">
              🎮 SUPPORT A CREATOR
            </span>
          </div>
          <p className="text-sm font-body text-white/80 leading-relaxed mb-3">
            Nutze beim Kauf im Shop unseren Creator-Code, um Fortnite Nexus zu
            unterstützen. <strong className="text-white">Kostet dich 0€ extra.</strong>
          </p>
          <div className="flex gap-2">
            <div className="flex-1 bg-bg-darker rounded-lg px-4 py-3 font-mono text-xl font-black text-neon-pink tracking-widest border border-neon-pink/30 text-center">
              {sacCode}
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-3 rounded-lg bg-neon-pink text-bg-dark font-cyber text-xs tracking-widest font-black hover:scale-105 transition-transform"
            >
              {copied ? '✓ KOPIERT' : 'KOPIEREN'}
            </button>
          </div>
          <p className="text-[10px] font-body text-white/40 mt-2 italic">
            #EpicPartner · Seit 2025 im Partnerprogramm
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LiveItemShop() {
  const [shop, setShop] = useState<ItemShopResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getItemShop('de')
      .then((data) => {
        if (!cancelled) {
          setShop(data);
          setError(null);
        }
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-white/40 font-cyber tracking-widest animate-pulse">
        LADE ITEM SHOP...
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="max-w-xl mx-auto p-8 rounded-2xl border border-red-500/30 bg-red-500/10 text-center">
        <p className="text-red-400 font-body mb-2">Shop konnte nicht geladen werden.</p>
        <p className="text-xs text-white/40">{error}</p>
      </div>
    );
  }

  const filteredSections =
    filter === 'all' ? shop.sections : shop.sections.filter((s) => s.id === filter);

  const shopDate = new Date(shop.date);
  const formattedDate = shopDate.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-white">
      <header className="mb-8">
        <div className="flex items-center gap-2 text-xs font-cyber tracking-widest text-neon-pink mb-3">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          LIVE · {shop.totalItems} ITEMS · {formattedDate}
        </div>
        <h1 className="font-cyber text-3xl sm:text-5xl font-black text-white mb-3 leading-tight">
          FORTNITE ITEM SHOP HEUTE
        </h1>
        <p className="text-white/60 font-body max-w-2xl leading-relaxed mb-4">
          Aktueller Fortnite Shop mit <strong className="text-white">Rarity-Ratings</strong>
          , Shop-History und Creator-Code <strong className="text-neon-pink">ZYZTM</strong>.
          Rotation täglich um 00:00 UTC.
        </p>

        {/* FILTER */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-cyber text-xs tracking-widest transition-colors ${
              filter === 'all'
                ? 'bg-neon-pink text-bg-dark'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            ALLE ({shop.totalItems})
          </button>
          {shop.sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setFilter(s.id)}
              className={`px-4 py-2 rounded-lg font-cyber text-xs tracking-widest transition-colors ${
                filter === s.id
                  ? 'bg-neon-pink text-bg-dark'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {s.name.toUpperCase()} ({s.items.length})
            </button>
          ))}
        </div>
      </header>

      {/* SECTIONS */}
      <div className="space-y-10">
        {filteredSections.map((section) => (
          <section key={section.id}>
            <h2 className="font-cyber text-xl text-neon-blue tracking-wider mb-4">
              {section.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {section.items.map((item, i) => (
                <ItemCard key={`${item.id}-${i}`} item={item} onSelect={setSelectedItem} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {selectedItem && (
        <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
