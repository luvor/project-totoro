# АРХИТЕКТОР ПО КОДУ: Спецификация фронтенда Project Totoro (Heat Ring)

## 1. Структура файлов и модулей

### 1.1. Файловое дерево проекта

```
src/
  app/
    layout.tsx               # RootLayout, шрифты (Manrope + Unbounded), metadata, lang="ru"
    globals.css              # Единый CSS: токены, компоненты, анимации, print, responsive
    page.tsx                 # Flagship longread (главная страница)
    versions/page.tsx        # Лаборатория версий (4 варианта развития)
    machines/page.tsx        # Лаборатория климатических машин (3 сценария)
    appendix/page.tsx        # Print-friendly приложение (таблицы, provenance)
  components/
    atlas-ui.tsx             # Серверные компоненты UI (PageMasthead, PageSection, MetricCard, ClaimCard, TrustBadge, VisualFrame, FooterPortal, AppendixTable и др.)
    atlas-interactives.tsx   # "use client" — все интерактивные компоненты (ScrollReveal, CountUp, HeroDial, MasterplanExplorer, PersonaRoutesExplorer, MachineSwitcher, NuclearSummerSimulator, VersionMatrix, RulebookOverlay, ResilienceSimulator, CostPanel, SummerComfortScene, FlourishingShowcase, PrintButton, AnimatedMetricStrip, SectionDivider, SegmentedTabs)
    atlas-visuals.tsx        # Barrel re-export SVG-график
    visuals/
      hero-climate.tsx       # HeroClimateGraphic — hero dial SVG
      masterplan.tsx         # MasterplanGraphic — генплан с кварталами и сезонами
      persona-route.tsx      # PersonaRouteGraphic — маршруты персон
      machine-cutaway.tsx    # MachineCutawayGraphic, TechnologyBarsGraphic, NuclearSummerGraphic
      summer-street.tsx      # SummerStreetGraphic — летняя улица
      flourishing.tsx        # FlourishingWheelGraphic — колесо процветания
      calendar.tsx           # SeasonalCalendarGraphic — годовой климатический календарь
      resilience.tsx         # ResilienceGraphic — сценарии отказа
      shared-shapes.tsx      # Переиспользуемые SVG-примитивы (IsoBuilding, PersonWalking, PersonSitting, PersonChild, TreeDeciduous, TreeConifer, IsoTree, Bench, LampPost, isoPoint)
  data/
    atlas.ts                 # Единственный источник истины: типы, экспорты, утилиты, вычисляемые коллекции
content/
  claims.json                # Тезисы проекта
  districts.json             # Flagship-район: кварталы, климатические режимы, обещания, летние стратегии, фазы, риски, стоимость
  machines.json              # 3 сценария климатических машин
  metrics.json               # Метрики с provenance
  personas.json              # Персоны (ребёнок, подросток, офисный, пожилой, low-income, wheelchair)
  rules.json                 # Кодекс города (правила с запретами и failure modes)
  sources.json               # Источники и evidence anchors
  variants.json              # 4 версии развития
scripts/
  build.mjs                  # Pre-build проверка (atlas:check)
```

### 1.2. Где хранится "истина" по данным города

АРХИТЕКТОР ПО КОДУ: Вся правда живёт в двух слоях:

**Слой 1 — JSON-файлы в `content/`:**
Каждый JSON-файл является canonical source для своей доменной области. Структура:
- `districts.json` — единственный flagship-район (`flagshipDistrict`), внутри: `quarters[]`, `climateModes[]`, `promises[]`, `failureReasons[]`, `whyReal[]`, `summerStrategies[]`, `flourishingSystems[]`, `phases[]`, `riskScenarios[]`, `costScenario`
- `machines.json` — массив `MachineSpec[]` с `technologyMix[]`, `summerStates[]`, seasonal modes
- `personas.json` — массив `PersonaSpec[]` с `seasonRoutes` (winter/summer)
- `rules.json` — массив `ClimateRule[]` с `cannotDo`, `mustDo`, `metric`, `failureMode`
- `metrics.json` — массив `MetricRecord[]` с `status`, `confidence`, `sourceIds[]`, `formula`, `owner`
- `claims.json` — массив `ClaimRecord[]` с `whyItMatters`, `limits`
- `variants.json` — массив `VariantSpec[]` (4 версии)
- `sources.json` — массив `SourceLink[]` (evidence anchors)

