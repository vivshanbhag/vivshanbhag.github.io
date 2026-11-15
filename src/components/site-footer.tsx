import { ArrowUp } from "lucide-react";
import { profile } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-lg border border-accent/40 bg-accent/10 font-mono text-[11px] font-semibold text-accent">
            VS
          </span>
          <div>
            <p className="text-[13px] font-medium text-foreground">{profile.name}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Software · Systems · Agentic AI
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} · Built with React, TypeScript &amp; Tailwind CSS
        </p>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
              })
            }
            aria-label="Scroll to top"
            className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
