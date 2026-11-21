import { analytics } from "@/data/site";

let started = false;

type UmamiWindow = Window & {
  umami?: { track: (event: string, data?: Record<string, string>) => void };
};

/**
 * Loads the Umami tracker once. Nothing is injected until a website id is
 * configured in src/data/site.ts, so local builds stay silent.
 */
export function initAnalytics() {
  if (started || typeof window === "undefined") return;
  if (!analytics.websiteId || !analytics.scriptUrl) return;
  started = true;

  const script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.src = analytics.scriptUrl;
  script.dataset.websiteId = analytics.websiteId;
  document.head.appendChild(script);
}

export function trackEvent(name: string, data?: Record<string, string>) {
  if (!analytics.websiteId) return;
  (window as UmamiWindow).umami?.track(name, data);
}

export const analyticsEnabled = Boolean(analytics.websiteId && analytics.scriptUrl);
