"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span";
}

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Scroll-triggered fade + rise, the one text/image reveal motif used
 * everywhere on this page instead of a different animation per section. */
export default function Reveal({ children, className = "", delay = 0, y = 28, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE_LUXURY }}
    >
      {children}
    </Component>
  );
}
