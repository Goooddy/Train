import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { clientStages, engineStages } from "@/data/model-stages";
import { missionImage } from "@/data/mission";
import { networkDiagramLabel, networkFlow } from "@/data/network";
import { reasons } from "@/data/why-train";
import { reducedMotionUser, setMediaMatcher } from "./setup";

/**
 * §11 / Definition of Done — "All motion disabled under prefers-reduced-motion,
 * with nothing hidden or mid-state."
 *
 * The second half is the one that matters. A motion-heavy site fails this by
 * leaving elements at the *start* of an animation that never runs: opacity 0,
 * translated off, or an SVG stroke dashed out of view. These tests assert the
 * finished state, not merely that no tween was created.
 *
 * Modules are reset between tests because the media-query hooks memoise their
 * MediaQueryList on first read.
 */
describe("under prefers-reduced-motion: reduce", () => {
  beforeEach(() => {
    vi.resetModules();
    setMediaMatcher(reducedMotionUser);
  });

  it("Reveal leaves its content fully visible and untranslated", async () => {
    const { Reveal } = await import("@/components/motion/Reveal");

    const { container } = render(<Reveal>Four reasons this works better.</Reveal>);
    const el = container.querySelector<HTMLElement>("[data-reveal]");

    expect(el).not.toBeNull();
    expect(el!.style.opacity).toBe("1");
    expect(el!.style.transform ?? "").not.toMatch(/translate\(0px,\s*24px\)/);
    expect(el!.textContent).toContain("Four reasons");
  });

  it("a masked Reveal is not left sitting below its clip", async () => {
    const { Reveal } = await import("@/components/motion/Reveal");

    const { container } = render(
      <Reveal mask>What are you trying to build?</Reveal>,
    );
    const el = container.querySelector<HTMLElement>("[data-reveal]");

    expect(el!.style.opacity).toBe("1");
    // yPercent 100 would park the headline out of sight behind the mask.
    expect(el!.style.transform ?? "").not.toMatch(/translate\(0%,\s*100%\)/);
  });

  it("every §07 row is visible, not just the first", async () => {
    const { WhyTrain } = await import("@/components/home/WhyTrain");

    const { container } = render(<WhyTrain reasons={reasons} />);
    const rows = container.querySelectorAll<HTMLElement>("[data-reveal]");

    expect(rows).toHaveLength(reasons.length);
    for (const row of rows) {
      expect(row.style.opacity).toBe("1");
    }
  });

  it("§03's track is fully drawn rather than scaled to zero", async () => {
    const { Model } = await import("@/components/home/Model");

    const { container } = render(<Model stages={clientStages} />);
    const line = container.querySelector<HTMLElement>("[data-track-line]");
    const nodes = container.querySelectorAll<HTMLElement>("[data-track-node]");

    expect(line).not.toBeNull();
    expect(line!.style.transform ?? "").not.toMatch(/scale(X)?\(0/);
    expect(nodes.length).toBe(clientStages.length);
    for (const node of nodes) {
      expect(node.style.transform ?? "").not.toMatch(/scale\(0/);
    }
  });

  it("§05's diagram carries no stroke dash, so it renders complete", async () => {
    const { Network } = await import("@/components/home/Network");

    const { container } = render(
      <Network flow={networkFlow} diagramLabel={networkDiagramLabel} />,
    );
    const paths = container.querySelectorAll<SVGPathElement>("[data-net-stage]");

    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) {
      // A dash offset is what hides an undrawn line. It must never be applied.
      expect(path.style.strokeDasharray).toBe("");
      expect(path.style.strokeDashoffset).toBe("");
    }
  });

  it("§08's engine loop carries no stroke dash", async () => {
    const { Mission } = await import("@/components/home/Mission");

    const { container } = render(
      <Mission stages={engineStages} image={missionImage} />,
    );
    const loop = container.querySelector<SVGCircleElement>("[data-engine-loop]");
    const nodes = container.querySelectorAll<SVGElement>("[data-engine-node]");

    expect(loop).not.toBeNull();
    expect(loop!.style.strokeDasharray).toBe("");
    expect(loop!.style.strokeDashoffset).toBe("");
    for (const node of nodes) {
      expect(node.style.transform ?? "").not.toMatch(/scale\(0/);
    }
  });

  it("the §05 diagram keeps its spoken description", async () => {
    const { Network } = await import("@/components/home/Network");

    const { getByRole } = render(
      <Network flow={networkFlow} diagramLabel={networkDiagramLabel} />,
    );

    // §13 — informative SVGs describe the relationship in words.
    expect(getByRole("img").getAttribute("aria-label")).toContain(
      "coordinated delivery",
    );
  });
});
