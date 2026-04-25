import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ── color tokens ──────────────────────────────────────────── */
const NEON_GREEN = '#39FF14'; // Fortnite neon green
const GOLD       = '#FFD700'; // Gold
const PINK       = '#FF00FF'; // Magenta
const CYAN       = '#00f2ff'; // Cyan (existing brand accent)

/* ── CSS injected into <head> once for keyframe animations ─── */
const STYLES = `
/* particle burst */
@keyframes cs-particle {
  0%   { transform: translate(0,0) scale(1); opacity: 1; }
  100% { transform: translate(var(--tx),var(--ty)) scale(0); opacity: 0; }
}
/* card hover glow pulse */
@keyframes cs-glow {
  0%,100% { box-shadow: 0 0 12px var(--gc), 0 0 24px var(--gc); }
  50%     { box-shadow: 0 0 28px var(--gc), 0 0 56px var(--gc), 0 0 80px var(--gc); }
}
/* scanline sweep */
@keyframes cs-scan {
  0%   { top: -6px; }
  100% { top: 100%; }
}
/* glitch shift */
@keyframes cs-glitch-x {
  0%,90%,100% { clip-path: none; transform: none; opacity: 0; }
  91% { clip-path: polygon(0 20%,100% 20%,100% 45%,0 45%); transform: translateX(-4px); opacity: .7; }
  93% { clip-path: polygon(0 60%,100% 60%,100% 80%,0 80%); transform: translateX(4px);  opacity: .7; }
  95% { clip-path: polygon(0 40%,100% 40%,100% 55%,0 55%); transform: translateX(-2px); opacity: 0; }
}
/* sound-wave bar */
@keyframes cs-wave {
  0%,100% { transform: scaleY(.3); }
  50%     { transform: scaleY(1); }
}
/* blinking cursor */
@keyframes cs-cursor {
  0%,100% { opacity: 1; }
  50%     { opacity: 0; }
}
/* typing glow on card */
@keyframes cs-type-glow {
  from { text-shadow: 0 0 4px currentColor; }
  to   { text-shadow: 0 0 12px currentColor, 0 0 24px currentColor; }
}
`;

/* ── inject styles once — check DOM to survive HMR ────────── */
function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('cs-keyframes')) return; // already injected
  const el = document.createElement('style');
  el.id = 'cs-keyframes';
  el.textContent = STYLES;
  document.head.appendChild(el);
}

/* ── fan-art data ────────────────────────────────────────────── */
const FAN_ART = [
  { id: 1, handle: '@nexus_art',    desc: 'Digitales Portrait', color: NEON_GREEN    },
  { id: 2, handle: '@pixel_girl',   desc: 'Pixel-Art Style',    color: PINK },
  { id: 3, handle: '@sketch_max',   desc: 'Bleistift-Skizze',   color: GOLD },
  { id: 4, handle: '@neon_creator', desc: 'Neon-Artwork',        color: CYAN },
] as const;

/* ── testimonial data ────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    quote: 'Fortnite Nexus hat mich zu einem besseren Spieler gemacht. Durch die Tutorials habe ich endlich meinen ersten Solo-Win geholt!',
    name: 'xX_Gaming_Luca_Xx', platform: 'Discord', color: NEON_GREEN,    icon: '🎮',
  },
  {
    id: 2,
    quote: 'Die beste deutsche Fortnite-Community. Die Guides und Support sind einfach klasse!',
    name: 'SarahPlays',        platform: 'YouTube',    color: PINK,  icon: '😂',
  },
  {
    id: 3,
    quote: 'Die Community ist wie eine Familie. Danke Fortnite Nexus für diesen großartigen Raum!',
    name: 'Nexus_Fan_2024',    platform: 'Discord', color: GOLD,  icon: '💙',
  },
] as const;

/* ──────────────────────────────────────────────────────────────
   INLINE SVG FAN-ART ILLUSTRATIONS
   ────────────────────────────────────────────────────────────── */

