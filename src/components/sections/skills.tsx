import { Braces, Cloud, Database, Sparkles } from "lucide-react";
import { skillGroups } from "@/data/site";
import { Card, CardGlow } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/section";

const icons = [Braces, Sparkles, Cloud, Database];

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeader
        index="04"
        kicker="Technical toolkit"
        title="Breadth from software to machine learning."
        description="Tooling reflects experience listed in my résumé; the internal AWS agent's implementation stack is not disclosed."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {skillGroups.map((group, index) => {
          const Icon = icons[index] ?? Braces;
          return (
            <Reveal key={group.title} delay={index * 0.06}>
              <Card className="group h-full p-7 transition-all duration-300 hover:-translate-y-1">
                <CardGlow className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-[15px] font-medium tracking-tight text-foreground">
                        {group.title}
                      </h3>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{group.blurb}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground/50">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="max-w-full rounded-lg border border-border/70 bg-background/40 px-2.5 py-1.5 text-[11px] leading-snug text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
