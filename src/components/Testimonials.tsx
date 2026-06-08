import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";

const T = [
  { q: "I bought the Atelier Coat two winters ago. It looks better now than the day it arrived. It's the only piece of clothing I've ever loved more with time.", a: "— Hana M., Tokyo" },
  { q: "The cut, the cloth, the small handwritten note. Maison/00 understands that buying clothes can still be a quiet, considered thing.", a: "— Lucas R., Paris" },
  { q: "My Cable Knit has been on three continents and washed twenty times. Not a single thread out of place.", a: "— Adaeze O., Lagos" },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % T.length), 5000);
    return () => clearInterval(id);
  }, []);
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
    <section ref={ref} className="px-6 md:px-10 py-24 md:py-36 border-t border-foreground/10 relative overflow-hidden">
      <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-10 reveal">Worn & told</p>
      <Quote size={64} strokeWidth={1} className="text-[color:var(--accent-hot)] reveal mb-6" />
      <div className="relative min-h-[280px] md:min-h-[220px]">
        {T.map((t, k) => (
          <blockquote
            key={k}
            className={`absolute inset-0 transition-all duration-700 ${k === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}`}
          >
            <p className="font-serif-it italic text-3xl md:text-5xl leading-[1.15] max-w-5xl">{t.q}</p>
            <footer className="mt-8 text-xs uppercase tracking-[0.3em] text-foreground/60">{t.a}</footer>
          </blockquote>
        ))}
      </div>
      <div className="mt-12 flex gap-3">
        {T.map((_, k) => (
          <button key={k} onClick={() => setI(k)} data-cursor-hover aria-label={`Quote ${k + 1}`} className={`h-[2px] transition-all duration-500 ${k === i ? "w-16 bg-foreground" : "w-8 bg-foreground/25"}`} />
        ))}
      </div>
    </section>
  );
}