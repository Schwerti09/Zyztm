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

    let busY = -600;
    let speed = 11;
    let landed = false;
    let time = 0;
    let running = true;

    const skins = [
      { emoji: '🍌', x: 180 },
      { emoji: '🕴️', x: 280 },
      { emoji: '👑', x: 380 },
      { emoji: '🦈', x: 480 },
      { emoji: '🛡️', x: 580 },
      { emoji: '💀', x: 680 },
    ];

    const vbucks: { x: number; y: number; speed: number }[] = [];

    let busX = w * 0.12;

    const FONT_LABEL = 'bold 42px Space Grotesk, Arial';
    const FONT_SKIN = '120px Arial';
    const FONT_VBUCK = '55px Arial';

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      busX = w * 0.12;
    };
    window.addEventListener('resize', onResize);

    const animate = () => {
      ctx.fillStyle = 'rgba(4, 4, 12, 0.45)';
      ctx.fillRect(0, 0, w, h);

      busY += speed;

      // Bus body
      ctx.fillStyle = '#1f1f1f';
      ctx.fillRect(busX, busY, w * 0.76, 320);

      // Cockpit / roof
      ctx.fillStyle = '#0f0f0f';
      ctx.fillRect(busX + 60, busY - 70, w * 0.64, 110);

      // Large window (glowing)
      ctx.fillStyle = '#22D3EE';
      ctx.fillRect(busX + 100, busY + 50, w * 0.56, 140);

      // Neon stripe at bottom
      ctx.fillStyle = '#39FF14';
      ctx.fillRect(busX + 20, busY + 260, w * 0.72, 22);

      // "BATTLE BUS" label
      ctx.fillStyle = '#FFD700';
      ctx.font = FONT_LABEL;
      ctx.fillText('BATTLE BUS', busX + 180, busY + 295);

      // Dancing skins inside bus
      skins.forEach((skin, i) => {
        const x = busX + skin.x + Math.sin(time / 9 + i) * 35;
        const y = busY + 130 + Math.cos(time / 7 + i) * 55;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.sin(time / 5 + i) * 0.35);
        ctx.font = FONT_SKIN;
        ctx.fillText(skin.emoji, -55, 50);
        ctx.restore();
      });

      // V-Bucks fall from bus
      if (Math.random() < 0.45) {
        vbucks.push({ x: busX + 140 + Math.random() * (w * 0.55), y: busY + 70, speed: 13 });
      }
      for (let i = vbucks.length - 1; i >= 0; i--) {
        const v = vbucks[i];
        v.y += v.speed;
        ctx.font = FONT_VBUCK;
        ctx.fillText('💰', v.x, v.y);
        if (v.y > h + 80) vbucks.splice(i, 1);
      }

      // Decelerate and land
      if (busY > h * 0.18 && !landed) {
        speed *= 0.78;
        if (speed < 1.1) {
          landed = true;
          setTimeout(() => {
            setShow(false);
            onFinish();
          }, 1600);
        }
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
