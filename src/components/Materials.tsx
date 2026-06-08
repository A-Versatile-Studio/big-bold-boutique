import { useEffect, useRef } from "react";

const MATERIALS = [
  { name: "Italian wool", origin: "Biella, IT", note: "Spun on hundred-year-old looms" },
  { name: "Selvedge denim", origin: "Hiroshima, JP", note: "Kaihara mill, 14oz one-wash" },
  { name: "British merino", origin: "Yorkshire, UK", note: "Undyed, knit on vintage flatbeds" },
  { name: "Veg-tan leather", origin: "Tuscany, IT", note: "Hand-finished, no chrome" },
  { name: "Supima cotton", origin: "Porto, PT", note: "Garment-dyed in small batches" },
];

export function Materials() {
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
    <section ref={ref} className="px-6 md:px-10 py-24 md:py-32 border-t border-foreground/10">
      <div className="grid grid-cols-12 gap-6 mb-12">
        <p className="col-span-12 md:col-span-3 text-xs uppercase tracking-[0.3em] text-foreground/50 reveal">Materials / 05</p>
        <h2 className="col-span-12 md:col-span-9 font-display text-[12vw] md:text-[7vw] leading-[0.85] reveal">
          Five <span className="font-serif-it italic font-normal">cloths</span>, five towns, five families.
        </h2>
      </div>
      <ul className="divide-y divide-foreground/15 border-y border-foreground/15">
        {MATERIALS.map((m, i) => (
          <li
            key={m.name}
            className="reveal group grid grid-cols-12 gap-4 py-6 md:py-8 items-baseline cursor-none transition-colors hover:bg-[color:var(--muted-warm)] px-2 md:px-4"
            style={{ transitionDelay: `${i * 80}ms` }}
            data-cursor-hover
          >
            <span className="col-span-1 font-display text-foreground/40 text-lg">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="col-span-11 md:col-span-5 font-display text-3xl md:text-5xl transition-transform duration-500 group-hover:translate-x-3">{m.name}</h3>
            <p className="col-span-6 md:col-span-3 text-xs uppercase tracking-[0.3em] text-foreground/60">{m.origin}</p>
            <p className="col-span-6 md:col-span-3 font-serif-it italic text-base md:text-lg text-foreground/70 text-right">{m.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}