# QA-02: Аудит качества кода и архитектуры

**Тестировщик**: Тестировщик-программист
**Дата**: 2026-03-15
**Проект**: Project Totoro (Next.js 16, TypeScript, SSG)

---

## 1. TypeScript: строгость типов

### P2 — `capexBand` допускает произвольные строки
- **Файл**: `src/data/atlas.ts:181`
- **Проблема**: Тип `capexBand: MachineCapexBand | string` фактически обесценивает union-тип `MachineCapexBand`, потому что `string` поглощает все literal-типы. Любое значение пройдёт проверку.
- **Исправление**: Убрать `| string` и расширить `MachineCapexBand` новыми значениями, если они нужны, или использовать branded type.

### P3 — JSON-импорты приводятся через `as` без runtime-валидации
- **Файл**: `src/data/atlas.ts:220-227`
- **Проблема**: Все JSON-файлы импортируются и приводятся через `as SourceLink[]`, `as MetricRecord[]` и т.д. Если JSON-файл будет содержать невалидные данные, TypeScript не поможет — ошибка обнаружится только в runtime. Скрипт `scripts/build.mjs` частично компенсирует это, но не проверяет все поля и типы (`TrustStatus`, `ConfidenceLevel`).
- **Исправление**: Допустимый trade-off для SSG-проекта, если `atlas:check` запускается до каждого билда (и он запускается — `package.json:8`). Для полноты стоит добавить в `build.mjs` валидацию enum-полей (status, confidence).

### P3 — `AnimatedMetricStrip` использует `string` вместо `TrustStatus`/`ConfidenceLevel`
- **Файл**: `src/components/atlas-interactives.tsx:779-780`
- **Проблема**: Свойства `status` и `confidence` типизированы как `string`, хотя данные приходят из `MetricRecord`. Это теряет type-safety и позволяет передать невалидные значения.
- **Исправление**: Использовать `TrustStatus` и `ConfidenceLevel` вместо `string`. Либо принимать `MetricRecord[]` напрямую, как `MetricStrip`.

### P3 — `TrustLegend` принимает `{ label: string }` вместо `{ label: TrustStatus }`
- **Файл**: `src/components/atlas-ui.tsx:197`
- **Проблема**: Props расширены до `string`, хотя `trustLegend` из `atlas.ts:229` явно типизирован с `TrustStatus`.
- **Исправление**: Использовать `TrustStatus` для `label`.

---

## 2. Компоненты: переиспользуемость и дублирование

### P2 — Дублирование навигации между `page.tsx` и `PageMasthead`
- **Файл**: `src/app/page.tsx:43-52` и `src/components/atlas-ui.tsx:29-48`
- **Проблема**: Навигационная шапка (brand-mark + page-links) дублируется: на главной странице она прописана inline, на остальных — через `PageMasthead`. Любое изменение навигации (новая ссылка, ребрендинг) требует правки в двух местах.
- **Исправление**: Извлечь `SiteTopline` в отдельный компонент и использовать его и в `page.tsx`, и в `PageMasthead`.

### P2 — `AnimatedMetricStrip` дублирует логику `MetricStrip` + `MetricCard`
- **Файл**: `src/components/atlas-interactives.tsx:770-805`
- **Проблема**: Компонент повторяет разметку `MetricCard` (из `atlas-ui.tsx:110-128`) с добавлением `CountUp`. Вместо дублирования можно было бы добавить prop `animated` к `MetricCard` или сделать composition через slot/render-prop.
- **Исправление**: Добавить необязательный prop к `MetricCard` для рендера анимированного значения, или сделать `MetricCard` принимающим `children` вместо `<strong>`.

