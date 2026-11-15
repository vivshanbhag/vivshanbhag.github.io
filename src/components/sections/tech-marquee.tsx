import { marqueeItems } from "@/data/site";

export function TechMarquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-card/30 py-5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
      />
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            aria-hidden={index >= marqueeItems.length}
            className="flex items-center gap-10"
          >
            <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {item}
            </span>
            <span className="size-1 rounded-full bg-accent/50" aria-hidden />
          </div>
        ))}
      </div>
    </div>
  );
}
