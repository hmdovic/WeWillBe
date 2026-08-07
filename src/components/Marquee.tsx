"use client";

import { motion } from "framer-motion";

const ITEMS = [
  "LIMITED FIRST COLLECTION",
  "NO RESTOCKS",
  "WE DON'T FOLLOW. WE BECOME.",
  "SHIPS THIS SUNDAY",
];

/** A continuously scrolling ticker — the one element on the page that's
 * always visibly moving, no scroll or hover required. Duplicated content
 * so the loop has no visible seam; paused entirely under
 * prefers-reduced-motion via MotionConfig upstream. */
export default function Marquee() {
  const track = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-paper/10 bg-ink py-4" aria-hidden="true">
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-paper/70">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