### P3 — Повторяющийся паттерн `page-backdrop` + `gradient-mesh`
- **Файл**: `src/app/page.tsx:38-39`, `src/app/versions/page.tsx:18-19`, `src/app/machines/page.tsx:13-14`, `src/app/appendix/page.tsx:22-23`
- **Проблема**: Все 4 страницы начинаются с одинакового `<div className="page-backdrop" aria-hidden="true" />` + `<div className="gradient-mesh" aria-hidden="true" />`.
- **Исправление**: Перенести эти декоративные элементы в `RootLayout` или создать общий layout-wrapper.

### P3 — Inline-бейджи на странице `versions/page.tsx` вместо `TrustBadge`/`ConfidenceBadge`
- **Файл**: `src/app/versions/page.tsx:52-53`
- **Проблема**: Используются inline `<span className={...}>` вместо готовых компонентов `TrustBadge` и `ConfidenceBadge`, которые уже импортированы в другие файлы.
- **Исправление**: Использовать готовые компоненты для единообразия.

---

## 3. Data flow: один источник истины

### P1 — Hardcoded sourceIds на страницах
- **Файл**: `src/app/page.tsx:92`, `src/app/versions/page.tsx:115`, `src/app/machines/page.tsx:56`
- **Проблема**: Массивы sourceIds вроде `["edmonton-guidelines", "edmonton-strategy", "who-urban-planning"]` захардкожены в JSX. Если ID в `sources.json` изменится, ничто не поймает ошибку (функция `getSourceLinks` молча отфильтрует через `filter(Boolean)`).
- **Исправление**: Вынести связки "секция -> sourceIds" в `atlas.ts` или добавить проверку в `build.mjs` для hardcoded sourceIds. Как минимум, `getSourceLinks` должна логировать warning при несуществующем ID.

### P2 — `getSourceLinks` скрывает ошибки
- **Файл**: `src/data/atlas.ts:308`
- **Проблема**: `filter(Boolean)` тихо удаляет несуществующие source ID. В development-режиме лучше бросать предупреждение.
- **Исправление**: Добавить `console.warn` для отсутствующих sourceIds в development-билде, или проверку в `build.mjs`.

### P3 — Hardcoded metric IDs на главной
- **Файл**: `src/app/page.tsx:28-33`
- **Проблема**: `["population", "district-area", "service-radius", ...]` — жёстко прописаны. При изменении ID в `metrics.json` пустой массив пройдёт незамеченным.
- **Исправление**: Вынести группы метрик в `atlas.ts` или добавить assertion в `build.mjs`.

### OK — Единый источник данных
- Все данные идут через `atlas.ts` -> JSON-файлы. Нет конфликтующих дублирований. `district` объект используется консистентно. Это хорошо.

---

## 4. Баги и edge cases

### P1 — Crash при пустом массиве `variants`/`machines`/`personas`
- **Файл**: множество компонентов в `atlas-interactives.tsx`
- **Проблема**: Все Explorer-компоненты делают `useState(items[0]?.id ?? "")` и затем `items.find(...) ?? items[0]`. Если массив пуст, `items[0]` будет `undefined`. Далее обращение к `quarter.title`, `persona.seasonRoutes[...]`, `machine.summary` вызовет TypeError.
- **Детали**: `HeroDial` (строка 204): `modes[0].id` без optional chaining — если `modes` пуст, crash.
- **Исправление**: Добавить early return с `null` при пустом массиве (как уже сделано в `NuclearSummerSimulator:455`). Или гарантировать непустоту массивов в `build.mjs` (частично сделано для `quarters`, `promises` и т.д., но не для `machines`, `variants`, `personas`).

### P2 — `NuclearSummerGraphic` stacked bars с неправильным rx
- **Файл**: `src/components/visuals/machine-cutaway.tsx:182`
- **Проблема**: `rx={index === 0 ? "21" : index === state.mix.length - 1 ? "21" : "0"}` — промежуточные сегменты имеют `rx="0"`, но если они узкие, углы соседних rounded-сегментов будут перекрываться с прямоугольными. Визуально некрасиво.
- **Исправление**: Использовать `clipPath` для общего контейнера вместо индивидуального rx.