**Слой 2 — TypeScript модуль `src/data/atlas.ts`:**
Импортирует все JSON-файлы, определяет строгие TypeScript типы, экспортирует типизированные массивы и вычисляемые коллекции:
- `district` — единственный объект `DistrictSpec` (не массив)
- `machines`, `personas`, `rules`, `metrics`, `claims`, `variants`, `sources` — типизированные массивы
- `climateModeMap` — `Record<ClimateModeId, ClimateMode>` для быстрого lookup
- `metricsByTheme` — метрики, сгруппированные по теме
- `sourcesById` — `Record<string, SourceLink>` для разрешения source references
- Утилиты: `getSourceLinks()`, `getQuarterById()`, `getMachineById()`, `getVariantById()`, `getPersonaById()`
- Константы навигации: `mainSections`, `versionComparisonFields`, `machineModes`, `personTypes`, `trustLegend`

**Правило согласованности чисел:**
Числа (население, площадь, GFA, public realm %, CAPEX) определяются ТОЛЬКО в `districts.json`. Hero-секция, генплан, appendix и cost-panel используют один и тот же объект `district` из `atlas.ts`. Метрики в `metrics.json` ссылаются на те же числа через `formula`. Если число нужно отобразить — оно берётся из `district.*` или `metrics.find(m => m.id === "...")`. Дублирование запрещено.

### 1.3. Модули интерактивов

АРХИТЕКТОР ПО КОДУ: Все интерактивные компоненты сосредоточены в одном файле `atlas-interactives.tsx` с директивой `"use client"`. Это сделано намеренно: один client bundle boundary минимизирует число гидрированных поддеревьев.

**Генплан-эксплорер (`MasterplanExplorer`):**
- Два независимых переключателя: кварталы (pill-grid с role="tablist") и климатические режимы (SegmentedTabs)
- Состояние: `activeQuarterId` и `activeMode` (ClimateModeId)
- SVG-визуал `MasterplanGraphic` получает `activeQuarter` и `mode` — рендерит соответствующий вид

**Повседневность по персонажам (`PersonaRoutesExplorer`):**
- Переключатели: персоны (pill-grid) и сезоны (winter/summer)
- Показывает маршрут, время, cold/shade exposure, mode mix
- SVG-визуал `PersonaRouteGraphic` получает `persona` и `season`

**Тепловой собор / климатическая машина (`MachineSwitcher`):**
- Переключатели: 3 сценария машин (SegmentedTabs) и 3 сезонных режима (winterMode/shoulderMode/summerMode)
- Два SVG: `MachineCutawayGraphic` (разрез) и `TechnologyBarsGraphic` (technology mix)

**Атомный летний симулятор (`NuclearSummerSimulator`):**
- Переключатель: `summerStates[]` конкретной машины
- SVG: `NuclearSummerGraphic` с текущим `MachineSummerState`

**Другие интерактивы:**
- `HeroDial` — Hero с переключением климатических режимов
- `VersionMatrix` — 4 версии с кластерным SVG
- `RulebookOverlay` — кодекс с pill-grid выбора правил
- `ResilienceSimulator` — сценарии отказов
- `CostPanel` — CAPEX low/base/high + фазы
- `SummerComfortScene` — статичные SVG визуалы летнего города
- `FlourishingShowcase` — колесо процветания (статичный SVG)

