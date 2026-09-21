import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { EditorialCTA } from "@/components/ui/EditorialCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Logo } from "@/components/ui/Logo";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { SectionShell } from "@/components/ui/SectionShell";

// TODO: delete this route before launch (§3). Kept out of the index meanwhile.
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const tokens = [
  { name: "--train-black", hex: "#0A0A0A", cls: "bg-train-black" },
  { name: "--train-cream", hex: "#F4F1EA", cls: "bg-train-cream" },
  { name: "--train-red", hex: "#B3221E", cls: "bg-train-red" },
  { name: "--train-yellow", hex: "#F5C518", cls: "bg-train-yellow" },
  { name: "--train-grey-700", hex: "#4A4A4A", cls: "bg-train-grey-700" },
  { name: "--train-grey-300", hex: "#D6D2C8", cls: "bg-train-grey-300" },
];

const approved = [
  { fg: "Black", bg: "Cream", ratio: "17.5:1", cls: "bg-train-cream text-train-black" },
  { fg: "Cream", bg: "Black", ratio: "17.5:1", cls: "bg-train-black text-train-cream" },
  { fg: "Cream", bg: "Red", ratio: "5.9:1", cls: "bg-train-red text-train-cream" },
  { fg: "Yellow", bg: "Black", ratio: "12.1:1", cls: "bg-train-black text-train-yellow" },
  { fg: "Black", bg: "Yellow", ratio: "12.1:1", cls: "bg-train-yellow text-train-black" },
  { fg: "Grey-700", bg: "Cream", ratio: "7.9:1", cls: "bg-train-cream text-train-grey-700" },
  { fg: "Grey-300", bg: "Black", ratio: "13.1:1", cls: "bg-train-black text-train-grey-300" },
  { fg: "Red", bg: "Cream", ratio: "5.9:1", cls: "bg-train-cream text-train-red" },
];

const forbidden = [
  { pair: "Yellow on cream", ratio: "1.5:1", why: "D9. Never text." },
  { pair: "Yellow on red", ratio: "4.1:1", why: "Design decision, not a failure." },
  { pair: "Red on black", ratio: "2.4:1", why: "Fails AA." },
  { pair: "Grey-300 on cream", ratio: "1.3:1", why: "Fails AA. [A2]" },
];