### P2 — `VariantClusterGraphic` crash при >4 вариантах
- **Файл**: `src/components/atlas-visuals.tsx:88-89`
- **Проблема**: Массив `positions` содержит ровно 4 элемента. Если вариантов больше — `positions[index]` вернёт `undefined`, и `return null` спасёт от crash, но variant не отрисуется. Если меньше — пустые позиции останутся.
- **Исправление**: Генерировать позиции динамически или добавить assertion в `build.mjs` что вариантов ровно 4.

### P3 — Fallback-функции возвращают первый элемент вместо ошибки
- **Файл**: `src/data/atlas.ts:311-325`
- **Проблема**: `getQuarterById`, `getMachineById`, `getVariantById`, `getPersonaById` при невалидном ID возвращают `items[0]` (fallback). Это маскирует баги: пользователь видит данные не того элемента, вместо того чтобы видеть ошибку.
- **Исправление**: Логировать warning и/или возвращать `undefined` с обработкой на стороне вызывающего кода.

---

## 5. Performance

### P2 — Все client-компоненты загружаются сразу (нет lazy loading)
- **Файл**: `src/app/page.tsx`
- **Проблема**: `page.tsx` импортирует 12 клиентских компонентов из `atlas-interactives.tsx` (HeroDial, MasterplanExplorer, PersonaRoutesExplorer, MachineSwitcher, NuclearSummerSimulator, ResilienceSimulator, CostPanel, SummerComfortScene, FlourishingShowcase, RulebookOverlay, ScrollReveal, SectionDivider, AnimatedMetricStrip). Все они загружаются в один бандл.
- **Исправление**: Использовать `next/dynamic` для компонентов ниже fold (MachineSwitcher, CostPanel, ResilienceSimulator, RulebookOverlay). Учитывая SSG, это не так критично для первого рендера, но уменьшит initial JS bundle.

### P2 — Множественные IntersectionObserver в ScrollReveal
- **Файл**: `src/components/atlas-interactives.tsx:49-63`
- **Проблема**: Каждый `ScrollReveal` создаёт собственный `IntersectionObserver`. На главной странице ~15+ экземпляров. Каждый `CountUp` тоже создаёт свой observer.
- **Исправление**: Создать один shared IntersectionObserver через context или утилиту. Это снизит нагрузку на layout engine.

### P3 — SVG-визуалы крупные, но не мемоизированы
- **Файл**: `src/components/visuals/*.tsx`
- **Проблема**: SVG-компоненты (`HeroClimateGraphic`, `MasterplanGraphic` и др.) перерисовываются при каждом ререндере родителя, даже если props не изменились.
- **Исправление**: Обернуть в `React.memo`, особенно `CompactVillageGraphic`, `SeasonalCalendarGraphic`, `FlourishingWheelGraphic` — они вообще не принимают props.

### P3 — `gradient-mesh` анимация на fixed-элементе
- **Файл**: `src/app/globals.css:946-968`
- **Проблема**: `.gradient-mesh` с `position: fixed` и бесконечной CSS-анимацией `mesh-drift` (60s) работает постоянно, даже когда страница не видна. Несколько radial-gradient'ов + анимация на полноэкранном элементе создают постоянную нагрузку на GPU.
- **Исправление**: Добавить `will-change: background-position` или использовать `prefers-reduced-motion` для отключения анимации. На мобильных можно скрывать полностью (как сделано с particles).

### OK — SSG (output: "export")
- Все страницы статически генерируются. Данные вбандлены в HTML. Нет лишних API-запросов. Это правильное решение для проекта.

---

## 6. Accessibility

