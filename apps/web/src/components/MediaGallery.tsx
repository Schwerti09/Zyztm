import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryClip {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  source: string | null;
  views?: number;
}

function SourceBadge({ source }: { source: string | null }) {
  const isYT = source === 'youtube';
  return (
    <span
      className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded font-cyber tracking-widest z-10 backdrop-blur-sm"
      style={{
        background: isYT ? 'rgba(255,0,0,0.75)' : 'rgba(83,10,255,0.75)',
        color: '#fff',
        border: isYT ? '1px solid rgba(255,0,0,0.5)' : '1px solid rgba(145,70,255,0.5)',
      }}
    >
      {isYT ? 'YT' : 'KICK'}
    </span>
  );
}

export default function MediaGallery() {
  const [items, setItems] = useState<GalleryClip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<GalleryClip | null>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.clips) && data.clips.length > 0) {
          setItems(data.clips);
        } else {
          setError(data.error ?? null);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            STREAM <span className="text-neon-pink neon-text-pink">MOMENTE</span>
          </h2>
          <p className="text-white/40 font-body tracking-widest text-sm">
            NEUESTE CLIPS &amp; VIDEOS
          </p>
        </motion.div>

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-video rounded-lg bg-white/5 animate-pulse" />
            ))}
          </div>
        )}

        {!loading && (error || items.length === 0) && (
          <div className="text-center py-12">
            <p className="text-white/40 font-cyber tracking-widest mb-6">
              {error ?? 'NOCH KEINE CLIPS VERFÜGBAR.'}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="https://kick.com/zyztm"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-sm px-4 py-2"
              >
                📺 KICK CHANNEL
              </a>
              <a
                href="https://youtube.com/@zyztm"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary text-sm px-4 py-2"
              >
                🎬 YOUTUBE
              </a>
            </div>
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.04, zIndex: 10 }}
                onClick={() => setLightbox(item)}
                className="group relative aspect-video cyber-card rounded-lg overflow-hidden cursor-pointer"
                style={{
                  boxShadow: '0 0 0 0 rgba(0,242,255,0)',
                  transition: 'box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    '0 0 20px rgba(0,242,255,0.3), 0 0 40px rgba(255,0,85,0.15)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    '0 0 0 0 rgba(0,242,255,0)';
                }}
              >
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-bg-card flex items-center justify-center">
                    <span className="text-5xl">🎮</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-4xl drop-shadow-lg">▶</span>
                </div>
                <SourceBadge source={item.source} />
                {item.views !== undefined && item.views > 0 && (
                  <span className="absolute bottom-8 left-2 text-[10px] text-white/70 bg-black/60 px-1.5 py-0.5 rounded z-10">
                    👁 {item.views.toLocaleString()}
                  </span>
                )}
                <p className="absolute bottom-0 left-0 right-0 px-2 py-1.5 text-xs text-white/80 bg-black/60 backdrop-blur-sm line-clamp-1 group-hover:text-white transition-colors font-body">
                  {item.title}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[9998] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)' }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative cyber-card rounded-xl overflow-hidden max-w-2xl w-full mx-4"
              style={{
                boxShadow: '0 0 60px rgba(0,242,255,0.2), 0 0 120px rgba(255,0,85,0.1)',
              }}
            >
              <button
                onClick={() => setLightbox(null)}
                aria-label="Lightbox schließen"
                className="absolute top-3 right-3 z-20 text-white/50 hover:text-white transition-colors font-cyber text-lg cursor-pointer bg-black/40 rounded px-2"
              >
                ✕
              </button>
              {lightbox.thumbnail && (
                <img
                  src={lightbox.thumbnail}
                  alt={lightbox.title}
                  className="w-full object-cover"
                />
              )}
              <div className="p-4 flex items-start justify-between gap-3">
                <p className="font-cyber text-sm text-white/90 leading-snug flex-1">
                  {lightbox.title}
                </p>
                <a
                  href={lightbox.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-xs px-3 py-1.5 whitespace-nowrap shrink-0"
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

