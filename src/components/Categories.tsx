import { useEffect, useRef } from "react";
import pJacket from "@/assets/p-jacket.png";
import pSweater from "@/assets/p-sweater.png";
import pSneakers from "@/assets/p-sneakers.png";
import pBag from "@/assets/p-bag.png";
import pJeans from "@/assets/p-jeans.png";

const ITEMS = [
  { name: "Outerwear", count: "12 pieces", image: pJacket, span: "md:col-span-6 md:row-span-2", h: "aspect-[4/5]" },
  { name: "Knitwear", count: "8 pieces", image: pSweater, span: "md:col-span-3", h: "aspect-square" },
  { name: "Denim", count: "6 pieces", image: pJeans, span: "md:col-span-3", h: "aspect-square" },
  { name: "Footwear", count: "5 pairs", image: pSneakers, span: "md:col-span-3", h: "aspect-square" },
  { name: "Objects", count: "9 things", image: pBag, span: "md:col-span-3", h: "aspect-square" },
];

export function Categories() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add("in"));
    }, { threshold: 0.1 });
    el.querySelectorAll(".reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="px-6 md:px-10 py-24 md:py-32 border-t border-foreground/10">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
        <h2 className="font-display text-[14vw] md:text-[9vw] leading-[0.85] reveal">SHOP / <span className="font-serif-it italic font-normal">by room</span></h2>
        <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 reveal">05 categories — 40 pieces total</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-12 md:grid-rows-2 gap-4 md:gap-6">
        {ITEMS.map((c, i) => (
          <a key={c.name} href="#shop" data-cursor-hover className={`reveal group relative ${c.span} ${c.h} bg-[color:var(--muted-warm)] overflow-hidden`} style={{ transitionDelay: `${i * 80}ms` }}>
            <img src={c.image} alt={c.name} className="absolute inset-0 m-auto h-[80%] w-[80%] object-contain float-soft transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3" />
            <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-7">
              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">{c.count}</span>
              <div className="flex items-end justify-between">
                <h3 className="font-display text-3xl md:text-5xl">{c.name}</h3>
                <span className="font-serif-it italic text-2xl translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}