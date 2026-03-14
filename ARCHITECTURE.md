# Project Totoro — Architecture

Portfolio site for a climate urban district (60,000 residents). Built with Next.js 16 + React + TypeScript. Zero npm dependencies for visuals — everything is vanilla SVG + CSS + React.

## Stack
- **Next.js 16** (App Router, Turbopack, static export)
- **React Server Components** for all SVG visuals (0 JS overhead)
- **Manrope** (body) + **Unbounded** (display) via next/font/google
- **No UI libraries** — all components hand-crafted

## File Structure

```
src/
  app/
    page.tsx            — Flagship page (main narrative)
    layout.tsx          — Root layout with fonts
    globals.css         — All styles (no CSS modules)
    versions/page.tsx   — 4 development versions comparison
    machines/page.tsx   — 3 climate machine scenarios
    appendix/page.tsx   — Sources, metrics table, methodology
  components/
    atlas-ui.tsx        — Server components: PageSection, MetricStrip, ClaimCard, etc.
    atlas-interactives.tsx — Client components: HeroDial, MasterplanExplorer, ScrollReveal, CountUp, etc.
    atlas-visuals.tsx   — Barrel re-export for all visual components
    visuals/
      shared-shapes.tsx    — Isometric helpers (isoPoint, IsoBuilding), people silhouettes, trees, furniture
      hero-climate.tsx     — Isometric bird's eye city view (4 climate modes)
      masterplan.tsx       — Detailed quarter plan with building footprints
      persona-route.tsx    — Journey vignettes with mini-scene detection
      machine-cutaway.tsx  — Architectural building section (3 layers)
      summer-street.tsx    — Street cross-section with arcades, trees, underground
      flourishing.tsx      — Hexagonal system with SVG icons
      calendar.tsx         — Temperature curve + operational mode bars
      resilience.tsx       — City schematic with degradation zones
  data/
    atlas.ts            — Types + re-exports from JSON content files
content/
  *.json                — All content data (districts, claims, metrics, personas, etc.)
```

## Key Patterns

### Visual Components (Server)
All SVG graphics in `visuals/` are React Server Components — they render at build time with zero JS sent to client. Each accepts typed props and returns an `<svg>` with `role="img"` and `aria-labelledby`.

### Interactive Components (Client)
`atlas-interactives.tsx` has `"use client"` and contains all stateful components:
- `SegmentedTabs` — generic tab switcher
- `HeroDial` — climate mode switcher with hero layout
- `MasterplanExplorer` — quarter + season selector
- `ScrollReveal` — IntersectionObserver wrapper for entrance animations
- `CountUp` — animated number on viewport entry
- `SectionDivider` — decorative separator (glow/wave/fade variants)

### CSS Architecture
Single `globals.css` with CSS custom properties. No CSS modules, no Tailwind.
- CSS variables for all colors, radii, shadows
- Responsive breakpoints: 1120px, 780px
- Print stylesheet
- Scroll-driven animations via `.scroll-reveal` + `.is-visible`
- CSS-only particles via `box-shadow` on pseudo-elements
- Section numbering via CSS counters

### Data Layer
All content lives in `content/*.json`. Types are defined in `src/data/atlas.ts` which re-exports typed data. Content check runs at build time via `scripts/build.mjs`.

## Design Tokens
```
--bg-top: #08111a    --amber: #f0c27f
--bg-mid: #0f1d2c    --copper: #ef9461
--text: #f7f3eb      --moss: #9bcf87
--muted: #b3c1cd     --steel: #86b6c8
--ink: #102030       --snow: #f6f1e8
```

## Performance Targets
- All pages statically generated (○ Static)
- SVG visuals = 0 JS, rendered at build
- Client JS limited to interactive components only
- No external images or fonts CDN — everything bundled
