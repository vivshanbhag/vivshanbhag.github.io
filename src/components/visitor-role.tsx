import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { analyticsEnabled, trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "visitor-role";

const OPTIONS = ["Recruiter", "Hiring manager", "Engineer", "Student", "Just browsing"];

export function VisitorRole() {
  const [visible, setVisible] = useState(false);
  const [answered, setAnswered] = useState<string | null>(null);

  useEffect(() => {
    if (!analyticsEnabled && !import.meta.env.DEV) return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    setVisible(true);
  }, []);

  if (!visible) return null;

  const choose = (option: string) => {
    setAnswered(option);
    try {
      localStorage.setItem(STORAGE_KEY, option);
    } catch {
      /* storage can be unavailable; the answer is still sent once */
    }
    trackEvent("visitor-role", { role: option });
  };

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <div role="region" aria-label="Tell me about your visit" className="border-b border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-foreground">
            {answered ? "Thanks — noted." : "What brings you here?"}
          </p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
            {answered
              ? "I'll keep the page tuned to who actually reads it."
              : "One tap, anonymous, helps me tailor this page."}
          </p>
        </div>

        {answered ? null : (
          <div className="flex flex-wrap items-center gap-1.5">
            {OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => choose(option)}
                className="rounded-full border border-border px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
              >
                {option}
              </button>
            ))}
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="ml-1 grid size-8 place-items-center rounded-full text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
