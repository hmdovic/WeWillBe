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
      <div className="relative h-[3.4rem] w-[3.6rem] overflow-hidden md:h-[7rem] md:w-[7.5rem] lg:h-[8.5rem] lg:w-[9rem]">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            className="absolute inset-0 flex items-center justify-center font-sans text-[2.6rem] font-black tabular-nums leading-none text-paper md:text-[5.2rem] lg:text-[6.4rem]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease: EASE_LUXURY }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-paper/45 md:text-xs">
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
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            {isOver ? "Pre-Orders Have Closed" : "Pre-Order Ends In"}
          </span>
        </Reveal>

        {!isOver ? (
          <Reveal delay={0.1} className="mt-8 flex items-center gap-3 md:mt-12 md:gap-6 lg:gap-9">
            <CountdownUnit value={pad(days)} label="Days" />
            <span className="mb-6 font-sans text-2xl font-light text-paper/20 md:mb-10 md:text-4xl">:</span>
            <CountdownUnit value={pad(hours)} label="Hrs" />
            <span className="mb-6 font-sans text-2xl font-light text-paper/20 md:mb-10 md:text-4xl">:</span>
            <CountdownUnit value={pad(minutes)} label="Min" />
            <span className="mb-6 font-sans text-2xl font-light text-paper/20 md:mb-10 md:text-4xl">:</span>
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
