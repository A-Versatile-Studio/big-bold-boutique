import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";

export function Filters() {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <section id="shop" className="px-6 md:px-10 py-24 md:py-32 border-t border-foreground/10">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
        <h2 className="font-display text-[14vw] md:text-[9vw] leading-[0.85]">
          SHOP / <span className="font-serif-it italic font-normal">all</span>
        </h2>
        <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-12">
        {CATEGORIES.map((c) => {
          const isActive = c === active;
          return (
            <button
              key={c}
              data-cursor-hover
              onClick={() => setActive(c)}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.25em] border transition-all duration-300 ${
                isActive
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-foreground border-foreground/25 hover:border-foreground"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
        {filtered.map((p, i) => (
          <Link
            key={p.slug}
            to="/product/$slug"
            params={{ slug: p.slug }}
            data-cursor-hover
            className="group block"
            style={{ animation: "fade-in 0.6s both", animationDelay: `${i * 50}ms` }}
          >
            <div className="relative aspect-[4/5] bg-[color:var(--muted-warm)] overflow-hidden">
              <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                {p.tag}
              </span>
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="absolute inset-0 m-auto h-[88%] w-[88%] object-contain float-soft transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
              />
              <span className="absolute bottom-3 right-3 z-10 text-[10px] uppercase tracking-[0.25em] bg-foreground text-background px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                View →
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="font-display text-xl md:text-2xl">{p.name}</h3>
              <span className="font-serif-it text-base text-foreground/80">{p.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}