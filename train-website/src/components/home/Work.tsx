"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useTier2 } from "@/components/motion/useTier2";
import { EditorialCTA } from "@/components/ui/EditorialCTA";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SectionShell } from "@/components/ui/SectionShell";
import type { Capability, CaseStudy } from "@/data/types";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * §06 — the conversion section. An editorial stack, deliberately not a uniform
 * grid: odd items image-left, even reversed.
 *
 * §13 — capability tags carry text, because colour is never the only carrier
 * of meaning.
 *
 * The parallax container is here; the scrub is added in Stage 6 and is off
 * entirely below 1024px (§11 rule 6 — no parallax on mobile, ever).
 */
export function Work({
  caseStudies,
  capabilityBySlug,
}: {
  caseStudies: CaseStudy[];
  capabilityBySlug: Record<string, Capability>;
}) {
  const root = useRef<HTMLUListElement>(null);
  const tier2 = useTier2();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const images = gsap.utils.toArray<HTMLElement>(
      el.querySelectorAll("[data-parallax-image]"),
    );

    // §11 rule 6 — no parallax on mobile, ever. Off entirely below 1024px and
    // under reduced motion; the image simply sits at its natural position.
    if (!tier2) {
      gsap.set(images, { scale: 1, yPercent: 0 });
      return;
    }

    let ctx: ReturnType<typeof gsap.context> | undefined;
    try {
      ctx = gsap.context(() => {
        images.forEach((image) => {
          // ~40px of travel inside an overflow-hidden frame. Transform only.
          gsap.fromTo(
            image,
            { scale: 1.05, yPercent: -2 },
            {
              yPercent: 2,
              ease: "none",
              scrollTrigger: {
                trigger: image.parentElement ?? image,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      }, el);
    } catch {
      gsap.set(images, { scale: 1, yPercent: 0 });
    }

    return () => ctx?.revert();
  }, [tier2]);

  return (
    <SectionShell id="work" surface="cream">
      <h2 className="type-h2 max-w-[18ch]">Ideas we’ve helped become real.</h2>
      <p className="type-body-lg mt-8 max-w-[52ch] text-train-grey-700">
        Every project starts as a problem someone could not solve alone.
      </p>

      <ul ref={root} className="mt-20 flex flex-col gap-24">
        {caseStudies.map((study, index) => {
          const reversed = index % 2 === 1;
          return (
            <li key={study.slug}>
              <Link
                href={`/work/${study.slug}`}
                className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  data-parallax-container
                  className={cn(
                    "overflow-hidden",
                    reversed && "lg:order-2",
                  )}
                >
                  <div data-parallax-image>
                    <PlaceholderImage
                      seed={study.heroImage.seed}
                      alt={study.heroImage.alt}
                      width={study.heroImage.width}
                      height={study.heroImage.height}
                      sizes="(max-width: 1023px) 100vw, 50vw"
                      className={cn(
                        "w-full transition-transform duration-[400ms] ease-out",
                        "group-hover:scale-[1.03]",
                      )}
                    />
                  </div>
                </div>

                <div>
                  <p className="type-eyebrow text-train-grey-700">
                    {study.client}
                  </p>

                  <h3 className="type-h3 relative mt-4 max-w-[20ch]">
                    <span className="relative inline">
                      {study.title}
                      {/* Yellow rule draws under the title on hover. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-2 left-0 h-0.5 w-full origin-left scale-x-0 bg-train-yellow",
                          "transition-transform duration-[400ms] ease-out",
                          "group-hover:scale-x-100",
                          "[@media(hover:none)]:scale-x-100",
                        )}
                      />
                    </span>
                  </h3>

                  <p className="type-body-lg mt-6 max-w-[42ch] text-train-grey-700">
                    {study.outcomeLine}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {study.capabilities.map((slug) => (
                      <li
                        key={slug}
                        className="type-eyebrow border border-train-grey-300 px-3 py-2 text-train-grey-700"
                      >
                        {capabilityBySlug[slug]?.name ?? slug}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-20">
        <EditorialCTA href="/work" label="View our work" />
      </div>
    </SectionShell>
  );
}
