import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

declare global { interface Window { webkitAudioContext?: typeof AudioContext } }

// ── Fortnite-style upbeat battle-royale lobby music ──────────────────────────
// Uses a look-ahead scheduler so timing is driven by the AudioContext clock
// rather than setTimeout, preventing BPM drift caused by JS thread load or
// browser tab-throttling.
function startAmbientMusic(ctx: AudioContext): () => void {
  const BPM = 128;
  const BEAT = 60 / BPM; // seconds per beat

  // How far ahead (in seconds) to schedule notes.
  const LOOKAHEAD = 0.2;
  // How often (ms) the scheduler wakes up to fill the look-ahead window.
  const SCHEDULE_INTERVAL = 50;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.11, ctx.currentTime + 2.5);
  master.connect(ctx.destination);

  let running = true;
  let schedulerTimer: ReturnType<typeof setTimeout> | null = null;

  // ── Absolute next-event times (in AudioContext seconds) ──────────────────
  const start = ctx.currentTime;
  let nextKick   = start;
  let nextSnare  = start + BEAT;          // offset 1 beat → lands on 2 & 4
  let nextHihat  = start;
  let nextBass   = start;
  let nextLead   = start;

  // ── Per-voice step counters ───────────────────────────────────────────────
  let bassStep = 0;
  let melStep  = 0;

  // ── Shared noise buffer cache ─────────────────────────────────────────────
  let snareBuffer: AudioBuffer | null = null;
  let hihatBuffer: AudioBuffer | null = null;

  function getSnareBuffer(): AudioBuffer {
    if (!snareBuffer) {
      const bufSize = Math.floor(ctx.sampleRate * 0.12);
      snareBuffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = snareBuffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    }
    return snareBuffer;
  }

  function getHihatBuffer(): AudioBuffer {
    if (!hihatBuffer) {
      const bufSize = Math.floor(ctx.sampleRate * 0.04);
      hihatBuffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = hihatBuffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    }
    return hihatBuffer;
  }

  // ── Bass filter (shared, persistent) ─────────────────────────────────────
  const BASS_FREQS = [73.4, 73.4, 110, 73.4, 87.3, 73.4, 110, 87.3];
  const bassFilter = ctx.createBiquadFilter();
  bassFilter.type = 'lowpass';
  bassFilter.frequency.value = 220;
  bassFilter.connect(master);

  // ── Lead gain (shared, persistent) ───────────────────────────────────────
  const MELODY = [
    293.66, 329.63, 369.99, 440,
    440,    369.99, 329.63, 293.66,
    329.63, 369.99, 493.88, 440,
    369.99, 293.66, 0,      0,
  ];
  const leadGain = ctx.createGain();
  leadGain.gain.value = 0.055;
  leadGain.connect(master);

  // ── Slow pad layer (A minor chord: A2 + E3 + A3) ─────────────────────────
  const padGain = ctx.createGain();
  padGain.gain.value = 0.028;
  const padFilter = ctx.createBiquadFilter();
  padFilter.type = 'lowpass';
  padFilter.frequency.value = 900;
  padGain.connect(padFilter); padFilter.connect(master);
  const padOscillators: OscillatorNode[] = [];
  ([110, 164.81, 220] as number[]).forEach((freq) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'triangle'; o.frequency.value = freq; g.gain.value = 1;
    o.connect(g); g.connect(padGain); o.start();
    padOscillators.push(o);
  });

  // ── Note schedulers – each advances its own absolute clock ───────────────
  function scheduleKick(t: number) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(master);
    o.type = 'sine';
    o.frequency.setValueAtTime(150, t);
    o.frequency.linearRampToValueAtTime(0.001, t + 0.32);
    g.gain.setValueAtTime(0.55, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
    o.start(t); o.stop(t + 0.35);
  }

  function scheduleSnare(t: number) {
    const src = ctx.createBufferSource();
    src.buffer = getSnareBuffer();
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1800;
    filter.Q.value = 0.7;
    const g = ctx.createGain();
    src.connect(filter); filter.connect(g); g.connect(master);
    g.gain.setValueAtTime(0.18, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    src.start(t); src.stop(t + 0.14);
  }

  function scheduleHihat(t: number) {
    const src = ctx.createBufferSource();
    src.buffer = getHihatBuffer();
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 8000;
    const g = ctx.createGain();
    src.connect(filter); filter.connect(g); g.connect(master);
    g.gain.setValueAtTime(0.045, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
    src.start(t); src.stop(t + 0.05);
  }

  function scheduleBass(t: number) {
    const freq = BASS_FREQS[bassStep % BASS_FREQS.length];
    bassStep++;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.value = freq;
    o.connect(g); g.connect(bassFilter);
    g.gain.setValueAtTime(0.55, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + BEAT * 0.75);
    o.start(t); o.stop(t + BEAT * 0.8);
  }

  function scheduleLead(t: number) {
    const freq = MELODY[melStep % MELODY.length];
    melStep++;
    if (freq > 0) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'square';
      o.frequency.value = freq;
      o.connect(g); g.connect(leadGain);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(1, t + 0.018);
      g.gain.exponentialRampToValueAtTime(0.001, t + BEAT * 0.82);
      o.start(t); o.stop(t + BEAT * 0.88);
    }
  }

  // ── Main look-ahead scheduler loop ───────────────────────────────────────
  function schedule() {
    if (!running) return;
    const now = ctx.currentTime;
    const horizon = now + LOOKAHEAD;

    // If a voice has fallen far behind (e.g. tab was suspended), snap it
    // forward so we don't schedule a flood of catch-up notes.
    if (nextKick   < now) nextKick   = now;
    if (nextSnare  < now) nextSnare  = now;
    if (nextHihat  < now) nextHihat  = now;
    if (nextBass   < now) nextBass   = now;
    if (nextLead   < now) nextLead   = now;

    while (nextKick < horizon)  { scheduleKick(nextKick);   nextKick  += BEAT * 2; }
    while (nextSnare < horizon) { scheduleSnare(nextSnare); nextSnare += BEAT * 2; }
    while (nextHihat < horizon) { scheduleHihat(nextHihat); nextHihat += BEAT * 0.5; }
    while (nextBass < horizon)  { scheduleBass(nextBass);   nextBass  += BEAT; }
    while (nextLead < horizon)  { scheduleLead(nextLead);   nextLead  += BEAT * 0.5; }

    schedulerTimer = setTimeout(schedule, SCHEDULE_INTERVAL);
  }
  schedule();

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
    if (schedulerTimer !== null) clearTimeout(schedulerTimer);
    padOscillators.forEach((o) => { try { o.stop(); } catch (_) {} });
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