/** 1 – Cyberpunk portrait (neon green) */
function SvgPortrait() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <filter id="cs-gf"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="200" height="200" fill="#040810"/>
      {/* grid */}
      {[40,80,120,160].map(v => (
        <React.Fragment key={v}>
          <line x1={v} y1="0" x2={v} y2="200" stroke={NEON_GREEN} strokeWidth=".25" opacity=".18"/>
          <line x1="0" y1={v} x2="200" y2={v} stroke={NEON_GREEN} strokeWidth=".25" opacity=".18"/>
        </React.Fragment>
      ))}
      {/* helmet/head */}
      <polygon points="100,22 138,52 134,108 100,128 66,108 62,52" fill="none" stroke={NEON_GREEN} strokeWidth="1.6" filter="url(#cs-gf)" opacity=".95"/>
      {/* visor */}
      <polygon points="80,62 120,62 128,82 100,90 72,82" fill={`${NEON_GREEN}20`} stroke={NEON_GREEN} strokeWidth="1.2"/>
      {/* eyes */}
      <rect x="83" y="68" width="10" height="5" rx="1" fill={NEON_GREEN} opacity=".9"/>
      <rect x="107" y="68" width="10" height="5" rx="1" fill={NEON_GREEN} opacity=".9"/>
      {/* chin guard */}
      <path d="M78,108 Q100,122 122,108" fill="none" stroke={GOLD} strokeWidth="1.2" opacity=".7"/>
      {/* shoulders */}
      <polygon points="44,105 70,98 68,138 42,132" fill="none" stroke={GOLD} strokeWidth="1" opacity=".6"/>
      <polygon points="156,105 130,98 132,138 158,132" fill="none" stroke={GOLD} strokeWidth="1" opacity=".6"/>
      {/* chest plate */}
      <polygon points="68,128 132,128 138,170 62,170" fill="none" stroke={NEON_GREEN} strokeWidth="1.4" opacity=".8"/>
      <line x1="100" y1="128" x2="100" y2="170" stroke={NEON_GREEN} strokeWidth=".7" opacity=".5"/>
      <line x1="72" y1="148" x2="128" y2="148" stroke={GOLD} strokeWidth=".7" opacity=".4"/>
      {/* neon accent lines */}
      <line x1="55" y1="182" x2="145" y2="182" stroke={NEON_GREEN} strokeWidth="1" opacity=".5" filter="url(#cs-gf)"/>
      <line x1="45" y1="187" x2="155" y2="187" stroke={GOLD} strokeWidth=".5" opacity=".35"/>
      <text x="100" y="197" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={NEON_GREEN} opacity=".7">@nexus_art</text>
    </svg>
  );
}

/** 2 – Pixel-art character (magenta) */
function SvgPixel() {
  // 16 × 16 pixel map: 0=transparent, 1=skin, 2=dark, 3=armor, 4=accent
  const MAP = [
    [0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0],
    [0,0,0,0,2,2,2,2,2,2,2,0,0,0,0,0],
    [0,0,0,0,2,1,1,2,2,1,1,2,0,0,0,0],
    [0,0,0,0,2,4,1,2,2,1,4,2,0,0,0,0],
    [0,0,0,0,2,1,1,1,1,1,1,2,0,0,0,0],
    [0,0,0,0,2,1,3,1,1,3,1,2,0,0,0,0],
    [0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0],
    [0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
    [0,0,3,4,3,3,3,3,3,3,3,3,4,3,0,0],
    [0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0],
    [0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0],
    [0,3,2,3,3,3,3,3,3,3,3,3,3,2,3,0],
    [0,0,2,2,3,3,3,3,3,3,3,3,2,2,0,0],
    [0,0,0,2,2,3,3,3,3,3,3,2,2,0,0,0],
    [0,0,0,2,2,0,0,0,0,0,0,2,2,0,0,0],
    [0,0,0,2,0,0,0,0,0,0,0,0,2,0,0,0],
  ];
  const C = ['transparent','#FFB366','#553322', PINK, GOLD];
  const S = 200 / 16;
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style={{ imageRendering: 'pixelated' }}>
      <rect width="200" height="200" fill="#0a0010"/>
      {MAP.map((row, y) => row.map((p, x) => p > 0 ? (
        <rect key={`${x}-${y}`} x={x*S} y={y*S} width={S} height={S} fill={C[p]} opacity=".95"/>
      ) : null))}
      {/* scanline overlay */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={i} x1="0" y1={i*10+5} x2="200" y2={i*10+5} stroke="#000" strokeWidth="1" opacity=".18"/>
      ))}
      <text x="100" y="197" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={PINK} opacity=".7">@pixel_girl</text>
    </svg>
  );
}

