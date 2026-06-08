import { useEffect, useRef } from "react";
import pJacket from "@/assets/p-jacket.png";
import pTrousers from "@/assets/p-trousers.png";

export function Lookbook() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add("in"));
    }, { threshold: 0.15 });
    el.querySelectorAll(".reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative px-6 md:px-10 py-24 md:py-36 border-t border-foreground/10 overflow-hidden">
      <div className="grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12 md:col-span-7 reveal">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-6">Lookbook — Vol. 04</p>
          <h2 className="font-display text-[14vw] md:text-[10vw] leading-[0.82]">
            QUIET<br/><span className="font-serif-it italic font-normal">in motion</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 reveal" style={{ transitionDelay: "120ms" }}>
          <p className="text-base md:text-lg text-foreground/70 leading-relaxed max-w-md">
            Eight silhouettes, one mood. Shot on 35mm in a converted dye-house outside Prato — natural light, no retouching, just cloth.
          </p>
          <button data-cursor-hover className="mt-8 text-xs uppercase tracking-[0.3em] underline underline-offset-8 hover:opacity-70">View the film →</button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7 reveal aspect-[4/5] bg-[color:var(--muted-warm)] relative overflow-hidden group">
          <img src={pJacket} alt="Look 01" className="absolute inset-0 m-auto h-[85%] w-[85%] object-contain float-soft transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.3em]">Look 01 — Atelier</span>
        </div>
        <div className="col-span-12 md:col-span-5 flex flex-col gap-6">
          <div className="reveal aspect-square bg-foreground text-background relative overflow-hidden flex items-end p-6" style={{ transitionDelay: "180ms" }}>
            <p className="font-serif-it italic text-3xl md:text-4xl leading-tight">"Cloth that <br/>remembers."</p>
          </div>
          <div className="reveal aspect-[5/6] bg-[color:var(--muted-warm)] relative overflow-hidden group" style={{ transitionDelay: "260ms" }}>
            <img src={pTrousers} alt="Look 02" className="absolute inset-0 m-auto h-[80%] w-[80%] object-contain float-soft transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.3em]">Look 02 — Tailoring</span>
          </div>
        </div>
      </div>
    </section>
  );
}