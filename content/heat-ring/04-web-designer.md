# ВЕБ-ДИЗАЙНЕР: UX/UI лонгрида «Тепловое кольцо»

## 1. Структура страниц и навигация

### ВЕБ-ДИЗАЙНЕР: Карта сайта (3 страницы)

| Страница | Роль | URL |
|---|---|---|
| **Flagship** (основной лонгрид) | Storytelling + генплан + доверие | `/` |
| **Explorer** (интерактивный атлас) | Генплан, версии, машины, персоны | `/explorer/` |
| **Appendix** (печатный справочник) | Методика, provenance, таблицы | `/appendix/` |

### ВЕБ-ДИЗАЙНЕР: Структура основного лонгрида (Flagship)

Лонгрид строится как **scrollytelling-нарратив** с чёткой драматургической аркой: проблема → решение → доказательства → повседневность → стоимость.

#### Порядок блоков:

```
01  HERO — полноэкранная сцена
02  PROMISE STRIP — горизонтальная полоса обещаний (5 карточек)
03  ───── SectionDivider (glow) ─────
04  ПРОБЛЕМА — "Почему холодные города ломаются"
05  ───── SectionDivider (wave) ─────
06  ДОВЕРИЕ — "Почему это не фантазия" + TrustLegend + ClaimCards
07  ───── SectionDivider (glow) ─────
08  ГЕНПЛАН — MasterplanExplorer (кварталы + сезоны)
09  ───── SectionDivider (fade) ─────
10  ПОВСЕДНЕВНОСТЬ — PersonaRoutesExplorer (8-and-80 test)
11  ───── SectionDivider (wave) ─────
12  КЛИМАТИЧЕСКАЯ МАШИНА — MachineSwitcher (3 сценария)
13  ───── SectionDivider (glow) ─────
14  ЛЕТО — SummerComfortScene + стратегии
15  ───── SectionDivider (fade) ─────
16  FLOURISHING — Human Flourishing OS + метрики
17  ───── SectionDivider (glow) ─────
18  КОДЕКС — RulebookOverlay
19  ───── SectionDivider (wave) ─────
20  РИСКИ — ResilienceSimulator
21  ───── SectionDivider (fade) ─────
22  СТОИМОСТЬ — CostPanel + фазирование
23  FOOTER — ссылки на Explorer и Appendix
```

#### Точки collapse/expand:

- **SourceDisclosure** (details/summary) — на каждом claim и разделе с метриками. Свёрнуто по умолчанию. Раскрывается на месте без перехода.
- **ClaimCard** — detail-grid (2 колонки: "почему важно" + "граница") видна сразу, но disclosure с источниками свёрнут.
- **Explorer-карточки** (кварталы, персоны, машины) — боковая панель с dl/dd всегда видна при выборе таба. Не сворачивается.
- **CostPanel** — Low/Base/High переключаются табами, не collapse.

Принцип: **expand используется только для provenance-деталей, основной narrative всегда открыт**.

---

## 2. Визуальный стиль

### ВЕБ-ДИЗАЙНЕР: Палитра «тёплая арктическая утопия»

Палитра переносится из существующего Project Totoro с минимальными адаптациями для тематики теплового кольца:

| Токен | Hex | Роль |
|---|---|---|
| `--bg-top` | `#08111a` | Глубокий ночной фон (верх страницы — "полярная ночь") |
| `--bg-mid` | `#0f1d2c` | Средний фон (основной скролл) |
| `--bg-bottom` | `#efe9df` | Тёплый дневной фон (нижние секции — "город согрет") |
| `--surface` | `rgba(11,21,33,0.78)` | Карточки и панели |
| `--snow` | `#f6f1e8` | Чистый снежный акцент |
| `--steel` | `#86b6c8` | Металл, инженерия, benchmark |
| `--amber` | `#f0c27f` | Тепло, энергия, CTA-кнопки |
| `--copper` | `#ef9461` | Акцент, gradient с amber |
| `--moss` | `#9bcf87` | Зелень, flourishing, high-confidence |
| `--sand` | `#ece4d6` | Фон appendix, печатный слой |
| `--ink` | `#102030` | Основной текст на светлом фоне |

**Градиентный переход по скроллу**: страница начинается с тёмного `--bg-top` (холодный город, проблема) и постепенно переходит к тёплому `--bg-bottom` (город согрет, решение работает). Это не декорация — это narrative через цвет.

