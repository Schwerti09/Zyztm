import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TourStep {
  id: string;
  title: string;
  description: string;
  emoji: string;
  targetId?: string;
  isVictory?: boolean;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'hero',
    title: 'Willkommen bei Fortnite Nexus!',
    description: 'Dein exklusiver Hub für Streams, digitale Produkte & die Community. Lass uns eine kurze Tour machen!',
    emoji: '👋',
  },
  {
    id: 'about',
    title: 'Meine Gaming-Reise',
    description: 'Erfahre alles über Fortnite Nexus – vom ersten Stream bis zum Creator Cup Sieg. Eine echte Erfolgsgeschichte.',
    emoji: '🚀',
    targetId: 'about',
  },
  {
    id: 'global-empire',
    title: 'Das Global Empire',
    description: 'Fortnite Nexus ist auf allen Plattformen präsent – YouTube, TikTok, Discord. Folge uns überall!',
    emoji: '🌍',
    targetId: 'global-empire',
  },
  {
    id: 'highlights',
    title: 'Stream Highlights',
    description: 'Die besten Momente aus den Streams – epische Clutches, lustige Fails und mehr.',
    emoji: '🎬',
    targetId: 'highlights',
  },
  {
    id: 'marketplace',
    title: 'Der Marketplace',
    description: 'Exklusive digitale Produkte, Creator Codes und mehr. Unterstütze Fortnite Nexus direkt!',
    emoji: '🛒',
    targetId: 'marketplace',
  },
  {
    id: 'soundboard-pro',
    title: 'Soundboard Pro',
    description: 'Interaktives Soundboard mit den kultigsten Nexus-Sounds. Jetzt ausprobieren!',
    emoji: '🎵',
    targetId: 'soundboard-pro',
  },
  {
    id: 'community-spotlight',
    title: 'Community Spotlight',
    description: 'Die Community macht Fortnite Nexus aus. Hier werden die besten Fans und Clips gefeiert!',
    emoji: '🤝',
    targetId: 'community-spotlight',
  },
  {
    id: 'latest-news',
    title: 'Neueste News',
    description: 'Bleib up to date mit den neuesten Infos aus der Fortnite Nexus-Welt und dem Fortnite-Universum.',,
    emoji: '📰',
    targetId: 'latest-news',
  },
  {
    id: 'calendar',
    title: 'Stream-Kalender',
    description: 'Verpasse keinen Stream mehr! Hier siehst du alle geplanten Streams auf einen Blick.',
    emoji: '📅',
    targetId: 'calendar',
  },
  {
    id: 'victory-royale',
    title: 'VICTORY ROYALE!',
    description: 'Du hast den kompletten Fortnite Nexus erkundet! Willkommen im Squad – jetzt kennst du alle Bereiche!',
    emoji: '🏆',
    isVictory: true,
  },
];

const LOOT_EMOJIS = ['🔫', '🛡️', '💊', '⚡', '🏆', '💰', '🎯', '🪂', '💎', '🌟'];
const LOOT_RAIN_COUNT = 25;
const CONFETTI_PARTICLE_COUNT = 120;
const SWIPE_THRESHOLD_PX = 50;
const SAFE_BOTTOM = 'max(24px, calc(env(safe-area-inset-bottom, 0px) + 16px))';
const PANEL_BOTTOM = 'max(84px, calc(env(safe-area-inset-bottom, 0px) + 76px))';

function spawnLootRain(): void {
  for (let i = 0; i < LOOT_RAIN_COUNT; i++) {
    const el = document.createElement('div');
    el.textContent = LOOT_EMOJIS[Math.floor(Math.random() * LOOT_EMOJIS.length)];
    const x = Math.random() * 95;
    const delay = Math.random() * 0.6;
    const size = 18 + Math.random() * 18;
    el.style.cssText = [
      'position:fixed',
      `left:${x}vw`,
      'top:-60px',
      `font-size:${size}px`,
      'z-index:999990',
      'pointer-events:none',
      `animation:lootDrop ${1.2 + Math.random() * 1.2}s ease-in ${delay}s both`,
    ].join(';');
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2800);
  }
}

