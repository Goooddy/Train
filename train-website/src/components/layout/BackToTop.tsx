"use client";

import { ArrowUp } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useScroll } from "./ScrollContext";
import { useLenis } from "./SmoothScroll";

/**
 * Back to top, plus reset-on-refresh.
 *
 * Reload behaviour: browsers restore the previous scroll position on refresh.
 * A long single-page narrative should start at the beginning instead, so this
 * switches restoration to manual and returns to the top — but *only* for an
 * actual reload. §6 requires browser back-navigation scroll restoration to
 * keep working, so `back_forward` navigations are left alone, and Next's own
 * restoration for client-side navigation is untouched.
 *
 * The button sits bottom-right, clear of the ProgressRail in the left gutter.
 * It appears once past the hero, which is also when the rail becomes useful.
 */
export function BackToTop() {
  const { isPastHero, activeSurface } = useScroll();
  const lenis = useLenis();
  // Invert against whatever it is sitting over: a black button on a black
  // section left only the arrow visible.
  const onDark = activeSurface !== "cream";

  useEffect(() => {
    if (!("scrollRestoration" in history)) return;

    const entry = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;

    // Leave back/forward restoration exactly as it was.
    if (entry?.type === "back_forward") return;

    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
      history.scrollRestoration = previous;
    };
  }, []);

  const toTop = () => {
    // Lenis owns smooth scrolling when it is alive; native scroll is the
    // reduced-motion path, where an instant jump is correct anyway.
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0 });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      // Hidden from assistive tech while off-screen, so it is not a focus trap
      // sitting in the tab order above the fold.
      aria-hidden={!isPastHero}
      tabIndex={isPastHero ? 0 : -1}
      /* Drives the focus ring [A1]: yellow on the dark button, black on the
         light one. Note this is the button's OWN surface, which is the
         inverse of the section behind it. */
      data-surface={onDark ? "cream" : "black"}
      className={cn(
        "fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center lg:bottom-10 lg:right-10",
        "transition-[opacity,transform,background-color,color] duration-[180ms]",
        onDark
          ? // Over black or red: cream button, 17.5:1 and 5.9:1.
            "bg-train-cream text-train-black hover:bg-train-yellow"
          : // Over cream: black button, 17.5:1.
            "bg-train-black text-train-cream hover:bg-train-red",
        isPastHero
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp aria-hidden="true" className="h-5 w-5" />
    </button>
  );
}
