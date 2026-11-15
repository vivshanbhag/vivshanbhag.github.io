import { FluidBackground } from "@/components/fluid-background";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Credentials } from "@/components/sections/credentials";
import { Contact } from "@/components/sections/contact";

export default function App() {
  return (
    <div className="relative min-h-screen text-foreground">
      <FluidBackground />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main" tabIndex={-1}>
        <Hero />
        <TechMarquee />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Credentials />
        <Contact />
      </main>

      <SiteFooter />
    </div>
  );
}
