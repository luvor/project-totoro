# ТЕСТИРОВЩИК: План тестирования сайта Project Totoro

---

## 1. Карта интерактивных модулей

На основе анализа кодовой базы выявлены следующие интерактивные компоненты, подлежащие тестированию:

| # | Компонент | Страница | Тип интерактива |
|---|-----------|----------|-----------------|
| 1 | HeroDial | `/` (Flagship) | Переключение 4 климатических режимов (winter/summer/blizzard/heat) |
| 2 | AnimatedMetricStrip + CountUp | `/` | Анимация чисел при скролле (IntersectionObserver) |
| 3 | MasterplanExplorer | `/` | Двойной переключатель: кварталы (6 шт.) + сезоны (4 режима) |
| 4 | PersonaRoutesExplorer | `/` | Переключатель персон + сезон (зима/лето) |
| 5 | MachineSwitcher | `/`, `/machines/` | Выбор машины (3 сценария) + режим (зима/межсезонье/лето) |
| 6 | NuclearSummerSimulator | `/machines/` | Переключатель летних режимов атомного сценария |
| 7 | ResilienceSimulator | `/`, `/machines/` | Переключатель сценариев отказа |
| 8 | CostPanel | `/` | Переключатель CAPEX band (low/base/high) + фазы |
| 9 | VersionMatrix | `/versions/` | Переключатель версий (4 шт.) |
| 10 | RulebookOverlay | `/` | Переключатель правил кодекса |
| 11 | ScrollReveal | Все страницы | Анимация появления блоков при скролле |
| 12 | SectionLinks | `/` | Якорная навигация внутри страницы |
| 13 | SourceDisclosure | Все страницы | Аккордеон `<details>` с источниками |
| 14 | PrintButton | `/appendix/` | Вызов `window.print()` |
| 15 | FooterPortal | Все страницы | Навигационные ссылки в футере |
| 16 | SectionDivider | Все страницы | Декоративные разделители (glow/wave/fade) |

---

## 2. Чек-лист тестирования

### 2.1. Интерактивные модули — Desktop

| # | Что проверяем | Ожидаемый результат | Критичность |
|---|--------------|---------------------|-------------|
| D1 | HeroDial: переключение 4 режимов | SVG-иллюстрация HeroClimateGraphic обновляется; текст headline/summary меняется; активная вкладка визуально выделена | critical |
| D2 | MasterplanExplorer: выбор квартала | Карточка квартала обновляется (title, population, role, winterRole, summerRole, services); SVG MasterplanGraphic подсвечивает выбранный квартал | critical |
| D3 | MasterplanExplorer: переключение сезона | SVG визуал меняет mode; переключатель обновляет aria-selected | high |
| D4 | PersonaRoutesExplorer: выбор персоны + сезон | Карточка показывает name, summary, minutes, modeMix, coldExposure/shadeExposure; SVG маршрута обновляется | critical |
| D5 | MachineSwitcher: выбор машины | Карточка обновляет title, summary, capexBand, dependencies, publicLifeImplications; оба SVG (cutaway + bars) обновляются | critical |
| D6 | MachineSwitcher: переключение режима | SVG MachineCutawayGraphic меняет отображение зима/межсезонье/лето | high |
| D7 | NuclearSummerSimulator: выбор состояния | Карточка показывает label, summary, mix shares; SVG NuclearSummerGraphic обновляется | high |
| D8 | ResilienceSimulator: выбор сценария | Карточка показывает whatBreaks, whatKeepsWorking, fallbackProtocol; SVG ResilienceGraphic обновляется | high |
| D9 | CostPanel: переключение band | Текст costScenario.low/base/high меняется в зависимости от выбранного band | high |
| D10 | VersionMatrix: выбор версии | Карточка обновляется (title, population, area, coreIdea, tradeoffs); SVG VariantClusterGraphic подсвечивает активную версию | critical |
| D11 | RulebookOverlay: выбор правила | Карточка показывает cannotDo, mustDo, why, metric, failureMode; SVG RuleOverlayGraphic обновляется | high |
| D12 | CountUp: анимация чисел | Числа анимируются при первом появлении в viewport; после анимации показывают точное значение; повторно не запускаются | medium |
| D13 | ScrollReveal: появление блоков | Блоки появляются с transition при скролле; класс is-visible добавляется один раз; observer отключается после показа | medium |
| D14 | SourceDisclosure: открытие/закрытие | details/summary работает; список источников отображается с title, note, ссылкой | medium |
| D15 | SectionLinks: якорная навигация | Клик по ссылке прокручивает к соответствующему section id; все 11 секций доступны | high |
| D16 | PrintButton: печать | window.print() вызывается; appendix-page имеет print-friendly стили | medium |
| D17 | Навигация между страницами | Все 4 страницы доступны: /, /versions/, /machines/, /appendix/; ссылки в хедере и футере работают | critical |

