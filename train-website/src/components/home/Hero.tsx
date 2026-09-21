"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { EditorialCTA } from "@/components/ui/EditorialCTA";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { gsap } from "@/lib/gsap";
import { ease } from "@/lib/motion";

/**
 * §01 — full viewport height using 100svh. Never 100vh: iOS Safari puts that
 * under the browser chrome.
 *
 * This is the LCP element, so the background image is priority-loaded and
 * nothing else above the fold competes with it. §11 rule 5 — this entrance is
 * the only thing allowed to animate above the fold, and no scroll-triggered
 * effect may delay it.
 *
 * The headline masks up as one block rather than as three separately staggered
 * lines: §01 assumes a fixed three-line break, but the headline now wraps to
 * four or five lines depending on viewport ([A8]), and splitting live line
 * boxes to mask them individually is fragile enough to risk the LCP element.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const q = gsap.utils.selector(el);
    const headline = q("[data-hero-headline]");
    const image = q("[data-hero-image]");
    const items = q("[data-hero-item]");
    const indicator = q("[data-scroll-indicator]");

    if (reduced) {
      gsap.set([...headline, ...items, ...indicator], { opacity: 1, y: 0 });
      gsap.set(image, { scale: 1 });
      return;
    }

    let ctx: ReturnType<typeof gsap.context> | undefined;

    try {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: ease.out } });

        tl.fromTo(image, { scale: 1.08 }, { scale: 1, duration: 1.6 }, 0)
          .fromTo(
            headline,
            { yPercent: 100 },
            { yPercent: 0, duration: 0.9 },
            0.1,
          )
          .fromTo(
            items,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.09 },
            0.45,
          );

        // §01 — the indicator fades over the first 120px of scroll.
        gsap.to(indicator, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=120",
            scrub: true,
          },
        });
      }, el);
    } catch {
      gsap.set([...headline, ...items, ...indicator], { opacity: 1, y: 0 });
    }

    return () => ctx?.revert();
  }, [reduced]);

  return (
    <section
      ref={root}
      id="hero"
      data-surface="black"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-train-black text-train-cream"
    >
      {/* Full-bleed grayscale photograph at 35% over black. */}
      <div aria-hidden="true" className="absolute inset-0 opacity-35">
        <div data-hero-image className="h-full w-full">
          <PlaceholderImage
            seed="train-hero"
            alt=""
            width={1920}
            height={1280}
            priority
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="shell relative py-[var(--section-y)]">
        {/*
          The mask. Authored without overflow hidden in CSS so that with
          JavaScript disabled the headline simply sits in place.
        */}
        <span className="block overflow-hidden pb-[0.12em]">
          <h1 data-hero-headline className="type-hero max-w-[15ch]">
            Ideas are everywhere. Execution is the difference.
          </h1>
        </span>

        <p
          data-hero-item
          className="type-body-lg mt-10 max-w-[52ch] text-train-grey-300"
        >
          Creative, digital, marketing and business support — coordinated
          around what your business actually needs.
        </p>

        <div data-hero-item className="mt-14">
          <EditorialCTA
            href="/start"
            label="Start a conversation"
            variant="dark"
          />
        </div>

        {/*
          §01's yellow track line was here. Removed on client review — see
          [A19]. D3 already assigns the track metaphor to the ProgressRail and
          rules out any other literal track graphic, so the rule was doing that
          job twice; below the content it read as a stray divider across the
          photograph. It was decorative and aria-hidden, so nothing was lost.
        */}
      </div>

      {/* Scroll indicator, bottom-left. */}
      <div
        aria-hidden="true"
        data-scroll-indicator
        className="absolute bottom-8 left-[var(--gutter)] flex items-center gap-3"
      >
        <span className="type-eyebrow text-train-grey-300">Scroll</span>
        <span className="block h-px w-12 bg-train-grey-300" />
      </div>
    </section>
  );
}