function spawnNeonFlash(): void {
  const el = document.createElement('div');
  el.style.cssText = [
    'position:fixed',
    'inset:0',
    'z-index:999991',
    'pointer-events:none',
    'background:linear-gradient(135deg,rgba(0,242,255,0.4),rgba(255,0,85,0.3),rgba(57,255,20,0.2))',
    'animation:neonFlashOverlay 0.7s ease-out forwards',
  ].join(';');
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 800);
}

function spawnScreenShake(): void {
  document.documentElement.classList.add('tour-shake');
  setTimeout(() => document.documentElement.classList.remove('tour-shake'), 520);
}

function playSiren(): void {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    const t = ctx.currentTime;
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.linearRampToValueAtTime(1200, t + 0.5);
    osc.frequency.linearRampToValueAtTime(600, t + 1.0);
    osc.frequency.linearRampToValueAtTime(1200, t + 1.5);
    osc.frequency.linearRampToValueAtTime(600, t + 2.0);
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.linearRampToValueAtTime(0, t + 2.0);
    osc.start(t);
    osc.stop(t + 2.0);
  } catch {
    // Audio not available
  }
}

function spawnConfetti(): void {
  const colors = ['#FFD700', '#FF0055', '#00F2FF', '#39FF14', '#FF6B00', '#A855F7', '#FFFFFF', '#FF9900'];
  for (let i = 0; i < CONFETTI_PARTICLE_COUNT; i++) {
    const el = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const x = Math.random() * 98;
    const rotation = Math.random() * 360;
    const w = 6 + Math.random() * 10;
    const h = Math.random() > 0.5 ? w * 2 : w;
    const delay = Math.random() * 1.5;
    const dur = 2.5 + Math.random() * 2;
    el.style.cssText = [
      'position:fixed',
      `left:${x}vw`,
      'top:-20px',
      `width:${w}px`,
      `height:${h}px`,
      `background:${color}`,
      'z-index:999989',
      'pointer-events:none',
      `border-radius:${h === w ? '50%' : '2px'}`,
      `animation:confettiFall ${dur}s ease-in ${delay}s both`,
      `transform:rotate(${rotation}deg)`,
      `box-shadow:0 0 6px ${color}`,
    ].join(';');
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + delay + 0.5) * 1000);
  }
}

function applyGlow(targetId: string | undefined): void {
  document.querySelectorAll('[data-tour-glow]').forEach(el => {
    const h = el as HTMLElement;
    h.style.removeProperty('box-shadow');
    h.style.removeProperty('transition');
    h.removeAttribute('data-tour-glow');
  });
  if (!targetId) return;
  const el = document.getElementById(targetId);
  if (!el) return;
  el.setAttribute('data-tour-glow', 'true');
  el.style.transition = 'box-shadow 0.4s ease';
  el.style.boxShadow =
    '0 0 0 3px #00f2ff, 0 0 40px rgba(0,242,255,0.6), 0 0 80px rgba(0,242,255,0.25)';
}

