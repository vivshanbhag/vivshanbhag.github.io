import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { analytics } from "@/data/site";
import "./index.css";

function Insights() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border/60 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
            <BarChart3 className="size-4" />
          </span>
          <div>
            <p className="text-sm font-medium">Traffic</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Private · not indexed · not linked
            </p>
          </div>
        </div>
        <a
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to site
        </a>
      </header>

      {analytics.dashboardUrl ? (
        <iframe
          title="Umami analytics dashboard"
          src={analytics.dashboardUrl}
          className="w-full flex-1 border-0"
          loading="lazy"
        />
      ) : (
        <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-4 px-6 py-16">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard not connected yet</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This page is where your traffic dashboard lives. It stays empty until a Umami site id and a private
            share link are added to <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[12px]">src/data/site.ts</code>.
          </p>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Create the website in Umami Cloud and copy its website id.</li>
            <li>Open the dashboard, use Share, and copy the private link.</li>
            <li>Paste both values into the analytics config and rebuild.</li>
          </ol>
        </main>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Insights />
  </StrictMode>,
);
