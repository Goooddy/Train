# TRAIN — Website Build Specification

This file is the authoritative spec for the TRAIN website. Read it fully before writing code. Where this file and your defaults disagree, this file wins.

---

## 0. Rules of engagement

**Do:**
- Follow the decisions in §2 exactly. They resolve real ambiguities and are settled.
- Use the copy in §14 verbatim. It is written, approved and final.
- Build mobile-first. Every section at 375px before you widen it.
- Mark every placeholder with a `TODO:` comment.
- Use UK English throughout (colour, organisation, specialise, programme). Currency is £.

**Do not:**
- Add a component library (shadcn, MUI, Chakra, DaisyUI). The entire point of this design is that it does not look templated. Components are hand-built against the tokens in §4.
- Invent replacement copy. If something is missing, insert `TODO:` — do not generate agency filler.
- Add homepage sections. There are nine. Nine is the number.
- Use lorem ipsum anywhere. Real prose is supplied in §10.
- Raise the performance budget in §13 to accommodate an effect. Simplify the effect instead.

---

## 1. What this is

A production-quality, fully responsive marketing website for **TRAIN**, a creative, digital and business solutions brand based in the UK.

TRAIN's positioning is **"One client need. One TRAIN solution."** Businesses bring a problem; TRAIN assembles a specialist network around it across four capabilities — Creative, Digital & IT, Marketing & Content, and Business Support. The site must read as a coordinated partner, not a freelancer marketplace or a list of services.

**The single most important experience goal: the visitor should feel they are moving through TRAIN, not reading about it.** Every structural and motion decision below serves that.

### Scope

| In scope | Out of scope |
| --- | --- |
| All 9 routes, fully responsive | CMS integration |
| Design system: colour, type, spacing, motion | Form submission backend |
| Scroll-driven motion with reduced-motion fallbacks | Analytics account setup |
| Dummy content in typed local data files | Custom brand fonts (placeholder stack used) |
| Client-side form validation + success page | Blog, client portal, e-commerce |
| WCAG 2.1 AA | |

### Definition of done

- Every route renders at 320, 375, 768, 1024, 1440 and 1920px with no horizontal scroll.
- Lighthouse ≥ 90 on Performance, Accessibility, Best Practices and SEO for `/` and `/start`.
- Full keyboard traversal with visible focus on every interactive element.
- All motion disabled under `prefers-reduced-motion`, with nothing hidden or mid-state.
- Site fully readable with JavaScript disabled.

Data files are structured so a CMS can replace them later by swapping the data layer only. No component imports data directly — pages pass it down as props.

---

## 2. Settled decisions

**D1 — The homepage is the entire argument. Every inner page is one homepage section, deepened.** Depth goes sideways into pages, never downward into a longer scroll.

**D2 — Only two elements site-wide are buttons.** The nav's START A PROJECT and the Section 09 close. The other seven section CTAs are large editorial text links with a trailing arrow, set in the display face and part of the layout. Nine competing buttons dilute conversion; seven editorial links read as chapter markers in a story.

**D3 — A persistent progress rail is the train/track metaphor.** A thin vertical rail on the left at ≥1024px showing the nine homepage sections as named stations, advancing on scroll, clickable. A slim top progress bar on mobile. **No literal animated train graphic anywhere.** This one component satisfies the track concept, prevents the page feeling endless, and costs almost nothing in performance.

**D4 — The nine-stage model splits into two labelled halves of one loop.** Nine nodes is unreadable at 375px, and the last three stages describe TRAIN's economics rather than the visitor's experience.

- Homepage §03 shows the **client journey**: DISCOVER → DESIGN → ASSEMBLE → DELIVER → RETAIN.
- Homepage §08 shows the **TRAIN engine**: BUILD → GENERATE → REINVEST, feeding back into ATTRACT.
- `/how-it-works` renders the complete nine as one closed loop.

This makes §08's headline — *clients fund the business, the business funds the mission* — literal rather than rhetorical.

**D5 — The network is not its own page.** It is the second half of `/how-it-works`, anchored at `#network`.

**D6 — §02's CTA is an in-page anchor.** "SEE HOW TRAIN SOLVES IT" means "keep reading" — it scrolls to `#how-train-works`.

**D7 — `/mission` gets its own conversion path.** It attracts talent, partners and community, not clients. It closes with an expression-of-interest link to `/contact?subject=mission`, **not** the project enquiry form.

**D8 — Motion is tiered and budgeted.** See §11.

**D9 — Yellow is never text on a light background.** Yellow-on-cream fails contrast (1.4:1). Yellow is a fill, a block, a rule, or text on black. See §4.

**D10 — Photography is Picsum grayscale placeholders.** Deterministic seeds, black-and-white by default, which matches the intended image direction. See §10.

---

## 3. Stack and setup

```bash
npx create-next-app@latest train-website --typescript --tailwind --app --src-dir --eslint
cd train-website
npm i gsap lenis react-hook-form zod @hookform/resolvers lucide-react clsx tailwind-merge
```

| Concern | Choice |
| --- | --- |
| Framework | Next.js 14+, App Router, TypeScript strict |
| Styling | Tailwind + CSS custom properties for brand tokens |
| Scroll motion | GSAP + ScrollTrigger |
| Smooth scroll | Lenis |
| Icons | Lucide React — arrows and UI only, no decorative icon soup |
| Fonts | `next/font/google` (see §4) |
| Forms | React Hook Form + Zod |
| Images | `next/image` |

`next.config.js` needs:

```js
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'picsum.photos' }],
}
```

### Structure

```
src/
  app/
    layout.tsx              fonts, metadata, Nav, Footer, SmoothScroll
    page.tsx                homepage — composes the nine sections
    styleguide/page.tsx     every token, type style and component state
    what-we-do/page.tsx
    how-it-works/page.tsx
    work/page.tsx
    work/[slug]/page.tsx
    about/page.tsx
    mission/page.tsx
    start/page.tsx
    start/success/page.tsx
    contact/page.tsx
    privacy/page.tsx
    cookies/page.tsx
    not-found.tsx
    sitemap.ts
    robots.ts
  components/
    layout/    Nav, MobileMenu, Footer, ProgressRail, SmoothScroll
    ui/        EditorialCTA, Button, SectionShell, Eyebrow, Logo, PlaceholderImage
    home/      Hero, Problem, Model, Capabilities, Network, Work, WhyTrain, Mission, FinalCTA
    work/      CaseCard, CaseHero, CaseSection, WorkFilter
    forms/     ProjectEnquiryForm, ContactForm
    motion/    Reveal, StaggerGroup, useReducedMotion
  data/
    site.ts, capabilities.ts, model-stages.ts, case-studies.ts, network.ts, mission.ts
  lib/
    motion.ts, utils.ts
  styles/
    globals.css
```

Build `/styleguide` early — it makes review dramatically faster. Delete it before launch.

---

## 4. Design tokens

### Colour

```css
:root {
  --train-black:    #0A0A0A;
  --train-cream:    #F4F1EA;
  --train-red:      #B3221E;
  --train-yellow:   #F5C518;
  --train-grey-700: #4A4A4A;
  --train-grey-300: #D6D2C8;
}
```

**Approved pairings — use only these:**

| Foreground | Background | Ratio | Use |
| --- | --- | --- | --- |
| Black | Cream | 16.8:1 | Default body and headings |
| Cream | Black | 16.8:1 | Dark sections, hero |
| Cream | Red | 7.1:1 | Red emphasis blocks, primary button |
| Yellow | Black | 12.1:1 | Accent text on dark only |
| Black | Yellow | 12.1:1 | Yellow highlight blocks |
| Grey-700 | Cream | 8.2:1 | Secondary body text |

**Forbidden:** yellow on cream (1.4:1), yellow on red (2.3:1), red on black (2.4:1), grey-300 as text at any size. Put this list as a comment block at the top of `globals.css`.

### Typography

Two faces, both from Google Fonts via `next/font/google`, both swappable when real brand files arrive.

- **Display** — `Archivo` with `width: 125` variable axis (Archivo Expanded), weights 700–900. Wide, high-contrast, editorial at scale. Every headline above 32px, plus the editorial CTAs.
- **Text** — `Montserrat`, weights 400/500/600. Body, UI, labels, form fields.

