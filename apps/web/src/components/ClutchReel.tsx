import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ───────────────────────────────────────────────────────────────────
interface ClipData {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  accentColor: string;
  bgGradient: string;
  youtubeId: string | null;
  externalUrl: string;
  source: 'youtube' | 'tiktok' | 'kick';
  stats: { kills: number; accuracy: number; mode: string };
  emoji: string;
}

// ─── Clip data with real Zyztm video IDs ─────────────────────────────────────
const CLIPS: ClipData[] = [
  {
    id: 'c1',
    title: 'SOLO vs. SQUAD WIPE',
    subtitle: '4 Kills in 8 Sek. – unmöglich? Nicht für Zyztm!',
    tag: 'CLUTCH',
    tagColor: '#ff0055',
    accentColor: '#ff0055',
    bgGradient: 'linear-gradient(135deg,#1a0008 0%,#0a0003 100%)',
    youtubeId: 'OsiZmq4yLy4',
    externalUrl: 'https://www.youtube.com/watch?v=OsiZmq4yLy4',
    source: 'youtube',
    stats: { kills: 4, accuracy: 94, mode: '1v4 CLUTCH' },
    emoji: '💥',
  },
  {
    id: 'c2',
    title: 'VICTORY ROYALE #342',
    subtitle: 'Stream-Rekord: 3.598 gleichzeitige Zuschauer!',
    tag: 'LEGEND',
    tagColor: '#ffd700',
    accentColor: '#ffd700',
    bgGradient: 'linear-gradient(135deg,#1a1000 0%,#0a0800 100%)',
    youtubeId: 'Kd-9EVbrVSk',
    externalUrl: 'https://www.youtube.com/watch?v=Kd-9EVbrVSk',
    source: 'youtube',
    stats: { kills: 11, accuracy: 87, mode: 'SOLO WIN' },
    emoji: '🏆',
  },
  {
    id: 'c3',
    title: '360° NO-SCOPE',
    subtitle: 'TikTok-Clip – 4,2M Views – viral explosion!',
    tag: 'VIRAL',
    tagColor: '#00f2ff',
    accentColor: '#00f2ff',
    bgGradient: 'linear-gradient(135deg,#00131a 0%,#000a0f 100%)',
    youtubeId: null,
    externalUrl: 'https://www.tiktok.com/@fortnitenexus/video/7610528912187198742',
    source: 'tiktok',
    stats: { kills: 1, accuracy: 100, mode: 'NO-SCOPE' },
    emoji: '🎯',
  },
  {
    id: 'c4',
    title: 'BUILD BATTLE INSANE',
    subtitle: '94 Kills in einem einzigen Tournament – Weltklasse!',
    tag: 'GOD MODE',
    tagColor: '#53fc18',
    accentColor: '#53fc18',
    bgGradient: 'linear-gradient(135deg,#001a00 0%,#000f00 100%)',
    youtubeId: null,
    externalUrl: 'https://www.tiktok.com/@zyztm/video/7581494239306042646',
    source: 'tiktok',
    stats: { kills: 17, accuracy: 78, mode: 'BUILD BATTLE' },
    emoji: '🔨',
  },
  {
    id: 'c5',
    title: 'LAST ZONE WIN',
    subtitle: 'Nur 5 HP und trotzdem gewonnen – Herz aus Stahl!',
    tag: 'LUCKY',
    tagColor: '#a335ee',
    accentColor: '#a335ee',
    bgGradient: 'linear-gradient(135deg,#0e0018 0%,#06000f 100%)',
    youtubeId: null,
    externalUrl: 'https://www.tiktok.com/@zyztm/video/7571107930192366870',
    source: 'tiktok',
    stats: { kills: 6, accuracy: 82, mode: 'COMEBACK' },
    emoji: '❤️',
  },
  {
    id: 'c6',
    title: 'ARENA RANKED #1',
    subtitle: 'Europas Top-Placement – uncut, live auf Kick!',
    tag: 'PRO',
    tagColor: '#53fc18',
    accentColor: '#53fc18',
    bgGradient: 'linear-gradient(135deg,#001a0a 0%,#000f05 100%)',
    youtubeId: null,
    externalUrl: 'https://kick.com/zyztm/videos',
    source: 'kick',
    stats: { kills: 22, accuracy: 91, mode: 'ARENA SOLO' },
    emoji: '🎮',
  },
];

// ─── Particle canvas hook ─────────────────────────────────────────────────────
interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; color: string;
}

