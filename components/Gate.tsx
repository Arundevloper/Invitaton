"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CONFIG } from "@/lib/config";
import Crest from "./Crest";
import { prefersReducedMotion } from "@/lib/motion";

type Phase = "closed" | "opening" | "gone";

export default function Gate() {
  const [phase, setPhase] = useState<Phase>("closed");
  const [showPetals, setShowPetals] = useState(false);
  const stopPetals = useCallback(() => setShowPetals(false), []);

  function open() {
    if (phase !== "closed") return;
    const reduce = prefersReducedMotion();
    setPhase("opening");
    document.body.classList.remove("locked");
    document.body.classList.add("opened");
    if (!reduce) setShowPetals(true);
    window.setTimeout(() => setPhase("gone"), reduce ? 0 : 1500);
  }

  return (
    <>
      {phase !== "gone" && (
        <div
          id="gate"
          className={phase === "opening" ? "open" : undefined}
          style={phase === "opening" ? { pointerEvents: "none" } : undefined}
        >
          <div className="cover">
            <Crest className="crest" height={132} preload />
            <p className="mantra" lang="hi">॥ श्री गणेशाय नमः ॥</p>
            <p className="pre">We&apos;re getting married!</p>
            <p className="cn">{CONFIG.groom}</p>
            <p className="camp">and</p>
            <p className="cn">{CONFIG.bride}</p>
            <button id="openBtn" type="button" onClick={open}>
              Open our invitation
            </button>
            <p className="tap">tap to begin</p>
          </div>
        </div>
      )}
      {showPetals && <Petals onDone={stopPetals} />}
    </>
  );
}

/* soft petals — one gentle fall on open */
const COLORS = ["#E7CBA3", "#D9AEB2", "#DBAE52", "#EADCC4", "#E79AB0"];

interface Petal {
  x: number; y: number; vy: number; vx: number; r: number; vr: number;
  s: number; ph: number; a: number; c: string;
}

function Petals({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const cx = cv?.getContext("2d");
    if (!cv || !cx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth, H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const n = W < 600 ? 30 : 46;
    const petals: Petal[] = Array.from({ length: n }, () => ({
      x: Math.random() * W, y: -20 - Math.random() * H, vy: 1 + Math.random() * 1.3, vx: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.05, s: 6 + Math.random() * 7, ph: Math.random() * 6.28,
      a: 0.9, c: COLORS[(Math.random() * COLORS.length) | 0],
    }));

    let raf = 0;
    const tick = () => {
      cx.clearRect(0, 0, W, H);
      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.ph += 0.025; p.x += p.vx + Math.sin(p.ph) * 0.6; p.y += p.vy; p.r += p.vr;
        if (p.y > H * 0.6) p.a -= 0.012;
        if (p.a <= 0 || p.y > H + 30) { petals.splice(i, 1); continue; }
        cx.save();
        cx.translate(p.x, p.y); cx.rotate(p.r); cx.scale(1, 0.5 + 0.5 * Math.cos(p.ph * 1.7));
        cx.globalAlpha = Math.max(0, p.a); cx.fillStyle = p.c;
        cx.beginPath();
        cx.moveTo(0, -p.s);
        cx.bezierCurveTo(p.s * 0.8, -p.s * 0.5, p.s * 0.7, p.s * 0.6, 0, p.s);
        cx.bezierCurveTo(-p.s * 0.7, p.s * 0.6, -p.s * 0.8, -p.s * 0.5, 0, -p.s);
        cx.fill();
        cx.restore();
      }
      if (petals.length) raf = requestAnimationFrame(tick);
      else onDone();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return <canvas id="petals" ref={ref} aria-hidden="true" />;
}
