# 05 — Комплексное тестирование (General Tester)

Дата: 2026-03-15

---

## 1. Accessibility (Доступность)

### 1.1 Семантика HTML и heading hierarchy

**Главная страница (`page.tsx`):**
- `<header>` используется для hero-секции — корректно.
- `<main>` обёрнут вокруг всей страницы — корректно.
- `<footer>` используется в `FooterPortal` — корректно.
- `<nav>` используется с `aria-label="Навигация по страницам"` — корректно.
- `<aside>` используется для `SectionLinks` с `aria-label` — корректно.

**Heading hierarchy:**
- `h1` — в hero через `HeroDial`, отображает `district.name` ("Тепловое Кольцо") — ровно 1 на странице. OK.
- `h2` — каждая `PageSection` генерирует `h2` для заголовка секции. OK.
- `h3` — карточки promises, failure reasons, summer strategies, flourishing systems и т.д. OK.
- ПРОБЛЕМА: Секция "Обещание" (story-band) использует `h3` напрямую внутри `article`, но эти `article` не вложены в `section` с `h2`. Формально heading hierarchy нарушена: `h3` появляется без родительского `h2` между hero и секцией "failure". **Severity: Low** — визуально контент выглядит как промежуточный блок, но для screen readers иерархия скачет с h1 на h3.
- На страницах Versions, Machines, Appendix: `h1` генерируется через `PageMasthead`. Далее `h2` через `PageSection`, `h3` в карточках. OK.

**Landmarks:**
- `<main>` — есть. OK.
- `<header>` — есть. OK.
- `<footer>` — есть. OK.
- `<nav>` — есть. OK.
- `<aside>` — SectionLinks. OK.
- ОТСУТСТВУЕТ: `<section>` landmarks для каждого блока `atlas-section` — секции используют `<section>` через `PageSection`. OK.

### 1.2 ARIA-атрибуты на интерактивных элементах

| Элемент | aria-label / роль | Статус |
|---|---|---|
| `SegmentedTabs` | `role="tablist"`, `aria-label` передаётся, `role="tab"`, `aria-selected`, `aria-controls` | OK |
| `quarter-pill` buttons (MasterplanExplorer) | `role="tab"`, `aria-selected` | OK |
| `persona-pill` buttons (PersonaRoutesExplorer) | `role="tab"`, `aria-selected` | OK |
| `rulebook-pill` buttons (RulebookOverlay) | `role="tab"`, `aria-selected` | OK |
| `nav.page-links` | `aria-label="Навигация по страницам"` | OK |
| `SectionLinks` (aside) | `aria-label="Внутри страницы"` | OK |
| `SectionDivider` | `aria-hidden="true"` | OK |
| `page-backdrop`, `gradient-mesh`, `hero-particles` | `aria-hidden="true"` | OK |
| `source-disclosure` (details/summary) | Нативный `<details>` — доступен по умолчанию | OK |
| `PrintButton` | `type="button"` | OK |
| Все SVG визуалы | `role="img"` + `aria-labelledby` + `<title>` | OK |
| ПРОБЛЕМА: `aria-controls` в `SegmentedTabs` ссылается на `panelId` формата `${tabId}-panel`, но соответствующий элемент с `id={panelId}` НЕ существует в DOM. `aria-controls` ссылается на несуществующий ID. | **Severity: Medium** |
| ПРОБЛЕМА: Кнопки `button-primary` и `button-secondary` внутри `FooterPortal` — это `<Link>`, поэтому не нуждаются в дополнительных ARIA. Но `<a href="#masterplan">` и `<a href="#story">` в hero — это `<a>`, а не `<button>`, что корректно. | OK |

### 1.3 Keyboard navigation

- **Tab order**: Все интерактивные элементы (`<a>`, `<button>`, `<details>`) фокусируемы нативно. OK.
- **focus-visible стили**: Определены в CSS для `.button-primary:focus-visible`, `.button-secondary:focus-visible`, `.page-links a:focus-visible`, `.section-links a:focus-visible`, `.segmented-tabs button:focus-visible`, `.quarter-pill:focus-visible`, `.source-disclosure summary:focus-visible` — все с `outline: 2px solid var(--amber); outline-offset: 3px`. OK.
- ПРОБЛЕМА: **Arrow keys для tablist**: `SegmentedTabs` использует `role="tablist"` с `role="tab"`, но **не реализует ARIA Tabs Pattern** — нет обработки Arrow Left/Right для переключения между табами. По ARIA спецификации, если используется `role="tablist"`, ожидается навигация стрелками внутри списка, а Tab переключает фокус к следующему элементу за пределами tablist. Сейчас каждый tab фокусируется через Tab. **Severity: Medium** — функционально работает, но нарушает ARIA ожидания для screen reader пользователей.
- ПРОБЛЕМА: `quarter-pill` кнопки также используют `role="tablist"/"tab"`, но без Arrow key навигации. Та же проблема. **Severity: Medium**

