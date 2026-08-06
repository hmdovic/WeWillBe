"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A thin, fixed progress bar that fills as the visitor scrolls the
 * page — a small, honest signal of "how much is left," and one more
 * bit of the page that actually responds to scrolling instead of
 * sitting still. Spring-smoothed so it doesn't feel like a raw
 * percentage snapping around. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.2 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[200] h-[3px] w-full origin-left bg-accent"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
