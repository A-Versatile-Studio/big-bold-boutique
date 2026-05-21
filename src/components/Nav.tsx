import { Search, ShoppingBag, Menu } from "lucide-react";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 mix-blend-difference text-white">
      <a href="#" className="font-display text-xl tracking-tight">MAISON/00</a>
      <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em]">
        <a href="#shop">Shop</a>
        <a href="#new">New</a>
        <a href="#about">Studio</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="flex items-center gap-5">
        <button data-cursor-hover aria-label="Search" className="hover:opacity-70 transition-opacity">
          <Search size={20} strokeWidth={1.5} />
        </button>
        <button data-cursor-hover aria-label="Bag" className="relative hover:opacity-70 transition-opacity">
          <ShoppingBag size={20} strokeWidth={1.5} />
          <span className="absolute -top-2 -right-2 text-[10px] font-display">0</span>
        </button>
        <button data-cursor-hover aria-label="Menu" className="md:hidden">
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
}