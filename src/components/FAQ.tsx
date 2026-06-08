import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";

const FAQS = [
  { q: "Where is everything made?", a: "Every piece is cut and sewn in Europe — primarily Florence, with knitwear from Yorkshire and footwear from Marche. We visit every workshop at least twice a year." },
  { q: "How long does shipping take?", a: "Ready-to-wear ships within 48 hours. Made-to-order coats take 10–14 days. EU delivery in 2–3 days, worldwide 5–7. Free over €200." },
  { q: "What's your return policy?", a: "30 days, no questions, full refund — items must be unworn with tags. We pay return shipping inside the EU." },
  { q: "Do you really repair things for life?", a: "Yes. Send us anything you've bought from us, any time, for any reason. We'll repair it, replace zips, re-knit cuffs. You pay shipping in, we pay it back." },
  { q: "How do I find my size?", a: "Each product page has a detailed size guide with measurements in cm and inches. If you're between sizes, we recommend sizing down for knitwear and up for outerwear." },
  { q: "When are new drops?", a: "Four times a year — late August, November, February, May. Members get a 48 hour head start. Sign up below." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
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
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4 reveal">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-6">Asked & answered</p>
          <h2 className="font-display text-[14vw] md:text-[7vw] leading-[0.85] sticky top-28">
            ALMOST<br/><span className="font-serif-it italic font-normal">everything.</span>
          </h2>
        </div>
        <ul className="col-span-12 md:col-span-8 divide-y divide-foreground/15 border-y border-foreground/15">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <button
                  data-cursor-hover
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-6 md:py-7 text-left group"
                >
                  <span className="font-display text-xl md:text-3xl group-hover:text-[color:var(--accent-hot)] transition-colors">{f.q}</span>
                  <Plus size={22} strokeWidth={1.5} className={`shrink-0 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`} />
                </button>
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-12 text-base text-foreground/70 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}