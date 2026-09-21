# TRAIN — Content gaps

Every piece of copy the site needs that `CLAUDE.md` §10 and §14 do not supply. Nothing here has been invented: §0 forbids generating replacement copy, so each gap carries a bare `TODO:` in the code until real text arrives.

Raised 2026-09-21. **Items marked `[P1]` block the first pass; `[P2]` items are needed for the second pass** (inner pages) and do not hold up the homepage.

---

## 1. Service clarifiers — 15 items `[P2]`

§9 requires that on `/what-we-do` "each service gets a 4–8 word clarifier rather than standing alone — a bare service list reads as padding." §10's `Capability` type has the field (`services[].note`) but §14 supplies only the service names.

The homepage §04 cards render names only, so this does not block pass 1. `/what-we-do` cannot ship without it.

**Target: 4–8 words each. Says what the service actually delivers, not what it is.**

### 01 CREATIVE

| Service | Clarifier |
| --- | --- |
| Photography | |
| Videography | |
| Graphic design | |
| Branding | |
| Creative direction | |

### 02 DIGITAL & IT

| Service | Clarifier |
| --- | --- |
| Website development | |
| SEO | |
| Digital solutions | |

### 03 MARKETING & CONTENT

| Service | Clarifier |
| --- | --- |
| Social media | |
| Content creation | |
| Marketing | |
| Content strategy | |

### 04 BUSINESS SUPPORT

| Service | Clarifier |
| --- | --- |
| Virtual assistance | |
| Administrative support | |
| Business systems | |

---

## 2. `/mission` initiative cards — 3 items `[P2]`

§9 specifies "three initiative cards with a status tag (Active / In development / Planned)". No names, descriptions or statuses are supplied anywhere.

Each card needs:

- **Name** — the initiative
- **Status** — one of Active · In development · Planned
- **Description** — 2–3 sentences

§14's §08 copy establishes the territory ("skills, apprenticeships and community initiatives that give people a route into this industry") but names no specific programme.

| # | Name | Status | Description |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

---

## 3. `/about` — origin narrative and values `[P2]`

§9 calls for "a short origin narrative, then a values block" after the four expanded Why TRAIN reasons.

- **Origin narrative** — why TRAIN was built this way. Roughly 150–250 words. §14's `/about` H1 sets the frame: "WE'RE NOT AN AGENCY. WE'RE A ROUTE TO EXECUTION."
- **Values block** — count not specified; 3–4 values, each a short name plus one sentence.

§9 also states: no stock team photos and no fabricated staff. Team imagery stays a `TODO` placeholder block until real assets exist.

---

## 4. `/how-it-works#network` — three process blocks `[P2]`

§9 requires three concrete blocks after the coordination diagram:

1. **How a project is scoped**
2. **How specialists are selected**
3. **Who the client actually deals with**

This is flagged in §9 as the site's most important credibility passage: *"the claim 'you don't need five different people' structurally also describes a freelancer marketplace — the difference has to be shown here through named process and visible accountability, not asserted."*

Generic process copy will actively undermine the positioning here. This needs real detail — named roles, real timings, an actual accountability structure.

Roughly 80–120 words each.

---

## 5. Smaller placeholders `[P1]` / `[P2]`

| Item | Where | Pass | Note |
| --- | --- | --- | --- |
| TRAIN logo file | `components/ui/Logo.tsx` | P1 | §4 supplies no logo. An inline SVG wordmark is built to spec as a stand-in. |
| Social URLs | `data/site.ts`, Footer | P1 | §6 names LinkedIn; no URLs given for it or any other platform. |
| Registered address, company number | JSON-LD `Organization`, footer | P2 | Needed for the §13 structured data and likely for UK legal compliance. |
| Canonical base URL | `sitemap.ts`, `robots.ts`, metadata | P2 | Held in `NEXT_PUBLIC_SITE_URL`; a placeholder default is used until the real domain is confirmed. |
| Meta descriptions × 9 routes | `generateMetadata` | P2 | §13 wants 150–160 characters each. Can be drafted from §14's supplied leads rather than written from scratch — confirm that is acceptable. |
| Privacy and cookies copy | `/privacy`, `/cookies` | P2 | §9 marks these `TODO: legal copy`. UK GDPR applies; this should come from a solicitor, not from us. |
| Real photography | All `PlaceholderImage` instances | P2 | Picsum grayscale placeholders are deliberate per D10, seeded so they stay stable. Swapping in real assets is a data-layer change only. |

---

## 6. Capability summaries — 4 items `[P2]`

Found while building the data layer. §10's `Capability` type has a `summary` field and §9 requires "a paragraph" per capability on `/what-we-do`, but §14 supplies only the capability names and their service lists. No paragraph exists for any of the four.

Roughly 40–70 words each. What the capability actually covers and when a client needs it.

| Capability | Summary |
| --- | --- |
| Creative | |
| Digital & IT | |
| Marketing & content | |
| Business support | |

---

## 7. Engine stage paragraphs — 4 items `[P2]`

§14 supplies one line for each engine stage. §9 requires `/how-it-works` to render "nine expandable rows — stage name plus one paragraph each", and the five client stages each have a full paragraph in §14 while the four engine stages do not.

The supplied line is currently used for both the short and the expanded text, so nothing renders blank. That is a stopgap: on the nine-row list the engine rows will read noticeably thinner than the client ones.

| Stage | Supplied line | Paragraph needed |
| --- | --- | --- |
| Build | Client work builds the capability, the network and the track record. | |
| Generate | That work generates the revenue the business runs on. | |
| Reinvest | A share goes back into skills, apprenticeships and community initiatives. | |
| Attract | Which brings more people and more work into the network. | |

---

## How these are marked in code

Every gap above appears in the codebase as:

```ts
// TODO: [CONTENT-GAPS §1] clarifier not supplied — see CONTENT-GAPS.md
note: '',
```

Searching the repo for `CONTENT-GAPS` returns every outstanding item, so this file and the code cannot drift apart.