### 2.2. Интерактивные модули — Mobile (< 768px)

| # | Что проверяем | Ожидаемый результат | Критичность |
|---|--------------|---------------------|-------------|
| M1 | HeroDial: layout | hero-dial-grid переходит в одноколоночный layout; кнопки режимов не обрезаются | critical |
| M2 | MasterplanExplorer: layout | explorer-layout складывается в колонку; pill-grid кварталов — горизонтальный скролл или wrap | critical |
| M3 | PersonaRoutesExplorer: layout | explorer-sidebar над visual; кнопки персон доступны без горизонтального скролла | critical |
| M4 | MachineSwitcher: layout | machine-layout складывается; visual-stack занимает полную ширину | critical |
| M5 | SegmentedTabs: touch targets | Минимальный размер кнопки tab >= 44x44px (WCAG 2.5.8); текст не обрезается | high |
| M6 | metric-strip: горизонтальный скролл | Метрики не выпадают за экран; либо wrap, либо горизонтальный скролл с индикацией | high |
| M7 | card-grid: адаптация | Сетки three/two/one переходят в одну колонку на малых экранах | high |
| M8 | AppendixTable: читаемость | Таблицы в table-shell имеют горизонтальный скролл; заголовки видны | high |
| M9 | Навигация page-links | Меню не перекрывает контент; все 4 ссылки доступны на мобильном | critical |
| M10 | Touch-взаимодействие | Все кнопки и вкладки реагируют на tap; нет залипания :hover на touch-устройствах | high |
| M11 | Ориентация экрана | Landscape-режим не ломает layout; контент читаем | medium |

### 2.3. Клавиатура и Screen Readers (Accessibility)

| # | Что проверяем | Ожидаемый результат | Критичность |
|---|--------------|---------------------|-------------|
| A1 | SegmentedTabs: role="tablist" + role="tab" | Все tab-группы имеют tablist с aria-label; каждый tab имеет aria-selected; aria-controls указывает на panel id | critical |
| A2 | SegmentedTabs: клавиатура | Tab: перемещение фокуса на tablist; Enter/Space: активация tab; стрелки лево/право: переключение между tabs (если реализовано) | critical |
| A3 | pill-grid: role="tablist" | Кварталы и правила в pill-grid имеют role="tab" + aria-selected | high |
| A4 | ScrollReveal: не блокирует контент | Контент внутри scroll-reveal доступен для screen reader даже до анимации (не display:none) | critical |
| A5 | CountUp: aria-live или эквивалент | Анимированные числа доступны screen reader; итоговое значение читается корректно | medium |
| A6 | SectionDivider: aria-hidden="true" | Декоративные разделители скрыты от screen reader | low |
| A7 | page-backdrop, gradient-mesh, hero-particles: aria-hidden | Все декоративные фоновые элементы имеют aria-hidden="true" | low |
| A8 | VisualFrame: figcaption | SVG-визуалы обёрнуты в figure с figcaption (title + caption); screen reader озвучивает описание | high |
| A9 | SourceDisclosure: details/summary | Screen reader озвучивает "Методика и источники" как интерактивный элемент; состояние open/closed передаётся | medium |
| A10 | Навигация: aria-label | nav элементы имеют aria-label="Навигация по страницам"; aside section-links имеет aria-label | high |
| A11 | Фокус-индикатор | Все интерактивные элементы имеют видимый outline при фокусе клавиатурой | critical |
| A12 | Skip-to-content | Наличие ссылки "Перейти к содержимому" для пропуска навигации | high |
| A13 | Заголовочная иерархия | h1 -> h2 -> h3 без пропусков уровней на каждой странице | high |
| A14 | Цветовой контраст | Текст имеет контраст >= 4.5:1 (AA); trust-badge и confidence-badge читаемы | critical |
| A15 | Внешние ссылки | Ссылки с target="_blank" имеют rel="noreferrer"; screen reader сообщает о новом окне | medium |
| A16 | Язык страницы | html[lang="ru"] установлен; смешанный русский/английский контент не создаёт проблем | medium |
| A17 | SegmentedTabs: отсутствие arrow-key навигации | ЗАМЕЧАНИЕ: текущая реализация SegmentedTabs не поддерживает навигацию стрелками между tabs (WAI-ARIA Tabs Pattern требует arrow keys). Необходимо добавить onKeyDown handler | high |

