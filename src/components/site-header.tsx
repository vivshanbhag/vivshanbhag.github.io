import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, profile } from "@/data/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
      setScrolled(window.scrollY > 12);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const sections = navItems.flatMap((item) => {
      const element = document.querySelector<HTMLElement>(item.href);
      return element ? [{ href: item.href, element }] : [];
    });

    if (!sections.length) return;

    /*
     * Measure on scroll instead of watching intersection ratios: the active link
     * is simply the section under the reading line (just below the header). That
     * keeps the highlight in page order and never leaves the wrong section lit
     * when two sections share the viewport.
     */
    const measure = () => {
      const line = window.innerHeight * 0.32;
      let current = "";

      for (const { href, element } of sections) {
        if (element.getBoundingClientRect().top <= line) current = href;
      }

      // A short trailing section may never reach the line; light it at the very bottom.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      if (atBottom) current = sections[sections.length - 1].href;

      setActive(current);
    };

    // Six rect reads per scroll event is cheap, and measuring synchronously keeps
    // the highlight exact even when animation frames are throttled.
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    if (open) document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/70 bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px origin-left bg-accent/70 transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 md:h-20 md:px-8">
        <a
          href="#top"
          className="group inline-flex items-center gap-2.5"
          aria-label={`${profile.name}, back to top`}
        >
          <span className="grid size-8 place-items-center rounded-lg border border-accent/40 bg-accent/10 font-mono text-[11px] font-semibold text-accent transition-colors group-hover:bg-accent/20">
            VS
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:block">{profile.name}</span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "location" : undefined}
              className={cn(
                "rounded-full px-3.5 py-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground",
                active === item.href && "bg-accent/10 text-foreground",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-border px-4 py-2 text-[13px] text-foreground transition-colors hover:border-accent/60 hover:text-accent sm:inline-flex"
          >
            LinkedIn
            <ArrowUpRight className="size-3.5" />
          </a>
          <ThemeToggle className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav aria-label="Mobile navigation" className="flex flex-col px-6 py-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active === item.href ? "location" : undefined}
              className={cn(
                "flex items-center justify-between border-b border-border/60 py-3.5 text-sm last:border-0 hover:text-accent",
                active === item.href ? "font-medium text-accent" : "text-muted-foreground",
              )}
            >
              {item.label}
              <ArrowUpRight className="size-3.5" />
            </a>
          ))}
          <div className="mt-4 flex items-center justify-between">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent"
            >
              LinkedIn ↗
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
