# WEWILLBE — Handoff

Where this project stands, what happened to get here, and what's next.
Written for whoever picks this up next — including a future session with
no memory of this one.

**Repo**: `hmdovic/WeWillBe`. Branch: `main`. Custom domain via `CNAME`:
`wewillbe.store` (GitHub Pages).

---

## -1. Fresh repo (read this first)

The previous repo (same name) got its GitHub Pages deploy pipeline
permanently wedged — three consecutive deploys stuck in "queued" and
never starting, confirmed via the Actions API, on both "Deploy from a
branch" and "GitHub Actions" Pages sources, surviving a Settings
re-save. That's a platform-side stall, not a bug in this codebase. The
owner deleted that repo and created this one fresh; this HANDOFF and
the Next.js app underneath it carry over unchanged.

**Product photography is now real, final assets**, not placeholders:
official flat-lays (white Legends Tee, navy Legends Hoodie, front +
back) and two campaign lifestyle shots, all under `public/images/`.
The hero video (`public/video/hero-couple*.mp4`) already happens to
match this exact merch (real couple, real print), so it stayed as the
hero background — the owner mentioned a possible replacement/upgrade
header is still coming; when it lands, only `public/video/hero-couple*`
needs swapping, nothing in `Hero.tsx` changes.

**Because this is a brand-new repo, GitHub Pages needs to be configured
from scratch** — this is unavoidable manual work, no API/tool can do
it: Settings → Pages → Source: **GitHub Actions**; then add custom
domain `wewillbe.store`, wait for the DNS check, enable "Enforce
HTTPS." The `deploy.yml` workflow in this repo is ready and will run on
the next push once Pages is enabled.

## 0. MAJOR REWRITE — full migration to Next.js

Everything below section 0 describes the **plain-HTML static site** era
of this project. That entire site is **archived, not deleted**, in
`legacy-static/` (index/shop/product/story/community.html, style.css,
script.js, DESIGN.md). It's fully preserved and functional if opened
directly, just no longer wired into the live deploy.

The owner sent a very detailed, explicit "MASTER PROMPT" asking for a
full production rebuild: Next.js 15 + TypeScript + Tailwind + GSAP/
Framer Motion + Lenis + EmailJS, single-page pre-order-only experience
(Hero, Countdown, Products, Story, Purpose, Pre-order, Footer — nothing
else), styled like Fear of God / Daily Paper / Jacquemus / Acne
Studios / COS rather than "ecommerce." This was executed close to
verbatim. Key decisions worth knowing about:

- **Typography changed**: dropped Big Shoulders Display (the old
  condensed streetwear display font) in favor of Archivo alone for all
  headlines/UI — pure Swiss "one grotesk family, contrast via
  scale/weight" economy, closer to what the brief's reference brands
  (Jacquemus/Acne/COS) actually look like. Fraunces italic survived,
  still reserved for emotional pull-quote moments (Story, Purpose).
- **Colors carried over exactly** from the old `--ink`/`--paper`/
  `--accent` HSL tokens (converted to hex, see `globals.css`) — the
  palette didn't need to change, just the stack underneath it.
- **New real assets used**: the "couple" video
  (`public/video/hero-couple*.mp4`) is the hero background, replacing
  the single-model hero video from before (still archived, unused, in
  `legacy-static/`). New hoodie front/back product shots
  (`public/images/hoodie-01-*.jpg`) plus a new hoodie lifestyle shot
  (`hoodie-lifestyle-03.jpg`) came in with this batch.
- **EmailJS has no real credentials** — none were provided. Built the
  full integration inert-by-default (same pattern as the old GA4 work),
  *plus* a genuinely working `mailto:` fallback so the pre-order form
  actually functions today without any external account. See README's
  "Pre-order form: how it actually sends" section — this is the most
  important thing to understand about this page's current limitations.
- **Hoodie price (€129,95) is a placeholder** — never given a real
  number, picked something plausible. Same treatment as the Save the
  Children wording earlier: flagged in code (`constants.ts`) and in
  README, not silently presented as confirmed.