const typeScale = [
  { cls: "type-hero", label: "Hero", spec: "clamp(3rem, 9vw, 8.5rem) · Display 900 · -0.03em · 0.92" },
  { cls: "type-h2", label: "Section H2", spec: "clamp(2.25rem, 5.5vw, 5rem) · Display 800 · -0.02em · 0.98" },
  { cls: "type-h3", label: "H3", spec: "clamp(1.5rem, 2.5vw, 2.25rem) · Display 700 · -0.01em · 1.1" },
  { cls: "type-body-lg", label: "Body large", spec: "clamp(1.125rem, 1.6vw, 1.5rem) · Text 400 · 1.5" },
  { cls: "type-body", label: "Body", spec: "1.0625rem · Text 400 · 1.55" },
  { cls: "type-eyebrow", label: "Eyebrow", spec: "0.75rem · Text 600 · 0.18em · uppercase" },
  { cls: "type-cta", label: "CTA", spec: "clamp(1rem, 1.8vw, 1.5rem) · Display 700 · 0.04em · uppercase" },
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-train-grey-300 py-12">
      <Eyebrow className="mb-8 text-train-grey-700">{title}</Eyebrow>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <>
      <div className="shell py-20">
        <h1 className="type-h2 mb-4">Styleguide</h1>
        <p className="type-body-lg max-w-[52ch] text-train-grey-700">
          Every token, type style and component state. Delete this route before
          launch. Ratios are recomputed from the hex values, not copied from §4
          — several figures there were wrong and are corrected in §16.
        </p>

        <Block title="Colour tokens">
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {tokens.map((t) => (
              <li key={t.name}>
                <div
                  className={`${t.cls} h-24 w-full border border-train-grey-300`}
                />
                <p className="type-body mt-2 text-sm">{t.name}</p>
                <p className="type-body text-sm text-train-grey-700">{t.hex}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Approved pairings">
          <ul className="grid gap-3 sm:grid-cols-2">
            {approved.map((p) => (
              <li key={`${p.fg}-${p.bg}`} className={`${p.cls} p-5`}>
                <p className="type-body font-semibold">
                  {p.fg} on {p.bg}
                </p>
                <p className="type-body text-sm opacity-80">
                  {p.ratio} — the quick brown fox jumps over the lazy dog.
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Forbidden pairings">
          <ul className="grid gap-3 sm:grid-cols-2">
            {forbidden.map((f) => (
              <li
                key={f.pair}
                className="flex items-center gap-4 border border-train-grey-300 p-4"
              >
                <span
                  aria-hidden="true"
                  className="h-10 w-10 shrink-0 border border-train-grey-300 bg-train-yellow"
                />
                <span>
                  <span className="type-body block font-semibold">{f.pair}</span>
                  <span className="type-body block text-sm text-train-grey-700">
                    {f.ratio} — {f.why}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Type scale">
          <div className="space-y-10">
            {typeScale.map((t) => (
              <div key={t.cls}>
                <p className="type-body mb-2 text-sm text-train-grey-700">
                  .{t.cls} — {t.spec}
                </p>
                <p className={t.cls}>Ideas are everywhere</p>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Logo">
          <div className="flex flex-wrap items-center gap-6">
            <div className="bg-train-cream p-8">
              <Logo className="h-8 text-train-black" />
            </div>
            <div className="bg-train-black p-8">
              <Logo className="h-8 text-train-cream" />
            </div>
            <div className="bg-train-red p-8">
              <Logo className="h-8 text-train-cream" />
            </div>
          </div>
        </Block>

        <Block title="Button — two instances site-wide (D2)">
          <div className="flex flex-wrap items-start gap-6">
            <div className="bg-train-cream p-8" data-surface="cream">
              <Button href="/start">Start a project</Button>
            </div>
            <div className="bg-train-red p-8" data-surface="red">
              <Button href="/start" variant="onRed">
                Start a project
              </Button>
            </div>
          </div>
          <p className="type-body mt-4 text-sm text-train-grey-700">
            Tab to each to check the focus ring: black on cream, yellow on red
            [A1]. Hover the first — red to black over 180ms.
          </p>
        </Block>

        <Block title="EditorialCTA — the other seven">
          <div className="flex flex-col gap-8">
            <div className="bg-train-cream p-8" data-surface="cream">
              <EditorialCTA href="/work" label="View our work" />
            </div>
            <div className="bg-train-black p-8" data-surface="black">
              <EditorialCTA href="/work" label="View our work" variant="dark" />
            </div>
            <div className="bg-train-red p-8" data-surface="red">
              <EditorialCTA
                href="#styleguide-anchor"
                label="An in-page anchor"
                variant="dark"
              />
            </div>
          </div>
          <p className="type-body mt-4 text-sm text-train-grey-700">
            Rest is a 40% underline; hover sweeps a full-strength line left to
            right over 280ms and shifts the arrow 8px. On touch the full line
            shows by default, since hover never fires.
          </p>
        </Block>

        <Block title="Eyebrow">
          <Eyebrow>The TRAIN model</Eyebrow>
          <p className="type-body mt-2 text-sm text-train-grey-700">
            Renders as a paragraph, never a heading — it must not enter the
            document outline.
          </p>
        </Block>

        <Block title="PlaceholderImage">
          <div className="max-w-md">
            <PlaceholderImage
              seed="train-hero"
              alt="Styleguide sample of the grayscale placeholder treatment."
              width={800}
              height={600}
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </Block>
      </div>

      <div className="shell">
        <Eyebrow className="border-t border-train-grey-300 pt-12 text-train-grey-700">
          SectionShell surfaces
        </Eyebrow>
      </div>

      <SectionShell id="styleguide-anchor" surface="cream" eyebrow="Cream surface">
        <h2 className="type-h2">One client need</h2>
      </SectionShell>
      <SectionShell id="sg-black" surface="black" eyebrow="Black surface">
        <h2 className="type-h2">One TRAIN solution</h2>
      </SectionShell>
      <SectionShell id="sg-red" surface="red" eyebrow="Red surface">
        <h2 className="type-h2">The turn and the close</h2>
      </SectionShell>
    </>
  );
}
