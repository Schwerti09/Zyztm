import { useEffect, useRef, useState } from 'react';

export default function MidScrollChaos() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;

    let animId = 0;

    const startStorm = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      let w = (canvas.width = window.innerWidth);
      let h = (canvas.height = window.innerHeight);
      let time = 0;
      let intensity = 1;

      const skins = [
        { emoji: '🍌', x: w * 0.18, y: h * 0.3 },
        { emoji: '🕴️', x: w * 0.35, y: h * 0.6 },
        { emoji: '👑', x: w * 0.52, y: h * 0.4 },
        { emoji: '🦈', x: w * 0.68, y: h * 0.7 },
        { emoji: '🛡️', x: w * 0.25, y: h * 0.55 },
        { emoji: '💀', x: w * 0.78, y: h * 0.35 },
      ];

      const particles: { x: number; y: number; speed: number }[] = [];

      const animate = () => {
        ctx.fillStyle = 'rgba(5,5,5,0.35)';
        ctx.fillRect(0, 0, w, h);

        const shake = Math.sin(time / 2.5) * intensity * 18;

        skins.forEach((skin, i) => {
          const offset = Math.sin(time / 4 + i) * 55 * intensity;
          ctx.save();
          ctx.translate(skin.x + shake, skin.y + offset);
          ctx.rotate(Math.sin(time / 3 + i) * 0.45 * intensity);
          ctx.font = '115px Arial';
          ctx.fillText(skin.emoji, -60, 50);
          ctx.restore();
        });

        // Extremes V-Bucks Chaos
        if (Math.random() < 0.6) {
          particles.push({ x: Math.random() * w, y: 60, speed: 14 + Math.random() * 18 });
        }
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.y += p.speed;
          ctx.font = '58px Arial';
          ctx.fillText('💰', p.x + Math.sin(time / 8) * 12, p.y);
          if (p.y > h) particles.splice(i, 1);
        }

        // STORM IS COMING Text
        ctx.fillStyle = '#FF00FF';
        ctx.font = 'bold 52px Space Grotesk';
        ctx.fillText('STORM IS COMING!!!', w / 2 - 260, 110 + Math.sin(time / 6) * 8);

        time++;
        intensity = Math.min(intensity + 0.018, 4.2);

        // Nach 7 Sekunden automatisch stoppen
        if (time > 420) {
          setFinished(true);
          return;
        }

        animId = requestAnimationFrame(animate);
      };

      animate();

      // Sound
      const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3');
      audio.volume = 0.5;
      audio.play().catch(() => {});
    };

    const handleScroll = () => {
      if (triggered) return;

      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;

      // Trigger erst bei 78% der Seite (also ziemlich weit unten)
      if (scrollPercent > 0.78) {
        setTriggered(true);
        startStorm();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [triggered, finished]);

  if (!triggered || finished) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 50 }}
      aria-hidden="true"
    />
  );
}
