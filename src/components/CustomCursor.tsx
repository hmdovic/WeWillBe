"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** A small interactive cursor — a dot that tracks the mouse exactly, and
 * a trailing ring that lags slightly behind and swells over anything
 * clickable. Desktop, fine-pointer only; never touches mobile/touch. */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.4 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setHovering(Boolean(target.closest("a, button, [role='button']")));
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full border border-paper/50 mix-blend-difference"
        animate={{ width: hovering ? 52 : 30, height: hovering ? 52 : 30, opacity: hovering ? 1 : 0.6 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
