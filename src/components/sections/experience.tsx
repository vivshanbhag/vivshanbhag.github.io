import { useEffect, useRef } from "react";
import { experience } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/section";

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Fill the rail up to the reading line and let the dot ride its head.
    const update = () => {
      const rect = track.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      const progress = rect.height > 0 ? (anchor - rect.top) / rect.height : 0;
      track.style.setProperty("--progress", String(Math.min(Math.max(progress, 0), 1)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <Section id="experience">
      <SectionHeader
        index="03"
        kicker="Career"
        title="Experience that scales across domains."
        description="From banking products in Mumbai to AI-enabled tooling in Seattle — building, leading, and supporting the software behind them."
      />

      <div className="mt-14">
        <div className="relative">
          <div
            ref={trackRef}
            aria-hidden
            className="timeline-track absolute left-[7px] top-2 bottom-2 w-px md:left-[8px]"
          >
            <span className="timeline-rail absolute inset-0" />
            <span className="timeline-fill" />
            <span className="timeline-dot" />
          </div>

          <ol className="space-y-2">
            {experience.map((role, index) => (
              <li key={`${role.company}-${role.period}`} className="relative pl-9 md:pl-12">
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 top-6 grid size-3.5 place-items-center rounded-full border-2 md:size-4",
                    role.current
                      ? "border-accent bg-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_18%,transparent)]"
                      : "border-border bg-background",
                  )}
                />

                <Reveal delay={Math.min(index * 0.04, 0.2)}>
                  <div className="group rounded-3xl border border-transparent px-4 py-5 transition-colors hover:border-border/80 hover:bg-card/40 sm:px-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {role.period}
                      </span>
                      {role.current ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
                          <span className="size-1 rounded-full bg-accent" />
                          Current
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-3 flex items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/80">
                          {role.company} · {role.location}
                        </p>
                        <h3 className="mt-2 text-lg font-medium leading-snug tracking-[-0.02em] text-foreground sm:text-xl">
                          {role.title}
                        </h3>

                        {role.summary ? (
                          <p className="mt-2.5 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
                            {role.summary}
                          </p>
                        ) : null}

                        {role.points ? (
                          <ul className="mt-3 space-y-2">
                            {role.points.map((point) => (
                              <li
                                key={point}
                                className="flex gap-2.5 text-[13px] leading-relaxed text-muted-foreground"
                              >
                                <span
                                  aria-hidden
                                  className="mt-[7px] size-1 shrink-0 rounded-full bg-accent/70"
                                />
                                {point}
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        {role.tags ? (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {role.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-border/80 bg-muted/40 px-2.5 py-1 text-[11px] text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        {role.award ? (
                          <p className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-full border border-border/70 bg-muted/30 px-3 py-1.5">
                            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-accent">
                              {role.award.label}
                            </span>
                            <span className="text-[11px] text-muted-foreground">{role.award.value}</span>
                          </p>
                        ) : null}
                      </div>

                      <span className="hidden size-11 shrink-0 place-items-center rounded-xl border border-border/80 bg-card/60 font-mono text-[10px] font-semibold tracking-wide text-muted-foreground transition-colors group-hover:border-accent/40 group-hover:text-accent sm:grid">
                        {role.mark}
                      </span>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
