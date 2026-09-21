import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * §6 / D2 — the styled button. Exactly two instances ship site-wide: the nav's
 * START A PROJECT and the §09 close.
 *
 * Per [A6], native <button> elements needed for behaviour (accordion triggers,
 * rail dots, the menu toggle, the enquiry submit) are not this component and
 * are not counted against that total.
 */
export function Button({
  href,
  children,
  variant = "default",
  className,
}: {
  href: string;
  children: React.ReactNode;
  /** `onRed` inverts to black-on-cream for the §09 red surface. */
  variant?: "default" | "onRed";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        // Zero border radius is deliberate — see §6.
        "inline-block rounded-none px-10 py-5 type-cta transition-colors duration-[180ms]",
        variant === "onRed"
          ? "bg-train-black text-train-cream hover:bg-train-cream hover:text-train-black"
          : "bg-train-red text-train-cream hover:bg-train-black",
        className,
      )}
    >
      {children}
    </Link>
  );
}
