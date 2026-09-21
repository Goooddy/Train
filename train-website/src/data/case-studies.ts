import type { CaseStudy } from "./types";

/**
 * §10 — six case studies, prose verbatim. Three are featured and appear on the
 * homepage §06: Northfield Bakery, Orbit Logistics, Saltmarsh Studio.
 *
 * Photography is Picsum grayscale placeholders (D10), seeded per §10:
 * `case-{slug}-hero`, `case-{slug}-1`, `case-{slug}-2`. Alt text is real and
 * written now, not left as a TODO — swapping the photograph later does not
 * change what the image is doing in the page.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "northfield-bakery",
    client: "Northfield Bakery",
    title: "A local bakery that needed to look like one worth travelling for",
    sector: "Food & retail",
    timeline: "10 weeks",
    capabilities: ["creative", "marketing-content"],
    featured: true,
    order: 1,
    heroImage: {
      seed: "case-northfield-bakery-hero",
      alt: "A baker lifting a tray of loaves from the oven in an early-morning bakery kitchen.",
      width: 1600,
      height: 1200,
    },
    outcomeLine: "Three times the weekend footfall, from the same two shopfronts.",
    problem:
      "Two shops, a loyal local following, and nothing that travelled beyond a half-mile radius. The branding had been assembled piece by piece over nine years and no two touchpoints matched. Photography was phone-shot and inconsistent.",
    approach:
      "We treated it as one identity problem, not a series of design jobs. Before any visual work, we spent a week in both shops working out what regulars actually valued — which turned out to be the early-morning bake, not the product range.",
    execution:
      "A rebuilt identity system, a full photography shoot across both sites at 5am, and a twelve-week social content plan the team could run themselves. Packaging, signage and print were redrawn against the same system.",
    gallery: [
      {
        seed: "case-northfield-bakery-1",
        alt: "Hands shaping dough on a flour-dusted steel counter.",
        width: 1200,
        height: 900,
      },
      {
        seed: "case-northfield-bakery-2",
        alt: "Paper bags and printed packaging laid out against the new identity system.",
        width: 1200,
        height: 900,
      },
    ],
    outcome:
      "Weekend footfall tripled within four months. More usefully, the team now produces its own content against a system that holds together without us.",
    metrics: [
      { value: "3×", label: "weekend footfall" },
      { value: "4 months", label: "to measurable change" },
      { value: "2 sites", label: "brought onto one system" },
    ],
  },
  {
    slug: "orbit-logistics",
    client: "Orbit Logistics",
    title: "Replacing a spreadsheet that fourteen people depended on",
    sector: "Logistics",
    timeline: "16 weeks",
    capabilities: ["digital-it", "business-support"],
    featured: true,
    order: 2,
    heroImage: {
      seed: "case-orbit-logistics-hero",
      alt: "A dispatch office overlooking a loading yard, screens showing the day’s schedule.",
      width: 1600,
      height: 1200,
    },
    outcomeLine: "Eleven hours a week returned to the operations team.",
    problem:
      "Scheduling ran on a single shared spreadsheet that only two people fully understood. Errors were caught late, usually by a driver. Growth had made the workaround into the bottleneck.",
    approach:
      "We mapped the real process rather than the documented one. The gap between them was the actual brief. We then designed the smallest system that could replace the spreadsheet without requiring anyone to change how they worked on day one.",
    execution:
      "A scheduling tool built around the existing process, a two-week parallel run alongside the spreadsheet, and hands-on training for all fourteen users. Business support stayed on for a month after handover.",
    gallery: [
      {
        seed: "case-orbit-logistics-1",
        alt: "An operations manager walking a driver through the new scheduling screen.",
        width: 1200,
        height: 900,
      },
      {
        seed: "case-orbit-logistics-2",
        alt: "Lorries lined up in a depot yard at first light.",
        width: 1200,
        height: 900,
      },
    ],
    outcome:
      "Eleven hours a week returned to the operations team, and scheduling errors are now caught before dispatch rather than after.",
    metrics: [
      { value: "11 hrs", label: "returned weekly" },
      { value: "14 users", label: "migrated with no downtime" },
      { value: "0", label: "scheduling errors reaching drivers" },
    ],
  },
  {
    slug: "saltmarsh-studio",
    client: "Saltmarsh Studio",
    title: "A portfolio that finally matched the work in it",
    sector: "Architecture",
    timeline: "12 weeks",
    capabilities: ["creative", "digital-it"],
    featured: true,
    order: 3,
    heroImage: {
      seed: "case-saltmarsh-studio-hero",
      alt: "A concrete and glass building photographed against a flat coastal sky.",
      width: 1600,
      height: 1200,
    },
    outcomeLine: "Enquiry quality changed before enquiry volume did.",
    problem:
      "Exceptional built work presented through a template site that flattened all of it. The practice was losing pitches to studios doing less interesting work but presenting it far better.",
    approach:
      "The problem was sequencing, not styling. We restructured around how the practice actually talks about a project — site, constraint, decision, result — rather than around a gallery of finished photographs.",
    execution:
      "A new identity, a full site rebuild with a project structure the team can extend themselves, and art direction for a reshoot of six key projects.",
    gallery: [
      {
        seed: "case-saltmarsh-studio-1",
        alt: "An architect’s hands annotating a site drawing on a studio table.",
        width: 1200,
        height: 900,
      },
      {
        seed: "case-saltmarsh-studio-2",
        alt: "A stairwell detail showing the junction between concrete and timber.",
        width: 1200,
        height: 900,
      },
    ],
    outcome:
      "Enquiry quality changed before volume did. Within a quarter the practice was being approached for the kind of work it wanted rather than the kind it could get.",
    metrics: [
      { value: "6 projects", label: "restructured and reshot" },
      { value: "1 quarter", label: "to changed enquiry quality" },
      { value: "2×", label: "average project value" },
    ],
  },
  {
    slug: "bramble-wellbeing",
    client: "Bramble Wellbeing",
    title: "Saying less, to more people",
    sector: "Health",
    timeline: "8 weeks",
    capabilities: ["marketing-content", "creative"],
    featured: false,
    order: 4,
    heroImage: {
      seed: "case-bramble-wellbeing-hero",
      alt: "A practitioner setting out a treatment room before the first appointment.",
      width: 1600,
      height: 1200,
    },
    outcomeLine: "Half the output, four times the reach.",
    problem:
      "Posting daily across four platforms with almost nothing to show for it. The content was well-made and completely undifferentiated.",
    approach:
      "We cut the platforms from four to two and the posting rate by half, then spent the recovered time on a single recognisable format.",
    execution:
      "A content system built around one repeatable format, a shoot producing eight weeks of assets in two days, and a handover so the team could run it without external support.",
    gallery: [
      {
        seed: "case-bramble-wellbeing-1",
        alt: "A camera on a tripod framing a shot during the two-day content shoot.",
        width: 1200,
        height: 900,
      },
      {
        seed: "case-bramble-wellbeing-2",
        alt: "Contact sheets pinned to a wall, showing the repeatable content format.",
        width: 1200,
        height: 900,
      },
    ],
    outcome:
      "Reach quadrupled on half the output. The format is now the thing people recognise the brand by.",
    metrics: [
      { value: "4×", label: "reach" },
      { value: "50%", label: "less output" },
      { value: "2 days", label: "of shooting for 8 weeks of content" },
    ],
  },
  {
    slug: "kite-recruitment",
    client: "Kite Recruitment",
    title: "Fixing the part of the funnel nobody was looking at",
    sector: "Recruitment",
    timeline: "14 weeks",
    capabilities: ["digital-it", "marketing-content"],
    featured: false,
    order: 5,
    heroImage: {
      seed: "case-kite-recruitment-hero",
      alt: "A candidate filling in an application on a laptop in a shared workspace.",
      width: 1600,
      height: 1200,
    },
    outcomeLine: "Application completion went from 31% to 78%.",
    problem:
      "Strong traffic, strong brand recognition, and a catastrophic drop-off at the application stage. Every assumption pointed at marketing; none of them were right.",
    approach:
      "We instrumented the funnel before proposing anything. The drop-off was concentrated in a single form step that had been added eighteen months earlier and never reviewed.",
    execution:
      "A rebuilt application flow, a rewritten set of role pages, and a reporting dashboard so the team can see the funnel without asking anyone.",
    gallery: [
      {
        seed: "case-kite-recruitment-1",
        alt: "A funnel breakdown on a reporting dashboard, drop-off highlighted at one step.",
        width: 1200,
        height: 900,
      },
      {
        seed: "case-kite-recruitment-2",
        alt: "Two people reviewing the rebuilt application flow on a whiteboard.",
        width: 1200,
        height: 900,
      },
    ],
    outcome:
      "Application completion went from 31% to 78%. No additional traffic was bought.",
    metrics: [
      { value: "31% → 78%", label: "application completion" },
      { value: "0", label: "extra spend on traffic" },
      { value: "1 step", label: "removed" },
    ],
  },
  {
    slug: "harbour-legal",
    client: "Harbour Legal",
    title: "Administrative load, handled properly",
    sector: "Professional services",
    timeline: "20 weeks",
    capabilities: ["business-support", "digital-it"],
    featured: false,
    order: 6,
    heroImage: {
      seed: "case-harbour-legal-hero",
      alt: "A solicitor’s desk with case files stacked beside a client intake form.",
      width: 1600,
      height: 1200,
    },
    outcomeLine: "Two fee earners stopped doing administration.",
    problem:
      "A six-person practice where two fee earners were spending roughly a day a week each on client onboarding, filing and scheduling. Hiring was the assumed answer.",
    approach:
      "We costed the hire against fixing the process, then did the second. Most of the load came from three tasks, all of which were either automatable or genuinely delegable.",
    execution:
      "A documented onboarding process, a client intake system, and ongoing virtual assistance covering the residue that could not be automated.",
    gallery: [
      {
        seed: "case-harbour-legal-1",
        alt: "A documented onboarding process printed and marked up in the margins.",
        width: 1200,
        height: 900,
      },
      {
        seed: "case-harbour-legal-2",
        alt: "Archive shelving in a small legal practice, files boxed and labelled.",
        width: 1200,
        height: 900,
      },
    ],
    outcome:
      "Two fee earners stopped doing administration. The hire was deferred indefinitely and the practice took on two additional clients within the same headcount.",
    metrics: [
      { value: "2 days", label: "returned weekly" },
      { value: "1 hire", label: "deferred" },
      { value: "+2 clients", label: "at the same headcount" },
    ],
  },
];

/** §06 — the three that appear on the homepage, in order. */
export const featuredCaseStudies = caseStudies
  .filter((c) => c.featured)
  .sort((a, b) => a.order - b.order);

export const caseStudyBySlug = Object.fromEntries(
  caseStudies.map((c) => [c.slug, c]),
) as Record<string, CaseStudy>;
