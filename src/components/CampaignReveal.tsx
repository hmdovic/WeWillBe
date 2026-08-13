"use client";

import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

/** A second video moment, upstream of Products — the clip already tells
 * its own story (baked-in captions building to the wewillbe LEGENDS
 * reveal), so this section stays tall enough to show that story at full
 * portrait height instead of cropping it into a short strip, and keeps
 * its own copy pinned to the bottom, out of the way of the on-screen
 * captions running through the middle of the clip. */
export default function CampaignReveal() {
  return (
    <section className="relative flex min-h-[85vh] w-full flex-col justify-end overflow-hidden py-14 text-center md:min-h-screen md:py-20">
      <div className="absolute inset-0 -z-20">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 20%" }}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/campaign-reveal-poster.jpg"
        >
          <source src="/video/campaign-reveal-mobile.mp4" media="(max-width: 860px)" type="video/mp4" />
          <source src="/video/campaign-reveal.mp4" type="video/mp4" />
        </video>
      </div>
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(19,17,16,0.94) 0%, rgba(19,17,16,0.55) 22%, rgba(19,17,16,0) 45%)",
        }}
      />
      <div className="grain -z-10" />

      <div className="relative mx-auto max-w-2xl px-6">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-paper/70">
            wewillbe &middot; Legends
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-5">
          <MagneticButton
            href="#collection"
            className="inline-block bg-paper px-10 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] hover:bg-white"
          >
            Shop The Drop
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
