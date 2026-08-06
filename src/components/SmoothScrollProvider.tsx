"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1 });
    let frame: number;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  // "user" makes every Framer Motion animation on the page automatically
  // honor the OS-level prefers-reduced-motion setting, without having to
  // remember to gate each individual component.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
