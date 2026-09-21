import { Reveal } from "@/components/motion/Reveal";
import { EditorialCTA } from "@/components/ui/EditorialCTA";
import { SectionShell } from "@/components/ui/SectionShell";
import type { Reason } from "@/data/why-train";
import { stagger } from "@/lib/motion";

/**
 * §07 — four reasons as full-width rows separated by a 1px cream hairline at
 * 20%. Title left, explanation right at desktop; title above explanation on
 * mobile, hairlines retained.
 *
 * The 24px translate and 120ms stagger are added in Stage 6. The rows are
 * authored in their final position.
 */
export function WhyTrain({ reasons }: { reasons: Reason[] }) {
  return (
    <SectionShell id="why-train" surface="black" eyebrow="Why TRAIN">
      <h2 className="type-h2 max-w-[16ch]">Four reasons this works better.</h2>

      <ul className="mt-20">
        {reasons.map((reason, index) => (
          /*
            §07 — each row fades and translates up 24px on entering view, with
            a 120ms stagger between rows. Reveal owns both the attribute and
            the animation; never hand-write data-reveal here (see [A16]).
          */
          <Reveal
            as="li"
            key={reason.id}
            delay={index * stagger.loose}
            className="grid gap-4 border-t border-train-cream/20 py-10 lg:grid-cols-2 lg:gap-16"
          >
            <h3 className="type-h3 max-w-[16ch]">{reason.title}</h3>
            <p className="type-body max-w-[52ch] text-train-grey-300">
              {reason.explanation}
            </p>
          </Reveal>
        ))}
      </ul>

      <div className="mt-16">
        <EditorialCTA
          href="/about"
          label="Why work with TRAIN"
          variant="dark"
        />
      </div>
    </SectionShell>
  );
}
