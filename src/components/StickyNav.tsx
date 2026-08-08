"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { usePreorder } from "./PreorderContext";
import SocialLinks from "./SocialLinks";

const LINKS = [
  { href: "#collection", label: "Shop" },
  { href: "#story", label: "Story" },
  { href: "#purpose", label: "Support" },
];

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

/** A persistent utility bar, the kind Daily Paper / Icon Amsterdam keep
 * pinned above the page — but text-only, no logo (the logo's one job is
 * the hero reveal, never a second, smaller appearance right above it),
 * and it links to sections of this same page rather than separate
 * routes, since the page itself stays single-page by design. Hidden
 * until the visitor scrolls past the hero, so it never competes with
 * the hero's own header row. */
export default function StickyNav() {
  const { scrollYProgress } = useScroll();
  // First viewport is the hero; only start revealing once ~90% of it has
  // scrolled by, using window scroll rather than a per-section observer
  // to keep this one small and dependency-free.
  const y = useTransform(scrollYProgress, [0, 0.06, 0.08, 1], [-100, -100, 0, 0]);
  const { open } = usePreorder();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[150] hidden w-full border-b border-paper/10 bg-ink/95 backdrop-blur sm:block"
      style={{ y }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10">
        <nav className="flex items-center gap-6" aria-label="Section navigation">
          {LINKS.map((l) => (
            <button
              key={l.href}
              type="button"
              onClick={() => scrollTo(l.href)}
              className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-paper"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <SocialLinks />
          <button
            type="button"
            onClick={() => open()}
            className="border border-paper/40 px-4 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            style={{ transitionTimingFunction: "var(--ease-luxury)" }}
          >
            Pre-Order
          </button>
        </div>
      </div>
    </motion.div>
  );
}