### P1 — Нет keyboard navigation для табов
- **Файл**: `src/components/atlas-interactives.tsx:156-193`
- **Проблема**: `SegmentedTabs` использует `role="tablist"` и `role="tab"`, но не реализует обязательную клавиатурную навигацию: Arrow Left/Right для переключения, Home/End для первого/последнего. По WAI-ARIA спецификации tablist требует keyboard management.
- **Исправление**: Добавить `onKeyDown` handler с поддержкой стрелок, Home, End. Также нет `role="tabpanel"` и `aria-labelledby` на панелях контента.

### P1 — Tab panels не связаны с табами через aria-controls
- **Файл**: `src/components/atlas-interactives.tsx:173`
- **Проблема**: `aria-controls={panelId}` ссылается на `panelId`, но ни один элемент в DOM не имеет `id={panelId}`. Это нарушение ARIA: aria-controls должен ссылаться на существующий элемент.
- **Исправление**: Обернуть контент переключателя в div с `role="tabpanel"`, `id={panelId}`, `aria-labelledby={tabId}`.

### P2 — `pill-grid` использует `role="tablist"` без полной реализации
- **Файл**: `src/components/atlas-interactives.tsx:268, 336, 568`
- **Проблема**: Три `pill-grid` блока используют `role="tablist"` и `role="tab"`, но без keyboard navigation. Те же проблемы что и с SegmentedTabs.
- **Исправление**: Аналогично SegmentedTabs — добавить keyboard support.

### P2 — Ссылки без видимого текста в `source-disclosure`
- **Файл**: `src/components/atlas-ui.tsx:184`
- **Проблема**: Ссылки содержат `<span>{source.title}</span>`, но не имеют `aria-label` при том, что `target="_blank"`. Пользователь screen-reader не узнает, что ссылка откроется в новой вкладке.
- **Исправление**: Добавить визуально скрытый текст "(opens in new tab)" или `aria-label`.

### P2 — `details/summary` нативная стрелка скрыта, замена CSS-only
- **Файл**: `src/app/globals.css:716-718` и `src/app/globals.css:1243-1250`
- **Проблема**: `summary::-webkit-details-marker { display: none }` скрывает нативный маркер, а замена через `::after` с unicode-символами. Это работает, но aria-expanded не обновляется автоматически (нативный details/summary обрабатывает это).
- **Исправление**: Нативный `details` автоматически управляет expanded state — это ОК. Но лучше добавить `aria-expanded` явно для screen-reader'ов, которые не поддерживают `details`.

### P3 — SVG-иконки в `FlourishingWheelGraphic` без alt-текста
- **Файл**: `src/components/visuals/flourishing.tsx:106-108`
- **Проблема**: Иконки в SVG path не имеют `<title>` или `aria-label`. Общий `<title>` SVG есть, но конкретные иконки нечитаемы для screen-reader.
- **Исправление**: Добавить `<title>` к каждой группе `<g>` или `aria-hidden="true"` если иконки декоративные (текст рядом дублирует информацию).

### OK — Хорошие практики
- `html lang="ru"` установлен корректно.
- Декоративные элементы помечены `aria-hidden="true"`.
- focus-visible стили определены для кнопок и ссылок (`globals.css:868-877`).
- SVG-визуалы имеют `role="img"` и `aria-labelledby` с `<title>`.
- Семантическая разметка: `article`, `figure`, `figcaption`, `details`, `dl/dt/dd`, `nav`.

---

## 7. Архитектурные smells

### P2 — `atlas-interactives.tsx` — god component file (805 строк)
- **Файл**: `src/components/atlas-interactives.tsx`
- **Проблема**: Файл содержит 16 экспортируемых компонентов (ScrollReveal, CountUp, SectionDivider, SegmentedTabs, HeroDial, MasterplanExplorer, PersonaRoutesExplorer, MachineSwitcher, NuclearSummerSimulator, VersionMatrix, RulebookOverlay, ResilienceSimulator, CostPanel, SummerComfortScene, FlourishingShowcase, PrintButton, AnimatedMetricStrip). Это затрудняет навигацию и увеличивает cognitive load.
- **Исправление**: Разбить на модули: `interactive-primitives.tsx` (ScrollReveal, CountUp, SectionDivider, SegmentedTabs, PrintButton), `explorers.tsx` (все Explorer-компоненты), `showcases.tsx` (SummerComfortScene, FlourishingShowcase).

