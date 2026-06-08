import { useEffect, useRef } from "react";
import { Instagram as IGIcon } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

export function Instagram() {
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
  const tiles = [...PRODUCTS, ...PRODUCTS].slice(0, 8);
  return (
    <section ref={ref} className="px-6 md:px-10 py-24 md:py-32 border-t border-foreground/10">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
        <div className="reveal">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-3 flex items-center gap-2"><IGIcon size={14} /> Worn by you</p>
          <h2 className="font-display text-[12vw] md:text-[7vw] leading-[0.85]">@MAISON / <span className="font-serif-it italic font-normal">00</span></h2>
        </div>
        <a href="#" data-cursor-hover className="reveal text-xs uppercase tracking-[0.3em] underline underline-offset-8 hover:opacity-70">Tag us to be featured →</a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {tiles.map((p, i) => (
          <a
            key={`${p.slug}-${i}`}
            href="#"
            data-cursor-hover
            className="reveal group relative aspect-square bg-[color:var(--muted-warm)] overflow-hidden"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <img src={p.image} alt="" className="absolute inset-0 m-auto h-[82%] w-[82%] object-contain float-soft transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/85 transition-colors duration-500 flex items-center justify-center">
              <span className="text-background text-xs uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity">View post →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}