import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, Minus, Plus, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { useState } from "react";
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

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);

  const related = PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);
  const fallback = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);
  const recs = related.length ? related : fallback;

  return (
    <main className="bg-background text-foreground">
      <Cursor />
      <Nav />

      <section className="pt-28 px-6 md:px-10">
        <Link to="/" data-cursor-hover className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/60 hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> Back to shop
        </Link>
      </section>

      <section className="px-6 md:px-10 pt-10 pb-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
        {/* Image */}
        <div className="md:col-span-7 md:sticky md:top-28 self-start">
          <div className="relative aspect-square md:aspect-[4/5] bg-[color:var(--muted-warm)] overflow-hidden">
            <span className="absolute top-6 left-6 z-10 text-xs uppercase tracking-[0.3em] text-foreground/60">
              {product.tag} · {product.category}
            </span>
            <img src={product.image} alt={product.name} className="absolute inset-0 m-auto h-[88%] w-[88%] object-contain float-soft drop-shadow-[0_30px_50px_rgba(0,0,0,0.2)]" />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[product.image, product.image, product.image, product.image].map((src, k) => (
              <button key={k} data-cursor-hover className="aspect-square bg-[color:var(--muted-warm)] relative overflow-hidden border border-transparent hover:border-foreground transition-colors">
                <img src={src} alt="" className="absolute inset-0 m-auto h-[78%] w-[78%] object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="md:col-span-5 flex flex-col">
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-4">{product.origin}</p>
          <h1 className="font-display text-[14vw] md:text-[5vw] leading-[0.9]">{product.name}</h1>
          <div className="mt-6 flex items-baseline gap-4">
            <span className="font-display text-3xl text-[color:var(--accent-hot)]">{product.price}</span>
            <span className="text-xs uppercase tracking-[0.25em] text-foreground/50">Tax included</span>
          </div>

          <p className="mt-8 text-base text-foreground/75 leading-relaxed font-serif-it italic">{product.story}</p>

          <div className="mt-10">
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-3">Size</p>
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
            <button className="mt-3 text-xs underline underline-offset-4 text-foreground/60 hover:text-foreground" data-cursor-hover>Size guide ↗</button>
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

          <div className="mt-8 grid grid-cols-3 gap-3 text-[11px] uppercase tracking-[0.2em] text-foreground/60">
            <div className="flex flex-col items-start gap-2 p-3 border border-foreground/15"><Truck size={16} strokeWidth={1.5} />Ships in 48h</div>
            <div className="flex flex-col items-start gap-2 p-3 border border-foreground/15"><RotateCcw size={16} strokeWidth={1.5} />30 day returns</div>
            <div className="flex flex-col items-start gap-2 p-3 border border-foreground/15"><ShieldCheck size={16} strokeWidth={1.5} />Lifetime repairs</div>
          </div>

          <div className="mt-10 border-t border-foreground/15 pt-8">
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 mb-4">The details</p>
            <ul className="space-y-3">
              {product.details.map((d) => (
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