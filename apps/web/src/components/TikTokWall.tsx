import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { tiktokEmbedUrl } from '../utils/tiktokParser';

interface TikTokClip {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  tiktok_id: string | null;
  likes: number;
  created_at: string;
}

const TIKTOK_PINK = '#ff0055';
const TIKTOK_CYAN = '#00f2ff';
const TIKTOK_URL = 'https://www.tiktok.com/@fortnitenexus';
const PAGE_SIZE = 12;

export default function TikTokWall() {
  const { userEmail, coins, setCoins } = useStore();

  const [clips, setClips] = useState<TikTokClip[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [likingId, setLikingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ msg: string; ok: boolean } | null>(null);
  const [lightbox, setLightbox] = useState<TikTokClip | null>(null);

  const notify = (msg: string, ok = true) => {
    setNotification({ msg, ok });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchClips = useCallback(async (offset: number) => {
    try {
      const res = await fetch(`/api/tiktok/latest?limit=${PAGE_SIZE}&offset=${offset}`);
      const data = (await res.json()) as { clips?: TikTokClip[] };
      const fetched = data.clips ?? [];
      if (offset === 0) {
        setClips(fetched);
      } else {
        setClips((prev) => [...prev, ...fetched]);
      }
      setHasMore(fetched.length === PAGE_SIZE);
    } catch {
      // keep existing clips
    }
  }, []);

  const fetchLiked = useCallback(async () => {
    if (!userEmail) return;
    try {
      const res = await fetch(`/api/tiktok/liked?email=${encodeURIComponent(userEmail)}`);
      const data = (await res.json()) as { likedClipIds?: string[] };
      setLikedIds(new Set(data.likedClipIds ?? []));
    } catch {
      // ignore
    }
  }, [userEmail]);

  useEffect(() => {
    Promise.all([fetchClips(0), fetchLiked()]).finally(() => setLoading(false));
  }, [fetchClips, fetchLiked]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await fetchClips(clips.length);
    setLoadingMore(false);
  };

  const handleLike = async (clip: TikTokClip) => {
    if (likedIds.has(clip.id) || likingId) return;
    if (!userEmail) {
      notify('🔐 Bitte E-Mail eingeben, um Coins zu nutzen', false);
      return;
    }
    if (coins < 1) {
      notify('❌ Nicht genug JOJOJO Coins (1 Coin benötigt)', false);
      return;
    }

    setLikingId(clip.id);
    try {
      const res = await fetch('/api/tiktok/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clipId: clip.id, email: userEmail }),
      });
      const data = (await res.json()) as { success?: boolean; likes?: number; error?: string };

      if (res.ok && data.success) {
        setLikedIds((prev) => new Set(prev).add(clip.id));
        setClips((prev) =>
          prev.map((c) => (c.id === clip.id ? { ...c, likes: data.likes ?? c.likes + 1 } : c)),
        );
        if (lightbox?.id === clip.id) {
          setLightbox((prev) => prev ? { ...prev, likes: data.likes ?? prev.likes + 1 } : prev);
        }
        setCoins(coins - 1);
        notify('❤️ Geliket! –1 Coin');
      } else if (res.status === 409) {
        setLikedIds((prev) => new Set(prev).add(clip.id));
        notify('ℹ️ Bereits geliket');
      } else {
        notify(`❌ ${data.error ?? 'Fehler'}`, false);
      }
    } catch {
      notify('❌ Verbindungsfehler', false);
    } finally {
      setLikingId(null);
    }
  };

  return (
    <section className="py-20 px-6 relative" id="tiktok">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,0,85,0.06) 0%, transparent 70%)',
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
            🎵 TIKTOK WALL{' '}
            <span style={{ color: TIKTOK_PINK, textShadow: `0 0 15px ${TIKTOK_PINK}` }}>
              – Die neuesten Clips
            </span>
          </h2>
          <p className="text-white/50 mb-4">Alle Clips von @zyztm – direkt hier</p>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-cyber text-xs tracking-widest px-5 py-2 rounded border transition-all duration-200"
            style={{
              borderColor: `${TIKTOK_PINK}66`,
              color: TIKTOK_PINK,
            }}
          >
            @ZYZTM AUF TIKTOK →
          </a>
        </motion.div>

        {/* Notification toast */}
        <AnimatePresence>
          {notification && (
            <motion.div
              key="notification"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded font-cyber text-sm tracking-widest"
              style={{
                background: 'rgba(0,0,0,0.92)',
                border: `1px solid ${notification.ok ? `${TIKTOK_PINK}66` : 'rgba(255,80,80,0.4)'}`,
                color: notification.ok ? TIKTOK_PINK : '#ff5050',
              }}
            >
              {notification.msg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden animate-pulse"
                style={{
                  background: 'rgba(13,17,23,0.8)',
                  border: '1px solid rgba(255,0,85,0.1)',
                }}
              >
                <div className="aspect-[9/16] bg-white/5" />
                <div className="p-3">
                  <div className="h-2 bg-white/10 rounded w-3/4 mb-2" />
                  <div className="h-2 bg-white/5 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : clips.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-12">
            <p className="text-white/40 font-cyber tracking-widest text-sm">
              Noch keine TikTok-Clips verfügbar.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
              <motion.a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="rounded-xl overflow-hidden no-underline flex flex-col items-center gap-4 p-8 text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,0,85,0.12) 0%, rgba(0,242,255,0.06) 100%)',
                  border: `1px solid ${TIKTOK_PINK}40`,
                  boxShadow: `0 0 20px ${TIKTOK_PINK}20`,
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="text-6xl">🎵</div>
                <div>
                  <p className="font-cyber text-xl font-bold mb-1" style={{ color: TIKTOK_PINK }}>
                    @ZYZTM
                  </p>
                  <p className="text-white/50 text-sm mb-3">651K Follower · TikTok</p>
                </div>
                <div
                  className="text-xs font-cyber tracking-widest py-2 px-6 rounded border"
                  style={{ borderColor: `${TIKTOK_PINK}60`, color: TIKTOK_PINK }}
                >
                  JETZT FOLGEN →
                </div>
              </motion.a>
              <motion.a
                href="https://youtube.com/@FortniteNexusDE"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="rounded-xl overflow-hidden no-underline flex flex-col items-center gap-4 p-8 text-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(83,252,24,0.12) 0%, rgba(13,17,23,0.8) 100%)',
                  border: '1px solid rgba(83,252,24,0.3)',
                  boxShadow: '0 0 20px rgba(83,252,24,0.15)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="text-6xl">🟢</div>
                <div>
                  <p className="font-cyber text-xl font-bold mb-1" style={{ color: '#53fc18' }}>
                    KICK LIVE
                  </p>
                  <p className="text-white/50 text-sm mb-3">28,9K Follower · youtube.com/@FortniteNexusDE</p>
                </div>
                <div
                  className="text-xs font-cyber tracking-widest py-2 px-6 rounded border"
                  style={{ borderColor: 'rgba(83,252,24,0.5)', color: '#53fc18' }}
                >
                  ZUM STREAM →
                </div>
              </motion.a>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {clips.map((clip, i) => {
                const liked = likedIds.has(clip.id);
                const isLiking = likingId === clip.id;

                return (
                  <motion.div
                    key={clip.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % PAGE_SIZE) * 0.05 }}
                    className="rounded-lg overflow-hidden group relative cursor-pointer"
                    style={{
                      background: 'rgba(13,17,23,0.85)',
                      border: liked
                        ? `1px solid ${TIKTOK_PINK}66`
                        : '1px solid rgba(255,0,85,0.12)',
                      boxShadow: liked ? `0 0 12px ${TIKTOK_PINK}33` : 'none',
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                    }}
                    onClick={() => setLightbox(clip)}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-[9/16] bg-gray-900 overflow-hidden">
                      {clip.thumbnail ? (
                        <img
                          src={clip.thumbnail}
                          alt={clip.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">
                          🎵
                        </div>
                      )}

                      {/* Play overlay */}
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'rgba(0,0,0,0.5)' }}
                      >
                        <span className="text-5xl drop-shadow-lg">▶</span>
                      </div>

                      {/* TikTok badge */}
                      <span
                        className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded font-cyber tracking-widest"
                        style={{ background: `${TIKTOK_PINK}cc`, color: '#fff' }}
                      >
                        TIKTOK
                      </span>
                    </div>

                    {/* Info bar */}
                    <div className="p-3 flex items-center justify-between gap-2">
                      <p
                        className="text-xs text-white/70 line-clamp-2 flex-1 group-hover:text-white transition-colors"
                        title={clip.title}
                      >
                        {clip.title || 'TikTok Video'}
                      </p>

                      {/* Like button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(clip);
                        }}
                        disabled={liked || !!likingId}
                        className="flex items-center gap-1 text-xs font-cyber px-2 py-1 rounded border transition-all duration-200 shrink-0 disabled:cursor-not-allowed"
                        title={liked ? 'Bereits geliket' : '1 Coin: Liken'}
                        style={{
                          borderColor: liked ? `${TIKTOK_PINK}88` : 'rgba(255,255,255,0.15)',
                          color: liked ? TIKTOK_PINK : 'rgba(255,255,255,0.5)',
                          background: liked ? `${TIKTOK_PINK}15` : 'transparent',
                        }}
                      >
                        {isLiking ? '⏳' : liked ? '❤️' : '🤍'}
                        <span>{clip.likes}</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-10">
              {hasMore ? (
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="font-cyber text-sm px-8 py-3 rounded border transition-all duration-200 disabled:opacity-50"
                  style={{ borderColor: `${TIKTOK_CYAN}55`, color: TIKTOK_CYAN }}
                >
                  {loadingMore ? 'LÄDT...' : 'MEHR LADEN ↓'}
                </button>
              ) : (
                <p className="text-white/30 font-cyber text-xs tracking-widest">
                  – ALLE CLIPS GELADEN –
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="relative max-w-sm w-full rounded-xl overflow-hidden"
              style={{ border: `1px solid ${TIKTOK_PINK}55` }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Embed or thumbnail fallback */}
              {lightbox.tiktok_id ? (
                <iframe
                  src={tiktokEmbedUrl(lightbox.tiktok_id)}
                  title={lightbox.title}
                  className="w-full"
                  style={{ height: '70vh', minHeight: 480 }}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                />
              ) : (
                <div className="relative aspect-[9/16] bg-black">
                  {lightbox.thumbnail && (
                    <img
                      src={lightbox.thumbnail}
                      alt={lightbox.title}
                      className="w-full h-full object-cover opacity-70"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <a
                      href={lightbox.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-cyber text-sm px-6 py-3 rounded border"
                      style={{ borderColor: TIKTOK_PINK, color: TIKTOK_PINK }}
                    >
                      AUF TIKTOK ANSEHEN →
                    </a>
                  </div>
                </div>
              )}

              {/* Lightbox footer */}
              <div
                className="p-4 flex items-center justify-between gap-3"
                style={{ background: 'rgba(3,5,10,0.95)' }}
              >
                <p className="text-white/80 text-sm line-clamp-1 flex-1">{lightbox.title}</p>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Like */}
                  <button
                    onClick={() => handleLike(lightbox)}
                    disabled={likedIds.has(lightbox.id) || !!likingId}
                    className="flex items-center gap-1 text-xs font-cyber px-3 py-2 rounded border transition-all disabled:cursor-not-allowed"
                    style={{
                      borderColor: likedIds.has(lightbox.id) ? `${TIKTOK_PINK}88` : 'rgba(255,255,255,0.2)',
                      color: likedIds.has(lightbox.id) ? TIKTOK_PINK : '#fff',
                      background: likedIds.has(lightbox.id) ? `${TIKTOK_PINK}15` : 'transparent',
                    }}
                  >
                    {likingId === lightbox.id ? '⏳' : likedIds.has(lightbox.id) ? '❤️' : '🤍'}
                    <span>{lightbox.likes}</span>
                  </button>

                  {/* Share / open on TikTok */}
                  <a
                    href={lightbox.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-cyber px-3 py-2 rounded border transition-all"
                    style={{ borderColor: `${TIKTOK_CYAN}55`, color: TIKTOK_CYAN }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    TIKTOK ↗
                  </a>

                  {/* Close */}
                  <button
                    onClick={() => setLightbox(null)}
                    className="text-white/50 hover:text-white text-lg px-1 transition-colors"
                    aria-label="Schließen"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
