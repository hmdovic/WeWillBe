"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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

  function handlePreorder() {
    if (!size) {
      setSizeError(true);
      return;
    }
    open(product, size, qty);
  }

  return (
    <Reveal delay={index * 0.08} className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_LUXURY }}
        >
          <Image
            src={product.frontImage}
            alt={`${product.name} — front`}
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
          <Image
            src={product.backImage}
            alt={`${product.name} — back, wewillbe LEGENDS print`}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        <span className="absolute left-5 top-5 bg-ink px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-paper">
          {product.shortName === "Tee" ? "01" : "02"} — Limited
        </span>
      </div>

      <div className="mt-7">
        <h3 className="font-sans text-2xl font-black uppercase tracking-[-0.01em] text-paper md:text-3xl">
          {product.name}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/60">{product.description}</p>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.72rem] uppercase tracking-[0.06em] text-paper/45">
          {product.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>

        <p className="mt-5 text-xl font-bold text-paper">{formatEUR(product.price)}</p>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-paper/70">
              Select Size
            </span>
            <button
              type="button"
              onClick={() => setShowSizeGuide((v) => !v)}
              className="text-[0.68rem] text-paper/50 underline underline-offset-2 hover:text-paper/80"
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
          <div role="group" aria-label="Select size" className="grid grid-cols-6 gap-1.5">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => {
                  setSize(s);
                  setSizeError(false);
                }}
                className={`border py-2.5 text-xs font-semibold transition-colors duration-200 ${
                  size === s
                    ? "border-paper bg-paper text-ink"
                    : "border-paper/25 text-paper/70 hover:border-paper/60"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {sizeError && <p className="mt-2 text-xs text-accent">Pick a size first.</p>}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center border border-paper/25">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-12 w-11 text-lg text-paper/70 hover:text-paper"
            >
              &minus;
            </button>
            <span className="w-8 text-center text-sm font-semibold text-paper">{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => Math.min(9, q + 1))}
              className="h-12 w-11 text-lg text-paper/70 hover:text-paper"
            >
              +
            </button>
          </div>
          <MagneticButton
            onClick={handlePreorder}
            className="flex-1 bg-paper px-6 py-3.5 text-center text-xs font-bold uppercase tracking-[0.14em] text-ink hover:bg-white"
          >
            Pre-Order
          </MagneticButton>
        </div>

        <p className="mt-5 text-[0.7rem] uppercase tracking-[0.08em] text-paper/40">
          Ships This Sunday · Limited First Collection · No Restocks
        </p>
      </div>
    </Reveal>
  );
}
