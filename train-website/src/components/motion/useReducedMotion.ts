"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

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

/** No preference is knowable on the server; correct on hydration. */
const getServerSnapshot = () => false;

/**
 * §11 — read by every motion component.
 *
 * A media query is external state, so this subscribes to it with
 * `useSyncExternalStore` rather than mirroring it into an effect. That also
 * means it tracks changes made while the page is open, which [S5] requires.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
