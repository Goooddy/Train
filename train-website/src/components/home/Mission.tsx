"use client";

import { useEffect, useRef } from "react";
import { useTier2 } from "@/components/motion/useTier2";
import { EditorialCTA } from "@/components/ui/EditorialCTA";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SectionShell } from "@/components/ui/SectionShell";
import type { ImageRef, ModelStage } from "@/data/types";
import { gsap } from "@/lib/gsap";
import { ease, revealTrigger } from "@/lib/motion";

/**
 * §08 — the register shifts. Larger type, more whitespace, one photograph
 * rather than a diagram grid.
 *
 * The engine loop is drawn as a closed circle, not a line. That is what makes
 * the headline literal rather than rhetorical: client work funds the business,
 * which funds the mission, which brings more work back in.
 *
 * Rendered complete. Stage 6 draws it once on entering view; under reduced
 * motion and with JavaScript disabled it is simply already drawn.
 */
/*
 * The viewBox is wider than it is tall to leave room for the side labels.
 * Build and Reinvest sit at the east and west points, so their names go
 * *beside* their dots rather than above them — stacked above, they printed
 * across the circle's own stroke.
 */
const VIEW_W = 440;
const VIEW_H = 360;
const CENTRE_X = VIEW_W / 2;
const CENTRE_Y = VIEW_H / 2;
const RADIUS = 120;

function pointOnCircle(index: number, total: number) {
  // Start at the top and go clockwise.
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTRE_X + RADIUS * Math.cos(angle),
    y: CENTRE_Y + RADIUS * Math.sin(angle),
  };
}

/**
 * Place a label relative to its node, derived from where the node actually
 * sits rather than from its index, so this keeps working if the number of
 * engine stages ever changes.
 */
function labelPlacement(x: number, y: number) {
  const GAP = 18;

  if (x > CENTRE_X + 1) {
    return { x: x + GAP, y, anchor: "start", baseline: "middle" } as const;
  }
  if (x < CENTRE_X - 1) {
    return { x: x - GAP, y, anchor: "end", baseline: "middle" } as const;
  }
  // Top and bottom nodes keep their label stacked clear of the stroke.
  const above = y < CENTRE_Y;
  return {
    x,
    y: above ? y - 24 : y + 30,
    anchor: "middle",
    baseline: "auto",
  } as const;
}

export function Mission({
  stages,
  image,
}: {
  stages: ModelStage[];
  image: ImageRef;
}) {
  const loopLabel = `A closed loop: ${stages
    .map((s) => s.name)
    .join(", then ")}, and back to ${stages[0]?.name}.`;

  const root = useRef<HTMLDivElement>(null);
  const tier2 = useTier2();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const loop = el.querySelector<SVGCircleElement>("[data-engine-loop]");
    const nodes = gsap.utils.toArray<SVGElement>(
      el.querySelectorAll("[data-engine-node]"),
    );

    // §11 — below 1024px and under reduced motion the loop renders complete.
    // The dash properties are never authored in CSS, only applied here, so the
    // untouched SVG is a finished circle.
    if (!tier2 || !loop) {
      gsap.set(nodes, { scale: 1, opacity: 1 });
      return;
    }

    let ctx: ReturnType<typeof gsap.context> | undefined;
    try {
      const length = loop.getTotalLength();

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: revealTrigger.start,
            toggleActions: revealTrigger.toggleActions,
          },
        });

        // §08 — draws once on entering view over 1.2s, then holds.
        tl.fromTo(
          loop,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 1.2, ease: ease.inOut },
          0,
        ).fromTo(
          nodes,
          { scale: 0, transformOrigin: "center" },
          { scale: 1, duration: 0.3, ease: "back.out(2)", stagger: 0.3 },
          0.2,
        );
      }, el);
    } catch {
      gsap.set(nodes, { scale: 1, opacity: 1 });
    }

    return () => ctx?.revert();
  }, [tier2]);

  return (
    <SectionShell id="mission" surface="cream">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <h2 className="type-h2 max-w-[16ch]">
            Clients fund the business. The business funds the mission.
          </h2>
          <p className="type-body-lg mt-10 max-w-[52ch] text-train-grey-700">
            TRAIN is building towards more than client work — skills,
            apprenticeships and community initiatives that give people a route
            into this industry. Commercial work is what makes that possible.
          </p>

          <div className="mt-16">
            <EditorialCTA href="/mission" label="Discover the mission" />
          </div>
        </div>

        <div ref={root}>
          {/* Desktop — the closed circle. */}
          <div role="img" aria-label={loopLabel}>
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              className="mx-auto hidden h-auto w-full max-w-[440px] text-train-black md:block"
              aria-hidden="true"
            >
              <circle
                cx={CENTRE_X}
                cy={CENTRE_Y}
                r={RADIUS}
                fill="none"
                stroke="var(--train-red)"
                strokeWidth="1.5"
                data-engine-loop
              />
              {stages.map((stage, i) => {
                const { x, y } = pointOnCircle(i, stages.length);
                const label = labelPlacement(x, y);
                return (
                  <g key={stage.slug}>
                    <circle
                      data-engine-node
                      cx={x}
                      cy={y}
                      r="7"
                      fill="var(--train-red)"
                      style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    />
                    <text
                      x={label.x}
                      y={label.y}
                      fill="currentColor"
                      fontSize="13"
                      fontWeight={600}
                      textAnchor={label.anchor}
                      dominantBaseline={label.baseline}
                      style={{
                        fontFamily:
                          "var(--font-montserrat), system-ui, sans-serif",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                      }}
                    >
                      {stage.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Mobile — the same cycle, compact and vertical. */}
            <ol className="flex flex-col gap-3 md:hidden" aria-hidden="true">
              {stages.map((stage, i) => (
                <li key={stage.slug} className="flex items-center gap-4">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-train-red" />
                  <span className="type-eyebrow">{stage.name}</span>
                  {i === stages.length - 1 ? (
                    <span className="type-eyebrow text-train-grey-700">
                      ↻ back to {stages[0]?.name}
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-12">
            <PlaceholderImage
              seed={image.seed}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