function useParticleBurst(accentColor: string) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const activeRef = useRef(false);

  const spawnBurst = useCallback((cx: number, cy: number) => {
    // Particle colors: accent + neon green + gold (defined inside to stay in sync with accentColor)
    const colors = [accentColor, '#53fc18', '#ffd700', '#ffffff'];
    const count = 28;
    particlesRef.current = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 3,
        opacity: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
    activeRef.current = true;
  }, [accentColor]);

  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0.02);
    for (const p of particlesRef.current) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // gravity
      p.opacity -= 0.025;
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (particlesRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      activeRef.current = false;
    }
  }, []);

  const triggerBurst = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    spawnBurst(cx, cy);
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [spawnBurst, tick]);

  useEffect(() => {
    return () => { cancelAnimationFrame(rafRef.current); };
  }, []);

  return { canvasRef, triggerBurst };
}

// ─── Source badge label / color ───────────────────────────────────────────────
function srcLabel(source: ClipData['source']) {
  if (source === 'youtube') return { label: '▶ YT', color: '#ff2020' };
  if (source === 'tiktok') return { label: '♪ TT', color: '#ff0055' };
  return { label: '● KICK', color: '#53fc18' };
}

// ─── Single ClutchCard ────────────────────────────────────────────────────────
function ClutchCard({ clip, index }: { clip: ClipData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { canvasRef, triggerBurst } = useParticleBurst(clip.accentColor);
  const [hovered, setHovered] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const { label: srcBadge, color: srcColor } = srcLabel(clip.source);

  // Thumbnail URL for YouTube clips
  const thumbSrc = clip.youtubeId
    ? `https://img.youtube.com/vi/${clip.youtubeId}/maxresdefault.jpg`
    : null;

  // ── 3D tilt + mouse parallax ──────────────────────────────────────────────
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 12;
    const rotX = ((cy - y) / cy) * 8;
    card.style.transform =
      `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
    // update CSS vars for the parallax inner layers
    card.style.setProperty('--px', `${((x / rect.width) * 100).toFixed(1)}%`);
    card.style.setProperty('--py', `${((y / rect.height) * 100).toFixed(1)}%`);
  }, []);

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    card.style.setProperty('--px', '50%');
    card.style.setProperty('--py', '50%');
    setHovered(false);
  }, []);

  const onMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setHovered(true);
    triggerBurst(e);
  }, [triggerBurst]);

  const ac = clip.accentColor;

  return (
    <>
      {/* ── Card ─────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
        style={{ '--accent': ac } as React.CSSProperties}
        className="clutch-card-wrapper"
      >
        <div
          ref={cardRef}
          onMouseMove={onMouseMove}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="relative rounded-xl overflow-hidden cursor-pointer select-none"
          style={{
            background: clip.bgGradient,
            /* Holographic border via box-shadow + border */
            border: `1px solid ${ac}40`,
            boxShadow: hovered
              ? `0 0 0 1px ${ac}80, 0 0 30px ${ac}35, 0 0 60px ${ac}18, inset 0 0 30px ${ac}08, 0 20px 60px rgba(0,0,0,0.7)`
              : `0 0 0 1px ${ac}20, 0 4px 30px rgba(0,0,0,0.6)`,
            transition: 'box-shadow 0.35s ease, transform 0.15s ease',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            aspectRatio: '16/10',
          }}
        >
          {/* ── Holographic border top-line scan ─────────────────────────── */}
          <div
            className="clutch-holo-scan absolute inset-x-0 top-0 h-px pointer-events-none z-20"
            style={{
              background: `linear-gradient(to right, transparent 0%, ${ac}cc 40%, #ffffff99 50%, ${ac}cc 60%, transparent 100%)`,
              opacity: hovered ? 1 : 0.4,
              transition: 'opacity 0.3s',
            }}
          />

          {/* ── Thumbnail / gradient background ──────────────────────────── */}
          <div className="absolute inset-0 overflow-hidden">
            {thumbSrc ? (
              <img
                src={thumbSrc}
                alt={clip.title}
                className="w-full h-full object-cover"
                style={{
                  opacity: hovered ? 0.55 : 0.35,
                  transition: 'opacity 0.4s ease',
                  filter: 'saturate(1.4) contrast(1.1)',
                }}
                loading="lazy"
              />
            ) : (
              /* Gradient placeholder for TikTok/Kick clips */
              <div
                className="w-full h-full"
                style={{
                  background: `radial-gradient(ellipse 80% 70% at var(--px,50%) var(--py,50%), ${ac}22 0%, transparent 70%), ${clip.bgGradient}`,
                  transition: 'background 0.1s',
                }}
              />
            )}
            {/* Dark vignette overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.88) 100%)',
              }}
            />
            {/* Scanlines overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)',
                opacity: hovered ? 0.7 : 0.3,
                transition: 'opacity 0.3s',
              }}
            />
          </div>

          {/* ── Particle canvas ───────────────────────────────────────────── */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-30"
            width={600}
            height={375}
            style={{ width: '100%', height: '100%' }}
          />

          {/* ── Holographic radial shine following cursor ─────────────────── */}
          {hovered && (
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `radial-gradient(ellipse 55% 45% at var(--px,50%) var(--py,50%), ${ac}12 0%, transparent 65%)`,
              }}
            />
          )}

          {/* ── Source badge ─────────────────────────────────────────────── */}
          <div
            className="absolute top-3 left-3 z-20 px-2 py-0.5 rounded font-cyber text-[10px] tracking-widest font-bold"
            style={{ background: `${srcColor}cc`, color: '#fff', textShadow: `0 0 8px ${srcColor}` }}
          >
            {srcBadge}
          </div>

          {/* ── CLUTCH tag badge ─────────────────────────────────────────── */}
          <div
            className="absolute top-3 right-3 z-20 px-2.5 py-0.5 rounded font-cyber text-[10px] tracking-[0.2em] font-bold clutch-badge"
            style={{
              background: `${ac}18`,
              border: `1px solid ${ac}70`,
              color: ac,
              textShadow: `0 0 10px ${ac}, 0 0 20px ${ac}80`,
              boxShadow: hovered ? `0 0 12px ${ac}60` : 'none',
              transition: 'box-shadow 0.3s',
            }}
          >
            ⬡ {clip.tag}
          </div>

          {/* ── Big emoji + glitch title ──────────────────────────────────── */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-4">
            {/* Emoji */}
            <div
              className="mb-2 text-4xl leading-none"
              style={{ filter: `drop-shadow(0 0 12px ${ac})`, transition: 'filter 0.3s' }}
            >
              {clip.emoji}
            </div>

            {/* Title with glitch */}
            <h3
              className={`font-cyber text-base md:text-lg font-bold leading-tight mb-1 ${hovered ? 'glitch-text' : ''}`}
              data-text={clip.title}
              style={{
                color: '#fff',
                textShadow: hovered
                  ? `0 0 8px ${ac}, 0 0 20px ${ac}80, 2px 2px 0 #ff005550, -2px -2px 0 #00f2ff50`
                  : '0 0 6px rgba(255,255,255,0.4)',
                transition: 'text-shadow 0.3s',
              }}
            >
              {clip.title}
            </h3>

            {/* Subtitle */}
            <p
              className="font-body text-xs leading-snug mb-3"
              style={{
                color: hovered ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.45)',
                transition: 'color 0.3s',
              }}
            >
              {clip.subtitle}
            </p>

            {/* ── Stats overlay (slide up on hover) ─────────────────────── */}
            <div
              className="grid grid-cols-3 gap-1.5 overflow-hidden"
              style={{
                maxHeight: hovered ? '60px' : '0px',
                opacity: hovered ? 1 : 0,
                transition: 'max-height 0.35s ease, opacity 0.3s ease',
              }}
            >
              {[
                { label: 'KILLS', value: clip.stats.kills },
                { label: 'ACC%', value: `${clip.stats.accuracy}%` },
                { label: 'MODE', value: clip.stats.mode },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded px-2 py-1 text-center"
                  style={{ background: `${ac}15`, border: `1px solid ${ac}35` }}
                >
                  <div className="font-cyber text-[8px] tracking-widest" style={{ color: `${ac}cc` }}>
                    {s.label}
                  </div>
                  <div className="font-cyber text-xs font-bold" style={{ color: ac }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Play button (center, visible on hover) ─────────────────── */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
            style={{
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          >
            <button
              aria-label={`Play ${clip.title}`}
              onClick={(e) => { e.stopPropagation(); setLightbox(true); }}
              className="pointer-events-auto flex items-center justify-center rounded-full"
              style={{
                width: 56,
                height: 56,
                background: `${ac}25`,
                border: `2px solid ${ac}`,
                boxShadow: `0 0 24px ${ac}80, 0 0 50px ${ac}30`,
                color: '#fff',
                fontSize: 22,
                backdropFilter: 'blur(6px)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              ▶
            </button>
          </div>

          {/* ── Corner HUD decorations ────────────────────────────────────── */}
          {[
            { pos: 'top-0 left-0', bt: '2px', bb: 'none', bl: '2px', br: 'none' },
            { pos: 'top-0 right-0', bt: '2px', bb: 'none', bl: 'none', br: '2px' },
            { pos: 'bottom-0 left-0', bt: 'none', bb: '2px', bl: '2px', br: 'none' },
            { pos: 'bottom-0 right-0', bt: 'none', bb: '2px', bl: 'none', br: '2px' },
          ].map((c) => (
            <div
              key={c.pos}
              className={`absolute ${c.pos} w-4 h-4 pointer-events-none z-20`}
              style={{
                borderTop: c.bt !== 'none' ? `${c.bt} solid ${ac}` : 'none',
                borderBottom: c.bb !== 'none' ? `${c.bb} solid ${ac}` : 'none',
                borderLeft: c.bl !== 'none' ? `${c.bl} solid ${ac}` : 'none',
                borderRight: c.br !== 'none' ? `${c.br} solid ${ac}` : 'none',
                opacity: hovered ? 1 : 0.5,
                transition: 'opacity 0.3s',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* ── Lightbox ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key={`lb-${clip.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(12px)' }}
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="relative w-full max-w-3xl rounded-xl overflow-hidden"
              style={{ border: `1px solid ${ac}60`, boxShadow: `0 0 40px ${ac}30` }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setLightbox(false)}
                aria-label="Schließen"
                className="absolute top-3 right-3 z-20 text-white/50 hover:text-white px-2 py-0.5 bg-black/50 rounded font-cyber text-sm transition-colors"
              >
                ✕
              </button>
              {/* Video or external link */}
              {clip.youtubeId ? (
                <div className="aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${clip.youtubeId}?autoplay=1&rel=0`}
                    title={clip.title}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    style={{ border: 'none' }}
                  />
                </div>
              ) : (
                <div
                  className="aspect-video flex flex-col items-center justify-center gap-5"
                  style={{ background: clip.bgGradient }}
                >
                  <div className="text-6xl">{clip.emoji}</div>
                  <p className="font-cyber text-white text-lg tracking-widest">{clip.title}</p>
                  <a
                    href={clip.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-cyber text-xs tracking-widest px-6 py-3 rounded border transition-all"
                    style={{ borderColor: `${ac}70`, color: ac, boxShadow: `0 0 16px ${ac}40` }}
                    onClick={() => setLightbox(false)}
                  >
                    ▶ CLIP ÖFFNEN →
                  </a>
                </div>
              )}
              {/* Footer */}
              <div
                className="px-5 py-3 flex items-center justify-between gap-3"
                style={{ background: 'rgba(3,5,10,0.97)' }}
              >
                <div>
                  <p className="font-cyber text-white/80 text-xs tracking-wider">{clip.title}</p>
                  <p className="font-body text-white/40 text-xs mt-0.5">{clip.subtitle}</p>
                </div>
                <a
                  href={clip.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-cyber text-xs tracking-widest px-4 py-2 rounded border shrink-0 transition-all"
                  style={{ borderColor: `${ac}50`, color: ac }}
                  onClick={(e) => e.stopPropagation()}
                >
                  ↗ ÖFFNEN
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Main ClutchReel section ──────────────────────────────────────────────────
export default function ClutchReel() {
  return (
    <section className="py-20 px-6 relative overflow-hidden" id="clutch-reel">
      {/* Section background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,0,85,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Section header ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border"
            style={{ borderColor: 'rgba(255,0,85,0.35)', background: 'rgba(255,0,85,0.07)' }}
          >
            <span className="text-neon-pink text-xs font-cyber tracking-widest animate-pulse">
              🎬 CLUTCH REEL – BEST MOMENTS
            </span>
          </div>
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-4">
            CLUTCH{' '}
            <span
              className="glitch-text"
              data-text="REEL"
              style={{ color: '#ff0055', textShadow: '0 0 15px #ff0055, 0 0 35px #ff005550' }}
            >
              REEL
            </span>
          </h2>
          <p className="text-white/50 font-body text-sm">
            Hover für Stats – Klick für den Clip – 3D Tilt aktiv
          </p>
        </motion.div>

        {/* ── 6-card grid ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CLIPS.map((clip, i) => (
            <ClutchCard key={clip.id} clip={clip} index={i} />
          ))}
        </div>

        {/* ── CTA row ────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <a
            href="https://www.youtube.com/@Zyztm"
            target="_blank"
            rel="noopener noreferrer"
            className="font-cyber text-xs tracking-widest px-6 py-3 rounded border transition-all"
            style={{ borderColor: 'rgba(255,32,32,0.45)', color: '#ff4444' }}
          >
            📺 YOUTUBE →
          </a>
          <a
            href="https://youtube.com/@FortniteNexusDE/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="font-cyber text-xs tracking-widest px-6 py-3 rounded border transition-all"
            style={{ borderColor: 'rgba(83,252,24,0.45)', color: '#53fc18' }}
          >
            🟢 KICK CLIPS →
          </a>
          <a
            href="https://www.tiktok.com/@fortnitenexus"
            target="_blank"
            rel="noopener noreferrer"
            className="font-cyber text-xs tracking-widest px-6 py-3 rounded border transition-all"
            style={{ borderColor: 'rgba(255,0,85,0.45)', color: '#ff0055' }}
          >
            🎵 TIKTOK →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