**Обобщённый паттерн "Explorer":**
Каждый explorer построен по одной схеме:
```
explorer-layout / machine-layout (CSS grid: sidebar + visual)
  explorer-sidebar
    SegmentedTabs (категория/режим)
    pill-grid (элементы)
    explorer-card (детали текущего элемента)
  VisualFrame
    *Graphic (SVG-компонент)
```

**Вспомогательные компоненты анимации:**
- `ScrollReveal` — IntersectionObserver, добавляет класс `is-visible` при пересечении threshold
- `CountUp` — анимация чисел от 0 до target через requestAnimationFrame + ease-out cubic
- `SectionDivider` — декоративный разделитель (glow/wave/fade)
- `AnimatedMetricStrip` — MetricStrip с CountUp вместо статичных значений

**Обобщённый `SegmentedTabs<T>`:**
Генерик-компонент tabs с поддержкой `role="tablist"`, `aria-selected`, `aria-controls`, уникальными `id` через `useId()`.


## 2. Scrollytelling и анимации

### 2.1. Подход к scroll-driven reveal

АРХИТЕКТОР ПО КОДУ: Проект использует "мягкий scrollytelling" — не scroll-hijacking, а последовательный reveal секций при скролле.

**ScrollReveal:**
```typescript
// Механика:
// 1. Элемент рендерится с opacity: 0, transform: translateY(24px)
// 2. IntersectionObserver с threshold 0.12 и rootMargin "0px 0px -40px 0px"
// 3. При пересечении — добавляется класс is-visible
// 4. Observer отключается (unobserve) после первого срабатывания — анимация одноразовая
// 5. Поддержка staggered delay: scroll-reveal-delay-1/2/3 (0.08s/0.16s/0.24s)
```

**CountUp:**
```typescript
// Механика:
// 1. IntersectionObserver с threshold 0.3
// 2. При пересечении — requestAnimationFrame loop
// 3. Ease-out cubic: 1 - (1 - progress)^3
// 4. Числа форматируются через Intl.NumberFormat("ru-RU")
// 5. Анимация одноразовая (hasRun ref)
// 6. Не-числовые значения рендерятся статично
```

**CSS анимации:**
- `mesh-drift` — медленное (60s) движение фоновых radial gradients
- `divider-pulse` — пульсация glow-разделителей (4s)
- `tram-dash` — бегущие dash по трамвайной линии в SVG (8s)
- `ring-pulse` — пульсация "собора" в SVG (4s)
- `float-particles` — дрейф частиц в hero (40s/50s)
- `stroke-draw` — SVG stroke-dashoffset анимация при появлении `.is-visible`

**Transition-набор:**
Все интерактивные элементы (tabs, pills, buttons) используют единообразный transition:
```css
transition: transform 160ms ease, background 160ms ease, border-color 160ms ease, color 160ms ease;
```
Hover/focus-visible эффект: `translateY(-1px)` + изменение background/border.

### 2.2. Поддержка prefers-reduced-motion

АРХИТЕКТОР ПО КОДУ: **Текущее состояние** — в коде отсутствует явная поддержка `prefers-reduced-motion`. Это нужно добавить.

**Рекомендуемая реализация:**

В `globals.css` добавить:
```css
@media (prefers-reduced-motion: reduce) {
  .scroll-reveal {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }

  .gradient-mesh,
  .hero-particles,
  .section-divider-glow,
  .tram-loop-path,
  .cathedral-ring,
  .stroke-draw {
    animation: none !important;
  }

  .section-divider-glow {
    opacity: 0.35;
  }

  .count-up-value {
    /* CountUp всё равно покажет финальное значение, т.к. IntersectionObserver сработает */
  }
}
```

В `atlas-interactives.tsx` — проверка в `CountUp` и `ScrollReveal`:
```typescript
// Внутри useEffect:
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReduced) {
  setVisible(true); // для ScrollReveal
  setDisplay(value); // для CountUp — сразу финальное значение
  return;
}
```


## 3. Требования к доступности

### 3.1. Работа с клавиатуры

