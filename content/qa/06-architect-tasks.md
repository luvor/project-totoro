# 06 — Приоритизированный список задач для реализатора

**Автор:** Архитектор
**Дата:** 2026-03-15
**Источники:** отчёты 01 (визуал), 02 (код), 03 (стресс), 04 (аналитик), 05 (общий), 08 (пользователь), 09 (критик)

---

## P0 — Critical (ломает функционал / accessibility blocker)

### P0-1. ScrollReveal скрывает весь контент при отключённом JS
- **Источник:** 03 (стресс), severity CRITICAL
- **Файл:** `src/app/globals.css` (в конец файла, перед `@media print`)
- **Проблема:** CSS-класс `.scroll-reveal` имеет `opacity: 0; transform: translateY(24px)`. Если JS отключён, IntersectionObserver не работает и 12 секций остаются невидимыми. Пользователь видит только hero и пустую страницу.
- **Исправление:** Добавить CSS fallback перед блоком `@media print`:
```css
@media (scripting: none) {
  .scroll-reveal {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

### P0-2. aria-controls в SegmentedTabs ссылается на несуществующий элемент
- **Источник:** 02 (код), 05 (общий), 09 (критик) — совпадает у трёх тестировщиков
- **Файл:** `src/components/atlas-interactives.tsx`
- **Проблема:** `aria-controls={panelId}` ссылается на `${tabId}-panel`, но элемент с таким `id` не существует в DOM. Нарушение ARIA.
- **Исправление:** В каждом компоненте, использующем `SegmentedTabs`, обернуть отображаемый контент в `<div role="tabpanel" id={panelId} aria-labelledby={tabId}>`. Найти все места где рендерится контент после `SegmentedTabs` (HeroDial, MasterplanExplorer, PersonaRoutesExplorer, MachineSwitcher, NuclearSummerSimulator, VersionMatrix, ResilienceSimulator, CostPanel) и добавить обёртку. Панель-id формируется как `${listId}-${activeItem.id}-panel`.

### P0-3. Crash при пустых массивах в Explorer-компонентах
- **Источник:** 02 (код), P1
- **Файл:** `src/components/atlas-interactives.tsx` — компоненты HeroDial (строка ~204), MasterplanExplorer, PersonaRoutesExplorer, MachineSwitcher и др.
- **Проблема:** `useState(items[0]?.id ?? "")` и далее `items.find(...) ?? items[0]` — при пустом массиве `items[0]` = undefined, обращение к `.title`, `.summary` вызовет TypeError.
- **Исправление:** Добавить early return в начале каждого Explorer-компонента:
```tsx
if (!items.length) return null;
```
Компоненты для проверки: HeroDial, MasterplanExplorer, PersonaRoutesExplorer, MachineSwitcher, NuclearSummerSimulator, VersionMatrix, ResilienceSimulator, CostPanel, FlourishingShowcase, SummerComfortScene, RulebookOverlay.

---

## P1 — High (видимый баг / значимая UX-проблема / performance)

### P1-1. Горизонтальный overflow на 320px (section-links)
- **Источник:** 03 (стресс), severity HIGH
- **Файл:** `src/app/globals.css`, строка ~554 (`.section-links`)
- **Проблема:** На viewport 320px `.section-links` с `flex-wrap: nowrap` расширяет body и создаёт горизонтальный скролл всей страницы.
- **Исправление:** Добавить `max-width: 100vw; box-sizing: border-box;` к `.section-links`. Или обернуть в контейнер с `overflow: hidden`.

### P1-2. Огромное пустое пространство внизу страницы /versions/
- **Источник:** 01 (визуал), P1 critical
- **Файл:** `src/app/versions/page.tsx` или `src/app/globals.css` (body background)
- **Проблема:** ~70% высоты страницы — пустой gradient. Background body растягивается на всю высоту HTML, но контент заканчивается значительно раньше.
- **Исправление:** Ограничить background-gradient контейнером контента или добавить `min-height: 100vh` только на main, а не на body. Альтернативно: `background-attachment: fixed` на body.

### P1-3. Навбар на мобильном раздувается (border-radius: 28px)
- **Источник:** 01 (визуал), P1
- **Файл:** `src/app/globals.css` — медиа-блок `@media (max-width: 780px)`, правило для `.site-topline`
- **Проблема:** При `flex-direction: column` навбар становится вертикальным блоком с `border-radius: 28px`, что визуально непропорционально.
- **Исправление:** В блоке `@media (max-width: 780px)` добавить:
```css
.site-topline {
  border-radius: 20px;
}
```

### P1-4. Нет визуального выделения текущей страницы в навигации
- **Источник:** 04 (аналитик), 08 (пользователь)
- **Файл:** `src/app/page.tsx` (site-topline) и `src/components/atlas-ui.tsx` (PageMasthead)
- **Проблема:** Активная ссылка навигации не отличается от остальных. Пользователь не понимает, на какой странице он находится.
- **Исправление:** Добавить CSS-класс `is-active` на текущую ссылку и стиль:
```css
.page-links a.is-active {
  color: var(--amber);
  opacity: 1;
}
```
В компонентах: передавать `pathname` и сравнивать с `href` для определения активной ссылки. В `page.tsx` — пометить ссылку "Flagship" как `is-active`. В `PageMasthead` — использовать prop `currentPath` для выделения.

### P1-5. Footer ссылается на текущую страницу
- **Источник:** 04 (аналитик)
- **Файл:** `src/components/atlas-ui.tsx` (FooterPortal)
- **Проблема:** На `/versions/` footer предлагает "Открыть лабораторию версий" — ссылку на ту же страницу. Аналогично для `/machines/` и `/appendix/`.
- **Исправление:** Передавать `currentPath` в `FooterPortal` и скрывать/заменять ссылку, ведущую на текущую страницу.

### P1-6. Eyebrow-shimmer анимирует свойство `left` (layout thrashing)
- **Источник:** 03 (стресс), severity MEDIUM; 09 (критик)
- **Файл:** `src/app/globals.css`, строки 1174-1187
- **Проблема:** Анимация `.eyebrow::after` использует `left`, что вызывает layout recalculation на каждом кадре. На странице ~11 eyebrow = 11 layout thrashing анимаций.
- **Исправление:** Заменить `left` на `transform: translateX()`:
```css
.eyebrow::after {
  /* убрать left: -100%; */
  left: 0;
  transform: translateX(-200%);
  animation: eyebrow-shimmer 6s ease-in-out infinite;
}

