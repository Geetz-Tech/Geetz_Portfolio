# GEETZ — Personal Engineering Portfolio

Personal engineering portfolio of **Geetha K S** — Founder · Software Engineer · AI Product Builder. The site presents product engineering, AI-assisted platforms, enterprise software work, selected products, client engagements, and a professional journey under the **GEETZ** brand.

**Live Portfolio:** [https://geetz-portfolio.vercel.app](https://geetz-portfolio.vercel.app)

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-white)](https://geetz-portfolio.vercel.app)

## About

Geetha K S is a **Founder · Software Engineer · AI Product Builder**, working as Senior AI Product Engineer and founder of Kripra’s Digital AI Pvt. Ltd. The portfolio documents 8+ years of enterprise and product engineering — Python full-stack delivery, AI/LLM integration, and privately held commercial platforms.

## Portfolio Highlights

- **About** — founder mindset and engineer’s discipline, with a portrait ID-card entrance.
- **Expertise / Engineering Stack** — full-stack, AI/LLM, SaaS architecture, APIs, data, and automation.
- **Selected Product Systems** — a continuous product rail of commercial platforms.
- **Client Work** — selected confidential client engagements.
- **Engineering Process** — Discover → Architect → Design → Engineer → Intelligence → Ship.
- **Professional Journey** — chronology from 2016 to present, including concurrent founder and professional roles.
- **Contact** — email, WhatsApp, LinkedIn, GitHub, and the company site.

## Selected Product Engineering

Products listed in the live catalogue, in this order:

| Product | Positioning |
| --- | --- |
| **Farmora** | Intelligent Agriculture Platform |
| **EDNORYX** | AI Education Platform |
| **StaffTract.AI** | AI Workforce & Recruitment Platform |
| **JusticeAngel** | AI-Powered Legal Intelligence |
| **KriPra SmartERP AI** | AI-Enabled Enterprise ERP Platform |
| **Faturaix** | GST & E-Invoicing Compliance SaaS |
| **Pyrosk AI** | AI Marketing & Lead Automation Platform |
| **Trade ERP / CRM** | Commodity & Trade Operations Platform |

These are private commercial or proprietary products. Implementation detail remains in the portfolio source of truth (`data/content.ts`).

## Engineering Stack

Website implementation, verified from this repository:

**Framework** — Next.js 16 (App Router)

**Frontend** — React 19

**Styling** — Tailwind CSS 4, global design tokens in `app/globals.css`, Geist / Geist Mono via `next/font`

**Motion / Interaction** — Framer Motion, CSS transforms, and requestAnimationFrame-driven pointer/rail updates

**Development / Quality** — TypeScript, ESLint (`eslint-config-next`), Vinext for local `npm run dev`

**Deployment** — Vercel (`next build` / `next start`)

The on-site Expertise and stack sections also document Geetha’s product-engineering languages and platforms (Python, FastAPI, React, PostgreSQL, NLP/GenAI, and related tools). Those describe shipped product work, not this repository’s runtime.

## Interaction Design

The site keeps a restrained set of signature interactions:

- GEETZ opening experience (wordmark, companion mark, pointer-aware lighting)
- Orbital hero “G” with a limited depth response
- About ID-card drop / hang entrance
- Continuous product exploration rail (desktop autoplay, drag, swipe, wheel, keyboard)
- Product-card hover micro-interactions, including JusticeAngel legal artwork
- Responsive composition and `prefers-reduced-motion` fallbacks

## Running Locally

Requires Node.js `22.x`.

```bash
npm install
npm run dev
```

`npm run dev` starts Vinext. Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

`npm run build` runs `next build`. `npm start` runs `next start`.

Additional checks:

```bash
npm run lint
npm run typecheck
```

## Deployment

Production is configured for **Vercel** (`vercel.json` uses the Next.js framework and `next build`).

Live production: [https://geetz-portfolio.vercel.app](https://geetz-portfolio.vercel.app)

## Environment Variables

No environment variables are required for normal local or production operation.

An optional public URL may be supplied as `NEXT_PUBLIC_SITE_URL` for canonical metadata and the sitemap. If it is unset, the app falls back to a default site URL in `app/layout.tsx` and `app/sitemap.ts`.

There is currently no `.env.example` file. Do not commit secrets.

## Repository Structure

```
app/          App Router entry, layout, global styles, sitemap, icon
components/   Portfolio sections and interaction components
data/         Source-of-truth profile, products, clients, journey
public/       Portrait, client marks, Open Graph image, robots, manifest
```

## Accessibility & Performance

Implemented in the current codebase:

- Keyboard controls for the product rail, navigation, and dialogs
- Focus management for the mobile menu and product modal
- `aria-label` / `aria-hidden` usage for decorative artwork and cloned rail cards
- `prefers-reduced-motion` CSS and JS paths (including disabled product autoplay)
- IntersectionObserver for reveal-on-enter and section highlighting
- Pointer and rail motion kept on refs / CSS variables with coalesced animation frames
- Autoplay suspends when the product section is off-screen or the tab is hidden

No WCAG conformance level is claimed.

## Author

**Geetha K S**  
Founder · Software Engineer · AI Product Builder

GitHub: [https://github.com/Geetz-Tech](https://github.com/Geetz-Tech)

LinkedIn: [https://www.linkedin.com/in/geethaks20](https://www.linkedin.com/in/geethaks20)

Portfolio: [https://geetz-portfolio.vercel.app](https://geetz-portfolio.vercel.app)

## License

All rights reserved. This repository and its contents may not be reproduced or redistributed without permission.
