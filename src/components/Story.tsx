"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

export default function Story() {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgWrapRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="relative bg-paper py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 md:grid-cols-2 md:gap-20 md:px-10 md:items-center">
        <Reveal className="relative aspect-[4/5] overflow-hidden order-2 md:order-1" y={0}>
          <div ref={imgWrapRef} className="absolute inset-0">
            <motion.div className="absolute inset-[-10%]" style={{ y: imgY }}>
              <Image
                src="/images/hoodie-lifestyle-03.jpg"
                alt="A WEWILLBE Legend, back turned, in the LEGENDS hoodie"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </Reveal>

        <div className="order-1 md:order-2">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              The Story
            </span>
          </Reveal>

          <Reveal delay={0.05} className="mt-6 space-y-1">
            <p className="font-serif italic text-2xl leading-snug text-ink md:text-3xl">
              WEWILLBE wasn&rsquo;t created to chase trends.
            </p>
            <p className="font-serif italic text-2xl leading-snug text-ink md:text-3xl">
              It was created for people who keep moving forward.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 space-y-2 text-sm uppercase tracking-[0.06em] text-ink/60">
            <p>This collection is the beginning.</p>
            <p>No restocks.</p>
            <p>No mass production.</p>
            <p>Only the people who believed first will own the First Collection.</p>
          </Reveal>

          <Reveal delay={0.25} className="mt-10">
            <p className="font-serif italic text-xl leading-snug text-ink md:text-2xl">
              We don&rsquo;t believe clothing changes people.
              <br />
              People change the meaning of clothing.
            </p>
          </Reveal>

          <Reveal delay={0.35} className="mt-10">
            <p className="font-sans text-3xl font-black uppercase tracking-[-0.01em] text-ink md:text-4xl">
              We will be.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
