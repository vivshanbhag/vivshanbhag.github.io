import { ArrowUpRight, Quote } from "lucide-react";
import { profile } from "@/data/site";
import { Card, CardGlow } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/section";

const focusAreas = [
  { label: "Systems design", detail: "Trust boundaries, failure modes, operability" },
  { label: "Agentic AI", detail: "Bounded tool use and human-in-the-loop control" },
  { label: "Cloud platforms", detail: "AWS-native automation and infrastructure as code" },
  { label: "Data engineering", detail: "Pipelines and analytics that hold up in production" },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeader
        index="01"
        kicker="About"
        title={profile.aboutTitle}
        description="A systems and software engineer with 11+ years across customer-facing, operational, and data-heavy environments."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Card className="h-full p-7 md:p-9">
            <CardGlow />
            <div className="space-y-5 text-[15px] leading-[1.75] text-muted-foreground">
              <p className="text-foreground">{profile.about[0]}</p>
              <p>
                Outside engineering, I&apos;m a professional swimmer. I&apos;ve represented India in
                competitive and open-water events and held state and national records. My name appears in
                the{" "}
                <a
                  href={profile.wikipedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline decoration-accent/60 decoration-1 underline-offset-4 transition-colors hover:text-accent"
                >
                  2008 Asian Beach Games 5 km results on Wikipedia
                </a>
                . The discipline swimming demands is the same mindset I bring to complex engineering work.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/40 p-5">
              <Quote className="size-4 shrink-0 text-accent" aria-hidden />
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                The thread through all of it: leaving systems easier to operate than I found them.
              </p>
            </div>
          </Card>
        </Reveal>

        <div className="grid gap-4 lg:col-span-5">
          <Reveal delay={0.08}>
            <Card className="p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Where I focus
              </p>
              <ul className="mt-5 space-y-4">
                {focusAreas.map((area) => (
                  <li key={area.label} className="flex gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <div>
                      <p className="text-sm font-medium text-foreground">{area.label}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{area.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal delay={0.14}>
            <a
              href={profile.resume}
              download
              className="group flex items-center justify-between gap-4 rounded-3xl border border-border bg-card/60 p-6 transition-colors hover:border-accent/50"
            >
              <div>
                <p className="text-sm font-medium text-foreground">Full résumé</p>
                <p className="mt-1 text-xs text-muted-foreground">One page · PDF</p>
              </div>
              <span className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-all group-hover:border-accent/60 group-hover:text-accent">
                <ArrowUpRight className="size-4" />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
