"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";
import { usePreorder } from "./PreorderContext";
import MagneticButton from "./MagneticButton";

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  const { open } = usePreorder();
  const bgRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const el = bgRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    el.style.transform = `translate(${(x * -12).toFixed(1)}px, ${(y * -9).toFixed(1)}px)`;
  }

  function handleMouseLeave() {
    if (bgRef.current) bgRef.current.style.transform = "";
  }

  function scrollToProducts() {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden flex flex-col items-center justify-end pb-14 md:pb-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={bgRef} className="absolute -inset-5 -z-20 transition-transform duration-500" style={{ transitionTimingFunction: "var(--ease-luxury)" }}>
        {/* Art-directed still: the couple, back turned, in the real LEGENDS
            tee + hoodie. Two crops so the pair stays framed on both a tall
            phone screen and a wide desktop hero — not the same file
            stretched, an actual different crop per breakpoint. */}
        <Image
          src="/images/hero-couple-walking-mobile.jpg"
          alt="A couple walking hand in hand, back turned, wearing the WEWILLBE LEGENDS hoodie and tee"
          fill
          priority
          fetchPriority="high"
          className="object-cover md:hidden"
          style={{ objectPosition: "center 22%" }}
          sizes="100vw"
        />
        <Image
          src="/images/hero-couple-walking.jpg"
          alt="A couple walking hand in hand, back turned, wearing the WEWILLBE LEGENDS hoodie and tee"
          fill
          priority
          fetchPriority="high"
          className="hidden object-cover md:block"
          style={{ objectPosition: "center 20%" }}
          sizes="100vw"
        />
      </div>

      {/* Scrim: darker at the bottom where the overlay text + CTAs sit */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(19,17,16,0.95) 0%, rgba(19,17,16,0.35) 38%, rgba(19,17,16,0.15) 60%, rgba(19,17,16,0.5) 100%)",
        }}
      />
      {/* Extra vignette centered on the text/CTA column — guarantees the
          "Pre-Order Now" button and its copy stay legible no matter what's
          behind them in the photo (a light tee, a bright wall, etc.). */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 78%, rgba(19,17,16,0.55) 0%, rgba(19,17,16,0) 100%)",
        }}
      />
      <div className="grain -z-10" />

      <motion.div
        className="absolute left-6 top-6 md:left-10 md:top-8 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: EASE_LUXURY }}
      >
        <span className="font-sans text-sm font-extrabold tracking-[0.08em] text-paper">
          {BRAND.name}
        </span>
      </motion.div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-4xl">
        <motion.span
          className="mb-4 text-[0.7rem] md:text-xs font-semibold uppercase tracking-[0.28em] text-paper/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE_LUXURY }}
        >
          {BRAND.collection}
        </motion.span>

        <h1 className="overflow-hidden">
          <motion.span
            className="block font-sans font-black uppercase leading-[0.88] tracking-[-0.02em] text-paper text-[3.4rem] md:text-[7rem] lg:text-[9rem]"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, delay: 0.55, ease: EASE_LUXURY }}
          >
            {BRAND.name}
          </motion.span>
        </h1>

        <motion.p
          className="mt-5 max-w-md font-serif italic text-base md:text-lg text-paper/85"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: EASE_LUXURY }}
        >
          Not everyone will own one.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: EASE_LUXURY }}
        >
          <MagneticButton
            onClick={() => open()}
            className="group rounded-none bg-paper px-10 py-[1.15rem] text-sm font-bold uppercase tracking-[0.14em] text-ink shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] hover:bg-white"
          >
            <span className="inline-flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Pre-Order Now
            </span>
          </MagneticButton>
          <MagneticButton
            onClick={scrollToProducts}
            className="rounded-none border border-paper/50 px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] text-paper hover:border-paper hover:bg-paper/10"
          >
            Explore Collection
          </MagneticButton>
        </motion.div>

        <motion.p
          className="mt-5 text-[0.68rem] uppercase tracking-[0.12em] text-paper/55"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.35, ease: EASE_LUXURY }}
        >
          Pre-Orders Close Saturday · Ships This Sunday
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6, ease: EASE_LUXURY }}
      >
        <span className="text-[0.62rem] uppercase tracking-[0.24em] text-paper/60 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative h-9 w-px overflow-hidden bg-paper/25">
          <motion.span
            className="absolute left-0 top-0 h-full w-full bg-paper"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: EASE_LUXURY }}
          />
        </span>
      </motion.div>
    </section>
  );
}
