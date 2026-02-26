import { useEffect, useRef } from 'react';

// ─── Skin definitions ────────────────────────────────────────────────────────

interface SkinDef {
  name: string;
  emoji: string;      // body emoji / icon
  hat: string;        // optional top emoji
  bodyColor: string;  // skin color
  glowColor: string;  // neon glow
  emote: string;      // emote name label
}

const SKINS: SkinDef[] = [
  { name: 'Peely',          emoji: '🍌', hat: '🎩', bodyColor: '#FFD700', glowColor: '#ffd700', emote: 'Banana Split' },
  { name: 'Renegade Raider',emoji: '🔴', hat: '🪖', bodyColor: '#ff6633', glowColor: '#ff4400', emote: 'Renegade' },
  { name: 'Travis Scott',   emoji: '🌊', hat: '🎤', bodyColor: '#8844ff', glowColor: '#aa00ff', emote: 'Astronomical' },
  { name: 'Midas',          emoji: '👑', hat: '🏆', bodyColor: '#ffd700', glowColor: '#ffaa00', emote: 'Midas Touch' },
  { name: 'Fishstick',      emoji: '🐟', hat: '🎣', bodyColor: '#44ccff', glowColor: '#00ccff', emote: 'Floss' },
  { name: 'ZY Exclusive',   emoji: '⚡', hat: '👾', bodyColor: '#ff00aa', glowColor: '#ff0055', emote: 'Victory Royale' },
  { name: 'Default',        emoji: '🙂', hat: '⛑️',  bodyColor: '#88bbff', glowColor: '#00f2ff', emote: 'Default Dance' },
  { name: 'Shadow Midas',   emoji: '💀', hat: '🖤', bodyColor: '#333355', glowColor: '#8800ff', emote: 'Take the L' },
  { name: 'Drift',          emoji: '🦊', hat: '🎭', bodyColor: '#ff8800', glowColor: '#ff6600', emote: 'Pump it Up' },
  { name: 'Lynx',           emoji: '🐱', hat: '😈', bodyColor: '#cc00cc', glowColor: '#ff00ff', emote: 'Savage' },
];

// ─── V-Buck ───────────────────────────────────────────────────────────────────

interface VBuck {
  x: number;
  y: number;
  vy: number;
  alpha: number;
  size: number;
  skinIdx: number;
}

// ─── Particle ─────────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

// ─── Skin instance ────────────────────────────────────────────────────────────

interface SkinInstance {
  def: SkinDef;
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;       // dance phase offset
  speed: number;       // dance speed multiplier
  scale: number;
  rotBase: number;     // base rotation offset
  jumpY: number;       // extra Y offset from jump
  jumpVY: number;
  jumped: boolean;
  mouseInfluence: number; // 0–1 excitement from mouse proximity
}

// ─── Web Audio helpers ────────────────────────────────────────────────────────

let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioCtx;
}

function playKick(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
  gain.gain.setValueAtTime(0.35, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
}

function playHihat(ctx: AudioContext, vol = 0.12) {
  const bufferSize = Math.floor(ctx.sampleRate * 0.06);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 7000;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();
}

function playSnare(ctx: AudioContext) {
  const bufferSize = Math.floor(ctx.sampleRate * 0.1);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1200;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.28, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();
}

function playVictoryJingle(ctx: AudioContext) {
  const notes = [261, 330, 392, 523, 659];
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.value = freq;
    const t = ctx.currentTime + i * 0.1;
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.start(t);
    osc.stop(t + 0.25);
  });
}

// ─── Beat scheduler ───────────────────────────────────────────────────────────

const BPM = 128;
const BEAT_MS = (60 / BPM) * 1000;

// ─── Main component ────────────────────────────────────────────────────────────

