/**
 * §14 §07 — the four reasons.
 *
 * §3's data file list does not name this module, but these four are section
 * content rather than layout, and the brief requires content to live in the
 * data layer so a CMS can replace it by swapping that layer alone. Embedding
 * them in the component would break that.
 *
 * /about expands each of these into a full section in the second pass.
 */
export interface Reason {
  id: string;
  title: string;
  explanation: string;
}

export const reasons: Reason[] = [
  {
    id: "one-point-of-contact",
    title: "One point of contact",
    explanation:
      "You deal with TRAIN. Not five inboxes, five invoices and five versions of the brief.",
  },
  {
    id: "specialist-network",
    title: "Specialist network",
    explanation:
      "The right expertise is assembled around the problem, rather than the problem being bent to fit whoever is available.",
  },
  {
    id: "connected-thinking",
    title: "Connected thinking",
    explanation:
      "Creative, digital, marketing and business support are planned together, so they do not contradict each other later.",
  },
  {
    id: "from-idea-to-impact",
    title: "From idea to impact",
    explanation:
      "We stay focused on execution, and on what the work is still doing for you in a year.",
  },
];
