"use client";

import { useEffect, useRef } from "react";
import { useTier2 } from "@/components/motion/useTier2";
import { EditorialCTA } from "@/components/ui/EditorialCTA";
import { SectionShell } from "@/components/ui/SectionShell";
import type { NetworkNode } from "@/data/network";
import { gsap } from "@/lib/gsap";
import { ease, revealTrigger } from "@/lib/motion";

/**
 * §05 — the argument's turning point, and the only red section before the
 * close.
 *
 * The coordination diagram is informative, not decorative, so it carries
 * role="img" and an aria-label describing the relationship in words (§13).
 *
 * [S4] — two SVGs toggled by CSS, not one scaled down. §07 forbids shrinking
 * the desktop diagram because the labels become unreadable, and swapping the
 * viewBox via matchMedia would fail with JavaScript disabled.
 *
 * Everything is cream on red (5.9:1). Yellow on red is 4.1:1 and is on §4's
 * forbidden list, so the diagram never uses it.
 */
const STROKE = "rgb(244 241 234 / 0.55)";

function Label({
  x,
  y,
  children,
  size = 13,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fill="currentColor"
      fontSize={size}
      fontWeight={600}
      textAnchor="middle"
      dominantBaseline="middle"
      style={{
        fontFamily: "var(--font-montserrat), system-ui, sans-serif",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </text>
  );
}

export function Network({
  flow,
  diagramLabel,
}: {
  flow: {
    source: NetworkNode;
    hub: NetworkNode;
    branches: NetworkNode[];
    destination: NetworkNode;
  };
  diagramLabel: string;
}) {
  const branchY = [50, 135, 220, 305];
  const mobileBranchY = [168, 228, 288, 348];

  const root = useRef<HTMLDivElement>(null);
  const tier2 = useTier2();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // Desktop diagram only — the mobile one is a separate SVG [S4] and Tier 2
    // does not run at its widths anyway.
    const paths = (stage: string) =>
      gsap.utils.toArray<SVGPathElement>(
        el.querySelectorAll(`[data-net-stage="${stage}"]`),
      );
    const nodes = gsap.utils.toArray<SVGElement>(
      el.querySelectorAll("[data-net-node]"),
    );

    // §11 — below 1024px and under reduced motion this renders complete and
    // static. Dash properties are never authored in CSS, only applied here,
    // so an untouched diagram is a finished diagram.
    if (!tier2) {
      gsap.set(nodes, { opacity: 1, scale: 1 });
      return;
    }

    let ctx: ReturnType<typeof gsap.context> | undefined;
    try {
      const all = [...paths("1"), ...paths("2"), ...paths("3")];
      const lengths = new Map(all.map((p) => [p, p.getTotalLength()]));

      ctx = gsap.context(() => {
        const draw = (targets: SVGPathElement[], duration: number) =>
          gsap.fromTo(
            targets,
            {
              strokeDasharray: (_i: number, t: SVGPathElement) =>
                lengths.get(t) ?? 0,
              strokeDashoffset: (_i: number, t: SVGPathElement) =>
                lengths.get(t) ?? 0,
            },
            { strokeDashoffset: 0, duration, ease: ease.inOut },
          );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: revealTrigger.start,
            toggleActions: revealTrigger.toggleActions,
          },
        });

        // §05 — client to TRAIN, then TRAIN fans out to all four at once,
        // then all four converge. Nodes scale up as their line arrives.
        tl.add(draw(paths("1"), 0.4), 0)
          .add(draw(paths("2"), 0.6), 0.4)
          .add(draw(paths("3"), 0.6), 1.0)
          .fromTo(
            nodes,
            { scale: 0.8, opacity: 0.4, transformOrigin: "center" },
            { scale: 1, opacity: 1, duration: 0.4, stagger: 0.12 },
            0.2,
          );
      }, el);
    } catch {
      gsap.set(nodes, { opacity: 1, scale: 1 });
    }

    return () => ctx?.revert();
  }, [tier2]);

  return (
    <SectionShell id="the-network" surface="red">
      <div className="max-w-[52ch]">
        <h2 className="type-h2">You don’t need five different people.</h2>
        <p className="type-body-lg mt-8">
          TRAIN coordinates a specialist network around each project, giving
          clients one point of contact from brief to delivery.
        </p>
        <p className="type-body-lg mt-6 text-train-cream/80">
          You brief us once. We handle the briefing, scheduling and quality of
          everyone else.
        </p>
      </div>

      <div ref={root} className="mt-20" role="img" aria-label={diagramLabel}>
        {/* Desktop — horizontal flow. */}
        <svg
          viewBox="0 0 1110 355"
          className="hidden h-auto w-full text-train-cream md:block"
          aria-hidden="true"
        >
          <g stroke={STROKE} strokeWidth="1.5" fill="none">
            <path data-net-stage="1" d="M160 170 H250" />
            {branchY.map((y) => (
              <path
                key={`out-${y}`}
                data-net-stage="2"
                d={`M400 170 C450 170, 450 ${y}, 500 ${y}`}
              />
            ))}
            {branchY.map((y) => (
              <path
                key={`in-${y}`}
                data-net-stage="3"
                d={`M720 ${y} C800 ${y}, 790 170, 850 170`}
              />
            ))}
          </g>

          <g fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect data-net-node x="10" y="145" width="150" height="50" />
            <rect data-net-node x="250" y="145" width="150" height="50" />
            {branchY.map((y) => (
              <rect
                key={y}
                data-net-node
                x="500"
                y={y - 25}
                width="220"
                height="50"
              />
            ))}
            <rect data-net-node x="850" y="145" width="250" height="50" />
          </g>

          <Label x={85} y={171}>
            {flow.source.label}
          </Label>
          <Label x={325} y={171} size={15}>
            {flow.hub.label}
          </Label>
          {flow.branches.map((branch, i) => (
            <Label key={branch.id} x={610} y={branchY[i] + 1}>
              {branch.label}
            </Label>
          ))}
          <Label x={975} y={171}>
            {flow.destination.label}
          </Label>
        </svg>

        {/* Mobile — the same relationship, drawn vertically. */}
        <svg
          viewBox="0 0 360 500"
          className="mx-auto h-auto w-full max-w-[360px] text-train-cream md:hidden"
          aria-hidden="true"
        >
          <g stroke={STROKE} strokeWidth="1.5" fill="none">
            <path d="M180 48 V84" />
            <path d="M180 132 V168" />
            {/* Bracket grouping the four as parallel, not sequential. */}
            <path d="M12 180 V372" />
            {mobileBranchY.map((y) => (
              <path key={`tick-${y}`} d={`M12 ${y + 24} H20`} />
            ))}
            <path d="M180 396 V432" />
          </g>

          <g fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="105" y="0" width="150" height="48" />
            <rect x="105" y="84" width="150" height="48" />
            {mobileBranchY.map((y) => (
              <rect key={y} x="20" y={y} width="320" height="48" />
            ))}
            <rect x="45" y="432" width="270" height="48" />
          </g>

          <Label x={180} y={25}>
            {flow.source.label}
          </Label>
          <Label x={180} y={109} size={15}>
            {flow.hub.label}
          </Label>
          {flow.branches.map((branch, i) => (
            <Label key={branch.id} x={180} y={mobileBranchY[i] + 25}>
              {branch.label}
            </Label>
          ))}
          <Label x={180} y={457}>
            {flow.destination.label}
          </Label>
        </svg>
      </div>

      <div className="mt-16">
        <EditorialCTA
          href="/how-it-works#network"
          label="Meet the network"
          variant="dark"
        />
      </div>
    </SectionShell>
  );
}