| Style | Size | Face / weight | Tracking | Line height |
| --- | --- | --- | --- | --- |
| Hero | `clamp(3rem, 9vw, 8.5rem)` | Display 900 | `-0.03em` | `0.92` |
| Section H2 | `clamp(2.25rem, 5.5vw, 5rem)` | Display 800 | `-0.02em` | `0.98` |
| H3 | `clamp(1.5rem, 2.5vw, 2.25rem)` | Display 700 | `-0.01em` | `1.1` |
| Body large | `clamp(1.125rem, 1.6vw, 1.5rem)` | Text 400 | `0` | `1.5` |
| Body | `1.0625rem` | Text 400 | `0` | `1.55` |
| Eyebrow | `0.75rem` | Text 600 uppercase | `0.18em` | `1.2` |
| CTA | `clamp(1rem, 1.8vw, 1.5rem)` | Display 700 uppercase | `0.04em` | `1.2` |

**Headlines are written in sentence case in markup and rendered uppercase via `text-transform`.** Never type capitals into markup — screen readers spell them out letter by letter.

### Logo

No logo file supplied. Build `components/ui/Logo.tsx` as an inline SVG wordmark: **TRAIN** in Display 900, letter-spacing `0.08em`, with a 2px horizontal rule running the full width beneath it — a track line. Use `currentColor` throughout so it inverts on dark surfaces. Mark `TODO: replace with supplied TRAIN logo`.

### Spacing and grid

8px base scale. 12-column grid, 24px gutters, max content width 1440px.

Page gutters: 20px mobile · 32px sm · 40px md · 64px lg · 80px xl.
Section vertical rhythm: `clamp(6rem, 12vh, 11rem)` top and bottom.

Full-bleed sections break the grid deliberately. Text never does.

---

## 5. Sitemap and routing

| Route | Purpose | Nav label |
| --- | --- | --- |
| `/` | The nine-section narrative | TRAIN |
| `/what-we-do` | §04 deepened — four capabilities | WHAT WE DO |
| `/how-it-works` | §03 + §05 deepened — model, then network | HOW IT WORKS |
| `/work` | §06 deepened — case study index | WORK |
| `/work/[slug]` | Problem → Approach → Execution → Outcome | — |
| `/about` | §07 deepened — why TRAIN | ABOUT |
| `/mission` | §08 deepened — purpose and initiatives | MISSION |
| `/start` | Project enquiry form | *(nav button)* |
| `/start/success` | Enquiry confirmation | — |
| `/contact` | General contact | *(footer only)* |
| `/privacy`, `/cookies` | Legal stubs | *(footer only)* |
| `not-found` | 404 | — |

### CTA destination map

| Section | CTA | Destination | Style |
| --- | --- | --- | --- |
| 01 Hero | START A CONVERSATION → | `/start` | Editorial link |
| 02 The Problem | SEE HOW TRAIN SOLVES IT → | `#how-train-works` | Editorial link |
| 03 How TRAIN Works | EXPLORE THE TRAIN MODEL → | `/how-it-works` | Editorial link |
| 04 What TRAIN Does | EXPLORE OUR CAPABILITIES → | `/what-we-do` | Editorial link |
| 05 The Network | MEET THE NETWORK → | `/how-it-works#network` | Editorial link |
| 06 Work / Proof | VIEW OUR WORK → | `/work` | Editorial link |
| 07 Why TRAIN | WHY WORK WITH TRAIN → | `/about` | Editorial link |
| 08 Mission | DISCOVER THE MISSION → | `/mission` | Editorial link |
| 09 Final CTA | START A PROJECT → | `/start` | **Button** |
| Nav (all pages) | START A PROJECT | `/start` | **Button** |

Section ids in order: `hero`, `the-problem`, `how-train-works`, `what-train-does`, `the-network`, `work`, `why-train`, `mission`, `start`.

All anchor targets need `scroll-margin-top: 120px` so the fixed nav does not cover the heading.

---

## 6. Global components

### Nav

Fixed, full width. Transparent over the hero; gains a cream background and a 1px grey-300 bottom hairline once scrolled past 80vh. Logo left, six links centre-right, START A PROJECT button far right (red background, cream text).

Height 72px mobile / 88px desktop. Active route marked with a 2px yellow underline. Hides on scroll down, reappears on scroll up, threshold 12px so it does not flicker.

**Mobile (<1024px):** logo, hamburger, and the button collapsed to a compact "START" pill. Menu opens as a full-screen black overlay, cream links stacked at `clamp(2rem, 8vw, 3rem)`, staggered in at 40ms intervals. Must trap focus, close on Escape, restore focus to the trigger, and lock body scroll while open.

### ProgressRail — the signature component

Homepage only.

**Desktop (≥1024px):** fixed to the left gutter, vertically centred. A 1px grey-300 vertical line 320px tall with nine station dots spaced evenly along it. Default dot 6px grey-300; active dot 10px filled yellow with its section name appearing to the right in eyebrow style. A deep red fill line grows down the rail in proportion to scroll progress. Dots are `<button>`s that scroll to their section.

**Mobile (<1024px):** a 2px progress bar pinned directly under the nav, filling red left-to-right with scroll. No dots, no labels.

Driven by **one** `IntersectionObserver` over the nine section ids plus a single `requestAnimationFrame`-throttled scroll listener. No per-frame layout reads. The decorative line is `aria-hidden`; buttons carry `aria-label="Go to {section name}"`. Under reduced motion the rail still tracks position, but transitions are instant.

### EditorialCTA

The seven non-button CTAs. Display face, uppercase, `clamp(1rem, 1.8vw, 1.5rem)`, tracking `0.04em`, arrow `→` as a separate span.

- Rest: text plus a 1px underline at 40% opacity.
- Hover: underline to 100%, sweeping left-to-right over 280ms; arrow translates 8px right.
- Focus-visible: 2px yellow outline, 4px offset.
- **Touch devices: underline sits at 100% by default**, since hover never fires.

Props: `href`, `label`, `variant: 'light' | 'dark'`. Renders `<Link>` for routes, a smooth-scroll handler for anchors.

### Button

Only two instances site-wide. Red background, cream text, **zero border radius**, 20px × 40px padding, Display 700 uppercase. Hover: black background, 180ms. Focus-visible: 2px yellow outline, 3px offset. On the red §09 surface, invert to black background with cream text.

### SectionShell

Wrapper enforcing vertical rhythm, section `id`, max-width, gutters and surface variant. Every homepage section uses it so spacing cannot drift.

Props: `id`, `surface: 'cream' | 'black' | 'red'`, `eyebrow?`, `children`.

### Footer

Black surface. Above the columns, a full-width editorial strip: **WHAT ARE YOU TRYING TO BUILD?** with the START A PROJECT link — so conversion exists on every page.

Four columns on desktop, stacked on mobile:
1. Wordmark + "One client need. One coordinated solution. From first hello to lasting impact."
2. The six nav routes
3. `hello@train.co.uk` and a link to `/contact`
4. Social links including LinkedIn (`TODO:` real URLs)

Bottom bar: `© 2026 TRAIN` · `/privacy` · `/cookies`.

### SmoothScroll

Lenis provider in the root layout. `lerp: 0.1`, `duration: 1.2`. **Destroyed entirely when `prefers-reduced-motion: reduce` is set**, falling back to native scrolling. Must not break anchor links or browser back-navigation scroll restoration.

---

## 7. Homepage — sections 01 to 05

Surfaces alternate to enforce visual distinctness:
**black · cream · black · cream · RED · cream · black · cream · RED**

The two red sections are the Network and the Final CTA — the turn and the close.

### 01 — Hero · `#hero` · black

Full viewport height using `100svh` (**never `100vh`** — iOS Safari puts it under the browser chrome).

Headline at hero scale, cream, breaking to three commanding lines at desktop. Supporting copy below at body-large in grey-300 on black, max 52ch. EditorialCTA beneath.

Background: full-bleed grayscale photograph at 35% opacity over black, scaling from 1.08 to 1.0 over 1.6s on load. A yellow 2px horizontal rule enters from the left across the full width at 800ms — the track line.

Headline animates as three masked lines, each translated up 100%, 90ms stagger, 900ms duration, `power3.out`. A small scroll indicator sits bottom-left and fades after the first 120px of scroll.

**This is the LCP element.** Priority-loaded, under 200KB.

### 02 — The Problem · `#the-problem` · cream

Deliberately sparse. Two columns at desktop: headline left, supporting paragraph right, offset 120px lower for asymmetry. Single column stacked on mobile.

**Attention mechanism:** the headline splits across two lines, the second ("EXECUTION USUALLY IS.") set in red. As the section enters view, a yellow block wipes horizontally behind the word "EXECUTION" over 500ms, then the text colour flips to black. One effect, high impact.

### 03 — How TRAIN Works · `#how-train-works` · black

Five client stages (D4): DISCOVER → DESIGN → ASSEMBLE → DELIVER → RETAIN.

