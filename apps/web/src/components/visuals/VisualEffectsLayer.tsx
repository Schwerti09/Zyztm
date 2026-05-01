/**
 * VisualEffectsLayer - High-End Visual Effects for Fortnite Nexus
 * All effects: Chaos Bus, Floating Skins, Thumbnail Snake, Mid-Scroll Storm, Neon Cursor Trail
 * Performance optimized (60fps, respects prefers-reduced-motion)
 * Nexus Design System: #ff6b00 (nexus-orange), #8b5cf6 (nexus-purple), #10b981 (nexus-green)
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNexusStore } from '../../stores/nexus-store';

// ==================== CHAOS BUS ====================
const ChaosBus = () => {
  const busRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -300, y: Math.random() * 50 + 20 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => ({
        x: prev.x > 150 ? -300 : prev.x + 2,
        y: Math.random() * 50 + 20
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={busRef}
      className="fixed pointer-events-none z-10"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translateX(-50%)'
      }}
      animate={{
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Bus Body */}
      <div className="relative">
        {/* Neon Trail */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-nexus-orange to-nexus-orange/50 blur-sm" />
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-nexus-purple to-nexus-purple/50 blur-sm" />
        
        {/* Bus SVG */}
        <svg width="80" height="40" viewBox="0 0 80 40" className="drop-shadow-2xl">
          {/* Bus Body */}
          <rect x="10" y="10" width="60" height="20" rx="4" fill="#1a1a2e" stroke="#ff6b00" strokeWidth="2" />
          {/* Bus Windows */}
          <rect x="15" y="14" width="12" height="8" rx="2" fill="#8b5cf6" opacity="0.8" />
          <rect x="30" y="14" width="12" height="8" rx="2" fill="#8b5cf6" opacity="0.8" />
          <rect x="45" y="14" width="12" height="8" rx="2" fill="#8b5cf6" opacity="0.8" />
          {/* Bus Wheels */}
          <circle cx="20" cy="32" r="4" fill="#10b981" />
          <circle cx="60" cy="32" r="4" fill="#10b981" />
          {/* Bus Front */}
          <polygon points="70,10 75,15 75,25 70,30" fill="#ff6b00" opacity="0.3" />
        </svg>
      </div>
    </motion.div>
  );
};

// ==================== FLOATING SKINS ====================
const FloatingSkin = ({ delay, x, y, emoji }: { delay: number; x: number; y: number; emoji: string }) => {
  return (
    <motion.div
      className="fixed pointer-events-none z-5 text-6xl opacity-60"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      <div className="relative">
        <div className="absolute inset-0 blur-xl bg-nexus-purple/30 rounded-full" />
        <div className="relative">{emoji}</div>
      </div>
    </motion.div>
  );
};

const FloatingSkins = () => {
  const skins = [
    { emoji: '🦸', x: 10, y: 20 },
    { emoji: '🧙', x: 85, y: 30 },
    { emoji: '🧛', x: 15, y: 70 },
    { emoji: '🧟', x: 90, y: 60 },
    { emoji: '👽', x: 50, y: 85 },
  ];

  return (
    <>
      {skins.map((skin, i) => (
        <FloatingSkin key={i} {...skin} delay={i * 0.5} />
      ))}
    </>
  );
};

// ==================== THUMBNAIL SNAKE ====================
const ThumbnailSnake = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const snakeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const thumbnails = [
    '🎮', '⚔️', '🏆', '🎯', '🔥', '⭐', '💎', '🚀'
  ];

  return (
    <motion.div
      ref={snakeRef}
      className="fixed pointer-events-none z-20 flex gap-1"
      style={{
        left: mousePosition.x + 20,
        top: mousePosition.y + 20,
      }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
    >
      {thumbnails.map((thumb, i) => (
        <motion.div
          key={i}
          className="text-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        >
          {thumb}
        </motion.div>
      ))}
    </motion.div>
  );
};

// ==================== MID-SCROLL STORM ====================
const MidScrollStorm = () => {
  const { scrollYProgress } = useScroll();
  const stormOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0, 0.3, 0.8, 0.3, 0]);
  const stormScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1.5]);
  const stormRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center"
      style={{
        opacity: stormOpacity,
      }}
    >
      <motion.div
        style={{
          scale: stormScale,
          rotate: stormRotation,
        }}
        className="relative"
      >
        {/* Storm Circle */}
        <div className="w-96 h-96 rounded-full border-4 border-nexus-purple/30 blur-sm" />
        <div className="absolute inset-4 rounded-full border-4 border-nexus-orange/30 blur-sm" />
        <div className="absolute inset-8 rounded-full border-4 border-nexus-green/30 blur-sm" />
        
        {/* Storm Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-nexus-orange rounded-full blur-sm"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [0, Math.cos(i * 30 * Math.PI / 180) * 200],
              y: [0, Math.sin(i * 30 * Math.PI / 180) * 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

// ==================== NEON CURSOR TRAIL ====================
const NeonCursorTrail = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);
  const particleIdRef = useRef(0);

  const addParticle = useCallback((x: number, y: number) => {
    const colors = ['#ff6b00', '#8b5cf6', '#10b981'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    setParticles(prev => [
      ...prev,
      { id: particleIdRef.current++, x, y, color }
    ]);

    // Remove particle after 500ms
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== particleIdRef.current - 1));
    }, 500);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      addParticle(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [addParticle]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full blur-sm"
          style={{
            left: particle.x - 4,
            top: particle.y - 4,
            backgroundColor: particle.color,
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
};

// ==================== MAIN VISUAL EFFECTS LAYER ====================
interface VisualEffectsLayerProps {
  enabled?: boolean;
  effects?: {
    chaosBus?: boolean;
    floatingSkins?: boolean;
    thumbnailSnake?: boolean;
    midScrollStorm?: boolean;
    neonCursorTrail?: boolean;
  };
}

export default function VisualEffectsLayer({ 
  enabled = true,
  effects = {
    chaosBus: true,
    floatingSkins: true,
    thumbnailSnake: true,
    midScrollStorm: true,
    neonCursorTrail: true,
  }
}: VisualEffectsLayerProps) {
  const { visualEffectsEnabled } = useNexusStore();
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!enabled || !visualEffectsEnabled || isReducedMotion) {
    return null;
  }

  return (
    <>
      {effects.chaosBus && <ChaosBus />}
      {effects.floatingSkins && <FloatingSkins />}
      {effects.thumbnailSnake && <ThumbnailSnake />}
      {effects.midScrollStorm && <MidScrollStorm />}
      {effects.neonCursorTrail && <NeonCursorTrail />}
    </>
  );
}

// ==================== GLASSMORPHISM HOVER GLOW ====================
export const GlassmorphismHover = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      className={`glass relative overflow-hidden ${className}`}
      whileHover={{
        boxShadow: '0 0 40px rgba(255, 107, 0, 0.3), 0 0 60px rgba(139, 92, 246, 0.2)',
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-nexus-orange/10 via-nexus-purple/10 to-nexus-green/10 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// ==================== EPIC PAGE TRANSITIONS ====================
export const EpicPageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const SectionEntrance = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};
