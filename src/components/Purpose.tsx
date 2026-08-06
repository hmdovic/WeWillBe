import Image from "next/image";
import Reveal from "./Reveal";

export default function Purpose() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div className="grain" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal className="flex flex-col items-center">
          {/* An explicit statement, by request — not the subtle non-flag
              nod this section used before. Owner confirmed this reversal
              knowingly, aware it also reverses the "no flags" line in the
              original brief. */}
          <div className="relative mb-9 h-32 w-32 overflow-hidden rounded-full ring-1 ring-paper/15 md:h-40 md:w-40">
            <Image
              src="/images/palestine-heart.jpg"
              alt="A heart in the colors of the Palestinian flag"
              fill
              className="object-cover"
              sizes="160px"
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