**Desktop:** a horizontal track across the full width. A 1px cream line at 30% opacity with five nodes. Each node is a 12px yellow-outlined circle with the stage name below in eyebrow style and a one-line description beneath. On entering view, a red line draws left-to-right along the track over 1.4s, filling each node solid yellow as it passes.

Each node is a `<button>` that expands its full description inline — accordion behaviour, one open at a time, 240ms transition using `grid-template-rows: 0fr → 1fr`.

**Mobile:** the track rotates vertical. Line runs down the left at 24px, nodes stacked with descriptions to the right, drawing top-to-bottom.

### 04 — What TRAIN Does · `#what-train-does` · cream

Four capability cards, 2×2 grid at desktop, single column on mobile.

Each card: capability name in H3 display, services list in body text, and a large numeral (01–04) in yellow at 6rem positioned top-right and clipped by the card edge.

Hover: card surface cream → black over 220ms, text inverts to cream, numeral goes red, and a `→` slides in bottom-right. Cards link to `/what-we-do#{slug}`.

**On touch, render the first card in its black state by default** so the interaction is discoverable. Card heights equal via CSS grid, never JavaScript measurement.

### 05 — The Network · `#the-network` · RED

The argument's turning point. The only red section before the close.

Headline cream on red. Body copy beneath.

**Attention mechanism — animated coordination diagram.** Inline SVG with GSAP-animated stroke paths:

```
CLIENT → TRAIN → [Creative · Digital & IT · Marketing · Business Support] → COORDINATED DELIVERY
```

Sequence: line draws CLIENT→TRAIN (400ms), then TRAIN fans out to all four simultaneously (600ms), then all four converge (600ms). Nodes scale 0.8 → 1.0 as their line arrives. Plays once on entering view.

**Mobile:** same diagram rotated to a vertical flow via a switched `viewBox` at 768px. **Do not scale the desktop SVG down** — labels become unreadable.

Under reduced motion, renders complete and static. Gets `role="img"` and an `aria-label` describing the relationship in words.

---

## 8. Homepage — sections 06 to 09

### 06 — Work / Proof · `#work` · cream

The conversion section. Must not look thin.

Three featured case studies in an editorial stack, **not a uniform grid**. Alternating layout: odd items image-left / text-right, even reversed. Each shows a 4:3 image, client name in eyebrow style, project title in H3, a one-line outcome, and capability tags.

Images sit in an `overflow: hidden` container with the inner image at scale 1.05 translating to 1.0 through the section — roughly 40px of parallax. Subtle. On hover, image scales to 1.03 over 400ms and a yellow rule draws under the title.

Whole item links to `/work/{slug}`.

**Mobile:** single column, image above text, parallax off.

### 07 — Why TRAIN · `#why-train` · black

Four reasons revealed progressively.

Each is a full-width row separated by a 1px cream hairline at 20% opacity: title in H3 display cream left, explanation in body grey-300 right. Each row fades and translates up 24px on entering view, 120ms stagger between rows.

**Mobile:** title above explanation, hairlines retained.

### 08 — Mission · `#mission` · cream

The register shifts — more story-led, less systematic. Larger type, more whitespace, one photograph rather than a diagram grid.

Beneath the headline, the TRAIN engine loop (D4) as a compact inline SVG drawn as a **closed circle**, not a line:

```
ATTRACT → BUILD → GENERATE → REINVEST → (back to ATTRACT)
```

This is what makes the headline literal instead of rhetorical. Draws once on entering view over 1.2s, then holds. Reduced motion renders it complete.

**Mobile:** compact vertical cycle.

### 09 — Final CTA · `#start` · RED

Simple, confident, high-impact. Nothing competing for attention.

Full viewport height at desktop, `70svh` mobile. Headline at hero scale, cream on red, centred, max 16 characters per line. Supporting line beneath at body-large. The START A PROJECT **button** below — black background, cream text.

The only motion is the headline masking up over 900ms. **Resist adding anything else.**

---

## 9. Inner pages

Every inner page shares one structure: a page hero (eyebrow, H1, one-line lead, ~50svh), the body, and a closing CTA band. **No progress rail** — that is homepage only.

### `/what-we-do`

Four full-width capability sections alternating cream and black, anchored at `#creative`, `#digital-it`, `#marketing-content`, `#business-support` so the homepage cards deep-link correctly.

Each: large numeral, capability name at H2, a paragraph, and the services as a two-column list. **Each service gets a 4–8 word clarifier** rather than standing alone — a bare service list reads as padding.

Closes with the network argument in one line and a CTA to `/how-it-works`.

### `/how-it-works`

**Part one — the model.** The complete nine-stage loop (D4) as a closed circular SVG at desktop, a vertical list at mobile. Five client stages yellow-filled, three engine stages red-outlined, ATTRACT at the junction. Below it, nine expandable rows — stage name plus one paragraph each. First row open by default.

**Part two — the network** at `#network`. The coordination diagram from §05 at larger scale, then three concrete blocks: how a project is scoped, how specialists are selected, and who the client actually deals with.

This is the site's most important page for credibility. The claim "you don't need five different people" structurally also describes a freelancer marketplace — the difference has to be *shown* here through named process and visible accountability, not asserted.

### `/work` and `/work/[slug]`

**Index:** a filter row (All · Creative · Digital & IT · Marketing & Content · Business Support) filtering client-side on capability tags, with `aria-pressed` on the active filter and a polite `aria-live` region announcing the result count. Below, a two-column grid alternating 4:3 and 3:4 aspect ratios across six case studies.

**Detail:** `generateStaticParams` from `case-studies.ts`, `generateMetadata` per case. Structure:

1. Hero — client, title, capability tags, full-bleed image
2. At a glance — small table: client, sector, capabilities, timeline
3. THE PROBLEM
4. THE APPROACH
5. THE EXECUTION — with a two-image gallery
6. THE OUTCOME — three metric figures at display scale
7. Next case study link, then the CTA band

Section headings uppercase display, left-aligned, preceded by a yellow rule. Body text max 68ch.

### `/about`

The four Why TRAIN reasons expanded into full sections, then a short origin narrative, then a values block. **No stock team photos and no fabricated staff** — placeholder blocks marked `TODO`.

### `/mission`

More editorial, less systematic. Engine loop at full scale, mission narrative, three initiative cards with a status tag (Active / In development / Planned). Closes with its own CTA (D7) linking to `/contact?subject=mission`.

### `/start`

Two columns at desktop: form left, reassurance right. Single column mobile, reassurance below the form.

| Field | Type | Validation |
| --- | --- | --- |
| Name | text | required, 2–80 chars |
| Company | text | optional |
| Email | email | required, RFC-valid |
| What are you trying to build? | textarea | required, 10–1000 chars |
| What do you need help with? | checkbox group, 4 capabilities | at least one |
| Budget range | select | optional, labelled optional |
| Timeline | select | required |

Budget options: Under £5k · £5k–£15k · £15k–£50k · £50k+ · Not sure yet
Timeline options: ASAP · 1–3 months · 3–6 months · Just exploring

Validation on blur then on submit. Errors below each field in red with `aria-describedby` and `aria-invalid`; focus moves to the first error on failed submit. On submit, log to console and route to `/start/success` — **a real page, not a toast**, because it is the analytics goal and the sender's receipt. Include a honeypot field and a `TODO:` marking where the server action goes.

### `/contact`

Name, email, subject (pre-fillable from `?subject=`), message. Plus email address, LinkedIn and response-time expectation.

### `/privacy` and `/cookies`

Real routes with placeholder content marked `TODO: legal copy`. Include a minimal cookie-consent banner component, dormant until analytics arrives. TRAIN is UK-based, so UK GDPR applies.

### `not-found`

Black surface. Links back to the homepage and to `/work`.

---

## 10. Data and content

All content lives in typed files under `src/data`. Every dummy value carries a `TODO:` comment.

### Types

```ts
export type CapabilitySlug =
  | 'creative' | 'digital-it' | 'marketing-content' | 'business-support';

export interface Capability {
  slug: CapabilitySlug;
  number: string;          // '01'
  name: string;            // 'CREATIVE'
  summary: string;
  services: { name: string; note: string }[];
}

export interface ModelStage {
  slug: string;
  name: string;            // 'DISCOVER'
  phase: 'client' | 'engine';
  short: string;           // one line, shown on the track
  detail: string;          // paragraph, shown when expanded
}

export interface ImageRef {
  seed: string;            // picsum seed
  alt: string;
  width: number;
  height: number;
}

export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  sector: string;
  timeline: string;
  capabilities: CapabilitySlug[];
  featured: boolean;
  order: number;
  heroImage: ImageRef;
  outcomeLine: string;
  problem: string;
  approach: string;
  execution: string;
  gallery: ImageRef[];     // exactly 2
  outcome: string;
  metrics: { value: string; label: string }[];  // exactly 3
}
```

