# 07 — Implementer Log

Task #7: fixes based on QA reports and architect task list (06-architect-tasks.md).

## Round 1 — Direct from QA reports (before architect tasks existed)

### P1 — Accessibility

| Fix | File | Source |
|-----|------|--------|
| Skip-to-content link added | `src/app/layout.tsx` | 02-code-tester, 11-supervisor |
| `id="main-content"` on all `<main>` elements | `page.tsx`, `versions/page.tsx`, `machines/page.tsx`, `appendix/page.tsx` | 02-code-tester |
| `.skip-link` + `.sr-only` CSS utilities | `globals.css` | 02-code-tester |
| `prefers-reduced-motion: reduce` media query disabling all animations | `globals.css` | 02-code-tester, 11-supervisor |
| Heading hierarchy fix: `<h2 class="sr-only">` wrapper for story-band | `page.tsx` | 02-code-tester |

### P1 — ARIA / Keyboard

| Fix | File | Source |
|-----|------|--------|
| SegmentedTabs: full WAI-ARIA Tabs keyboard navigation (Arrow, Home, End) | `atlas-interactives.tsx` | 02-code-tester |
| SegmentedTabs: roving tabindex (`tabIndex={active ? 0 : -1}`) | `atlas-interactives.tsx` | 02-code-tester |
| PillGrid keyboard navigation (added by parallel fixer agent) | `atlas-interactives.tsx` | 02-code-tester |

### P1 — Type Safety

| Fix | File | Source |
|-----|------|--------|
| Removed `\| string` from `capexBand` type, added `"low"` to `MachineCapexBand` | `atlas.ts` | 02-code-tester |
| AnimatedMetricStrip: `status: string` -> `status: TrustStatus`, `confidence: string` -> `confidence: ConfidenceLevel` | `atlas-interactives.tsx` | 02-code-tester |
| HeroDial: empty-array safety `modes[0]?.id ?? "winter"` | `atlas-interactives.tsx` | 02-code-tester |

### P1 — Runtime Safety

| Fix | File | Source |
|-----|------|--------|
| CountUp: cancelled flag prevents setState after unmount | `atlas-interactives.tsx` | 02-code-tester |

### P2 — UI Consistency & Navigation

| Fix | File | Source |
|-----|------|--------|
| Extracted `SiteTopline` component (was inline nav in page.tsx) | `atlas-ui.tsx` | 09-critic |
| `PageMasthead` uses `SiteTopline` internally | `atlas-ui.tsx` | consistency |
| Versions page: replaced inline badge `<span>` with `TrustBadge`/`ConfidenceBadge` components | `versions/page.tsx` | 05-general-tester |
| `SiteTopline` accepts `activePage` prop, renders `aria-current="page"` + `.is-current` class | `atlas-ui.tsx` | 11-supervisor |
| `PageMasthead` forwards `page` prop as `activePage` to `SiteTopline` | `atlas-ui.tsx` | 11-supervisor |
| Home page passes `activePage="Flagship"` to `SiteTopline` | `page.tsx` | 11-supervisor |
| `.is-current` CSS style (highlighted border + text color) | `globals.css` | 11-supervisor |

---

## Round 2 — From architect task list (06-architect-tasks.md)

### P0 — Critical

| Task | Fix | File |
|------|-----|------|
| P0-1 | `@media (scripting: none)` fallback — ScrollReveal visible without JS | `globals.css` |
| P0-2 | `role="tabpanel"` wrappers with proper `id` on all tab-controlled content; `aria-controls` re-added with matching panel IDs; `panelPrefix` prop on SegmentedTabs | `atlas-interactives.tsx` |
| P0-3 | `if (!items.length) return null` early return on: HeroDial, MasterplanExplorer, PersonaRoutesExplorer, MachineSwitcher, VersionMatrix, RulebookOverlay, ResilienceSimulator | `atlas-interactives.tsx` |

### P1 — High

| Task | Fix | File |
|------|-----|------|
| P1-1 | `max-width: 100vw; box-sizing: border-box` on `.section-links` — prevents 320px overflow | `globals.css` |
| P1-2 | `background-attachment: fixed` on body — eliminates empty gradient on short pages | `globals.css` |
| P1-3 | Mobile navbar `border-radius: 20px` (was 28px, disproportionate with column layout) | `globals.css` |
| P1-4 | Already done in Round 1 (current page indicator) | — |
| P1-5 | `FooterPortal` accepts `currentPath` prop, filters out self-links; updated on `/versions/`, `/machines/`, `/appendix/` | `atlas-ui.tsx`, page files |
| P1-6 | Eyebrow shimmer: replaced `left` animation with `transform: translateX()` (avoids layout thrashing) | `globals.css` |
| P1-7 | `getSourceLinks()` warns in development when sourceId not found | `atlas.ts` |

### P2 — Medium (bonus)

| Task | Fix | File |
|------|-----|------|
| P2-10 | Print: `::before` pseudo-elements hidden (`display: none !important`) | `globals.css` |

---

## Build Verification

```
npm run build — PASS (both rounds)
All 7 static pages generated:
  /, /_not-found, /appendix, /icon.svg, /machines, /versions
```

## Not Implemented (from architect list)

- P2-1 through P2-9, P2-11 through P2-15 (time constraints)
- P3-1 through P3-8 (nice-to-have, deferred)
- Content/data changes (out of scope per constraints)
