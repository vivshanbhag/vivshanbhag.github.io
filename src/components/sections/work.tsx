import { ArrowUpRight, FileCode2, GitBranch, ShieldCheck, Terminal, Workflow } from "lucide-react";
import { featuredProject, systemsProjects } from "@/data/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardGlow } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { Section, SectionHeader } from "@/components/section";

const capabilityIcons = [Workflow, Terminal, ShieldCheck];

export function Work() {
  const project = featuredProject;

  return (
    <Section id="work">
      <SectionHeader
        index="02"
        kicker="AI & Agentic Work"
        title={
          <>
            Useful AI starts with a real workflow.
          </>
        }
        description="How far an agent should go, and exactly where a human takes over."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <Card className="relative h-full p-7 md:p-9">
            <CardGlow />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-accent/10 blur-3xl"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {project.eyebrow}
              </span>
              <Badge variant="accent">
                <span className="size-1.5 rounded-full bg-accent" />
                {project.status}
              </Badge>
            </div>

            <div className="mt-8 flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                  {project.type}
                </p>
                <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                  {project.title}
                </h3>
              </div>
              <span className="hidden size-14 shrink-0 place-items-center rounded-2xl border border-accent/30 bg-accent/10 font-mono text-sm font-semibold text-accent sm:grid">
                ITA
              </span>
            </div>

            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              {project.summary}
            </p>

            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-accent/70" aria-hidden />
              {project.note}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {project.capabilities.map((capability, index) => {
                const Icon = capabilityIcons[index] ?? Workflow;
                return (
                  <div
                    key={capability.title}
                    className="rounded-2xl border border-border/70 bg-muted/30 p-4 transition-colors hover:border-accent/40"
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="size-4 text-accent" aria-hidden />
                      <span className="font-mono text-[10px] text-muted-foreground/60">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-3 text-[13px] font-medium text-foreground">{capability.title}</p>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                      {capability.body}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-1.5">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border/80 bg-background/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-border/70 pt-7">
              <Button href={project.repo} target="_blank" rel="noopener noreferrer">
                View project
                <ArrowUpRight className="size-4" />
              </Button>
              <Button
                href={`${project.repo}/blob/main/docs/HLD.md`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                Read the design
              </Button>
            </div>
          </Card>
        </Reveal>

        <div className="grid gap-4 lg:col-span-4">
          <Reveal delay={0.08}>
            <Card className="p-7">
              <div className="flex items-center gap-2">
                <FileCode2 className="size-4 text-accent" aria-hidden />
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  System design
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Architecture documents for this project, published alongside the code.
              </p>
              <div className="mt-5 space-y-2">
                {featuredProject.docs.map((doc) => (
                  <a
                    key={doc.tag}
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-muted/20 p-3.5 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:bg-muted/40"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-background/60 font-mono text-[10px] font-semibold text-accent">
                      {doc.tag}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium text-foreground">{doc.title}</span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
                        {doc.body}
                      </span>
                    </span>
                    <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
                  </a>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.14}>
            <Card className="bg-gradient-to-br from-accent/10 via-card/60 to-card/60 p-7">
              <GitBranch className="size-4 text-accent" aria-hidden />
              <p className="mt-4 text-sm font-medium text-foreground">Open-source by default</p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Public reference implementations and design write-ups, kept separate from
                employer-internal work.
              </p>
              <a
                href="https://github.com/vivshanbhag"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-opacity hover:opacity-80"
              >
                Browse GitHub
                <ArrowUpRight className="size-3.5" />
              </a>
            </Card>
          </Reveal>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Production-pattern reference systems
            </p>
            <h3 className="mt-2 text-lg font-medium tracking-[-0.01em] text-foreground">
              Three layers that make agents operable
            </h3>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
            Connect safely, prove behaviour, survive failure. Each repository ships code, tests, an HLD and an LLD.
          </p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {systemsProjects.map((system, index) => (
            <Reveal key={system.name} delay={0.06 + index * 0.05}>
              <Card className="flex h-full flex-col p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{system.kicker}</p>
                <h4 className="mt-3 text-[15px] font-medium tracking-[-0.01em] text-foreground">{system.name}</h4>
                <p className="mt-2 flex-1 text-[12px] leading-relaxed text-muted-foreground">{system.summary}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {system.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border/80 bg-background/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-4 border-t border-border/70 pt-4">
                  <a
                    href={system.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-accent transition-opacity hover:opacity-80"
                  >
                    Repository
                    <ArrowUpRight className="size-3" />
                  </a>
                  <a
                    href={system.design}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    HLD
                  </a>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
