export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** typed helper for CSS custom properties in style={{}} */
export function cssVars(vars: Record<`--${string}`, string | number>) {
  return vars as React.CSSProperties;
}
