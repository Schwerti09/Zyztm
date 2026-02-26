import { useEffect, useRef, useState } from 'react';

export default function IntroChaosBus({ onFinish }: { onFinish: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let busY = -400;
    let speed = 6;
    let landed = false;
    let time = 0;
    let running = true;

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const skins = [
      { emoji: '🍌', x: -80, speed: 1.8 },
      { emoji: '🕴️', x: -40, speed: 2.1 },
      { emoji: '👑', x: 20, speed: 1.6 },
      { emoji: '🦈', x: 70, speed: 2.3 },
      { emoji: '🛡️', x: 110, speed: 1.9 },
    ];

    const particles: { x: number; y: number; speed: number }[] = [];

    const animate = () => {
      ctx.fillStyle = 'rgba(3,3,8,0.35)';
      ctx.fillRect(0, 0, w, h);

      // Bus flies in
      busY += speed;
      if (busY > h * 0.25 && !landed) {
        speed *= 0.85;
        if (speed < 0.8) {
          landed = true;
          setTimeout(() => {
            setShow(false);
            onFinish();
          }, 1200);
        }
      }

      // Draw bus body
      ctx.fillStyle = '#111111';
      ctx.fillRect(w * 0.15, busY, w * 0.7, 280);

      // Bus window
      ctx.fillStyle = '#22D3EE';
      ctx.fillRect(w * 0.22, busY + 60, w * 0.56, 90);

      // Dancing skins inside bus
      skins.forEach((skin, i) => {
        const x = w * 0.3 + skin.x + Math.sin(time / 8 + i) * 25;
        const y = busY + 110 + Math.sin(time / 6 + i * 3) * 35;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.sin(time / 5 + i) * 0.25);
        ctx.font = `${Math.round(w * 0.09)}px Arial`;
        ctx.fillText(skin.emoji, -50, 40);
        ctx.restore();
      });

      // V-Bucks rain
      if (Math.random() < 0.4) {
        particles.push({ x: Math.random() * w, y: busY + 50, speed: 9 + Math.random() * 7 });
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.speed;
        ctx.font = `${Math.round(w * 0.04)}px Arial`;
        ctx.fillText('💰', p.x, p.y);
        if (p.y > h) particles.splice(i, 1);
      }

      time++;
      if (running) requestAnimationFrame(animate);
    };

    animate();

    return () => {
      running = false;
      window.removeEventListener('resize', onResize);
    };
  }, [onFinish]);

  if (!show) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        display: 'block',
      }}
    />
  );
}
