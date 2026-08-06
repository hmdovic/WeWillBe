# WEWILLBE

**We don't follow. We become.**

A single-page, pre-order-only launch experience for WEWILLBE's First
Collection (LEGENDS Tee + LEGENDS Hoodie). Next.js 15, TypeScript,
Tailwind CSS 4, GSAP-adjacent motion via Framer Motion, Lenis smooth
scroll. Static export — no server, deploys to GitHub Pages.

There is one goal on this page: get visitors to pre-order. That's it —
no nav, no extra pages, no blog. See `HANDOFF.md` for the full history
of how this repo got here (it used to be a plain static HTML site;
that entire build is archived, not deleted, in `legacy-static/`).

## Stack

- **Next.js 15** (App Router, `output: "export"` — fully static, no
  Node server required at runtime)
- **TypeScript**, **Tailwind CSS 4** (CSS-first `@theme` tokens in
  `src/app/globals.css`)
- **Framer Motion** for scroll reveals, the modal, magnetic buttons,
  the countdown digit transitions
- **Lenis** for smooth scroll
- **@emailjs/browser** for the pre-order form (see below — currently
  inert, falls back to a working `mailto:` link)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

## Project structure

| Path | Purpose |
|---|---|
| `src/app/page.tsx` | Assembles the whole page: Hero → Countdown → Products → SocialProof → Story → Purpose → PreorderSection → Footer |
| `src/components/Hero.tsx` | Fullscreen video hero (the couple, `public/video/hero-couple*.mp4`), luxury type reveal, magnetic CTAs |
| `src/components/Countdown.tsx` | Pre-order deadline countdown — see `PREORDER_DEADLINE` in `src/lib/constants.ts` |
| `src/components/Products.tsx` / `ProductCard.tsx` | The two products, front/back hover-reveal, size + quantity, opens the pre-order modal |
| `src/components/SocialProof.tsx` | Honest, manually-set join count (see comment below) |
| `src/components/Story.tsx` | Editorial manifesto section |
| `src/components/Purpose.tsx` | The Save the Children commitment, with the required disclaimer |
| `src/components/PreorderSection.tsx` | Closing CTA banner |
| `src/components/PreorderModal.tsx` | The fullscreen pre-order form — the only real "backend" this page has |
| `src/components/Footer.tsx` | Minimal: wordmark, socials, email, copyright |
| `src/lib/constants.ts` | **Single source of truth** for products, prices, the countdown deadline, brand config, and EmailJS/GA env wiring |
| `legacy-static/` | The previous plain-HTML site, fully archived, not deleted |

## Pre-order form: how it actually sends

There's no backend. Two paths, in order:

1. **EmailJS, if configured.** Set the three `NEXT_PUBLIC_EMAILJS_*`
   vars (see `.env.example`) and the form calls `emailjs.send()`
   directly from the browser — real, seamless, no page navigation.
2. **`mailto:` fallback, always available.** If EmailJS isn't
   configured (the default — no credentials were provided while
   building this), submitting the form opens the visitor's email
   client with every field pre-filled, addressed to
   `vormiq@outlook.com`. This is a **real, working** pre-order path
   today, not a placeholder — it just requires the visitor to hit
   send in their own mail app, so the confirmation screen says "Almost
   there" instead of "Received," honestly reflecting that difference.

**To switch on EmailJS:** create an account at emailjs.com, an email
service, and a template with fields matching the form (see the comment
in `.env.example` for the exact field names), then set the three env
vars. Nothing else in the code needs to change — `EMAILJS_CONFIGURED`
in `src/lib/constants.ts` flips automatically once all three are
non-empty.

## Things marked CONFIRM in the code

A few decisions were made in the absence of real input, to avoid
blocking the build — cheap to change, but real business decisions:

- **`PRODUCTS[1].price`** (Legends Hoodie, currently €129,95) — no
  price was given for the hoodie; the tee's €69,95 was already
  established. Change it in `src/lib/constants.ts`.
- **`PREORDER_DEADLINE`** — currently Saturday at noon (consistent with
  every prior countdown on this project), shipping "this Sunday."
  Confirm the exact time.
- **`JOINED_COUNT`** — a manually-set number (128), not a fabricated
  live ticker. Update it by hand until there's a real backend to
  count actual pre-orders; never make this auto-increment client-side,
  that would be fake social proof.

## Deployment

`.github/workflows/deploy.yml` builds the static export and publishes
it to GitHub Pages on every push to `main`. The custom domain
(`wewillbe.store`) is preserved via `public/CNAME`, which Next.js
copies into `out/` on build. To turn on EmailJS/GA4 in production,
add the same env vars as GitHub Actions secrets (repo Settings →
Secrets and variables → Actions) — the workflow already reads them.

If this ever moves to Vercel or Netlify instead of GitHub Pages, the
`output: "export"` line in `next.config.ts` can just be deleted — both
platforms run Next.js natively, no static export needed.

## Accessibility & performance

Skip-to-content link, `role="dialog"`/`aria-modal` on the pre-order
modal, `aria-pressed` on size selectors, Escape-to-close + focus on the
close button, all motion gated behind `prefers-reduced-motion`
(Framer Motion via `MotionConfig reducedMotion="user"`, Lenis and the
hero's mouse-parallax skip entirely). Images use `next/image` with
explicit `sizes`; the hero ships a separate, smaller video source for
narrow viewports. First-load JS is ~160kB.

## Known gaps

- `npm audit` flags 3 high-severity advisories in `postcss`/`sharp`
  (both Next.js build-time dependencies, not runtime/browser code).
  The fix requires Next.js 16, a major-version bump beyond what was
  asked for here — flagging rather than silently upgrading.
- No privacy policy page yet. Required before GA4 (once configured) or
  the pre-order form collects real PII from EU/UK visitors at scale.
- Country field is free text, not a validated country selector.
