import { cn } from "@/lib/utils";

/**
 * §4 — TRAIN wordmark with a 2px track line beneath it.
 *
 * TODO: replace with supplied TRAIN logo.
 *
 * Everything is `currentColor` so the mark inverts on dark surfaces without a
 * second asset. `textLength` pins the word to the full viewBox width, so the
 * rule underneath always matches the wordmark exactly — even before the
 * webfont loads, or if it never does.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 32"
      className={cn("h-6 w-auto", className)}
      role="img"
      aria-label="TRAIN"
    >
      <text
        x="0"
        y="22"
        textLength="120"
        lengthAdjust="spacing"
        fill="currentColor"
        fontSize="24"
        fontWeight="900"
        style={{
          fontFamily: "var(--font-archivo), 'Arial Black', sans-serif",
          fontVariationSettings: '"wdth" 125',
          letterSpacing: "0.08em",
        }}
      >
        TRAIN
      </text>
      {/* The track line. */}
      <rect x="0" y="28" width="120" height="2" fill="currentColor" />
    </svg>
  );
}
