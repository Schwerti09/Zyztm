import { useEffect, useRef, useState } from 'react';

export default function IntroChaosBus({ onFinish }: { onFinish: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let busY = -800;
    let speed = 13;
    let landed = false;
    let time = 0;
    let shake = 0;
    let running = true;

    const skins = [
      { emoji: '🍌', x: 220, rotSpeed: 1.8 },
      { emoji: '🕴️', x: 340, rotSpeed: 2.3 },
      { emoji: '👑', x: 460, rotSpeed: 1.6 },
      { emoji: '🦈', x: 580, rotSpeed: 2.5 },
      { emoji: '🛡️', x: 700, rotSpeed: 1.9 },
      { emoji: '💀', x: 820, rotSpeed: 2.1 },
    ];

    const vbucks: { x: number; y: number; speed: number; rot: number }[] = [];

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 2, 10, 0.6)';
      ctx.fillRect(0, 0, w, h);

      busY += speed;
      shake = landed ? Math.sin(time / 2) * 6 : 0;

      const bx = w * 0.13;

      // Shadow under the bus
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(bx + 40, busY + 340, w * 0.7, 60);

      // Bus body
      ctx.fillStyle = '#1c1c1c';
      ctx.fillRect(bx, busY, w * 0.74, 340);

      // Cockpit / roof (metallic look)
      ctx.fillStyle = '#0f0f0f';
      ctx.fillRect(bx + 50, busY - 85, w * 0.64, 120);

      // Large window (glowing)
      ctx.fillStyle = '#22D3EE';
      ctx.fillRect(bx + 90, busY + 55, w * 0.55, 160);

      // Neon stripe
      ctx.fillStyle = '#39FF14';
      ctx.fillRect(bx + 30, busY + 280, w * 0.68, 26);

      // "BATTLE BUS" label
      ctx.fillStyle = '#FFD700';
      ctx.font = 'bold 58px Space Grotesk';
      ctx.fillText('BATTLE BUS', bx + 160, busY + 315);

      // Dancing skins inside bus
      skins.forEach((skin, i) => {
        const x = bx + skin.x + Math.sin(time / 7 + i) * 38;
        const y = busY + 135 + Math.cos(time / 6 + i) * 52;

        ctx.save();
        ctx.translate(x + shake, y);
        ctx.rotate(Math.sin(time / 4.5 + i) * 0.45);
        ctx.font = '128px Arial';
        ctx.fillText(skin.emoji, -65, 55);
        ctx.restore();
      });

      // V-Bucks rain from bus
      if (Math.random() < 0.55) {
        vbucks.push({
          x: bx + 180 + Math.random() * (w * 0.5),
          y: busY + 90,
          speed: 14 + Math.random() * 12,
          rot: Math.random() * 360,
        });
      }
      for (let i = vbucks.length - 1; i >= 0; i--) {
        const v = vbucks[i];
        v.y += v.speed;
        v.rot += 8;

        ctx.save();
        ctx.translate(v.x, v.y);
        ctx.rotate((v.rot * Math.PI) / 180);
        ctx.font = '62px Arial';
        ctx.fillText('💰', -25, 25);
        ctx.restore();

        if (v.y > h + 100) vbucks.splice(i, 1);
      }

      // Decelerate and land
      if (busY > h * 0.15 && !landed) {
        speed *= 0.79;
        if (speed < 1.3) {
          landed = true;
          shake = 25;
          setTimeout(() => {
            setShow(false);
            onFinish();
          }, 1800);
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
