import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

declare global { interface Window { webkitAudioContext?: typeof AudioContext } }

function startAmbientMusic(ctx: AudioContext): () => void {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.10, ctx.currentTime + 3);
  master.connect(ctx.destination);

  const scheduled: AudioScheduledSourceNode[] = [];

  function osc(type: OscillatorType, freq: number, gainVal: number, dest: AudioNode) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = gainVal;
    o.connect(g);
    g.connect(dest);
    o.start();
    scheduled.push(o);
  }

  // Bass drone (A1 = 55 Hz, A2 = 110 Hz)
  const bassFilter = ctx.createBiquadFilter();
  bassFilter.type = 'lowpass';
  bassFilter.frequency.value = 180;
  bassFilter.connect(master);
  osc('sine', 55, 0.55, bassFilter);
  osc('sine', 110, 0.15, bassFilter);

  // Slow LFO on master gain for a pulsing feel
  const lfoOsc = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfoOsc.type = 'sine';
  lfoOsc.frequency.value = 0.22;
  lfoGain.gain.value = 0.04;
  lfoOsc.connect(lfoGain);
  lfoGain.connect(master.gain);
  lfoOsc.start();
  scheduled.push(lfoOsc);

  // Atmospheric pad (A minor: A3 = 220 Hz, E4 = 329.6 Hz)
  const padFilter = ctx.createBiquadFilter();
  padFilter.type = 'lowpass';
  padFilter.frequency.value = 700;
  padFilter.Q.value = 1.2;
  padFilter.connect(master);
  osc('triangle', 220, 0.06, padFilter);
  osc('triangle', 329.6, 0.04, padFilter);

  // Slow filter sweep LFO on pad
  const padLfo = ctx.createOscillator();
  const padLfoGain = ctx.createGain();
  padLfo.type = 'sine';
  padLfo.frequency.value = 0.07;
  padLfoGain.gain.value = 250;
  padLfo.connect(padLfoGain);
  padLfoGain.connect(padFilter.frequency);
  padLfo.start();
  scheduled.push(padLfo);

  // Arpeggio: A4=440, C5=523.25, E5=659.25, C5, G4=392, C5, E5, G5=783.99
  const ARP_FREQS = [440, 523.25, 659.25, 523.25, 392, 523.25, 659.25, 783.99];
  const ARP_INTERVAL_MS = 800;
  let step = 0;
  let running = true;
  const arpTimerIds: ReturnType<typeof setTimeout>[] = [];

  const arpOut = ctx.createGain();
  arpOut.gain.value = 0.035;
  const arpFilter = ctx.createBiquadFilter();
  arpFilter.type = 'highpass';
  arpFilter.frequency.value = 350;
  arpOut.connect(arpFilter);
  arpFilter.connect(master);

  function playArpNote() {
    if (!running) return;
    const freq = ARP_FREQS[step % ARP_FREQS.length];
    step++;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = freq;
    o.connect(g);
    g.connect(arpOut);
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(1, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    o.start(t);
    o.stop(t + 0.45);
    arpTimerIds.push(setTimeout(playArpNote, ARP_INTERVAL_MS));
  }

  playArpNote();

  let stopped = false;
  let fadeTimerId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    // Guard against double-calls (e.g. component re-render or rapid toggle)
    if (stopped) {
      if (fadeTimerId !== null) clearTimeout(fadeTimerId);
      scheduled.forEach((n) => { try { n.stop(); } catch { /* already stopped */ } });
      ctx.close().catch(() => {});
      return;
    }
    stopped = true;
    running = false;
    arpTimerIds.forEach(clearTimeout);
    const now = ctx.currentTime;
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0, now + 1.5);
    fadeTimerId = setTimeout(() => {
      scheduled.forEach((n) => { try { n.stop(); } catch { /* already stopped */ } });
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