АРХИТЕКТОР ПО КОДУ: Текущая реализация обеспечивает базовую клавиатурную доступность:

**Что работает:**
- Все интерактивные элементы — нативные `<button>` с `type="button"` (фокусируемые, нажимаемые Enter/Space)
- `<details>/<summary>` для source disclosure (нативная клавиатурная поддержка)
- Навигация по `<a>` ссылкам
- `scroll-behavior: smooth` на `<html>` для anchor-навигации

**Что нужно доработать для полного соответствия:**
1. **Arrow key navigation в tablist** — сейчас SegmentedTabs и pill-grid используют `role="tablist"`, но не реализуют навигацию стрелками (Left/Right). По ARIA Authoring Practices Guide, tablist должен поддерживать:
   - Arrow Left/Right для перемещения между tabs
   - Home/End для перехода к первому/последнему tab
   - `tabIndex={0}` для активного tab, `tabIndex={-1}` для остальных (roving tabindex)
2. **Skip-to-content link** — добавить скрытую ссылку "Перейти к содержанию" в начале страницы
3. **Focus trap** — не требуется, т.к. нет модальных окон

### 3.2. ARIA-атрибуты для интерактивных карт и переключателей

АРХИТЕКТОР ПО КОДУ: Текущая реализация уже включает:

**Реализовано:**
- `role="tablist"` + `aria-label` на контейнерах переключателей (SegmentedTabs, pill-grid)
- `role="tab"` + `aria-selected` на каждой кнопке-вкладке
- `aria-controls` связывает tab с panel
- `id` генерируются через `useId()` — уникальные и стабильные при гидрации
- `aria-label="Навигация по страницам"` на `<nav>`
- `aria-hidden="true"` на декоративных элементах (page-backdrop, gradient-mesh, hero-particles, section-divider)
- SVG-графики: `role="img"` + `aria-labelledby` с `<title>` на каждой визуализации

**Что нужно доработать:**
1. **`role="tabpanel"`** — панели контента (explorer-card, visual-frame) должны иметь `role="tabpanel"` + `aria-labelledby` (ссылка на соответствующий tab id)
2. **`aria-live="polite"`** — при переключении mode/quarter/persona контентная область должна анонсировать обновление screen reader
3. **Alt-текст для SVG** — каждый `<title>` внутри SVG уже есть, но стоит добавить `<desc>` для более детального описания (особенно для MasterplanGraphic и PersonaRouteGraphic, где контент зависит от выбранного режима)

### 3.3. Fallback при выключенном JS

АРХИТЕКТОР ПО КОДУ: Проект использует Next.js SSG — все страницы генерируются как статический HTML.

**Что работает без JS:**
- Весь текстовый контент рендерится сервером (Server Components в atlas-ui.tsx): PageMasthead, PageSection, MetricCard, ClaimCard, TrustLegend, AppendixTable, FooterPortal, все story-cards, reason-cards, feature-panels
- SVG-графики рендерятся как inline SVG в начальном HTML (первое состояние отображается)
- Навигация между страницами работает (стандартные `<a>` через Next `<Link>`)
- Print-стили работают (CSS @media print)
- `<details>/<summary>` для source disclosure работает нативно

**Что не работает без JS:**
- `ScrollReveal` — элементы остаются `opacity: 0` (КРИТИЧНО)
- SegmentedTabs переключение — фиксируется на первом элементе
- CountUp — показывает начальное значение (но оно уже правильное — `value`)
- Smooth scroll — не работает, но anchor-навигация остаётся

**Рекомендуемый fallback для ScrollReveal:**
```html
<noscript>
  <style>
    .scroll-reveal {
      opacity: 1 !important;
      transform: none !important;
    }
  </style>
</noscript>
```
Это нужно добавить в `layout.tsx` внутри `<head>` или `<body>`. Альтернативно — использовать CSS-only подход: по умолчанию `opacity: 1`, а JS добавляет класс `js-enabled` на `<html>`, и стили scroll-reveal применяются только при его наличии.


