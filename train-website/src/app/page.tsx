import { Capabilities } from "@/components/home/Capabilities";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Hero } from "@/components/home/Hero";
import { Mission } from "@/components/home/Mission";
import { Model } from "@/components/home/Model";
import { Network } from "@/components/home/Network";
import { Problem } from "@/components/home/Problem";
import { Work } from "@/components/home/Work";
import { WhyTrain } from "@/components/home/WhyTrain";
import { ProgressRail } from "@/components/layout/ProgressRail";
import { capabilities, capabilityBySlug } from "@/data/capabilities";
import { featuredCaseStudies } from "@/data/case-studies";
import { missionImage } from "@/data/mission";
import { clientStages, engineStages } from "@/data/model-stages";
import { networkDiagramLabel, networkFlow } from "@/data/network";
import { homeSections } from "@/data/site";
import { reasons } from "@/data/why-train";

/**
 * D1 — the homepage is the entire argument. Nine sections, in order, surfaces
 * alternating so each reads as distinct:
 *
 *   black · cream · black · cream · RED · cream · black · cream · RED
 *
 * The two red sections are the Network and the Final CTA — the turn and the
 * close. There are nine sections. Nine is the number.
 *
 * Data is read here and passed down as props. No component imports from
 * src/data, so a CMS can later replace the data layer alone.
 */
export default function HomePage() {
  return (
    <>
      {/* D3 — homepage only. Inner pages have no rail (§9). */}
      <ProgressRail sections={homeSections} />

      <Hero />
      <Problem />
      <Model stages={clientStages} />
      <Capabilities capabilities={capabilities} />
      <Network flow={networkFlow} diagramLabel={networkDiagramLabel} />
      <Work
        caseStudies={featuredCaseStudies}
        capabilityBySlug={capabilityBySlug}
      />
      <WhyTrain reasons={reasons} />
      <Mission stages={engineStages} image={missionImage} />
      <FinalCTA />
    </>
  );
}
