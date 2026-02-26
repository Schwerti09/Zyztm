import { useEffect, useRef } from 'react';

export default function ChaosBusBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const skins = [
      { emoji: "🍌", x: w * 0.2, y: h * 0.4, speed: 1.2 },
      { emoji: "🕴️", x: w * 0.35, y: h * 0.6, speed: 0.9 },
      { emoji: "👑", x: w * 0.55, y: h * 0.3, speed: 1.4 },
      { emoji: "🦈", x: w * 0.7, y: h * 0.7, speed: 1.1 },
      { emoji: "🛡️", x: w * 0.25, y: h * 0.55, speed: 0.8 },
      { emoji: "💀", x: w * 0.45, y: h * 0.8, speed: 1.3 },
      { emoji: "🔥", x: w * 0.6, y: h * 0.45, speed: 1.0 },
    ];

    let vbucks: { x: number; y: number; speed: number }[] = [];
    let time = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    let animId = 0;

    function animate() {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.18)';
      ctx.fillRect(0, 0, w, h);

      // Tanzende Skins
      skins.forEach((skin, i) => {
        skin.x += Math.sin(time / 30 + i) * 0.8;
        skin.y = h * 0.45 + Math.sin(time / 20 + i * 2) * 120;

        ctx.save();
        ctx.translate(skin.x, skin.y);
        ctx.rotate(Math.sin(time / 15 + i) * 0.15);
        ctx.font = '90px Arial';
        ctx.fillText(skin.emoji, -45, 35);
        ctx.restore();
      });

      // V-Bucks Drop
      if (vbucks.length < 50 && Math.random() < 0.25) {
        vbucks.push({ x: Math.random() * w, y: 80, speed: 7 + Math.random() * 8 });
      }
      vbucks = vbucks.filter(v => {
        v.y += v.speed;
        ctx.font = '45px Arial';
        ctx.fillText('💰', v.x, v.y);
        return v.y < h + 50;
      });

      time += 1;
      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
