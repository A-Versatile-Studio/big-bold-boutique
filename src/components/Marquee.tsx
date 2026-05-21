export function Marquee() {
  const items = ["Free shipping over €200", "New drop every Friday", "Hand-finished in Europe", "Lifetime repairs", "Members get early access"];
  const row = [...items, ...items];
  return (
    <div className="border-y border-foreground/15 py-6 overflow-hidden bg-foreground text-background">
      <div className="marquee flex gap-16 whitespace-nowrap font-display text-3xl md:text-5xl uppercase">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-16">
            {t}
            <span className="text-[color:var(--accent-hot)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}