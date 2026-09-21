import type { Capability } from "./types";

/**
 * §14 §04 — the four capabilities and their services.
 *
 * `summary` and every service `note` are content gaps: §14 supplies the
 * capability names and service lists, but no per-capability paragraph and no
 * service clarifiers. §0 forbids inventing replacement copy, so both carry
 * TODO markers. Neither blocks the first pass — the homepage §04 cards render
 * names and service names only. /what-we-do cannot ship without them.
 */
export const capabilities: Capability[] = [
  {
    slug: "creative",
    number: "01",
    name: "Creative",
    // TODO: [CONTENT-GAPS §6] capability paragraph not supplied.
    summary: "",
    services: [
      // TODO: [CONTENT-GAPS §1] 4–8 word clarifiers not supplied.
      { name: "Photography", note: "" },
      { name: "Videography", note: "" },
      { name: "Graphic design", note: "" },
      { name: "Branding", note: "" },
      { name: "Creative direction", note: "" },
    ],
  },
  {
    slug: "digital-it",
    number: "02",
    name: "Digital & IT",
    // TODO: [CONTENT-GAPS §6] capability paragraph not supplied.
    summary: "",
    services: [
      // TODO: [CONTENT-GAPS §1] 4–8 word clarifiers not supplied.
      { name: "Website development", note: "" },
      { name: "SEO", note: "" },
      { name: "Digital solutions", note: "" },
    ],
  },
  {
    slug: "marketing-content",
    number: "03",
    name: "Marketing & content",
    // TODO: [CONTENT-GAPS §6] capability paragraph not supplied.
    summary: "",
    services: [
      // TODO: [CONTENT-GAPS §1] 4–8 word clarifiers not supplied.
      { name: "Social media", note: "" },
      { name: "Content creation", note: "" },
      { name: "Marketing", note: "" },
      { name: "Content strategy", note: "" },
    ],
  },
  {
    slug: "business-support",
    number: "04",
    name: "Business support",
    // TODO: [CONTENT-GAPS §6] capability paragraph not supplied.
    summary: "",
    services: [
      // TODO: [CONTENT-GAPS §1] 4–8 word clarifiers not supplied.
      { name: "Virtual assistance", note: "" },
      { name: "Administrative support", note: "" },
      { name: "Business systems", note: "" },
    ],
  },
];

/** Lookup for rendering capability tags by slug (§9 — tags must carry text). */
export const capabilityBySlug = Object.fromEntries(
  capabilities.map((c) => [c.slug, c]),
) as Record<Capability["slug"], Capability>;
