import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NEON_GOLD = '#FFD700';
const NEON_PINK = '#FF00FF';
const NEON_GREEN = '#39FF14';
const NEON_BLUE = '#00f2ff';

interface FnEvent {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  targetDate: Date;
}

// Target dates relative to a fixed reference point
const EVENTS: FnEvent[] = [
  {
    id: 1,
    name: 'Fortnite × Marvel Collab',
    description: 'Exklusive Marvel Skins & neues LTM: Avengers Endgame Retold',
    icon: '⚡',
    color: NEON_GOLD,
    targetDate: new Date('2026-03-01T20:00:00Z'),
  },
  {
    id: 2,
    name: 'ZYZTM Community Turnier',
    description: '5.000€ Preisgeld – Anmeldung über Discord',
    icon: '🏆',
    color: NEON_GREEN,
    targetDate: new Date('2026-03-05T17:00:00Z'),
  },
  {
    id: 3,
    name: 'Travis Scott Astronomical 2',
    description: 'Einzigartiges In-Game Konzert-Event im Fortnite Universe',
    icon: '🎤',
    color: NEON_PINK,
    targetDate: new Date('2026-03-10T21:00:00Z'),
  },
];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown(targetDate: Date): TimeLeft {
  const calcTimeLeft = (date: Date): TimeLeft => {
    const diff = date.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function CountdownUnit({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        key={value}
        initial={{ scale: 1.2, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="font-cyber text-3xl md:text-4xl font-bold w-16 h-16 flex items-center justify-center rounded-lg"
        style={{
          color,
          background: `${color}10`,
          border: `1px solid ${color}40`,
          boxShadow: `0 0 15px ${color}25`,
          textShadow: `0 0 12px ${color}`,
        }}
      >
        {pad(value)}
      </motion.div>
      <span className="font-cyber text-[9px] tracking-widest text-white/40">{label}</span>
    </div>
  );
}

function EventCard({ event, index }: { event: FnEvent; index: number }) {
  const time = useCountdown(event.targetDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-xl overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(10,12,20,0.95) 0%, rgba(6,8,15,0.98) 100%)`,
        border: `1px solid ${event.color}30`,
        boxShadow: `0 4px 30px ${event.color}15`,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-3 flex items-center gap-3"
        style={{
          background: `linear-gradient(90deg, ${event.color}18, ${event.color}08, transparent)`,
          borderBottom: `1px solid ${event.color}20`,
        }}
      >
        <span className="text-2xl">{event.icon}</span>
        <div className="flex-1 min-w-0">
          <p
            className="font-cyber text-sm font-bold truncate"
            style={{ color: event.color, textShadow: `0 0 8px ${event.color}60` }}
          >
            {event.name}
          </p>
          <p className="text-white/40 text-xs truncate">{event.description}</p>
        </div>
        <div
          className="shrink-0 text-[10px] font-cyber px-2 py-0.5 rounded border tracking-widest"
          style={{ color: event.color, borderColor: `${event.color}40`, background: `${event.color}10` }}
        >
          UPCOMING
        </div>
      </div>

      {/* Countdown */}
      <div className="px-5 py-5 flex justify-center gap-4">
        <CountdownUnit value={time.days} label="TAGE" color={event.color} />
        <div className="flex items-center pb-5 font-cyber text-2xl font-bold" style={{ color: `${event.color}60` }}>:</div>
        <CountdownUnit value={time.hours} label="STD" color={event.color} />
        <div className="flex items-center pb-5 font-cyber text-2xl font-bold" style={{ color: `${event.color}60` }}>:</div>
        <CountdownUnit value={time.minutes} label="MIN" color={event.color} />
        <div className="flex items-center pb-5 font-cyber text-2xl font-bold" style={{ color: `${event.color}60` }}>:</div>
        <CountdownUnit value={time.seconds} label="SEK" color={event.color} />
      </div>
    </motion.div>
  );
}

export default function UpcomingEvents() {
  return (
    <section className="py-20 px-6 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, ${NEON_BLUE}04 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border font-cyber text-xs tracking-widest"
            style={{ borderColor: `${NEON_GOLD}40`, background: `${NEON_GOLD}08`, color: NEON_GOLD }}
          >
            ⏱️ LIVE COUNTDOWN
          </div>
          <h2 className="font-cyber text-4xl md:text-5xl font-bold text-white mb-3">
            UPCOMING{' '}
            <span style={{ color: NEON_GOLD, textShadow: `0 0 15px ${NEON_GOLD}` }}>EVENTS</span>
          </h2>
          <p className="text-white/45">Countdown zu den nächsten Fortnite Events</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {EVENTS.map((ev, i) => (
            <EventCard key={ev.id} event={ev} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
