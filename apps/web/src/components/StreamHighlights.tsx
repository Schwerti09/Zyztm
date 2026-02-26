import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Clip {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  source: string | null;
  views?: number;
  createdAt?: string;
}

type FilterKey = 'neueste' | 'beliebteste' | 'lustigste';

const STATIC_HIGHLIGHTS: Clip[] = [
  {
    id: 'yt-OsiZmq4yLy4',
    title: 'DAS ERSTE MÄDCHEN FANGEN DIE JUNGS TURNIER IN FORTNITE [UNFAIR?]',
    thumbnail: 'https://img.youtube.com/vi/OsiZmq4yLy4/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=OsiZmq4yLy4',
    source: 'youtube',
  },
  {
    id: 'yt-Kd-9EVbrVSk',
    title: 'I WAS NOT EXPECTING A FORTNITE ACCOUNT LIKE THIS...🤯',
    thumbnail: 'https://img.youtube.com/vi/Kd-9EVbrVSk/hqdefault.jpg',
    url: 'https://www.youtube.com/watch?v=Kd-9EVbrVSk',
    source: 'youtube',
    views: 19000,
  },
  {
    id: 'tt-7610528912187198742',
    title: 'Brooo das ist real #fortnite #zyztm',
    thumbnail: '',
    url: 'https://www.tiktok.com/@zyztm/video/7610528912187198742',
    source: 'tiktok',
  },
  {
    id: 'tt-7581494239306042646',
    title: 'NIEMALS HÄTTE ICH DAMIT GERECHNET #fortnite #zyztm',
    thumbnail: '',
    url: 'https://www.tiktok.com/@zyztm/video/7581494239306042646',
    source: 'tiktok',
  },
  {
    id: 'kick-zyztm-videos',
    title: 'Zyztm Kick Videos – letzte Streams inkl. 1V1 GIRLS TURNIER',
    thumbnail: '',
    url: 'https://kick.com/zyztm/videos',
    source: 'kick',
  },
  {
    id: 'tt-7571107930192366870',
    title: 'MY NEW DOG ARES #fortnite #zyztm',
    thumbnail: '',
    url: 'https://www.tiktok.com/@zyztm/video/7571107930192366870',
    source: 'tiktok',
  },
];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'neueste', label: '🕐 NEUESTE' },
  { key: 'beliebteste', label: '🔥 BELIEBTESTE' },
  { key: 'lustigste', label: '😂 LUSTIGSTE' },
];

function sourceColor(source: string | null): string {
  if (source === 'youtube') return '#ff0000';
  if (source === 'tiktok') return '#ff0055';
  return '#53fc18';
}

function sourceLabel(source: string | null): string {
  if (source === 'youtube') return 'YT';
  if (source === 'tiktok') return 'TT';
  return 'KICK';
}

function sortClips(clips: Clip[], filter: FilterKey): Clip[] {
  if (filter === 'beliebteste') {
    return [...clips].sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
  }
  if (filter === 'lustigste') {
    // Sort by views ascending (low-view clips are often shorter, funnier moments)
    // then fall back to reverse-chronological for clips without views
    return [...clips].sort((a, b) => {
      const aViews = a.views ?? 0;
      const bViews = b.views ?? 0;
      if (aViews === 0 && bViews === 0) return 0;
      if (aViews === 0) return -1;
      if (bViews === 0) return 1;
      return aViews - bViews;
    });
  }
  // neueste: default order (already sorted by date from API)
  return clips;
}

