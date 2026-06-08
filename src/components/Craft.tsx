import { useEffect, useRef, useState } from "react";

const STATS = [
  { n: 12, suffix: "", label: "Artisans on payroll" },
  { n: 4, suffix: "", label: "Drops per year" },
  { n: 120, suffix: "h", label: "Average per coat" },
  { n: 100, suffix: "%", label: "Made in Europe" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1400;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export function Craft() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add("in"));
    }, { threshold: 0.2 });
    el.querySelectorAll(".reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="px-6 md:px-10 py-24 md:py-36 border-t border-foreground/10 bg-[color:var(--muted-warm)]">
      <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-6 reveal">The craft</p>
      <h2 className="font-display text-[12vw] md:text-[8vw] leading-[0.85] max-w-5xl reveal">
        SLOW <span className="font-serif-it italic font-normal">on purpose.</span>
      </h2>
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10">
        {STATS.map((s, i) => (
          <div key={s.label} className="reveal border-t border-foreground/30 pt-6" style={{ transitionDelay: `${i * 100}ms` }}>
            <div className="font-display text-6xl md:text-7xl"><Counter to={s.n} suffix={s.suffix} /></div>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-foreground/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}