### 1.4 Skip-to-content

- ОТСУТСТВУЕТ: Нет ссылки skip-to-content в начале `<body>`. **Severity: Low** — для keyboard users это стандартная рекомендация WCAG 2.4.1 (Level A). Пользователям придётся табать через весь navigation bar.

### 1.5 Контрасты текста (WCAG AA)

| Элемент | Цвет текста | Фон | Ratio (approx) | Статус |
|---|---|---|---|---|
| Основной текст `--text: #f7f3eb` | `#f7f3eb` | `#08111a` (dark bg) | ~15.5:1 | OK (AA = 4.5:1) |
| `--muted: #b3c1cd` | `#b3c1cd` | `#08111a` | ~9.2:1 | OK |
| Eyebrow `--amber: #f0c27f` | `#f0c27f` | `rgba(255,255,255,0.08)` on dark | ~8.5:1 | OK |
| `.section-links a` font-size 0.88rem | `--muted` | `rgba(8,17,26,0.82)` | ~8.5:1 | OK |
| Trust badge `.trust-benchmark` text `#cae6f2` on bg `rgba(134,182,200,0.18)` | `#cae6f2` | overlaid on dark | ~10:1 | OK |
| Print/Appendix: text `#000` on `#fff` | Standard | | >21:1 | OK |
| ПОТЕНЦИАЛЬНАЯ ПРОБЛЕМА: `rgba(255,255,255,0.58)` (claim-detail-grid span) на тёмном фоне. Approximately `#949494` on `#0f1d2c` = ~5.2:1. | Для font-size 0.84rem (small text) нужен AA ratio 4.5:1. | 5.2:1 | **Barely OK** |
| ПОТЕНЦИАЛЬНАЯ ПРОБЛЕМА: `rgba(255,255,255,0.64)` (comparison-card span) = ~#a3a3a3 on dark = ~6.3:1 | Для small text 0.84rem | 6.3:1 | OK |

**Общий вердикт по контрастам**: В целом проходит WCAG AA. Ближе к границе — мелкий текст с opacity 0.58.

---

## 2. SEO

### 2.1 Meta tags

| Страница | `<title>` | `<meta description>` | Статус |
|---|---|---|---|
| Home (`layout.tsx`) | "Project Totoro" | "Многостраничный атлас климатического города..." | OK |
| Appendix | "Project Totoro -- Appendix" | "Печатное приложение с provenance..." | OK |
| Machines | "Project Totoro -- Machines" | "Три сценария центральной климатической машины..." | OK |
| Versions | "Project Totoro -- Versions" | "Сравнение четырёх версий климатического города..." | OK |

- ОТСУТСТВУЕТ: canonical URL не установлен явно. Next.js может генерировать его автоматически через `metadata.metadataBase`, но в `layout.tsx` `metadataBase` не задан. **Severity: Low**
- ОТСУТСТВУЕТ: Open Graph / Twitter Card мета-теги. **Severity: Low** — для SEO и social sharing рекомендовано.

### 2.2 Heading hierarchy для SEO

- Каждая страница имеет ровно один `h1`. OK.
- `h2` следуют за `h1` без пропусков. OK.
- `h3` следуют за `h2`. OK (за исключением story-band на главной, см. выше).

### 2.3 Alt на изображениях/SVG

