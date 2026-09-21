import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * §13 — GSAP is imported per plugin, never the full bundle. Importing from
 * "gsap/all" would pull every plugin into the first-load budget.
 *
 * Registration is idempotent, and guarded for the server because ScrollTrigger
 * touches `window` on register.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
