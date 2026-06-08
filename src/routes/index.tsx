import { createFileRoute } from "@tanstack/react-router";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProductRow } from "@/components/ProductRow";
import { Marquee } from "@/components/Marquee";
import { Footer } from "@/components/Footer";
import { Lookbook } from "@/components/Lookbook";
import { Craft } from "@/components/Craft";
import { Categories } from "@/components/Categories";
import { Manifesto } from "@/components/Manifesto";
import { Journal } from "@/components/Journal";
import { Testimonials } from "@/components/Testimonials";
import { Filters } from "@/components/Filters";
import { Materials } from "@/components/Materials";
import { Press } from "@/components/Press";
import { Instagram } from "@/components/Instagram";
import { FAQ } from "@/components/FAQ";
import { PRODUCTS } from "@/lib/products";

const byCat = (cat: string) => PRODUCTS.filter((p) => p.category === cat).map((p) => ({
  name: p.name, price: p.price, tag: p.tag, image: p.image, slug: p.slug,
}));

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Maison/00 — Soft Armour. Slow Fashion." },
      { name: "description", content: "Hand-tailored outerwear, knitwear and denim. Made slow in Florence. New drops every Friday." },
    ],
  }),
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Cursor />
      <Nav />
      <Hero />

      <ProductRow
        title="NEW / ARRIVALS"
        subtitle="Drop 04 — This Friday"
        products={PRODUCTS.slice(0, 4).map((p) => ({ name: p.name, price: p.price, tag: p.tag, image: p.image, slug: p.slug }))}
      />

      <Lookbook />

      <Marquee />

      <Categories />

      <Filters />

      <Materials />

      <ProductRow
        title="SOFT / STAPLES"
        subtitle="The everyday edit"
        align="right"
        products={[...byCat("Tops"), ...byCat("Knitwear"), ...byCat("Trousers"), ...byCat("Denim")].slice(0, 4)}
      />

      <Craft />

      <Manifesto />

      <Press />

      <ProductRow
        title="OBJECTS / 01"
        subtitle="Accessories & footwear"
        products={byCat("Objects")}
      />

      <Testimonials />

      <Instagram />

      <Journal />

      <FAQ />

      <Footer />
    </main>
  );
}
