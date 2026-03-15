# Критический аудит Project Totoro

**Роль:** Критик. Беспощадный разбор всех минусов.
**Дата:** 2026-03-15

---

## 1. Визуал vs топ-лонгриды (Apple, Stripe, Linear, Vercel)

### 1.1. SVG-графика вместо реальных визуалов
**Проблема:** Все визуальные элементы --- это hand-coded SVG с примитивными геометрическими фигурами (кружки, прямоугольники, линии). Apple product pages используют фотографию и 3D-рендеры, Stripe --- анимированные gradient-mesh и pixel-perfect иллюстрации, Linear --- минималистичные но профессиональные иллюстрации с продуманным motion.

Здесь: изометрические "здания" из трёх полигонов, "люди" из пяти линий, "деревья" из двух эллипсов. Это выглядит как прототип или wireframe, а не как финальный продукт. Сайт про "красиво и удобно жить", но сам визуально не доказывает, что автор умеет делать красиво.

**Где:** `src/components/visuals/*` --- каждый файл, `shared-shapes.tsx` (PersonWalking --- 5 линий stick figure).

### 1.2. Отсутствие hero-image / hero-видео
Apple и Stripe захватывают внимание в первые 2 секунды фотографией или видео. Здесь hero --- SVG-диаграмма 500x480 с circle и polygon. Первое впечатление: "это технический чертёж", а не "это город мечты".

### 1.3. Нет фотографий, рендеров, мокапов
Ни одной фотографии на всём сайте. Для проекта про городское пространство это критический пробел. Stripe Atlas показывает реальные интерфейсы, Apple --- реальные устройства. Здесь --- только абстрактные схемы.

### 1.4. Монотонность визуального ритма
Каждая секция строится по шаблону: eyebrow + h2 + p + interactive-block. Одинаковый padding, одинаковые border-radius, одинаковые карточки. Linear и Vercel чередуют full-bleed секции, immersive зоны, text-only зоны, видео. Здесь --- бесконечная лента однотипных блоков.