**Gradient-mesh**: фоновые radial-gradient пятна (amber, steel, moss, copper) медленно дрейфуют (`mesh-drift` animation, 60s). Дают ощущение живого тепла на тёмном фоне.

### ВЕБ-ДИЗАЙНЕР: Типографика

| Роль | Шрифт | Характер |
|---|---|---|
| **Display** (h1, h2, h3, pull-quote) | **Unbounded** (400, 500, 700) | Геометрический гротеск с мягкими углами. Выглядит технологичным, но не агрессивным. Letter-spacing: -0.04em. Line-height: 1.04 |
| **Body** (p, li, dd, UI) | **Manrope** (latin + cyrillic) | Современный гуманистический sans. Line-height: 1.65. Отличная читаемость на тёмном фоне |

**Размеры:**
- h1: `clamp(3rem, 7vw, 5.8rem)` — hero headline
- h2: `clamp(2rem, 4vw, 3.6rem)` — section title
- h3: `1.2rem` — карточки
- Body: `1.04rem` (section intro), `0.94-0.95rem` (карточки, таблицы)
- Кикеры/eyebrow: `0.78-0.82rem`, uppercase, letter-spacing 0.08em

**Pull-quote**: `clamp(2rem, 4vw, 3.4rem)`, Unbounded, используется между секциями для ключевых мыслей нарратива.

### ВЕБ-ДИЗАЙНЕР: Ритм и чередование контента

Страница построена на **ритмическом чередовании** четырёх типов блоков:

1. **Текстовый блок** (PageSection) — eyebrow + h2 + paragraph + вложенный контент. Всегда начинается с section-intro. Фоновый counter (огромный полупрозрачный номер секции, 12rem, opacity 0.03) привязывает к нарративной структуре.

2. **Карточная сетка** (card-grid) — 1/2/3 колонки reason-card, claim-card, feature-panel. Каждая карточка: padding 18px, border 1px solid rgba-line, border-radius 24px, background rgba 0.05. Минимальный hover: нет сложных transform, только фокус-стиль с amber outline.

3. **Explorer-сцена** (explorer-layout / machine-layout) — двухколоночный grid: sidebar (290px min) + visual-frame. Sidebar содержит SegmentedTabs + pill-grid + explorer-card. Visual-frame содержит SVG-графику. Это самый "интерактивный" паттерн на странице.

4. **SectionDivider** (glow/wave/fade) — тонкая линия (1-2px) с gradient и opacity-анимацией. Три варианта чередуются для визуального разнообразия. Glow = amber, пульсирует. Wave = steel. Fade = moss.

**Правило чередования**: не ставить два explorer-layout подряд без текстовой передышки. Между крупными интерактивами всегда SectionDivider + минимум один PageSection текстового типа.

---

## 3. Встраивание интерактивов

### ВЕБ-ДИЗАЙНЕР: Scrollytelling-сцены

Scrollytelling реализуется через **ScrollReveal** — IntersectionObserver-компонент:
- Каждый блок страницы обёрнут в `<ScrollReveal>`
- Initial state: `opacity: 0; transform: translateY(24px)`
- Visible state: `opacity: 1; transform: translateY(0)`
- Transition: `0.6s cubic-bezier(0.16, 1, 0.3, 1)` — упругий ease-out
- Threshold: 0.12 (блок появляется, когда 12% видно)
- Root margin: `-40px` (чуть задерживает появление для драматического эффекта)
- **Однократно**: после is-visible observer отключается (unobserve). Блоки не исчезают при скролле назад.
- Каскадные delay: `delay-1` (80ms), `delay-2` (160ms), `delay-3` (240ms) — для карточек внутри grid.

**CountUp** — анимация числовых метрик при появлении в viewport:
- Ease-out cubic от 0 до target за 1200ms
- Tabular-nums для стабильной ширины цифр
- Однократно: hasRun ref предотвращает повтор

**AnimatedMetricStrip** — hero-блок с 6 ключевыми метриками. Каждая метрика: CountUp + TrustBadge + ConfidenceBadge. Появляется с ScrollReveal.

### ВЕБ-ДИЗАЙНЕР: Chapter-навигация

Два уровня навигации:

