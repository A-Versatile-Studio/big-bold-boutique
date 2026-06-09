import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, Minus, Plus, Truck, RotateCcw, ShieldCheck, Star, Scissors, Leaf, Ruler, Sparkles, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getProduct, PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Piece"} — Maison/00` },
      { name: "description", content: loaderData?.product.story ?? "Slow-made by Maison/00." },
    ],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-sm uppercase tracking-[0.3em]">Piece not found — <Link to="/" className="underline">go home</Link></p>
    </main>
  ),
});

const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORWAYS = [
  { name: "Bone", hex: "#E9E2D4" },
  { name: "Ink", hex: "#1A1A1A" },
  { name: "Ember", hex: "#B6452C" },
  { name: "Moss", hex: "#4F5A3A" },
];
const SIZE_GUIDE = [
  { size: "XS", chest: "94", shoulder: "44", length: "70", sleeve: "62" },
  { size: "S",  chest: "98", shoulder: "45", length: "71", sleeve: "63" },
  { size: "M",  chest: "102", shoulder: "46", length: "72", sleeve: "64" },
  { size: "L",  chest: "106", shoulder: "47", length: "73", sleeve: "65" },
  { size: "XL", chest: "110", shoulder: "48", length: "74", sleeve: "66" },
];
const JOURNEY = [
  { day: "Day 01", title: "Cloth chosen", note: "Hand-picked from a Florence mill that has been weaving since 1842." },
  { day: "Day 03", title: "Pattern cut", note: "Cut single-layer by hand — slower, but no two shoulders sit the same." },
  { day: "Day 06", title: "First stitch", note: "Built shoulder out, then in. The seams you cannot see take the longest." },
  { day: "Day 11", title: "Finishing", note: "Buttons set by hand. Lapel pick-stitched. Pressed on a Hoffman from 1968." },
  { day: "Day 14", title: "Shipped", note: "Wrapped in undyed muslin. Sent recorded delivery, signature on receipt." },
];
const REVIEWS = [
  { name: "M. Okafor", city: "London", stars: 5, body: "Two months in and it has finally stopped looking new — which is the highest compliment I can give a coat.", verified: true },
  { name: "S. Bergstrom", city: "Stockholm", stars: 5, body: "The shoulder line is everything the photos suggest and the cloth has a weight that you feel through a wool jumper.", verified: true },
  { name: "J. Tanaka", city: "Kyoto", stars: 4, body: "Sized up half. Glad I did. Recommend for anyone between sizes — it drapes better with room.", verified: true },
];
const FAQS = [
  { q: "How does it fit?", a: "Cut with a generous shoulder and a clean drop. If you are between sizes and want the oversized silhouette, take your usual size; for a closer fit, size down." },
  { q: "What is the lead time?", a: "Made-to-order in 14 working days from the moment you place the order. We email you twice — once when cutting begins, once before it ships." },
  { q: "How should I care for it?", a: "Dry clean once per season, no more. Brush after each wear with a horsehair brush. Air for 24 hours before returning to the wardrobe." },
  { q: "Do you offer alterations?", a: "Yes — first alteration is on us, within 60 days of delivery. Sleeve length, hem and waist suppression are included." },
  { q: "What is your return policy?", a: "Thirty days, unworn, with the original muslin. Made-to-order pieces are returnable but not refundable in cash — store credit only." },
];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [colorway, setColorway] = useState(COLORWAYS[0].name);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeImage, setActiveImage] = useState(0);

  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => e.isIntersecting && (e.target as HTMLElement).classList.add("in"));
    }, { threshold: 0.12 });
    el.querySelectorAll(".reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const related = PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);
  const fallback = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);
  const recs = related.length ? related : fallback;

  const gallery = [product.image, product.image, product.image, product.image];

  return (
    <main ref={ref} className="bg-background text-foreground">
      <Cursor />
      <Nav />

      {/* Breadcrumb / meta bar */}
      <section className="pt-28 px-6 md:px-10 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.3em] text-foreground/55">
        <Link to="/" data-cursor-hover className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> Shop · {product.category} · <span className="text-foreground">{product.name}</span>
        </Link>
        <span className="hidden md:inline">Reference {product.slug.toUpperCase()} · {product.origin}</span>
      </section>

      {/* Sticky image / scrolling details */}
      <section className="px-6 md:px-10 pt-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
        {/* Sticky image rail */}
        <div className="md:col-span-7 md:sticky md:top-24 self-start">
          <div className="relative aspect-square md:aspect-[4/5] bg-[color:var(--muted-warm)] overflow-hidden">
            <span className="absolute top-6 left-6 z-10 text-[11px] uppercase tracking-[0.3em] text-foreground/60">
              {product.tag} · {product.category}
            </span>
            <span className="absolute top-6 right-6 z-10 text-[11px] uppercase tracking-[0.3em] text-foreground/60">
              {String(activeImage + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
            </span>
            <img
              key={activeImage}
              src={gallery[activeImage]}
              alt={product.name}
              className="absolute inset-0 m-auto h-[88%] w-[88%] object-contain float-soft drop-shadow-[0_30px_50px_rgba(0,0,0,0.2)] anim-zoom-in"
            />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <p className="font-serif-it italic text-foreground/65 max-w-[60%] text-sm leading-snug">
                Photographed on a 1.84m model, wearing a size M.
              </p>
              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">Scroll —</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {gallery.map((src, k) => (
              <button
                key={k}
                data-cursor-hover
                onClick={() => setActiveImage(k)}
                className={`aspect-square bg-[color:var(--muted-warm)] relative overflow-hidden border transition-colors ${activeImage === k ? "border-foreground" : "border-transparent hover:border-foreground/40"}`}
              >
                <img src={src} alt="" className="absolute inset-0 m-auto h-[78%] w-[78%] object-contain" />
                <span className="absolute bottom-1 left-1 text-[9px] uppercase tracking-[0.2em] text-foreground/50">0{k + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Scrolling details */}
        <div className="md:col-span-5 flex flex-col pb-24">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-4">{product.origin}</p>
          <h1 className="font-display text-[14vw] md:text-[5vw] leading-[0.9]">{product.name}</h1>
          <div className="mt-2 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-foreground/55">
            <span className="inline-flex items-center gap-1"><Star size={12} fill="currentColor" /> 4.9</span>
            <span>·</span><span>128 reviews</span>
            <span>·</span><span>In atelier</span>
          </div>
          <div className="mt-6 flex items-baseline gap-4">
            <span className="font-display text-3xl text-[color:var(--accent-hot)]">{product.price}</span>
            {product.was && <span className="text-foreground/40 line-through font-serif-it">{product.was}</span>}
            <span className="text-xs uppercase tracking-[0.25em] text-foreground/50">Tax included</span>
          </div>
          <p className="mt-2 text-xs text-foreground/55">or 3 interest-free payments of <span className="text-foreground">€ {Math.round(product.priceNum / 3)}</span></p>

          <p className="mt-8 text-base text-foreground/75 leading-relaxed font-serif-it italic">{product.story}</p>

          {/* Colourway */}
          <div className="mt-10">
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">Colourway</p>
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/80">{colorway}</p>
            </div>
            <div className="flex gap-3">
              {COLORWAYS.map((c) => (
                <button
                  key={c.name}
                  data-cursor-hover
                  onClick={() => setColorway(c.name)}
                  aria-label={c.name}
                  className={`relative h-10 w-10 rounded-full transition-transform ${colorway === c.name ? "ring-1 ring-offset-4 ring-offset-background ring-foreground scale-110" : "hover:scale-105"}`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-10">
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">Size</p>
              <button data-cursor-hover className="text-xs underline underline-offset-4 text-foreground/60 hover:text-foreground">Size guide ↓</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  data-cursor-hover
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 text-sm uppercase tracking-wider border transition-all ${size === s ? "bg-foreground text-background border-foreground" : "border-foreground/25 hover:border-foreground"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-foreground/55">Model is 1.84m and wears a {size}. Generally true to size.</p>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-foreground/25">
              <button data-cursor-hover onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 grid place-items-center hover:bg-foreground/5"><Minus size={14} /></button>
              <span className="w-10 text-center font-display">{qty}</span>
              <button data-cursor-hover onClick={() => setQty(qty + 1)} className="w-12 h-12 grid place-items-center hover:bg-foreground/5"><Plus size={14} /></button>
            </div>
            <button data-cursor-hover className="flex-1 h-12 bg-foreground text-background text-xs uppercase tracking-[0.3em] hover:bg-[color:var(--accent-hot)] transition-colors">
              Add to bag — {product.price}
            </button>
            <button data-cursor-hover aria-label="Save" className="w-12 h-12 grid place-items-center border border-foreground/25 hover:border-foreground transition-colors">
              <Heart size={16} strokeWidth={1.5} />
            </button>
          </div>
          <button data-cursor-hover className="mt-3 w-full h-12 border border-foreground text-xs uppercase tracking-[0.3em] hover:bg-foreground hover:text-background transition-colors">
            Book a fitting — Florence atelier
          </button>

          <div className="mt-8 grid grid-cols-3 gap-3 text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            <div className="flex flex-col items-start gap-2 p-3 border border-foreground/15"><Truck size={16} strokeWidth={1.5} />Ships in 48h</div>
            <div className="flex flex-col items-start gap-2 p-3 border border-foreground/15"><RotateCcw size={16} strokeWidth={1.5} />30 day returns</div>
            <div className="flex flex-col items-start gap-2 p-3 border border-foreground/15"><ShieldCheck size={16} strokeWidth={1.5} />Lifetime repairs</div>
          </div>

          <div className="mt-10 border-t border-foreground/15 pt-8">
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-4">The details</p>
            <ul className="space-y-3">
              {product.details.map((d: string) => (
                <li key={d} className="flex gap-3 text-sm text-foreground/80"><span className="text-foreground/40">—</span>{d}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t border-foreground/15 pt-8 grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-2">Material</p>
              <p className="text-foreground/80">{product.material}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-2">Origin</p>
              <p className="text-foreground/80">{product.origin}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-2">Weight</p>
              <p className="text-foreground/80">1,420 g · medium-heavy</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-2">Edition</p>
              <p className="text-foreground/80">Open · made to order</p>
            </div>
          </div>

          {/* The fabric story */}
          <div className="mt-12 border-t border-foreground/15 pt-8 reveal">
            <div className="flex items-center gap-3 mb-4">
              <Scissors size={16} strokeWidth={1.5} />
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">The fabric</p>
            </div>
            <h3 className="font-display text-3xl md:text-4xl leading-tight mb-3">A cloth that <span className="font-serif-it italic font-normal">remembers</span>.</h3>
            <p className="text-foreground/75 leading-relaxed">
              Woven on a single Dornier loom outside Biella. The yarn is twice as long-staple as the mill standard, which is why the surface refuses to pill and the drape only deepens. It will look better in five years than it does today — that is a promise we are happy to put in writing.
            </p>
          </div>

          {/* Sustainability */}
          <div className="mt-12 border-t border-foreground/15 pt-8 reveal">
            <div className="flex items-center gap-3 mb-4">
              <Leaf size={16} strokeWidth={1.5} />
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">Quietly responsible</p>
            </div>
            <ul className="space-y-3 text-sm text-foreground/80">
              <li className="flex gap-3"><span className="text-foreground/40 font-display">01</span>Made to order — we do not hold stock, we do not destroy unsold goods.</li>
              <li className="flex gap-3"><span className="text-foreground/40 font-display">02</span>Single-source mill, fewer than 80km between fibre and finished cloth.</li>
              <li className="flex gap-3"><span className="text-foreground/40 font-display">03</span>Repaired for life by the atelier that built it. Send it back any time.</li>
              <li className="flex gap-3"><span className="text-foreground/40 font-display">04</span>Packed in undyed muslin and an unbleached cardboard sleeve. No plastic.</li>
            </ul>
          </div>

          {/* Care */}
          <div className="mt-12 border-t border-foreground/15 pt-8 reveal">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={16} strokeWidth={1.5} />
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">How to live with it</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { t: "Brush", d: "Horsehair brush after each wear. With the grain." },
                { t: "Air", d: "24 hours on a wide wooden hanger before storing." },
                { t: "Clean", d: "Dry-clean once a season. No more, ideally less." },
                { t: "Press", d: "Cool iron through a cotton cloth, lapels by hand." },
              ].map((c) => (
                <div key={c.t} className="p-4 border border-foreground/15">
                  <p className="font-display text-xl mb-1">{c.t}</p>
                  <p className="text-foreground/70 text-xs leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Size guide table */}
      <section className="px-6 md:px-10 py-24 border-t border-foreground/10">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-10">
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <Ruler size={16} strokeWidth={1.5} />
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">Measurements · centimetres</p>
            </div>
            <h2 className="font-display text-[12vw] md:text-[6vw] leading-[0.85]">SIZE / <span className="font-serif-it italic font-normal">guide</span></h2>
          </div>
          <p className="md:col-span-5 text-foreground/70 font-serif-it italic">
            Measured flat, garment laid on a table. If you sit between two sizes, size up for the silhouette we shoot, down for a closer fit.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-t border-foreground/15">
            <thead>
              <tr className="text-[11px] uppercase tracking-[0.3em] text-foreground/55">
                <th className="py-4 pr-6">Size</th>
                <th className="py-4 pr-6">Chest</th>
                <th className="py-4 pr-6">Shoulder</th>
                <th className="py-4 pr-6">Length</th>
                <th className="py-4 pr-6">Sleeve</th>
              </tr>
            </thead>
            <tbody className="font-display text-2xl">
              {SIZE_GUIDE.map((row) => (
                <tr key={row.size} className={`border-t border-foreground/10 transition-colors ${size === row.size ? "bg-foreground/5" : ""}`}>
                  <td className="py-4 pr-6">{row.size}</td>
                  <td className="py-4 pr-6">{row.chest}</td>
                  <td className="py-4 pr-6">{row.shoulder}</td>
                  <td className="py-4 pr-6">{row.length}</td>
                  <td className="py-4 pr-6">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Journey */}
      <section className="px-6 md:px-10 py-24 border-t border-foreground/10 bg-[color:var(--muted-warm)]">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-4">From mill to mailbox</p>
            <h2 className="font-display text-[12vw] md:text-[5.5vw] leading-[0.85]">FOURTEEN / <span className="font-serif-it italic font-normal">days</span></h2>
          </div>
          <p className="md:col-span-7 text-foreground/75 text-lg leading-relaxed">
            Every piece is cut after you order it. Here is what happens in the two weeks between your confirmation email and the courier knocking on your door.
          </p>
        </div>
        <ol className="grid md:grid-cols-5 gap-4">
          {JOURNEY.map((j, i) => (
            <li key={j.day} className="reveal bg-background p-6 border border-foreground/10" style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50">{j.day}</p>
              <h3 className="font-display text-2xl mt-2">{j.title}</h3>
              <p className="text-sm text-foreground/70 mt-3 leading-relaxed">{j.note}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Reviews */}
      <section className="px-6 md:px-10 py-24 border-t border-foreground/10">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-12">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-4">128 verified owners</p>
            <h2 className="font-display text-[12vw] md:text-[6vw] leading-[0.85]">
              4.9 / <span className="font-serif-it italic font-normal">from people who own one</span>
            </h2>
          </div>
          <div className="md:col-span-5 grid grid-cols-5 gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground/55">
            {[5, 4, 3, 2, 1].map((s, i) => (
              <div key={s} className="flex flex-col gap-2">
                <div className="h-24 bg-foreground/10 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 bg-foreground" style={{ height: `${[88, 9, 2, 1, 0][i]}%` }} />
                </div>
                <span>{s}★</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <article key={r.name} className="p-6 border border-foreground/15">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.stars }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                {r.verified && <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">Verified</span>}
              </div>
              <p className="text-foreground/80 leading-relaxed font-serif-it italic">"{r.body}"</p>
              <p className="mt-6 text-xs uppercase tracking-[0.3em] text-foreground/55">{r.name} · {r.city}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-10 py-24 border-t border-foreground/10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-4">In case you wondered</p>
            <h2 className="font-display text-[12vw] md:text-[5vw] leading-[0.85]">FAQ /</h2>
          </div>
          <div className="md:col-span-8 border-t border-foreground/15">
            {FAQS.map((f, i) => (
              <div key={f.q} className="border-b border-foreground/15">
                <button
                  data-cursor-hover
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left"
                >
                  <span className="font-display text-xl md:text-2xl">{f.q}</span>
                  <ChevronDown size={18} className={`transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-500 ease-out ${openFaq === i ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}>
                  <p className="overflow-hidden text-foreground/75 leading-relaxed max-w-2xl">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended */}
      <section className="px-6 md:px-10 py-20 border-t border-foreground/10">
        <h2 className="font-display text-[10vw] md:text-[6vw] leading-[0.85] mb-12">
          PAIRS / <span className="font-serif-it italic font-normal">well with</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {recs.map((p) => (
            <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }} data-cursor-hover className="group">
              <div className="aspect-[4/5] bg-[color:var(--muted-warm)] relative overflow-hidden">
                <img src={p.image} alt={p.name} className="absolute inset-0 m-auto h-[85%] w-[85%] object-contain float-soft transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="font-display text-2xl">{p.name}</h3>
                <span className="font-serif-it">{p.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}