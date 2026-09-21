import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * §09 — simple, confident, high-impact. Nothing competing for attention.
 *
 * D2 — this is the second and last styled Button on the site.
 *
 * §09 is explicit that the only motion here is the headline masking up. Resist
 * adding anything else.
 */
export function FinalCTA() {
  return (
    <section
      id="start"
      data-surface="red"
      className="flex min-h-[70svh] items-center bg-train-red text-train-cream lg:min-h-[100svh]"
    >
      <div className="shell py-[var(--section-y)] text-center">
        {/*
          Max 16 characters per line, per §09. [A13] for the scale.

          The masked rise is the ONLY motion in this section. §09 is explicit:
          resist adding anything else.
        */}
        <Reveal mask>
          <h2 className="type-display mx-auto max-w-[16ch]">
            What are you trying to build?
          </h2>
        </Reveal>
        <p className="type-body-lg mx-auto mt-8 max-w-[46ch]">
          Tell us what you’re working on. We’ll help you work out what comes
          next.
        </p>
        <div className="mt-12">
          <Button href="/start" variant="onRed">
            Start a project
          </Button>
        </div>
      </div>
    </section>
  );
}
