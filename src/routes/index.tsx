import { createFileRoute } from "@tanstack/react-router";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProductRow } from "@/components/ProductRow";
import { Marquee } from "@/components/Marquee";
import { Footer } from "@/components/Footer";
import pJacket from "@/assets/p-jacket.png";
import pJeans from "@/assets/p-jeans.png";
import pTee from "@/assets/p-tee.png";
import pSweater from "@/assets/p-sweater.png";
import pTrousers from "@/assets/p-trousers.png";
import pSneakers from "@/assets/p-sneakers.png";
import pBag from "@/assets/p-bag.png";
import pSunglasses from "@/assets/p-sunglasses.png";

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
        products={[
          { name: "Rider Jacket", price: "€ 890", tag: "Leather", image: pJacket },
          { name: "Cable Knit", price: "€ 340", tag: "Wool", image: pSweater },
          { name: "Selvedge 01", price: "€ 220", tag: "Denim", image: pJeans },
          { name: "Plain Tee", price: "€ 65", tag: "Cotton", image: pTee },
        ]}
      />

      <Marquee />

      <ProductRow
        title="SOFT / STAPLES"
        subtitle="The everyday edit"
        align="right"
        products={[
          { name: "Box Tee", price: "€ 65", tag: "Cotton", image: pTee },
          { name: "Cable Knit", price: "€ 340", tag: "Wool", image: pSweater },
          { name: "Wide Trouser", price: "€ 280", tag: "Twill", image: pTrousers },
          { name: "Selvedge 01", price: "€ 220", tag: "Denim", image: pJeans },
        ]}
      />

      <ProductRow
        title="OBJECTS / 01"
        subtitle="Accessories & footwear"
        products={[
          { name: "Court 90", price: "€ 240", tag: "Footwear", image: pSneakers },
          { name: "Holdall", price: "€ 520", tag: "Leather", image: pBag },
          { name: "Tortoise Shades", price: "€ 180", tag: "Eyewear", image: pSunglasses },
          { name: "Rider Jacket", price: "€ 890", tag: "Leather", image: pJacket },
        ]}
      />

      <Footer />
    </main>
  );
}
