type MarqueeProps = {
  text?: string;
  variant?: "dark" | "light";
};

export function Marquee({ text = "MAMMINA", variant = "dark" }: MarqueeProps) {
  const items = Array.from({ length: 10 }).map((_, i) => (
    <span key={i} className="mx-4 inline-flex items-center gap-4 whitespace-nowrap">
      <span>{text}</span>
      <span aria-hidden="true" className="text-[0.7em] opacity-60">
        ✕
      </span>
    </span>
  ));

  return (
    <div
      className={`overflow-hidden border-y py-3 ${
        variant === "dark"
          ? "border-paper-soft/15 bg-wine-dark text-paper-soft"
          : "border-wine/15 bg-blush-soft text-wine-dark"
      }`}
    >
      <div className="animate-marquee flex w-max font-serif text-sm font-semibold uppercase tracking-[0.18em]">
        {items}
        {items}
      </div>
    </div>
  );
}
