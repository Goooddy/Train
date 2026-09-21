"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navRoutes } from "@/data/site";
import { cn } from "@/lib/utils";
import { useLenis } from "./SmoothScroll";

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * §6 — full-screen black overlay, cream links, 40ms stagger.
 *
 * §13 requires it to trap focus, close on Escape, restore focus to the trigger
 * and lock body scroll while open. All four are implemented here rather than
 * in the Nav, so the obligations travel with the component.
 *
 * No JavaScript: this cannot open without script. The Footer carries all six
 * routes and is reachable by scrolling — that is the documented fallback [S1].
 */
export function MobileMenu({
  onClose,
  returnFocusTo,
}: {
  onClose: () => void;
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
}) {
  const lenis = useLenis();
  const [shown, setShown] = useState(false);

  // Mounted only while open, so `shown` starts false on every open and the
  // entrance transition always runs. Flipped inside rAF rather than in the
  // effect body: a synchronous setState there would cascade a second render.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Scroll lock. Lenis is stopped when present; the inline overflow covers the
  // reduced-motion case where Lenis has been destroyed.
  useEffect(() => {
    lenis?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
    };
  }, [lenis]);

  // Focus trap, Escape, and focus restoration.
  useEffect(() => {
    const panel = document.getElementById("mobile-menu");
    if (!panel) return;

    const items = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );

    items()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = items();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const trigger = returnFocusTo.current;

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [onClose, returnFocusTo]);

  return (
    <div
      id="mobile-menu"
      data-surface="black"
      className="fixed inset-0 z-40 bg-train-black text-train-cream lg:hidden"
    >
      <nav
        aria-label="Primary"
        className="shell flex h-full flex-col justify-center gap-6"
      >
        {navRoutes.map((route, index) => (
          <Link
            key={route.href}
            href={route.href}
            onClick={onClose}
            style={{ transitionDelay: `${index * 40}ms` }}
            className={cn(
              "type-h3 w-fit transition-[opacity,transform] duration-[400ms] ease-out",
              // §6 — clamp(2rem, 8vw, 3rem), larger than the H3 default.
              "text-[clamp(2rem,8vw,3rem)]",
              shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