## 4. Ограничения и принципы

### 4.1. Статический сайт: Next.js SSG

АРХИТЕКТОР ПО КОДУ:
- Next.js 16 с App Router, статический экспорт
- Нет серверных API-routes, нет ISR, нет SSR в runtime
- Build: `npm run atlas:check && next build` — pre-build валидация JSON-данных (scripts/build.mjs)
- Шрифты: Manrope (body) + Unbounded (display), подключены через `next/font/google` с subset `latin` + `cyrillic`
- Минимум зависимостей: только `next`, `react`, `react-dom` + dev-deps (`typescript`, `@types/*`)
- `output: "export"` подразумевается конфигурацией

### 4.2. Визуалы: SVG + CSS + лёгкий JS

АРХИТЕКТОР ПО КОДУ:
- Все визуализации — inline JSX SVG (не `<img>`, не `<canvas>`, не WebGL)
- Общие SVG-примитивы вынесены в `shared-shapes.tsx`: isometric buildings, деревья, люди, мебель
- Функция `isoPoint()` — isometric projection без 3D-библиотек
- Анимации SVG: CSS-based (stroke-dashoffset, opacity, animation keyframes)
- Максимальный viewBox: 560x420 (стандартный размер для всех графиков)
- Все SVG адаптивны через `max-width: 100%` на `svg` + `display: block`

### 4.3. Производительность

АРХИТЕКТОР ПО КОДУ:
- **Client bundle:** единственная client boundary — `atlas-interactives.tsx`. Все UI-компоненты в `atlas-ui.tsx` — серверные (без `"use client"`)
- **Данные:** JSON импортируется статически на этапе build — попадает в HTML, не требует runtime fetch
- **IntersectionObserver:** каждый экземпляр наблюдает один элемент и disconnects после срабатывания
- **requestAnimationFrame:** используется только в CountUp, завершается за 1200ms
- **CSS:** один файл globals.css (нет CSS-in-JS, нет Tailwind), минимальный runtime overhead
- **Шрифты:** `next/font/google` обеспечивает self-hosting и font-display: swap
- **Print:** отдельный @media print блок скрывает декоративные элементы, убирает box-shadow, заменяет тёмный фон на белый

### 4.4. Архитектурные принципы

АРХИТЕКТОР ПО КОДУ:
1. **Single source of truth** — все числа в JSON, все типы в `atlas.ts`, нет дублирования
2. **Server-first** — UI-компоненты серверные, `"use client"` только для интерактивов
3. **Composition over abstraction** — explorer-паттерн повторяется руками, а не через generic HOC, потому что каждый explorer имеет свою визуальную специфику
4. **Inline SVG** — никаких внешних SVG-файлов, всё рендерится как React-компоненты
5. **Minimal dependencies** — только Next.js + React, ноль UI-библиотек, ноль CSS-фреймворков
6. **Progressive enhancement** — контент читаем без JS, интерактивность — бонус
7. **Semantic HTML** — `<article>`, `<figure>/<figcaption>`, `<details>/<summary>`, `<nav>`, `<header>`, `<footer>`, `<dl>/<dt>/<dd>`, `role`/`aria-*`
8. **Design tokens** — CSS custom properties в `:root` для цветов, радиусов, теней


## 5. Согласованность чисел: hero -- схемы -- appendix

АРХИТЕКТОР ПО КОДУ: Ключевой вопрос — как одно число (например, "35 000 жителей") появляется в hero, на генплане и в appendix без расхождений.

**Механизм:**

```
districts.json
  └── district.residents = 35000
        ├── hero:    formatPeople(district.residents)
        ├── appendix: formatPeople(district.residents)
        └── masterplan: quarter.population (каждый квартал)

metrics.json
  └── metric[id="population"].value = "35 000"
  └── metric[id="population"].formula = "Σ кварталов × плотность"
        ├── hero:    AnimatedMetricStrip → CountUp(metric.value)
        └── appendix: AppendixTable → metric.value
```

