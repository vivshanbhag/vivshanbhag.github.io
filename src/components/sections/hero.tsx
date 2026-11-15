import { ArrowDown, ArrowUpRight, Download, MapPin, Sparkles } from "lucide-react";
import { profile, stats } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardGlow } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">

      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  <MapPin className="size-3" />
                  {profile.location}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-7 text-[clamp(2.9rem,7.5vw,5.4rem)] font-medium leading-[0.94] tracking-[-0.05em]">
                {profile.firstName}
                <br />
                <span className="text-gradient">{profile.lastName}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-base font-medium tracking-tight text-foreground sm:text-lg">
                {profile.role}
                <span className="hidden h-3.5 w-px bg-border sm:block" aria-hidden />
                <span className="text-muted-foreground">{profile.company}</span>
              </p>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                {profile.intro}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="#work">
                  Explore my work
                  <ArrowDown className="size-4" />
                </Button>
                <Button href={profile.resume} download variant="outline">
                  <Download className="size-4" />
                  Download résumé
                </Button>
              </div>

              <div className="mt-6">
                <Badge variant="accent">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                  </span>
                  Open to conversations
                </Badge>
              </div>

              <div className="mt-7 flex items-center gap-4 text-muted-foreground">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="transition-colors hover:text-accent"
                >
                  <GithubIcon className="size-[18px]" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="transition-colors hover:text-accent"
                >
                  <LinkedinIcon className="size-[18px]" />
                </a>
                <span className="h-3 w-px bg-border" aria-hidden />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                  Software · Systems · Agentic AI
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
              <Card className="group relative p-6 sm:col-span-2">
                <CardGlow />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Currently
                    </p>
                    <p className="mt-3 text-lg font-medium leading-snug tracking-tight">
                      Building reliable systems and agentic workflows at AWS
                    </p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-accent/40 bg-accent/10 font-mono text-xs font-semibold text-accent">
                    AWS
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {["System design", "Agentic AI", "Observability", "On-call"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/80 bg-muted/50 px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <Sparkles className="size-4 text-accent" />
                <p className="mt-4 text-3xl font-medium tracking-tight">11+</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  years shipping software, data, and cloud systems
                </p>
              </Card>

              <Card className="p-6">
                <ArrowUpRight className="size-4 text-accent" />
                <p className="mt-4 text-3xl font-medium tracking-tight">5</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  industries: cloud, finance, healthcare, energy, mining
                </p>
              </Card>

              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:col-span-2">
                {stats.slice(2).map((stat) => (
                  <div key={stat.label} className="bg-card/80 px-6 py-5 backdrop-blur-sm">
                    <p className="font-mono text-lg font-medium tracking-tight text-foreground">{stat.value}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
