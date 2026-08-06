"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND } from "@/lib/constants";

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setVisible(false), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_LUXURY }}
        >
          <motion.span
            className="font-sans text-lg font-black uppercase tracking-[0.1em] text-paper"
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, letterSpacing: "0.1em" }}
            transition={{ duration: 0.9, ease: EASE_LUXURY }}
          >
            {BRAND.name}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
