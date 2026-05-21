import { useEffect, useState } from "react";
import { ArrowDown, Sparkles, Tag } from "lucide-react";
import heroCoat from "@/assets/hero-coat.png";
import pJacket from "@/assets/p-jacket.png";
import pSweater from "@/assets/p-sweater.png";
import pBag from "@/assets/p-bag.png";

const ANIMS = ["anim-spin-in", "anim-drop-in", "anim-swing-in", "anim-zoom-in", "anim-flip-in"];

const SLIDES = [
  {
    no: "N° 001",
    cat: "Outerwear",
    name: "Atelier Coat",
    title: ["SOFT", "armour"],
    desc: "Hand-tailored Italian double-faced wool. Oversized drop shoulder, unlined back, raw-edge lapel. Made slow in Florence.",
    price: "€ 1,032",
    was: "€ 1,290",
    discount: "−20%",
    offer: "Launch week only",
    image: heroCoat,
  },
  {
    no: "N° 002",
    cat: "Leather",
    name: "Rider Jacket",
    title: ["WILD", "leather"],
    desc: "Vegetable-tanned lambskin, asymmetric zip, hand-stitched lapels. Breaks in like an old paperback.",
    price: "€ 712",
    was: "€ 890",
    discount: "−20%",
    offer: "Bundle + Tee free",
    image: pJacket,
  },
  {
    no: "N° 003",
    cat: "Knitwear",
    name: "Cable Knit",
    title: ["WARM", "comfort"],
    desc: "Chunky undyed merino, ribbed neckline, hand-finished cuffs. Knit on vintage looms in Yorkshire.",
    price: "€ 272",
    was: "€ 340",
    discount: "−20%",
    offer: "Members get early access",
    image: pSweater,
  },
  {
    no: "N° 004",
    cat: "Objects",
    name: "Holdall 48h",
    title: ["BOLD", "objects"],
    desc: "Grained calf leather, brass hardware, suede-lined interior. Sized for a long weekend, built for a decade.",
    price: "€ 416",
    was: "€ 520",
    discount: "−20%",
    offer: "Free monogram included",
    image: pBag,
  },
];

export function Hero() {
  const [i, setI] = useState(0);
  const [animClass, setAnimClass] = useState(ANIMS[0]);

  useEffect(() => {
    const id = setInterval(() => {
      setI((p) => {
        const next = (p + 1) % SLIDES.length;
        setAnimClass(ANIMS[next % ANIMS.length]);
        return next;
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const s = SLIDES[i];

  return (
    <section className="relative min-h-[140vh] w-full overflow-hidden pt-28 pb-16 px-6 md:px-10">
      {/* Offer ticker */}
      <div className="absolute top-20 left-0 right-0 z-30 border-y border-foreground/15 bg-[color:var(--accent-hot)] text-background overflow-hidden py-2">
        <div className="ticker flex gap-12 whitespace-nowrap text-xs uppercase tracking-[0.3em] font-medium">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-12 shrink-0 px-6">
              <span className="flex items-center gap-2"><Sparkles size={14} /> Launch week — 20% off everything</span>
              <span>·</span>
              <span className="flex items-center gap-2"><Tag size={14} /> Code SOFT20 at checkout</span>
              <span>·</span>
              <span>Ends Sunday 23:59 CET</span>
              <span>·</span>
              <span>Free shipping over €200</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top left big heading */}
      <div className="relative z-20 max-w-[80%] pt-16">
        <p className="text-xs uppercase tracking-[0.3em] text-foreground/60 mb-6">
          Fall — Winter / Vol. 04 · {s.no} {s.cat}
        </p>
        <h1
          key={`title-${i}`}
          className="font-display text-foreground text-[18vw] md:text-[13vw] leading-[0.82] anim-drop-in"
        >
          {s.title[0]}<br />
          <span className="font-serif-it font-normal italic text-foreground/90">{s.title[1]}</span>
        </h1>
      </div>

      {/* Floating image — rotates every 3s with unique animation */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <img
          key={`img-${i}`}
          src={s.image}
          alt={s.name}
          width={1280}
          height={1280}
          className={`${animClass} w-[70vw] md:w-[52vw] max-w-[780px] h-auto object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.18)]`}
        />
      </div>

      {/* Offer badge */}
      <div
        key={`badge-${i}`}
        className="absolute top-[45%] left-6 md:left-16 z-20 anim-spin-in"
      >
        <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full bg-foreground text-background flex flex-col items-center justify-center text-center rotate-[-12deg] shadow-xl">
          <span className="font-display text-3xl md:text-5xl leading-none">{s.discount}</span>
          <span className="text-[10px] uppercase tracking-[0.25em] mt-2 px-4">{s.offer}</span>
        </div>
      </div>

      {/* Bottom right details */}
      <div
        key={`info-${i}`}
        className="absolute bottom-32 right-6 md:right-10 z-20 max-w-sm text-right anim-swing-in"
      >
        <div className="text-xs uppercase tracking-[0.25em] text-foreground/60 mb-3">{s.no} — {s.cat}</div>
        <h3 className="font-display text-3xl md:text-4xl mb-3">{s.name}</h3>
        <p className="text-sm text-foreground/70 mb-4 leading-relaxed">{s.desc}</p>
        <div className="flex items-center justify-end gap-4 mb-3">
          <span className="text-sm line-through text-foreground/40">{s.was}</span>
          <span className="font-display text-2xl text-[color:var(--accent-hot)]">{s.price}</span>
        </div>
        <button data-cursor-hover className="text-xs uppercase tracking-[0.25em] underline underline-offset-4 hover:opacity-70 transition-opacity">
          Add to bag →
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute top-[50%] right-6 md:right-10 z-20 flex flex-col gap-2">
        {SLIDES.map((_, k) => (
          <span
            key={k}
            className={`block h-[2px] transition-all duration-500 ${k === i ? "w-12 bg-foreground" : "w-6 bg-foreground/30"}`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-12 left-6 md:left-10 right-6 md:right-10 z-20 flex items-end justify-between">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-foreground/60">
          <ArrowDown size={14} className="animate-bounce" />
          Scroll the collection
        </div>
        <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.3em] text-foreground/60">
          <span>32 pieces</span>
          <span>4 categories</span>
          <span>Made in EU</span>
        </div>
      </div>
    </section>
  );
}