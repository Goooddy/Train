import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

/**
 * jsdom has no `matchMedia`, and every motion component in this codebase
 * decides what to do by reading it. Tests install a matcher describing the
 * user they are simulating.
 */
type Matcher = (query: string) => boolean;

let matcher: Matcher = () => false;

export function setMediaMatcher(next: Matcher) {
  matcher = next;
}

/** A user with the OS "reduce motion" setting on. */
export const reducedMotionUser: Matcher = (query) =>
  query.includes("prefers-reduced-motion: reduce");

/** A desktop user with no motion preference — Tier 2 runs. */
export const desktopMotionUser: Matcher = (query) =>
  query.includes("prefers-reduced-motion: no-preference") ||
  query.includes("min-width");

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    media: query,
    get matches() {
      return matcher(query);
    },
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});

afterEach(() => {
  cleanup();
  matcher = () => false;
});
