"use client";

import { useEffect, useState } from "react";
import { CONFIG, coupleNames } from "@/lib/config";
import { prefersReducedMotion } from "@/lib/motion";
import Crest from "./Crest";

const N = 5;

/* footer — tap to light the diyas */
export default function Footer() {
  const [lit, setLit] = useState<boolean[]>(() => Array(N).fill(false));
  const [reduce, setReduce] = useState(false);

  useEffect(() => setReduce(prefersReducedMotion()), []);

  const count = lit.filter(Boolean).length;
  const light = (i: number) => setLit((l) => (l[i] ? l : l.map((v, j) => v || j === i)));

  return (
    <footer>
      <div className="diyas" id="diyas" aria-label="Tap to light the diyas">
        {lit.map((on, i) => (
          <button
            key={i}
            type="button"
            className={`diya${on ? " lit" : ""}`}
            aria-label={on ? "Diya lit" : "Light diya"}
            onClick={() => light(i)}
          >
            <span className="flame" />
            <span className="bowl" />
          </button>
        ))}
      </div>
      <p className="diya-hint" id="diyaHint" style={count > 0 ? { opacity: 0 } : undefined}>
        Tap to light the diyas
      </p>
      <Crest className="crest" height={64} />
      <p className={`bless${count === N || reduce ? " show" : ""}`} id="bless" lang="hi">
        आपकी उपस्थिति ही हमारा सौभाग्य है
      </p>
      <p className="sig">{coupleNames}</p>
      <p className="from">{CONFIG.signoff}</p>
    </footer>
  );
}
