# WEWILLBE — Design System

"For legends, by Legends."

This document records the decisions behind the visual system, so future
work (real photography, a headless commerce backend, new pages) extends
the same language instead of drifting into generic ecommerce-template
territory.

## 1. Why ink/paper, not black/white

`--ink` (`hsl(10 8% 7%)`) and `--paper` (`hsl(42 24% 95%)`) instead of pure
`#000`/`#fff`. Pure black/white reads as a UI surface (an app, a dashboard).
A near-black with a hair of warmth and a warm ivory instead of white reads
as *printed stock* — the paper a fashion campaign is actually shot on.
Every section is one of exactly two states: **ink** (dark, cinematic,
used for Hero / Manifesto / Featured / Story-intro / Story-timeline) or
**paper** (light, editorial, used for Collection / Drop / Legends / Shop /
interior page bodies). Sections alternate rhythmically down the page —
that alternation *is* the pacing device, doing the job a lesser site would
do with drop shadows or card borders.

## 2. Why three typefaces, not one

- **Big Shoulders Display** (800/900) — the only display face on the
  site. Tall, condensed, architectural. Used exclusively for headlines,
  the wordmark, and numerals (countdown, review score). Always set in
  caps with tight/negative letter-spacing.
- **Archivo** (400–700) — the only body/UI face. Every button, nav link,
  product name, paragraph, form field. Plain, confident grotesque, gets
  out of the way.
- **Fraunces** (italic, 500/600) — reserved *only* for emotional
  editorial moments: the manifesto pull-quote, the hero tagline, footer
  tagline. Never used for anything functional. This is the single most
  important rule in the system — the moment Fraunces shows up on a
  button or a price, the "fashion house" illusion breaks.

Mixing a serif accent into an all-sans system is what separates an
editorial fashion site from a SaaS landing page. Don't add a fourth
typeface without a specific editorial reason.

## 3. One accent color, one job

`--accent` (oxblood, `hsl(8 58% 34%)`) exists for exactly one purpose:
**scarcity and status signals** — "Limited", "Sold Out", the drop
countdown's live-dot, the scarcity line under the countdown. It is never
decorative, never used on a CTA by default (`.btn--solid` inverts to
accent only on hover, as a deliberate "hot" moment). No gradients exist
anywhere in this system — every color transition you might reach for a
gradient to solve is solved with a hard edge or a blend-mode nav instead.

## 4. Motion: confident, not springy

`--ease: cubic-bezier(0.22, 1, 0.36, 1)` — an expo-out, no overshoot.
Durations are slow by SaaS standards (0.5–1.3s). This is intentional:
snappy, bouncy, overshoot-y motion reads as "app interaction feedback."
Slow, confident, single-direction motion reads as "camera move in a
campaign film." If you're adding an animation and reaching for a spring
or a bounce, it doesn't belong in this system — reserve that vocabulary
for a hypothetical secondary "drop mechanics" microsite, not the
flagship.

Every animation that exists has a specific editorial reason:
- Hero word: curtain-rise reveal (magazine cover opening).
- `[data-reveal]`: single fade+rise on scroll-into-view, once, never
  replays — restraint over "wow, it moved again."
- Marquee: continuous brand-tagline ticker, borrowed from runway show
  signage, not a "look how much content we have" banner.
- Drop live-dot: a slow single-pulse, borrowed from a recording/live
  indicator, reinforcing "this is happening in real time."

## 5. The `.frame` placeholder system

No AI-generated fashion photography exists yet, and none should be
faked. Every future photo slot is a `.frame`: a dark gradient base, slow
turbulence-noise grain (reads as film grain, not a loading skeleton),
thin corner brackets (a viewfinder/registration-mark motif — "a camera
is pointed here"), and a small caption (`Campaign 01 — In Production`,
`Product Photography Pending`). The `--ar` custom property sets aspect
ratio per placement (4/5 product portrait, 3/4 featured, 1/1 community
grid, full-bleed hero). **When real photography arrives**: replace the
`.frame__mono`/`.frame__caption` children with an `<img>`/`<video>`,
keep the `.frame` wrapper and `.frame__corners` for continuity, or drop
the corners once the frame is holding a real photo (they're a
placeholder signal, not a permanent design element — direct that call
per section when photography lands).

## 6. Layout

- Sharp corners everywhere (`--r: 2px`). No pill buttons, no rounded
  cards. Rounded UI is a startup tell in this category.
- Grids that touch (`gap: 1px`, hairline-separated cards) for the
  Collection/Legends grids — reads as a contact sheet / archive wall,
  not a SaaS pricing table.
- Asymmetric section headers (`.sec-head`): title left, one supporting
  sentence right, never centered — centered headers are the single
  fastest way to look like a template.
- `--edge` / `--section-pad` are the only spacing tokens sections should
  use for their outer rhythm. Don't hand-roll new section padding.

## 7. Nav

The nav has no background at the top of any page and blends via
`mix-blend-mode: difference` against whatever section is currently
behind it — this is why it reads correctly as light text over a dark
hero and dark text over a light body with zero per-page overrides. On
scroll past 40px it becomes a solid `--ink` bar (`.is-condensed`) and
exits blend mode entirely, for legibility once it's persistently
on-screen. Don't add a manual light/dark nav variant per page; the blend
mode is the mechanism.

## 8. What's stubbed, on purpose

This is a static front end with no backend yet, built to make the
eventual integration (Shopify, a headless CMS, a payments provider)
additive rather than a rewrite:

- **Cart**: `[data-add-to-cart]` bumps a `[data-cart-count]` badge only.
  No cart drawer, no persistence. Wire to a real cart API/Shopify AJAX
  Cart when ready.
- **Sizes**: `.size-grid` is a plain toggle group; the `disabled` state
  on one size demonstrates "out of stock," but stock isn't wired to
  real inventory.
- **Notify-me / newsletter forms** (`[data-notify-form]`): client-side
  only, swaps the button label to confirm the submit. Needs a real
  email provider (Klaviyo, etc.) before launch.
- **Filter chips** on Shop: visually functional, don't yet filter the
  static grid — the catalogue itself is placeholder copy, not a real
  product feed.
- **Reviews**: three placeholder reviews with a placeholder aggregate
  score. Replace with real review data before launch — do not leave
  fabricated reviews live.

## 9. Prices, copy, and honesty

Every price, review, and scarcity line ("Limited to 200 pieces",
star ratings, review count) currently on the site is **placeholder
content for layout purposes**, not real data. Before this goes live,
replace: product prices with real ones, the review block with real
review data (or remove the section until reviews exist), and the drop
countdown target date with the real release date. Do not let placeholder
numbers survive into a live deployment.
