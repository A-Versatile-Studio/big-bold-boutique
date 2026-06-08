import pJacket from "@/assets/p-jacket.png";
import pSweater from "@/assets/p-sweater.png";
import pJeans from "@/assets/p-jeans.png";
import pTee from "@/assets/p-tee.png";
import pTrousers from "@/assets/p-trousers.png";
import pSneakers from "@/assets/p-sneakers.png";
import pBag from "@/assets/p-bag.png";
import pSunglasses from "@/assets/p-sunglasses.png";
import heroCoat from "@/assets/hero-coat.png";

export type Category = "All" | "Outerwear" | "Knitwear" | "Denim" | "Tops" | "Trousers" | "Objects";

export type Product = {
  slug: string;
  name: string;
  category: Exclude<Category, "All">;
  tag: string;
  price: string;
  priceNum: number;
  was?: string;
  image: string;
  story: string;
  details: string[];
  material: string;
  origin: string;
};

export const PRODUCTS: Product[] = [
  { slug: "atelier-coat", name: "Atelier Coat", category: "Outerwear", tag: "Wool", price: "€ 1,290", priceNum: 1290, image: heroCoat,
    story: "Hand-tailored double-faced Italian wool. Oversized drop shoulder, unlined back, raw-edge lapel. Cut in a converted dye-house outside Florence over the course of two days.",
    details: ["Made-to-order — 14 day lead time", "Unlined construction", "Horn buttons, hand-set", "Pick-stitched lapel", "Dry clean only"],
    material: "100% Italian virgin wool, double-faced", origin: "Florence, Italy" },
  { slug: "rider-jacket", name: "Rider Jacket", category: "Outerwear", tag: "Leather", price: "€ 890", priceNum: 890, image: pJacket,
    story: "Vegetable-tanned lambskin from a fourth-generation tannery in Tuscany. Asymmetric zip, hand-stitched lapels. Breaks in like an old paperback.",
    details: ["Italian YKK Excella zip", "Antique brass hardware", "Cotton-twill lining", "Internal phone pocket"],
    material: "Vegetable-tanned lambskin", origin: "Tuscany, Italy" },
  { slug: "cable-knit", name: "Cable Knit", category: "Knitwear", tag: "Wool", price: "€ 340", priceNum: 340, image: pSweater,
    story: "Chunky undyed merino, ribbed neckline, hand-finished cuffs. Knit on vintage looms in Yorkshire by Mr. Hargreaves and his daughter.",
    details: ["Chunky 6-ply gauge", "Linked-and-linked seams", "Undyed natural wool", "Machine wash cold, wool cycle"],
    material: "100% British merino, undyed", origin: "Yorkshire, UK" },
  { slug: "selvedge-01", name: "Selvedge 01", category: "Denim", tag: "Denim", price: "€ 220", priceNum: 220, image: pJeans,
    story: "14oz Japanese selvedge from the Kaihara mill in Hiroshima. One wash, sanforised, button fly. Wears in to the body over twelve months.",
    details: ["14oz Kaihara selvedge", "Button fly, copper rivets", "Chain-stitch hem", "One-wash, sanforised"],
    material: "100% cotton, Japanese selvedge", origin: "Hiroshima, Japan" },
  { slug: "plain-tee", name: "Plain Tee", category: "Tops", tag: "Cotton", price: "€ 65", priceNum: 65, image: pTee,
    story: "Heavy supima jersey, boxy cut, ribbed crew. Garment-dyed in small batches so no two are exactly alike.",
    details: ["240gsm supima jersey", "Garment-dyed, washed twice", "Boxy fit, drop shoulder", "Ribbed self-fabric collar"],
    material: "100% Supima cotton", origin: "Porto, Portugal" },
  { slug: "wide-trouser", name: "Wide Trouser", category: "Trousers", tag: "Twill", price: "€ 280", priceNum: 280, image: pTrousers,
    story: "High-rise, wide leg, pleated front. Cut in a cotton-linen twill that holds a crease but moves like a tracksuit.",
    details: ["Single pleat, side adjusters", "Cotton-linen twill, 290gsm", "Unlined construction", "Cut on the bias"],
    material: "70% cotton, 30% linen", origin: "Naples, Italy" },
  { slug: "court-90", name: "Court 90", category: "Objects", tag: "Footwear", price: "€ 240", priceNum: 240, image: pSneakers,
    story: "Low-profile court sneaker, full-grain leather upper, gum sole. Made by hand on a thirty-year-old last.",
    details: ["Full-grain Italian leather", "Natural gum rubber sole", "Goodyear-welted construction", "Cotton laces, two pairs"],
    material: "Italian full-grain leather", origin: "Marche, Italy" },
  { slug: "holdall-48h", name: "Holdall 48h", category: "Objects", tag: "Leather", price: "€ 520", priceNum: 520, image: pBag,
    story: "Grained calf leather, brass hardware, suede-lined interior. Sized for a long weekend, built for a decade.",
    details: ["Hand-cut grained calf", "Solid brass hardware", "Suede-lined interior", "Detachable shoulder strap"],
    material: "Grained calfskin", origin: "Florence, Italy" },
  { slug: "tortoise-shades", name: "Tortoise Shades", category: "Objects", tag: "Eyewear", price: "€ 180", priceNum: 180, image: pSunglasses,
    story: "Acetate frames hand-cut and polished over the course of a week. Tortoise pattern, no two pairs alike.",
    details: ["Italian Mazzucchelli acetate", "Hand-polished, seven days", "CR-39 lenses, UV400", "Leather case included"],
    material: "Mazzucchelli 1849 acetate", origin: "Cadore, Italy" },
];

export const CATEGORIES: Category[] = ["All", "Outerwear", "Knitwear", "Denim", "Tops", "Trousers", "Objects"];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}