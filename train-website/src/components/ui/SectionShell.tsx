import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

export type Surface = "cream" | "black" | "red";

/**
 * §6 — enforces vertical rhythm, section id, max-width, gutters and surface.
 * Every homepage section uses it so spacing cannot drift.
 *
 * It also writes `data-surface`, which is what switches the focus ring between
 * black and yellow (see [A1] in globals.css). Any section that bypasses this
 * component gets the wrong ring, so don't bypass it.
 */
const surfaceClasses: Record<Surface, string> = {
  cream: "bg-train-cream text-train-black",
  black: "bg-train-black text-train-cream",
  red: "bg-train-red text-train-cream",
};

export function SectionShell({
  id,
  surface,
  eyebrow,
  children,
  className,
  innerClassName,
  bleed = false,
}: {
  id: string;
  surface: Surface;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  /** Applied to the inner max-width container. Ignored when `bleed`. */
  innerClassName?: string;
  /**
   * §4 — full-bleed sections break the grid deliberately; text never does.
   * Set this only when the section manages its own horizontal padding.
   */
  bleed?: boolean;
}) {
  const content = (
    <>
      {eyebrow ? <Eyebrow className="mb-6">{eyebrow}</Eyebrow> : null}
      {children}
    </>
  );

  return (
    <section
      id={id}
      data-surface={surface}
      className={cn(
        "py-[var(--section-y)]",
        surfaceClasses[surface],
        className,
      )}
    >
      {bleed ? (
        content
      ) : (
        <div className={cn("shell", innerClassName)}>{content}</div>
      )}
    </section>
  );
}