/** 3 – Pencil sketch (gold) */
function SvgSketch() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="200" height="200" fill="#07070b"/>
      {/* cross-hatch bg */}
      {Array.from({ length: 14 }).map((_, i) => (
        <React.Fragment key={i}>
          <line x1={i*16} y1="0" x2={i*16+200} y2="200" stroke="rgba(255,255,255,.06)" strokeWidth=".6"/>
          <line x1={i*16+200} y1="0" x2={i*16} y2="200" stroke="rgba(255,255,255,.06)" strokeWidth=".6"/>
        </React.Fragment>
      ))}
      {/* head */}
      <ellipse cx="100" cy="52" rx="26" ry="29" fill="none" stroke="rgba(255,255,255,.75)" strokeWidth="1.6"/>
      {/* hair strokes */}
      <path d="M77,42 Q84,24 100,21 Q116,24 123,42" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.4"/>
      <path d="M80,38 Q88,26 100,23" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth=".8"/>
      {/* eyes */}
      <line x1="87" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,.85)" strokeWidth="1.6"/>
      <line x1="105" y1="50" x2="113" y2="50" stroke="rgba(255,255,255,.85)" strokeWidth="1.6"/>
      {/* nose */}
      <path d="M97,58 Q100,64 103,58" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1"/>
      {/* mouth */}
      <path d="M91,68 Q100,74 109,68" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="1.3"/>
      {/* neck */}
      <line x1="94" y1="81" x2="93" y2="94" stroke="rgba(255,255,255,.6)" strokeWidth="1.3"/>
      <line x1="106" y1="81" x2="107" y2="94" stroke="rgba(255,255,255,.6)" strokeWidth="1.3"/>
      {/* body */}
      <path d="M60,100 Q72,94 93,94 L107,94 Q128,94 140,100 L145,135 L55,135 Z" fill="none" stroke="rgba(255,255,255,.65)" strokeWidth="1.5"/>
      {/* chest detail */}
      <path d="M82,106 L100,114 L118,106" fill="none" stroke={GOLD} strokeWidth="1.1" opacity=".65"/>
      <line x1="78" y1="110" x2="122" y2="110" stroke="rgba(255,255,255,.2)" strokeWidth=".7"/>
      {/* arms */}
      <path d="M60,100 L44,144 L50,148" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.4"/>
      <path d="M140,100 L156,144 L150,148" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.4"/>
      {/* legs */}
      <line x1="80" y1="135" x2="74" y2="175" stroke="rgba(255,255,255,.65)" strokeWidth="1.4"/>
      <line x1="120" y1="135" x2="126" y2="175" stroke="rgba(255,255,255,.65)" strokeWidth="1.4"/>
      {/* boots */}
      <path d="M68,175 L80,175" stroke="rgba(255,255,255,.5)" strokeWidth="1.4"/>
      <path d="M120,175 L132,175" stroke="rgba(255,255,255,.5)" strokeWidth="1.4"/>
      {/* gold crown accent */}
      <path d="M86,37 L100,26 L114,37" fill="none" stroke={GOLD} strokeWidth="1.3" opacity=".75"/>
      <text x="100" y="197" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={GOLD} opacity=".7">@sketch_max</text>
    </svg>
  );
}

