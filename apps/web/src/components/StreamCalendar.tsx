import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const NEON_PINK = '#ff0055';
const NEON_BLUE = '#00f2ff';
const NEON_GREEN = '#53fc18';

const STREAM_DURATION_MS = 3 * 60 * 60 * 1000; // 3-hour stream window

interface StreamSlot {
  day: string;
  shortDay: string;
  startTime: string; // 'HH:MM' format used for calculations
  displayTime: string; // Display string shown in UI
  game: string;
  icon: string;
  color: string;
}

const SCHEDULE: StreamSlot[] = [
  { day: 'Dienstag', shortDay: 'DI', startTime: '20:00', displayTime: '20:00 Uhr', game: 'Fortnite', icon: '🎮', color: NEON_PINK },
  { day: 'Donnerstag', shortDay: 'DO', startTime: '20:00', displayTime: '20:00 Uhr', game: 'Fortnite', icon: '🎯', color: NEON_BLUE },
  { day: 'Samstag', shortDay: 'SA', startTime: '17:00', displayTime: '17:00 Uhr', game: 'Special Event', icon: '🏆', color: '#ffd700' },
];

const STREAM_DAYS = [2, 4, 6]; // Tuesday, Thursday, Saturday (0=Sun)

function getNextStreamDate(schedule: StreamSlot[]): { slot: StreamSlot; date: Date } | null {
  if (schedule.length === 0) return null;
  const now = new Date();
  const candidates: { slot: StreamSlot; date: Date }[] = [];

  STREAM_DAYS.forEach((targetDay, i) => {
    const slot = schedule[i];
    if (!slot) return;
    const [hours, minutes] = slot.startTime.split(':').map(Number);
    const d = new Date(now);
    const diff = (targetDay - d.getDay() + 7) % 7;
    d.setDate(d.getDate() + diff);
    d.setHours(hours ?? 20, minutes ?? 0, 0, 0);
    if (d <= now) d.setDate(d.getDate() + 7);
    candidates.push({ slot, date: d });
  });

  candidates.sort((a, b) => a.date.getTime() - b.date.getTime());
  return candidates[0] ?? null;
}

function useCountdown(target: Date | null) {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!target) return;
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setRemaining({ days, hours, minutes, seconds });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return remaining;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function formatDate(date: Date) {
  return date.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });
}

function buildCalendarUrl(slot: StreamSlot, date: Date): string {
  const startISO = date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const end = new Date(date.getTime() + STREAM_DURATION_MS);
  const endISO = end.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Zyztm Stream – ${slot.game}`,
    dates: `${startISO}/${endISO}`,
    details: 'Zyztm ist live auf Kick.com/zyztm',
    location: 'https://kick.com/zyztm',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function StreamCalendar() {
  const next = getNextStreamDate(SCHEDULE);
  const countdown = useCountdown(next?.date ?? null);

  const units = [
    { label: 'TAGE', value: countdown.days },
    { label: 'STD', value: countdown.hours },
    { label: 'MIN', value: countdown.minutes },
    { label: 'SEK', value: countdown.seconds },
  ];

  return (
    <section className="py-20 px-6 relative" id="calendar">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(83,252,24,0.04) 0%, transparent 70%)',
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
            STREAM{' '}
            <span style={{ color: NEON_GREEN, textShadow: `0 0 15px ${NEON_GREEN}` }}>KALENDER</span>
          </h2>
          <p className="text-white/50">Wann ist Zyztm das nächste Mal live?</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Next stream card */}
          {next && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="cyber-card rounded-xl p-8"
              style={{ borderColor: `${NEON_GREEN}30` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ background: NEON_GREEN, boxShadow: `0 0 8px ${NEON_GREEN}` }}
                />
                <span className="font-cyber text-xs tracking-widest" style={{ color: NEON_GREEN }}>
                  NÄCHSTER STREAM
                </span>
              </div>

              <div className="mb-6">
                <div className="text-4xl mb-3">{next.slot.icon}</div>
                <h3 className="font-cyber text-2xl font-bold text-white mb-1">
                  {next.slot.game}
                </h3>
                <p className="text-white/50 font-body">
                  {formatDate(next.date)} · {next.slot.displayTime}
                </p>
              </div>

              {/* Countdown */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                {units.map((u) => (
                  <div
                    key={u.label}
                    className="text-center rounded-lg py-3 px-2"
                    style={{ background: 'rgba(83,252,24,0.06)', border: `1px solid ${NEON_GREEN}25` }}
                  >
                    <div
                      className="font-cyber text-2xl font-bold"
                      style={{ color: NEON_GREEN, textShadow: `0 0 10px ${NEON_GREEN}60` }}
                    >
                      {pad(u.value)}
                    </div>
                    <div className="text-white/40 text-[10px] font-cyber tracking-widest mt-1">
                      {u.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://kick.com/zyztm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 font-cyber text-xs tracking-widest py-3 rounded border text-center transition-all"
                  style={{ borderColor: `${NEON_GREEN}50`, color: NEON_GREEN }}
                >
                  📺 KICK ÖFFNEN
                </a>
                <a
                  href={buildCalendarUrl(next.slot, next.date)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 font-cyber text-xs tracking-widest py-3 rounded border text-center transition-all"
                  style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}
                >
                  📅 ERINNERN
                </a>
              </div>
            </motion.div>
          )}

          {/* Weekly schedule */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-cyber text-lg font-bold text-white mb-4">
              WÖCHENTLICHER PLAN
            </h3>
            <div className="space-y-3">
              {SCHEDULE.map((slot, i) => (
                <motion.div
                  key={slot.day}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="cyber-card rounded-lg p-4 flex items-center gap-4"
                  style={{ borderColor: `${slot.color}20` }}
                >
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center shrink-0 font-cyber text-xs font-bold"
                    style={{ background: `${slot.color}15`, color: slot.color, border: `1px solid ${slot.color}30` }}
                  >
                    {slot.shortDay}
                  </div>
                  <div className="flex-1">
                    <p className="font-cyber text-sm font-bold text-white">{slot.day}</p>
                    <p className="text-white/50 text-xs font-body">{slot.game}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-cyber text-sm font-bold" style={{ color: slot.color }}>
                      {slot.displayTime}
                    </p>
                    <p className="text-white/30 text-[10px] font-cyber tracking-widest">LIVE</p>
                  </div>
                  <span className="text-xl">{slot.icon}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 cyber-card rounded-lg p-4 text-center"
              style={{ borderColor: `${NEON_BLUE}20` }}
            >
              <p className="text-white/40 text-xs font-cyber tracking-widest mb-3">
                ⚡ NICHT VERPASSEN – NOTIFICATIONS AN!
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                {[
                  { label: 'KICK', href: 'https://kick.com/zyztm', color: NEON_GREEN },
                  { label: 'YOUTUBE', href: 'https://youtube.com/@Zyztm', color: '#ff0000' },
                  { label: 'DISCORD', href: 'https://discord.gg/zyztm', color: '#5865f2' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-cyber text-[10px] tracking-widest px-3 py-1.5 rounded border transition-all"
                    style={{ color: link.color, borderColor: `${link.color}40` }}
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
