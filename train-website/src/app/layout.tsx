import type { Metadata } from "next";
import { Archivo, Montserrat } from "next/font/google";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { ScrollProvider } from "@/components/layout/ScrollContext";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "@/styles/globals.css";

/**
 * §4 — two faces, both swappable when real brand files arrive.
 *
 * Archivo is a variable font, so `weight` is omitted (the full range loads) and
 * the extra width axis is requested through `axes`. The 125 width itself is a
 * CSS concern — `font-variation-settings: "wdth" 125` in globals.css — because
 * the loader has no option to pin an axis value.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TRAIN · One client need. One TRAIN solution.",
    template: "%s · TRAIN",
  },
  // TODO: per-route descriptions at 150–160 chars are a second-pass item (§13).
  description:
    "Creative, digital, marketing and business support, coordinated around what your business actually needs. One point of contact from brief to delivery.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${archivo.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/*
          §11 / [S1] — reveal targets are authored visible so the site reads with
          JavaScript disabled. This marks the document as scripted before any
          reveal element has been parsed, letting CSS hide them for their
          entrance without ever hiding them from crawlers or a failed script.
          It is the first node in <body> for that reason; do not move it.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />

        {/* §13 — first focusable element on every page. */}
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <SmoothScroll>
          <ScrollProvider>
            <Nav />
            <main id="main">{children}</main>
            <Footer />
            <BackToTop />
          </ScrollProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
