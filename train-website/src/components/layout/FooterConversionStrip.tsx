"use client";

import { usePathname } from "next/navigation";
import { EditorialCTA } from "@/components/ui/EditorialCTA";

/**
 * §6's conversion strip — with one exception.
 *
 * [A15] — §6 adds this strip so "conversion exists on every page", and §14
 * gives it the same headline and the same call to action as §09. On the
 * homepage that puts two identical conversion blocks back to back, the second
 * immediately below the first, which reads as a duplication bug rather than a
 * design.
 *
 * §09 already provides conversion on the homepage, so the strip is suppressed
 * there and appears on every other route, which is exactly what §6 asks for.
 *
 * Only this strip is a client component; the rest of the footer stays server
 * rendered.
 */
export function FooterConversionStrip() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div className="flex flex-col gap-8 border-b border-train-cream/20 py-[clamp(4rem,8vh,7rem)] lg:flex-row lg:items-end lg:justify-between">
      {/*
        H3 scale, not H2. This repeats on every page, so at section heading
        size it competed with the page's own headings.
      */}
      <p className="type-h3 max-w-[20ch]">What are you trying to build?</p>
      <EditorialCTA
        href="/start"
        label="Start a project"
        variant="dark"
        className="shrink-0"
      />
    </div>
  );
}
