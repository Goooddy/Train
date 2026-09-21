"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { dur, ease, revealTrigger } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./useReducedMotion";

/**
 * §11 Tier 1 — the reveal. Transform and opacity only.
 *
 * This component is the ONLY place `data-reveal` may be emitted. The CSS
 * contract hides reveal targets as soon as JavaScript is present, so an
 * element carrying that attribute without this component to animate it is
 * invisible forever. Keeping the attribute and the animation in one component
 * makes that impossible. See [A16].
 *
 * Three safety properties:
 * - Reduced motion sets the final state immediately, never a mid-state.
 * - The animation is wrapped so any failure still lands on opacity 1 rather
 *   than leaving the content hidden.
 * - `will-change` is set as the tween starts and cleared when it ends (§11
 *   rule 3), never left in the stylesheet.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  mask = false,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Travel distance in px. §07 uses 24. Ignored when `mask`. */
  y?: number;
  /**
   * Masked rise: the element slides up from behind a clipped edge rather than
   * fading. §09's close is specified this way and it is the only motion there.
   */
  mask?: boolean;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const settle = () =>
      gsap.set(el, { opacity: 1, y: 0, yPercent: 0, clearProps: "willChange" });

    if (reduced) {
      // §11 — nothing hidden, nothing mid-animation.
      settle();
      return;
    }

    let ctx: ReturnType<typeof gsap.context> | undefined;

    try {
      ctx = gsap.context(() => {
        const from = mask
          ? { opacity: 1, yPercent: 100 }
          : { opacity: 0, y };
        const to = mask ? { yPercent: 0 } : { opacity: 1, y: 0 };

        gsap.set(el, from);
        gsap.to(el, {
          ...to,
          duration: dur.slow,
          ease: ease.out,
          delay,
          scrollTrigger: {
            trigger: el,
            // §11 rule 1 — fires at 75% viewport height and plays once.
            start: revealTrigger.start,
            toggleActions: revealTrigger.toggleActions,
          },
          onStart: () => {
            el.style.willChange = "transform, opacity";
          },
          onComplete: () => {
            el.style.willChange = "";
          },
        });
      }, el);
    } catch {
      // Never leave content hidden because motion failed.
      settle();
    }

    return () => ctx?.revert();
  }, [reduced, delay, y, mask]);

  const node = (
    <Tag ref={ref as React.Ref<never>} data-reveal className={cn(className)}>
      {children}
    </Tag>
  );

  // The clip lives on a wrapper, not the animated element, so that with
  // JavaScript disabled the content is simply in place and unclipped.
  return mask ? (
    <span className="block overflow-hidden pb-[0.12em]">{node}</span>
  ) : (
    node
  );
}
