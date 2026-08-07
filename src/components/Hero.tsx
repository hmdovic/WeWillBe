"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { BRAND } from "@/lib/constants";
import { usePreorder } from "./PreorderContext";
import MagneticButton from "./MagneticButton";
import SocialLinks from "./SocialLinks";

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];
const HEADLINE_LETTERS = BRAND.name.split("");

function HeadlineLetters({ sizeClass }: { sizeClass: string }) {
  return (
    <h1 className="flex" aria-label={BRAND.name}>
      {HEADLINE_LETTERS.map((letter, i) => (
        <span key={i} className="inline-block overflow-hidden" aria-hidden="true">
          <motion.span
            className={`font-headline block font-extrabold uppercase leading-[0.9] tracking-[-0.01em] text-paper ${sizeClass}`}
            initial={{ y: "115%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay: 0.5 + i * 0.045, ease: EASE_LUXURY }}
          >
            {letter}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

function PreorderCTAs({
  align = "center",
  showMicrocopy = true,
}: {
  align?: "center" | "start";
  showMicrocopy?: boolean;
}) {
  const { open } = usePreorder();
  const isStart = align === "start";

  function scrollToProducts() {
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <motion.div
        className={`mt-9 flex flex-wrap items-center gap-4 ${isStart ? "justify-start" : "justify-center"}`}
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

      {/* Dropped on mobile — the countdown right after this section already
          says "ends Saturday, ships Sunday" much louder. No need to say it
          twice before the visitor has even scrolled once. */}
      {showMicrocopy && (
        <motion.p
          className={`mt-5 text-[0.68rem] uppercase tracking-[0.12em] text-paper/55 ${isStart ? "text-left" : "text-center"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.35, ease: EASE_LUXURY }}
        >
          Pre-Orders Close Saturday · Ships This Sunday
        </motion.p>
      )}
    </>
  );
}

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax: as the hero scrolls out of view, the copy
  // fades and lifts a little faster than the background — a bit of
  // depth instead of the whole section moving as one flat plane.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  function handleMouseMove(e: React.MouseEvent) {
    const el = bgRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    el.style.transform = `translate(${(x * -10).toFixed(1)}px, ${(y * -8).toFixed(1)}px)`;
  }

  function handleMouseLeave() {
    if (bgRef.current) bgRef.current.style.transform = "";
  }

  return (
    <section id="hero" ref={sectionRef} className="relative w-full overflow-hidden">
      {/* ————————————————————— MOBILE / TABLET: full-bleed overlay ————————————————————— */}
      <div
        className="relative flex min-h-[100svh] w-full flex-col items-center justify-end pb-14 md:hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute -inset-5 -z-20">
          {/* A still photo has none of a video's built-in motion, so a
              slow, near-imperceptible ambient zoom stands in for it —
              the background is never quite sitting dead still. */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.07] }}
            transition={{ duration: 22, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
          >
            <Image
              src="/images/hero-couple-walking-mobile.jpg"
              alt="A couple walking hand in hand, back turned, wearing the WEWILLBE LEGENDS hoodie and tee"
              fill
              priority
              fetchPriority="high"
              className="object-cover"
              style={{ objectPosition: "center 22%" }}
              sizes="100vw"
            />
          </motion.div>
        </div>

        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(19,17,16,0.95) 0%, rgba(19,17,16,0.35) 38%, rgba(19,17,16,0.15) 60%, rgba(19,17,16,0.5) 100%)",
          }}
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(70% 55% at 50% 80%, rgba(19,17,16,0.55) 0%, rgba(19,17,16,0) 100%)",
          }}
        />
        <div className="grain -z-10" />

        <span className="absolute left-6 top-6 z-10 font-sans text-sm font-extrabold tracking-[0.08em] text-paper">
          {BRAND.name}
        </span>
        <SocialLinks className="absolute right-6 top-6 z-10" />

        <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-4xl">
          <motion.span
            className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-paper/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE_LUXURY }}
          >
            {BRAND.collection}
          </motion.span>

          <HeadlineLetters sizeClass="text-[2.5rem]" />

          <motion.p
            className="mt-5 max-w-md font-serif italic text-base text-paper/85"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: EASE_LUXURY }}
          >
            Not everyone will own one.
          </motion.p>

          <PreorderCTAs align="center" showMicrocopy={false} />
        </div>

        <ScrollIndicator />
      </div>

      {/* ————————————————————— DESKTOP: split panel, no crop gymnastics ————————————————————— */}
      <div className="hidden md:flex md:min-h-screen w-full">
        {/* Copy panel — plain ink background, own column, never fights the photo for legibility */}
        <motion.div
          className="relative z-10 flex w-[44%] flex-col bg-ink px-14 py-12 lg:px-20 lg:py-16"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm font-extrabold tracking-[0.08em] text-paper">
              {BRAND.name}
            </span>
            <SocialLinks />
          </div>

          <div className="max-w-lg flex-1 flex flex-col justify-center">
            <motion.span
              className="mb-5 block text-xs font-semibold uppercase tracking-[0.28em] text-paper/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE_LUXURY }}
            >
              {BRAND.collection}
            </motion.span>

            <HeadlineLetters sizeClass="text-[3.4rem] lg:text-[4.4rem]" />

            <motion.p
              className="mt-5 max-w-md font-serif italic text-lg text-paper/85"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05, ease: EASE_LUXURY }}
            >
              Not everyone will own one.
            </motion.p>

            <PreorderCTAs align="start" />
          </div>
        </motion.div>

        {/* Photo panel — the campaign still shown close to its own aspect
            ratio (a bounded column, not a full-bleed stretch), so nothing
            gets cropped out at odd desktop widths. */}
        <div className="relative w-[56%] overflow-hidden bg-ink" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <motion.div className="absolute -inset-5" style={{ y: bgY }}>
            <div ref={bgRef} className="absolute inset-0 transition-transform duration-500" style={{ transitionTimingFunction: "var(--ease-luxury)" }}>
              {/* Ambient zoom, same reasoning as the mobile panel — a
                  separate nested layer so it never fights the mouse-
                  parallax transform set imperatively on the parent. */}
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.06] }}
                transition={{ duration: 24, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
              >
                <Image
                  src="/images/hero-couple-walking.jpg"
                  alt="A couple walking hand in hand, back turned, wearing the WEWILLBE LEGENDS hoodie and tee"
                  fill
                  priority
                  fetchPriority="high"
                  className="object-cover"
                  style={{ objectPosition: "center 12%" }}
                  sizes="56vw"
                />
              </motion.div>
            </div>
          </motion.div>
          {/* Feather the inner edge into the ink panel — a seamless join
              instead of a hard seam between photo and background. */}
          <div
            className="absolute inset-y-0 left-0 -z-0 w-24"
            style={{ background: "linear-gradient(to right, rgba(19,17,16,0.9), rgba(19,17,16,0))" }}
          />
          <div
            className="absolute inset-x-0 bottom-0 -z-0 h-40"
            style={{ background: "linear-gradient(to top, rgba(19,17,16,0.55), rgba(19,17,16,0))" }}
          />
          <div className="grain" />
        </div>
      </div>
    </section>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-6 right-6 z-10 flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.6, ease: EASE_LUXURY }}
    >
      <span className="relative h-9 w-px overflow-hidden bg-paper/25">
        <motion.span
          className="absolute left-0 top-0 h-full w-full bg-paper"
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: EASE_LUXURY }}
        />
      </span>
    </motion.div>
  );
}
