import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Logo } from "@/components/ui/Logo";
import { navRoutes, site } from "@/data/site";
import { FooterConversionStrip } from "./FooterConversionStrip";

/**
 * §6 — black surface. The conversion strip sits above the columns so a route
 * to /start exists on every page, not just the homepage.
 *
 * The strip headline repeats §09's H2 by design (§14 gives it for both), but
 * renders as a <p>: it is not a section heading, and on the homepage a second
 * h2 with identical text would muddle the outline for no gain.
 *
 * Uses EditorialCTA, not Button — D2 caps the styled button at two instances
 * and this is neither of them [A6].
 */
export function Footer() {
  return (
    <footer data-surface="black" className="bg-train-black text-train-cream">
      <div className="shell">
        {/* Conversion strip — suppressed on the homepage, see [A15]. */}
        <FooterConversionStrip />

        {/* Columns */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="h-6" />
            <p className="type-body mt-6 max-w-[34ch] text-train-grey-300">
              {site.definition}
            </p>
          </div>

          <nav aria-label="Footer">
            <Eyebrow className="mb-5 text-train-grey-300">Explore</Eyebrow>
            <ul className="flex flex-col gap-3">
              {navRoutes.map((route) => (
                <li key={route.href}>
                  <Link href={route.href} className="type-body">
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <Eyebrow className="mb-5 text-train-grey-300">Contact</Eyebrow>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`mailto:${site.email}`} className="type-body">
                  {site.email}
                </a>
              </li>
              <li>
                <Link href="/contact" className="type-body">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <Eyebrow className="mb-5 text-train-grey-300">Follow</Eyebrow>
            <ul className="flex flex-col gap-3">
              {site.social.map((item) => (
                <li key={item.label}>
                  {/* TODO: [CONTENT-GAPS §5] real URL not supplied. */}
                  <a href={item.href} className="type-body">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-train-cream/20 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-body text-sm text-train-grey-300">
            {site.copyright}
          </p>
          <ul className="flex gap-6">
            {site.legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="type-body text-sm text-train-grey-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
