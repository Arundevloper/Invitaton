/* Reusable SVG symbols referenced elsewhere with <use href="#id" /> */

const PETAL = "M0 -14 C 6 -22, 6 -30, 0 -34 C -6 -30, -6 -22, 0 -14Z";

export default function SvgSprites() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">

      <symbol id="divider" viewBox="0 0 300 26">
        <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" transform="translate(150,13)">
          <path d="M-150 0 L-26 0" />
          <path d="M150 0 L26 0" />
          <path d="M-26 0 Q-14 -2 -10 -10 M-26 0 Q-14 2 -10 10" />
          <path d="M26 0 Q14 -2 10 -10 M26 0 Q14 2 10 10" />
          <path d="M0 -12 C 6 -5, 6 5, 0 12 C -6 5, -6 -5, 0 -12Z" strokeWidth="1.2" />
          <path d="M-9 0 C -5 -4, 5 -4, 9 0 C 5 4, -5 4, -9 0Z" strokeWidth="1.2" />
          <circle r="1.6" fill="currentColor" stroke="none" />
        </g>
      </symbol>

      <symbol id="ic-haldi" viewBox="-40 -40 80 80">
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle r="12" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <path key={deg} d={PETAL} transform={deg ? `rotate(${deg})` : undefined} />
          ))}
        </g>
      </symbol>

      <symbol id="ic-mehndi" viewBox="-44 -44 88 88">
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-6 34 C -34 20, -30 -24, 2 -32 C 26 -38, 34 -14, 20 0 C 10 10, -8 6, -4 -8 C -2 -16, 8 -16, 10 -8" />
          <path d="M-6 34 C -22 22, -22 2, -10 -8" strokeWidth="1.4" opacity=".7" />
          <circle cx="2" cy="-16" r="2" fill="currentColor" stroke="none" />
        </g>
      </symbol>

      <symbol id="ic-sangeet" viewBox="-36 -40 72 80">
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-14 -24 L-14 20" />
          <path d="M10 -30 L10 14" />
          <path d="M-14 -24 C 0 -30, 10 -34, 10 -30" />
          <ellipse cx="-20" cy="20" rx="8" ry="6" transform="rotate(-20 -20 20)" fill="currentColor" stroke="none" />
          <ellipse cx="4" cy="14" rx="8" ry="6" transform="rotate(-20 4 14)" fill="currentColor" stroke="none" />
        </g>
      </symbol>

      <symbol id="ic-vivah" viewBox="-30 -40 60 80">
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0 -34 C 10 -18, 12 -6, 4 2 C 10 -6, 4 -14, 0 -14 C -2 -8, -10 -8, -4 2 C -12 -6, -10 -18, 0 -34Z" />
          <path d="M-16 8 C -16 22, 16 22, 16 8 Z" />
          <path d="M-20 8 L20 8" />
        </g>
      </symbol>

      <symbol id="ic-cal" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
          <path d="M3 9h18M8 2.5v4M16 2.5v4" />
        </g>
      </symbol>

      <symbol id="ic-arrow" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M6 13l6 6 6-6" />
        </g>
      </symbol>
    </svg>
  );
}

/** <svg><use href="#id"/></svg> shorthand */
export function Icon({ id, className, viewBox }: { id: string; className?: string; viewBox?: string }) {
  return (
    <svg className={className} viewBox={viewBox} aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  );
}

export function Divider({ className = "divider ros" }: { className?: string }) {
  return <Icon id="divider" className={className} viewBox="0 0 300 26" />;
}