/** 4 – Neon geometric artwork (cyan) */
function SvgNeon() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <filter id="cs-gf2"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="cs-gf3"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="200" height="200" fill="#030510"/>
      <circle cx="70" cy="80" r="45" fill={`${CYAN}06`}/>
      <circle cx="130" cy="120" r="45" fill={`${PINK}06`}/>
      {/* outer hex */}
      <polygon points="100,18 144,54 144,146 100,182 56,146 56,54" fill="none" stroke={CYAN} strokeWidth="1.2" filter="url(#cs-gf2)" opacity=".9"/>
      {/* inner hex */}
      <polygon points="100,38 128,60 128,120 100,142 72,120 72,60" fill="none" stroke={PINK} strokeWidth="1.5" filter="url(#cs-gf3)" opacity=".8"/>
      {/* core ring */}
      <circle cx="100" cy="90" r="18" fill="none" stroke={CYAN} strokeWidth="2" filter="url(#cs-gf2)"/>
      <circle cx="100" cy="90" r="9"  fill={`${CYAN}35`} filter="url(#cs-gf2)"/>
      {/* radial energy lines */}
      <line x1="100" y1="72" x2="100" y2="38" stroke={CYAN} strokeWidth="1.1" filter="url(#cs-gf2)" opacity=".8"/>
      <line x1="100" y1="108" x2="100" y2="142" stroke={PINK} strokeWidth="1.1" filter="url(#cs-gf3)" opacity=".8"/>
      <line x1="82"  y1="90" x2="56"  y2="90" stroke={GOLD} strokeWidth="1" opacity=".85"/>
      <line x1="118" y1="90" x2="144" y2="90" stroke={GOLD} strokeWidth="1" opacity=".85"/>
      <line x1="114" y1="76" x2="133" y2="57" stroke={CYAN} strokeWidth=".9" opacity=".55"/>
      <line x1="86"  y1="76" x2="67"  y2="57" stroke={PINK} strokeWidth=".9" opacity=".55"/>
      {/* corner frames */}
      {[[12,12],[168,12],[12,168],[168,168]].map(([cx2, cy2], i) => (
        <rect key={i} x={cx2} y={cy2} width="20" height="20" fill="none" stroke={i < 2 ? GOLD : CYAN} strokeWidth=".9" opacity=".5"/>
      ))}
      {/* cardinal dots */}
      <circle cx="100" cy="22" r="2.5" fill={GOLD} opacity=".9"/>
      <circle cx="100" cy="178" r="2.5" fill={GOLD} opacity=".9"/>
      <circle cx="22"  cy="100" r="2.5" fill={CYAN} opacity=".9"/>
      <circle cx="178" cy="100" r="2.5" fill={CYAN} opacity=".9"/>
      <text x="100" y="197" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={CYAN} opacity=".7">@neon_creator</text>
    </svg>
  );
}

const SVG_COMPONENTS = [SvgPortrait, SvgPixel, SvgSketch, SvgNeon];

/* ──────────────────────────────────────────────────────────────
   3-D TILT HOOK  (vanilla JS, 60 fps via rAF)
   ────────────────────────────────────────────────────────────── */
function use3DTilt(strength = 14) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left)  / r.width  - 0.5) * 2;
        const y = ((e.clientY - r.top)   / r.height - 0.5) * 2;
        el.style.transition = 'transform 0.08s linear';
        el.style.transform  = `perspective(900px) rotateY(${x*strength}deg) rotateX(${-y*strength}deg) scale3d(1.05,1.05,1.05)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transition = 'transform 0.55s cubic-bezier(.23,1,.32,1)';
      el.style.transform  = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { cancelAnimationFrame(raf); el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [strength]);
  return ref;
}

/* ──────────────────────────────────────────────────────────────
   PARTICLE BURST  (DOM-based, CSS animation)
   ────────────────────────────────────────────────────────────── */
interface Particle { id: number; x: number; y: number; tx: number; ty: number; color: string; size: number; }

function useParticleBurst(colors: string[]) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const burst = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const fresh: Particle[] = Array.from({ length: 14 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist  = 40 + Math.random() * 70;
      return {
        id:    idRef.current++,
        x:     cx, y: cy,
        tx:    Math.cos(angle) * dist,
        ty:    Math.sin(angle) * dist,
        color: colors[Math.floor(Math.random() * colors.length)],
        size:  3 + Math.random() * 5,
      };
    });
    setParticles(p => [...p, ...fresh]);
    // Use a Set for O(1) ID lookup during cleanup
    const freshIds = new Set(fresh.map(f => f.id));
    setTimeout(() => setParticles(p => p.filter(pt => !freshIds.has(pt.id))), 850);
  }, [colors]);
  return { particles, burst };
}

/* ──────────────────────────────────────────────────────────────
   TYPING ANIMATION HOOK
   ────────────────────────────────────────────────────────────── */
function useTyping(text: string, active: boolean, delay = 0) {
  const [out, setOut] = useState('');
  useEffect(() => {
    if (!active) return;
    let i = 0;
    setOut('');
    let iv: ReturnType<typeof setInterval> | null = null;
    const t0 = setTimeout(() => {
      iv = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length && iv) clearInterval(iv);
      }, 22);
    }, delay);
    return () => {
      clearTimeout(t0);
      if (iv) clearInterval(iv);
    };
  }, [active, text, delay]);
  return out;
}

/* ──────────────────────────────────────────────────────────────
   SOUND WAVE VISUALIZER
   ────────────────────────────────────────────────────────────── */
function SoundWave({ color }: { color: string }) {
  const heights = [0.4,0.7,1,0.8,0.5,0.9,0.6,1,0.7,0.4];
  return (
    <div className="flex items-end gap-[3px]" style={{ height: 24 }}>
      {heights.map((h, i) => (
        <span
          key={i}
          style={{
            display: 'block',
            width: 3,
            height: `${h * 100}%`,
            background: color,
            borderRadius: 2,
            opacity: .75,
            transformOrigin: 'bottom',
            animation: `cs-wave ${0.6 + (i % 4) * 0.15}s ease-in-out infinite`,
            animationDelay: `${i * 0.07}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   PROFILE AVATAR (SVG)
   ────────────────────────────────────────────────────────────── */
