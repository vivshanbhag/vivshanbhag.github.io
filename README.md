# Vivek Shanbhag — Professional Website

Personal résumé and portfolio website for sharing Vivek’s professional background, engineering experience, technical skills, education, and selected work.

**Live website:** [vivshanbhag.github.io](https://vivshanbhag.github.io/)

## Website sections

- **Home and About** — introduces Vivek, his current role, engineering background, and professional interests.
- **AI & Agentic Work** — features the Incident Triage Agent, an independent open-source reference project, with links to its repository and high-level and low-level design documents.
- **Career** — presents a chronological work history with role descriptions, selected outcomes, and company marks.
- **Technical Toolkit** — groups skills across software engineering, systems and cloud engineering, AI and machine learning, and data engineering and analytics.
- **Education & Recognition** — summarizes academic credentials, awards, and certifications.
- **Let’s Connect** — provides LinkedIn and email contact options. The email control copies the address to the clipboard and confirms when it succeeds.
- **Footer** — links to GitHub and LinkedIn and displays the current year. A control lets visitors return to the top of the page.

## Theme and responsive behavior

By default, the site follows the visitor’s operating-system light or dark preference. The sun/moon control switches themes manually, and the selected theme is remembered for later visits. Layouts adapt for mobile screens, and motion respects the reduced-motion accessibility setting.

## Résumé

The **Download résumé** link in the home section downloads the standalone PDF stored in `public/`.

## Built with

React 19, TypeScript, Vite, Tailwind CSS v4, and Motion. The animated background is a small WebGL shader that reads its palette from the same CSS theme tokens as the rest of the page, so it adapts to light and dark mode without separate art.

## Local development

Requires Node 20 or newer.

```bash
npm install
npm run dev      # local preview, usually http://localhost:5173
npm run build    # type-check and build the site into dist/
npm run preview  # serve the production build locally
```

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages through the workflow in `.github/workflows/deploy.yml`. The build output is never committed.

## Structure

- `src/data/site.ts` — all page copy, roles, skills, and contact links
- `src/components/sections/` — one component per section of the page
- `src/components/fluid-background.tsx` — the animated background shader
- `src/index.css` — theme tokens, layout, and animation styles
- `public/` — résumé PDF, favicon, app icon, and social preview image
