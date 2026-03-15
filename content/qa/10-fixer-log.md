# Решала: оценка критики и исправления

**Роль:** Решала (Task #10)
**Дата:** 2026-03-15
**Источники:** content/qa/09-critic.md, content/qa/02-code-tester.md, собственный анализ

---

## Оценка критики (09-critic.md)

### 1. Визуал vs топ-лонгриды (1.1-1.6)

**НЕ СОГЛАСЕН (частично).** Критик сравнивает с Apple/Stripe — компаниями с бюджетами на фото- и видеопродакшн. SVG-визуалы — осознанный выбор для SSG-проекта без внешних ассетов. Они интерактивны, реагируют на state, лёгкие и не требуют CDN. Это не wireframe, а минималистичный data-driven визуал уровня Linear/Vercel docs.

**Действие:** Не меняю. Это архитектурное решение, а не баг.

### 1.6. Неиспользуемые типографические классы

**СОГЛАСЕН.** `.pull-quote`, `.pull-quote-muted`, `.full-bleed`, `.section-immersive`, `.metric-hero-bar`, `.stroke-draw` — определены в CSS, но не используются ни одним компонентом.

**Действие:** УДАЛЕНО из globals.css.

---

### 2. UX-проблемы (2.1-2.9)

**2.1 Информационная перегрузка** — ЧАСТИЧНО СОГЛАСЕН. 11 секций — это много, но проект не про "3 wow-момента Apple", а про decision-ready narrative. Не меняю структуру, но визуальная иерархия уже улучшена другими агентами через section counters и dividers.

**2.2 Sticky-навигация mask** — ЧАСТИЧНО СОГЛАСЕН. Mask-image — осознанный UX-паттерн для обрезки длинных списков. На мобильных навигация становится static — это корректно для scroll-heavy page. Не меняю.

**2.3 Нет индикации текущей секции (scroll spy)** — СОГЛАСЕН, но реализация scroll spy требует client-side component со значительным объёмом кода. Это feature, а не fix. Не реализую в рамках задачи.

**2.4 Нет прогресс-бара** — НЕ СОГЛАСЕН. Progress bar необязателен для лонгрида. Section navigation + section counters достаточно.

**2.5 Все интерактивы одинаковы** — ЧАСТИЧНО СОГЛАСЕН. Это design system consistency, а не баг. Единообразие — преимущество, а не недостаток.

**2.7 Нет анимации переключения табов** — ЧАСТИЧНО СОГЛАСЕН. Transition при смене таба — nice-to-have. Не реализую в рамках задачи — требует значительных CSS/JS изменений.

**2.8 Двуязычный хаос** — ЧАСТИЧНО СОГЛАСЕН. Это осознанный стиль проекта: русский narrative + английская терминология (как в реальной урбанистике). Глоссарий — feature, не fix.

**2.9 Footer не информативен** — ЧАСТИЧНО СОГЛАСЕН. Для concept-проекта FooterPortal достаточен. Контакты и social links — business-решение.

---

### 3. Код (3.1-3.11)

**3.1 Нет тестов** — СОГЛАСЕН, но это infrastructure-задача вне scope текущего fix.

**3.2 Нет error boundaries** — СОГЛАСЕН, но SSG pre-renders все страницы. Ошибки в данных ловятся build.mjs. Error boundaries нужны только для client-side interactivity, и там данные статичны.

**3.5 Дублирование навигации** — УЖЕ ИЗВЕСТНО (code-tester P2). Не рефакторю — риск конфликта с другими агентами.

**3.6 CountUp regex на каждый рендер** — ЧАСТИЧНО СОГЛАСЕН. Мемоизация через useMemo возможна, но `value` обычно не меняется. Не критично.

**3.7 IntersectionObserver leak** — ИСПРАВЛЕНО другим агентом (cancelled flag добавлен).

**3.8 guessSceneType** — ЧАСТИЧНО СОГЛАСЕН. Эвристика хрупкая, но адекватна для текущего объёма данных. Не меняю.

---

### 5. Accessibility (5.1-5.8)

**5.1 Skip-to-content** — СОГЛАСЕН.

**Действие:** ДОБАВЛЕН skip-link в layout.tsx + CSS стили. Все 4 страницы получили `id="main-content"`.

**5.3 Color contrast** — ИСПРАВЛЕНО другим агентом (rgba(255,255,255,0.58) уже заменён).

**5.4 Pill-grid без keyboard navigation** — СОГЛАСЕН.

**Действие:** СОЗДАН компонент `PillGrid` с полной keyboard navigation (Arrow keys, Home, End, tabIndex management). Заменены все 3 использования inline pill-grid (MasterplanExplorer, PersonaRoutesExplorer, RulebookOverlay).

**5.5 Broken aria-controls** — ИСПРАВЛЕНО другим агентом (tabIndex добавлен в SegmentedTabs).

**5.8 prefers-reduced-motion** — ЧАСТИЧНО ИСПРАВЛЕНО другим агентом.

**Действие:** РАСШИРЕНО покрытие prefers-reduced-motion: добавлены masthead-particles, visual-frame transitions, button-primary::after. Консолидированы дублирующиеся правила.

---

### 6. Performance (6.1-6.5)

**6.1 Gradient mesh** — prefers-reduced-motion уже покрывает. GPU drain — корректный для desktop. Не меняю.

**6.3 Все SVG рендерятся сразу** — ЧАСТИЧНО СОГЛАСЕН. Lazy loading через next/dynamic — feature-задача. ScrollReveal уже обеспечивает progressive reveal.

---

### 7. Архитектурные проблемы (7.1-7.6)

**7.6 Дублированный layout** — СОГЛАСЕН, но не рефакторю backdrop в layout: это потребует изменения 4 страниц одновременно с риском конфликта с другими агентами.

---

### 8. Дизайн-система (8.1-8.6)

**8.1 Неиспользуемые CSS-классы** — СОГЛАСЕН.

**Действие:** УДАЛЕНЫ: `.full-bleed`, `.pull-quote`, `.pull-quote-muted`, `.stroke-draw`, `.is-visible .stroke-draw`, `.stroke-draw.is-drawn`, `.section-immersive` (3 правила), `.metric-hero-bar` (3 правила + mobile override).

**8.2-8.6 Naming, spacing, border-radius inconsistency** — ЧАСТИЧНО СОГЛАСЕН. Это дизайн-система issue. Решение требует полного рефакторинга CSS, что вне scope.

---

### 9. NuclearSummerGraphic stacked bars (из code-tester)

**СОГЛАСЕН.** Промежуточные сегменты с `rx="0"` визуально некрасивы.

**Действие:** ИСПРАВЛЕНО через clipPath на общем контейнере вместо индивидуальных rx на каждом rect.

---

## Сводка исправлений

| # | Что сделано | Файлы |
|---|------------|-------|
| 1 | Skip-to-content ссылка | layout.tsx, globals.css |
| 2 | id="main-content" на всех страницах | page.tsx, versions/page.tsx, machines/page.tsx, appendix/page.tsx |
| 3 | PillGrid с keyboard navigation (Arrow, Home, End, tabIndex) | atlas-interactives.tsx |
| 4 | Удалены неиспользуемые CSS-классы (pull-quote, full-bleed, stroke-draw, section-immersive, metric-hero-bar) | globals.css |
| 5 | Расширен prefers-reduced-motion (masthead-particles, transitions) | globals.css |
| 6 | NuclearSummerGraphic stacked bars clipPath fix | machine-cutaway.tsx |

## Статус билда

`npm run build` — **PASSED** (TypeScript compiled, static pages generated: /, /appendix, /machines, /versions).