### 2.4. Работа при отключённом JavaScript

| # | Что проверяем | Ожидаемый результат | Критичность |
|---|--------------|---------------------|-------------|
| J1 | SSG-контент виден | Next.js SSG рендерит HTML на сервере; текст, заголовки, метрики, карточки видны без JS | critical |
| J2 | Навигация работает | Ссылки между 4 страницами — стандартные `<a>`, работают без JS | critical |
| J3 | SegmentedTabs: начальное состояние | Первый tab активен по умолчанию (useState инициализация); контент первого состояния виден в SSR | high |
| J4 | CountUp: fallback | Без JS отображается статическое значение (useState(value)) — числа видны | high |
| J5 | ScrollReveal: контент видим | Без JS контент остаётся в DOM но без класса is-visible; CSS должен обеспечить видимость по умолчанию (не opacity:0 без .is-visible) | critical |
| J6 | SourceDisclosure: details/summary | Нативный HTML details работает без JS | low |
| J7 | PrintButton: не работает | Кнопка не функционирует без JS — допустимо, но пользователь может использовать Ctrl+P | low |
| J8 | SVG-графики: видимость | "use client" компоненты рендерятся на сервере с начальным state; SVG-иллюстрации отображаются с дефолтным режимом | high |

### 2.5. Согласованность данных

| # | Что проверяем | Ожидаемый результат | Критичность |
|---|--------------|---------------------|-------------|
| C1 | Метрики: flagship vs appendix | Значения metrics в AnimatedMetricStrip на главной совпадают с AppendixTable в /appendix/ (единый источник metrics.json) | critical |
| C2 | Население district.residents | Число в formatPeople(district.residents) на appendix совпадает с метрикой population в metric-strip | critical |
| C3 | Площадь district.areaKm2 | Значение на appendix совпадает с метрикой district-area | critical |
| C4 | CAPEX: costScenario vs appendix | Стоимость в CostPanel совпадает с base-capex метрикой | high |
| C5 | Машины: 3 сценария | machines.json содержит ровно 3 записи; MachineSwitcher на / и /machines/ используют один массив | high |
| C6 | Версии: 4 варианта | variants.json содержит ровно 4 записи; VersionMatrix и version cards на /versions/ используют один массив | high |
| C7 | Персоны: seasonRoutes | Каждая персона имеет seasonRoutes.winter и seasonRoutes.summer; нет undefined-значений | high |
| C8 | Источники: sourceIds валидны | Все sourceIds в claims, machines, variants, rules находятся в sources.json; getSourceLinks не возвращает пустых массивов для непустых sourceIds | critical |
| C9 | Quarters: 6 кварталов | district.quarters содержит все кварталы, указанные в генплане; shortLabel, title, services непустые | high |
| C10 | Правила: сезон указан | Каждое правило в rules.json имеет заполненное поле season | medium |
| C11 | Фазы: порядок и полнота | district.phases упорядочены по хронологии; capex и residents заполнены для всех фаз | high |
| C12 | TrustStatus/Confidence: валидные значения | Все status принадлежат {"benchmark", "estimate", "assumption", "concept"}; все confidence принадлежат {"low", "medium", "high"} | high |

### 2.6. Производительность и Core Web Vitals

