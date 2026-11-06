import { CONFIG } from "@/lib/config";
import { cssVars } from "@/lib/motion";
import { Icon } from "./SvgSprites";
import Crest from "./Crest";
import Greeting from "./Greeting";

/* hero mandala watermark — rings of petals + circles, computed at build time */
function ring(n: number, a: number, b: number, w: number) {
  const p1 = a + (b - a) * 0.35, p2 = a + (b - a) * 0.75;
  const d = `M0 ${-a} C ${w} ${-p1}, ${w} ${-p2}, 0 ${-b} C ${-w} ${-p2}, ${-w} ${-p1}, 0 ${-a}Z`;
  return Array.from({ length: n }, (_, i) => <path key={`${a}-${i}`} d={d} transform={`rotate(${(i * 360) / n})`} />);
}

function Mandala() {
  return (
    <svg className="mandala" viewBox="-100 -100 200 200">
      <g fill="none" stroke="currentColor" strokeWidth=".6">
        <circle r="98" />
        {ring(28, 72, 96, 6)}
        <circle r="72" strokeDasharray="1 3" />
        {ring(18, 46, 71, 9)}
        <circle r="46" />
        {ring(12, 24, 45, 8)}
        {ring(8, 8, 23, 5)}
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wm" aria-hidden="true"><Mandala /></div>
      <Greeting />
      <Crest className="hero-crest reveal" height={88} style={cssVars({ "--i": 0 })} />
      <p className="mantra reveal" style={cssVars({ "--i": 0 })} lang="hi">॥ श्री गणेशाय नमः ॥</p>
      <p className="pre reveal" style={cssVars({ "--i": 1 })}>
        With the blessings of our families, we can&apos;t wait to celebrate with you
      </p>
      <h1 className="names reveal" style={cssVars({ "--i": 2 })}>
        <span className="nm">{CONFIG.groom}</span>
        <span className="amp">and</span>
        <span className="nm">{CONFIG.bride}</span>
      </h1>
      <p className="when reveal" style={cssVars({ "--i": 3 })}>{CONFIG.dateLong}</p>
      <p className="where reveal muted" style={cssVars({ "--i": 3 })}>{CONFIG.city}</p>
      <a className="scroll reveal" style={cssVars({ "--i": 4 })} href="#invite">
        see more
        <Icon id="ic-arrow" className="ar" viewBox="0 0 24 24" />
      </a>
    </header>
  );
}
