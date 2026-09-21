"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/components/motion/useReducedMotion";
import { EditorialCTA } from "@/components/ui/EditorialCTA";
import { SectionShell } from "@/components/ui/SectionShell";
import { gsap } from "@/lib/gsap";
import { ease, revealTrigger } from "@/lib/motion";

/**
 * §02 — deliberately sparse. Headline left, supporting paragraph right and
 * offset 120px lower at desktop for asymmetry; stacked and un-offset on mobile.
 *
 * The attention mechanism is a yellow block behind the word "Execution", with
 * that word flipping to black. Rendered here in its *completed* state: black
 * on yellow (12.1:1) with "usually is." in red on cream (5.9:1, added to the
 * approved pairings by [A4]). Stage 6 animates the wipe; the finished state is
 * what ships without script and under reduced motion.
 */
export function Problem() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const wipe = el.querySelector("[data-problem-wipe]");
    const word = el.querySelector("[data-problem-word]");
    if (!wipe || !word) return;

    // Reduced motion: the finished state, which is what the markup already is.
    if (reduced) {
      gsap.set(wipe, { scaleX: 1 });
      gsap.set(word, { color: "var(--train-black)" });
      return;
    }

    let ctx: ReturnType<typeof gsap.context> | undefined;
    try {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: revealTrigger.start,
            toggleActions: revealTrigger.toggleActions,
          },
        });

        // §02 — the block wipes horizontally behind the word over 500ms, then
        // the text colour flips. One effect, high impact.
        tl.fromTo(
          wipe,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: ease.inOut },
        ).fromTo(
          word,
          { color: "var(--train-red)" },
          { color: "var(--train-black)", duration: 0.2 },
          0.35,
        );
      }, el);
    } catch {
      gsap.set(wipe, { scaleX: 1 });
    }

    return () => ctx?.revert();
  }, [reduced]);

  return (
    <SectionShell id="the-problem" surface="cream">
      <div ref={root} className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <h2 className="type-h2">
          <span className="block">Your idea isn’t the problem.</span>
          <span className="block text-train-red">
            {/*
              The yellow block is a separate layer behind the word so it can be
              wiped. Authored in its FINISHED state — block at full width, word
              already black — so with JavaScript disabled the line reads at
              approved contrast (black on yellow, 12.1:1) rather than mid-wipe.
            */}
            <span
              data-problem-word
              className="relative inline-block px-2 text-train-black"
            >
              <span
                aria-hidden="true"
                data-problem-wipe
                className="absolute inset-0 origin-left bg-train-yellow"
              />
              <span className="relative">Execution</span>
            </span>{" "}
            usually is.
          </span>
        </h2>

        <div className="lg:pt-[120px]">
          <p className="type-body-lg max-w-[52ch] text-train-grey-700">
            A great product can still struggle when its brand, website,
            content, marketing and systems aren’t working together. TRAIN
            brings the right capabilities together to close that gap.
          </p>
          <div className="mt-12">
            {/* D6 — this means "keep reading". */}
            <EditorialCTA
              href="#how-train-works"
              label="See how TRAIN solves it"
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
