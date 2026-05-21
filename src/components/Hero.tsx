import heroCoat from "@/assets/hero-coat.png";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-24 pb-12 px-6 md:px-10">
      {/* Top left big heading */}
      <div className="relative z-20 max-w-[60%]">
        <p className="text-xs uppercase tracking-[0.3em] text-foreground/60 mb-6">
          Fall — Winter / Vol. 04
        </p>
        <h1 className="font-display text-foreground text-[18vw] md:text-[12vw] leading-[0.82]">
          SOFT<br/>
          <span className="font-serif-it font-normal italic text-foreground/90">armour</span>
        </h1>
      </div>

      {/* Floating image center */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <img
          src={heroCoat}
          alt="The Atelier Coat"
          width={1280}
          height={1280}
          className="float-anim w-[70vw] md:w-[55vw] max-w-[820px] h-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.18)]"
        />
      </div>

      {/* Bottom right details */}
      <div className="absolute bottom-10 right-6 md:right-10 z-20 max-w-xs text-right">
        <div className="text-xs uppercase tracking-[0.25em] text-foreground/60 mb-3">N° 001 — Outerwear</div>
        <h3 className="font-display text-2xl md:text-3xl mb-3">The Atelier Coat</h3>
        <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
          Hand-tailored from Italian double-faced wool. Oversized drop shoulder,
          unlined back, raw-edge lapel. Made in Florence.
        </p>
        <div className="flex items-center justify-end gap-4">
          <span className="font-display text-xl">€ 1,290</span>
          <button data-cursor-hover className="text-xs uppercase tracking-[0.25em] underline underline-offset-4">
            Add to bag →
          </button>
        </div>
      </div>
    </section>
  );
}