/**
 * §11 — shared motion values.
 *
 * Import these everywhere. Ad-hoc durations scattered through components are
 * how a site stops feeling coherent.
 *
 * `dur` is in seconds because that is what GSAP takes. `durMs` is the same
 * scale in milliseconds for CSS transitions and inline styles. Keep them in
 * step: they are the same tokens, expressed twice.
 */
export const dur = {
  fast: 0.18,
  /** §6 — the EditorialCTA underline sweep. Specified directly by the spec,
   *  held here so it is not re-typed per component. */
  cta: 0.28,
  base: 0.4,
  slow: 0.9,
  draw: 1.4,
} as const;

export const durMs = {
  fast: 180,
  cta: 280,
  base: 400,
  slow: 900,
  draw: 1400,
} as const;

export const ease = {
  out: "power3.out",
  inOut: "power2.inOut",
} as const;

export const stagger = {
  tight: 0.06,
  loose: 0.12,
} as const;

/**
 * §11 rule 1 — reveals trigger at 75% viewport height and play once. Elements
 * that re-animate on every scroll-past feel cheap and fight the reading.
 */
export const revealTrigger = {
  start: "top 75%",
  toggleActions: "play none none none",
} as const;

/**
 * §11 / §12 — 1024px is the meaningful threshold. It switches the nav, the
 * rail and Tier 2 motion together.
 */
export const TIER_2_MIN_WIDTH = 1024;