### P3 — CSS в одном файле (1463 строки)
- **Файл**: `src/app/globals.css`
- **Проблема**: Все стили в одном файле. При таком размере сложно находить и поддерживать правила. Нет CSS-модулей или scoped стилей.
- **Исправление**: Это допустимо для SSG-проекта с ограниченным масштабом. Но при росте проекта стоит рассмотреть CSS-модули или Tailwind.

### P3 — `page.tsx` на главной — 255 строк верстки без разбиения
- **Файл**: `src/app/page.tsx`
- **Проблема**: Вся главная страница в одном компоненте. Секции ("story", "failure", "real" и т.д.) можно вынести в sub-компоненты для лучшей читаемости.
- **Исправление**: Извлечь каждую секцию в отдельный серверный компонент.

### OK — Нет circular dependencies
- Зависимости идут однонаправленно: `page.tsx -> atlas-interactives.tsx -> atlas-visuals.tsx -> visuals/*.tsx -> shared-shapes.tsx`. `atlas-ui.tsx` используется и страницами, и интерактивными компонентами, но не зависит от них. Цепочка `atlas.ts` -> JSON — тоже чистая.

### OK — Разделение server/client
- `"use client"` используется только в `atlas-interactives.tsx`. Серверные компоненты (`atlas-ui.tsx`, страницы, визуалы) не помечены. Это правильный подход для Next.js App Router.

---

## 8. Прочее

### P3 — Нет тестов
- **Проблема**: В проекте нет ни одного теста (unit, integration, e2e). Нет конфигурации Jest/Vitest/Playwright.
- **Исправление**: Для SSG-проекта минимальная инвестиция — snapshot-тесты компонентов и integration-тест скрипта `build.mjs`. E2E через Playwright для critical user paths.

### P3 — Нет ESLint/Prettier конфигурации
- **Проблема**: В `package.json` нет `eslint`, `prettier` или аналогов. Качество кода зависит от дисциплины разработчика.
- **Исправление**: Добавить `next lint` (встроен в Next.js) как минимум.

### P3 — `tsconfig.json` не проверен
- **Проблема**: Не удалось прочитать `tsconfig.json`, но при отсутствии `strict: true` часть преимуществ TypeScript теряется.
- **Исправление**: Убедиться что `strict: true` включён.

### OK — Build pipeline
- `scripts/build.mjs` — отличная практика: data-валидация до билда. Проверяются ID-уникальность, обязательные поля, ссылки на sources, структура district. Запускается через `npm run build` автоматически.

---

## Сводка по severity

| Severity | Количество | Описание |
|----------|-----------|----------|
| **P0**   | 0         | Нет критических блокирующих проблем |
| **P1**   | 3         | Hardcoded sourceIds, crash при пустых массивах, ARIA keyboard nav |
| **P2**   | 9         | Дублирование, скрытые ошибки, performance, a11y |
| **P3**   | 13        | Типизация, code style, отсутствие тестов, minor issues |

---

## Общая оценка

Проект архитектурно чистый: один источник данных, однонаправленные зависимости, правильное разделение server/client компонентов, хороший build pipeline. TypeScript используется аккуратно, но не строго (есть `| string` и `as`). Главные точки роста:

1. **Accessibility**: ARIA-табы нуждаются в keyboard navigation (P1).
2. **Robustness**: Hardcoded IDs и тихий fallback при ошибках (P1-P2).
3. **Performance**: Lazy loading и shared IntersectionObserver (P2).
4. **Maintainability**: Разбить god-file `atlas-interactives.tsx` (P2).
