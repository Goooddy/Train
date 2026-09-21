"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

/**
 * The live Lenis instance, or `null` when smooth scrolling is off (reduced
 * motion, or before mount). Callers must handle null — that is the reduced
 * motion path, not an error.
 */
export const useLenis = () => useContext(LenisContext);

/**
 * §6 — Lenis provider.
 *
 * Destroyed *entirely* under `prefers-reduced-motion: reduce`, falling back to
 * native scrolling. Lenis has its own `respectReducedMotion` flag, but that
 * only removes the smoothing while keeping scroll on the main thread; §6 asks
 * for the instance to be gone, which is both stricter and cheaper.
 *
 * [S5] — the preference can change while the page is open, so this subscribes
 * to the media query rather than reading it once on mount.
 *
 * `anchors: true` lets Lenis own in-page links, so EditorialCTA can stay plain
 * markup. With Lenis destroyed those links fall back to native anchor
 * behaviour and the `scroll-margin-top` in globals.css keeps the heading clear
 * of the fixed nav.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let instance: Lenis | null = null;

    const start = () => {
      if (instance) return;
      instance = new Lenis({
        lerp: 0.1,
        duration: 1.2,
        anchors: true,
        autoRaf: true,
        // We handle the preference by destroying outright, so Lenis must not
        // also try to handle it.
        respectReducedMotion: false,
      });
      // Lenis drives the scroll position, so ScrollTrigger has to be told when
      // it moves. Without this every trigger fires against a stale position.
      instance.on("scroll", ScrollTrigger.update);
      setLenis(instance);
    };

    const stop = () => {
      instance?.off("scroll", ScrollTrigger.update);
      instance?.destroy();
      instance = null;
      setLenis(null);
    };

    const sync = () => (mq.matches ? stop() : start());

    sync();
    mq.addEventListener("change", sync);

    return () => {
      mq.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