**1. Site-topline (глобальная)**
- Sticky pill-bar в верхней части hero
- Содержит: brand-mark + page-links (Flagship, Versions, Machines, Appendix)
- Border-radius: 999px (pill shape)
- Background: `rgba(8,17,26,0.72)` + `backdrop-filter: blur(18px)`
- На mobile: стекается в column-layout

**2. SectionLinks (внутристраничная)**
- Sticky bar под hero (`top: 16px; z-index: 10`)
- Pill-shaped контейнер с horizontal scroll
- Содержит якоря на все секции: Hero, Проблема, Доверие, Генплан, Повседневность, Машина, Лето, Flourishing, Кодекс, Риски, Стоимость
- `scrollbar-width: none` — скроллбар скрыт
- На mobile: `position: static`, горизонтальный scroll, полная ширина

### ВЕБ-ДИЗАЙНЕР: Точки входа

Два основных CTA в hero-блоке:
- **"Смотреть генплан"** — button-primary (gradient amber→copper, ink text, font-weight 700). Якорь на `#masterplan`
- **"Читать историю"** — button-secondary (rgba background, line border). Якорь на `#story`

В footer-портале три CTA ведут на другие страницы:
- "Открыть лабораторию версий" → `/versions/` (primary)
- "Сравнить климатические машины" → `/machines/` (secondary)
- "Проверить appendix и provenance" → `/appendix/` (secondary)

---

## 4. Компонентная система

### ВЕБ-ДИЗАЙНЕР: Список UI-компонентов

| Компонент | Роль | Где используется |
|---|---|---|
| `PageMasthead` | Hero внутренних страниц (brand + nav + h1 + description) | Versions, Machines, Appendix |
| `PageSection` | Секция лонгрида (eyebrow + h2 + paragraph + children) | Все секции |
| `Eyebrow` | Pill-тег над заголовком (uppercase, amber) | Везде |
| `VisualFrame` | Рамка для SVG-графики (title + caption + canvas) | Explorer-сцены |
| `TrustBadge` | Цветной pill: benchmark/estimate/assumption/concept | Метрики, claims |
| `ConfidenceBadge` | Цветной pill: high/medium/low | Метрики, claims, системы |
| `MetricCard` | Карточка метрики (label + value + target + formula) | MetricStrip |
| `ClaimCard` | Карточка тезиса (title + text + detail-grid + sources) | Секция доверия |
| `SectionLinks` | Sticky chapter-навигация | Flagship |
| `SourceDisclosure` | Collapsible details с источниками | Claims, секции |
| `AppendixTable` | Print-friendly таблица | Appendix |
| `FooterPortal` | Footer с CTA-ссылками на другие страницы | Flagship |
| `SectionDivider` | Декоративная линия (glow/wave/fade) | Между секциями |
| `ScrollReveal` | IntersectionObserver fade-in wrapper | Все блоки |
| `CountUp` | Анимация числового значения | MetricStrip |
| `SegmentedTabs` | Tab-bar для переключения режимов | Explorer-сцены |
| `HeroDial` | Hero с climate-mode switching | Flagship hero |
| `MasterplanExplorer` | Двухколоночный explorer: кварталы + карта | Flagship, Explorer |
| `PersonaRoutesExplorer` | Explorer: персоны + маршруты | Flagship, Explorer |
| `MachineSwitcher` | Explorer: 3 машины + сезоны | Flagship, Machines |
| `RulebookOverlay` | Explorer: правила + spatial overlay | Flagship |
| `ResilienceSimulator` | Explorer: сценарии отказа | Flagship |
| `CostPanel` | Explorer: CAPEX bands + фазы | Flagship |

### ВЕБ-ДИЗАЙНЕР: Паттерн explorer-layout

Ключевой интерактивный паттерн сайта — **explorer-layout**:

```
┌─────────────────────────────────────────────────┐
│  [SegmentedTabs] [Tab1] [Tab2] [Tab3]          │
│                                                 │
│  ┌──────────────┐  ┌──────────────────────────┐│
│  │ pill-grid    │  │                          ││
│  │ [Q1] [Q2]   │  │    VisualFrame           ││
│  │ [Q3] [Q4]   │  │    (SVG graphic)         ││
│  │              │  │                          ││
│  ├──────────────┤  │                          ││
│  │ explorer-card│  │                          ││
│  │ title + meta │  │                          ││
│  │ detail-list  │  │                          ││
│  │ dt/dd pairs  │  │                          ││
│  └──────────────┘  └──────────────────────────┘│
└─────────────────────────────────────────────────┘
```