function Avatar({ name, color }: { name: string; color: string }) {
  const initials = name.slice(0, 2).toUpperCase();
  return (
    <svg viewBox="0 0 48 48" width={48} height={48} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id={`av-${name}`}><circle cx="24" cy="24" r="20"/></clipPath>
      </defs>
      <circle cx="24" cy="24" r="20" fill="#080c14" stroke={color} strokeWidth="1.5"/>
      {/* hex pattern bg */}
      <polygon points="24,10 34,16 34,32 24,38 14,32 14,16" fill="none" stroke={color} strokeWidth=".6" opacity=".35"/>
      <text x="24" y="28" textAnchor="middle" fontFamily="Orbitron,monospace" fontSize="11" fontWeight="700" fill={color}>{initials}</text>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────
   FAN-ART CARD
   ────────────────────────────────────────────────────────────── */
interface FanArtCardProps {
  card: typeof FAN_ART[number];
  index: number;
  SvgComp: React.FC;
  onOpen: (id: number) => void;
}
function FanArtCard({ card, index, SvgComp, onOpen }: FanArtCardProps) {
  const tiltRef  = use3DTilt(12);
  const { particles, burst } = useParticleBurst([NEON_GREEN, GOLD, PINK, CYAN]);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/* outer wrapper handles tilt */}
      <div
        ref={tiltRef}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        className="cursor-pointer select-none"
        onClick={() => onOpen(card.id)}
        onMouseEnter={(e) => { setHovered(true); burst(e); }}
        onMouseLeave={() => setHovered(false)}
      >
        {/* glassmorphism card */}
        <div
          style={{
            background: 'linear-gradient(135deg,rgba(8,12,22,.92) 0%,rgba(5,8,16,.97) 100%)',
            border: `1px solid ${hovered ? card.color : `${card.color}30`}`,
            backdropFilter: 'blur(14px)',
            borderRadius: 12,
            overflow: 'hidden',
            position: 'relative',
            /* CSS variable for glow animation */
            ['--gc' as string]: card.color,
            animation: hovered ? `cs-glow .8s ease-in-out infinite` : 'none',
            boxShadow: hovered ? `0 0 22px ${card.color}55, 0 8px 32px rgba(0,0,0,.6)` : '0 4px 20px rgba(0,0,0,.5)',
            transition: 'border-color .3s, box-shadow .3s',
          }}
        >
          {/* scanline sweep on hover */}
          {hovered && (
            <div style={{
              position: 'absolute', left: 0, right: 0, height: 3,
              background: `linear-gradient(180deg,${card.color}00,${card.color}80,${card.color}00)`,
              animation: 'cs-scan 1.8s linear infinite',
              pointerEvents: 'none', zIndex: 10,
            }}/>
          )}

          {/* SVG art image */}
          <div style={{ aspectRatio: '1/1', position: 'relative', overflow: 'hidden' }}>
            <SvgComp />
            {/* glitch overlay on hover */}
            {hovered && (
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: `linear-gradient(transparent 48%,${card.color}18 50%,transparent 52%)`,
                animation: 'cs-glitch-x .5s steps(1) infinite',
              }}/>
            )}
            {/* bottom gradient fade */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
              background: 'linear-gradient(transparent,rgba(5,8,16,.95))',
            }}/>
          </div>

          {/* particles (inside card) */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {particles.map(p => (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  left: p.x, top: p.y,
                  width: p.size, height: p.size,
                  borderRadius: '50%',
                  background: p.color,
                  boxShadow: `0 0 6px ${p.color}`,
                  pointerEvents: 'none',
                  ['--tx' as string]: `${p.tx}px`,
                  ['--ty' as string]: `${p.ty}px`,
                  animation: 'cs-particle .75s ease-out forwards',
                }}
              />
            ))}
          </div>

          {/* card info footer */}
          <div style={{ padding: '10px 14px 14px' }}>
            <p style={{ fontFamily: 'Orbitron,monospace', fontSize: 11, fontWeight: 700, color: card.color, marginBottom: 2 }}>
              {card.handle}
            </p>
            <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 11, color: 'rgba(255,255,255,.45)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {card.desc}
            </p>
          </div>

          {/* corner accent */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            borderTop: `24px solid ${card.color}`,
            borderLeft: '24px solid transparent',
            opacity: hovered ? .9 : .35,
            transition: 'opacity .3s',
          }}/>
          <span style={{
            position: 'absolute', top: 2, right: 3,
            fontFamily: 'Orbitron,monospace', fontSize: 7, color: '#000', fontWeight: 900, lineHeight: 1,
          }}>ART</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TESTIMONIAL CARD
   ────────────────────────────────────────────────────────────── */
