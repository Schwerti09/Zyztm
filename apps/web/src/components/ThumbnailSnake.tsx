import { useEffect, useRef } from 'react';

// Zyztm's real YouTube video data (id → url)
const VIDEOS = [
  { id: 'OsiZmq4yLy4', url: 'https://www.youtube.com/watch?v=OsiZmq4yLy4' },
  { id: 'Kd-9EVbrVSk', url: 'https://www.youtube.com/watch?v=Kd-9EVbrVSk' },
  { id: 'qYJDHdcwerc', url: 'https://www.youtube.com/watch?v=qYJDHdcwerc' },
  { id: 'dQw4w9WgXcQ', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }, // fallback if needed
  { id: '3JZ_D3ELwOQ', url: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ' },
  { id: 'fJ9rUzIMcZQ', url: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ' },
  { id: 'RgKAFK5djSk', url: 'https://www.youtube.com/watch?v=RgKAFK5djSk' },
  { id: 'kffacxfA7G4', url: 'https://www.youtube.com/watch?v=kffacxfA7G4' },
  { id: 'hT_nvWreIhg', url: 'https://www.youtube.com/watch?v=hT_nvWreIhg' },
  { id: '09R8_2nJtjg', url: 'https://www.youtube.com/watch?v=09R8_2nJtjg' },
  { id: 'JGwWNGJdvx8', url: 'https://www.youtube.com/watch?v=JGwWNGJdvx8' },
  { id: 'YQHsXMglC9A', url: 'https://www.youtube.com/watch?v=YQHsXMglC9A' },
  { id: 'ZZ5LpwO-An4', url: 'https://www.youtube.com/watch?v=ZZ5LpwO-An4' },
  { id: '2Vv-BfVoq4g', url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g' },
];

// Use the 3 confirmed Zyztm thumbnails first, fill rest with YouTube defaults
const SNAKE_VIDEOS = [
  VIDEOS[0], VIDEOS[1], VIDEOS[2],
  VIDEOS[0], VIDEOS[1], VIDEOS[2],
  VIDEOS[0], VIDEOS[1], VIDEOS[2],
  VIDEOS[0], VIDEOS[1], VIDEOS[2],
  VIDEOS[0], VIDEOS[1],
].slice(0, 14);

const SEG_W = 160;
const SEG_H = 90;
const RADIUS = 10;
const SEGMENT_COUNT = SNAKE_VIDEOS.length;
const NEON_GREEN = '#39FF14';
const NEON_GOLD = '#FFD700';

interface Segment {
  x: number;
  y: number;
  angle: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

interface ExplosionParticle extends Particle {
  life: number;
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default function ThumbnailSnake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── resize ────────────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── preload thumbnails ────────────────────────────────────────────────────
    // Only 3 confirmed Zyztm thumbnails are available, so cycle through them
    const CONFIRMED = [SNAKE_VIDEOS[0].id, SNAKE_VIDEOS[1].id, SNAKE_VIDEOS[2].id];
    const images: HTMLImageElement[] = SNAKE_VIDEOS.map((_v, i) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = `https://i.ytimg.com/vi/${CONFIRMED[i % CONFIRMED.length]}/hqdefault.jpg`;
      return img;
    });

    // ── state ─────────────────────────────────────────────────────────────────
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    let time = 0;

    // Head target drifts toward mouse, plus autonomous path
    let headX = canvas.width / 2;
    let headY = canvas.height / 2;

    // history of positions for body segments
    const posHistory: Array<{ x: number; y: number }> = [];
    const HISTORY_LEN = SEGMENT_COUNT * 28;
    for (let i = 0; i < HISTORY_LEN; i++) {
      posHistory.push({ x: headX, y: headY });
    }

    const segments: Segment[] = Array.from({ length: SEGMENT_COUNT }, (_, i) => ({
      x: headX - i * 20,
      y: headY,
      angle: 0,
    }));

    // trail particles
    const particles: Particle[] = [];

    // explosion particles
    const explosions: ExplosionParticle[] = [];

    // glitch state per segment
    const glitchTimers: number[] = Array(SEGMENT_COUNT).fill(0);

    // ── mouse interaction ─────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── click detection ───────────────────────────────────────────────────────
    const onClick = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      for (let i = 0; i < SEGMENT_COUNT; i++) {
        const seg = segments[i];
        const hw = SEG_W / 2;
        const hh = SEG_H / 2;
        // simple AABB check (axis-aligned for simplicity)
        if (
          cx >= seg.x - hw && cx <= seg.x + hw &&
          cy >= seg.y - hh && cy <= seg.y + hh
        ) {
          // explode
          for (let p = 0; p < 60; p++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 6;
            explosions.push({
              x: seg.x,
              y: seg.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              alpha: 1,
              color: Math.random() > 0.5 ? NEON_GREEN : NEON_GOLD,
              size: 2 + Math.random() * 5,
              life: 1,
            });
          }
          // trigger glitch
          glitchTimers[i] = 30;
          // open video
          window.open(SNAKE_VIDEOS[i].url, '_blank', 'noopener,noreferrer');
          break;
        }
      }
    };
    window.addEventListener('click', onClick);

    // ── animation loop ────────────────────────────────────────────────────────
    let raf = 0;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.67, 3); // normalised to 60fps
      lastTime = now;
      time += 0.016 * dt;

      const W = canvas.width;
      const H = canvas.height;

      // Clear
      ctx.clearRect(0, 0, W, H);

      // ── move head ──────────────────────────────────────────────────────────
      // autonomous sinusoidal path + mouse attraction
      const autonomousX = W / 2 + Math.sin(time * 0.4) * (W * 0.35);
      const autonomousY = H / 2 + Math.sin(time * 0.27) * (H * 0.3);

      const targetX = autonomousX + (mouse.x - autonomousX) * 0.15;
      const targetY = autonomousY + (mouse.y - autonomousY) * 0.15;

      headX += (targetX - headX) * 0.04 * dt;
      headY += (targetY - headY) * 0.04 * dt;

      // push to history
      posHistory.unshift({ x: headX, y: headY });
      if (posHistory.length > HISTORY_LEN) posHistory.length = HISTORY_LEN;

      // update segment positions from history
      for (let i = 0; i < SEGMENT_COUNT; i++) {
        const idx = Math.min(i * 24, posHistory.length - 1);
        const next = posHistory[idx];
        segments[i] = {
          x: next.x,
          y: next.y,
          angle: i > 0
            ? Math.atan2(segments[i - 1].y - next.y, segments[i - 1].x - next.x)
            : Math.atan2(headY - segments[i].y, headX - segments[i].x),
        };
      }

      // ── spawn trail particles ──────────────────────────────────────────────
      if (Math.random() < 0.6 * dt) {
        const tail = segments[SEGMENT_COUNT - 1];
        particles.push({
          x: tail.x + (Math.random() - 0.5) * SEG_W,
          y: tail.y + (Math.random() - 0.5) * SEG_H,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          alpha: 0.7,
          color: Math.random() > 0.5 ? NEON_GREEN : NEON_GOLD,
          size: 1 + Math.random() * 3,
        });
      }
      // head sparks
      for (let k = 0; k < 2; k++) {
        particles.push({
          x: headX + (Math.random() - 0.5) * 20,
          y: headY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 2,
          alpha: 0.9,
          color: Math.random() > 0.4 ? NEON_GREEN : NEON_GOLD,
          size: 1 + Math.random() * 2,
        });
      }

      // ── draw trail particles ───────────────────────────────────────────────
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.alpha -= 0.015 * dt;
        if (p.alpha <= 0) { particles.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ── draw snake segments (back to front) ───────────────────────────────
      for (let i = SEGMENT_COUNT - 1; i >= 0; i--) {
        const seg = segments[i];
        const img = images[i];
        const isHead = i === 0;
        const glitch = glitchTimers[i] > 0;
        if (glitch) glitchTimers[i]--;

        ctx.save();
        ctx.translate(seg.x, seg.y);
        ctx.rotate(seg.angle);

        const hw = SEG_W / 2;
        const hh = SEG_H / 2;

        // Outer glow / shadow
        ctx.shadowColor = isHead ? '#ffffff' : (i % 2 === 0 ? NEON_GREEN : NEON_GOLD);
        ctx.shadowBlur = isHead ? 40 : 20;

        // Neon border
        roundedRect(ctx, -hw - 3, -hh - 3, SEG_W + 6, SEG_H + 6, RADIUS + 2);
        ctx.strokeStyle = isHead ? '#ffffff' : (i % 2 === 0 ? NEON_GREEN : NEON_GOLD);
        ctx.lineWidth = isHead ? 3 : 2;
        ctx.stroke();

        // Clip to rounded rect for image
        roundedRect(ctx, -hw, -hh, SEG_W, SEG_H, RADIUS);
        ctx.clip();

        // Draw thumbnail (or placeholder if not loaded)
        if (img.complete && img.naturalWidth > 0) {
          if (glitch) {
            // glitch: draw with offset and color channel shift
            ctx.globalAlpha = 0.9;
            ctx.drawImage(img, -hw + 4, -hh - 3, SEG_W, SEG_H);
            ctx.globalCompositeOperation = 'screen';
            ctx.fillStyle = 'rgba(57,255,20,0.25)';
            ctx.fillRect(-hw, -hh, SEG_W, SEG_H);
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(img, -hw - 4, -hh + 3, SEG_W, SEG_H);
          } else {
            ctx.drawImage(img, -hw, -hh, SEG_W, SEG_H);
          }
        } else {
          // Placeholder
          ctx.fillStyle = '#0a0d14';
          ctx.fillRect(-hw, -hh, SEG_W, SEG_H);
          ctx.fillStyle = i % 2 === 0 ? NEON_GREEN : NEON_GOLD;
          ctx.font = 'bold 12px Orbitron, monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('ZYZTM', 0, 0);
        }

        // Scanline overlay
        ctx.globalAlpha = 0.18;
        for (let sy = -hh; sy < hh; sy += 4) {
          ctx.fillStyle = 'rgba(0,0,0,0.8)';
          ctx.fillRect(-hw, sy, SEG_W, 2);
        }
        ctx.globalAlpha = 1;

        // Dim overlay for body (not head)
        if (!isHead) {
          ctx.fillStyle = `rgba(3,5,10,${0.15 + (i / SEGMENT_COUNT) * 0.3})`;
          ctx.fillRect(-hw, -hh, SEG_W, SEG_H);
        }

        // Glitch color bar
        if (glitch) {
          ctx.globalAlpha = 0.5;
          ctx.fillStyle = NEON_GREEN;
          const gy = -hh + Math.random() * SEG_H;
          ctx.fillRect(-hw, gy, SEG_W, 3 + Math.random() * 8);
          ctx.globalAlpha = 1;
        }

        ctx.restore();

        // Random glitch trigger
        if (Math.random() < 0.003) {
          glitchTimers[i] = 8 + Math.floor(Math.random() * 12);
        }
      }

      // ── draw explosion particles ───────────────────────────────────────────
      for (let i = explosions.length - 1; i >= 0; i--) {
        const p = explosions[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 0.1 * dt;
        p.life -= 0.025 * dt;
        p.alpha = p.life;
        if (p.life <= 0) { explosions.splice(i, 1); continue; }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // ── Victory Royale flash (random, rare) ───────────────────────────────
      if (Math.random() < 0.0005) {
        ctx.save();
        ctx.fillStyle = 'rgba(57,255,20,0.07)';
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        // pointer-events none so the canvas never blocks page interactions.
        // Click detection is handled via a window listener that hit-tests segment
        // coordinates and only opens a video when a segment is actually hit.
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
      aria-hidden="true"
    />
  );
}
