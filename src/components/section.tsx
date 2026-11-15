import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

type SectionHeaderProps = {
  index: string;
  kicker: string;
  title: ReactNode;
  description?: string;
  className?: string;
};

export function SectionHeader({ index, kicker, title, description, className }: SectionHeaderProps) {
  return (
    <Reveal className={cn("grid gap-6 md:grid-cols-12 md:items-end", className)}>
      <div className="md:col-span-7">
        <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-border" aria-hidden />
          <span>{kicker}</span>
        </div>
        <h2 className="max-w-2xl text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-foreground [text-wrap:balance] sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-5 md:justify-self-end">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative border-t border-border/60 py-20 md:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">{children}</div>
    </section>
  );
}