### Images — PlaceholderImage component

Build `components/ui/PlaceholderImage.tsx` wrapping `next/image` with:

```
https://picsum.photos/seed/{seed}/{width}/{height}?grayscale
```

Deterministic per seed, black-and-white by default, which matches the intended image direction (industrial, hands, movement, strong cut-outs). Every instance needs correct `width`/`height` so there is no layout shift, and real `alt` text written now — not left as a TODO.

Seeds to use: `train-hero`, `train-mission`, `train-about`, and `case-{slug}-hero`, `case-{slug}-1`, `case-{slug}-2` for each case study.

### Six case studies

Three are `featured: true` and appear on the homepage: Northfield Bakery, Orbit Logistics, Saltmarsh Studio.

---

**1. `northfield-bakery` — Northfield Bakery** · Food & retail · Creative, Marketing · 10 weeks · featured
*Title:* A local bakery that needed to look like one worth travelling for
*Outcome line:* Three times the weekend footfall, from the same two shopfronts.
- **Problem:** Two shops, a loyal local following, and nothing that travelled beyond a half-mile radius. The branding had been assembled piece by piece over nine years and no two touchpoints matched. Photography was phone-shot and inconsistent.
- **Approach:** We treated it as one identity problem, not a series of design jobs. Before any visual work, we spent a week in both shops working out what regulars actually valued — which turned out to be the early-morning bake, not the product range.
- **Execution:** A rebuilt identity system, a full photography shoot across both sites at 5am, and a twelve-week social content plan the team could run themselves. Packaging, signage and print were redrawn against the same system.
- **Outcome:** Weekend footfall tripled within four months. More usefully, the team now produces its own content against a system that holds together without us.
- **Metrics:** `3×` weekend footfall · `4 months` to measurable change · `2 sites` brought onto one system

**2. `orbit-logistics` — Orbit Logistics** · Logistics · Digital & IT, Business Support · 16 weeks · featured
*Title:* Replacing a spreadsheet that fourteen people depended on
*Outcome line:* Eleven hours a week returned to the operations team.
- **Problem:** Scheduling ran on a single shared spreadsheet that only two people fully understood. Errors were caught late, usually by a driver. Growth had made the workaround into the bottleneck.
- **Approach:** We mapped the real process rather than the documented one. The gap between them was the actual brief. We then designed the smallest system that could replace the spreadsheet without requiring anyone to change how they worked on day one.
- **Execution:** A scheduling tool built around the existing process, a two-week parallel run alongside the spreadsheet, and hands-on training for all fourteen users. Business support stayed on for a month after handover.
- **Outcome:** Eleven hours a week returned to the operations team, and scheduling errors are now caught before dispatch rather than after.
- **Metrics:** `11 hrs` returned weekly · `14 users` migrated with no downtime · `0` scheduling errors reaching drivers

**3. `saltmarsh-studio` — Saltmarsh Studio** · Architecture · Creative, Digital & IT · 12 weeks · featured
*Title:* A portfolio that finally matched the work in it
*Outcome line:* Enquiry quality changed before enquiry volume did.
- **Problem:** Exceptional built work presented through a template site that flattened all of it. The practice was losing pitches to studios doing less interesting work but presenting it far better.
- **Approach:** The problem was sequencing, not styling. We restructured around how the practice actually talks about a project — site, constraint, decision, result — rather than around a gallery of finished photographs.
- **Execution:** A new identity, a full site rebuild with a project structure the team can extend themselves, and art direction for a reshoot of six key projects.
- **Outcome:** Enquiry quality changed before volume did. Within a quarter the practice was being approached for the kind of work it wanted rather than the kind it could get.
- **Metrics:** `6 projects` restructured and reshot · `1 quarter` to changed enquiry quality · `2×` average project value

**4. `bramble-wellbeing` — Bramble Wellbeing** · Health · Marketing, Creative · 8 weeks
*Title:* Saying less, to more people
*Outcome line:* Half the output, four times the reach.
- **Problem:** Posting daily across four platforms with almost nothing to show for it. The content was well-made and completely undifferentiated.
- **Approach:** We cut the platforms from four to two and the posting rate by half, then spent the recovered time on a single recognisable format.
- **Execution:** A content system built around one repeatable format, a shoot producing eight weeks of assets in two days, and a handover so the team could run it without external support.
- **Outcome:** Reach quadrupled on half the output. The format is now the thing people recognise the brand by.
- **Metrics:** `4×` reach · `50%` less output · `2 days` of shooting for 8 weeks of content

**5. `kite-recruitment` — Kite Recruitment** · Recruitment · Digital & IT, Marketing · 14 weeks
*Title:* Fixing the part of the funnel nobody was looking at
*Outcome line:* Application completion went from 31% to 78%.
- **Problem:** Strong traffic, strong brand recognition, and a catastrophic drop-off at the application stage. Every assumption pointed at marketing; none of them were right.
- **Approach:** We instrumented the funnel before proposing anything. The drop-off was concentrated in a single form step that had been added eighteen months earlier and never reviewed.
- **Execution:** A rebuilt application flow, a rewritten set of role pages, and a reporting dashboard so the team can see the funnel without asking anyone.
- **Outcome:** Application completion went from 31% to 78%. No additional traffic was bought.
- **Metrics:** `31% → 78%` application completion · `0` extra spend on traffic · `1 step` removed

**6. `harbour-legal` — Harbour Legal** · Professional services · Business Support, Digital & IT · 20 weeks
*Title:* Administrative load, handled properly
*Outcome line:* Two fee earners stopped doing administration.
- **Problem:** A six-person practice where two fee earners were spending roughly a day a week each on client onboarding, filing and scheduling. Hiring was the assumed answer.
- **Approach:** We costed the hire against fixing the process, then did the second. Most of the load came from three tasks, all of which were either automatable or genuinely delegable.
- **Execution:** A documented onboarding process, a client intake system, and ongoing virtual assistance covering the residue that could not be automated.
- **Outcome:** Two fee earners stopped doing administration. The hire was deferred indefinitely and the practice took on two additional clients within the same headcount.
- **Metrics:** `2 days` returned weekly · `1 hire` deferred · `+2 clients` at the same headcount

---

## 11. Motion

### Tiers

**Tier 1 — always runs.** Text reveals, fades, staggers, progress rail, hover states, nav show/hide. **Transform and opacity only.**

**Tier 2 — ≥1024px and no `prefers-reduced-motion`.** §03 track draw, §05 network diagram, §06 image parallax, §08 engine loop, case-study transitions.

Below 1024px, Tier 2 effects render in their **completed** state — track fully drawn, diagram fully connected. Never simply hidden: the information they carry is part of the argument.

### Shared values — `lib/motion.ts`

| Token | Value | Use |
| --- | --- | --- |
| `dur.fast` | 180ms | Hover, focus, colour change |
| `dur.base` | 400ms | Card states, accordions |
| `dur.slow` | 900ms | Headline reveals |
| `dur.draw` | 1400ms | Track and diagram draws |
| `ease.out` | `power3.out` | Entrances |
| `ease.inOut` | `power2.inOut` | State changes |
| `stagger.tight` | 60ms | Within a group |
| `stagger.loose` | 120ms | Between rows |

Import these everywhere. Ad-hoc durations scattered through components are how a site stops feeling coherent.

### Rules

1. Reveals trigger at 75% viewport height and play **once** — `toggleActions: 'play none none none'`. Elements that re-animate on every scroll-past feel cheap and fight the reading.
2. Animate `transform` and `opacity` only. No animated `top`, `height`, `width`, `margin` or `box-shadow`. Accordions use `grid-template-rows: 0fr → 1fr`.
3. `will-change` applied immediately before an animation, removed on completion. Never left in CSS.
4. Every ScrollTrigger killed in effect cleanup. Refresh on resize, debounced 150ms.
5. Nothing animates above the fold except the hero's own entrance. No scroll-triggered effect may delay LCP.
6. No parallax on mobile, ever.

### Reduced motion

`useReducedMotion()` reads `prefers-reduced-motion: reduce` and is checked by every motion component. When set: Lenis destroyed, all GSAP timelines skipped with elements set to final state, SVG draws render complete, CSS transitions capped at 0.01ms globally. **The site must be fully usable and fully legible — nothing hidden, nothing mid-animation.**

### No JavaScript

Every section readable with JS disabled. Reveal wrappers default to `opacity: 1` in CSS and are set to `0` by JavaScript on mount before animating in.

**Do not author them as `opacity: 0` in the stylesheet.** That is the single most common way a motion-heavy site becomes a blank page for crawlers and for anyone whose script fails to load.

---

