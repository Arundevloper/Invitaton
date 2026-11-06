import { CONFIG } from "./config";

/* =====================================================================
   Background music.
   - Starts when the guest taps "Open our invitation" (browsers only allow
     sound after a tap), and can be paused with the floating button.
   - If CONFIG.musicUrl is set, that audio file is looped.
   - Otherwise a soft tanpura drone + santoor-style melody in Raag Bhupali
     is generated live in the browser (no file to download, no copyright).
   ===================================================================== */

export type MusicState = "off" | "playing" | "paused";

let state: MusicState = "off";
const listeners = new Set<() => void>();
function setState(s: MusicState) {
  state = s;
  listeners.forEach((l) => l());
}

/** tiny store so the toggle button can follow the music state */
export const musicStore = {
  subscribe(l: () => void) {
    listeners.add(l);
    return () => void listeners.delete(l);
  },
  get: () => state,
  getServer: (): MusicState => "off",
};

interface Engine {
  play(): void;
  pause(): void;
}
let engine: Engine | null = null;

/** Start the music. Call this from a click/tap. */
export function startMusic() {
  if (engine) return;
  try {
    // iPhone: let the music play even when the silent switch is on
    const nav = navigator as Navigator & { audioSession?: { type: string } };
    if (nav.audioSession) nav.audioSession.type = "playback";
  } catch {}
  engine = CONFIG.musicUrl ? fileEngine(CONFIG.musicUrl) : synthEngine();
  engine.play();
  setState("playing");

  // go quiet while the tab is in the background, resume on return
  document.addEventListener("visibilitychange", () => {
    if (state !== "playing" || !engine) return;
    if (document.hidden) engine.pause();
    else engine.play();
  });
}

export function toggleMusic() {
  if (!engine) return startMusic();
  if (state === "playing") {
    engine.pause();
    setState("paused");
  } else {
    engine.play();
    setState("playing");
  }
}

/* ---------------- your own audio file ---------------- */
function fileEngine(url: string): Engine {
  const audio = new Audio(url);
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0;
  let fade: number | undefined;
  const fadeTo = (target: number, done?: () => void) => {
    window.clearInterval(fade);
    fade = window.setInterval(() => {
      const d = target - audio.volume;
      if (Math.abs(d) <= 0.03) {
        audio.volume = target;
        window.clearInterval(fade);
        done?.();
      } else audio.volume += Math.sign(d) * 0.03;
    }, 60);
  };
  return {
    play() {
      audio.play().catch(() => setState("paused"));
      fadeTo(0.6);
    },
    pause() {
      fadeTo(0, () => audio.pause());
    },
  };
}

/* ---------------- built-in music (Web Audio) ---------------- */
function synthEngine(): Engine {
  const AC =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AC();
  const master = ctx.createGain();
  master.gain.value = 0;
  const limiter = ctx.createDynamicsCompressor(); // safety net against loud peaks
  limiter.threshold.value = -10;
  limiter.ratio.value = 8;
  master.connect(limiter);
  limiter.connect(ctx.destination);

  const schedule = createSynth(ctx, master);
  let timer: number | undefined;
  let sleep: number | undefined;

  return {
    play() {
      window.clearTimeout(sleep);
      void ctx.resume();
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0.5, ctx.currentTime, 1.2); // gentle fade-in
      window.clearInterval(timer);
      schedule(ctx.currentTime + 0.5);
      timer = window.setInterval(() => schedule(ctx.currentTime + 0.5), 150);
    },
    pause() {
      window.clearInterval(timer);
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
      sleep = window.setTimeout(() => void ctx.suspend(), 900);
    },
  };
}

const SA = 146.83; // tonic: D3
// Raag Bhupali (Sa Re Ga Pa Dha) from lower Pa up to upper Ga, around D4
const MELODY = [3 / 4, 5 / 6, 1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2, 9 / 4, 5 / 2].map((r) => r * SA * 2);
const RESOLVE = [0, 2, 5, 7]; // phrases come to rest on Pa or Sa
const DRONE = [(SA * 3) / 4, SA, SA, SA / 2]; // tanpura cycle: Pa Sa Sa Sa(low)

