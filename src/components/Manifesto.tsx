import { useEffect, useRef } from "react";

export function Manifesto() {
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
    <section ref={ref} className="px-6 md:px-10 py-32 md:py-48 bg-foreground text-background border-t border-foreground/10 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-[60vw] h-[60vw] rounded-full border border-background/10 ring-spin pointer-events-none" />
      <p className="text-xs uppercase tracking-[0.3em] text-background/50 mb-10 reveal">Manifesto / 01</p>
      <p className="reveal font-display text-[8vw] md:text-[5vw] leading-[1.05] max-w-6xl">
        We make <span className="font-serif-it italic font-normal text-[color:var(--accent-hot)]">few things</span>, in <span className="font-serif-it italic font-normal">small numbers</span>, with people whose names we know — and we keep making them until they wear out, then we mend them.
      </p>
      <div className="reveal mt-16 flex flex-wrap gap-6 text-xs uppercase tracking-[0.3em] text-background/70">
        <span>— Elena & Marco, founders</span>
        <span>Florence, 2018 —</span>
      </div>
    </section>
  );
}