@keyframes eyebrow-shimmer {
  0%, 100% { transform: translateX(-200%); }
  50% { transform: translateX(400%); }
}
```

### P1-7. Hardcoded sourceIds на страницах (молчаливый fallback)
- **Источник:** 02 (код), P1
- **Файл:** `src/data/atlas.ts`, строка ~308 (getSourceLinks)
- **Проблема:** `filter(Boolean)` молча удаляет несуществующие sourceIds. При опечатке в ID источник просто пропадёт без предупреждения.
- **Исправление:** Добавить console.warn в development-режиме:
```typescript
export function getSourceLinks(sourceIds: string[]) {
  return sourceIds.map((sourceId) => {
    const source = sourcesById[sourceId];
    if (!source && process.env.NODE_ENV === 'development') {
      console.warn(`[atlas] Source ID "${sourceId}" not found`);
    }
    return source;
  }).filter(Boolean);
}
```

---

## P2 — Medium (улучшение качества / консистентность / minor UX)

### P2-1. Текст muted (#b3c1cd) визуально бледноватый
- **Источник:** 01 (визуал)
- **Файл:** `src/app/globals.css`, CSS custom property `--muted`
- **Проблема:** `--muted: #b3c1cd` — на длинных текстах визуально блёкло.
- **Исправление:** Изменить `--muted: #b3c1cd` на `--muted: #c4d0dc`.