export default function StreamHighlights() {
  const [clips, setClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<Clip | null>(null);
  const [filter, setFilter] = useState<FilterKey>('neueste');

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.clips)) setClips(data.clips);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  const apiIds = new Set(clips.map((c) => c.id));
  const mergedClips = [...clips, ...STATIC_HIGHLIGHTS.filter((c) => !apiIds.has(c.id))];
  const displayed = sortClips(mergedClips, filter).slice(0, 6);

  return (
    <section className="py-20 px-6 relative" id="highlights">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,242,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            STREAM{' '}
            <span className="text-neon-blue neon-text-blue">HIGHLIGHTS</span>
          </h2>
          <p className="text-white/50">Die besten Momente aus allen Streams – direkt hier</p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-10 flex-wrap"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="font-cyber text-xs tracking-widest px-5 py-2 rounded border transition-all duration-200"
              style={{
                borderColor: filter === f.key ? '#00f2ff' : 'rgba(255,255,255,0.15)',
                color: filter === f.key ? '#00f2ff' : 'rgba(255,255,255,0.5)',
                background: filter === f.key ? 'rgba(0,242,255,0.08)' : 'transparent',
                boxShadow: filter === f.key ? '0 0 12px rgba(0,242,255,0.2)' : 'none',
              }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden animate-pulse"
                style={{
                  background: 'rgba(13,17,23,0.8)',
                  border: '1px solid rgba(0,242,255,0.1)',
                }}
              >
                <div className="aspect-video bg-white/5" />
                <div className="p-4">
                  <div className="h-3 bg-white/10 rounded mb-2 w-3/4" />
                  <div className="h-2 bg-white/5 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : mergedClips.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-12">
            <p className="text-white/40 font-cyber tracking-widest text-sm">
              Noch keine Highlights verfügbar.
            </p>
            <a
              href="https://kick.com/zyztm"
              target="_blank"
              rel="noopener noreferrer"
              className="font-cyber text-xs tracking-widest px-6 py-3 rounded border transition-all"
              style={{ borderColor: 'rgba(0,242,255,0.4)', color: '#00f2ff' }}
            >
              KICK CHANNEL →
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((clip, i) => {
              const color = sourceColor(clip.source);
              return (
                <motion.div
                  key={clip.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  onClick={() => setLightbox(clip)}
                  className="group relative rounded-lg overflow-hidden cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(13,17,23,0.9) 0%, rgba(10,12,21,0.95) 100%)',
                    border: `1px solid ${color}25`,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${color}60`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${color}25, 0 4px 30px rgba(0,0,0,0.5)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${color}25`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
                  }}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-900 overflow-hidden">
                    {clip.thumbnail ? (
                      <img
                        src={clip.thumbnail}
                        alt={clip.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">🎮</div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-5xl drop-shadow-lg">▶</span>
                    </div>
                    {/* Source badge */}
                    <span
                      className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded font-cyber tracking-widest"
                      style={{ background: `${color}cc`, color: '#fff' }}
                    >
                      {sourceLabel(clip.source)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-white text-sm font-body font-bold line-clamp-2 group-hover:text-neon-blue transition-colors duration-300">
                      {clip.title || 'Highlight'}
                    </p>
                    {clip.views !== undefined && clip.views > 0 && (
                      <p className="text-white/40 text-xs mt-1 font-cyber">
                        👁 {clip.views.toLocaleString()} Views
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {mergedClips.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10 gap-4 flex-wrap"
          >
            <a
              href="https://kick.com/zyztm"
              target="_blank"
              rel="noopener noreferrer"
              className="font-cyber text-xs tracking-widest px-6 py-3 rounded border transition-all"
              style={{ borderColor: 'rgba(83,252,24,0.4)', color: '#53fc18' }}
            >
              ALLE KICK CLIPS →
            </a>
            <a
              href="https://youtube.com/@Zyztm"
              target="_blank"
              rel="noopener noreferrer"
              className="font-cyber text-xs tracking-widest px-6 py-3 rounded border transition-all"
              style={{ borderColor: 'rgba(255,0,0,0.4)', color: '#ff4444' }}
            >
              YOUTUBE CHANNEL →
            </a>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="highlights-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(10px)' }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="relative w-full max-w-3xl rounded-xl overflow-hidden cyber-card"
              style={{ border: '1px solid rgba(0,242,255,0.4)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                aria-label="Schließen"
                className="absolute top-3 right-3 z-20 text-white/50 hover:text-white text-lg px-2 py-0.5 bg-black/40 rounded transition-colors font-cyber"
              >
                ✕
              </button>
              {lightbox.thumbnail && (
                <div className="aspect-video bg-gray-900">
                  <img
                    src={lightbox.thumbnail}
                    alt={lightbox.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div
                className="p-4 flex items-center justify-between gap-3"
                style={{ background: 'rgba(3,5,10,0.95)' }}
              >
                <p className="text-white/80 text-sm line-clamp-1 flex-1 font-body">{lightbox.title}</p>
                <a
                  href={lightbox.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-cyber px-4 py-2 rounded border transition-all shrink-0"
                  style={{ borderColor: 'rgba(0,242,255,0.4)', color: '#00f2ff' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  ▶ ÖFFNEN
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