- Проект не использует `<img>` тегов — все визуалы реализованы как inline SVG.
- Каждый SVG имеет `role="img"` и `aria-labelledby` с `<title>`. OK.
- Список SVG-визуалов с `<title>`:
  - `HeroClimateGraphic`: "Изометрический вид климатического города..." OK
  - `MasterplanGraphic`: "Генплан Теплового Кольца..." OK
  - `PersonaRouteGraphic`: "Маршрут повседневности: {persona.name}" OK (динамический)
  - `MachineCutawayGraphic`: "Архитектурный разрез климатической машины: {label}" OK
  - `TechnologyBarsGraphic`: "Сравнение технологических долей..." OK
  - `NuclearSummerGraphic`: "Летний режим атомного сценария" OK
  - `SummerStreetGraphic`: "Архитектурный разрез летней улицы..." OK
  - `SeasonalCalendarGraphic`: "Годовой климатический календарь..." OK
  - `FlourishingWheelGraphic`: "Human Flourishing OS: шесть систем..." OK
  - `ResilienceGraphic`: "Сценарий отказа и fallback-логика района: {title}" OK
  - `RuleOverlayGraphic`: "Наложение кодекса города..." OK
  - `VariantClusterGraphic`: "Сравнение четырёх версий развития..." OK
  - `CompactVillageGraphic`: "Компактный климатический посёлок..." OK

### 2.4 `lang` атрибут

- `<html lang="ru">` — установлен корректно. OK.

---

## 3. Data Consistency (Консистентность данных)

### 3.1 Числа hero vs appendix

| Параметр | Hero (metrics.json) | Appendix (districts.json) | Совпадает? |
|---|---|---|---|
| Население | `60 000` (metric `population`, value "60 000") | `district.residents = 60000` | OK |
| Площадь | `5.4 km^2` (metric `district-area`, value "5.4") | `district.areaKm2 = 5.4` | OK |
| GFA | Нет в hero-метриках | `district.grossFloorAreaM2 = 3700000` | N/A — показывается только в appendix |
| Public realm | Нет в hero-метриках | `district.publicRealmSharePct = 34` | N/A |

### 3.2 CAPEX в метриках vs cost panel

| Источник | Значение |
|---|---|
| Metric `base-capex` | value: "1.97", unit: "трлн Tenge" |
| `district.costScenario.base` | "1.97 трлн Tenge" |
| `district.phases` sum: 580 + 660 + 730 = **1970 млрд Tenge = 1.97 трлн Tenge** | **OK — совпадает** |

### 3.3 Phases residents sum

| Фаза | Жители |
|---|---|
| Волна 01 | ~18-20 тыс. |
| Волна 02 | ~20 тыс. |
| Волна 03 | ~20-22 тыс. |
| **Итого** | **~58-62 тыс.** |
| **District.residents** | **60 000** |
| **Статус** | OK — range включает 60 тыс. |

### 3.4 Quarters population sum

| Квартал | Население |
|---|---|
| Северный | ~9 500 |
| Восточный пассаж | ~10 000 |
| Юго-восточный форум | ~10 500 |
| Южный сад | ~9 000 |
| Западный микс | ~10 500 |
| Северо-западный край | ~10 500 |
| **Итого** | **~60 000** |
| **District.residents** | **60 000** |
| **Статус** | OK — точное совпадение |

### 3.5 sourceIds ссылаются на существующие sources

Все sources из `sources.json` (16 записей):
`edmonton-strategy`, `edmonton-guidelines`, `financial-report`, `bns-build`, `world-bank-dh`, `harvard-energy`, `who-green`, `who-urban-planning`, `who-age-friendly`, `cdc-activity`, `nih-vitamin-d`, `iaea-cogeneration`, `iaea-non-electric`, `world-nuclear-heat`, `doe-district-cooling`, `doe-thermal-storage`, `doe-zero-energy-districts`

**Проверка всех sourceIds в данных:**

| Файл | sourceIds используемые | Все существуют? |
|---|---|---|
| metrics.json | financial-report, bns-build, who-urban-planning, cdc-activity, edmonton-guidelines, who-green, who-age-friendly, nih-vitamin-d, world-bank-dh | OK |
| claims.json | edmonton-strategy, who-urban-planning, edmonton-guidelines, doe-district-cooling, nih-vitamin-d, who-green, cdc-activity, who-age-friendly | OK |
| machines.json | world-bank-dh, harvard-energy, doe-district-cooling, doe-thermal-storage, iaea-cogeneration, iaea-non-electric, world-nuclear-heat, doe-zero-energy-districts | OK |
| variants.json | financial-report, bns-build, edmonton-guidelines, world-bank-dh, doe-district-cooling, doe-thermal-storage, harvard-energy, who-green, who-age-friendly | OK |
| Hardcoded in pages (SourceDisclosure): edmonton-guidelines, edmonton-strategy, who-urban-planning, who-green, who-age-friendly, cdc-activity, nih-vitamin-d, world-bank-dh, iaea-cogeneration, iaea-non-electric, world-nuclear-heat, doe-district-cooling | OK |

