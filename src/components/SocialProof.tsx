"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { JOINED_COUNT } from "@/lib/constants";

/** A single, honestly-static number — not a fabricated live ticker. See
 * the comment on JOINED_COUNT in lib/constants.ts for how to wire this to
 * something real later. The count-up animation plays once, on first view,
 * counting toward that real (if manually set) number — it's a reveal
 * effect, not a simulation of live activity. */
export default function SocialProof() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(JOINED_COUNT);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let frame: number;
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * JOINED_COUNT));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <section className="border-y border-paper/10 bg-ink py-10">
      <motion.p
        className="text-center text-sm uppercase tracking-[0.14em] text-paper/60"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span ref={ref} className="font-sans text-lg font-black text-paper">
          {display}
        </span>{" "}
        people already joined the First Collection
      </motion.p>
    </section>
  );
}