Все пути ведут к одному JSON. Если `districts.json` обновляется, `metrics.json` должен обновляться синхронно — это проверяется `scripts/build.mjs` (atlas:check).

**Критические числа с единым источником:**
| Число | Источник | Используется в |
|---|---|---|
| Население | `district.residents` | hero, appendix, masterplan quarters |
| Площадь | `district.areaKm2` | hero, appendix |
| GFA | `district.grossFloorAreaM2` | appendix |
| Public realm % | `district.publicRealmSharePct` | appendix |
| Tram loop km | `district.tramLoopKm` | masterplan |
| CAPEX | `district.costScenario.*` | costs section, appendix |
| Фазы | `district.phases[]` | costs section, appendix |


## 6. CSS-архитектура и дизайн-токены

АРХИТЕКТОР ПО КОДУ: Единый файл `globals.css` (~1320 строк) содержит:

**Токены `:root`:**
- Фон: `--bg-top` (#08111a), `--bg-mid` (#0f1d2c), `--bg-bottom` (#efe9df)
- Поверхности: `--surface`, `--surface-strong`, `--surface-soft`, `--surface-light`, `--card`
- Линии: `--line`, `--line-dark`
- Текст: `--text` (#f7f3eb), `--muted` (#b3c1cd), `--ink` (#102030), `--snow` (#f6f1e8)
- Акценты: `--steel` (#86b6c8), `--moss` (#9bcf87), `--amber` (#f0c27f), `--copper` (#ef9461), `--sand` (#ece4d6)
- Радиусы: xl(34px), lg(24px), md(18px), sm(14px)
- Тень: `--shadow`
- Контейнер: `--max` (1320px)

**Breakpoints:**
- `> 1120px` — полная сетка (6-column metric strip, 2-column explorer)
- `780px — 1120px` — collapsed grids (single-column explorer, 2-column cards)
- `< 780px` — мобильная (single-column everywhere, уменьшенные отступы)

**Специальные стили:**
- Print: белый фон, скрытие навигации/декора, `page-break-inside: avoid`
- Focus-visible: `outline: 2px solid var(--amber); outline-offset: 3px` на всех интерактивных элементах


## 7. Маршрутная карта доработок

АРХИТЕКТОР ПО КОДУ: Список доработок, необходимых для продакшн-качества:

### 7.1. Доступность (приоритет: высокий)
1. Добавить `prefers-reduced-motion` media query в CSS
2. Добавить `prefers-reduced-motion` проверку в `ScrollReveal` и `CountUp`
3. Добавить `<noscript>` fallback для scroll-reveal (или js-enabled паттерн)
4. Реализовать roving tabindex в SegmentedTabs и pill-grid
5. Добавить `role="tabpanel"` + `aria-labelledby` на панели контента
6. Добавить skip-to-content link
7. Добавить `aria-live="polite"` на обновляемые области

### 7.2. Производительность (приоритет: средний)
1. Lazy-load тяжёлых SVG-визуалов ниже fold через dynamic import
2. Добавить `loading="lazy"` стратегию для ScrollReveal-секций, которые далеко от viewport

### 7.3. Тестирование (приоритет: высокий)
1. Pre-build проверка согласованности чисел между districts.json и metrics.json (расширить build.mjs)
2. Lint-check на unused sourceIds
3. Accessibility audit (axe-core)

### 7.4. Контент-расширения (приоритет: по запросу)
1. Новые JSON-сущности (если появятся от других участников команды) добавляются по тому же паттерну:
   - JSON в `content/`
   - Тип в `atlas.ts`
   - Типизированный экспорт в `atlas.ts`
   - Серверный UI-компонент в `atlas-ui.tsx` (если карточка/таблица)
   - Client-компонент в `atlas-interactives.tsx` (если нужен state/observer)
   - SVG-визуал в `visuals/` (если нужна графика)