| # | Что проверяем | Ожидаемый результат | Критичность |
|---|--------------|---------------------|-------------|
| P1 | LCP (Largest Contentful Paint) | < 2.5s на desktop, < 4s на mobile (3G); hero-секция рендерится быстро | critical |
| P2 | FID / INP (Interaction to Next Paint) | < 200ms; переключение tabs не вызывает заметной задержки | critical |
| P3 | CLS (Cumulative Layout Shift) | < 0.1; ScrollReveal и CountUp не сдвигают layout после загрузки | critical |
| P4 | ScrollReveal: IntersectionObserver cleanup | Observer отключается (disconnect) при unmount; нет утечек памяти при навигации между страницами | high |
| P5 | CountUp: requestAnimationFrame cleanup | Анимация не продолжается после unmount компонента | high |
| P6 | SVG-размер | SVG-графики не превышают 50KB каждый; нет встроенных растровых изображений в SVG | medium |
| P7 | CSS bundle | globals.css не содержит неиспользуемых правил; total CSS < 100KB gzipped | medium |
| P8 | JS bundle | Клиентские компоненты (atlas-interactives) tree-shaken корректно; total JS < 200KB gzipped | medium |
| P9 | Шрифты | Шрифты загружаются с font-display: swap; FOUT не критичен | medium |
| P10 | Анимации: 60fps | CSS transitions в scroll-reveal и section-divider не вызывают jank; используют transform/opacity | high |
| P11 | Печать /appendix/ | @media print стили убирают декоративные элементы; таблицы не обрезаются | medium |

### 2.7. Кроссбраузерность

| # | Что проверяем | Ожидаемый результат | Критичность |
|---|--------------|---------------------|-------------|
| B1 | Chrome 120+ | Все интерактивы работают; IntersectionObserver, CSS custom properties, details/summary поддержаны | critical |
| B2 | Firefox 120+ | SVG отображается корректно; SegmentedTabs переключаются; scroll-behavior smooth работает | critical |
| B3 | Safari 17+ (macOS/iOS) | IntersectionObserver работает; CSS backdrop-filter (если используется) поддержан; hover не залипает на iOS | critical |
| B4 | Edge 120+ | Chromium-based — ожидаем паритет с Chrome; проверить print стили | high |
| B5 | Safari iOS: viewport | 100vh корректно учитывает address bar; hero-секция не обрезается | high |
| B6 | Firefox: Intl.NumberFormat | formatPeople и CountUp используют Intl.NumberFormat("ru-RU") — проверить формат пробелов-разделителей | medium |
| B7 | Dark mode preference | Если сайт поддерживает prefers-color-scheme: проверить читаемость trust-badge и confidence-badge в обоих режимах | medium |

---

## 3. Пользовательские сценарии

### 3.1. Сценарий "Житель" — Читает историю, примеряет повседневность

**Профиль**: Потенциальный житель Астаны, 30-45 лет, десктоп или смартфон, средний интернет.

**Путь пользователя**:
1. Открывает главную страницу `/`
2. Видит hero-секцию с headline и climate dial
3. Переключает режимы (зима/лето/пурга/жара) — понимает, что район работает круглый год
4. Скроллит к "Обещания" — читает promise cards
5. Проходит к "Повседневность" — выбирает свою персону (офисный работник, пенсионер, ребёнок)
6. Переключает зима/лето — видит маршрут, minutes, cold exposure
7. Идёт в "Стоимость" — смотрит фазы и цену
8. Нажимает "Открыть лабораторию версий" в футере

**Критерии успешности**:
| # | Критерий | Метрика |
|---|----------|---------|
| Ж1 | Понимание концепции за 2 минуты | Hero + promises + 1 persona route дают полную картину |
| Ж2 | "А мне-то что?" получает ответ | Персона-route показывает конкретный маршрут с минутами и exposure |
| Ж3 | Доверие к цифрам | Trust badges видны; SourceDisclosure раскрывается |
| Ж4 | Навигация интуитивна | SectionLinks позволяют прыгать между блоками |
| Ж5 | Не теряется в контенте | ScrollReveal создаёт ритм; section dividers отделяют блоки |

### 3.2. Сценарий "Инвестор/Чиновник" — Сразу в цифры и appendix

**Профиль**: ЛПР из акимата или инвестфонда, 40-55 лет, десктоп, быстрый интернет, мало времени.

**Путь пользователя**:
1. Открывает главную страницу `/`
2. Видит metric-strip в hero — сканирует ключевые цифры (население, площадь, CAPEX)
3. Нажимает "Appendix" в навигации
4. Читает таблицу метрик с status/confidence/formula
5. Смотрит claims с "Почему важно" и "Граница"
6. Проверяет machine scenarios — зима/лето/failure mode/dependencies
7. Открывает sources — проверяет URL и credentials
8. Нажимает "Печать / PDF"
9. Возвращается на главную, идёт в "Стоимость" — переключает low/base/high

