"use client";

import { useSyncExternalStore } from "react";
import { TIER_2_MIN_WIDTH } from "@/lib/motion";

/**
 * §11 — Tier 2 runs only at ≥1024px with no reduced-motion preference.
 *
 * Below that threshold Tier 2 effects must render in their *completed* state,
 * never hidden: the track, the diagrams and the loop all carry part of the
 * argument, so the information has to survive even when the animation does
 * not.
 *
 * Both conditions live in one media query so they are evaluated together and
 * tracked live — 1024px is the threshold that switches the nav, the rail and
 * Tier 2 as a unit (§12).
 */
const QUERY = `(min-width: ${TIER_2_MIN_WIDTH}px) and (prefers-reduced-motion: no-preference)`;

let cached: MediaQueryList | null = null;

function mql(): MediaQueryList | null {
  if (typeof window === "undefined") return null;
  cached ??= window.matchMedia(QUERY);
  return cached;
}

function subscribe(onChange: () => void) {
  const query = mql();
  if (!query) return () => {};
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const getSnapshot = () => mql()?.matches ?? false;

/** False on the server, so nothing animates before hydration decides. */
const getServerSnapshot = () => false;

export function useTier2(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
