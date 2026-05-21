export function Footer() {
  return (
    <footer className="px-6 md:px-10 pt-24 pb-10 border-t border-foreground/10">
      <h2 className="font-display text-[20vw] md:text-[14vw] leading-[0.85]">
        MAISON<br/><span className="font-serif-it italic font-normal">/00</span>
      </h2>
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs uppercase tracking-[0.2em]">
        <div>
          <p className="text-foreground/50 mb-3">Shop</p>
          <ul className="space-y-2"><li>Outerwear</li><li>Knitwear</li><li>Denim</li><li>Accessories</li></ul>
        </div>
        <div>
          <p className="text-foreground/50 mb-3">Studio</p>
          <ul className="space-y-2"><li>About</li><li>Craft</li><li>Journal</li><li>Stores</li></ul>
        </div>
        <div>
          <p className="text-foreground/50 mb-3">Help</p>
          <ul className="space-y-2"><li>Shipping</li><li>Returns</li><li>Sizing</li><li>Contact</li></ul>
        </div>
        <div>
          <p className="text-foreground/50 mb-3">Letters</p>
          <p className="normal-case tracking-normal text-sm text-foreground/70">Slow updates, no spam.</p>
          <div className="mt-3 flex border-b border-foreground pb-2">
            <input className="bg-transparent outline-none flex-1 normal-case tracking-normal" placeholder="you@studio.com" />
            <button data-cursor-hover>→</button>
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-between text-xs uppercase tracking-[0.25em] text-foreground/50">
        <span>© 2026 Maison/00</span>
        <span>Made slow in Florence</span>
      </div>
    </footer>
  );
}