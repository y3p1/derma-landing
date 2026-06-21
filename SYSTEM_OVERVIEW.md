# SYSTEM OVERVIEW — DermaRoute Landing Page

> **Project:** `derma-landing`  
> **Product marketed:** DermaRoute — Intelligent Wound Routing Platform  
> **Live demo target:** [https://derma-route.vercel.app/](https://derma-route.vercel.app/)

---

## 1. Purpose

This repository is a **marketing landing page** for DermaRoute — a clinical intelligence SaaS platform that unifies benefits verification, insurance routing, healing tracking, and product ordering for multi-specialty wound care practices. The landing page's job is to communicate the product's value proposition and drive visitors to the live demo.

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.2.9 |
| **Language** | TypeScript | ^5 |
| **UI Library** | React | 19.2.4 |
| **Styling** | Vanilla CSS (`globals.css`) + Tailwind CSS | ^4 |
| **Component System** | shadcn/ui (`radix-nova` style) | ^4.11.0 |
| **Animation** | Framer Motion | ^12.40.0 |
| **Icons** | Lucide React | ^1.21.0 |
| **Class Utilities** | `clsx` + `tailwind-merge` (via `cn()`) | ^2.1.1 / ^3.6.0 |
| **Radix UI** | `@radix-ui/react-slot` | ^1.3.0 |
| **Additional CSS** | `tw-animate-css` | ^1.4.0 |
| **Linting** | ESLint + `eslint-config-next` | ^9 / 16.2.9 |
| **PostCSS** | `@tailwindcss/postcss` | ^4 |

### Fonts (loaded via `next/font/google`)
- **Gloock** — display serif, used for all headings (`--font-serif`)
- **Figtree** — clean sans-serif, used for body text (`--font-sans`)

---

## 3. Project Architecture

```
derma-landing/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, <html> shell
│   ├── page.tsx            # Single-page app entry; all sections live here
│   ├── globals.css         # Global design system (CSS custom properties + all component styles)
│   └── favicon.ico
├── components/
│   └── ui/
│       ├── background-paths.tsx  # Framer Motion animated SVG background component (unused in page.tsx)
│       └── button.tsx            # shadcn/ui Button primitive (CVA variants)
├── lib/
│   └── utils.ts            # `cn()` helper — merges clsx + tailwind-merge
├── public/                 # Static SVG icons (file, globe, next, vercel, window)
├── components.json         # shadcn/ui configuration
├── next.config.ts          # Next.js config (currently default)
├── tsconfig.json           # TypeScript config
├── postcss.config.mjs      # PostCSS config for Tailwind v4
├── eslint.config.mjs       # ESLint flat config
├── package.json
├── serve.mjs               # Local static file server on :3000
├── screenshot.mjs          # Puppeteer screenshot (full-page)
├── screenshot-full.mjs     # Puppeteer screenshot variant
├── screenshot-mobile.mjs   # Puppeteer screenshot at mobile viewport
├── screenshot-reveal.mjs   # Puppeteer screenshot triggering scroll reveals
├── screenshot-scroll.mjs   # Puppeteer screenshot mid-scroll
├── CLAUDE.md               # Agent rules (frontend design conventions)
├── AGENTS.md               # Next.js agent rules
└── index.html              # Static HTML snapshot (46 KB) — standalone reference copy
```

### Key architectural decisions
- **Single-page, client component.** The entire page lives in one `page.tsx` file marked `"use client"`. No additional routes exist.
- **Styling strategy:** Tailwind v4 is installed but styling is predominantly **vanilla CSS** via `globals.css`. Tailwind utilities are available but the production CSS is written as a traditional component stylesheet, not utility classes.
- **No server-side data fetching.** The page is fully static — all content is hard-coded JSX. No API calls, no database, no auth.
- **shadcn/ui is scaffolded** (`components.json`, `button.tsx`, `background-paths.tsx`) but the `BackgroundPaths` component is **not used** in the current `page.tsx`. The shadcn Button component is only used inside `background-paths.tsx`.

---

## 4. Design System

All design tokens are defined as CSS custom properties in `:root` inside `globals.css`:

| Token | Value | Role |
|---|---|---|
| `--bg` | `#07080C` | Page background (near-black) |
| `--surface` | `#0D0F17` | Card / section surface |
| `--surface-2` | `#141720` | Elevated surface (inner cards) |
| `--border` | `rgba(255,255,255,0.07)` | Subtle separator lines |
| `--primary` | `#E8724A` | Brand color (burnt orange) |
| `--primary-glow` | `rgba(232,114,74,0.25)` | Glow / shadow accent |
| `--primary-dark` | `#C5573A` | Gradient endpoint for primary |
| `--teal` | `#2EC4B6` | Secondary accent |
| `--teal-glow` | `rgba(46,196,182,0.18)` | Teal glow accent |
| `--gold` | `#C9963A` | Tertiary accent |
| `--text` | `#F0EBE3` | Primary text (warm off-white) |
| `--text-soft` | `#B4ADA5` | Secondary / body text |
| `--text-muted` | `#6B7080` | Captions, labels |
| `--serif` | Gloock + Georgia fallback | Heading font stack |
| `--sans` | Figtree + system-ui fallback | Body font stack |

### Grain texture
A fixed SVG `feTurbulence` filter is applied as a `body::before` pseudo-element at `opacity: 0.028`, adding subtle film grain across the entire page.

---

## 5. Page Sections (Top to Bottom)

### 5.1 Navigation (`<nav id="navbar">`)
- **Fixed, full-width** bar at z-index 100.
- Uses `backdrop-filter: blur(20px) saturate(1.5)` for glassmorphism.
- **Scroll behavior:** A `scroll` event listener in `useEffect` darkens the background from `rgba(7,8,12,0.72)` to `rgba(7,8,12,0.92)` once the user scrolls past 40px.
- **Logo:** Custom inline SVG diamond mark + "DermaRoute" wordmark in serif.
- **Links:** Features · How it Works · Testimonials · Contact (all smooth-scroll anchor links).
- **CTAs:** "Sign In" ghost button + "View Demo" primary button (links to live app).

### 5.2 Hero (`<section class="hero">`)
- **Full-viewport-height** section (`min-height: 100vh`).
- **Background:** Three radial gradient "orbs" (primary, teal, gold) that animate in on load via `@keyframes orbFloat`. A contour grid overlay at `opacity: 0.04` adds depth.
- **Layout:** CSS Grid, 50/50 split (content left, dashboard mockup right). Collapses to single column ≤1024px; mockup hidden ≤1024px.
- **Content (left):**
  - "Clinical Intelligence Platform" badge (teal pill with pulsing dot).
  - `<h1>` headline: "Route every wound to its *optimal* outcome" (serif, clamp 42–68px).
  - Subheadline describing the product's three service lines.
  - Two CTAs: "See Live Demo" (primary) + "How it Works" (outline).
  - Trust signal: 4 avatar initials + "Trusted by wound care specialists across 40+ clinics".
- **All hero text elements animate in** sequentially via `@keyframes fadeUp` with staggered delays (0.2s–0.8s).
- **Dashboard mockup (right):**
  - A floating tooltip: "3 patients need routing ↓" (pulsing animation).
  - A fake browser chrome with macOS traffic-light dots and a "● Live" badge.
  - **Patient list:** 3 mock patient rows (R. Garcia — High, M. Thompson — Med, A. Lee — Low) with severity badges color-coded (primary/gold/teal).
  - **Stats row:** 3 stat cards: Closure Rate 87%, Avg. Heal Time 18 days, Active Cases 34.

### 5.3 Stats Band (`.stats-band`)
- Full-width horizontal bar with `background: var(--surface)`.
- 4-column grid of animated count-up numbers:
  | Stat | Value |
  |---|---|
  | Average wound closure rate | **87%** |
  | Partner clinics nationwide | **40+** |
  | Wound protocols built-in | **200+** |
  | Reduction in time-to-closure | **31%** |
- Numbers animate from 0 to target over **1400ms** using a cubic ease-out (`1 - (1-t)³`) driven by `requestAnimationFrame`, triggered by `IntersectionObserver` at 50% threshold.

### 5.4 Features (`<section id="features">`)
- 3-column grid of 6 feature cards. Drops to 2-col ≤1200px, 1-col ≤768px.
- Each card has:
  - A colored icon container (48×48px rounded square).
  - Serif heading.
  - Body description.
  - A radial gradient glow that appears on hover (opacity 0→1).
  - Lift animation: `translateY(-4px)` + shadow on hover.
- Cards alternate between three accent color families (primary/teal/gold).

| Feature | Icon accent | Description |
|---|---|---|
| **Benefits Verification** | Primary (orange) | Guided BV multi-step workflow; coverage before treatment |
| **Insurance Routing** | Teal | Auto-match patients to payer pathways; pre-auth management |
| **Healing Tracker** | Gold | Longitudinal wound measurements, photo timelines |
| **Product Ordering** | Primary (orange) | Lymphedema & Ocular catalogs, order PDFs, reorder tracking |
| **Multi-Track Platform** | Teal | Wound Care, Lymphedema, and Ocular service lines in one portal |
| **Analytics & Compliance** | Gold | HIPAA, RBAC, audit logs, BAA management, QA reporting |

### 5.5 How It Works (`<section id="how-it-works">`)
- `background: var(--surface)`, bordered top and bottom.
- 3-column step track with a horizontal gradient connector line (primary → teal) between steps.
- Step numbers are 56px circles; on hover: border turns primary, glow effect activates.
- Step hover triggers `box-shadow: 0 0 24px var(--primary-glow)`.

| Step | Title | Description |
|---|---|---|
| 01 | **Assess & Classify** | Enter wound characteristics; DermaRoute classifies severity and flags risks instantly |
| 02 | **Route to Protocol** | Engine matches to evidence-based protocols, checks formulary, routes to specialist |
| 03 | **Track & Optimize** | Longitudinal tracking; AI flags stalled cases, suggests escalation, generates reports |

### 5.6 Testimonials (`<section id="testimonials">`)
- 2-column grid (1-col on mobile).
- Each card: serif quote mark (72px, primary color at 30% opacity), italic testimonial text, author avatar + name + role.

| Author | Role | Quote summary |
|---|---|---|
| **Dr. Sarah R.** | Wound Care Medical Director | Cut average time-to-closure by nearly a month; better payer conversations |
| **Maureen K., RN, CWON** | Clinic Administrator | BV piece saves front desk 2 hours/day; eliminated coverage surprises |

### 5.7 CTA Section (`<section id="contact">`)
- Centered layout with a large radial glow behind content.
- Headline: "See DermaRoute in your clinic".
- Two CTAs: "Launch Demo" (→ live app) + "Contact Sales" (`mailto:team@nvzn.ai`).
- Footnote: "No credit card. HIPAA-compliant environment. Setup in 24 hours."

### 5.8 Footer (`<footer>`)
- Dark surface with top border.
- Flex row: logo | nav links | copyright.
- Links: Features · How it Works · Privacy · HIPAA · Contact.
- Copyright: "© 2026 DermaRoute. All rights reserved."

---

## 6. JavaScript Behaviors (all in `useEffect`, client-side)

| Behavior | Mechanism | Detail |
|---|---|---|
| **Scroll reveal** | `IntersectionObserver` (threshold 0.12) | Elements with `.reveal` or `.reveal-group` fade+slide in when entering viewport. Children of `.reveal-group` get staggered delays (0s, 0.1s, 0.2s, 0.3s). Observation stops after first trigger (`unobserve`). |
| **Count-up numbers** | `IntersectionObserver` (threshold 0.5) + `rAF` | `.count-target[data-target]` elements animate from 0 to their `data-target` value over 1400ms using cubic ease-out. |
| **Navbar darkening** | `scroll` event (passive) | Nav background transitions between two `rgba()` values at scrollY > 40. |
| **Cleanup** | `useEffect` return | All observers disconnected and scroll listener removed on component unmount. |

---

## 7. Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| ≤ 1200px | Features grid → 2 columns |
| ≤ 1024px | Hero → single column; dashboard mockup hidden; stats → 2 columns; How It Works header → vertical stack |
| ≤ 768px | Nav links hidden; sections padding reduced; hero headline smaller; hero actions stacked; stats 2-col; features 1-col; steps 1-col (connector line hidden); testimonials 1-col; CTA buttons stacked |
| ≤ 480px | Further font size reductions; stats remain 2-col; trust strip stacks vertically |

---

## 8. SEO & Metadata

Defined in `app/layout.tsx` via Next.js `Metadata` API:

- **Title:** `DermaRoute — Intelligent Wound Routing Platform`
- **Description:** `DermaRoute unifies benefits verification, insurance routing, healing tracking, and product ordering across your Wound Care, Lymphedema, and Ocular service lines.`
- **Language:** `lang="en"`
- **Scroll behavior:** `scroll-behavior: smooth` on `<html>`

---

## 9. Development Tooling

### Dev Server
```bash
npm run dev     # Starts Next.js dev server (default: http://localhost:3000)
```

### Static Server (for screenshot workflow)
```bash
node serve.mjs  # Serves project root at http://localhost:3000 (no hot-reload)
```

### Screenshot Scripts (Puppeteer)
| Script | Purpose |
|---|---|
| `screenshot.mjs` | Full-page capture → `./temporary screenshots/screenshot-N.png` |
| `screenshot-full.mjs` | Alternate full-page variant |
| `screenshot-mobile.mjs` | Mobile viewport capture |
| `screenshot-reveal.mjs` | Captures scroll-reveal animations mid-scroll |
| `screenshot-scroll.mjs` | Captures mid-scroll state |

Screenshots auto-increment filenames; never overwrite existing captures.

### Build
```bash
npm run build   # Next.js production build
npm run start   # Serve production build
npm run lint    # ESLint
```

---

## 10. Static Snapshot

`index.html` (46 KB) is a standalone HTML snapshot of the full page — all styles inline, built with Tailwind CDN. This file predates the Next.js version and is kept as a reference/fallback. It is **not served** by the Next.js app.

---

## 11. Component Inventory

| File | Type | Status | Purpose |
|---|---|---|---|
| `app/page.tsx` | React Client Component | **Active** | Entire landing page |
| `app/layout.tsx` | React Server Component | **Active** | Root layout, fonts, metadata |
| `app/globals.css` | CSS | **Active** | Full design system and all page styles |
| `components/ui/button.tsx` | shadcn/ui primitive | **Available** | CVA-based Button with ghost/default variants |
| `components/ui/background-paths.tsx` | Framer Motion component | **Not used** | Animated SVG path background + letter-by-letter title animation |
| `lib/utils.ts` | Utility | **Active** | `cn()` class merging helper |

---

## 12. External Dependencies & Links

| Resource | URL |
|---|---|
| Live demo app | https://derma-route.vercel.app/ |
| Sales / contact email | team@nvzn.ai |
| Placeholder images (if needed) | https://placehold.co/ |
| Puppeteer cache (screenshot scripts) | `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/` |
