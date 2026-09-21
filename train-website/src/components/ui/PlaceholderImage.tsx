"use client";

import Image from "next/image";
import { useState } from "react";
import { localPlaceholders } from "@/data/local-placeholders";
import { cn } from "@/lib/utils";

/**
 * §10 / D10 — photography is Picsum grayscale placeholders, deterministic per
 * seed. Black-and-white matches the intended image direction (industrial,
 * hands, movement, strong cut-outs) rather than being a stand-in for colour.
 *
 * `width` and `height` are required and always emitted, so there is no layout
 * shift against the §13 CLS budget. `alt` is real text written now — it is not
 * a TODO, because swapping the photograph later does not change what the
 * image is doing in the page.
 *
 * The query string must stay exactly `?grayscale` — next.config.ts pins the
 * remote pattern to that search value.
 *
 * [A21] — two-step fallback. The site depends on a third party for every
 * photograph, and that dependency fails in ordinary conditions: a slow or
 * rate-limited upstream makes Next's image optimiser return 504 and the page
 * renders a broken-image icon with the alt text sprawled across the layout,
 * which is what happened on mobile in review.
 *
 *   1. Optimised through Next (the normal path).
 *   2. On error, retry the same deterministic URL unoptimised, straight from
 *      the browser. This recovers the common case where the *server* cannot
 *      reach Picsum but the visitor's device can.
 *   3. On a second error, a neutral block at the exact aspect ratio, still
 *      carrying the alt text for assistive tech.
 *
 * Step 3 never shows a broken image and never shifts layout.
 */
export interface PlaceholderImageProps {
  seed: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** Required for correct srcset selection on anything not fixed-width. */
  sizes?: string;
  /** §7 — the hero only. Everything else stays lazy. */
  priority?: boolean;
}

export function PlaceholderImage({
  seed,
  alt,
  width,
  height,
  className,
  sizes,
  priority = false,
}: PlaceholderImageProps) {
  const [stage, setStage] = useState<"optimized" | "direct" | "failed">(
    "optimized",
  );

  /*
   * [A21] — local first. Photographs are downloaded once by
   * scripts/fetch-placeholders.mjs and served from this origin, so they load
   * immediately and cannot be taken out by a third party rate-limiting us.
   * Any seed without a local file still falls back to Picsum at runtime.
   */
  const isLocal = localPlaceholders.has(seed);
  const src = isLocal
    ? `/placeholders/${seed}.jpg`
    : `https://picsum.photos/seed/${seed}/${width}/${height}?grayscale`;

  if (stage === "failed") {
    // Solid, not a faint tint: a near-invisible block reads as a layout bug.
    // This holds the exact aspect ratio, so nothing shifts, and keeps the alt
    // text for assistive tech.
    return (
      <div
        role="img"
        aria-label={alt}
        style={{ aspectRatio: `${width} / ${height}` }}
        className={cn(
          "grid w-full place-items-center bg-train-grey-300 text-train-grey-700",
          className,
        )}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-8 w-8 opacity-60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="4" width="18" height="16" />
          <path d="M3 16l5-5 4 4 3-3 6 6" />
          <circle cx="9" cy="9" r="1.5" />
        </svg>
      </div>
    );
  }

  return (
    <Image
      // Remounts on fallback so the browser retries rather than reusing the
      // failed response.
      key={stage}
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      unoptimized={stage === "direct"}
      onError={() => setStage(stage === "optimized" ? "direct" : "failed")}
      className={cn("h-auto w-full object-cover", className)}
    />
  );
}
