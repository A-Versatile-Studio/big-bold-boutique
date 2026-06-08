import { useEffect, useRef } from "react";

const LOGOS = ["VOGUE", "MONOCLE", "DAZED", "SSENSE", "WALLPAPER*", "NYT STYLE", "HIGHSNOBIETY", "AnOther"];
const QUOTES = [
  { q: "The most considered wool coat in Europe right now.", src: "Monocle" },
  { q: "Slow fashion done with conviction.", src: "Vogue Italia" },
  { q: "Quietly the best knitwear of the season.", src: "SSENSE Editorial" },
];

export function Press() {
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
    <section ref={ref} className="px-6 md:px-10 py-20 border-t border-foreground/10 bg-[color:var(--muted-warm)]">
      <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-10 reveal">As written about in —</p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 mb-16">
        {LOGOS.map((l, i) => (
          <span
            key={l}
            className="reveal font-display text-xl md:text-2xl text-foreground/60 hover:text-foreground transition-colors text-center"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {l}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {QUOTES.map((q, i) => (
          <blockquote key={q.src} className="reveal border-l-2 border-foreground/30 pl-6" style={{ transitionDelay: `${i * 100}ms` }}>
            <p className="font-serif-it italic text-xl md:text-2xl leading-tight mb-3">"{q.q}"</p>
            <footer className="text-xs uppercase tracking-[0.3em] text-foreground/60">— {q.src}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}