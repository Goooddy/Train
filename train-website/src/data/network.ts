/**
 * §05 / §9 — the coordination diagram and the network argument.
 *
 * The diagram is informative, not decorative, so §13 requires `role="img"` and
 * an aria-label describing the relationship in words. That label is written
 * here rather than left as a TODO: like alt text, it is accessibility copy,
 * and the diagram is unusable without it.
 */

export interface NetworkNode {
  id: string;
  label: string;
}

/** CLIENT → TRAIN → four capabilities → COORDINATED DELIVERY (§05). */
export const networkFlow = {
  source: { id: "client", label: "Client" } satisfies NetworkNode,
  hub: { id: "train", label: "TRAIN" } satisfies NetworkNode,
  /** §05 labels the middle row exactly this way — note "Marketing", not
   *  "Marketing & content" as in §04. Kept as the spec draws it. */
  branches: [
    { id: "creative", label: "Creative" },
    { id: "digital-it", label: "Digital & IT" },
    { id: "marketing", label: "Marketing" },
    { id: "business-support", label: "Business support" },
  ] satisfies NetworkNode[],
  destination: {
    id: "delivery",
    label: "Coordinated delivery",
  } satisfies NetworkNode,
};

export const networkDiagramLabel =
  "A client brief goes to TRAIN, which distributes it to four specialist groups — creative, digital and IT, marketing, and business support — whose work converges back into a single coordinated delivery.";

export interface NetworkBlock {
  id: string;
  heading: string;
  body: string;
}

/**
 * §9 — the three blocks that carry the credibility argument on
 * /how-it-works#network. §9 is explicit that generic process copy would
 * actively undermine the positioning here: the claim "you don't need five
 * different people" also describes a freelancer marketplace, and the
 * difference has to be shown through named process and visible
 * accountability. Nothing is invented.
 *
 * TODO: [CONTENT-GAPS §4] copy not supplied. Second pass.
 */
export const networkBlocks: NetworkBlock[] = [
  { id: "scoping", heading: "How a project is scoped", body: "" },
  { id: "selection", heading: "How specialists are selected", body: "" },
  { id: "accountability", heading: "Who you actually deal with", body: "" },
];