### 1.5. Цветовая палитра ограничена
Тёмная тема с amber/copper/moss/steel. Визуально это "один настрой" на весь сайт. Apple чередует светлое/тёмное, Stripe использует gradient transitions между секциями. Здесь фон едва меняется от верха до низа (bg-top #08111a -> bg-bottom #efe9df), но весь контент в тёмных карточках, поэтому переход не ощущается.

### 1.6. Типографика не раскрыта
Unbounded --- хороший display-шрифт, но используется только для заголовков одного размера. Нет typographic drama: нет pull-quotes в потоке (классы pull-quote и pull-quote-muted определены в CSS, но НЕ используются ни в одном компоненте), нет контрастных размеров, нет typographic moments. Linear использует гигантские числа, Apple --- огромные заголовки на полный viewport.

---

## 2. UX-проблемы

### 2.1. Информационная перегрузка
Главная страница --- 11 секций, каждая с заголовком, подзаголовком, интерактивным блоком и карточками. Пользователь утопает. Нет иерархии важности: "Обещание" и "Стоимость" визуально одинаковы. Apple product page имеет 3-4 ключевых момента, а не 11.

### 2.2. Sticky-навигация обрезается
`section-links` имеет `mask-image: linear-gradient(to right, black 90%, transparent 100%)` --- последняя ссылка визуально пропадает. На мобильных `position: static` --- навигация просто теряется при скролле. Пользователь на мобильном не может быстро прыгнуть к секции после начала чтения.

### 2.3. Нет индикации текущей секции
Sticky-навигация не подсвечивает текущую секцию. Пользователь не знает, где он находится из 11 секций. Нет scroll spy.

### 2.4. Нет прогресс-бара или индикатора глубины
Лонгрид без ощущения прогресса. На таком длинном сайте (11+ секций) пользователь не знает, сколько осталось. Stripe и Vercel docs используют progress indicators.

### 2.5. Все интерактивные элементы выглядят одинаково
SegmentedTabs, pill-grid, explorer-layout --- один и тот же паттерн повторяется 8+ раз. Пользователь теряет ощущение нового. Каждый explorer выглядит как предыдущий: sidebar слева, visual-frame справа.

### 2.6. Мёртвые ссылки на страницы
Навигация ведёт на `/versions/` и `/machines/`, но при навигации через Playwright `/versions/` возвращает `ERR_ABORTED`. Если dev-сервер не стабилен --- это проблема. Но даже если страницы работают: переход между страницами --- full page reload без transition, в отличие от SPA-ощущения Apple/Linear.

### 2.7. Нет обратной связи при клике на таб
При переключении табов нет анимации перехода контента. Контент просто мгновенно меняется. Linear и Stripe используют fade/slide transitions между табами.

### 2.8. Двуязычный хаос
Заголовки на русском ("Почему холодные города ломаются"), но термины на английском без перевода: "Human Flourishing OS", "Masterplan Explorer", "Flagship climate district", "wind exposure", "step-free continuity", "cooling commons", "night purge", "decision-ready narrative". Пользователь должен знать английский, чтобы читать русский сайт. Нет ни глоссария, ни tooltip-ов для терминов.

### 2.9. Footer не информативен
FooterPortal --- три ссылки и заголовок. Нет контактов, нет social links, нет copyright, нет "about" ссылки. Для серьёзного проекта это подозрительно пусто.

---

## 3. Код

### 3.1. Нет тестов
Ни одного теста. Вообще. Ноль. Для проекта такой сложности (10+ интерактивных компонентов, data layer, 4 страницы) --- это профессионально неприемлемо.

### 3.2. Нет error boundaries
Если `districts.json` содержит невалидные данные --- весь сайт падает. Нет ErrorBoundary компонентов. Нет graceful degradation.

### 3.3. JSON-данные импортируются без валидации
`atlas.ts` делает `as ClaimRecord[]`, `as MachineSpec[]` --- это type assertion, а не runtime validation. Если JSON-структура изменится, TypeScript не поможет в runtime.

### 3.4. Глобальный CSS файл на 1463 строки
Весь стайлинг --- в одном `globals.css`. Нет CSS modules, нет Tailwind, нет styled-components. При 1463 строках файл становится неуправляемым. Селекторы могут конфликтовать. Нет scoping.

### 3.5. Дублирование навигации
Навигация (`site-topline` с `page-links`) дублируется в `page.tsx` (inline) и в `PageMasthead` компоненте (`atlas-ui.tsx`). Одинаковый HTML в двух местах. Изменение навигации требует правки в двух файлах.

### 3.6. CountUp пересчитывает `numericMatch` при каждом рендере
`CountUp` вычисляет regex match и parseFloat на каждом рендере, хотя значение `value` обычно не меняется. Не критично, но не оптимально.

### 3.7. IntersectionObserver leak в CountUp
`CountUp` создаёт IntersectionObserver с `threshold: 0.3`, а `ScrollReveal` --- с настраиваемым threshold. Оба ставят observer и отключают через disconnect, но `CountUp` не проверяет, unmounted ли компонент перед `setDisplay` внутри `requestAnimationFrame`. Потенциальная ошибка "setState on unmounted component".

### 3.8. `guessSceneType` --- хрупкая эвристика
`persona-route.tsx:134` --- функция определяет тип сцены по подстрокам в названии шага. Если текст данных изменится (например, "Домой" вместо "Дом"), сцена отрисуется как `default`. Нет fallback-логики и нет связи между данными и визуалом.

### 3.9. Hardcoded SVG positions
Все визуальные компоненты содержат захардкоженные координаты: `quarterLayouts` с `{ x: 228, y: 62, w: 18, d: 12, h: 22 }`. Любое изменение в layout требует ручной подгонки десятков чисел. Это не масштабируется.

### 3.10. Нет lazy loading для тяжёлых SVG
Все 8+ SVG-визуалов рендерятся при первой загрузке страницы. `ScrollReveal` скрывает их через opacity, но DOM уже создан. Для главной страницы это ненужная нагрузка.

### 3.11. `key` props на основе индексов
`atlas-visuals.tsx:70` --- `key={\`conn-${i}\`}`. В нескольких местах key основан на индексе массива. Не критично для статичных списков, но нарушает React best practices.

---

## 4. Контент

### 4.1. Текстовая плотность чрезмерная
Каждая секция имеет подзаголовок в 2-3 строки. Например: "Flagship-сценарий остаётся линейной историей, но сам генплан можно исследовать как климатическую систему: выбирать кварталы и переключать сезонные режимы." Это 25+ слов. Apple product pages используют 5-8 слов на подзаголовок.

### 4.2. Жаргон без объяснений
"Provenance", "decision-ready narrative", "civic interiors", "wind-buffer blocks", "night purge", "active frontage", "step-free continuity", "8-and-80 test" --- ни один термин не объяснён inline. Нет tooltip-ов, нет глоссария. Целевая аудитория неясна: для урбанистов слишком просто, для обычных людей слишком жаргонно.

### 4.3. Нет storytelling
Apple ведёт через narrative arc: проблема -> решение -> wow-момент. Здесь 11 секций идут списком тем без emotional arc. Нет героя, нет кульминации, нет "aha moment". Структура больше похожа на техническую документацию, чем на лонгрид.

### 4.4. Самореферентность
Тексты постоянно говорят о себе: "Сайт отделяет benchmark от estimate", "Сайт не продаёт одну магическую истину", "Поэтому сайт показывает...". Лучшие лонгриды не напоминают читателю, что он читает сайт. Они показывают, а не рассказывают о показывании.

### 4.5. Русский + English = каша
Тексты пестрят непереведёнными терминами: "wind exposure", "cooling commons", "public realm share", "step-free", "cold exposure", "shade exposure", "mode mix", "Failure mode", "Fallback", "Best use case", "Tradeoff". Это не билингвальный контент --- это лень переводить.

---

## 5. Accessibility

### 5.1. Нет skip-to-content ссылки
Первый интерактивный элемент --- ссылка "Project Totoro", затем 4 ссылки навигации. Скринридер пользователь должен пройти через все это прежде чем добраться до контента. Нет skip link.

### 5.2. SVG тексты нечитаемы для скринридеров
SVG содержат `<text>` элементы с информацией (названия кварталов, метки режимов), но `<title>` элемент SVG описывает только общую картинку. Детальная информация внутри SVG недоступна скринридерам в контексте.

### 5.3. Color contrast проблемы
`--muted: #b3c1cd` на фоне `rgba(8, 17, 26, 0.86)` --- contrast ratio приблизительно 7:1 (ok). Но `rgba(255, 255, 255, 0.58)` (claim-detail-grid span) на тёмном фоне --- contrast ratio ~3.5:1, что ниже WCAG AA для мелкого текста (4.5:1). Аналогично `opacity: 0.55` на метках кварталов.

### 5.4. Нет keyboard navigation для pill-grid
`pill-grid` использует `role="tablist"`, но нет arrow-key навигации. ARIA pattern для tabs требует arrow keys для переключения, но тут только click handlers. Это нарушение WAI-ARIA authoring practices.

### 5.5. Табы без связанных panel id
`SegmentedTabs` генерирует `aria-controls={panelId}`, но `panelId` ссылается на `${tabId}-panel` --- элемент с таким id не существует в DOM. Это broken ARIA reference.

### 5.6. Нет focus management при переключении табов
При переключении таба фокус остаётся на кнопке. Контент ниже меняется, но скринридер не объявляет новый контент. Нет `aria-live` region.

### 5.7. source-disclosure summary без маркера
`summary::-webkit-details-marker { display: none }` скрывает стандартный маркер, заменяя его на `::after` с Unicode символами. Но `list-style: none` на summary может сломать expectation скринридеров.

### 5.8. Анимации не respectают prefers-reduced-motion
`scroll-reveal` анимации, `float-particles`, `mesh-drift`, `divider-pulse`, `eyebrow-shimmer`, `tram-dash`, `ring-pulse`, `tram-loop-path` --- ни одна не проверяет `prefers-reduced-motion`. Пользователи с вестибулярными нарушениями получают полный набор анимаций.

---

## 6. Performance

### 6.1. Gradient mesh с бесконечной анимацией
`.gradient-mesh` --- fixed элемент с 4 radial-gradient и `animation: mesh-drift 60s infinite`. Это перерисовка compositing layer на каждом кадре, 60 секунд по кругу. На слабых устройствах это drain battery.

### 6.2. Particle effects через box-shadow
`.hero-particles::before` --- 12 box-shadow с субпиксельными смещениями + `animation: float-particles 40s linear infinite`. Аналогичный `.hero-particles::after` с 9 box-shadow и 50s анимацией. Два pseudo-элемента с ~20 shadow-точками каждый, постоянно анимирующиеся. На мобильных скрыты (`display: none` при `max-width: 780px`) --- хорошо, но на desktop с weak GPU это ненужная нагрузка.

### 6.3. Все SVG визуалы рендерятся сразу
Главная страница рендерит: HeroClimateGraphic (400+ SVG элементов), MasterplanGraphic (~200 элементов), PersonaRouteGraphic (~150), MachineCutawayGraphic (~100), SummerStreetGraphic (~100), FlourishingWheelGraphic (~80), SeasonalCalendarGraphic (~60), ResilienceGraphic (~60), RuleOverlayGraphic (~50), + SeasonalCalendarGraphic повторно в CostPanel. Итого: ~1200+ SVG элементов в DOM при первом рендере.

### 6.4. Нет `<link rel="preload">` для шрифтов
Два Google Fonts (Manrope, Unbounded) загружаются через next/font, что хорошо, но нет preload для критических шрифтов.

### 6.5. JSON данные бандлятся в JavaScript
Все 8 JSON файлов (claims, districts, machines, metrics, personas, rules, sources, variants) импортируются через `import ... from "../../content/*.json"` и бандлятся в JS bundle. Это увеличивает размер JS, хотя данные статичны и могли бы быть предзагружены или разделены.

---

## 7. Архитектурные проблемы

### 7.1. Нет CMS / no content management
Весь контент в JSON-файлах. Редактирование текста требует git commit и redeploy. Для проекта с таким объёмом контента это bottleneck. Любой не-разработчик не может отредактировать текст.

### 7.2. Нет i18n инфраструктуры
Тексты захардкожены на русском + английском. Добавление языка = переписывание всех JSON файлов и компонентов. Нет translation keys.

### 7.3. Монолитный data layer
`atlas.ts` экспортирует всё для всех страниц. Страница `/machines/` импортирует весь `atlas.ts`, включая данные для variants, personas, rules, которые ей не нужны. Tree-shaking может помочь, но структура не оптимизирована.

### 7.4. Нет API layer
Если проект вырастет до динамических данных (пользовательские сценарии, realtime метрики), весь data layer придётся переписывать. Нет абстракции между данными и компонентами.

### 7.5. Нет routing для deep links в интерактивах
Состояние интерактивов (выбранный квартал, режим, персона) не синхронизируется с URL. Нельзя скопировать ссылку на конкретный квартал в masterplan или конкретную персону. Для presentation-сайта это потеря sharability.

### 7.6. Четыре страницы с дублированным layout
Каждая страница повторяет: `<main className="atlas-page">` + `<div className="page-backdrop">` + `<div className="gradient-mesh">`. Это должно быть в layout компоненте, а не копипаститься.

---

## 8. Дизайн-система

### 8.1. Неиспользуемые CSS-классы
`.pull-quote`, `.pull-quote-muted`, `.section-immersive`, `.metric-hero-bar`, `.full-bleed`, `.stroke-draw` --- определены в CSS, но не используются ни в одном компоненте. Мёртвый код.

### 8.2. Непоследовательное именование
Смесь naming conventions: `card-grid`, `card-header-row` (BEM-подобное), `is-active`, `is-visible` (state modifiers), `atlas-section`, `atlas-footer` (namespace), `reason-card`, `claim-card`, `comparison-card`, `metric-card`, `story-card`, `phase-card`, `trust-legend-card` (7 типов "card" без общего base class).

### 8.3. 7+ типов карточек без системы
`reason-card`, `claim-card`, `comparison-card`, `metric-card`, `story-card`, `phase-card`, `trust-legend-card`, `feature-panel`, `explorer-card` --- 9 вариантов "карточки" с немного разным padding, layout и содержимым. Это не дизайн-система, это adhoc.

### 8.4. Spacing не токенизировано
Padding/margin значения: 28px, 22px, 24px, 18px, 14px, 16px, 10px, 12px, 8px, 6px. Нет spacing scale. Значения выглядят произвольными.

### 8.5. Border-radius inconsistency
`--radius-xl: 34px`, `--radius-lg: 24px`, `--radius-md: 18px`, `--radius-sm: 14px` --- определены в CSS variables. Но в SVG компонентах `rx` значения: 30, 32, 36, 28, 26, 17, 21 --- не соответствуют ни одному токену.

### 8.6. Color opacity вместо токенов
Повсюду `rgba(255, 255, 255, 0.06)`, `rgba(255, 255, 255, 0.08)`, `rgba(255, 255, 255, 0.04)`, `rgba(255, 255, 255, 0.05)`. Пять оттенков белого с разницей в 1-2% opacity. Визуально неотличимы, но засоряют код.

---

## 9. Общий вердикт

### Оценка: 5.5 / 10

**Что есть:**
- Продуманная информационная архитектура (trust levels, provenance, claims с limits)
- Accessibility basics (aria-labels, semantic HTML, focus-visible outlines)
- Responsive breakpoints (три уровня)
- Print stylesheet
- Чёткая TypeScript типизация данных
- Интерактивные SVG визуалы, реагирующие на state

**Что катастрофически не хватает для 9+:**

1. **Визуальное качество (must fix):** Заменить SVG-wireframes на профессиональные иллюстрации, рендеры или хотя бы stylized illustrations уровня Stripe/Linear. Текущие SVG выглядят как прототип.

2. **Hero experience (must fix):** Полноэкранный hero с фото/видео/3D вместо SVG-диаграммы. Первые 2 секунды определяют, останется ли пользователь.

3. **Storytelling (must fix):** Переработать 11 секций в narrative arc с emotional peaks. Убрать самореферентность ("сайт показывает"). Сократить текст на 40%.

4. **Контентная гигиена (must fix):** Определиться с языком (полностью русский с глоссарием ИЛИ полностью английский). Текущий mix непрофессионален.

5. **Motion design (high priority):** Добавить transitions между состояниями табов, page transitions, micro-interactions. Текущий сайт статичен кроме scroll-reveal.

6. **prefers-reduced-motion (high priority):** Обязательно. Текущие анимации нарушают WCAG 2.1 SC 2.3.3.

7. **Тесты (high priority):** Хотя бы snapshot tests для компонентов и integration tests для data layer.

8. **Deep linking (medium priority):** Синхронизация состояния интерактивов с URL params.

9. **Performance (medium priority):** Lazy loading SVG компонентов, code splitting по страницам, отключение gradient-mesh анимации на weak devices.

10. **Дизайн-система (medium priority):** Унифицировать карточки, spacing, naming. Убрать мёртвый CSS.

**Итог:** Проект демонстрирует глубокое мышление об информационной архитектуре и доверии к данным, но визуально и UX-но не дотягивает до уровня, на который претендует. Сайт про "красиво жить" сам не выглядит красиво. Это главное противоречие.
