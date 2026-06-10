import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, Minus, Plus, Truck, RotateCcw, ShieldCheck, Star, ChevronDown, Mail, Package, Globe2, Clock, Sparkles } from "lucide-react";
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

const SPECS = [
  { k: "Weight", v: "1,420 g · medium-heavy" },
  { k: "Edition", v: "Open · made to order" },
  { k: "Lining", v: "Unlined back, cupro sleeve" },
  { k: "Hardware", v: "Hand-set horn buttons" },
  { k: "Closure", v: "Three-button single-breast" },
  { k: "Pockets", v: "Two flap, one welt interior" },
];

const STYLED_WITH = [
  { title: "On a Tuesday", note: "Over a plain tee with raw selvedge denim and the Court 90.", img: "tee" },
  { title: "For the dinner", note: "Cable knit beneath, wide trouser below, holdall in hand.", img: "knit" },
  { title: "When it rains", note: "Cuffs turned, collar up. The wool drinks it and keeps going.", img: "coat" },
];

const CARE = [
  { t: "Brush", d: "Horsehair brush after each wear, with the grain." },
  { t: "Air", d: "Twenty-four hours on a wide wooden hanger." },
  { t: "Clean", d: "Dry-clean once a season. No more, ideally less." },
  { t: "Press", d: "Cool iron through cotton cloth; lapels by hand." },
];

const SUSTAINABILITY = [
  { n: "01", t: "Made to order", d: "We do not hold stock and we do not destroy unsold goods." },
  { n: "02", t: "Single-source", d: "Fewer than 80km between the fibre and the finished cloth." },
  { n: "03", t: "Repaired for life", d: "Send it back any time. The atelier that built it will mend it." },
  { n: "04", t: "Plastic-free", d: "Muslin wrap, unbleached cardboard sleeve, paper tape." },
];

const SHIPPING = [
  { region: "United Kingdom", time: "1–2 working days", cost: "Free over £150", carrier: "DPD signed" },
  { region: "European Union", time: "2–4 working days", cost: "Free over €200", carrier: "DHL Express" },
  { region: "United States & Canada", time: "3–5 working days", cost: "Flat $25 · duties incl.", carrier: "FedEx Priority" },
  { region: "Rest of world", time: "5–8 working days", cost: "From €35", carrier: "DHL Express" },
];