**Критерии успешности**:
| # | Критерий | Метрика |
|---|----------|---------|
| И1 | Ключевые цифры видны без скролла | metric-strip в hero содержит population, area, CAPEX, service-radius |
| И2 | Appendix — полная справка | Все метрики, claims, machines, versions, rules, phases, sources на одной странице |
| И3 | Provenance проверяем | Каждая метрика имеет formula, owner, sourceIds; ссылки открываются |
| И4 | Печать работает | Print-кнопка генерирует чистый PDF без декоративных элементов |
| И5 | Цифры не противоречат | Одно и то же значение в metric-strip, CostPanel и AppendixTable |
| И6 | Решение за 5 минут | Appendix + CAPEX дают достаточно данных для preliminary assessment |

### 3.3. Сценарий "Случайный посетитель" — Только визуалы

**Профиль**: Попал по ссылке из соцсетей, 20-35 лет, смартфон, быстрый скролл, 30-60 секунд внимания.

**Путь пользователя**:
1. Открывает главную страницу на мобильном
2. Видит hero — крупный headline, SVG-иллюстрация
3. Скроллит быстро — видит ScrollReveal анимации, карточки, SVG-визуалы
4. Задерживается на ярких визуалах (masterplan, persona routes, machines)
5. Может кликнуть на 1-2 tab для интереса
6. Дочитывает до футера или закрывает

**Критерии успешности**:
| # | Критерий | Метрика |
|---|----------|---------|
| С1 | Суть за 30 секунд | Hero headline + promise cards + визуалы создают понятный образ |
| С2 | Визуальный ритм | ScrollReveal + SectionDivider создают "дыхание" между блоками |
| С3 | Не раздражает | Нет агрессивных pop-up, cookie-баннеров, отвлекающих элементов |
| С4 | Мобильный layout | Всё читаемо на 375px ширины; SVG масштабируются |
| С5 | Быстрая загрузка | LCP < 4s на 3G; нет блокирующих ресурсов |

### 3.4. Сценарий "Человек с ограниченными возможностями"

**Профиль**: Пользователь screen reader (VoiceOver/NVDA) или клавиатуры, любой возраст.

**Путь пользователя (клавиатура)**:
1. Открывает главную — фокус на skip-to-content (если есть)
2. Tab к навигации — выбирает страницу
3. Tab к HeroDial tabs — переключает режимы Enter/Space
4. Tab к SectionLinks — перемещается по секциям
5. Tab к MasterplanExplorer — переключает кварталы и сезоны
6. Tab к SourceDisclosure — открывает Enter
7. Проходит всю страницу до футера

**Путь пользователя (screen reader)**:
1. VoiceOver читает заголовок h1
2. Навигация по landmarks: nav (Навигация по страницам), main, footer
3. Навигация по заголовкам h2 — каждая секция имеет заголовок
4. Tablist озвучивается с aria-label
5. Переключение tab — aria-selected обновляется
6. SVG-визуалы описываются через figcaption

**Критерии успешности**:
| # | Критерий | Метрика |
|---|----------|---------|
| Д1 | Полная клавиатурная навигация | Все интерактивные элементы достижимы Tab; нет keyboard traps |
| Д2 | Screen reader озвучивает структуру | Landmarks, заголовки, tablists имеют осмысленные labels на русском |
| Д3 | Визуалы описаны | Каждый VisualFrame имеет figcaption с title и caption |
| Д4 | Декоративные элементы скрыты | aria-hidden="true" на backdrop, gradient-mesh, particles, dividers |
| Д5 | Контраст достаточен | AA-уровень (4.5:1) для всего текста; trust-badge различимы |
| Д6 | Focus visible | Все focusable элементы имеют видимый :focus-visible outline |
| Д7 | Нет зависимости от цвета | Информация передаётся не только цветом (trust-badge имеет текст) |

### 3.5. Сценарий "Мобильный пользователь, слабый интернет"

**Профиль**: 3G-соединение, Android-смартфон среднего класса, 320-375px ширина.

**Путь пользователя**:
1. Открывает главную — ждёт загрузку
2. Видит hero-секцию (SSR-контент виден сразу, JS подгружается)
3. Скроллит — ScrollReveal срабатывает плавно
4. Пробует переключить tabs — отклик быстрый (state только на клиенте)
5. Переходит на /appendix/ — таблицы скроллятся горизонтально
6. Возвращается назад

