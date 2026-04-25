import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  link: string;
}

const CHANNEL_URL = 'https://www.youtube.com/@FortniteNexusDE';
const CHANNEL2_URL = 'https://www.youtube.com/@FortniteNexusDE';
/** URL of the Netlify function that fetches YouTube videos server-side */
const API_URL = '/.netlify/functions/get-youtube-videos';

/** Format ISO date string to a short locale date */
function formatDate(iso: string): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export default function LatestYouTubeVideos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<VideoItem | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((data: VideoItem[] | { error: string }) => {
        if (!Array.isArray(data)) {
          setError((data as { error: string }).error ?? 'Unbekannter Fehler');
        } else {
          setVideos(data);
        }
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  return (
    <section className="py-20 px-6 relative" id="yt-videos">
      {/* Neon background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,0,0,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            📺 LATEST{' '}
            <span className="text-red-500" style={{ textShadow: '0 0 18px #ff0000' }}>
              YOUTUBE VIDEOS
            </span>
          </h2>
          <p className="text-white/50">
            Alle Videos von{' '}
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              @FortniteNexusDE
            </a>
            {' · '}
            <a
              href={CHANNEL2_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              @FortniteNexusDE
            </a>
          </p>
        </motion.div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden animate-pulse"
                style={{
                  background: 'rgba(13,17,23,0.8)',
                  border: '1px solid rgba(255,0,0,0.1)',
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
        )}

        {/* Error / empty state */}
        {!loading && (error || videos.length === 0) && (
          <div className="flex flex-col items-center gap-4 py-12">
            {error && (
              <p className="text-red-400 text-sm font-mono">{error}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
              <motion.a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, y: -3 }}
                className="rounded-lg overflow-hidden no-underline block group flex-1"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(13,17,23,0.75) 0%, rgba(10,12,21,0.80) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,0,0,0.2)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                }}
              >
                <div className="relative aspect-video bg-gray-900 flex flex-col items-center justify-center gap-3">
                  <div className="text-5xl">📺</div>
                  <p className="font-cyber text-lg font-bold text-red-500">NEXUS AUF YOUTUBE</p>
                </div>
                <div className="p-4 text-center">
                  <div className="text-xs font-cyber tracking-widest py-2 px-6 border border-red-500/50 rounded text-red-500 inline-block">
                    @NEXUS ÖFFNEN →
                  </div>
                </div>
              </motion.a>
              <motion.a
                href={CHANNEL2_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.03, y: -3 }}
                className="rounded-lg overflow-hidden no-underline block group flex-1"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(13,17,23,0.75) 0%, rgba(10,12,21,0.80) 100%)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,80,80,0.2)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                }}
              >
                <div className="relative aspect-video bg-gray-900 flex flex-col items-center justify-center gap-3">
                  <div className="text-5xl">🎮</div>
                  <p className="font-cyber text-lg font-bold text-red-400">NEXUS KANAL</p>
                </div>
                <div className="p-4 text-center">
                  <div className="text-xs font-cyber tracking-widest py-2 px-6 border border-red-400/50 rounded text-red-400 inline-block">
                    @NEXUS ÖFFNEN →
                  </div>
                </div>
              </motion.a>
            </div>
          </div>
        )}

        {/* Video grid */}
        {!loading && videos.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {videos.map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  onClick={() => setLightbox(v)}
                  className="group relative rounded-lg overflow-hidden cursor-pointer"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(13,17,23,0.9) 0%, rgba(10,12,21,0.95) 100%)',
                    border: '1px solid rgba(255,0,0,0.2)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,0,0,0.5)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      '0 0 22px rgba(255,0,0,0.2), 0 4px 30px rgba(0,0,0,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,0,0,0.2)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
                  }}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-900 overflow-hidden">
                    {v.thumbnail ? (
                      <img
                        src={v.thumbnail}
                        alt={v.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        📺
                      </div>
                    )}
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-5xl drop-shadow-lg">▶</span>
                    </div>
                    {/* YT badge */}
                    <span
                      className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded font-cyber tracking-widest"
                      style={{ background: 'rgba(255,0,0,0.85)', color: '#fff' }}
                    >
                      YT
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-white text-sm font-body font-bold line-clamp-2 group-hover:text-red-400 transition-colors duration-300">
                      {v.title}
                    </p>
                    {v.publishedAt && (
                      <p className="text-white/40 text-xs mt-1 font-cyber">
                        {formatDate(v.publishedAt)}
                      </p>
                    )}
                    <p className="text-red-500 text-xs font-cyber mt-1 tracking-widest">
                      YOUTUBE ▶
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Channel link */}
            <div className="flex justify-center gap-4 mt-10 flex-wrap">
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-cyber tracking-widest py-2 px-8 rounded border transition-all"
                style={{ borderColor: 'rgba(255,0,0,0.4)', color: '#ff4444' }}
              >
                @NEXUS ÖFFNEN →
              </a>
              <a
                href={CHANNEL2_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-cyber tracking-widest py-2 px-8 rounded border transition-all"
                style={{ borderColor: 'rgba(255,80,80,0.3)', color: '#ff8888' }}
              >
                @NEXUS →
              </a>
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="yt-videos-lightbox"
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
              className="relative w-full max-w-3xl rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,0,0,0.4)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                aria-label="Schließen"
                className="absolute top-3 right-3 z-20 text-white/50 hover:text-white text-lg px-2 py-0.5 bg-black/50 rounded transition-colors font-cyber"
              >
                ✕
              </button>
              <div className="aspect-video bg-gray-900">
                <iframe
                  src={`https://www.youtube.com/embed/${lightbox.id}?autoplay=1`}
                  title={lightbox.title}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  style={{ border: 'none' }}
                />
              </div>
              <div
                className="p-4 flex items-center justify-between gap-3"
                style={{ background: 'rgba(3,5,10,0.95)' }}
              >
                <p className="text-white/80 text-sm line-clamp-1 flex-1 font-body">
                  {lightbox.title}
                </p>
                <a
                  href={lightbox.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-cyber px-4 py-2 rounded border transition-all shrink-0"
                  style={{ borderColor: 'rgba(255,0,0,0.4)', color: '#ff4444' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  YOUTUBE ↗
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
