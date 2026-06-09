import { useEffect, useRef } from "react";
import pJacket from "@/assets/p-jacket.png";
import pSweater from "@/assets/p-sweater.png";
import pSneakers from "@/assets/p-sneakers.png";
import pBag from "@/assets/p-bag.png";
import pJeans from "@/assets/p-jeans.png";
import heroCoat from "@/assets/hero-coat.png";

type Item = {
  no: string;
  name: string;
  count: string;
  meta: string;
  image: string;
  tone: string;
  span: string;
  h: string;
  align?: "left" | "right" | "center";
};

const ITEMS: Item[] = [
  { no: "01", name: "Outerwear", count: "12 pieces", meta: "Wool · Cashmere · Shearling", image: heroCoat, tone: "bg-[color:var(--muted-warm)]", span: "md:col-span-7 md:row-span-2", h: "aspect-[4/5] md:aspect-auto md:min-h-[640px]", align: "left" },
  { no: "02", name: "Knitwear", count: "8 pieces", meta: "Merino · Alpaca", image: pSweater, tone: "bg-foreground text-background", span: "md:col-span-5", h: "aspect-[5/4] md:aspect-auto md:min-h-[310px]", align: "right" },
  { no: "03", name: "Denim", count: "6 pieces", meta: "Selvedge · Raw · Sanforised", image: pJeans, tone: "bg-[color:var(--muted-warm)]", span: "md:col-span-2", h: "aspect-square md:aspect-auto md:min-h-[310px]", align: "center" },
  { no: "04", name: "Footwear", count: "5 pairs", meta: "Goodyear-welted", image: pSneakers, tone: "bg-background border border-foreground/15", span: "md:col-span-3", h: "aspect-square md:aspect-auto md:min-h-[310px]", align: "center" },
  { no: "05", name: "Objects", count: "9 things", meta: "Leather · Acetate · Brass", image: pBag, tone: "bg-[color:var(--accent-hot)]/10", span: "md:col-span-7", h: "aspect-[7/4] md:aspect-auto md:min-h-[310px]", align: "right" },
  { no: "06", name: "Tailoring", count: "Made-to-order", meta: "By appointment, Florence atelier", image: pJacket, tone: "bg-foreground text-background", span: "md:col-span-5", h: "aspect-[5/4] md:aspect-auto md:min-h-[310px]", align: "left" },
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
      <div className="grid md:grid-cols-12 gap-6 mb-12 items-end">
        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 reveal mb-4">§ 03 — The catalogue</p>
          <h2 className="font-display text-[14vw] md:text-[9vw] leading-[0.82] reveal">
            SHOP / <span className="font-serif-it italic font-normal">by category</span>
          </h2>
        </div>
        <div className="md:col-span-5 md:text-right space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 reveal">06 rooms — 40 pieces in residence</p>
          <p className="font-serif-it italic text-foreground/70 reveal">Hover a tile, watch the piece arrive.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-12 auto-rows-auto gap-3 md:gap-5">
        {ITEMS.map((c, i) => {
          const dark = c.tone.includes("text-background");
          const align = c.align ?? "center";
          return (
            <a
              key={c.name}
              href="#shop"
              data-cursor-hover
              className={`reveal group relative col-span-2 ${c.span} ${c.h} ${c.tone} overflow-hidden`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              {/* hover image — slides up from below */}
              <div className={`absolute inset-0 pointer-events-none overflow-hidden`}>
                <img
                  src={c.image}
                  alt=""
                  className={`absolute ${align === "left" ? "left-2 md:left-6" : align === "right" ? "right-2 md:right-6" : "left-1/2 -translate-x-1/2"} bottom-0 translate-y-[110%] group-hover:translate-y-[8%] transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] h-[78%] w-auto object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)]`}
                />
              </div>

              {/* corner number */}
              <span className={`absolute top-5 left-5 md:top-7 md:left-7 text-[10px] uppercase tracking-[0.3em] ${dark ? "text-background/60" : "text-foreground/45"}`}>
                — {c.no}
              </span>

              {/* count */}
              <span className={`absolute top-5 right-5 md:top-7 md:right-7 text-[10px] uppercase tracking-[0.3em] ${dark ? "text-background/60" : "text-foreground/45"} transition-opacity duration-500 group-hover:opacity-0`}>
                {c.count}
              </span>

              {/* main label */}
              <div className={`absolute inset-0 flex flex-col justify-end p-5 md:p-7`}>
                <h3 className={`font-display text-4xl md:text-6xl lg:text-7xl leading-[0.9] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1`}>
                  {c.name}
                </h3>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <p className={`text-[11px] uppercase tracking-[0.25em] ${dark ? "text-background/60" : "text-foreground/55"} max-w-[70%]`}>{c.meta}</p>
                  <span className={`font-serif-it italic text-2xl md:text-3xl translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500`}>→</span>
                </div>
              </div>

              {/* hairline frame on hover */}
              <span className={`pointer-events-none absolute inset-2 border ${dark ? "border-background/0 group-hover:border-background/20" : "border-foreground/0 group-hover:border-foreground/15"} transition-colors duration-500`} />
            </a>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-foreground/45 reveal">
        <span>F/W 26 — Resident catalogue</span>
        <span>Updated weekly · 09:00 CET</span>
      </div>
    </section>
  );
}