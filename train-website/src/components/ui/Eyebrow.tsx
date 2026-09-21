import { cn } from "@/lib/utils";

/**
 * §13 — an eyebrow is never a heading element. Rendering it as <p> keeps the
 * document outline clean (one h1, no skipped levels) while still reading as a
 * label. Uppercasing is done in CSS, never typed into markup.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("type-eyebrow", className)}>{children}</p>;
}
