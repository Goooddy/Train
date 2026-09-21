import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * §6 / D2 — seven of the nine section CTAs are these, not buttons. Display
 * face, uppercase, with a trailing arrow. They read as chapter markers rather
 * than nine competing calls to action.
 *
 * No JavaScript: anchor targets render as a plain <a>, so in-page links work
 * with scripting disabled and rely on `scroll-margin-top` from globals.css.
 * Lenis picks these up in Stage 2 without changing the markup.
 */
export function EditorialCTA({
  href,
  label,
  variant = "light",
  className,
}: {
  href: string;
  label: string;
  /** Which surface it sits on: `light` = on cream, `dark` = on black or red. */
  variant?: "light" | "dark";
  className?: string;
}) {
  const isAnchor = href.startsWith("#");

  const classes = cn(
    // type-cta-lg, not type-cta: these are editorial links, not buttons, and
    // must sit above body-large so they read as the action. See [A13].
    "group relative inline-flex items-baseline gap-3 type-cta-lg",
    "focus-visible:outline-offset-4",
    variant === "dark" ? "text-train-cream" : "text-train-black",
    className,
  );

  const inner = (
    <>
      <span className="relative">
        {label}
        {/* Rest state — 1px underline at 40%. */}
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-px w-full bg-current opacity-40"
        />
        {/*
          Hover — a second underline at full strength sweeps left to right.
          On touch there is no hover, so §6 requires it sit at 100% by default:
          the `hover:none` variant below does that rather than hiding state.
        */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current",
            "transition-transform duration-[280ms] ease-out",
            "group-hover:scale-x-100 group-focus-visible:scale-x-100",
            "[@media(hover:none)]:scale-x-100",
          )}
        />
      </span>
      <span
        aria-hidden="true"
        className="transition-transform duration-[280ms] ease-out group-hover:translate-x-2"
      >
        →
      </span>
    </>
  );

  if (isAnchor) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