## 12. Responsive

Mobile-first. Build each section at 375px first, then widen.

| Breakpoint | Width | Layout |
| --- | --- | --- |
| base | 320–639 | Single column, 20px gutters, hamburger, mobile rail bar |
| sm | 640–767 | Single column, 32px gutters |
| md | 768–1023 | Two columns where useful, 40px gutters, still hamburger |
| lg | 1024–1279 | Full desktop, vertical rail appears, 64px gutters |
| xl | 1280+ | Max width 1440px centred, 80px gutters |

**1024px is the meaningful threshold** — it switches the nav, the rail and Tier 2 motion together.

| Section | Mobile treatment |
| --- | --- |
| 01 Hero | `100svh`, headline to 4–5 lines, image focal point centred |
| 02 Problem | Stacked, asymmetric offset removed, yellow wipe retained |
| 03 Model | Track vertical, line at 24px left, stages stacked |
| 04 Capabilities | Single column, first card pre-inverted |
| 05 Network | Vertical diagram via switched viewBox |
| 06 Work | Single column, image above text, parallax off |
| 07 Why TRAIN | Title above explanation, hairlines kept |
| 08 Mission | Loop to compact vertical cycle |
| 09 Final CTA | `70svh`, headline to 5 lines |
| Nav | Hamburger → full-screen overlay, focus-trapped |
| Rail | 2px top progress bar |

**Rules:**
- Every interactive target at least 44×44px. Rail dots need an invisible expanded hit area on touch.
- No horizontal overflow at any width. The full-bleed SVG diagrams are the likely culprit — test at 320px specifically.
- Use `svh`/`dvh`, never `vh`, for anything full-height.
- Type scales via `clamp()`, so there are no font-size jumps at breakpoints.
- **Every hover state needs a touch equivalent, or the content it reveals must be visible by default.** Capability cards and case study items both depend on hover at desktop — neither may hide information on touch.

---

## 13. Performance, accessibility, SEO

### Performance budget — hard limits

| Metric | Budget |
| --- | --- |
| LCP | under 2.5s on simulated 4G |
| CLS | under 0.1 |
| INP | under 200ms |
| First-load JS | under 200KB gzipped |
| Hero image | under 200KB |
| Any other image | under 150KB |
| Total homepage weight | under 1.5MB |
| Lighthouse Performance | 90+ mobile |

How to hold it: `next/image` throughout; `priority` on the hero only, everything else lazy; explicit dimensions on every image; **GSAP imported per-plugin, never the full bundle**; below-fold section components dynamically imported; fonts subset to `latin` with `display: swap`; no third-party scripts in this build.

### Accessibility — WCAG 2.1 AA

- One `h1` per page, headings in order, no levels skipped for styling.
- Landmarks: `header`, `nav`, `main`, `footer`. Skip link to `#main` as the first focusable element.
- Visible focus everywhere: 2px yellow outline, 3px offset. Never remove an outline without replacing it.
- Decorative SVGs `aria-hidden`. Informative ones — the model and network diagrams — get `role="img"` plus an `aria-label` describing the relationship in words.
- Uppercase applied with `text-transform`, never typed into markup.
- Real `label` elements, not placeholders acting as labels. Errors use `aria-describedby` and `aria-invalid`.
- Accordions use `button` with `aria-expanded` and `aria-controls`.
- Work filter uses `aria-pressed` plus a polite `aria-live` region announcing the count.
- Mobile menu traps focus, closes on Escape, returns focus to the trigger.
- Colour is never the only carrier of meaning — capability tags need text.

### SEO

- `generateMetadata` on every route: unique title `Page · TRAIN`, 150–160 character description, canonical, OG and Twitter tags.
- One OG image at 1200×630 via `next/og`: black background, wordmark, page title in the display face.
- `sitemap.ts` and `robots.ts` at the app root.
- JSON-LD: `Organization` on `/`, `Service` on `/what-we-do`, `CreativeWork` on each case study.
- `lang="en-GB"` on `html`.

---

## 14. Copy deck

**Use verbatim.** This copy is final.

Voice: confident, intelligent, helpful, solution-focused, creative, human, ambitious.
Banned: corporate jargon, generic claims, walls of text, service-list padding, overpromising, anything implying TRAIN is a freelancer marketplace.

### Homepage

**01 Hero**
- H1: IDEAS ARE EVERYWHERE. EXECUTION IS THE DIFFERENCE.
- Lead: Creative, digital, marketing and business support — coordinated around what your business actually needs.
- CTA: START A CONVERSATION →

**02 The Problem**
- H2: YOUR IDEA ISN'T THE PROBLEM. EXECUTION USUALLY IS.
- Body: A great product can still struggle when its brand, website, content, marketing and systems aren't working together. TRAIN brings the right capabilities together to close that gap.
- CTA: SEE HOW TRAIN SOLVES IT →

**03 How TRAIN Works**
- Eyebrow: THE TRAIN MODEL
- H2: ONE CLIENT NEED. ONE TRAIN SOLUTION.
- Lead: Five stages, one point of contact. Here is what actually happens between your first message and the work going live.
- DISCOVER — *short:* Work out the real problem. *detail:* We work out what the problem actually is, which is rarely the one you arrived with. Most briefs describe a symptom. The first conversation is about finding what is causing it.
- DESIGN — *short:* Shape the solution first. *detail:* We shape the solution before anyone builds anything. That means deciding what is in scope, what isn't, and what success looks like — in writing, before work starts.
- ASSEMBLE — *short:* Bring in the right specialists. *detail:* The right specialists are brought onto the project, not the ones who happen to be free. You are told who is working on what and why they were chosen.
- DELIVER — *short:* Coordinated execution. *detail:* Coordinated execution, with one person accountable for all of it. You brief us once. We handle the briefing, scheduling and quality of everyone else.
- RETAIN — *short:* Stay close after launch. *detail:* We stay close enough to keep it working after launch. Most of what fails in a project fails in the three months after it ships, not during it.
- CTA: EXPLORE THE TRAIN MODEL →

**04 What TRAIN Does**
- H2: ONE NETWORK. FOUR CAPABILITIES.
- Lead: Most businesses need more than one of these at once. That is the point.
- 01 CREATIVE — Photography, videography, graphic design, branding, creative direction.
- 02 DIGITAL & IT — Website development, SEO, digital solutions.
- 03 MARKETING & CONTENT — Social media, content creation, marketing, content strategy.
- 04 BUSINESS SUPPORT — Virtual assistance, administrative support, business systems.
- CTA: EXPLORE OUR CAPABILITIES →

**05 The Network**
- H2: YOU DON'T NEED FIVE DIFFERENT PEOPLE.
- Body: TRAIN coordinates a specialist network around each project, giving clients one point of contact from brief to delivery.
- Supporting: You brief us once. We handle the briefing, scheduling and quality of everyone else.
- CTA: MEET THE NETWORK →

**06 Work / Proof**
- H2: IDEAS WE'VE HELPED BECOME REAL.
- Lead: Every project starts as a problem someone could not solve alone.
- CTA: VIEW OUR WORK →

**07 Why TRAIN**
- Eyebrow: WHY TRAIN
- H2: FOUR REASONS THIS WORKS BETTER.
- ONE POINT OF CONTACT — You deal with TRAIN. Not five inboxes, five invoices and five versions of the brief.
- SPECIALIST NETWORK — The right expertise is assembled around the problem, rather than the problem being bent to fit whoever is available.
- CONNECTED THINKING — Creative, digital, marketing and business support are planned together, so they do not contradict each other later.
- FROM IDEA TO IMPACT — We stay focused on execution, and on what the work is still doing for you in a year.
- CTA: WHY WORK WITH TRAIN →

**08 Mission**
- H2: CLIENTS FUND THE BUSINESS. THE BUSINESS FUNDS THE MISSION.
- Body: TRAIN is building towards more than client work — skills, apprenticeships and community initiatives that give people a route into this industry. Commercial work is what makes that possible.
- CTA: DISCOVER THE MISSION →

**09 Final CTA**
- H2: WHAT ARE YOU TRYING TO BUILD?
- Lead: Tell us what you're working on. We'll help you work out what comes next.
- CTA: START A PROJECT →

### Inner page heroes