const pick = <T>(a: T[]) => a[(Math.random() * a.length) | 0];

/**
 * Builds the instruments on `ctx` and returns schedule(until): call it repeatedly
 * to queue every note that starts before `until` (seconds of ctx time).
 */
export function createSynth(ctx: BaseAudioContext, out: AudioNode) {
  const bus = ctx.createGain();
  const verb = ctx.createConvolver();
  verb.buffer = impulse(ctx, 3.5, 2.5);
  const wet = ctx.createGain();
  wet.gain.value = 0.45;
  bus.connect(out);
  bus.connect(verb);
  verb.connect(wet);
  wet.connect(out);

  const drone = ctx.createGain();
  drone.gain.value = 0.32;
  drone.connect(bus);

  const melody = ctx.createGain();
  melody.gain.value = 0.8;
  melody.connect(bus);
  // soft echo on the melody
  const delay = ctx.createDelay(2);
  delay.delayTime.value = 0.42;
  const tone = ctx.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = 1800;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.28;
  melody.connect(delay);
  delay.connect(tone);
  tone.connect(feedback);
  feedback.connect(delay);
  tone.connect(bus);

  function tanpura(t: number, f: number, level: number) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(level, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 5.5);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.Q.value = 2;
    lp.frequency.setValueAtTime(2400, t);
    lp.frequency.exponentialRampToValueAtTime(600, t + 4);
    for (const cents of [-4, 4]) {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = f;
      o.detune.value = cents;
      o.connect(lp);
      o.start(t);
      o.stop(t + 5.6);
    }
    lp.connect(g);
    g.connect(drone);
  }

  function santoor(t: number, f: number, level: number) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(level, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2.8);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(f * 8, t);
    lp.frequency.exponentialRampToValueAtTime(f * 2, t + 1.2);
    const partials: [number, number, OscillatorType][] = [
      [1, 1, "triangle"],
      [1.004, 0.6, "triangle"], // paired string, slightly detuned
      [2, 0.25, "sine"],
      [3.01, 0.08, "sine"],
    ];
    for (const [mult, amp, type] of partials) {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = f * mult;
      const og = ctx.createGain();
      og.gain.value = amp;
      o.connect(og);
      og.connect(lp);
      o.start(t);
      o.stop(t + 2.9);
    }
    lp.connect(g);
    g.connect(melody);
  }

  let nextDrone = ctx.currentTime + 0.1;
  let droneStep = 0;
  let nextNote = ctx.currentTime + 2.5;
  let idx = 2; // start on Sa
  let left = 5; // notes left in this phrase

  function playNote(t: number): number {
    if (left === 0) {
      left = 4 + ((Math.random() * 5) | 0);
      return t + 2.5 + Math.random() * 3; // breathe between phrases
    }
    idx = Math.min(MELODY.length - 1, Math.max(0, idx + pick([-2, -1, -1, 1, 1, 2])));
    left--;
    if (left === 0) idx = RESOLVE.reduce((a, b) => (Math.abs(b - idx) < Math.abs(a - idx) ? b : a));
    const level = left === 0 ? 0.12 : 0.07 + Math.random() * 0.04;
    santoor(t, MELODY[idx], level);
    if (left > 0 && Math.random() < 0.18) santoor(t + 0.11, MELODY[idx], level * 0.5); // light double strike
    return t + (left === 0 ? 2.2 : pick([0.6, 0.8, 0.8, 1.1, 1.1, 1.6]));
  }

  return function schedule(until: number) {
    while (nextDrone < until) {
      tanpura(nextDrone, DRONE[droneStep % 4], droneStep % 4 === 3 ? 0.09 : 0.07);
      droneStep++;
      nextDrone += 1.3;
    }
    while (nextNote < until) nextNote = playNote(nextNote);
  };
}

function impulse(ctx: BaseAudioContext, seconds: number, decay: number) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return buf;
}