**Все sourceIds ссылаются на существующие записи.** Ни одного "сиротского" ID.

---

## 4. Links (Ссылки)

### 4.1 Внутренние ссылки

| Ссылка | Целевая страница | Существует? |
|---|---|---|
| `/` (Flagship) | `src/app/page.tsx` | OK |
| `/versions/` | `src/app/versions/page.tsx` | OK |
| `/machines/` | `src/app/machines/page.tsx` | OK |
| `/appendix/` | `src/app/appendix/page.tsx` | OK |
| `#hero` | id="hero" на главной | OK |
| `#story` | id="story" на главной | OK |
| `#failure` | id="failure" на главной | OK |
| `#real` | id="real" на главной | OK |
| `#masterplan` | id="masterplan" на главной | OK |
| `#personas` | id="personas" на главной | OK |
| `#machine` | id="machine" на главной | OK |
| `#summer` | id="summer" на главной | OK |
| `#flourishing` | id="flourishing" на главной | OK |
| `#rulebook` | id="rulebook" на главной | OK |
| `#risks` | id="risks" на главной | OK |
| `#costs` | id="costs" на главной | OK |

**Все внутренние ссылки валидны.**

### 4.2 Внешние ссылки (формат URL)

Все URL в `sources.json` используют HTTPS. Формат:
- `edmonton.ca` — 2 ссылки: `.ca/city_government/...` и `.ca/sites/default/files/...` (PDF) — OK формат
- `nationalbank.kz` — OK
- `stat.gov.kz` — OK
- `documents1.worldbank.org` — OK
- `clinics.law.harvard.edu` — OK
- `who.int` — 3 ссылки — OK
- `cdc.gov` — OK
- `ods.od.nih.gov` — OK
- `iaea.org` — 2 ссылки — OK
- `world-nuclear.org` — OK (ЗАМЕЧАНИЕ: использует `http:` implicit? Нет, все начинаются с `https://`). OK.
- `energy.gov` — 3 ссылки — OK

**Все внешние ссылки:**
- Имеют `target="_blank"` и `rel="noreferrer"` (через `SourceDisclosure` и Appendix page). OK.
- Используют HTTPS. OK.
- Формат URL корректен (нет пробелов, спецсимволов, битых путей на уровне формата).

ЗАМЕЧАНИЕ: Реальная доступность URL не проверена (server-side check), но формат валиден.

---

## 5. Responsive (Адаптивность)

### 5.1 Breakpoint 1120px

CSS правила при `max-width: 1120px`:

| Элемент | Поведение | Потенциальная проблема |
|---|---|---|
| `.hero-dial-grid` | 2 колонки -> 1 колонка | OK — визуал под копией |
| `.explorer-layout`, `.machine-layout`, `.two-column-band` | 2 колонки -> 1 колонка | OK |
| `.story-band` | 5 колонок -> 2 колонки | OK |
| `.trust-legend` | 4 колонки -> 2 колонки | OK |
| `.card-grid.three`, `.bullet-band`, `.comparison-grid`, `.phase-grid` | 3 колонки -> 2 колонки | OK |
| `.metric-strip` при `min-width: 1121px` -> 6 колонок, иначе 3 колонки | 1120px и ниже = 3 колонки | OK |

**Возможные overflow проблемы:**
- ПРОБЛЕМА: `.story-band` переходит с 5 на 2 колонки при 1120px. Если promises ровно 5 (что так), при 2 колонках получается 3 ряда (2+2+1). Пятая карточка будет одиноко стоять. **Severity: Low** — визуально не критично, но немного неэстетично.

### 5.2 Breakpoint 780px

CSS правила при `max-width: 780px`:

