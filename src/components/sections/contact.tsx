import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Download, Mail } from "lucide-react";
import { profile } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { Button, ButtonElement } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

const channels = [
  {
    label: "LinkedIn",
    detail: "Professional messages",
    href: profile.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "GitHub",
    detail: "Code and side projects",
    href: profile.github,
    icon: GithubIcon,
    external: true,
  },
  {
    label: "Résumé",
    detail: "One page · PDF",
    href: profile.resume,
    icon: Download,
    external: false,
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copyEmail() {
    let success = false;
    try {
      await navigator.clipboard.writeText(profile.email);
      success = true;
    } catch {
      const field = document.createElement("textarea");
      field.value = profile.email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.append(field);
      field.select();
      try {
        success = document.execCommand("copy");
      } catch {
        success = false;
      }
      field.remove();
    }

    if (!success) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <section id="contact" className="relative border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-border/80 bg-card/50 p-px shadow-[0_24px_80px_-40px_rgba(0,0,0,0.45)] backdrop-blur-xl md:rounded-[2.5rem]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-32 -z-10 size-[28rem] rounded-full bg-accent/10 blur-3xl"
            />

            <div className="rounded-[calc(2rem-1px)] bg-background/40 px-6 py-12 sm:px-10 md:rounded-[calc(2.5rem-1px)] md:px-14 md:py-16">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em]">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                    </span>
                    <span className="text-accent">Let&apos;s connect</span>
                  </div>

                  <h2 className="mt-5 text-[clamp(1.95rem,4.2vw,3.05rem)] font-medium leading-[1.04] tracking-[-0.045em] [text-wrap:balance]">
                    Good work begins with a{" "}
                    <span className="text-gradient">conversation</span>.
                  </h2>

                  <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Open to conversations about software engineering, systems design, and agentic AI — in
                    Seattle or remotely.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <ButtonElement
                      type="button"
                      onClick={copyEmail}
                      aria-live="polite"
                      className="w-full sm:w-auto sm:min-w-[12.5rem]"
                    >
                      {copied ? <Check className="size-4" /> : <Mail className="size-4" />}
                      {copied ? "Email copied" : "Copy email"}
                    </ButtonElement>
                    <Button
                      href={`mailto:${profile.email}`}
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      Write an email
                      <ArrowUpRight className="size-4" />
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Direct links
                  </p>

                  <div className="mt-4 overflow-hidden rounded-2xl border border-border/70 bg-card/40">
                    {channels.map((channel, index) => {
                      const Icon = channel.icon;
                      return (
                        <a
                          key={channel.label}
                          href={channel.href}
                          {...(channel.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : { download: true })}
                          className={
                            "group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-accent/[0.06] sm:px-5" +
                            (index > 0 ? " border-t border-border/60" : "")
                          }
                        >
                          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border/80 bg-muted/40 text-muted-foreground transition-colors group-hover:border-accent/40 group-hover:text-accent">
                            <Icon className="size-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium text-foreground">
                              {channel.label}
                            </span>
                            <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                              {channel.detail}
                            </span>
                          </span>
                          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                        </a>
                      );
                    })}
                  </div>

                  <p className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    <span className="size-1 rounded-full bg-accent/70" aria-hidden />
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
