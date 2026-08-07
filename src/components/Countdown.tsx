"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCountdown } from "@/lib/useCountdown";
import { PREORDER_DEADLINE, SHIP_DAY_LABEL } from "@/lib/constants";
import Reveal from "./Reveal";

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

function pad(n: number) {
  return String(Math.max(n, 0)).padStart(2, "0");
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[4.8rem] w-[5.4rem] overflow-hidden sm:h-[6rem] sm:w-[4.6rem] md:h-[7.5rem] md:w-[7.5rem] lg:h-[9rem] lg:w-[9rem]">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            className="absolute inset-0 flex items-center justify-center font-sans text-[3.6rem] font-black tabular-nums leading-none text-paper [text-shadow:0_0_50px_rgba(137,50,36,0.75)] sm:text-[4.4rem] md:text-[5.6rem] lg:text-[6.8rem]"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -22 }}
            transition={{ duration: 0.5, ease: EASE_LUXURY }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-paper/50 sm:mt-3 sm:text-[0.68rem] md:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const { days, hours, minutes, seconds, isOver } = useCountdown(PREORDER_DEADLINE);

  return (
    <section className="relative overflow-hidden bg-charcoal py-24 md:py-36" aria-label="Pre-order countdown">
      <div className="grain" />
      {/* A dramatic, breathing glow behind the numbers instead of flat
          charcoal — the countdown is the one thing on this page meant to
          feel urgent, so it's the one background that's never fully still. */}
      <motion.div
        className="absolute left-1/2 top-1/2 -z-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(137,50,36,0.5) 0%, rgba(137,50,36,0) 70%)" }}
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-accent sm:text-sm">
            {isOver ? "Pre-Orders Have Closed" : "Pre-Order Ends In"}
          </span>
        </Reveal>

        {!isOver ? (
          <Reveal delay={0.1} className="mt-10 grid grid-cols-2 place-items-center gap-x-4 gap-y-8 sm:flex sm:items-center sm:gap-4 md:mt-12 md:gap-6 lg:gap-9">
            <CountdownUnit value={pad(days)} label="Days" />
            <span className="hidden mb-7 font-sans text-xl font-light text-paper/20 sm:mb-8 sm:block sm:text-3xl md:mb-10 md:text-4xl">:</span>
            <CountdownUnit value={pad(hours)} label="Hrs" />
            <span className="hidden mb-7 font-sans text-xl font-light text-paper/20 sm:mb-8 sm:block sm:text-3xl md:mb-10 md:text-4xl">:</span>
            <CountdownUnit value={pad(minutes)} label="Min" />
            <span className="hidden mb-7 font-sans text-xl font-light text-paper/20 sm:mb-8 sm:block sm:text-3xl md:mb-10 md:text-4xl">:</span>
            <CountdownUnit value={pad(seconds)} label="Sec" />
          </Reveal>
        ) : (
          <Reveal delay={0.1} className="mt-8 md:mt-12">
            <p className="font-sans text-4xl font-black uppercase text-paper md:text-6xl">Go time.</p>
          </Reveal>
        )}

        <Reveal delay={0.2} className="mt-10 md:mt-14">
          <p className="font-serif italic text-lg text-paper/70 md:text-xl">
            All pre-orders ship {SHIP_DAY_LABEL.toLowerCase()}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