export default function FortniteDanceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const audioStartedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Init skins
    const skins: SkinInstance[] = SKINS.map((def, i) => ({
      def,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      phase: (i / SKINS.length) * Math.PI * 2,
      speed: 0.8 + Math.random() * 0.7,
      scale: 0.9 + Math.random() * 0.5,
      rotBase: (Math.random() - 0.5) * 0.3,
      jumpY: 0,
      jumpVY: 0,
      jumped: false,
      mouseInfluence: 0,
    }));

    const vbucks: VBuck[] = [];
    const particles: Particle[] = [];

    // Beat state
    let beatFrame = 0;
    let lastBeatTime = performance.now();
    let beat16 = 0; // 16th-note counter

    // V-Buck drop timer
    let lastVBuckTime = performance.now();
    const vbuckInterval = () => 8000 + Math.random() * 4000;
    let nextVBuckIn = vbuckInterval();

    // Mouse
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    // Touch support
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    window.addEventListener('touchmove', onTouch, { passive: true });

    // Click – find nearest skin
    const onClick = (e: MouseEvent) => {
      const mx = e.clientX, my = e.clientY;
      let bestDist = 80, bestIdx = -1;
      skins.forEach((s, i) => {
        const d = Math.hypot(s.x - mx, s.y - my);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      });
      if (bestIdx === -1) return;
      const s = skins[bestIdx];
      // Trigger jump
      s.jumpVY = -18;
      s.jumped = true;
      // Gold particles
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        particles.push({
          x: s.x, y: s.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: ['#ffd700', '#ffaa00', '#ff8800', '#ffffff'][Math.floor(Math.random() * 4)],
          size: 4 + Math.random() * 6,
        });
      }
      // Victory sound
      if (!audioStartedRef.current) audioStartedRef.current = true;
      try {
        playVictoryJingle(getAudioCtx());
      } catch { /* ignore */ }
      // Open Zyztm YouTube channel
      window.open('https://www.youtube.com/@Zyztm', '_blank', 'noopener,noreferrer');
    };
    canvas.addEventListener('click', onClick);

    // Start audio on first interaction
    const startAudio = () => {
      if (audioStartedRef.current) return;
      audioStartedRef.current = true;
      try { getAudioCtx().resume(); } catch { /* ignore */ }
    };
    window.addEventListener('click', startAudio, { once: true });
    window.addEventListener('keydown', startAudio, { once: true });

    // Beat tick
    const beatInterval = setInterval(() => {
      if (!audioStartedRef.current) return;
      try {
        const ac = getAudioCtx();
        if (beat16 % 4 === 0) playKick(ac);
        if (beat16 % 8 === 4) playSnare(ac);
        playHihat(ac, 0.06 + (beat16 % 2 === 0 ? 0.04 : 0));
        beat16 = (beat16 + 1) % 16;
      } catch { /* ignore */ }
    }, BEAT_MS / 4);

    // Draw a skin
    const drawSkin = (skin: SkinInstance, t: number, beat: number) => {
      const { def, x, y, phase, speed, scale, rotBase, jumpY, mouseInfluence } = skin;
      const danceT = t * speed + phase;

      // Dance math
      const bob = Math.sin(danceT * 4) * (10 + mouseInfluence * 8);
      const sway = Math.sin(danceT * 2) * (8 + mouseInfluence * 6);
      const rot = rotBase + Math.sin(danceT * 3) * (0.15 + mouseInfluence * 0.25);
      const beatPulse = 1 + beat * 0.12 * (1 + mouseInfluence);
      const sz = 44 * scale * beatPulse;

      const cx = x + sway;
      const cy = y + bob + jumpY;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.scale(scale, scale);

      // Glow shadow
      ctx.shadowColor = def.glowColor;
      ctx.shadowBlur = 18 + mouseInfluence * 20 + beat * 10;

      // Body circle
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(0, -5, 2, 0, 0, 22);
      gradient.addColorStop(0, def.bodyColor + 'cc');
      gradient.addColorStop(1, def.bodyColor + '44');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Outer ring pulse
      ctx.beginPath();
      ctx.arc(0, 0, 24 + beat * 3, 0, Math.PI * 2);
      ctx.strokeStyle = def.glowColor + (mouseInfluence > 0.5 ? 'aa' : '55');
      ctx.lineWidth = 2;
      ctx.stroke();

      // Main emoji
      ctx.shadowBlur = 0;
      ctx.font = `${sz * 0.7}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(def.emoji, 0, 0);

      // Hat emoji (top)
      ctx.font = `${sz * 0.45}px serif`;
      ctx.fillText(def.hat, 0, -20);

      // Arms wave
      const armAngle = Math.sin(danceT * 4) * (0.6 + mouseInfluence * 0.5);
      // Left arm
      ctx.save();
      ctx.translate(-18, 5);
      ctx.rotate(-armAngle);
      ctx.font = `${sz * 0.35}px serif`;
      ctx.fillText('🤚', 0, 0);
      ctx.restore();
      // Right arm
      ctx.save();
      ctx.translate(18, 5);
      ctx.rotate(armAngle);
      ctx.font = `${sz * 0.35}px serif`;
      ctx.fillText('🤚', 0, 0);
      ctx.restore();

      // Legs dance
      const legAngle = Math.sin(danceT * 4) * 0.4;
      ctx.save();
      ctx.translate(-8, 22);
      ctx.rotate(legAngle);
      ctx.font = `${sz * 0.3}px serif`;
      ctx.fillText('🦵', 0, 0);
      ctx.restore();
      ctx.save();
      ctx.translate(8, 22);
      ctx.rotate(-legAngle);
      ctx.font = `${sz * 0.3}px serif`;
      ctx.fillText('🦵', 0, 0);
      ctx.restore();

      // Emote label (when mouse is close)
      if (mouseInfluence > 0.3) {
        ctx.shadowColor = def.glowColor;
        ctx.shadowBlur = 8;
        ctx.font = `bold 9px 'Orbitron', 'Press Start 2P', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = def.glowColor;
        ctx.fillText(def.emote.toUpperCase(), 0, -32);
        ctx.shadowBlur = 0;
      }

      // Name tag
      ctx.font = `bold 8px 'Orbitron', 'Press Start 2P', monospace`;
      ctx.fillStyle = '#ffffffaa';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(def.name, 0, 30);

      ctx.restore();
    };

    // Main loop
    let animId = 0;
    let prevTime = performance.now();
    let beatPulse = 0;

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      const dt = Math.min((now - prevTime) / 1000, 0.05);
      prevTime = now;
      const t = now / 1000;

      // Beat pulse decay
      const elapsed = now - lastBeatTime;
      if (elapsed >= BEAT_MS / 4) {
        lastBeatTime = now;
        beatFrame = (beatFrame + 1) % 4;
        if (beatFrame === 0) beatPulse = 1;
      }
      beatPulse *= 0.85;

      const W = canvas.width, H = canvas.height;
      const mx = mouseRef.current.x, my = mouseRef.current.y;

      // Clear with trail effect
      ctx.fillStyle = 'rgba(5, 5, 15, 0.18)';
      ctx.fillRect(0, 0, W, H);

      // V-Buck drop timer
      if (now - lastVBuckTime > nextVBuckIn) {
        lastVBuckTime = now;
        nextVBuckIn = vbuckInterval();
        // Drop from 2–4 random skins (Fisher-Yates shuffle)
        const count = 2 + Math.floor(Math.random() * 3);
        const arr = [...skins];
        for (let k = arr.length - 1; k > 0; k--) {
          const j = Math.floor(Math.random() * (k + 1));
          [arr[k], arr[j]] = [arr[j], arr[k]];
        }
        const shuffled = arr.slice(0, count);
        shuffled.forEach((s, i) => {
          vbucks.push({ x: s.x + (i - 1) * 12, y: s.y - 30, vy: 1, alpha: 1, size: 14 + Math.random() * 8, skinIdx: skins.indexOf(s) });
        });
      }

      // Update + draw V-Bucks
      for (let i = vbucks.length - 1; i >= 0; i--) {
        const vb = vbucks[i];
        vb.vy += 0.3;
        vb.y += vb.vy;
        if (vb.y > H + 10) {
          // Ground burst
          for (let p = 0; p < 8; p++) {
            const angle = Math.random() * Math.PI * 2;
            particles.push({ x: vb.x, y: H - 10, vx: Math.cos(angle) * (1 + Math.random() * 3), vy: -Math.random() * 4, alpha: 1, color: '#ffd700', size: 3 + Math.random() * 4 });
          }
          vbucks.splice(i, 1);
          continue;
        }
        vb.alpha = Math.min(1, (H - vb.y) / 80);
        ctx.save();
        ctx.globalAlpha = vb.alpha;
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 10;
        ctx.font = `${vb.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💰', vb.x, vb.y);
        ctx.restore();
      }

      // Update + draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.alpha -= 0.025;
        if (p.alpha <= 0) { particles.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Update skins
      skins.forEach((s) => {
        // Mouse influence
        const dist = Math.hypot(s.x - mx, s.y - my);
        s.mouseInfluence = Math.max(0, 1 - dist / 180);

        // Speed boost near mouse
        const speedBoost = 1 + s.mouseInfluence * 1.5;

        s.x += s.vx * speedBoost;
        s.y += s.vy * speedBoost;

        // Bounce off walls
        const margin = 55;
        if (s.x < margin) { s.x = margin; s.vx = Math.abs(s.vx); }
        if (s.x > W - margin) { s.x = W - margin; s.vx = -Math.abs(s.vx); }
        if (s.y < margin) { s.y = margin; s.vy = Math.abs(s.vy); }
        if (s.y > H - margin) { s.y = H - margin; s.vy = -Math.abs(s.vy); }

        // Jump physics
        if (s.jumped) {
          s.jumpY += s.jumpVY;
          s.jumpVY += 1.2;
          if (s.jumpY >= 0) { s.jumpY = 0; s.jumped = false; }
        }
      });

      // Draw skins (sorted by y for depth illusion)
      const sorted = [...skins].sort((a, b) => a.y - b.y);
      sorted.forEach((s) => drawSkin(s, t, beatPulse));

      // Connection lines between close skins (rave vibe)
      for (let i = 0; i < skins.length; i++) {
        for (let j = i + 1; j < skins.length; j++) {
          const a = skins[i], b = skins[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.save();
            ctx.globalAlpha = (1 - d / 120) * 0.25;
            ctx.strokeStyle = a.def.glowColor;
            ctx.lineWidth = 1;
            ctx.shadowColor = a.def.glowColor;
            ctx.shadowBlur = 4;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(beatInterval);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('click', startAudio);
      window.removeEventListener('keydown', startAudio);
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-auto"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
