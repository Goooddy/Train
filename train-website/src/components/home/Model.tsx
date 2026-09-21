"use client";

import { useEffect, useRef, useState } from "react";
import { useTier2 } from "@/components/motion/useTier2";
import { EditorialCTA } from "@/components/ui/EditorialCTA";
import { SectionShell } from "@/components/ui/SectionShell";
import type { ModelStage } from "@/data/types";
import { gsap } from "@/lib/gsap";
import { dur, ease, revealTrigger } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * §03 — the five client stages (D4). The full nine appear only on
 * /how-it-works.
 *
 * Desktop: a horizontal track, nodes evenly spaced, details in the reserved
 * panel beneath (see the [S2] rules in globals.css).
 * Mobile: the track rotates vertical, line down the left at 24px, details
 * inline beneath each node.
 *
 * The track is rendered in its *completed* state — red line drawn, nodes
 * filled yellow. Stage 6 animates it from zero; below 1024px and under reduced
 * motion it must simply be complete, because the track carries information.
 */
export function Model({ stages }: { stages: ModelStage[] }) {
  const [openSlug, setOpenSlug] = useState(stages[0]?.slug ?? "");
  const root = useRef<HTMLDivElement>(null);
  const tier2 = useTier2();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const q = gsap.utils.selector(el);
    const line = q("[data-track-line]");
    const nodes = q("[data-track-node]");

    // Below 1024px, or under reduced motion, the track is simply complete.
    if (!tier2) {
      gsap.set(line, { scaleX: 1, scaleY: 1 });
      gsap.set(nodes, { scale: 1 });
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

        // §03 — a red line draws left to right along the track over 1.4s,
        // filling each node as it passes.
        tl.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: dur.draw, ease: ease.inOut },
          0,
        ).fromTo(
          nodes,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.3,
            ease: "back.out(2)",
            stagger: dur.draw / Math.max(nodes.length, 1),
          },
          0,
        );
      }, el);
    } catch {
      gsap.set(line, { scaleX: 1, scaleY: 1 });
      gsap.set(nodes, { scale: 1 });
    }

    return () => ctx?.revert();
  }, [tier2]);

  return (
    <SectionShell id="how-train-works" surface="black" eyebrow="The TRAIN model">
      <h2 className="type-h2 max-w-[18ch]">
        One client need. One TRAIN solution.
      </h2>
      <p className="type-body-lg mt-8 max-w-[52ch] text-train-grey-300">
        Five stages, one point of contact. Here is what actually happens
        between your first message and the work going live.
      </p>

      {/* The wrapper reserves the panel space so opening a stage never moves
          the track — §11's CLS budget, and [S2]. */}
      <div ref={root} className="mt-20 lg:pb-40">
        <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
          {/*
            The track. A real element rather than a ::before, because §03 draws
            it and GSAP cannot animate a pseudo-element. Authored at full
            length: below 1024px and under reduced motion it is simply already
            drawn, because the track carries information (§11).
          */}
          <span
            aria-hidden="true"
            data-track-line
            className={cn(
              "absolute bottom-0 left-[24px] top-0 w-px origin-top bg-train-red",
              "lg:bottom-auto lg:left-0 lg:top-[5px] lg:h-px lg:w-full lg:origin-left",
            )}
          />
          {stages.map((stage) => {
            const open = openSlug === stage.slug;
            return (
              /* Deliberately not `relative`: the detail below must position
                 against the <ol>, so it spans the whole track. */
              <li key={stage.slug}>
                <button
                  type="button"
                  onClick={() => setOpenSlug(open ? "" : stage.slug)}
                  aria-expanded={open}
                  aria-controls={`stage-${stage.slug}`}
                  className="group relative block w-full cursor-pointer pl-16 text-left lg:pl-0"
                >
                  {/*
                    Node. The outer box is a fixed 16px so the dot can grow
                    when active without nudging the text below it.
                  */}
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-1 grid h-4 w-4 place-items-center lg:static lg:mb-5"
                  >
                    <span
                      data-track-node
                      className={cn(
                        "rounded-full bg-train-yellow transition-all duration-[180ms]",
                        open ? "h-4 w-4" : "h-3 w-3",
                      )}
                    />
                  </span>

                  {/*
                    Indicator sits immediately after the name, not pushed to
                    the far right of the column — out there it read as
                    belonging to the *next* stage along the track.
                  */}
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "type-eyebrow underline-offset-4 transition-colors duration-[180ms] group-hover:underline",
                        open
                          ? "text-train-yellow"
                          : "text-train-grey-300 group-hover:text-train-cream",
                      )}
                    >
                      {stage.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid h-5 w-5 shrink-0 place-items-center rounded-full border text-xs leading-none",
                        "transition-[transform,background-color,color,border-color] duration-[180ms]",
                        open
                          ? "rotate-45 border-train-yellow bg-train-yellow text-train-black"
                          : "border-train-cream/40 text-train-cream/70 group-hover:border-train-yellow group-hover:text-train-yellow",
                      )}
                    >
                      +
                    </span>
                  </span>

                  <span
                    className={cn(
                      "type-body mt-3 block transition-colors duration-[180ms]",
                      open ? "text-train-cream" : "text-train-grey-300",
                    )}
                  >
                    {stage.short}
                  </span>
                </button>

                <div
                  id={`stage-${stage.slug}`}
                  data-stage-detail
                  data-open={open ? "true" : "false"}
                  className="pl-16 lg:pl-0"
                >
                  <div>
                    <p className="type-body max-w-[70ch] pt-4 text-train-cream lg:pt-0">
                      {stage.detail}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-16">
        <EditorialCTA
          href="/how-it-works"
          label="Explore the TRAIN model"
          variant="dark"
        />
      </div>
    </SectionShell>
  );
}
