/**
 * §5 — routes, contact details and the homepage station manifest.
 *
 * Labels are sentence case in markup and uppercased in CSS (§4). Never type
 * capitals here: screen readers spell them out letter by letter.
 */

export interface NavRoute {
  href: string;
  label: string;
}

/**
 * The six nav routes. `/` is the first of them and is rendered as the logo,
 * not as a text link — see [S6]. The Footer lists all six.
 */
export const navRoutes: NavRoute[] = [
  { href: "/", label: "TRAIN" },
  { href: "/what-we-do", label: "What we do" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/mission", label: "Mission" },
];

/** The five text links that sit centre-right in the nav (everything but `/`). */
export const navTextRoutes: NavRoute[] = navRoutes.filter(
  (r) => r.href !== "/",
);

export interface HomeSection {
  /** Section id, in the order §5 fixes them. */
  id: string;
  /** Station name shown beside the active rail dot. */
  station: string;
}

/**
 * [S7] — the ProgressRail's nine stations. §5 fixes the ids; the names come
 * from the section titles in §7 and §8. Not in §3's file list, but the rail
 * cannot be built without it.
 */
export const homeSections: HomeSection[] = [
  { id: "hero", station: "Hero" },
  { id: "the-problem", station: "The problem" },
  { id: "how-train-works", station: "How TRAIN works" },
  { id: "what-train-does", station: "What TRAIN does" },
  { id: "the-network", station: "The network" },
  { id: "work", station: "Work" },
  { id: "why-train", station: "Why TRAIN" },
  { id: "mission", station: "Mission" },
  { id: "start", station: "Start" },
];

export interface SocialLink {
  label: string;
  href: string;
}

export const site = {
  name: "TRAIN",
  /** §14 — the definition, used in the footer. */
  definition:
    "One client need. One coordinated solution. From first hello to lasting impact.",
  // TODO: [CONTENT-GAPS §5] confirm the real mailbox before launch.
  email: "hello@train.co.uk",
  // TODO: [CONTENT-GAPS §5] real social URLs not supplied. §6 names LinkedIn.
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
  ] satisfies SocialLink[],
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/cookies", label: "Cookies" },
  ] satisfies NavRoute[],
  /** §6 — bottom bar. */
  copyright: "© 2026 TRAIN",
} as const;
