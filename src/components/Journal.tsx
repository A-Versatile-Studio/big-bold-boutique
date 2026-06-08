import { useEffect, useRef } from "react";
import pSweater from "@/assets/p-sweater.png";
import pTee from "@/assets/p-tee.png";
import pSunglasses from "@/assets/p-sunglasses.png";

const POSTS = [
  { tag: "Field notes", date: "06 · 26", title: "On the loom in Yorkshire", read: "5 min read", image: pSweater },
  { tag: "Process", date: "05 · 26", title: "Why we wash everything twice", read: "3 min read", image: pTee },
  { tag: "Conversation", date: "04 · 26", title: "An afternoon with Sig. Bianchi", read: "8 min read", image: pSunglasses },
];

export function Journal() {
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
      <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
        <h2 className="font-display text-[14vw] md:text-[9vw] leading-[0.85] reveal">THE / <span className="font-serif-it italic font-normal">journal</span></h2>
        <a href="#journal" data-cursor-hover className="reveal text-xs uppercase tracking-[0.3em] underline underline-offset-8 hover:opacity-70">All letters →</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {POSTS.map((p, i) => (
          <article key={p.title} className="reveal group cursor-none" data-cursor-hover style={{ transitionDelay: `${i * 100}ms` }}>
            <div className="aspect-[4/5] bg-[color:var(--muted-warm)] relative overflow-hidden">
              <img src={p.image} alt={p.title} className="absolute inset-0 m-auto h-[80%] w-[80%] object-contain float-soft transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2" />
              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] bg-foreground text-background px-2 py-1">{p.tag}</span>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-foreground/50">
              <span>{p.date}</span><span>{p.read}</span>
            </div>
            <h3 className="font-display text-3xl md:text-4xl mt-3 group-hover:text-[color:var(--accent-hot)] transition-colors">{p.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}