### P2-2. Обрезка текста в SVG "Day Without Core" (Failure)
- **Источник:** 01 (визуал)
- **Файл:** `src/components/visuals/` — файл с ResilienceGraphic
- **Проблема:** Текст в карточках SVG обрезается — слова разбиты на неестественные строки.
- **Исправление:** Увеличить ширину text-области в SVG или пересмотреть разбиение текста на `<tspan>` строки.

### P2-3. Обрезка названий версий в Version Matrix SVG
- **Источник:** 01 (визуал)
- **Файл:** `src/components/atlas-visuals.tsx` — VariantClusterGraphic
- **Проблема:** Названия "Flagship Balan", "Budget Civic D" обрезаются в SVG.
- **Исправление:** Уменьшить font-size или использовать сокращения для названий версий внутри SVG.

### P2-4. story-band: 5 колонок слишком узких на 1440px
- **Источник:** 01 (визуал)
- **Файл:** `src/app/globals.css` — правило `.story-band`
- **Проблема:** Grid 5 колонок сжимает карточки-обещания.
- **Исправление:** Рассмотреть `repeat(3, 1fr)` вместо `repeat(5, 1fr)`, или `auto-fill, minmax(220px, 1fr)`.

### P2-5. Дублирование навигации между page.tsx и PageMasthead
- **Источник:** 02 (код), 09 (критик)
- **Файл:** `src/app/page.tsx:43-52`, `src/components/atlas-ui.tsx:29-48`
- **Проблема:** Навигационная шапка дублируется в двух местах. Изменение навигации требует правки в двух файлах.
- **Исправление:** Извлечь общий компонент `SiteNav` и использовать его в обоих местах.

### P2-6. page-backdrop + gradient-mesh дублируется на 4 страницах
- **Источник:** 02 (код), 09 (критик)
- **Файл:** `src/app/page.tsx:38-39`, `src/app/versions/page.tsx:18-19`, `src/app/machines/page.tsx:13-14`, `src/app/appendix/page.tsx:22-23`
- **Проблема:** Одинаковый код `<div className="page-backdrop">` + `<div className="gradient-mesh">` на каждой странице.
- **Исправление:** Перенести в `layout.tsx` (RootLayout) — вставить перед `{children}`.

### P2-7. AnimatedMetricStrip дублирует логику MetricCard
- **Источник:** 02 (код)
- **Файл:** `src/components/atlas-interactives.tsx:770-805`
- **Проблема:** Повторяет разметку MetricCard с добавлением CountUp.
- **Исправление:** Добавить опциональный prop `animated?: boolean` в `MetricCard` вместо дублирования.

### P2-8. capexBand допускает произвольные строки
- **Источник:** 02 (код)
- **Файл:** `src/data/atlas.ts:181`
- **Проблема:** `capexBand: MachineCapexBand | string` — `| string` обесценивает union-тип.
- **Исправление:** Убрать `| string`.

### P2-9. Множественные IntersectionObserver в ScrollReveal
- **Источник:** 02 (код)
- **Файл:** `src/components/atlas-interactives.tsx:49-63`
- **Проблема:** Каждый `ScrollReveal` и `CountUp` создаёт свой IntersectionObserver. ~15+ экземпляров на странице.
- **Исправление:** Создать shared IntersectionObserver через утилиту или context. Все элементы наблюдаются одним observer с callback, который проверяет `entry.target`.

### P2-10. Print: pseudo-element ::before с тёмным gradient не скрывается
- **Источник:** 03 (стресс)
- **Файл:** `src/app/globals.css`, блок `@media print`
- **Проблема:** `::before` pseudo-element на `.atlas-section` (с полупрозрачным gradient) не отключён в print-стилях.
- **Исправление:** Добавить в `@media print`:
```css
.atlas-section::before {
  display: none !important;
}
```

