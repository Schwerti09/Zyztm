import { useEffect, useRef, useState } from 'react';

export default function MidScrollChaos() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (triggered) return;

      const scrollY = window.scrollY;
      const halfPage = window.innerHeight * 0.65; // triggert bei 65% der Seite

      if (scrollY > halfPage) {
        setTriggered(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    let intensity = 1;
    let animId = 0;

    const skins = [
      { emoji: '🍌', x: w * 0.15, y: h * 0.3 },
      { emoji: '🕴️', x: w * 0.35, y: h * 0.6 },
      { emoji: '👑', x: w * 0.55, y: h * 0.4 },
      { emoji: '🦈', x: w * 0.7, y: h * 0.7 },
      { emoji: '🛡️', x: w * 0.25, y: h * 0.55 },
      { emoji: '💀', x: w * 0.8, y: h * 0.35 },
    ];

    const particles: { x: number; y: number; speed: number }[] = [];

    const animate = () => {
      ctx.fillStyle = 'rgba(5,5,5,0.4)';
      ctx.fillRect(0, 0, w, h);

      // Turbulenz (Bus wackelt)
      const shake = Math.sin(time / 3) * intensity * 12;

      // Tanzende Skins (panisch)
      skins.forEach((skin, i) => {
        const offset = Math.sin(time / 5 + i) * 35 * intensity;
        ctx.save();
        ctx.translate(skin.x + shake, skin.y + offset);
        ctx.rotate(Math.sin(time / 4 + i) * 0.4 * intensity);
        ctx.font = '110px Arial';
        ctx.fillText(skin.emoji, -55, 45);
        ctx.restore();
      });

      // V-Bucks Chaos Regen
      if (Math.random() < 0.45) {
        particles.push({ x: Math.random() * w, y: 80, speed: 12 + Math.random() * 15 });
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.speed;
        ctx.font = '52px Arial';
        ctx.fillText('💰', p.x + Math.sin(time / 10) * 8, p.y);
        if (p.y > h) particles.splice(i, 1);
      }

      // Warning Text
      if (time % 25 < 12) {
        ctx.fillStyle = '#FF00FF';
        ctx.font = 'bold 48px Space Grotesk';
        ctx.fillText('STORM INCOMING!!!', w / 2 - 220, 120);
      }

      time++;
      intensity = Math.min(intensity + 0.012, 3.5);

      if (time < 380) animId = requestAnimationFrame(animate); // ~6 Sekunden Chaos
    };

    animate();

    // Victory Royale Sound beim Trigger
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3');
    audio.volume = 0.55;
    audio.play().catch(() => {});

    return () => cancelAnimationFrame(animId);
  }, [triggered]);

  if (!triggered) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 50 }}
      aria-hidden="true"
    />
  );
}
