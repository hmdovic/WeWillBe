"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Product, Size } from "@/lib/constants";
import { SIZES } from "@/lib/constants";
import { usePreorder } from "./PreorderContext";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

function formatEUR(n: number) {
  return "€" + n.toFixed(2).replace(".", ",");
}

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const { open } = usePreorder();
  const [size, setSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  // A whisper of 3D tilt, desktop pointer only — the card leans slightly
  // toward the cursor instead of sitting completely flat.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springX = useSpring(tiltX, { stiffness: 250, damping: 25 });
  const springY = useSpring(tiltY, { stiffness: 250, damping: 25 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  function handleTiltMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    tiltX.set((e.clientX - rect.left) / rect.width - 0.5);
    tiltY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleTiltLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  function handlePreorder() {
    if (!size) {
      setSizeError(true);
      return;
    }
    open(product, size, qty);
  }

  return (
    <Reveal delay={index * 0.08} className="group">
      <motion.div
        className="relative aspect-[4/5] overflow-hidden bg-paper"
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        onMouseMove={handleTiltMove}
        onMouseLeave={handleTiltLeave}
      >
        {/* Lead with the back print — that's where the branding lives, and
            it's the more interesting shot. Front (plain) reveals on hover. */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_LUXURY }}
        >
          <Image
            src={product.backImage}
            alt={`${product.name} — back, wewillbe LEGENDS print`}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE_LUXURY }}
        >
          {product.video ? (
            // Real footage of this exact piece, not another static shot —
            // loops on hover instead of just sitting there like the tee/hoodie.
            <video
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              aria-label={`${product.name} — front, in motion`}
              poster={product.videoPoster}
              muted
              loop
              playsInline
              preload="none"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => e.currentTarget.pause()}
            >
              <source src={product.video} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={product.frontImage}
              alt={`${product.name} — front`}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </motion.div>
        <span className="absolute left-3 top-3 bg-ink px-2 py-1 text-[0.55rem] font-bold uppercase tracking-[0.14em] text-paper sm:left-5 sm:top-5 sm:px-3 sm:py-1.5 sm:text-[0.62rem] sm:tracking-[0.16em]">
          {String(index + 1).padStart(2, "0")} — Limited
        </span>
      </motion.div>

      <div className="mt-4 sm:mt-7">
        <h3 className="font-sans text-base font-black uppercase tracking-[-0.01em] text-paper sm:text-2xl md:text-3xl">
          {product.name}
        </h3>
        <p className="mt-2 hidden max-w-md text-sm leading-relaxed text-paper/60 sm:mt-3 sm:block">
          {product.description}
        </p>

        <ul className="mt-4 hidden flex-wrap gap-x-5 gap-y-1 text-[0.72rem] uppercase tracking-[0.06em] text-paper/55 sm:flex">
          {product.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>

        <p className="mt-2 text-base font-bold text-paper sm:mt-5 sm:text-xl">{formatEUR(product.price)}</p>

        <div className="mt-4 sm:mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-paper/70 sm:text-[0.68rem] sm:tracking-[0.14em]">
              Select Size
            </span>
            <button
              type="button"
              onClick={() => setShowSizeGuide((v) => !v)}
              className="hidden text-[0.68rem] text-paper/50 underline underline-offset-2 hover:text-paper/80 sm:inline"
            >
              Size Guide
            </button>
          </div>
          {showSizeGuide && (
            <p className="mb-3 text-xs leading-relaxed text-paper/50">
              Fits oversized by design. For a true-to-size box fit, order your usual size. For an
              extra-roomy fit, size up one.
            </p>
          )}
          {/* Flex-wrap with a real minimum width, not a fixed 6-column grid
              — so on a narrow (2-up mobile) card the pills wrap to a second
              row instead of shrinking until the pressed state is invisible. */}
          <div role="group" aria-label="Select size" className="flex flex-wrap gap-1.5">
            {SIZES.map((s) => (
              <motion.button
                key={s}
                type="button"
                aria-pressed={size === s}
                whileTap={{ scale: 0.88 }}
                onClick={() => {
                  setSize(s);
                  setSizeError(false);
                }}
                className={`min-w-[2.6rem] flex-1 border py-2 text-[0.7rem] font-semibold transition-[border-color,background-color,color,box-shadow] duration-150 sm:min-w-[3rem] sm:py-2.5 sm:text-xs ${
                  size === s
                    ? "border-accent bg-paper text-ink ring-1 ring-accent"
                    : "border-paper/25 text-paper/70 hover:border-paper/60 active:border-paper active:bg-paper/10"
                }`}
              >
                {s}
              </motion.button>
            ))}
          </div>
          {sizeError && <p className="mt-2 text-xs text-accent">Pick a size first.</p>}
        </div>

        <div className="mt-4 flex items-center gap-2 sm:mt-6 sm:gap-4">
          <div className="flex items-center border border-paper/25">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-11 w-11 text-base text-paper/70 transition-[transform,color,background-color] duration-150 ease-out hover:text-paper active:scale-90 active:bg-paper/10 sm:h-12 sm:w-11 sm:text-lg"
            >
              &minus;
            </button>
            <span className="w-6 text-center text-xs font-semibold text-paper sm:w-8 sm:text-sm">{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => Math.min(9, q + 1))}
              className="h-11 w-11 text-base text-paper/70 transition-[transform,color,background-color] duration-150 ease-out hover:text-paper active:scale-90 active:bg-paper/10 sm:h-12 sm:w-11 sm:text-lg"
            >
              +
            </button>
          </div>
          <MagneticButton
            onClick={handlePreorder}
            className="flex-1 bg-paper px-3 py-3 text-center text-[0.65rem] font-bold uppercase tracking-[0.1em] text-ink hover:bg-white sm:px-6 sm:py-3.5 sm:text-xs sm:tracking-[0.14em]"
          >
            Pre-Order
          </MagneticButton>
        </div>

        <p className="mt-3 hidden text-[0.7rem] uppercase tracking-[0.08em] text-paper/55 sm:mt-5 sm:block">
          Ships This Sunday · Limited First Collection · No Restocks
        </p>
      </div>
    </Reveal>
  );
}
