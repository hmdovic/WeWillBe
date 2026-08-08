"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SHIP_DAY_LABEL } from "@/lib/constants";

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Short, honest rotating messages only — nothing fabricated (no fake
// "free shipping" or discount claims not backed by constants.ts).
const MESSAGES = [
  "PRE-ORDER NOW — LIMITED FIRST COLLECTION",
  `ALL PRE-ORDERS SHIP ${SHIP_DAY_LABEL.toUpperCase()}`,
  "WE SUPPORT PALESTINE",
];

/** A thin, always-first announcement strip — the plain top-of-page slot
 * Daily Paper / Icon Amsterdam use, sitting above everything else in
 * normal flow (not fixed, so it scrolls away with the rest of the page
 * instead of permanently eating viewport height). */
export default function PromoBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative z-[60] flex h-8 items-center justify-center overflow-hidden bg-ink px-4 sm:h-9">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="text-center text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-paper/85 sm:text-[0.68rem] sm:tracking-[0.22em]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: EASE_LUXURY }}
        >
          {MESSAGES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
