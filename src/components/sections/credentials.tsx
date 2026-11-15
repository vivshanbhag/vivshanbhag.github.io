import { Award, GraduationCap } from "lucide-react";
import { education, recognition } from "@/data/site";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/section";

export function Credentials() {
  return (
    <Section id="credentials">
      <SectionHeader
        index="05"
        kicker="Education & Recognition"
        title="Learning and impact."
        description="Formal training in analytics and finance on top of a computer engineering foundation, plus recognition for process and product work."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <Card className="h-full p-7 md:p-8">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="size-4 text-accent" aria-hidden />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Education
              </h3>
            </div>
            <ul className="mt-6 divide-y divide-border/60">
              {education.map((item) => (
                <li key={item.title} className="grid grid-cols-[3rem_1fr] gap-4 py-5 first:pt-0 last:pb-0">
                  <span className="pt-0.5 font-mono text-[11px] text-accent/80">{item.year}</span>
                  <div>
                    <p className="text-[14px] font-medium leading-snug text-foreground">{item.title}</p>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="h-full p-7 md:p-8">
            <div className="flex items-center gap-2.5">
              <Award className="size-4 text-accent" aria-hidden />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Awards & Certifications
              </h3>
            </div>
            <ul className="mt-6 divide-y divide-border/60">
              {recognition.map((item) => (
                <li
                  key={`${item.year}-${item.title}`}
                  className="grid grid-cols-[3rem_1fr] gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <span className="pt-0.5 font-mono text-[11px] text-accent/80">{item.year}</span>
                  <div>
                    <p className="text-[14px] font-medium leading-snug text-foreground">{item.title}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
