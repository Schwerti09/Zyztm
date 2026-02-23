import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  '> ZYZTM NEXUS OS v2.4.1 — INITIALISIERUNG...',
  '> KERNEL GELADEN ✓',
  '> NEON-PROTOKOLL AKTIV ✓',
  '> VERBINDUNG WIRD HERGESTELLT...',
  '> STREAM-INTERFACE BEREIT ✓',
  '> STARTE PREVIEW...',
];

const STATUS_ITEMS = [
  { label: 'SIGNAL', value: '98%', color: '#00f2ff' },
  { label: 'FPS', value: '144', color: '#00f2ff' },
  { label: 'PING', value: '12ms', color: '#00f2ff' },
  { label: 'STATUS', value: 'LIVE', color: '#ff0055' },
];

export default function LaptopMockup() {
  const [booted, setBooted] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const startedRef = useRef(false);

  // Trigger boot sequence when section enters view
  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    let step = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const advance = () => {
      step += 1;
      if (step < BOOT_LINES.length) {
        setBootStep(step);
        timers.push(setTimeout(advance, 280));
      } else {
        timers.push(setTimeout(() => setBooted(true), 400));
      }
    };
    setBootStep(1);
    timers.push(setTimeout(advance, 280));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <section ref={sectionRef} className="py-20 px-6 relative flex flex-col items-center overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 40% at 50% 60%, rgba(0,242,255,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 relative z-10"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 border border-neon-blue/30 text-neon-blue text-xs font-cyber tracking-widest mb-3"
          animate={{ borderColor: ['rgba(0,242,255,0.3)', 'rgba(0,242,255,0.7)', 'rgba(0,242,255,0.3)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ◉
          </motion.span>
          LIVE PREVIEW
        </motion.div>

        <h2 className="font-cyber text-3xl md:text-4xl font-bold text-white mb-3">
          <span className="text-neon-blue neon-text-blue">NEXUS</span>{' '}
          <span className="text-white">PREVIEW</span>
        </h2>
        <p className="text-white/50 text-sm">Dein exklusiver Hub – so sieht er aus</p>
      </motion.div>

      {/* Laptop wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        whileHover={{ y: -12, scale: 1.02 }}
        className="relative w-full max-w-3xl"
      >
        {/* Animated outer glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: [
              '0 0 40px rgba(0,242,255,0.2), 0 0 80px rgba(255,0,85,0.1)',
              '0 0 60px rgba(0,242,255,0.35), 0 0 120px rgba(255,0,85,0.2)',
              '0 0 40px rgba(0,242,255,0.2), 0 0 80px rgba(255,0,85,0.1)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'blur(2px)' }}
        />

        {/* Animated corner brackets */}
        {[
          { top: -8, left: -8, rotate: 0 },
          { top: -8, right: -8, rotate: 90 },
          { bottom: 8, left: -8, rotate: 270 },
          { bottom: 8, right: -8, rotate: 180 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-5 h-5 pointer-events-none"
            style={{
              ...pos,
              borderTop: '2px solid #00f2ff',
              borderLeft: '2px solid #00f2ff',
              transform: `rotate(${pos.rotate}deg)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
          />
        ))}

        {/* Floating status indicators */}
        <div className="absolute -right-2 top-4 flex flex-col gap-2 translate-x-full pl-3 hidden md:flex">
          {STATUS_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + i * 0.15, duration: 0.4 }}
              className="flex items-center gap-2 px-2 py-1 text-xs font-cyber"
              style={{
                background: 'rgba(3,5,10,0.85)',
                border: `1px solid ${item.color}33`,
                backdropFilter: 'blur(8px)',
              }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: item.color }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.3 }}
              />
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>{item.label}</span>
              <span style={{ color: item.color }}>{item.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Screen bezel */}
        <motion.div
          className="relative mx-auto rounded-t-2xl overflow-hidden"
          animate={{
            borderColor: ['rgba(0,242,255,0.3)', 'rgba(0,242,255,0.55)', 'rgba(0,242,255,0.3)'],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            background: 'linear-gradient(145deg, #1a1f2e, #0d1117)',
            border: '2px solid rgba(0,242,255,0.3)',
            boxShadow: '0 0 30px rgba(0,242,255,0.15), inset 0 0 30px rgba(0,0,0,0.8)',
            paddingTop: '2%',
            paddingLeft: '2%',
            paddingRight: '2%',
          }}
        >
          {/* Camera dot */}
          <div className="flex justify-center mb-1">
            <motion.div
              className="w-2 h-2 rounded-full"
              animate={{ boxShadow: ['0 0 4px rgba(0,242,255,0.4)', '0 0 10px rgba(0,242,255,0.9)', '0 0 4px rgba(0,242,255,0.4)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ background: '#222' }}
            />
          </div>

          {/* Screen glass */}
          <div
            className="relative rounded-lg overflow-hidden"
            style={{
              aspectRatio: '16/10',
              background: '#03050a',
              border: '1px solid rgba(0,242,255,0.2)',
            }}
          >
            {/* Scan line */}
            <div
              className="absolute inset-x-0 top-0 h-px pointer-events-none z-20"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(0,242,255,0.7), transparent)',
                animation: 'scan-line 3s linear infinite',
              }}
            />

            {/* CRT horizontal lines overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
              }}
            />

            {/* Reflection overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(0,242,255,0.04) 100%)',
              }}
            />

            {/* Boot sequence / iframe */}
            <AnimatePresence mode="wait">
              {!booted ? (
                <motion.div
                  key="boot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col justify-center px-6 py-4"
                  style={{ background: '#03050a' }}
                >
                  <div className="font-mono text-xs space-y-1">
                    {BOOT_LINES.slice(0, bootStep).map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ color: i === bootStep - 1 ? '#00f2ff' : 'rgba(0,242,255,0.45)' }}
                      >
                        {line}
                      </motion.div>
                    ))}
                    {bootStep > 0 && bootStep < BOOT_LINES.length && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        style={{ color: '#00f2ff' }}
                      >
                        █
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="iframe"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <iframe
                    src="https://www.youtube.com/embed/videoseries?list=UUyJ9OBiMrj2LMUeY7XVhbew&autoplay=0&rel=0&modestbranding=1"
                    title="Zyztm YouTube Kanal"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                    style={{ display: 'block' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Laptop base / hinge */}
        <div
          className="relative mx-auto"
          style={{
            background: 'linear-gradient(180deg, #181e2c, #0d1117)',
            border: '2px solid rgba(0,242,255,0.2)',
            borderTop: 'none',
            borderRadius: '0 0 12px 12px',
            height: '20px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
          }}
        >
          {/* Trackpad hint */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '60px',
              height: '10px',
              background: 'rgba(0,242,255,0.05)',
              border: '1px solid rgba(0,242,255,0.15)',
              borderRadius: '3px',
            }}
          />
        </div>

        {/* Base shadow */}
        <div
          className="mx-auto mt-1"
          style={{
            height: '8px',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.5), transparent)',
            borderRadius: '0 0 50% 50%',
            filter: 'blur(6px)',
          }}
        />
      </motion.div>
    </section>
  );
}