**Критерии успешности**:
| # | Критерий | Метрика |
|---|----------|---------|
| МП1 | SSR-контент виден до загрузки JS | Текст, заголовки, метрики видны из HTML; hydration не мешает |
| МП2 | JS bundle < 200KB gzipped | "use client" компоненты минимизированы; tree-shaking работает |
| МП3 | Нет layout shift при hydration | CLS < 0.1; ScrollReveal не меняет размеры после JS загрузки |
| МП4 | Tab switching < 100ms | Переключение state локальное, не требует fetch |
| МП5 | Таблицы читаемы | table-shell обеспечивает overflow-x: auto; thead sticky при скролле |
| МП6 | SVG не блокируют рендер | SVG инлайновые (React-компоненты), не требуют дополнительных запросов |

---

## 4. Выявленные проблемы и рекомендации

### 4.1. Accessibility — Требуют внимания

| # | Проблема | Рекомендация | Критичность |
|---|----------|-------------|-------------|
| R1 | SegmentedTabs не поддерживает arrow-key навигацию | Добавить onKeyDown: ArrowLeft/ArrowRight для переключения между tabs (WAI-ARIA Tabs Pattern) | high |
| R2 | Нет skip-to-content ссылки | Добавить `<a href="#main" class="sr-only focus:not-sr-only">` | high |
| R3 | CountUp может быть проблемой для screen readers | Добавить aria-live="polite" или aria-label с конечным значением | medium |
| R4 | hero-mode-panel не связан с tab через aria-controls | id hero-mode-{activeMode} существует, но SegmentedTabs генерирует panelId, который не привязан к panel | high |
| R5 | Отсутствует lang="ru" проверка | Убедиться, что layout.tsx устанавливает `<html lang="ru">` | medium |

### 4.2. Производительность — Требуют внимания

| # | Проблема | Рекомендация | Критичность |
|---|----------|-------------|-------------|
| R6 | ScrollReveal может создавать CLS | Убедиться, что CSS по умолчанию не скрывает контент (opacity: 0 должен применяться только с JS) | high |
| R7 | Множественные IntersectionObserver | 11+ секций ScrollReveal + CountUp создают множество observers; рассмотреть один общий observer | low |
| R8 | AppendixTable без виртуализации | При большом количестве метрик таблица может быть тяжёлой; пока данных немного — не критично | low |

### 4.3. Данные — Требуют проверки

| # | Проблема | Рекомендация | Критичность |
|---|----------|-------------|-------------|
| R9 | Внешние ссылки в sources.json | Проверить все URL на доступность (нет 404); SSL валиден | high |
| R10 | Смешанный язык | Часть UI на русском, часть на английском (CAPEX, Tradeoff, Public life); согласовать | medium |

---

## 5. Инструменты тестирования

| Задача | Инструмент |
|--------|------------|
| Accessibility audit | axe DevTools, Lighthouse, WAVE |
| Screen reader | VoiceOver (macOS/iOS), NVDA (Windows) |
| Keyboard testing | Ручное тестирование Tab/Enter/Space/Arrows |
| Core Web Vitals | Lighthouse, PageSpeed Insights, Web Vitals extension |
| Кроссбраузерность | BrowserStack или реальные устройства |
| Мобильное тестирование | Chrome DevTools Device Mode + реальные устройства (iPhone SE, Samsung Galaxy A-series) |
| Согласованность данных | Автотест: парсинг JSON-файлов, проверка referential integrity |
| Регрессия | Playwright visual regression tests |
| CSS проверка | Stylelint, PurgeCSS анализ |
| Печать | Chrome Print Preview, реальная печать |

---

## 6. Приоритеты тестирования

**Волна 1 (блокеры релиза)**:
- D1-D11: все интерактивные переключатели работают на desktop
- M1-M5: мобильный layout не ломается
- A1, A4, A11, A14: базовая accessibility
- C1-C4: согласованность ключевых чисел
- P1-P3: Core Web Vitals в зелёной зоне
- J1, J2, J5: контент виден без JS

**Волна 2 (высокий приоритет)**:
- A2, A3, A8-A10, A12, A13, A17: полная accessibility
- M6-M10: мобильные edge cases
- B1-B5: кроссбраузерность
- C5-C8: согласованность всех данных
- P4-P5: утечки памяти

**Волна 3 (улучшения)**:
- D12-D16: анимации и печать
- A5-A7, A15-A16: дополнительная accessibility
- B6-B7: Intl и dark mode
- P6-P11: оптимизация размеров
- C9-C12: полнота данных
