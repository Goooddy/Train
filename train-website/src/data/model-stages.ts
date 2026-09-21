import type { ModelStage } from "./types";

/**
 * §14 — the nine stages, in closed-loop order (D4).
 *
 * The loop reads: five client stages, then the engine turns client work back
 * into new client work.
 *
 *   Discover → Design → Assemble → Deliver → Retain
 *     → Build → Generate → Reinvest → Attract → (back to Discover)
 *
 * Which half renders where:
 * - Homepage §03 takes the five `client` stages.
 * - Homepage §08 takes the four `engine` stages, drawn as their own closed
 *   circle starting at Attract (§8: Attract → Build → Generate → Reinvest).
 * - /how-it-works renders all nine as one loop, with Attract at the junction
 *   between the engine and the client journey (§9).
 *
 * Attract is typed `engine` because §14 lists it under the engine stages. Its
 * junction role is positional, not a third phase, so the §10 type is unchanged.
 */
export const modelStages: ModelStage[] = [
  {
    slug: "discover",
    name: "Discover",
    phase: "client",
    short: "Work out the real problem.",
    detail:
      "We work out what the problem actually is, which is rarely the one you arrived with. Most briefs describe a symptom. The first conversation is about finding what is causing it.",
  },
  {
    slug: "design",
    name: "Design",
    phase: "client",
    short: "Shape the solution first.",
    detail:
      "We shape the solution before anyone builds anything. That means deciding what is in scope, what isn’t, and what success looks like — in writing, before work starts.",
  },
  {
    slug: "assemble",
    name: "Assemble",
    phase: "client",
    short: "Bring in the right specialists.",
    detail:
      "The right specialists are brought onto the project, not the ones who happen to be free. You are told who is working on what and why they were chosen.",
  },
  {
    slug: "deliver",
    name: "Deliver",
    phase: "client",
    short: "Coordinated execution.",
    detail:
      "Coordinated execution, with one person accountable for all of it. You brief us once. We handle the briefing, scheduling and quality of everyone else.",
  },
  {
    slug: "retain",
    name: "Retain",
    phase: "client",
    short: "Stay close after launch.",
    detail:
      "We stay close enough to keep it working after launch. Most of what fails in a project fails in the three months after it ships, not during it.",
  },

  /*
   * §14 supplies a single line for each engine stage, not a paragraph. That
   * line is used for both `short` and `detail`: §0 forbids inventing the
   * missing prose, and leaving `detail` empty would render blank rows in
   * /how-it-works' nine expandable rows. Flagged in CONTENT-GAPS §7.
   */
  {
    slug: "build",
    name: "Build",
    phase: "engine",
    short: "Client work builds the capability, the network and the track record.",
    detail:
      "Client work builds the capability, the network and the track record.",
  },
  {
    slug: "generate",
    name: "Generate",
    phase: "engine",
    short: "That work generates the revenue the business runs on.",
    detail: "That work generates the revenue the business runs on.",
  },
  {
    slug: "reinvest",
    name: "Reinvest",
    phase: "engine",
    short:
      "A share goes back into skills, apprenticeships and community initiatives.",
    detail:
      "A share goes back into skills, apprenticeships and community initiatives.",
  },
  {
    slug: "attract",
    name: "Attract",
    phase: "engine",
    short: "Which brings more people and more work into the network.",
    detail: "Which brings more people and more work into the network.",
  },
];

/** §03 — the five client stages, in order. */
export const clientStages = modelStages.filter((s) => s.phase === "client");

/**
 * §08 — the engine loop, rotated to start at Attract so it reads
 * Attract → Build → Generate → Reinvest → back to Attract.
 */
export const engineStages = (() => {
  const engine = modelStages.filter((s) => s.phase === "engine");
  const attractIndex = engine.findIndex((s) => s.slug === "attract");
  return [...engine.slice(attractIndex), ...engine.slice(0, attractIndex)];
})();