export default function RundgangTour() {
  const [tourDone, setTourDone] = useState(
    () => typeof window !== 'undefined' && sessionStorage.getItem('nexus-tour-done') === 'true',
  );
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const stepRef = useRef(currentStep);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => { stepRef.current = currentStep; }, [currentStep]);

  const endTour = useCallback(() => {
    applyGlow(undefined);
    setIsActive(false);
    setCurrentStep(0);
    setTourDone(true);
    sessionStorage.setItem('nexus-tour-done', 'true');
  }, []);

  const scrollAndGlow = useCallback((index: number) => {
    const s = TOUR_STEPS[index];
    applyGlow(s.targetId);
    if (s.targetId) {
      const el = document.getElementById(s.targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const goNext = useCallback(() => {
    const next = stepRef.current + 1;
    if (next >= TOUR_STEPS.length) { endTour(); return; }
    if (TOUR_STEPS[next].isVictory) spawnConfetti();
    setCurrentStep(next);
    scrollAndGlow(next);
  }, [endTour, scrollAndGlow]);

  const goPrev = useCallback(() => {
    const prev = stepRef.current - 1;
    if (prev < 0) return;
    setCurrentStep(prev);
    scrollAndGlow(prev);
  }, [scrollAndGlow]);

  const startTour = () => {
    setCurrentStep(0);
    setIsActive(true);
    spawnNeonFlash();
    spawnScreenShake();
    spawnLootRain();
    spawnConfetti();
    playSiren();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isActive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') endTour();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isActive, endTour, goNext, goPrev]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD_PX) {
      dx < 0 ? goNext() : goPrev();
    }
  };

  if (tourDone) return null;

  const step = TOUR_STEPS[currentStep];
  const isLast = currentStep === TOUR_STEPS.length - 1;
  const progress = Math.round(((currentStep + 1) / TOUR_STEPS.length) * 100);

  /* ─── Shared bottom offset (safe-area aware) ─────────────────────────── */

  return (
    <>
      {/* ── Fixed start / beenden button ──────────────────────────────────── */}
      {/*
        Wrapper: mobile → centered, full-width capped at 400 px
                 desktop (md+) → right-aligned, auto-width
        The wrapper itself is never a motion element so Tailwind transforms
        work without framer-motion conflicts.
      */}
      <div
        className="fixed z-[99999] left-1/2 -translate-x-1/2 w-[min(calc(100vw-32px),400px)] md:left-auto md:right-8 md:translate-x-0 md:w-auto"
        style={{ bottom: SAFE_BOTTOM, pointerEvents: 'none' }}
      >
        <AnimatePresence mode="wait">
          {!isActive ? (
            /* ── START button ── */
            <motion.button
              key="tour-start"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.35, type: 'spring', damping: 22 }}
              onClick={startTour}
              className="w-full flex items-center justify-center gap-2 rounded-none"
              style={{
                pointerEvents: 'auto',
                minHeight: '48px',
                padding: '0 18px',
                background: 'linear-gradient(135deg, #39FF14 0%, #00f2ff 50%, #39FF14 100%)',
                backgroundSize: '200% 200%',
                animation: 'btnGradientShift 3s ease infinite',
                border: '2px solid rgba(0,0,0,0.45)',
                boxShadow: '0 0 20px rgba(57,255,20,0.4), 0 0 40px rgba(57,255,20,0.15), 0 4px 16px rgba(0,0,0,0.4)',
                cursor: 'pointer',
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
              }}
              aria-label="Rundgang starten"
            >
              <span style={{ fontSize: '18px', lineHeight: 1 }}>🪂</span>
              <span
                className="font-cyber font-black tracking-widest uppercase"
                style={{ fontSize: 'clamp(11px, 3vw, 14px)', color: '#000' }}
              >
                RUNDGANG STARTEN
              </span>
              <span
                style={{
                  fontSize: '15px',
                  color: '#000',
                  fontWeight: 900,
                  display: 'inline-block',
                  animation: 'arrowBounce 0.8s ease-in-out infinite',
                }}
              >
                →
              </span>
            </motion.button>
          ) : (
            /* ── BEENDEN button (tour active) ── */
            <motion.button
              key="tour-stop"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              onClick={endTour}
              className="w-full flex items-center justify-center gap-2 rounded-lg"
              style={{
                pointerEvents: 'auto',
                minHeight: '52px',
                padding: '0 24px',
                background: 'rgba(255,0,85,0.15)',
                border: '2px solid rgba(255,0,85,0.6)',
                boxShadow: '0 0 20px rgba(255,0,85,0.3)',
                backdropFilter: 'blur(12px)',
                cursor: 'pointer',
                userSelect: 'none',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
              }}
              aria-label="Rundgang beenden"
            >
              <span style={{ fontSize: '18px' }}>✕</span>
              <span
                className="font-cyber font-bold tracking-widest uppercase"
                style={{ fontSize: 'clamp(12px, 3.5vw, 15px)', color: '#ff0055' }}
              >
                RUNDGANG BEENDEN
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Tour overlay ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isActive && (
          <>
            {/* Gradient backdrop */}
            <motion.div
              key="tour-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99997] pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 60%)' }}
            />

            {/* Panel – sits above the button; mobile full-width, desktop centered */}
            <motion.div
              key="tour-panel"
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 48 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed z-[99998] left-0 right-0 px-4 md:left-1/2 md:-translate-x-1/2 md:w-[min(576px,100vw-32px)] md:px-0"
              style={{
                /* sits above the button: button is ~72px + safeBottom; add 12px gap */
                bottom: PANEL_BOTTOM,
              }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(13,17,23,0.98) 0%, rgba(10,12,21,0.99) 100%)',
                  border: '1px solid rgba(0,242,255,0.35)',
                  boxShadow: '0 0 50px rgba(0,242,255,0.15), 0 0 100px rgba(255,0,85,0.07)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* ── Progress bar ── */}
                <div className="relative h-1.5 bg-white/5">
                  <motion.div
                    className="absolute left-0 top-0 h-full"
                    style={{ background: 'linear-gradient(90deg, #00f2ff, #ff0055)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>

                <div className="p-5 md:p-6">
                  {/* Step counter + dot indicators */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-cyber text-xs tracking-widest text-neon-blue/70">
                      SCHRITT {currentStep + 1} / {TOUR_STEPS.length}
                    </span>
                    <div className="flex gap-1 items-center">
                      {TOUR_STEPS.map((_, i) => (
                        <div
                          key={i}
                          className="rounded-full transition-all duration-300"
                          style={{
                            width: i === currentStep ? '20px' : '6px',
                            height: '6px',
                            background:
                              i === currentStep
                                ? '#00f2ff'
                                : i < currentStep
                                ? 'rgba(0,242,255,0.4)'
                                : 'rgba(255,255,255,0.1)',
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Step content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: 22 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -22 }}
                      transition={{ duration: 0.2 }}
                    >
                      {step.isVictory ? (
                        <div className="text-center py-3">
                          <div style={{ fontSize: '64px', animation: 'float 2s ease-in-out infinite' }}>
                            {step.emoji}
                          </div>
                          <h3
                            className="font-cyber font-black text-2xl mt-2 mb-2"
                            style={{ animation: 'victoryPulse 1.5s ease-in-out infinite' }}
                          >
                            <span
                              style={{
                                background: 'linear-gradient(135deg, #FFD700, #FF6B00)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                              }}
                            >
                              {step.title}
                            </span>
                          </h3>
                          <p className="text-white/70 font-body text-base">{step.description}</p>
                        </div>
                      ) : (
                        <div className="flex items-start gap-4">
                          <span className="text-4xl shrink-0">{step.emoji}</span>
                          <div>
                            <h3 className="font-cyber text-base font-bold text-white mb-1">{step.title}</h3>
                            <p className="text-white/60 text-sm font-body leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center gap-3 mt-5">
                    {/* ZURÜCK */}
                    <button
                      onClick={goPrev}
                      disabled={currentStep === 0}
                      className="font-cyber font-bold tracking-widest flex-shrink-0 rounded-lg transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
                      style={{
                        minHeight: '60px',
                        minWidth: '60px',
                        width: '60px',
                        fontSize: '22px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'rgba(255,255,255,0.65)',
                        background: 'rgba(255,255,255,0.05)',
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation',
                      }}
                      aria-label="Vorheriger Schritt"
                    >
                      ←
                    </button>

                    {/* WEITER / VICTORY */}
                    <button
                      onClick={goNext}
                      className="font-cyber font-black tracking-widest flex-1 rounded-lg transition-all duration-200"
                      style={{
                        minHeight: '60px',
                        fontSize: 'clamp(13px, 3.5vw, 16px)',
                        border: isLast ? '2px solid rgba(255,215,0,0.65)' : '2px solid rgba(0,242,255,0.55)',
                        color: isLast ? '#FFD700' : '#00f2ff',
                        background: isLast ? 'rgba(255,215,0,0.1)' : 'rgba(0,242,255,0.09)',
                        boxShadow: isLast
                          ? '0 0 24px rgba(255,215,0,0.2)'
                          : '0 0 24px rgba(0,242,255,0.15)',
                        WebkitTapHighlightColor: 'transparent',
                        touchAction: 'manipulation',
                      }}
                      aria-label={isLast ? 'Tour abschließen' : 'Nächster Schritt'}
                    >
                      {isLast ? '🏆 VICTORY ROYALE!' : 'WEITER →'}
                    </button>
                  </div>

                  {/* Swipe hint – mobile only */}
                  <p className="text-center text-white/20 text-xs font-body mt-3 md:hidden select-none">
                    ← wischen zum Navigieren →
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