- Grid: `minmax(290px, 0.84fr) minmax(0, 1.16fr)`
- На tablet (<=1120px): одна колонка, sidebar сверху
- На mobile (<=780px): одна колонка, pill-grid в одну колонку

---

## 5. Desktop и mobile

### ВЕБ-ДИЗАЙНЕР: Breakpoints

| Breakpoint | Что меняется |
|---|---|
| **>1120px** (desktop) | Все grid-ы в полном виде: hero-dial 2 cols, explorer 2 cols, metric-strip 6 cols, story-band 5 cols, trust-legend 4 cols, card-grid.three 3 cols |
| **781-1120px** (tablet) | hero-dial → 1 col, explorer → 1 col, story-band → 2 cols, trust-legend → 2 cols, card-grid.three → 2 cols |
| **<=780px** (mobile) | Всё в 1 col. Topline → column. SectionLinks → static + horizontal scroll. Metric-strip → 2 cols. Hero-particles скрыты. Padding уменьшен (28→20px). Border-radius уменьшен (34→26px) |

### ВЕБ-ДИЗАЙНЕР: Адаптация hero

**Desktop:**
- `hero-dial-grid`: 2 колонки (copy + visual-frame)
- h1: до 5.8rem
- hero-lead: 1.15rem
- AnimatedMetricStrip: 6 колонок
- Hero-particles: CSS box-shadow точки, анимация float 40-50s

**Mobile:**
- Grid → 1 колонка, copy сверху, visual-frame снизу
- h1: `clamp(2.5rem, 12vw, 4.2rem)`, max-width: 100%
- MetricStrip: 2 колонки
- hero-particles: `display: none` (экономия GPU)
- hero-topline: column layout, badges под overline

### ВЕБ-ДИЗАЙНЕР: Адаптация explorer-сцен и карт

**Desktop:**
- Sidebar (290px min) + visual-frame рядом
- pill-grid: 2 колонки
- explorer-card: полная высота

**Mobile:**
- Одна колонка: tabs → pill-grid → explorer-card → visual-frame (вертикальный стек)
- pill-grid: 1 колонка
- visual-frame: полная ширина, border-radius уменьшен
- SegmentedTabs: горизонтальный scroll при необходимости

### ВЕБ-ДИЗАЙНЕР: Навигация на мобильных

- **Site-topline**: `flex-direction: column; align-items: stretch`. Brand-mark на первой строке, page-links на второй (flex-wrap, justify-start)
- **SectionLinks**: `position: static` (не sticky — на маленьком экране sticky-бар отнимает слишком много места). `width: 100%; overflow-x: auto; flex-wrap: nowrap`. Горизонтальный свайп по якорям секций
- **Кнопки навигации**: `white-space: nowrap` предотвращает перенос текста внутри pill-кнопок

### ВЕБ-ДИЗАЙНЕР: Удобочитаемость длинного текста

- **Max-width для текста**: `max-width: 72ch` на section-intro p и page-title-block p. Не даёт строкам растянуться на весь экран
- **Line-height**: 1.65 для body-текста. Щедрый интерлиньяж для комфортного чтения на тёмном фоне
- **Цвет текста**: основной `--text (#f7f3eb)` — тёплый white, не чистый #fff. Muted `--muted (#b3c1cd)` — для вторичного текста (descriptions, captions)
- **Контраст**: все пары цвет/фон проходят WCAG AA на тёмном фоне
- **Scroll-behavior: smooth** — плавная прокрутка по якорям
- **Print styles**: белый фон, чёрный текст, скрытые интерактивы, page-break-inside: avoid на секциях

---

## 6. Appendix (печатный справочник)

### ВЕБ-ДИЗАЙНЕР: Структура appendix

Appendix — отдельная страница с усиленным контрастом фона (`rgba(10,18,28,0.92)`) и табличным представлением данных:

```
01  PageMasthead — "Provenance, методика и проверяемые цифры"
02  PrintButton — кнопка "Печать / PDF"
03  ───── SectionDivider ─────
04  Flagship Model — базовые параметры района (4 comparison-cards)
05  ───── SectionDivider ─────
06  Trust Legend — объяснение статусов (benchmark/estimate/assumption/concept)
07  ───── SectionDivider ─────
08  Metrics — AppendixTable (ID, метка, значение, status, confidence, formula, owner)
09  ───── SectionDivider ─────
10  Claims — AppendixTable (ID, тезис, status, confidence, почему важно, граница)
11  ───── SectionDivider ─────
12  Versions — AppendixTable (сравнение всех версий)
13  ───── SectionDivider ─────
14  Machines — AppendixTable (сравнение всех машин)
15  ───── SectionDivider ─────
16  Rulebook — AppendixTable (все правила)
17  ───── SectionDivider ─────
18  Phasing — AppendixTable (фазы строительства)
19  ───── SectionDivider ─────
20  Sources — card-grid + SourceDisclosure с evidence anchors
```

**AppendixTable**: горизонтально скроллируемая таблица (`overflow-x: auto`). Фон rgba 0.04. Заголовки uppercase, 0.82rem. Ячейки: muted color, 0.95rem. Подходит для печати.

---

## 7. Визуальные эффекты и микроанимации

### ВЕБ-ДИЗАЙНЕР: Список эффектов

| Эффект | Где | Как |
|---|---|---|
| **ScrollReveal fade-in** | Все блоки | opacity 0→1, translateY 24→0, 0.6s ease-out |
| **CountUp** | MetricStrip | Числа анимируются от 0 до target, 1.2s ease-out cubic |
| **Gradient-mesh drift** | Фон страницы | 4 radial-gradient пятна, 60s infinite alternate |
| **Hero-particles** | Hero-блок | CSS box-shadow точки, float 40-50s linear |
| **SectionDivider pulse** | Glow-разделители | opacity 0.2→0.45, 4s infinite |
| **Tram-loop dash** | SVG генплана | stroke-dasharray animation, 8s linear |
| **Cathedral-ring pulse** | SVG генплана | stroke-opacity 0.4→0.8, 4s |
| **Stroke-draw** | SVG при появлении | dashoffset 1000→0, 1.5s ease-out |
| **Button hover** | CTA, tabs, pills | translateY(-1px), background/border transition, 160ms |
| **Visual-frame glow** | VisualFrame при hover/visible | Pseudo-element radial-gradient, opacity 0→1, 0.5s |

**Принцип**: все анимации subtle, ничего не мигает агрессивно. GPU-нагрузка минимальна (opacity, transform). Hero-particles отключены на mobile.

---

## 8. Общие UX-принципы

### ВЕБ-ДИЗАЙНЕР: Design tokens и spacing

- **Border-radius**: xl=34px (секции), lg=24px (карточки), md=18px (inner), sm=14px, pill=999px (кнопки, tabs)
- **Shadow**: `0 34px 80px rgba(4,9,15,0.28)` — глубокая тень для секций
- **Max-width**: `1320px` — контейнер страницы
- **Gap**: 16px (card-grid), 12px (metric-strip, buttons), 10px (tabs, pills)
- **Padding**: 28px (секции desktop), 20px (секции mobile)
- **Margin-bottom**: 28px между секциями

### ВЕБ-ДИЗАЙНЕР: Accessibility

- **Focus-visible**: `outline: 2px solid var(--amber); outline-offset: 3px` на всех интерактивных элементах
- **ARIA roles**: tablist/tab/tabpanel на SegmentedTabs и pill-grid
- **aria-label**: на nav, aside, tablist
- **aria-hidden="true"**: на декоративных элементах (backdrop, gradient-mesh, particles)
- **Semantic HTML**: header, main, footer, section, article, figure/figcaption, details/summary, dl/dt/dd
- **Print stylesheet**: полный override для чёрно-белой печати, скрытие интерактивов
- **scroll-reveal**: не использует `display: none`, только opacity/transform — контент доступен screen readers сразу

### ВЕБ-ДИЗАЙНЕР: Performance

- **No JS for layout** — все grid-ы и адаптации через CSS
- **IntersectionObserver** — один observer на блок, disconnect после видимости
- **Шрифты**: Google Fonts через `next/font` (preload, font-display: swap, subset latin+cyrillic)
- **SVG inline** — вся графика в компонентах, без внешних запросов
- **backdrop-filter: blur** только на topline и section-links (2 элемента)
