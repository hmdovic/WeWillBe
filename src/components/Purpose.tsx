import Image from "next/image";
import Reveal from "./Reveal";

// Heart clip-path, defined once in objectBoundingBox units so it scales
// to whatever size the image box actually is (128px on mobile, 160px on
// desktop) instead of a fixed-pixel path that would only fit one size.
const HEART_CLIP_PATH_ID = "purpose-heart-clip";

export default function Purpose() {
  return (
    <section id="purpose" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="grain" />
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id={HEART_CLIP_PATH_ID} clipPathUnits="objectBoundingBox">
            <path d="M0.5,0.96 C0.5,0.96 0.04,0.62 0.04,0.32 C0.04,0.15 0.17,0.02 0.33,0.02 C0.42,0.02 0.49,0.08 0.5,0.17 C0.51,0.08 0.58,0.02 0.67,0.02 C0.83,0.02 0.96,0.15 0.96,0.32 C0.96,0.62 0.5,0.96 0.5,0.96 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal className="flex flex-col items-center">
          {/* An explicit statement, by request — not the subtle non-flag
              nod this section used before. Owner confirmed this reversal
              knowingly, aware it also reverses the "no flags" line in the
              original brief. Container is heart-shaped (clip-path), not a
              circle, so the flag graphic's own silhouette isn't cropped away. */}
          <div
            className="relative mb-9 h-36 w-36 md:h-44 md:w-44"
            style={{ clipPath: `url(#${HEART_CLIP_PATH_ID})` }}
          >
            <Image
              src="/images/palestine-heart.jpg"
              alt="A heart in the colors of the Palestinian flag"
              fill
              className="object-cover scale-110"
              sizes="176px"
            />
          </div>

          <span className="mb-4 block font-sans text-lg font-black uppercase tracking-[-0.01em] text-paper md:text-2xl">
            We Support Palestine.
          </span>

          <span
            className="mx-auto mb-8 block h-[2px] w-16"
            style={{
              background:
                "linear-gradient(to right, #6b8f6b, #d8d3c7, #2b2826, #8a4a42)",
            }}
            aria-hidden="true"
          />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            More Than Clothing
          </span>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <p className="font-serif italic text-xl leading-relaxed text-paper md:text-3xl">
            50% of the profits from this collection are donated by WEWILLBE to Save the
            Children, to support children affected by the humanitarian crisis in Palestine.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="mt-10">
          <p className="text-sm leading-relaxed text-paper/55 md:text-base">
            Hope doesn&rsquo;t need permission. Neither does compassion. This is our own
            position, and our own commitment — not a cause we&rsquo;re borrowing for a
            campaign.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12">
          <p className="mx-auto max-w-xl text-xs leading-relaxed text-paper/35">
            The statement above is WEWILLBE&rsquo;s own. The donation is WEWILLBE&rsquo;s own
            commitment, made to Save the Children directly — it does not imply an official
            partnership with Save the Children unless and until one is confirmed. We&rsquo;ll
            share proof of each transfer as pre-orders come in.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
