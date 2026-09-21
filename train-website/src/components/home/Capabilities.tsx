import Link from "next/link";
import { EditorialCTA } from "@/components/ui/EditorialCTA";
import { SectionShell } from "@/components/ui/SectionShell";
import type { Capability } from "@/data/types";
import { cn } from "@/lib/utils";

/**
 * §04 — four capability cards, 2×2 at desktop, single column on mobile.
 *
 * Card heights are equal via CSS grid, never JavaScript measurement.
 *
 * [A3] — the 01–04 numerals are decoration, not text: grey-300 at rest on
 * cream, yellow once the card inverts to black. The spec's yellow-on-cream
 * (1.5:1) and red-on-black (2.4:1) are both on §4's own forbidden list, and
 * the numerals carry nothing the adjacent name does not.
 *
 * §12 — the first card renders pre-inverted on touch, so the interaction is
 * discoverable where hover never fires. Nothing is hidden behind hover: the
 * name and services are visible in both states.
 */
export function Capabilities({ capabilities }: { capabilities: Capability[] }) {
  return (
    <SectionShell id="what-train-does" surface="cream">
      <h2 className="type-h2 max-w-[16ch]">One network. Four capabilities.</h2>
      <p className="type-body-lg mt-8 max-w-[52ch] text-train-grey-700">
        Most businesses need more than one of these at once. That is the point.
      </p>

      <ul className="mt-20 grid gap-px bg-train-grey-300 md:grid-cols-2">
        {capabilities.map((capability, index) => (
          <li key={capability.slug}>
            <Link
              href={`/what-we-do#${capability.slug}`}
              className={cn(
                "group relative flex h-full flex-col overflow-hidden p-8 lg:p-12",
                "transition-colors duration-[220ms]",
                "bg-train-cream text-train-black",
                "hover:bg-train-black hover:text-train-cream",
                // First card pre-inverted on touch — §12.
                index === 0 &&
                  "[@media(hover:none)]:bg-train-black [@media(hover:none)]:text-train-cream",
              )}
            >
              {/*
                Decorative numeral.

                §04 asks for it "clipped by the card edge", and two rounds of
                client review rejected that: bled off the corner it read as a
                rendering fault rather than an editorial device. [A11] — the
                numeral now sits fully inside the card, aligned to the same
                inset as the content. Sized so it never collides with the
                capability name beside it.
              */}
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute right-8 top-6 font-display leading-none lg:right-10 lg:top-8",
                  "text-[clamp(3rem,5.5vw,4.5rem)]",
                  "text-train-grey-300 transition-colors duration-[220ms]",
                  "group-hover:text-train-yellow",
                  index === 0 && "[@media(hover:none)]:text-train-yellow",
                )}
              >
                {capability.number}
              </span>

              {/*
                Width is set to clear the numeral, not by character count. A
                10ch cap was narrower than the word "MARKETING" itself, so the
                break-word backstop split it as "MARKETIN / G &". Headings must
                wrap between words, never inside one.
              */}
              <h3 className="type-h3 relative max-w-[calc(100%-5rem)] lg:max-w-[calc(100%-8rem)]">
                {capability.name}
              </h3>

              <ul className="type-body relative mt-6 space-y-1">
                {capability.services.map((service) => (
                  <li key={service.name}>{service.name}</li>
                ))}
              </ul>

              {/* Arrow slides in bottom-right on hover; present on touch. */}
              <span
                aria-hidden="true"
                className={cn(
                  "relative mt-8 block translate-x-[-8px] self-end text-2xl opacity-0",
                  "transition-[opacity,transform] duration-[220ms]",
                  "group-hover:translate-x-0 group-hover:opacity-100",
                  index === 0 &&
                    "[@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100",
                )}
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-16">
        <EditorialCTA href="/what-we-do" label="Explore our capabilities" />
      </div>
    </SectionShell>
  );
}