const IN_THE_BOX = [
  { t: "The piece", d: "Wrapped in undyed muslin, tied with cotton tape." },
  { t: "Care card", d: "A single A6 card with everything you need to know — nothing more." },
  { t: "Spare buttons", d: "Two extra horn buttons matched to your batch." },
  { t: "Repair voucher", d: "One free alteration or mend, valid for the life of the garment." },
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
      <section className="pt-32 px-8 md:px-16 lg:px-24 flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.3em] text-foreground/55">
        <Link to="/" data-cursor-hover className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> Shop · {product.category} · <span className="text-foreground">{product.name}</span>
        </Link>
        <span className="hidden md:inline">Ref. {product.slug.toUpperCase()} · {product.origin}</span>
      </section>

      {/* Sticky image / scrolling details */}
      <section className="px-8 md:px-16 lg:px-24 pt-16 md:pt-20 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">
        {/* Sticky image rail */}
        <div className="md:col-span-7 md:sticky md:top-28 self-start">
          <div className="relative aspect-square md:aspect-[4/5] bg-[color:var(--muted-warm)] overflow-hidden">
            <span className="absolute top-8 left-8 z-10 text-[11px] uppercase tracking-[0.3em] text-foreground/60">
              {product.tag} · {product.category}
            </span>
            <span className="absolute top-8 right-8 z-10 text-[11px] uppercase tracking-[0.3em] text-foreground/60">
              {String(activeImage + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
            </span>
            <img
              key={activeImage}
              src={gallery[activeImage]}
              alt={product.name}
              className="absolute inset-0 m-auto h-[78%] w-[78%] object-contain float-soft drop-shadow-[0_30px_50px_rgba(0,0,0,0.2)] anim-zoom-in"
            />
            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <p className="font-serif-it italic text-foreground/65 max-w-[60%] text-sm leading-snug">
                Photographed on a 1.84m model, wearing a size M.
              </p>
              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">Scroll —</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-4 gap-3">
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

        {/* Scrolling details — kept intentionally sparse */}
        <div className="md:col-span-5 flex flex-col pb-32 md:min-h-[150vh]">
          <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50">{product.origin}</p>

          <h1 className="mt-8 font-display text-[16vw] md:text-[5.2vw] leading-[0.88]">
            {product.name}
          </h1>

          <div className="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-foreground/55">
            <span className="inline-flex items-center gap-1"><Star size={12} fill="currentColor" /> 4.9</span>
            <span>—</span><span>128 reviews</span>
          </div>

          <div className="mt-12 flex items-baseline gap-5">
            <span className="font-display text-4xl text-[color:var(--accent-hot)]">{product.price}</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">Tax incl.</span>
          </div>
          <p className="mt-3 text-xs text-foreground/55">or 3 × <span className="text-foreground">€ {Math.round(product.priceNum / 3)}</span> · interest-free</p>

          <p className="mt-14 text-lg text-foreground/80 leading-[1.7] font-serif-it italic max-w-md">
            {product.story}
          </p>

          {/* Colourway */}
          <div className="mt-20">
            <div className="flex items-baseline justify-between mb-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50">Colourway</p>
              <p className="text-[11px] uppercase tracking-[0.3em] text-foreground">{colorway}</p>
            </div>
            <div className="flex gap-4">
              {COLORWAYS.map((c) => (
                <button
                  key={c.name}
                  data-cursor-hover
                  onClick={() => setColorway(c.name)}
                  aria-label={c.name}
                  className={`relative h-11 w-11 rounded-full transition-transform ${colorway === c.name ? "ring-1 ring-offset-4 ring-offset-background ring-foreground scale-110" : "hover:scale-105"}`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-16">
            <div className="flex items-baseline justify-between mb-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50">Size — {size}</p>
              <a href="#size-guide" data-cursor-hover className="text-[11px] uppercase tracking-[0.3em] underline underline-offset-4 text-foreground/60 hover:text-foreground">Guide ↓</a>
            </div>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  data-cursor-hover
                  onClick={() => setSize(s)}
                  className={`w-14 h-14 text-sm uppercase tracking-wider border transition-all ${size === s ? "bg-foreground text-background border-foreground" : "border-foreground/20 hover:border-foreground"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-foreground/55 leading-relaxed">Model is 1.84m and wears a {size}. Generally true to size — between sizes, take the larger for the silhouette we shoot.</p>
          </div>

          {/* CTA */}
          <div className="mt-16 flex items-center gap-3">
            <div className="flex items-center border border-foreground/20">
              <button data-cursor-hover onClick={() => setQty(Math.max(1, qty - 1))} className="w-14 h-14 grid place-items-center hover:bg-foreground/5"><Minus size={14} /></button>
              <span className="w-10 text-center font-display">{qty}</span>
              <button data-cursor-hover onClick={() => setQty(qty + 1)} className="w-14 h-14 grid place-items-center hover:bg-foreground/5"><Plus size={14} /></button>
            </div>
            <button data-cursor-hover className="flex-1 h-14 bg-foreground text-background text-xs uppercase tracking-[0.3em] hover:bg-[color:var(--accent-hot)] transition-colors">
              Add to bag — {product.price}
            </button>
            <button data-cursor-hover aria-label="Save" className="w-14 h-14 grid place-items-center border border-foreground/20 hover:border-foreground transition-colors">
              <Heart size={16} strokeWidth={1.5} />
            </button>
          </div>
          <button data-cursor-hover className="mt-3 w-full h-14 border border-foreground text-[11px] uppercase tracking-[0.3em] hover:bg-foreground hover:text-background transition-colors">
            Book a fitting — Florence atelier
          </button>

          {/* Trust strip — clean three-row */}
          <ul className="mt-16 divide-y divide-foreground/10 border-y border-foreground/10">
            <li className="flex items-center gap-4 py-5 text-sm">
              <Truck size={16} strokeWidth={1.5} className="text-foreground/50" />
              <span className="text-foreground/85">Shipped within 48 hours</span>
              <span className="ml-auto text-[10px] uppercase tracking-[0.3em] text-foreground/45">Worldwide</span>
            </li>
            <li className="flex items-center gap-4 py-5 text-sm">
              <RotateCcw size={16} strokeWidth={1.5} className="text-foreground/50" />
              <span className="text-foreground/85">Thirty days to change your mind</span>
              <span className="ml-auto text-[10px] uppercase tracking-[0.3em] text-foreground/45">Free</span>
            </li>
            <li className="flex items-center gap-4 py-5 text-sm">
              <ShieldCheck size={16} strokeWidth={1.5} className="text-foreground/50" />
              <span className="text-foreground/85">Repaired for life by the atelier</span>
              <span className="ml-auto text-[10px] uppercase tracking-[0.3em] text-foreground/45">Promise</span>
            </li>
          </ul>
        </div>
      </section>

      {/* § 01 SPECIFICATIONS — top because it answers "what am I buying?" */}
      <section className="px-8 md:px-16 lg:px-24 pt-24 md:pt-32 pb-24 border-t border-foreground/10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-20 mb-12">
          <p className="md:col-span-3 text-[11px] uppercase tracking-[0.3em] text-foreground/50 reveal">§ 01 — Specifications</p>
          <h2 className="md:col-span-9 font-serif-it italic text-3xl md:text-4xl text-foreground/90 leading-tight reveal">
            Every measure, written down.
          </h2>
        </div>
        <div className="grid md:grid-cols-12 gap-10 md:gap-20">
          <div className="md:col-start-4 md:col-span-9">
            <dl className="divide-y divide-foreground/10 border-y border-foreground/10">
              {[
                { k: "Material", v: product.material },
                { k: "Origin", v: product.origin },
                ...SPECS,
              ].map((row) => (
                <div key={row.k} className="grid grid-cols-12 gap-6 py-6">
                  <dt className="col-span-4 text-[11px] uppercase tracking-[0.3em] text-foreground/50">{row.k}</dt>
                  <dd className="col-span-8 text-base text-foreground/85">{row.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10">
              <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 mb-4">The build</p>
              <ul className="space-y-4">
                {product.details.map((d: string) => (
                  <li key={d} className="flex gap-4 text-base text-foreground/85"><span className="text-foreground/30">—</span>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* § 02 SIZE GUIDE */}
      <section id="size-guide" className="px-8 md:px-16 lg:px-24 py-24 border-t border-foreground/10">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-10">
          <div className="md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 mb-4">§ 02 — Size · centimetres</p>
            <h2 className="font-serif-it italic text-3xl md:text-4xl text-foreground/90">Find your fit.</h2>
          </div>
          <p className="md:col-span-5 text-foreground/70 leading-relaxed">
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
            <tbody className="text-base">
              {SIZE_GUIDE.map((row) => (
                <tr key={row.size} className={`border-t border-foreground/10 transition-colors ${size === row.size ? "bg-foreground/5" : ""}`}>
                  <td className="py-4 pr-6 uppercase tracking-[0.2em] text-foreground/80">{row.size}</td>
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

      {/* § 03 CARE */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-foreground/10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-20">
          <div className="md:col-span-5 reveal">
            <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 mb-4">§ 03 — Care</p>
            <h2 className="font-serif-it italic text-3xl md:text-4xl text-foreground/90">Care, lightly.</h2>
            <p className="mt-6 text-foreground/65 leading-relaxed max-w-md">
              The fewer hands that touch it, the longer it lasts. A horsehair brush and a wide wooden hanger will see you through a decade.
            </p>
          </div>
          <ol className="md:col-span-7 divide-y divide-foreground/10 border-y border-foreground/10">
            {CARE.map((c, i) => (
              <li key={c.t} className="grid grid-cols-12 gap-6 py-6 reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="col-span-2 text-xs uppercase tracking-[0.3em] text-foreground/40 pt-1">0{i + 1}</span>
                <h3 className="col-span-3 text-base uppercase tracking-[0.15em] text-foreground/85 pt-1">{c.t}</h3>
                <p className="col-span-7 text-foreground/70 leading-relaxed">{c.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* § 04 SHIPPING & RETURNS — NEW */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-foreground/10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-20 mb-12">
          <div className="md:col-span-5 reveal">
            <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 mb-4">§ 04 — Shipping & returns</p>
            <h2 className="font-serif-it italic text-3xl md:text-4xl text-foreground/90">From our door to yours.</h2>
            <p className="mt-6 text-foreground/65 leading-relaxed max-w-md">
              All orders are tracked, signed for and carbon-offset. Returns are free within the EU and UK; refunds are processed within five working days of arrival.
            </p>
            <ul className="mt-10 space-y-4 text-sm text-foreground/80">
              <li className="flex gap-3"><Truck size={16} className="text-foreground/40 mt-0.5" /> Free returns within EU & UK</li>
              <li className="flex gap-3"><Globe2 size={16} className="text-foreground/40 mt-0.5" /> Duties included for US & CA orders</li>
              <li className="flex gap-3"><Clock size={16} className="text-foreground/40 mt-0.5" /> Thirty days to send it back</li>
            </ul>
          </div>
          <div className="md:col-span-7 reveal">
            <table className="w-full text-left border-t border-foreground/15">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.3em] text-foreground/55">
                  <th className="py-4 pr-4">Region</th>
                  <th className="py-4 pr-4">Time</th>
                  <th className="py-4 pr-4">Cost</th>
                  <th className="py-4">Carrier</th>
                </tr>
              </thead>
              <tbody>
                {SHIPPING.map((s) => (
                  <tr key={s.region} className="border-t border-foreground/10 text-sm">
                    <td className="py-5 pr-4 text-foreground/85">{s.region}</td>
                    <td className="py-5 pr-4 text-foreground/70">{s.time}</td>
                    <td className="py-5 pr-4 text-foreground/70">{s.cost}</td>
                    <td className="py-5 text-foreground/70">{s.carrier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* § 05 WHAT'S IN THE BOX — NEW */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-foreground/10 bg-[color:var(--muted-warm)]">
        <div className="grid md:grid-cols-12 gap-10 md:gap-20 mb-12">
          <div className="md:col-span-5 reveal">
            <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 mb-4">§ 05 — In the box</p>
            <h2 className="font-serif-it italic text-3xl md:text-4xl text-foreground/90">What arrives at your door.</h2>
          </div>
          <p className="md:col-span-7 text-foreground/70 leading-relaxed self-end max-w-xl">
            No tissue confetti, no plastic clips. Four things, considered.
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
          {IN_THE_BOX.map((b, i) => (
            <div key={b.t} className="bg-background p-8 reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <Package size={18} className="text-foreground/40" />
              <h3 className="mt-6 text-base uppercase tracking-[0.15em] text-foreground/85">{b.t}</h3>
              <p className="mt-3 text-sm text-foreground/65 leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* § 06 THE CLOTH — the storytelling */}
      <section className="px-8 md:px-16 lg:px-24 py-32 border-t border-foreground/10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-20">
          <p className="md:col-span-3 text-[11px] uppercase tracking-[0.3em] text-foreground/50 reveal">§ 06 — The cloth</p>
          <div className="md:col-span-9 reveal">
            <p className="font-serif-it italic text-2xl md:text-[2.2vw] leading-[1.35] text-foreground/85">
              A cloth that remembers. Woven on a single Dornier loom outside Biella, with yarn twice the staple length of the mill standard.
            </p>
            <p className="mt-8 max-w-2xl text-foreground/65 leading-relaxed">
              The surface refuses to pill and the drape only deepens. It will look better in five years than it does today — a promise we are happy to put in writing.
            </p>
          </div>
        </div>
      </section>

      {/* § 07 JOURNEY */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-foreground/10">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 mb-4">§ 07 — Fourteen days</p>
            <h2 className="font-serif-it italic text-3xl md:text-4xl text-foreground/90">From mill to mailbox.</h2>
          </div>
          <p className="md:col-span-7 text-foreground/70 leading-relaxed self-end">
            Every piece is cut after you order it. Here is what happens in the two weeks between your confirmation email and the courier knocking on your door.
          </p>
        </div>
        <ol className="grid md:grid-cols-5 gap-4">
          {JOURNEY.map((j, i) => (
            <li key={j.day} className="reveal bg-background p-6 border border-foreground/10" style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50">{j.day}</p>
              <h3 className="text-lg text-foreground/90 mt-3">{j.title}</h3>
              <p className="text-sm text-foreground/70 mt-3 leading-relaxed">{j.note}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* § 08 SUSTAINABILITY */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-foreground/10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-20 mb-12">
          <p className="md:col-span-3 text-[11px] uppercase tracking-[0.3em] text-foreground/50 reveal">§ 08 — Quietly responsible</p>
          <h2 className="md:col-span-9 font-serif-it italic text-3xl md:text-4xl text-foreground/90 reveal">
            What we promise, in plain text.
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
          {SUSTAINABILITY.map((s, i) => (
            <div key={s.n} className="bg-background p-8 reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50">— {s.n}</p>
              <h3 className="mt-6 text-base uppercase tracking-[0.15em] text-foreground/85">{s.t}</h3>
              <p className="mt-3 text-sm text-foreground/65 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* § 09 STYLED WITH */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-foreground/10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-20 mb-12">
          <p className="md:col-span-3 text-[11px] uppercase tracking-[0.3em] text-foreground/50 reveal">§ 09 — In the wardrobe</p>
          <h2 className="md:col-span-9 font-serif-it italic text-3xl md:text-4xl text-foreground/90 reveal">
            Three ways to wear it.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-10">
          {STYLED_WITH.map((s, i) => (
            <article key={s.title} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="aspect-[4/5] bg-[color:var(--muted-warm)] relative overflow-hidden">
                <img src={product.image} alt="" className="absolute inset-0 m-auto h-[75%] w-[75%] object-contain float-soft" />
                <span className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.3em] text-foreground/55">0{i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg text-foreground/90">{s.title}</h3>
              <p className="mt-2 text-sm text-foreground/65 leading-relaxed max-w-xs">{s.note}</p>
            </article>
          ))}
        </div>
      </section>

      {/* § 10 REVIEWS */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-foreground/10">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-12">
          <div className="md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 mb-4">§ 10 — 128 verified owners</p>
            <h2 className="font-serif-it italic text-3xl md:text-4xl text-foreground/90">
              4.9 stars, from people who own one.
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

      {/* § 11 ATELIER NOTE */}
      <section className="px-8 md:px-16 lg:px-24 py-32 border-t border-foreground/10 bg-[color:var(--muted-warm)]">
        <div className="max-w-3xl mx-auto text-center reveal">
          <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/55 mb-8">§ 11 — A note from the atelier</p>
          <p className="font-serif-it italic text-2xl md:text-[2.4vw] leading-[1.35] text-foreground/85">
            "We make forty pieces a week. No faster. The cloth decides when it is ready, not the calendar."
          </p>
          <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-foreground/55">
            Marco Pellegrini — head of atelier, Florence
          </p>
        </div>
      </section>

      {/* § 12 FAQ */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-foreground/10">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 mb-4">§ 12 — In case you wondered</p>
            <h2 className="font-serif-it italic text-3xl md:text-4xl text-foreground/90">Questions, answered.</h2>
          </div>
          <div className="md:col-span-8 border-t border-foreground/15">
            {FAQS.map((f, i) => (
              <div key={f.q} className="border-b border-foreground/15">
                <button
                  data-cursor-hover
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left gap-6"
                >
                  <span className="text-lg md:text-xl text-foreground/90">{f.q}</span>
                  <ChevronDown size={18} className={`transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-500 ease-out ${openFaq === i ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}>
                  <p className="overflow-hidden text-foreground/70 leading-relaxed max-w-2xl">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* § 13 NEWSLETTER */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-foreground/10 bg-foreground text-background">
        <div className="grid md:grid-cols-12 gap-10 md:gap-20 items-end">
          <div className="md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.3em] text-background/55 mb-4">§ 13 — Letters from Florence</p>
            <h2 className="font-serif-it italic text-3xl md:text-4xl">
              One letter, every other Friday.
            </h2>
            <p className="mt-6 text-background/70 max-w-lg leading-relaxed">No drops, no discounts. Just a short note on what was cut that week and what we are reading at lunch.</p>
          </div>
          <form className="md:col-span-5 flex border-b border-background/40 pb-3">
            <Mail size={18} className="self-center mr-3 text-background/60" />
            <input type="email" placeholder="your@email.com" className="flex-1 bg-transparent text-background placeholder:text-background/40 outline-none text-base py-2" />
            <button data-cursor-hover className="text-[11px] uppercase tracking-[0.3em] text-background hover:text-[color:var(--accent-hot)] transition-colors">Subscribe →</button>
          </form>
        </div>
      </section>

      {/* § 14 PAIRS WELL WITH — richer module */}
      <section className="px-8 md:px-16 lg:px-24 py-24 border-t border-foreground/10">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-12">
          <div className="md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/50 mb-4 inline-flex items-center gap-2">
              <Sparkles size={12} /> § 14 — Hand-picked by the studio
            </p>
            <h2 className="font-serif-it italic text-3xl md:text-4xl text-foreground/90">
              Pairs well with.
            </h2>
            <p className="mt-5 text-foreground/65 leading-relaxed max-w-lg">
              Three pieces from the same season, photographed together in our Florence atelier. Add them all and we ship in one parcel, gift-wrapped if you ask.
            </p>
          </div>
          <div className="md:col-span-5 flex md:justify-end">
            <Link to="/" data-cursor-hover className="text-[11px] uppercase tracking-[0.3em] text-foreground/70 hover:text-foreground border-b border-foreground/30 hover:border-foreground pb-1 transition-colors">
              See the full collection →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {recs.map((p, i) => (
            <Link
              key={p.slug}
              to="/product/$slug"
              params={{ slug: p.slug }}
              data-cursor-hover
              className="group reveal block border border-foreground/10 hover:border-foreground/40 transition-colors bg-background"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="aspect-[4/5] bg-[color:var(--muted-warm)] relative overflow-hidden">
                <span className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-[0.3em] text-foreground/55">0{i + 1} · {p.tag}</span>
                <span className="absolute top-4 right-4 z-10 text-[10px] uppercase tracking-[0.3em] text-foreground/55">{p.origin.split(",")[0]}</span>
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute inset-0 m-auto h-[80%] w-[80%] object-contain float-soft transition-transform duration-700 group-hover:scale-[1.08]"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-foreground/95 text-background px-5 py-4 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.3em]">Quick view</span>
                  <span className="text-[11px] uppercase tracking-[0.3em]">→</span>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg text-foreground/90 group-hover:text-[color:var(--accent-hot)] transition-colors">{p.name}</h3>
                  <span className="text-base text-foreground/85">{p.price}</span>
                </div>
                <p className="text-xs text-foreground/55 uppercase tracking-[0.2em]">{p.category} · {p.material.split(",")[0]}</p>
                <p className="text-sm text-foreground/70 leading-relaxed line-clamp-2">{p.story}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 p-6 border border-foreground/15 bg-[color:var(--muted-warm)]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-foreground/55">Bundle the three</p>
            <p className="mt-2 text-foreground/85">Add all three pieces and we cover shipping, worldwide.</p>
          </div>
          <button data-cursor-hover className="h-12 px-6 bg-foreground text-background text-[11px] uppercase tracking-[0.3em] hover:bg-[color:var(--accent-hot)] transition-colors">
            Add the trio — {`€ ${recs.reduce((a, p) => a + p.priceNum, 0).toLocaleString()}`}
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}