- **Purpose section (Save the Children / Palestine)**: reused the
  owner's own text near-verbatim, including their own requested
  disclaimer language. Added a very restrained non-flag visual accent
  (a 2px four-tone gradient hairline) per their explicit "no flags
  dominating, no political imagery, subtle accents only" instruction —
  deliberately did not add anything more literal (no flag graphic, no
  watermelon motif) since the brief didn't ask for that and it would
  read as more political than "hope, humanity, compassion."
- **Deployment**: static export (`output: "export"` in
  `next.config.ts`) + a GitHub Actions workflow
  (`.github/workflows/deploy.yml`) publishing `out/` to GitHub Pages on
  every push to `main`, preserving the `wewillbe.store` custom domain
  via `public/CNAME`. Chosen over Vercel to keep continuity with the
  existing domain setup without asking the owner to reconfigure DNS —
  if they'd rather use Vercel, delete the `output: "export"` line and
  connect the repo, nothing else needs to change.
- **`npm audit`** flags 3 high-severity advisories, all in `postcss`/
  `sharp` (Next.js's own build-time deps, not runtime browser code).
  The fix path is a Next.js 16 major bump, which wasn't asked for —
  flagged in README rather than silently done.

If continuing this work: **read `src/lib/constants.ts` first** — it's
the single file with every business-facing decision (prices, deadline,
join count, brand config, env var wiring) and every "CONFIRM before
this is real" comment.

---

## 1. What WEWILLBE is

A premium streetwear label's digital flagship. Static site — plain
HTML/CSS/JS, no build step, no framework, no `package.json`. GSAP +
ScrollTrigger + Lenis loaded from CDN for scroll effects. Read
`DESIGN.md` before touching anything visual — it documents *why* the
site looks the way it does (ink/paper tokens instead of pure
black/white, three typefaces each with one job, one oxblood accent
color reserved for scarcity signals, sharp 2px corners, slow
expo-out easing with **no spring/bounce by deliberate decision**).

Read `README.md` for the stack, page list, and integration points
(cart, email capture, commerce backend) that are stubbed on purpose.

## 1d. Update — the other 4 pages are now redirect stubs (commit pending at write time)

Owner, correcting the previous update: "no, I said delete the whole
site, EVERY page, only a timer, using those 4 photos." The previous
pass only touched `index.html`; this one finishes the job.

`shop.html`, `product.html`, `story.html`, and `community.html` are
now all identical, tiny redirect stubs — `<meta http-equiv="refresh"
content="0; url=index.html">` plus a JS `location.replace("index.html")`
fallback and `<meta name="robots" content="noindex">` — no CSS/JS
dependency, no design-system markup at all. Visiting any of the 5 URLs
now lands on the exact same full-screen countdown teaser.

**Nothing was deleted.** Every real page — the full shop grid, the
real Legends Tee product page (photos, price, charity copy, gallery),
the story/manifesto page, the community grid — is fully intact as of
commit `03050dd` (the commit right before this one). To restore any of
them:

```bash
git show 03050dd:shop.html > shop.html        # or product.html / story.html / community.html
```

Then re-add its nav link (the nav component itself is untouched in
`style.css`) and bump the `?v=` cache-buster if `style.css`/`script.js`
changed since. `sitemap.xml` currently lists only the homepage —
add a page back to it once its redirect is removed.

`style.css` and `script.js` were **not** stripped down — every
component class and JS module for the shop grid, product gallery, cart,
accordion, size selector, etc. is still there, just unreachable because
nothing currently links to a page that uses them. Don't delete any of
it under the assumption it's dead; it's dormant, not gone.

## 1c. Update — homepage rebuilt as a full-screen teaser (commit pending at write time)

Owner sent 4 new real campaign photos (2 men in the white Legends tee,
2 women in the navy Legends hoodie) and said, paraphrased: "delete the
whole website, just put a timer, make these photos interactive in a
breathtaking UI/UX way, counting down to Saturday — like something
wild is really about to happen." Took this literally and rebuilt
`index.html` from scratch as a single full-screen experience:

- **Photos**: saved as `teaser-tee-01.jpg`, `teaser-tee-02.jpg`,
  `teaser-hoodie-01.jpg`, `teaser-hoodie-02.jpg` (1100px wide, q76
  JPEG — kept these lean since this one page IS the whole site right
  now and first-paint speed matters more than ever).
- **Interactive slideshow**: the 4 photos auto-crossfade every 6s with
  a slow Ken Burns zoom (`.teaser-bg__img`, driven by
  `[data-teaser-bg]` in `script.js`), plus click-to-jump dot navigation
  (`[data-teaser-dot]`) and a subtle mouse-parallax drift on the whole
  background on desktop hover-capable devices. All of it respects
  `prefers-reduced-motion` (crossfade still happens for information,
  but instantly — no zoom, no parallax).
- **Everything else is gone from this page**: no nav, no footer, no
  cart drawer, no old hero video. Just the wordmark (top-left), the
  countdown (`#drop`, same target date mechanism as before), an email
  form, and tiny social icons bottom-right. `shop.html`/`product.html`/
  `story.html`/`community.html` are completely untouched and
  unreferenced from this page — they still exist for when Chapter One
  actually ships.
- **The old hero video files were NOT deleted** (`hero-01.mp4` and
  friends) — just unreferenced. They're real paid campaign footage and
  will likely come back for the real post-launch homepage.
- **Cleaned up now-dead weight**: removed the GSAP + ScrollTrigger CDN
  `<script>` tags from all 5 pages and the corresponding JS (`hasGSAP`,
  `gsap.registerPlugin`, the ScrollTrigger sync in the Lenis handler) —
  their only consumer was the old hero's scroll-parallax, which no
  longer exists anywhere in the codebase. If scroll-parallax comes
  back, re-add both CDN tags and `gsap.registerPlugin(ScrollTrigger)`.

**Two real bugs found and fixed while building this:**
1. Countdown digits overflowed the viewport on narrow phones (< 420px)
   at the larger teaser sizing — fixed with a `@media (max-width:
   420px)` override shrinking gap/min-width/font-size for
   `.teaser-countdown`.
2. **The cookie-consent banner (from the previous GA4 work) was
   rendering — and intercepting clicks — on every single page load,
   completely ignoring its `hidden` HTML attribute.** Cause: `.cookie-
   banner { display: flex; ... }` and the browser's built-in `[hidden]
   { display: none }` rule have equal CSS specificity (one class
   selector each), so source order decided the winner — and the
   author rule always comes after the UA stylesheet, so `display:flex`
   always won regardless of the `hidden` attribute. This is a classic,
   easy-to-miss pitfall whenever a `hidden`-attribute element also gets
   a class-level `display` override. Fixed with an explicit
   `.cookie-banner[hidden] { display: none; }` rule (specificity 0,0,2,0,
   beats the plain class rule outright). Caught via Playwright's
   click-actionability check timing out, not a visual screenshot check
   — worth remembering: `element.hidden === true` (the boolean JS
   property, which just reflects attribute presence) does **not**
   prove an element is actually invisible on screen. Verify by
   checking computed `display`, or by attempting a real Playwright
   `.click()` on something that should be behind it, not just reading
   the property.

## 1b. Update — SEO hardening + Google Analytics scaffolding (commit `7531940`)

Owner asked (paraphrased, Dutch): "let's calmly redo everything, SEO
proof, Google Analytics, all of it." Asked a clarifying question;
answer was effectively "no preference" on both scope and whether they
had a GA4 ID yet. Interpreted conservatively: **hardened what exists,
did not redesign anything**, and did not fabricate a GA ID.

- Homepage `<title>`/meta description/OG/Twitter tags were still
  advertising a full shoppable collection ("Shop the collection...")
  from before the pre-launch pivot — fixed to accurately describe the
  countdown page.
- `sitemap.xml` got `lastmod` dates and rebalanced priorities: homepage
  and `product.html` (the two pages actually on the critical path) now
  outrank `shop.html`, which previously had a higher priority (0.9,
  `daily`) than the homepage despite being placeholder content.
- **Google Analytics 4** is wired into `script.js` but **inert by
  design**: `GA_MEASUREMENT_ID` is the literal placeholder
  `"G-XXXXXXXXXX"`. The code checks for `"XXXX"` in the ID and no-ops
  entirely if found — no banner, no script tag, nothing in
  `localStorage`, nothing sent anywhere. The owner did not have a real
  Measurement ID yet, so nothing was invented.
  **To activate**: replace `GA_MEASUREMENT_ID` in `script.js` with the
  real ID (Google Analytics → Admin → Data Streams → your stream →
  Measurement ID, format `G-XXXXXXXXXX`). The moment that's a real ID,
  a cookie-consent banner (`[data-cookie-banner]`) starts appearing on
  first visit across all 5 pages; GA only loads after "Accept";
  "Decline" or "Accept" both persist to `localStorage` key
  `wewillbe_consent` so the banner never re-prompts either way.
- **Before switching that on for real EU/UK traffic, add a privacy
  policy page.** The banner currently doesn't link to one because none
  exists — don't let the banner point somewhere fake or, worse, a dead
  "#". This is a real legal requirement (GDPR), not a nice-to-have.
- Also ran a full technical SEO check (all 5 pages): confirmed single
  `<h1>` per page, 100% image alt-text coverage, title/description
  lengths in range, canonical tags all correct. No changes needed there
  — was already solid from the earlier audit pass.

## 1a. Update — first real product added (commit `f8d7587`)

Since the rest of this doc was written, the owner sent real photography
for the first product: the **Legends Tee**, €69,95. `product.html` is
now that real product page — real front/back photos
(`tee-01-legends-front.jpg`/`tee-01-legends-back.jpg`), a working
gallery crossfade, honest copy, and a **50% of proceeds go to Save the
Children** commitment written as WEWILLBE's own promise (not a claimed
formal partnership — none is confirmed, don't upgrade the wording
without checking). The fabricated 4.9-star reviews and the "You May
Also Like" section recommending three nonexistent products were both
removed — replaced with an honest "no reviews yet" state and a
CTA back to the homepage notify form.

This also surfaced and fixed a real, unrelated bug: the primary nav
used `mix-blend-mode: difference` unconditionally, which is a trick
that only works over a *varying dark* backdrop (the hero photo). On
every `page--paper` page (shop/product/community) it was inverting
dark ink text into pale-grey-on-cream (unreadable) before scroll, and
dark-on-dark (invisible) after. Fixed by scoping the blend trick to
non-paper pages and forcing paper text on `.is-condensed`. If nav
legibility ever looks off again on a paper page, check
`body.page--paper .nav` in `style.css` first.

Per the owner's explicit choice: this product is prepped on
`product.html` only, **not** yet linked from `shop.html`'s grid or the
homepage — homepage stays pure countdown until they say otherwise.

## 2. Where things stand right now (as of this handoff)

**The homepage is a deliberate pre-launch teaser, not the full site.**
The owner is still building the first real collection and explicitly
asked to strip the homepage down to almost nothing until it exists —
see §4 for why.

`index.html` right now is just:
1. **Hero** — full-bleed real campaign video (not a placeholder), with
   a portrait-cropped variant for mobile.
2. **Mega drop section** (`#drop`) — a large "THIS SATURDAY." headline,
   a big animated countdown, and an inline email-capture form. This is
   the entire conversion goal of the homepage right now: get an email.
3. **Footer** — untouched, still links to `shop.html`/`story.html`/
   `community.html`, which still hold the *earlier* placeholder-content
   build (fake products, fake prices, fake community grid). Nobody has
   asked for those to change yet — see §6 open item.

`shop.html`, `product.html`, `story.html`, `community.html` are
**untouched from the original full-site build** (see §3, first
commit). They still exist, still work, still have the full design
system applied — they're just not what the homepage points visitors
toward as the main journey anymore.

## 3. Session history — what happened, in order

### Commit `17c917b` — Full audit pass
A "master audit and elevation" pass over the entire site the owner
had already built out (all 5 pages, full design system, DESIGN.md).
Fixed real, verified bugs — not invented ones:
- **Footer was invisible on paper-themed pages.** `.foot` never set an
  explicit background/text color, so on `body.page--paper` pages the
  paper-colored footer text sat on a paper-colored background.
  Confirmed with a before/after Playwright screenshot, not just CSS
  reading. Fixed with explicit `background: hsl(var(--ink))` /
  `color: hsl(var(--paper))`.
- **WCAG AA contrast failures**, found by computing actual contrast
  ratios (W3C relative-luminance formula, not eyeballing) for every
  `--grey-1`/`--grey-2` usage. `grey-1` on `paper` measured 2.69:1
  (needs 4.5:1) in six real places; switched those to `grey-2`
  (5.14:1).
- Added missing SEO/PWA files (`robots.txt`, `sitemap.xml`,
  `site.webmanifest`, favicons, `og-image.jpg` — a brand wordmark, not
  fake campaign photography, per `DESIGN.md` §5).
- Accessibility pass: skip-link, `aria-expanded`/`aria-pressed` on
  interactive toggles, `role="timer"` on the countdown, `aria-hidden`
  on decorative frame internals.
- Built out a **real** `localStorage`-backed cart (key
  `wewillbe_cart`) with an actual slide-in drawer — previously a stub.
- Page-transition fade, nav hamburger morph, scroll-scrubbed parallax,
  stagger reveals, clip-path frame wipes — all gated behind
  `prefers-reduced-motion`.
- Explicitly did **not** add spring/bounce easing even though the
  generic audit brief asked for it, because `DESIGN.md` §4 rules it
  out as a deliberate brand decision. Said so plainly rather than
  silently complying or silently ignoring the ask.

### Commit `ad88de9` — Real hero video (desktop)
Owner sent a real campaign clip (person in a WEWILLBE hoodie on a
cobblestone street, landscape). Transcoded to `hero-01.mp4`
(1280×720, h264, audio stripped, faststart, ~1.9MB) + `hero-01-poster.jpg`
poster frame. Replaced the `.frame` "WWB" placeholder in the hero with
this video, kept `.frame__corners` as a permanent brand motif layered
over it (not just a placeholder signal — `DESIGN.md` treats the
corner-bracket motif as permanent). Added reduced-motion handling and
IntersectionObserver play/pause so the video doesn't decode off-screen.

### Commit `04a5cf3` — Real hero video (mobile)
Owner sent a second clip, portrait (9:16). Transcoded to
`hero-01-mobile.mp4` (640×1138, ~1.4MB) + matching poster. Wired in via
`<source media="(max-width: 860px)">` ahead of the desktop source
(860px matches the site's existing nav breakpoint), so phones get a
properly framed portrait shot instead of a cropped slice of the
landscape video. `script.js` also swaps the `poster` attribute by the
same breakpoint since `<video poster>` isn't natively responsive.

### Commit `3418b94` — First countdown attempt (superseded)
Added a slim countdown bar under the hero targeting a drop "Saturday."
This was **superseded one commit later** — see next entry. Also added
digit-tick animation and a "live" end-state to the shared countdown
component, both of which survived into the current version.

### Commit `9375b4d` — Current state: stripped homepage
Owner clarified (Dutch, paraphrased): *"No, I mean I only want the
header and next-drop-Saturday — people can email me to stay notified.
Take everything else off for now, we'll build the site up slowly once
I have my first real collection. Big mega-timer. Site launches soon."*

Acted on literally:
- Removed marquee, six-product collection grid, manifesto pull-quote,
  the old `.drop` section, featured strip, and community teaser from
  `index.html`. Homepage went from ~2400px to ~940px tall.
- Replaced the slim bar with a full-width, high-impact section: big
  "THIS SATURDAY." headline, oversized accent-colored countdown
  digits, and the email form **inline** (previously just a link to
  scroll elsewhere).
- Cleaned up now-dead CSS (`.drop-bar`, `.drop`, `.featured-strip`/
  `.featured-card`, `.legends-cta`) while keeping `.legends-grid`,
  `.manifesto`, `.product-grid`, `.sec-head` — those are still used by
  `shop.html`/`product.html`/`story.html`/`community.html`.
- Updated `README.md` to describe the pre-launch state.

## 4. Why the homepage looks so bare right now

This is **intentional**, not incomplete work. The owner does not have
a real collection ready yet and explicitly did not want the homepage
implying otherwise (a fake product grid with fake prices on a page
that's supposed to be building real anticipation). The plan, in the
owner's words, is to rebuild the homepage "rustig, rustig" (calmly,
section by section) once the first real drop exists. Don't
reintroduce the old collection grid / featured strip / community
teaser sections speculatively — wait for real product content, then
bring pieces back deliberately.

## 5. Key facts for whoever continues this

- **Countdown target**: `data-countdown-target="2026-08-08T12:00:00"`
  in `index.html` (`#drop` section). Saturday, noon — noon was an
  *assumption* on my part (the owner only said "Saturday"), flagged to
  them, not yet confirmed. **Check with the owner before the date
  passes**, and update this one attribute if the time is wrong.
- **Cache-busting**: `style.css`/`script.js` are at `?v=6` across all
  5 HTML files. Bump this on every CSS/JS change or browsers serve
  stale assets.
- **This sandbox's headless Chromium has no H.264 decoder** (open-source
  Chromium build, no proprietary codec license) — video playback
  cannot be visually verified in Playwright here even though the files
  are valid H.264 (confirmed via `ffprobe`) and play in every real
  browser. If verifying video work again, check `ffprobe` output and
  test a throwaway VP9 file in the same browser to confirm it's a
  sandbox limitation, not a real bug, before concluding anything is
  broken.
- **Python's `http.server` doesn't support Range requests**, which
  breaks local video testing (Chromium aborts the load). A
  Range-supporting test server implementation is worth writing fresh
  each time rather than assuming plain `http.server` will do — it
  won't, for video.
- **The `[data-notify-form]` forms are client-side only** — they show
  a loading/success micro-state but don't send anywhere yet. Point
  them at a real ESP (Klaviyo/Mailchimp/etc.) before launch if actual
  email capture matters for Saturday.
- **`shop.html`, `product.html`, `story.html`, `community.html`** still
  contain the earlier placeholder-content build (fake products, fake
  prices, fake reviews, fake community grid) from before this
  session's audit pass. Nobody has asked to touch them yet.

## 6. Open items — not done because not yet asked, flagged for the owner

- Nav (`Shop`/`Collections`/`Story`/`Community`) and the footer's
  `Shop`/`Studio` link columns still point into the placeholder-content
  pages described above. Whether to hide/simplify those until real
  content exists, or leave them as a preview of what's coming, is the
  owner's call — raised once, not acted on.
- Exact drop time (currently assumed noon) — confirm with the owner.
- Real ESP wiring for the notify form, if they want actual emails
  captured before Saturday rather than just the UI.

## 7. How to run this locally

```bash
cd wewillbe
python3 -m http.server 8080
# open http://localhost:8080
```

No install step. For testing the hero video specifically, a plain
`http.server` won't work (see §5) — you need something that serves
HTTP Range requests, or just trust `ffprobe`/file validity and skip
live playback verification.

## 8. Design constraints that keep coming up (don't relitigate these)

- No spring/bounce/overshoot easing, anywhere. `--ease:
  cubic-bezier(0.22, 1, 0.36, 1)` only. This is a brand decision, not
  an oversight, even when generic "add micro-interactions" requests
  seem to imply otherwise.
- Never fabricate reviews, ratings, testimonials, or product data —
  `DESIGN.md` §9 and `README.md`'s Reviews integration note both call
  this out explicitly.
- Never generate AI fashion photography to fill placeholder slots.
  Real photography/video from the owner replaces `.frame` placeholders
  when it arrives; nothing should be invented to fill the gap in the
  meantime.
- The `.frame__corners` viewfinder-bracket motif is a **permanent
  brand element**, not just a "photo pending" signal — keep it layered
  over real photography too, as done in the hero.