| Page | H1 | Lead |
| --- | --- | --- |
| `/what-we-do` | FOUR CAPABILITIES. ONE COORDINATED TEAM. | Most problems need more than one of these. You only need to ask once. |
| `/how-it-works` | HOW A PROBLEM BECOMES FINISHED WORK. | The TRAIN model, stage by stage, and who does what at each one. |
| `/work` | IDEAS WE'VE HELPED BECOME REAL. | Problem, approach, execution, outcome. In that order, every time. |
| `/about` | WE'RE NOT AN AGENCY. WE'RE A ROUTE TO EXECUTION. | Why TRAIN is built the way it is. |
| `/mission` | THE BUSINESS IS THE ENGINE. NOT THE DESTINATION. | What TRAIN is building beyond client work. |
| `/start` | TELL US WHAT YOU'RE TRYING TO BUILD. | You don't need to know what you need yet. That's the first conversation. |
| `/contact` | START A CONVERSATION. | Questions, partnerships, or just working out whether we're a fit. |

### Engine stages (§08 and `/how-it-works`)

- BUILD — Client work builds the capability, the network and the track record.
- GENERATE — That work generates the revenue the business runs on.
- REINVEST — A share goes back into skills, apprenticeships and community initiatives.
- ATTRACT — Which brings more people and more work into the network.

### Form microcopy

- Reassurance heading: WHAT HAPPENS NEXT
- Steps: We read it properly, not a bot. · We come back within two working days. · If we're not the right fit, we'll say so and point you somewhere better.
- Submit button: SEND IT →
- Success H1: GOT IT. WE'LL BE IN TOUCH.
- Success body: Your message is with us. Expect a reply within two working days — from a person who has actually read it.
- Error, required: We need this one.
- Error, email: That doesn't look like a working email address.
- Error, capability group: Pick at least one. Not sure? Pick the closest.

### 404

- H1: THIS LINE DOESN'T RUN HERE.
- Body: The page you're after has moved or never existed. Try the homepage, or look at the work.

### Footer

- Definition: One client need. One coordinated solution. From first hello to lasting impact.
- Strip headline: WHAT ARE YOU TRYING TO BUILD?

---

## 15. Build order

This build covers steps 1–6. Inner pages follow in a second pass.

1. **Foundation** — scaffold, tokens in `globals.css`, Tailwind config, fonts, `Logo`, `SectionShell`, `EditorialCTA`, `Button`, `PlaceholderImage`. Build `/styleguide` rendering every token, type style and component state.
2. **Layout** — Nav with mobile overlay, Footer, SmoothScroll provider. **Verify keyboard navigation before going further.**
3. **Data** — all files in `src/data` with the full content from §10. Do this before the sections so you build against real string lengths.
4. **Homepage, static** — all nine sections, correct layout and responsive behaviour, **zero motion**. Stop and review here. If the page does not hold up static, motion will not save it.
5. **ProgressRail** — desktop rail and mobile bar.
6. **Motion** — Tier 1 across the site, then Tier 2. Test reduced-motion after each.

*Second pass:* inner pages, forms, 404, legal stubs, metadata, sitemap, robots, OG images, JSON-LD, full audit.

### Acceptance checklist

- [ ] Every route renders at 320, 375, 768, 1024, 1440, 1920px with no horizontal scroll
- [ ] Lighthouse 90+ on all four categories for `/`
- [ ] All nine homepage sections present, in order, with the exact copy from §14
- [ ] Exactly two buttons site-wide; the other seven CTAs are editorial links (D2)
- [ ] Progress rail tracks and navigates on desktop; bar version on mobile
- [ ] §03 shows five client stages; the full nine appear only on `/how-it-works` (D4)
- [ ] `prefers-reduced-motion` disables all motion with nothing hidden or mid-state
- [ ] Site fully readable with JavaScript disabled
- [ ] Full keyboard traversal with visible focus everywhere
- [ ] No forbidden colour pairing anywhere — yellow never on cream (D9)
- [ ] All six case studies render with the full prose from §10, no lorem
- [ ] Every placeholder carries a `TODO:` comment
- [ ] No console errors or warnings in the production build

---

## 16. Amendments

Six contradictions were found in §4, §7, §8 and §13 during assessment on 2026-09-21 and resolved with the client's approval. **These amendments override the sections they name.** An audit that flags the original wording should consult this section first.

Contrast ratios below were recomputed from the §4 hex values using the WCAG 2.1 relative-luminance formula.

### A1 — The focus ring is surface-aware

§13 mandates "2px yellow outline" for focus everywhere. Yellow `#F5C518` on cream `#F4F1EA` measures **1.5:1**, far below the **3:1** that WCAG 2.1 SC 1.4.11 requires of a focus indicator. Most of the site is cream, so as originally written the site could not meet its own AA target in §1.

The ring colour now follows the surface:

```css
:root { --focus-ring: var(--train-black); }   /* on cream — 17.5:1 */
[data-surface="black"],
[data-surface="red"] { --focus-ring: var(--train-yellow); }
/* yellow on black 12.1:1 · yellow on red 4.1:1 — both clear 3:1 */

:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 3px; }
```

`SectionShell` writes `data-surface` onto its root element, so the ring inverts automatically wherever a section changes surface. Offsets are unchanged from §6: 3px for `Button`, 4px for `EditorialCTA`.

### A2 — The grey-300 ban is scoped to light surfaces

§4 forbids "grey-300 as text at any size", but §7 §01 and §8 §07 both specify grey-300 body copy on black. On black, grey-300 measures **13.1:1** and is entirely correct; on cream it is **1.3:1**.

Restated: **grey-300 is never text on cream. On black it is approved at 13.1:1.**

### A3 — The §04 capability numerals are decoration, not text

