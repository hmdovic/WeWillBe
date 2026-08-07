import { PRODUCTS } from "@/lib/constants";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function Products() {
  return (
    <section id="collection" className="relative bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            The Drop
          </span>
          <h2 className="mt-4 font-sans text-4xl font-black uppercase leading-[0.95] tracking-[-0.01em] text-paper md:text-6xl">
            Three pieces.
            <br />
            No filler.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:mt-20 md:gap-x-10 lg:grid-cols-3 lg:gap-x-12">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