interface TestimonialCardProps {
  t: typeof TESTIMONIALS[number];
  index: number;
}
function TestimonialCard({ t, index }: TestimonialCardProps) {
  const tiltRef  = use3DTilt(10);
  const cardRef  = useRef<HTMLDivElement>(null);
  const inView   = useInView(cardRef, { once: true, amount: 0.4 });
  const displayed = useTyping(t.quote, inView, index * 180);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
    >
      <div
        ref={tiltRef}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform', height: '100%' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            background: 'linear-gradient(135deg,rgba(8,12,22,.93) 0%,rgba(5,8,16,.97) 100%)',
            border: `1px solid ${hovered ? t.color : `${t.color}28`}`,
            backdropFilter: 'blur(14px)',
            borderRadius: 14,
            padding: '24px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: hovered ? `0 0 24px ${t.color}44, 0 12px 40px rgba(0,0,0,.65)` : '0 4px 20px rgba(0,0,0,.5)',
            transition: 'border-color .3s, box-shadow .3s',
            height: '100%',
          }}
        >
          {/* top stripe */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${t.color},transparent)`, opacity: .7 }}/>

          {/* icon + platform */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 28 }}>{t.icon}</span>
            <span style={{
              fontFamily: 'Orbitron,monospace', fontSize: 9, color: t.color,
              border: `1px solid ${t.color}40`, borderRadius: 4,
              padding: '2px 8px', letterSpacing: '0.15em',
            }}>
              {t.platform}
            </span>
          </div>

          {/* typing quote */}
          <blockquote style={{
            fontFamily: 'Rajdhani,sans-serif', fontSize: 14, color: 'rgba(255,255,255,.8)',
            lineHeight: 1.6, fontStyle: 'italic', flex: 1, minHeight: 72,
          }}>
            „{displayed}
            <span style={{
              display: 'inline-block', width: 2, height: '1em', background: t.color,
              marginLeft: 1, verticalAlign: 'text-bottom',
              animation: displayed.length < t.quote.length ? 'none' : 'cs-cursor .7s step-end infinite',
              opacity: displayed.length < t.quote.length ? 1 : undefined,
            }}/>
            "
          </blockquote>

          {/* avatar + name + sound wave */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar name={t.name} color={t.color}/>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'Orbitron,monospace', fontSize: 10, fontWeight: 700, color: t.color, marginBottom: 2 }}>
                {t.name}
              </p>
              <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 10, color: 'rgba(255,255,255,.3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                via {t.platform}
              </p>
            </div>
            <SoundWave color={t.color}/>
          </div>

          {/* corner accent */}
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            borderBottom: `20px solid ${t.color}`,
            borderLeft: '20px solid transparent',
            opacity: hovered ? .8 : .25,
            transition: 'opacity .3s',
          }}/>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   LIGHTBOX
   ────────────────────────────────────────────────────────────── */
interface LightboxProps { id: number | null; onClose: () => void; }
function Lightbox({ id, onClose }: LightboxProps) {
  const card = id != null ? FAN_ART[id - 1] : null;
  const SvgComp = id != null ? SVG_COMPONENTS[id - 1] : null;

  // close on Escape
  useEffect(() => {
    if (!id) return;
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [id, onClose]);

  return (
    <AnimatePresence>
      {id != null && card && SvgComp && (
        <motion.div
          key="lb-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,.88)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
        >
          <motion.div
            key="lb-card"
            initial={{ scale: .7, opacity: 0, y: 40 }}
            animate={{ scale: 1,  opacity: 1, y: 0  }}
            exit={{ scale: .7, opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg,rgba(8,12,22,.97) 0%,rgba(5,8,16,1) 100%)',
              border: `1px solid ${card.color}`,
              borderRadius: 18,
              overflow: 'hidden',
              maxWidth: 520,
              width: '100%',
              boxShadow: `0 0 60px ${card.color}55, 0 30px 80px rgba(0,0,0,.9)`,
            }}
          >
            {/* header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: `1px solid ${card.color}25` }}>
              <span style={{ fontFamily: 'Orbitron,monospace', fontSize: 13, color: card.color, fontWeight: 700 }}>
                {card.handle} – {card.desc}
              </span>
              <button
                onClick={onClose}
                style={{ background: 'none', border: `1px solid ${card.color}50`, color: card.color, borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontFamily: 'Orbitron,monospace', fontSize: 11 }}
              >
                ✕ CLOSE
              </button>
            </div>
            {/* image */}
            <div style={{ aspectRatio: '1/1' }}><SvgComp /></div>
            {/* footer with download cta */}
            <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${card.color}25` }}>
              <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 12, color: 'rgba(255,255,255,.45)' }}>
                Fan-Art eingereicht von <strong style={{ color: card.color }}>{card.handle}</strong>
              </p>
              {/* Download button – placeholder for future integration */}
              <button
                disabled
                title="Download-Funktion kommt bald"
                style={{
                  display: 'inline-block',
                  fontFamily: 'Orbitron,monospace', fontSize: 10, letterSpacing: '0.1em',
                  padding: '7px 16px', borderRadius: 6,
                  background: `linear-gradient(135deg,${card.color}10,${card.color}25)`,
                  border: `1px solid ${card.color}60`,
                  color: `${card.color}80`,
                  cursor: 'not-allowed',
                  opacity: .65,
                }}
              >
                ↓ DOWNLOAD (COMING SOON)
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────────────────────
   MAIN SECTION
   ────────────────────────────────────────────────────────────── */