§7 §04 specifies the 01–04 numerals in yellow on a cream card (**1.5:1**, which D9 explicitly forbids) turning red on the black hover state (**2.4:1**, which §4's own forbidden list names).

The numerals carry no information the adjacent capability name does not already carry, so they are `aria-hidden` decorative typography:

- Rest, on cream — `--train-grey-300`
- Hover / inverted, on black — `--train-yellow` (12.1:1, which is exactly the use D9 permits)

Red is dropped from the numeral entirely.

### A4 — Red on cream joins the approved pairings

§7 §02 requires "EXECUTION USUALLY IS." in red on cream, but §4's table does not list the pairing. It measures **5.9:1** and passes AA at every text size. Add to the approved table:

| Foreground | Background | Ratio | Use |
| --- | --- | --- | --- |
| Red | Cream | 5.9:1 | §02 emphasis line |

### A5 — The cream-on-red ratio is corrected

§4 states cream on red as 7.1:1. The measured value is **5.9:1**. It still passes AA for all text sizes, so no design changes follow — but the figure is corrected so the table can be trusted.

### A6 — D2 counts `Button` components, not `<button>` elements

"Only two elements site-wide are buttons" means **two instances of the styled `Button` component**: the nav's START A PROJECT and the §09 close. Native `<button>` elements required for behaviour are not counted and do not use `Button`'s styling:

- §03 stage nodes (accordion triggers)
- ProgressRail station dots
- The mobile menu trigger and close
- The `/start` submit, in the second pass

The Footer conversion strip uses `EditorialCTA`, not `Button`. The acceptance checklist item "Exactly two buttons site-wide" is read against this definition.

### A7 — There are eight editorial CTAs, not seven

D2 and the acceptance checklist both say "the other seven CTAs are editorial links". §5's CTA destination map enumerates them, and §14 supplies approved copy for all of them: sections 01 through 08 each carry an editorial CTA, and 09 carries the button. That is **eight** editorial links, not seven.

The enumerated table and the copy deck are the more specific sources, and dropping one would mean deleting approved copy. The build ships eight. Read the checklist item as "exactly two styled buttons; every other section CTA is an editorial link".

### A8 — The hero type scale is rescaled to fit the approved copy

§4 specifies the Hero as `clamp(3rem, 9vw, 8.5rem)`. Measured against Archivo Expanded 900, neither end fits §14's hero copy:

- "EVERYWHERE." measures **455px at 48px** (the 3rem floor). At 320px the content box is 280px, so the word overflowed by 175px. `overflow-x: clip` hid it, which meant the headline was silently **clipped and unreadable**, not merely scrolled.
- At 1920px the same word measures **1289px against a 1280px content box**, so the 8.5rem ceiling overflows too.

`overflow-wrap: break-word` is added to the hero, H2 and H3 styles as a backstop so future copy degrades by breaking rather than clipping.

**Resolved on client review (2026-09-21).** A first pass kept §4's ceiling at roughly 8.25rem. Reviewed in a real browser at 1350×600, the headline alone overran the viewport: "DIFFERENCE." fell below the fold and the lead and the hero CTA were pushed off screen entirely. The client's verdict was that it read too large, which also settles the §07 question.

Final scale: **`clamp(1.85rem, 9vw, 5.25rem)`**.

| Width | Size | Lines | Notes |
| --- | --- | --- | --- |
| 320px | 29.6px | 6 | Floor. The largest size at which "EVERYWHERE." fits a 280px box. |
| 375px | 33.75px | 5 | |
| 1360px | 84px | 4 | Whole hero block ends at 645px of an 800px viewport. |
| 1920px | 84px | 4 | Ceiling. |

Zero horizontal overflow at all six required widths, and the hero CTA is inside the first viewport at desktop — which it was not before. §07's "three commanding lines" remains unmet by one line; reaching it would need roughly 4.5rem at a 1280px content box, shrinking the hero further than the client wants. Four lines is the accepted outcome.

### A9 — The rail's active dot is surface-aware

§6 specifies a yellow active dot throughout. Yellow on cream is 1.5:1, below the 3:1 that WCAG 2.1 SC 1.4.11 requires of a meaningful graphic, and five of the nine sections are cream. The rail reads the active section's `data-surface` and uses red on cream (5.9:1), yellow on black and red — the same mechanism as the focus ring in [A1].

### A10 — The whole heading scale is re-proportioned

§4's H2 (`clamp(2.25rem, 5.5vw, 5rem)`) and H3 (`clamp(1.5rem, 2.5vw, 2.25rem)`) were sized against an 8.5rem hero. Once [A8] brought the hero down to 5.25rem, the scale broke: **at 360px the H2 rendered at 36px against a 33.75px H1** — section headings larger than the page headline, an outright hierarchy inversion. At desktop the hero:H2 ratio had collapsed to 1.12, so the two levels read as one.

Rescaled to hold a consistent step below the client-approved hero:

- **H2** — `clamp(1.5rem, 5.6vw, 3.25rem)`
- **H3** — `clamp(1.3rem, 3.4vw, 1.95rem)`

| Width | Hero | H2 | H3 | Body | hero:H2 | H2:H3 |
| --- | --- | --- | --- | --- | --- | --- |
| 375px | 33.8 | 24 | 20.8 | 17 | 1.41 | 1.15 |
| 768px | 69.1 | 43.0 | 26.1 | 17 | 1.61 | 1.65 |
| 1360px | 84 | 52 | 31.2 | 17 | 1.62 | 1.67 |
| 1920px | 84 | 52 | 31.2 | 17 | 1.62 | 1.67 |

A consistent ~1.62 modular scale from 768px up, and correct ordering at every width. Below 768px the steps compress because the hero is pinned near its floor by the longest word in §14's hero copy; the levels stay distinguishable there through face and weight (display 800/700 against Montserrat 400) as well as size.

### A11 — The §04 numerals are not clipped

§04 asks for the capability numeral "positioned top-right and clipped by the card edge". Two rounds of client review rejected it: bled off the corner, the numeral read as a rendering fault rather than an editorial device. The numeral now sits fully inside the card, 40px clear of the right edge and 32px from the top, sized `clamp(3rem, 5.5vw, 4.5rem)` so it never collides with the capability name. It remains decorative and `aria-hidden` per [A3].

### A12 — The rail's station name is conditional, not permanent

§6 shows the active station's name permanently beside its dot. There is no room for it. The dot sits at `gutter/2` (40px) and the content column starts at the gutter (80px), leaving 40px of clearance for names up to ~140px wide — so in review the label printed directly over the section text.

Clearance only exists once the viewport exceeds the 1440px max-content width by enough, which is about **1700px**. So:

- **≥1700px** — the active station's name is shown plainly, as §6 describes.
- **Below** — names are revealed on hover or keyboard focus as a chip with its own background, legible over any surface. The active *dot* is always distinct, so position is never lost.

Implemented as plain CSS in `globals.css`, not Tailwind variants: an arbitrary `[@media(min-width:1700px)]:opacity-100` cannot be sorted among Tailwind's own breakpoints and lost to a plain `opacity-0` on source order. The attribute selector wins on specificity instead, which does not depend on generated ordering.

### A13 — A display step between H2 and Hero, and a quieter footer strip

Client review found two headlines overbearing at their specified sizes:

- **§09's close** is specified "at hero scale". Short, centred and on saturated red, it reads far heavier than the hero's longer ragged block at the same size. Now `.type-display` — `clamp(1.75rem, 6.5vw, 4rem)`, about 76% of hero (64px against 84px at desktop).
- **The footer conversion strip** was at H2 scale, identical to a section heading. It repeats on every page, so it was the loudest thing in the footer and competed with the page's own headings. Now H3 scale (31.2px).

Resulting descending scale at 1600px: hero 84 · display 64 · H2 52 · H3 31.2 · body 17.

**`.type-cta` and `.type-cta-lg` are now two styles, not one.** §4 gives a single CTA style for both buttons and editorial links. Shrinking it to button size (client feedback that buttons read oversized) made the hero's editorial CTA *smaller* than the lead paragraph above it, so the action blended into the copy. Split:

- **`.type-cta`** — `clamp(1rem, 1.5vw, 1.25rem)`, for `Button`. 20px at desktop, carried by its filled background.
- **`.type-cta-lg`** — `clamp(1.1875rem, 1.9vw, 1.625rem)`, for `EditorialCTA`. Always above body-large at every width, so the chapter-marker links §6 describes stay the largest thing under a headline.

### A17 — §01's track line moved out of the headline

§01's yellow 2px rule was positioned at a fixed 28% of the hero. Measured at 1440×900 it sat at y=252 inside a headline spanning 204–513 — striking straight through the type, which reads as a rendering fault rather than a track.

It now renders in normal flow beneath the hero content, pulled out through the shell's gutters to span the full content width. In flow it cannot collide with the copy at any viewport, which a percentage offset could never guarantee as the headline reflows.

### A18 — The mobile progress bar tracks the nav rather than hiding with it

§6 pins the bar "directly under the nav". Pinned at a fixed offset it was left stranded at the top of the page with empty space above it whenever the nav hid on scroll-down; hiding it with the nav instead removed the progress indicator entirely.

It now stays visible at all times: it rides at the top of the viewport while the nav is away, and slides back down to sit under the nav when the nav returns on scroll-up, on the nav's own 180ms easing so the two move as one.

### A14 — Line-breaking and the eyebrow

`text-wrap: balance` on the three heading styles and `text-wrap: pretty` on both body styles. Both degrade silently where unsupported, so neither is load-bearing.

The eyebrow rises from §4's fixed `0.75rem` to `clamp(0.75rem, 0.85vw, 0.875rem)`: at 12px against an 84px headline it stopped reading as part of the same system. **Nav links carry `whitespace-nowrap`** — this class is shared with the nav, and the size rise alone broke "What we do" onto two lines and dropped the whole bar off its baseline. No negative margin is applied to the class globally for the same reason: it is shared with nav links, capability tags and rail labels, where it skews flex spacing.

### A15 — The footer conversion strip is suppressed on the homepage

§6 adds a footer strip so "conversion exists on every page", and §14 gives it the same headline and the same call to action as §09. On the homepage that renders two identical conversion blocks back to back — §09's close, then the same words again immediately below it. Client review read it as a duplication bug, which is what it looks like.

§09 already provides conversion on the homepage, so the strip renders on every route except `/`. §6's requirement is met everywhere it is actually needed. Only the strip is a client component (it reads the pathname); the rest of the footer stays server rendered.

### A16 — §07's reveal hook was removed until the animator exists

Not a spec amendment but a standing rule, recorded because it cost real time. `data-reveal` was hand-written onto the §07 rows during the static stage, before any motion existed. The CSS contract in §11 hides reveal targets once JavaScript is present, so with no animator mounted the four reasons were **permanently invisible** and the section rendered blank — while every automated check passed, because the copy was in the DOM and merely transparent.

`data-reveal` must only ever be emitted by the `Reveal` component, which owns the animation that brings it back. Never hand-write the attribute. The warning sits above the rule in `globals.css`.

### A19 — §01's yellow track line is removed

§01 specifies "a yellow 2px horizontal rule ... the track line". Removed on client review, and the reasoning holds independently: D3 already assigns the train/track metaphor to the ProgressRail and rules out any other literal track graphic, so the rule was doing that job a second time. Positioned below the hero content it read as a stray divider across the photograph rather than a track. It was decorative and `aria-hidden`, so nothing was lost semantically. Restoring it is a one-line change if the motif is wanted back.

### A20 — CTAs narrow their width axis below 1024px

Measured at a real 375px, **six of the eight editorial CTAs wrapped to two lines**. The cause is the typeface, not the layout: Archivo Expanded (`wdth` 125) is roughly 20% wider than the normal width, and the longest approved label — "Explore our capabilities", 24 characters — cannot fit a 320–375px line at a readable size. Holding the expanded axis would have meant dropping to about 12px, below body text, which is not a call to action any more.

Below 1024px, `.type-cta` and `.type-cta-lg` switch to `wdth` 100 with tracking eased to `0.02em`. That recovers the 20% and keeps labels at 16px on a single line. Above 1024px the expanded face returns unchanged. Both styles also carry `white-space: nowrap` — a button or CTA label is a label, and must never break.

Verified: all eight CTAs single-line at 320px and 375px, widest right edge 288px of 320, both buttons within bounds, zero overflow at either width; `wdth` 125 and the full 26px/20px sizes intact at desktop.

### Structural resolutions

These are not contradictions but decisions the spec leaves open, settled here so they are not re-argued mid-build.

**S1 — No-JS defaults invert.** §11 gets reveals right, but three other mechanisms would fail §1's "fully readable with JavaScript disabled". Each defaults to its **complete** state in markup and CSS; JavaScript moves it to its initial state before animating.

- *Reveals* — CSS default `opacity: 1`. A minimal inline script in `<head>` adds `js` to `<html>`; `.js [data-reveal] { opacity: 0 }`. Preferred over a `useLayoutEffect`-only approach, which under SSR paints the content, hides it at hydration, then animates — a visible flash on every load.
- *§03 accordion* — all five details render expanded; JS collapses to one-open-at-a-time on mount.
- *§05 and §08 SVGs* — paths render complete. `stroke-dasharray`/`stroke-dashoffset` are set by JS only, never authored in CSS.
- *Mobile menu* — cannot open without JS. The Footer carries all six routes and is reachable by scrolling. Accepted fallback.

**S2 — §03 must not shift its track.** Expanding a description inside a horizontal node would move the track and breach the CLS budget. The five nodes stay fixed and the open `detail` renders in a single reserved panel beneath the track, with `min-height` set to the tallest of the five so nothing reflows. Mobile keeps inline expansion, where vertical shift is natural.

**S3 — One scroll orchestrator.** The ProgressRail, the nav's 80vh surface change and the nav's show/hide all need scroll position. A single rAF-throttled listener plus a single `IntersectionObserver` over the nine section ids feeds all three through a shared `ScrollContext`. No per-frame layout reads, no duplicate listeners.

**S4 — §05 mobile is a second SVG.** §7 forbids scaling the desktop diagram down. Two `<svg>` elements, horizontal and vertical, toggled by CSS `display` at 768px — more robust than swapping `viewBox` through `matchMedia`, and it works with JS disabled.

**S5 — Lenis tracks the preference at runtime.** `prefers-reduced-motion` can change while the page is open, so the provider subscribes to `matchMedia` change events and creates or destroys Lenis accordingly, rather than checking once on mount.

**S6 — The nav has five text links plus the logo.** §6 says "six links centre-right", but §5's table counts `/` (label TRAIN) among the six routes and the logo is that link. So: logo left linking `/`, five text links centre-right, `Button` far right. The Footer's route column lists all six.

**S7 — `site.ts` carries a sections manifest.** The ProgressRail needs a station name per section. §5 supplies the nine ids; the names come from the section titles. `{ id, station }[]` lives in `site.ts`, which §3's file list does not mention but the rail cannot be built without.

### Build environment notes

Resolved at scaffold on 2026-09-21. §3 predates these; where they differ, these win.

**Next.js 16.3.5, React 19.2.8, Tailwind v4, Node 24.19.0.** `create-next-app` installs Next 16, which the framework itself flags as a significant departure from older conventions. It ships version-matched docs in `node_modules/next/dist/docs/` and an `AGENTS.md` telling agents to read them before writing code. Do that rather than working from memory.

**N1 — Tailwind is v4, so there is no `tailwind.config.ts`.** Tokens live in `@theme inline` inside `globals.css`, mapping `--color-train-*` onto the `--train-*` custom properties §4 defines. §15.1's "Tailwind config" means this.

**N2 — `globals.css` must use cascade layers.** Tailwind v4 puts every utility in `@layer utilities`, and *unlayered CSS outranks layered CSS regardless of specificity*. An unlayered `a { color: inherit }` therefore beats every `text-*` utility in the codebase — it rendered the §09 button as black-on-black before being caught. Base resets go in `@layer base`, the `.type-*` scale and layout helpers in `@layer components`. The focus ring and the `[data-reveal]` rules stay deliberately unlayered so nothing can override them.

**N3 — §13's "first-load JS under 200KB" cannot be read from the build output.** Next 16 removed the `size` and `First Load JS` columns from `next build`, on the grounds that they were inaccurate for server-driven architectures. Measure the budget in Lighthouse or the DevTools network panel instead. The budget itself is unchanged.

**N4 — Next 16 no longer overrides `scroll-behavior` during navigation.** Do not set `scroll-behavior: smooth` globally: it would fight both Lenis and route transitions. Lenis owns smooth scrolling; native scrolling is the reduced-motion fallback.

**N5 — `params` and `searchParams` are Promises.** Synchronous access is fully removed in 16. This affects `/work/[slug]` and `/contact?subject=` in the second pass. `LayoutProps<'/'>` and `PageProps<'/route'>` are generated globals — use them rather than hand-writing prop types.

**N6 — `next lint` is removed.** Lint with `npx eslint .`; `next build` no longer runs it.

**N7 — `images.remotePatterns` is pinned to the exact Picsum path and query.** Omitting `pathname`/`search` implies a `**` wildcard and would let arbitrary remote URLs through the optimiser. The `?grayscale` query is part of the contract — `PlaceholderImage` must not change it without changing `next.config.ts`.

**Testing notes — the in-app preview pane has three limitations that produce false failures.** Know them before chasing a phantom bug.

1. *`scrollWidth` lies.* `window.innerWidth` reports the unscaled pane width, not the emulated viewport, so `scrollWidth > clientWidth` gives false positives. Test horizontal overflow by attempting `window.scrollTo(500, y)` and asserting `scrollX` stays `0`, and by counting elements whose bounding rect exceeds `clientWidth`.

2. *Fixed positioning resolves against the unscaled window.* A bare `position: fixed; left: 0; right: 0` element measures the pane width while `position: absolute` and `100vw` both measure the emulated viewport correctly. The nav and the rail will therefore always appear to overflow. Verify them against `visualViewport.width`, or in a real browser.

3. *rAF throttles to roughly 2fps and can stop entirely.* The pane reports `document.visibilityState === "visible"` but is not painted at a useful rate, even when fronted, and after a while `requestAnimationFrame` stops firing altogether. Everything rAF-driven then freezes: the nav show/hide, the rail fill, the active station, every GSAP timeline. `IntersectionObserver` callbacks are tied to the same rendering lifecycle and stop with it.

   This looks exactly like a broken component. Before debugging, run the probe:

   ```js
   let fired = false; requestAnimationFrame(() => { fired = true; });
   await new Promise(r => setTimeout(r, 1200)); fired; // false => the pane is not painting
   ```

   When it returns false, nothing scroll-driven can be verified in the pane. Test the plumbing instead — set `--scroll-progress` directly and assert the computed transform follows — and confirm live tracking in a real browser.

4. *Screenshots are unreliable.* The pane captures only its own viewport (often far smaller than the emulated one) and crops the rest, so a screenshot of an emulated 1360px page shows roughly the top-left 800×476. Judge layout from measurements, and ask the client for real-browser screenshots when the question is visual.

**`prefers-reduced-motion` is covered by tests, not by the pane.** The pane exposes no emulation for it, and because rAF is dead there every animation looks frozen at its starting state whether the code is right or wrong — so the pane cannot distinguish "motion correctly disabled" from "motion broken". Attempting it by patching `matchMedia` at runtime is inconclusive for the same reason.

Instead `npm test` (Vitest + jsdom) mounts the motion components with the media query mocked to a reduced-motion user and asserts the **finished** state: reveals at opacity 1 and untranslated, §07's rows all visible rather than only the first, §03's track not scaled to zero, and no `stroke-dasharray`/`stroke-dashoffset` applied to the §05 and §08 diagrams — a dash offset being exactly what would leave an SVG invisible. Run it alongside `tsc` and `eslint`.

This covers the JavaScript half of §11. The CSS half — the `@media (prefers-reduced-motion: reduce)` block that caps transitions and forces `[data-reveal]` back to `opacity: 1 !important` — is verified by inspecting the built stylesheet, since CSS media evaluation cannot be faked from script.

### Content gaps

§10 supplies no copy for the `Capability.services[].note` clarifiers (15 — five Creative, three Digital & IT, four Marketing & Content, three Business Support), the three `/mission` initiative cards, the `/about` origin narrative and values block, or `/how-it-works`' three network blocks. Per §0 these carry bare `TODO:` markers rather than invented filler. All are collected in `CONTENT-GAPS.md` at the repo root as a single list for the client to write against.