### P2-11. Print: source-disclosure — summary скрыт, но тело не раскрыто
- **Источник:** 03 (стресс)
- **Файл:** `src/app/globals.css`, блок `@media print`
- **Проблема:** `summary { display: none }` скрывает кнопку раскрытия, но `details` не раскрыты. Источники не видны при печати.
- **Исправление:** В `@media print` добавить:
```css
.source-disclosure {
  display: block;
}
.source-disclosure[open] summary,
.source-disclosure summary {
  display: none !important;
}
.source-disclosure .source-list {
  display: block !important;
}
```
Или добавить `details[open]` attribute через CSS: `details { open: true; }` — не поддерживается CSS, поэтому лучше скрыть весь `<details>` целиком в print, или оставить summary видимым.

### P2-12. Нет Open Graph / Twitter Card мета-тегов
- **Источник:** 05 (общий)
- **Файл:** `src/app/layout.tsx`, объект `metadata`
- **Проблема:** Отсутствуют OG-теги для social sharing.
- **Исправление:** Добавить в `metadata`:
```typescript
openGraph: {
  title: "Project Totoro",
  description: "Многостраничный атлас климатического города...",
  type: "website",
},
```

### P2-13. Pill-grid без keyboard navigation
- **Источник:** 02, 05, 09
- **Файл:** `src/components/atlas-interactives.tsx` — MasterplanExplorer (pill-grid для кварталов), PersonaRoutesExplorer (pill-grid для персон), RulebookOverlay (pill-grid для правил)
- **Проблема:** `pill-grid` использует `role="tablist"` и `role="tab"`, но без обработки Arrow keys.
- **Исправление:** Добавить `onKeyDown` обработчик аналогичный `SegmentedTabs` — стрелки, Home, End. Вынести keyboard-логику в общий хук `useTabKeyboard`.

### P2-14. Fallback-функции возвращают первый элемент вместо ошибки
- **Источник:** 02 (код)
- **Файл:** `src/data/atlas.ts:311-325`
- **Проблема:** `getQuarterById`, `getMachineById` и т.д. при невалидном ID возвращают `items[0]` — маскирует баги.
- **Исправление:** Добавить `console.warn` при fallback в development-режиме.

### P2-15. Ссылки source-disclosure без указания "opens in new tab"
- **Источник:** 02 (код)
- **Файл:** `src/components/atlas-ui.tsx:184`
- **Проблема:** Ссылки с `target="_blank"` не сообщают screen-reader что откроется новая вкладка.
- **Исправление:** Добавить `aria-label` или визуально скрытый текст "(opens in new tab)" к ссылкам.

---

## P3 — Nice to have (полировка, enhancement)

### P3-1. Неиспользуемые CSS-классы
- **Источник:** 09 (критик)
- **Файл:** `src/app/globals.css`
- **Проблема:** `.pull-quote`, `.pull-quote-muted`, `.section-immersive`, `.metric-hero-bar`, `.full-bleed`, `.stroke-draw` определены, но не используются.
- **Исправление:** Удалить мёртвые классы.

### P3-2. mask-image в section-links обрезает последний пункт
- **Источник:** 01 (визуал), 04 (аналитик), 09 (критик)
- **Файл:** `src/app/globals.css:571-572`
- **Проблема:** `mask-image: linear-gradient(to right, black 90%, transparent 100%)` визуально обрезает последний пункт навигации.
- **Исправление:** Изменить на `black 95%, transparent 100%` или убрать mask-image.

### P3-3. Story-band h3 без родительского h2 — heading hierarchy скачет
- **Источник:** 05 (общий)
- **Файл:** `src/app/page.tsx:63-71`
- **Проблема:** Секция "Обещание" использует `h3` без обёрточного `h2`.
- **Исправление:** Добавить визуально скрытый `h2` перед story-band, или обернуть story-band в `PageSection`.

