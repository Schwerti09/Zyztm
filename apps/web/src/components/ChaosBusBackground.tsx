import { useEffect, useRef } from 'react';

export default function ChaosBusBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const skins = [
      { emoji: "🍌", x: w * 0.2, y: h * 0.4, speed: 1.8 },
      { emoji: "🕴️", x: w * 0.35, y: h * 0.6, speed: 1.5 },
      { emoji: "👑", x: w * 0.55, y: h * 0.3, speed: 2.0 },
      { emoji: "🦈", x: w * 0.7, y: h * 0.7, speed: 1.7 },
      { emoji: "🛡️", x: w * 0.25, y: h * 0.55, speed: 1.4 },
      { emoji: "💀", x: w * 0.45, y: h * 0.8, speed: 1.9 },
      { emoji: "🔥", x: w * 0.6, y: h * 0.45, speed: 1.6 },
      { emoji: "🎯", x: w * 0.15, y: h * 0.7, speed: 2.1 },
      { emoji: "⚡", x: w * 0.8, y: h * 0.35, speed: 1.3 },
    ];

    // Battle Bus position (drifts across top of screen)
    const bus = { x: -100, y: h * 0.12 };

    // Snake that chases the bus
    const snake = { x: -300, y: h * 0.12 };

    let vbucks: { x: number; y: number; speed: number }[] = [];
    let time = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      bus.y = h * 0.12;
      snake.y = h * 0.12;
    };
    window.addEventListener('resize', resize);

    let animId = 0;

    function animate() {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.18)';
      ctx.fillRect(0, 0, w, h);

      // Tanzende Skins – wilder und chaotischer
      skins.forEach((skin, i) => {
        skin.x += Math.sin(time / 18 + i * 1.3) * skin.speed;
        skin.y = h * 0.45 + Math.sin(time / 12 + i * 2) * 180 + Math.cos(time / 8 + i) * 60;

        ctx.save();
        ctx.translate(skin.x, skin.y);
        // much more aggressive rotation for chaos effect
        ctx.rotate(Math.sin(time / 8 + i) * 0.45 + Math.cos(time / 5 + i * 0.7) * 0.25);
        // pulsing scale
        const scale = 1 + Math.sin(time / 10 + i) * 0.25;
        ctx.scale(scale, scale);
        ctx.font = '90px Arial';
        ctx.fillText(skin.emoji, -45, 35);
        ctx.restore();
      });

      // Battle Bus drifts across the top of the screen
      bus.x += 1.4;
      if (bus.x > w + 120) bus.x = -120;
      bus.y = h * 0.12 + Math.sin(time / 40) * 18;

      ctx.save();
      ctx.font = '72px Arial';
      ctx.fillText('🚌', bus.x, bus.y);
      ctx.restore();

      // Snake chases the bus (slightly slower, always behind)
      const snakeTargetX = bus.x - 110;
      snake.x += (snakeTargetX - snake.x) * 0.04;
      if (bus.x < -100) snake.x = -320; // reset with bus
      snake.y = bus.y + Math.sin(time / 15) * 12;

      ctx.save();
      ctx.font = '64px Arial';
      ctx.fillText('🐍', snake.x, snake.y + 8);
      ctx.restore();

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
