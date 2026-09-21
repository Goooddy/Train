"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * [S3] — the single scroll orchestrator.
 *
 * The nav's surface change, the nav's show/hide and the rail's progress fill
 * all need scroll position. One rAF-throttled listener serves all of them.
 *
 * Two deliberate decisions:
 *
 * 1. Only *discrete* state lives in React (`isPastHero`, `isNavHidden`). Those
 *    flip rarely, so re-rendering on them is free.
 * 2. The *continuous* value — scroll progress — is written straight to a CSS
 *    custom property on <html>. The rail consumes it as
 *    `scaleY(var(--scroll-progress))`, so a smooth 60fps fill costs zero React
 *    renders. Putting progress in state would re-render the tree every frame.
 *
 * Document height is measured on mount and on a debounced resize, never per
 * frame — reading scrollHeight forces layout, and §11 forbids that.
 */
interface ScrollState {
  /** True once past 80vh — §6, the nav's cream surface threshold. */
  isPastHero: boolean;
  /** True while scrolling down past the 12px threshold — §6. */
  isNavHidden: boolean;
  /** Id of the section currently crossing the viewport middle. */
  activeId: string;
  /** That section's surface, so fixed overlays can stay legible over it. */
  activeSurface: "cream" | "black" | "red";
}

const ScrollContext = createContext<ScrollState>({
  isPastHero: false,
  isNavHidden: false,
  activeId: "",
  activeSurface: "black",
});

export const useScroll = () => useContext(ScrollContext);

/** §6 — threshold so the nav does not flicker on small scroll jitter. */
const NAV_THRESHOLD = 12;

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ScrollState>({
    isPastHero: false,
    isNavHidden: false,
    activeId: "",
    activeSurface: "black",
  });

  // Mirrors `state` so the rAF callback can compare without re-subscribing.
  const stateRef = useRef(state);

  /*
   * [S3] — the single IntersectionObserver, here rather than in the rail, so
   * the rail and the back-to-top button share one. The band is the middle 10%
   * of the viewport, so exactly one section is ever "the one you are reading".
   */
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[data-surface][id]"),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const surface = (el.dataset.surface ??
            "black") as ScrollState["activeSurface"];

          const prev = stateRef.current;
          if (prev.activeId === el.id && prev.activeSurface === surface) return;

          const next = { ...prev, activeId: el.id, activeSurface: surface };
          stateRef.current = next;
          setState(next);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    let frame = 0;
    let maxScroll = 1;
    let anchorY = window.scrollY;
    let navHidden = false;

    const measure = () => {
      maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
    };

    const update = () => {
      frame = 0;
      const y = window.scrollY;

      // Continuous — CSS only, no render.
      const progress = Math.min(1, Math.max(0, y / maxScroll));
      root.style.setProperty("--scroll-progress", progress.toFixed(4));

      // Discrete — direction with a dead zone so jitter does not toggle it.
      const delta = y - anchorY;
      if (y <= 0) {
        navHidden = false;
        anchorY = y;
      } else if (delta > NAV_THRESHOLD) {
        navHidden = true;
        anchorY = y;
      } else if (delta < -NAV_THRESHOLD) {
        navHidden = false;
        anchorY = y;
      }

      const isPastHero = y > window.innerHeight * 0.8;

      const prev = stateRef.current;
      if (prev.isPastHero !== isPastHero || prev.isNavHidden !== navHidden) {
        const next = { ...prev, isPastHero, isNavHidden: navHidden };
        stateRef.current = next;
        setState(next);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // §11 rule 4 — refresh on resize, debounced 150ms.
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        measure();
        update();
      }, 150);
    };

    measure();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      root.style.removeProperty("--scroll-progress");
    };
  }, []);

  return (
    <ScrollContext.Provider value={state}>{children}</ScrollContext.Provider>
  );
}