### P3-4. gradient-mesh: добавить will-change для GPU-оптимизации
- **Источник:** 01 (визуал), 09 (критик)
- **Файл:** `src/app/globals.css:960`
- **Проблема:** `.gradient-mesh` с бесконечной анимацией без `will-change`.
- **Исправление:** Добавить `will-change: background-position;` к `.gradient-mesh`.

### P3-5. SVG-компоненты без React.memo
- **Источник:** 02 (код)
- **Файл:** `src/components/visuals/*.tsx`
- **Проблема:** SVG-компоненты перерисовываются при каждом ререндере родителя.
- **Исправление:** Обернуть в `React.memo` компоненты без пропсов: `CompactVillageGraphic`, `SeasonalCalendarGraphic`, `FlourishingWheelGraphic`.

### P3-6. metric-strip 6 колонок — карточки слишком узкие на wide desktop
- **Источник:** 01 (визуал)
- **Файл:** `src/app/globals.css` — `.metric-strip`
- **Проблема:** 6 колонок на wide desktop сжимают метрики.
- **Исправление:** Ограничить до 4 колонок через `max-width` или `auto-fill, minmax(200px, 1fr)`.

### P3-7. Inline-бейджи на versions/page.tsx вместо TrustBadge/ConfidenceBadge
- **Источник:** 02 (код)
- **Файл:** `src/app/versions/page.tsx:52-53`
- **Проблема:** Inline `<span>` вместо готовых компонентов.
- **Исправление:** Использовать `TrustBadge` и `ConfidenceBadge`.

### P3-8. Нет metadataBase для canonical URL
- **Источник:** 05 (общий)
- **Файл:** `src/app/layout.tsx`
- **Проблема:** `metadataBase` не задан — canonical URL может не генерироваться.
- **Исправление:** Добавить `metadataBase: new URL("https://project-totoro.example.com")` (или актуальный домен).

---

## Задачи, ОТКЛОНЁННЫЕ как "не для текущего спринта"

Следующие предложения из отчётов тестировщиков признаны валидными, но требуют существенного объёма работ или смены архитектурного подхода. Они НЕ включены в список задач для реализатора:

1. **Lazy loading компонентов через next/dynamic** — P2 из отчёта 02. Требует рефакторинга импортов на всех страницах. Для SSG не критично.
2. **Разбиение atlas-interactives.tsx на модули** — P2 из отчёта 02. Рефакторинг, не баг.
3. **Sticky SectionLinks / scroll spy** — из отчёта 04. Feature, не баг.
4. **Progress indicator** — из отчётов 04, 09. Feature.
5. **Промежуточные CTA между секциями** — из отчёта 04. Контентное решение.
6. **Фотореалистичные рендеры вместо SVG** — из отчёта 09. Требует внешних ресурсов.
7. **Глоссарий для английских терминов** — из отчётов 08, 09. Контентное решение.
8. **CMS / i18n** — из отчёта 09. Архитектурная задача.
9. **Deep linking для интерактивов (URL params)** — из отчёта 09. Feature.
10. **Тесты (unit, e2e)** — из отчётов 02, 09. Отдельная инициатива.
11. **Shared IntersectionObserver context** — P2 из отчёта 02. Оптимизация, не баг.
12. **Добавить визуальный контент / рендеры / видео** — из отчёта 08. Требует дизайнера.

---

## Резюме

| Приоритет | Кол-во задач | Описание |
|-----------|-------------|----------|
| **P0** | 3 | Контент невидим без JS, broken ARIA, crash на пустых данных |
| **P1** | 7 | Overflow на мобильном, пустое пространство, nav UX, performance |
| **P2** | 15 | Типизация, дублирование, print, a11y, OG-теги |
| **P3** | 8 | Мёртвый CSS, memo, heading hierarchy, polish |
| **Итого** | **33** | |

Реализатору рекомендуется начать с P0, затем P1. P2 и P3 — по остаточному времени.
