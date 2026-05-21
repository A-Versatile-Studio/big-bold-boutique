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
      <div className="flex items-center gap-6 text-xs uppercase tracking-[0.2em]">
        <a href="#">Search</a>
        <a href="#">Bag (0)</a>
      </div>
    </nav>
  );
}