/**
 * §10 — shared content types.
 *
 * §3's file list does not name this module; it exists so `case-studies.ts`,
 * `mission.ts` and `network.ts` can share `ImageRef` and `CapabilitySlug`
 * without importing each other.
 *
 * A note on casing: §10's comments illustrate names as 'CREATIVE' and
 * 'DISCOVER', but §4 forbids capitals in markup because screen readers spell
 * them out letter by letter, and this data goes straight into markup. Names
 * are therefore stored sentence case and uppercased with `text-transform`.
 */

export type CapabilitySlug =
  | "creative"
  | "digital-it"
  | "marketing-content"
  | "business-support";

export interface Capability {
  slug: CapabilitySlug;
  /** '01' … '04'. Rendered as decoration only — see [A3]. */
  number: string;
  name: string;
  /** Paragraph for /what-we-do. */
  summary: string;
  services: { name: string; note: string }[];
}

export interface ModelStage {
  slug: string;
  name: string;
  phase: "client" | "engine";
  /** One line, shown on the track. */
  short: string;
  /** Paragraph, shown when expanded. */
  detail: string;
}

export interface ImageRef {
  /** Picsum seed — deterministic, so the same seed is always the same photo. */
  seed: string;
  alt: string;
  width: number;
  height: number;
}

export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  sector: string;
  timeline: string;
  capabilities: CapabilitySlug[];
  featured: boolean;
  order: number;
  heroImage: ImageRef;
  outcomeLine: string;
  problem: string;
  approach: string;
  execution: string;
  /** Exactly 2. */
  gallery: ImageRef[];
  outcome: string;
  /** Exactly 3. */
  metrics: { value: string; label: string }[];
}
