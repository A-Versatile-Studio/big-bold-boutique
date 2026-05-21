import { useEffect, useRef } from "react";

type Product = {
  name: string;
  price: string;
  tag: string;
  image: string;
};

export function ProductRow({
  title,
  subtitle,
  products,
  align = "left",
}: {
  title: string;
  subtitle?: string;
  products: Product[];
  align?: "left" | "right";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll(".reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 border-t border-foreground/10">
      <div className={`px-6 md:px-10 mb-10 flex flex-col reveal ${align === "right" ? "items-end text-right" : "items-start"}`}>
        {subtitle && (
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-4">{subtitle}</p>
        )}
        <h2 className="font-display text-[14vw] md:text-[9vw] leading-[0.85] text-foreground">
          {title}
        </h2>
      </div>

      <div className="hide-scrollbar overflow-x-auto" data-cursor-hover>
        <div className="flex gap-6 md:gap-10 px-6 md:px-10 pb-4 min-w-max">
          {products.map((p, i) => (
            <article
              key={p.name}
              className="group w-[78vw] md:w-[34vw] lg:w-[28vw] shrink-0 reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--muted-warm)] transition-transform duration-500 group-hover:-translate-y-2">
                <span className="absolute top-4 left-4 z-10 text-xs uppercase tracking-[0.25em] text-foreground/60">
                  {String(i + 1).padStart(2, "0")} / {p.tag}
                </span>
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  width={900}
                  height={900}
                  className="absolute inset-0 m-auto h-[90%] w-[90%] object-contain transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                />
                <span className="absolute bottom-4 right-4 z-10 text-[10px] uppercase tracking-[0.25em] bg-foreground text-background px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Quick add +
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between">
                <h3 className="font-display text-2xl md:text-3xl">{p.name}</h3>
                <span className="font-serif-it text-xl text-foreground/80">{p.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}