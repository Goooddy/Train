"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { navTextRoutes } from "@/data/site";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { useScroll } from "./ScrollContext";

/**
 * §6 — fixed, full width. Transparent over the hero, gaining a cream surface
 * and a grey-300 hairline past 80vh. Hides on scroll down, returns on scroll
 * up, with a 12px threshold so it does not flicker.
 *
 * `data-surface` flips with the background so the focus ring stays legible
 * either way [A1]: yellow while the nav is transparent over the black hero,
 * black once it turns cream.
 *
 * TODO: inner-page heroes are second-pass. If any of them use a light surface,
 * this needs a per-page `surface` prop — transparent-over-cream with cream
 * text would be invisible.
 */
export function Nav() {
  const { isPastHero, isNavHidden } = useScroll();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const solid = isPastHero && !menuOpen;
  const hidden = isNavHidden && !menuOpen;

  return (
    <>
      <header
        data-surface={solid ? "cream" : "black"}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b",
          "transition-[transform,background-color,border-color] duration-[180ms] ease-out",
          solid
            ? "border-train-grey-300 bg-train-cream text-train-black"
            : "border-transparent bg-transparent text-train-cream",
          hidden ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <nav
          aria-label="Primary"
          className="shell flex h-[var(--nav-h)] items-center justify-between gap-6"
        >
          <Link href="/" className="shrink-0">
            <Logo className="h-5 lg:h-6" />
          </Link>

          {/* [S6] — five text links; `/` is the logo above. */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navTextRoutes.map((route) => {
              const active =
                pathname === route.href || pathname.startsWith(`${route.href}/`);
              return (
                <li key={route.href} className="relative">
                  <Link
                    href={route.href}
                    aria-current={active ? "page" : undefined}
                    /* Never wrap: these are labels, not prose. Without this a
                       small rise in the eyebrow size broke "What we do" onto
                       two lines and the whole bar lost its baseline. */
                    className="type-eyebrow whitespace-nowrap"
                  >
                    {route.label}
                  </Link>
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-2 left-0 h-0.5 w-full bg-train-yellow"
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            {/*
              D2 / [A6] — this is one of the two Button instances site-wide.
              §6 collapses it to a compact START pill below lg, so it stays a
              single element rather than becoming a second button.
            */}
            <Button
              href="/start"
              className="px-4 py-3 text-sm lg:px-10 lg:py-5 lg:text-base"
            >
              <span className="lg:hidden">Start</span>
              <span className="hidden lg:inline">Start a project</span>
            </Button>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center lg:hidden"
            >
              {menuOpen ? (
                <X aria-hidden="true" className="h-6 w-6" />
              ) : (
                <Menu aria-hidden="true" className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mounted only while open — see MobileMenu for why. */}
      {menuOpen ? (
        <MobileMenu
          onClose={() => setMenuOpen(false)}
          returnFocusTo={triggerRef}
        />
      ) : null}
    </>
  );
}
