import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

declare global { interface Window { webkitAudioContext?: typeof AudioContext } }

// ── Fortnite-style upbeat battle-royale lobby music ──────────────────────────
function startAmbientMusic(ctx: AudioContext): () => void {
  const BPM = 128;
  const BEAT = 60 / BPM; // seconds per beat

  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.11, ctx.currentTime + 2.5);
  master.connect(ctx.destination);

  let running = true;
  const timerIds: ReturnType<typeof setTimeout>[] = [];

  // ── Kick drum (sine sweep: 150 Hz → 0) every 2 beats ─────────────────────
  function playKick() {
    if (!running) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(master);
    o.type = 'sine';
    o.frequency.setValueAtTime(150, ctx.currentTime);
    o.frequency.linearRampToValueAtTime(0.001, ctx.currentTime + 0.32);
    g.gain.setValueAtTime(0.55, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);
    o.start(); o.stop(ctx.currentTime + 0.35);
    timerIds.push(setTimeout(playKick, BEAT * 2 * 1000));
  }
  playKick();

  // ── Snare (noise burst, bandpass) on beats 2 & 4 ─────────────────────────
  function playSnare() {
    if (!running) return;
    const bufSize = Math.floor(ctx.sampleRate * 0.12);
    const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1800;
    filter.Q.value = 0.7;
    const g = ctx.createGain();
    src.connect(filter); filter.connect(g); g.connect(master);
    g.gain.setValueAtTime(0.18, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    src.start(); src.stop(ctx.currentTime + 0.14);
    timerIds.push(setTimeout(playSnare, BEAT * 2 * 1000));
  }
  timerIds.push(setTimeout(playSnare, BEAT * 1000)); // offset 1 beat → lands on 2 & 4

  // ── Hi-hat (highpass noise) every half-beat ───────────────────────────────
  function playHihat() {
    if (!running) return;
    const bufSize = Math.floor(ctx.sampleRate * 0.04);
    const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 8000;
    const g = ctx.createGain();
    src.connect(filter); filter.connect(g); g.connect(master);
    g.gain.setValueAtTime(0.045, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    src.start(); src.stop(ctx.currentTime + 0.05);
    timerIds.push(setTimeout(playHihat, BEAT * 0.5 * 1000));
  }
  playHihat();

  // ── Bass synth (sawtooth, lowpass) – 8th-note pattern ────────────────────
  const BASS_FREQS = [73.4, 73.4, 110, 73.4, 87.3, 73.4, 110, 87.3]; // D2, D2, A2, D2, F2, D2, A2, F2
  let bassStep = 0;
  const bassFilter = ctx.createBiquadFilter();
  bassFilter.type = 'lowpass';
  bassFilter.frequency.value = 220;
  bassFilter.connect(master);

  function playBass() {
    if (!running) return;
    const freq = BASS_FREQS[bassStep % BASS_FREQS.length];
    bassStep++;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.value = freq;
    o.connect(g); g.connect(bassFilter);
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0.55, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + BEAT * 0.75);
    o.start(t); o.stop(t + BEAT * 0.8);
    timerIds.push(setTimeout(playBass, BEAT * 1000));
  }
  playBass();

  // ── Melodic lead – D major pentatonic (Fortnite-ish upbeat vibe) ─────────
  // D4=293.66 E4=329.63 F#4=369.99 A4=440 B4=493.88, 0=rest
  const MELODY = [
    293.66, 329.63, 369.99, 440,
    440,    369.99, 329.63, 293.66,
    329.63, 369.99, 493.88, 440,
    369.99, 293.66, 0,      0,
  ];
  let melStep = 0;
  const leadGain = ctx.createGain();
  leadGain.gain.value = 0.055;
  leadGain.connect(master);

  function playLead() {
    if (!running) return;
    const freq = MELODY[melStep % MELODY.length];
    melStep++;
    if (freq > 0) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'square';
      o.frequency.value = freq;
      o.connect(g); g.connect(leadGain);
      const t = ctx.currentTime;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(1, t + 0.018);
      g.gain.exponentialRampToValueAtTime(0.001, t + BEAT * 0.82);
      o.start(t); o.stop(t + BEAT * 0.88);
    }
    timerIds.push(setTimeout(playLead, BEAT * 0.5 * 1000)); // 8th notes
  }
  playLead();

  // ── Slow pad layer (A minor chord: A2 + E3 + A3) ─────────────────────────
  const padGain = ctx.createGain();
  padGain.gain.value = 0.028;
  const padFilter = ctx.createBiquadFilter();
  padFilter.type = 'lowpass';
  padFilter.frequency.value = 900;
  padGain.connect(padFilter); padFilter.connect(master);
  // Continuous oscillators – stopped automatically when ctx.close() is called
  ([110, 164.81, 220] as number[]).forEach((freq) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle'; o.frequency.value = freq; g.gain.value = 1;
    o.connect(g); g.connect(padGain); o.start();
  });

  let stopped = false;
  let fadeTimerId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    // Guard against double-calls (e.g. component re-render or rapid toggle)
    if (stopped) {
      if (fadeTimerId !== null) clearTimeout(fadeTimerId);
      ctx.close().catch(() => {});
      return;
    }
    stopped = true;
    running = false;
    timerIds.forEach(clearTimeout);
    const now = ctx.currentTime;
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0, now + 1.5);
    fadeTimerId = setTimeout(() => {
      ctx.close().catch(() => {});
    }, 1700);
  };
}

export default function BackgroundMusic() {
  const { musicEnabled } = useStore();
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!musicEnabled) {
      stopRef.current?.();
      stopRef.current = null;
      return;
    }

    const Ctor = window.AudioContext ?? window.webkitAudioContext;
    if (!Ctor) return;

    const ctx = new Ctor();
    const stop = startAmbientMusic(ctx);
    stopRef.current = stop;

    return () => {
      stop();
      // Prevent double-stop if stopRef still points here
      if (stopRef.current === stop) stopRef.current = null;
    };
  }, [musicEnabled]);

  return null;
}
