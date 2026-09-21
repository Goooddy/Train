"use client";

import type { HomeSection } from "@/data/site";
import { cn } from "@/lib/utils";
import { useScroll } from "./ScrollContext";
import { useLenis } from "./SmoothScroll";

/**
 * D3 — the train/track metaphor, and the only component that carries it. There
 * is no literal animated train graphic anywhere.
 *
 * Desktop (≥1024px): a rail in the left gutter, nine stations, a red fill that
 * grows with scroll. Mobile: a 2px bar under the nav. Homepage only.
 *
 * Cost control (§6): one IntersectionObserver for the active station, and the
 * continuous fill is driven by `--scroll-progress`, which ScrollContext writes
 * once per rAF. The fill is a CSS transform reading that variable, so a smooth
 * 60fps rail costs zero React renders. No per-frame layout reads anywhere.
 *
 * [A9] — the active dot is yellow on dark surfaces but red on cream. §6 says
 * yellow throughout; yellow on cream is 1.5:1, below the 3:1 that WCAG 2.1
 * SC 1.4.11 requires of a meaningful graphic. Red on cream is 5.9:1. The rail
 * reads the active section's own surface and re-colours itself, the same
 * mechanism as the focus ring in [A1].
 */
export function ProgressRail({ sections }: { sections: HomeSection[] }) {
  const lenis = useLenis();
  /*
   * [S3] — everything scroll-derived comes from the one orchestrator. The rail
   * used to run its own IntersectionObserver; it now shares the provider's
   * with the back-to-top button, which is what §6 asked for.
   */
  const { isNavHidden, activeId, activeSurface } = useScroll();
  const onLight = activeSurface === "cream";
  const resolvedActiveId = activeId || sections[0]?.id || "";

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      // Matches the scroll-margin-top in globals.css.
      lenis.scrollTo(el, { offset: -120 });
    } else {
      el.scrollIntoView();
    }
  };

  const lastIndex = sections.length - 1;

  return (
    <>
      {/* Desktop rail */}
      <nav
        aria-label="Section progress"
        className="fixed left-[calc(var(--gutter)/2)] top-1/2 z-40 hidden h-[320px] -translate-y-1/2 lg:block"
      >
        {/* The line itself carries no information — the buttons do. */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-y-0 left-0 w-px",
            onLight ? "bg-train-grey-700/30" : "bg-train-cream/30",
          )}
        >
          <span
            className="absolute inset-x-0 top-0 h-full origin-top bg-train-red"
            style={{ transform: "scaleY(var(--scroll-progress, 0))" }}
          />
        </span>

        <ul className="relative h-full">
          {sections.map((section, index) => {
            const active = section.id === resolvedActiveId;
            return (
              <li
                key={section.id}
                className="absolute left-0"
                style={{ top: `${(index / lastIndex) * 100}%` }}
              >
                <button
                  type="button"
                  onClick={() => goTo(section.id)}
                  aria-label={`Go to ${section.station}`}
                  aria-current={active ? "true" : undefined}
                  /* 44×44 hit area, invisible, centred on the line. */
                  className="group grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "block rounded-full transition-all duration-[180ms]",
                      active
                        ? cn(
                            "h-2.5 w-2.5",
                            onLight ? "bg-train-red" : "bg-train-yellow",
                          )
                        : cn(
                            "h-1.5 w-1.5",
                            onLight
                              ? "bg-train-grey-700/60 group-hover:bg-train-grey-700"
                              : "bg-train-cream/50 group-hover:bg-train-cream",
                          ),
                    )}
                  />
                  {/*
                    [A12] — §6 shows the active station's name permanently to
                    the right of the dot. There is no room for it: the dot sits
                    at gutter/2 (40px) and the content column starts at the
                    gutter (80px), so any name longer than ~40px printed over
                    the section text. Real clearance only exists once the
                    viewport exceeds the 1440px max-content width by enough,
                    which is about 1700px.

                    So the name is persistent only at ≥1700px, and everywhere
                    else it is revealed on hover or keyboard focus as a chip
                    with its own background, legible over any surface.
                  */}
                  <span
                    aria-hidden="true"
                    data-rail-label
                    data-active={active ? "true" : "false"}
                    data-on-light={onLight ? "true" : "false"}
                    className={cn(
                      "type-eyebrow pointer-events-none absolute left-9 whitespace-nowrap px-2 py-1",
                      // Chip colours for the hover/focus reveal. Visibility and
                      // the ≥1700px persistent state are owned by globals.css.
                      onLight
                        ? "bg-train-black text-train-cream"
                        : "bg-train-cream text-train-black",
                    )}
                  >
                    {section.station}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/*
        Mobile bar — no dots, no labels. Decorative: the page itself conveys
        position, so this is not announced.

        Always visible, and it tracks the nav rather than hiding with it: it
        rides at the very top of the viewport while the nav is away, and slides
        back down to sit directly under the nav when the nav returns on scroll
        up. Same duration and easing as the nav so the two move as one.
      */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-x-0 z-40 h-0.5 bg-train-grey-300/30 lg:hidden",
          "transition-transform duration-[180ms] ease-out",
          isNavHidden && "-translate-y-[var(--nav-h)]",
        )}
        style={{ top: "var(--nav-h)" }}
      >
        <span
          className="block h-full origin-left bg-train-red"
          style={{ transform: "scaleX(var(--scroll-progress, 0))" }}
        />
      </div>
    </>
  );
}