| Элемент | Поведение | Потенциальная проблема |
|---|---|---|
| `.atlas-page` width | `min(calc(100% - 20px), var(--max))` — уменьшен отступ | OK |
| `.site-topline` | `flex-direction: column` — навбар вертикальный | OK |
| `h1` | `max-width: 100%`, `overflow-wrap: break-word`, `hyphens: auto` | OK — длинные слова переносятся |
| `h2` | `max-width: 100%` | OK |
| `.metric-strip` | 2 колонки (с 3) | OK |
| `.card-grid.two`, `.card-grid.three` и т.д. | Все -> 1 колонка | OK |
| `.story-band` | 2 колонки (с 5 -> 2 при 1120px -> остаётся 2) | OK |
| `.trust-legend` | 2 колонки | OK |
| `.pill-grid` | 1 колонка (с 2) | OK |
| `.hero-particles`, `.masthead-particles` | `display: none` | OK — меньше нагрузки на мобильных |
| `.section-links` | `position: static` (перестаёт быть sticky), `overflow-x: auto` | OK — горизонтальный скролл |
| `.table-shell::after` | Показывает "scroll ->" подсказку | OK |

**Потенциальные проблемы overflow:**
- ПРОБЛЕМА: `.section-links` использует `flex-wrap: nowrap` и `overflow-x: auto` на мобильных. При этом применена `mask-image` (даже на мобильных), которая может скрывать последние элементы навигации за градиентом. **Severity: Low** — это design choice, но может быть неочевидно для пользователей.
- SVG-визуалы используют `viewBox` и `max-width: 100%` через глобальное правило `svg { max-width: 100% }` — корректно масштабируются. OK.
- Таблицы (AppendixTable) обёрнуты в `.table-shell` с `overflow-x: auto`. На мобильных появляется подсказка "scroll ->". OK.

### 5.3 Печать (`@media print`)

- Фоны и декор скрываются. OK.
- Навигация, footer, appendix-actions, section-links скрываются. OK.
- `scroll-reveal` получает `opacity: 1; transform: none` — контент виден. OK.
- `page-break-inside: avoid` на секциях. OK.

---

## 6. Сводная таблица проблем

| # | Проблема | Категория | Severity | Где |
|---|---|---|---|---|
| 1 | Story-band `h3` без родительского `h2` — heading hierarchy скачет с h1 на h3 | Accessibility | Low | `page.tsx:63-71` |
| 2 | `aria-controls` в SegmentedTabs ссылается на несуществующий panel ID | Accessibility | Medium | `atlas-interactives.tsx:173` |
| 3 | Tablist без Arrow key навигации (нарушение ARIA Tabs Pattern) | Accessibility | Medium | `atlas-interactives.tsx:156-193` |
| 4 | Нет skip-to-content ссылки (WCAG 2.4.1 Level A) | Accessibility | Low | `layout.tsx` |
| 5 | `metadataBase` не задан — canonical URL может не генерироваться | SEO | Low | `layout.tsx` |
| 6 | Нет Open Graph / Twitter Card мета-тегов | SEO | Low | `layout.tsx` |
| 7 | Story-band 5 элементов при breakpoint 1120px -> 2 колонки, 5-й одинок | Responsive | Low | `globals.css:1261-1263` |
| 8 | section-links mask-image на мобильных может скрывать крайние пункты | Responsive | Low | `globals.css:534-535` |

---

## 7. Положительные выводы

1. **Data consistency отличная** — все числа (население 60 000, площадь 5.4 km^2, CAPEX 1.97 трлн, фазы, кварталы) полностью консистентны между hero, appendix, districts.json и metrics.json.
2. **sourceIds 100% валидны** — ни одного сиротского ID, все ссылаются на существующие записи в sources.json.
3. **SVG accessibility хорошая** — все 13 визуальных компонентов имеют `role="img"`, `aria-labelledby` и осмысленные `<title>`.
4. **Focus-visible стили** определены для всех интерактивных элементов.
5. **Responsive breakpoints** продуманы и покрывают два основных порога (1120px, 780px).
6. **Print стили** полноценные — для appendix это критично.
7. **lang="ru"** — корректно установлен.
8. **Внутренние ссылки** — все 16 якорных ссылок (#hero, #failure и т.д.) ведут на существующие ID, все 4 страничные ссылки ведут на существующие маршруты.
9. **Внешние ссылки** — все 16 источников используют HTTPS, корректный формат URL, target="_blank" + rel="noreferrer".
10. **ARIA tablist** реализована на всех переключателях (SegmentedTabs, quarter-pills, persona-pills, rulebook-pills) с `aria-selected` и `aria-label`.
