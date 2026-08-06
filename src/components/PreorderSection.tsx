"use client";

import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import { usePreorder } from "./PreorderContext";

export default function PreorderSection() {
  const { open } = usePreorder();

  return (
    <section className="relative overflow-hidden py-28 text-center md:py-40">
      {/* The campaign video, back as a closing moment — same footage as
          the earlier hero cut, same gradient-scrim treatment, so the page
          bookends on the same visual instead of introducing a new one. */}
      <div className="absolute inset-0 -z-20">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 30%" }}
          autoPlay
          muted
          loop
          playsInline
          poster="/video/hero-couple-poster.jpg"
        >
          <source src="/video/hero-couple-mobile.mp4" media="(max-width: 860px)" type="video/mp4" />
          <source src="/video/hero-couple.mp4" type="video/mp4" />
        </video>
      </div>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(19,17,16,0.9) 0%, rgba(19,17,16,0.55) 55%, rgba(19,17,16,0.7) 100%)",
        }}
      />
      <div className="grain -z-10" />

      <div className="relative mx-auto max-w-2xl px-6">
        <Reveal>
          <h2 className="font-sans text-4xl font-black uppercase leading-[0.92] tracking-[-0.01em] text-paper md:text-6xl">
            Own the beginning.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-6">
          <p className="text-base text-paper/70 md:text-lg">
            Limited First Collection. No restocks. Ships this Sunday.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <MagneticButton
            onClick={() => open()}
            className="bg-paper px-10 py-5 text-xs font-bold uppercase tracking-[0.16em] text-ink shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] hover:bg-white"
          >
            Pre-Order Now
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
