"use client";

import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import { usePreorder } from "./PreorderContext";

export default function PreorderSection() {
  const { open } = usePreorder();

  return (
    <section className="relative overflow-hidden bg-paper py-28 text-center md:py-40">
      <div className="relative mx-auto max-w-2xl px-6">
        <Reveal>
          <h2 className="font-sans text-4xl font-black uppercase leading-[0.92] tracking-[-0.01em] text-ink md:text-6xl">
            Own the beginning.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-6">
          <p className="text-base text-ink/60 md:text-lg">
            Limited First Collection. No restocks. Ships this Sunday.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <MagneticButton
            onClick={() => open()}
            className="bg-ink px-10 py-5 text-xs font-bold uppercase tracking-[0.16em] text-paper hover:bg-ink/85"
          >
            Pre-Order Now
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