export default function CommunitySpotlight() {
  const [lightboxId, setLightboxId] = useState<number | null>(null);

  // inject CSS keyframes once on mount
  useEffect(() => { injectStyles(); }, []);

  return (
    <section id="community-spotlight" className="py-20 px-6 relative overflow-hidden">
      {/* ── decorative background ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 80% 60% at 20% 50%, ${NEON_GREEN}06 0%, transparent 65%),
                     radial-gradient(ellipse 60% 50% at 80% 50%, ${PINK}05 0%, transparent 60%)`,
      }}/>
      {/* cyber-grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(${NEON_GREEN}06 1px,transparent 1px),linear-gradient(90deg,${NEON_GREEN}06 1px,transparent 1px)`,
        backgroundSize: '48px 48px',
        maskImage: 'radial-gradient(ellipse 100% 80% at 50% 50%, black, transparent)',
      }}/>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── HEADING ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p style={{ fontFamily: 'Orbitron,monospace', fontSize: 11, letterSpacing: '0.25em', color: NEON_GREEN, marginBottom: 12 }}>
            ◆ COMMUNITY SPOTLIGHT ◆
          </p>
          <h2 style={{ fontFamily: 'Orbitron,monospace', fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}
              className="text-3xl sm:text-4xl md:text-5xl"
          >
            <span style={{ color: '#fff' }}>DIE BESTEN FANS DER WELT</span>
            <br/>
            <span style={{
              background: `linear-gradient(90deg,${NEON_GREEN},${GOLD})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              IHR SEID DER GRUND FÜR ALLES
            </span>
          </h2>
          <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 15, color: 'rgba(255,255,255,.45)', letterSpacing: '0.06em' }}>
            Community Spotlight • Die krassesten Kreationen &amp; Stimmen unserer Warriors
          </p>
          {/* decorative divider */}
          <div style={{ margin: '20px auto 0', width: 180, height: 1, background: `linear-gradient(90deg,transparent,${NEON_GREEN},${GOLD},transparent)` }}/>
        </motion.div>

        {/* ── FAN-ART GALERIE ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <div style={{ width: 4, height: 28, background: `linear-gradient(180deg,${NEON_GREEN},${GOLD})`, borderRadius: 2 }}/>
            <h3 style={{ fontFamily: 'Orbitron,monospace', fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '0.15em' }}>
              🎨 FAN-ART GALERIE
            </h3>
          </div>

          {/* masonry-style grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {FAN_ART.map((card, i) => (
              <FanArtCard
                key={card.id}
                card={card}
                index={i}
                SvgComp={SVG_COMPONENTS[i]}
                onOpen={setLightboxId}
              />
            ))}
          </div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6"
          >
            <div style={{
              background: `linear-gradient(135deg,rgba(57,255,20,.06) 0%,rgba(255,215,0,.04) 100%)`,
              border: `1px solid ${NEON_GREEN}35`,
              backdropFilter: 'blur(12px)',
              borderRadius: 14,
              padding: '20px 28px',
              display: 'flex',
              flexDirection: 'column' as const,
              gap: 16,
              position: 'relative' as const,
              overflow: 'hidden' as const,
            }}
            className="sm:flex-row sm:items-center sm:justify-between"
            >
              {/* top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${NEON_GREEN},transparent)` }}/>
              <div>
                <p style={{ fontFamily: 'Orbitron,monospace', fontSize: 14, fontWeight: 900, color: '#fff', marginBottom: 6 }}>
                  🎨 DEIN FAN-ART HIER?
                </p>
                <p style={{ fontFamily: 'Rajdhani,sans-serif', fontSize: 13, color: 'rgba(255,255,255,.5)' }}>
                  Schick uns deine Kreation per Discord – die besten Warrior-Artworks werden hier featured!
                </p>
              </div>
              <a
                href="https://discord.gg/zyztm"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block', whiteSpace: 'nowrap' as const, flexShrink: 0,
                  fontFamily: 'Orbitron,monospace', fontSize: 11, letterSpacing: '0.12em', fontWeight: 700,
                  padding: '12px 24px', borderRadius: 8,
                  background: `linear-gradient(135deg,${NEON_GREEN}25,${NEON_GREEN}45)`,
                  border: `1px solid ${NEON_GREEN}`,
                  color: NEON_GREEN, textDecoration: 'none',
                  boxShadow: `0 0 18px ${NEON_GREEN}30`,
                  transition: 'box-shadow .25s, transform .2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 32px ${NEON_GREEN}70`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 18px ${NEON_GREEN}30`; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                ⚡ DISCORD BEITRETEN
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* ── FAN-STIMMEN ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div style={{ width: 4, height: 28, background: `linear-gradient(180deg,${GOLD},${PINK})`, borderRadius: 2 }}/>
            <h3 style={{ fontFamily: 'Orbitron,monospace', fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '0.15em' }}>
              💬 FAN-STIMMEN
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.id} t={t} index={i}/>
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── LIGHTBOX ── */}
      <Lightbox id={lightboxId} onClose={() => setLightboxId(null)}/>
    </section>
  );
}
