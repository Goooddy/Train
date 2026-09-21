import type { ImageRef } from "./types";

/**
 * §08 / §9 — the mission.
 *
 * The engine loop itself lives in `model-stages.ts` as the four `engine`
 * stages; this module carries only what is specific to the mission register.
 */

/** §08 — one photograph rather than a diagram grid, per the shifted register. */
export const missionImage: ImageRef = {
  seed: "train-mission",
  alt: "An apprentice being shown a task on a workbench by a more experienced colleague.",
  width: 1600,
  height: 1200,
};

export type InitiativeStatus = "Active" | "In development" | "Planned";

export interface Initiative {
  id: string;
  name: string;
  status: InitiativeStatus;
  description: string;
}

/**
 * §9 — three initiative cards with a status tag.
 *
 * TODO: [CONTENT-GAPS §2] no names, statuses or descriptions are supplied
 * anywhere in the spec. §14's §08 copy establishes the territory ("skills,
 * apprenticeships and community initiatives") but names no programme, and §0
 * forbids inventing them. Second pass.
 */
export const initiatives: Initiative[] = [
  { id: "initiative-1", name: "", status: "Planned", description: "" },
  { id: "initiative-2", name: "", status: "Planned", description: "" },
  { id: "initiative-3", name: "", status: "Planned", description: "" },
];

/**
 * §9 — the mission narrative on /mission.
 *
 * TODO: [CONTENT-GAPS §3] not supplied. Second pass. §14 gives the §08 body
 * copy, which the homepage uses; the longer narrative does not exist yet.
 */
export const missionNarrative = "";
