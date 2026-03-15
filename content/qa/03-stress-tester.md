# 03 — Стресс-тестирование продукта

**Проект:** Project Totoro (Next.js 16, статический сайт)
**Дата:** 2026-03-15
**Тестировщик:** Тестировщик-виртуоз (стресс)
**Среда:** localhost:3000, Playwright, macOS

---

## 1. Extreme Viewports

Протестировано 7 разрешений: 320px, 375px, 768px, 1024px, 1440px, 1920px, 2560px.

### Горизонтальный overflow

| Viewport | Overflow | Детали |
|----------|----------|--------|
| 320px | **ДА** | `document.scrollWidth > clientWidth`. Элементы `<A>` в `.section-links` вылезают за viewport (до 1321px right при bodyWidth 320px). |
| 375px | Нет (документ) | Но внутренние элементы `.section-links` выходят за body (до 1321px). Скрыты через `overflow-x: auto` на контейнере. |
| 768px | Нет | Чисто. |
| 1024px | Нет | Чисто. |
| 1440px | Нет | Чисто. |
| 1920px | Нет | Чисто. |
| 2560px | Нет | Контент ограничен `max-width: 1320px`, центрирован. |

### Проблемы по viewport

**320px — severity: HIGH**
- Горизонтальный скролл всей страницы. `.section-links` с `flex-wrap: nowrap` и множеством ссылок создаёт полосу прокрутки для всего документа. Контейнер имеет `overflow-x: auto`, но на 320px маска `mask-image` обрезает последний элемент, а сам контейнер расширяет body.
- Скриншот: `screenshots/stress-320px.png`

**375px — severity: LOW**
- Внутренние элементы `.section-links` выходят за body, но `overflow-x: auto` скрывает их. Функционально работает, визуально чисто.

**768px — severity: INFO**
- Грид-колонки переключаются на 1-колоночный layout (`@media max-width: 780px` и `max-width: 1120px`). Transition плавный, ничего не ломается.

**1024px — severity: OK**
- Переходная зона между mobile и desktop layout. Работает корректно.

**2560px — severity: INFO**
- На сверхшироких мониторах контент центрирован, но фоновые `radial-gradient` на `body` и `.gradient-mesh` не покрывают весь экран равномерно — видны тёмные зоны по краям. Это не баг, но на ultra-wide выглядит пустовато.

---

## 2. Rapid Interactions (SegmentedTabs)

### Machines page
- **Тест:** 30 быстрых переключений между M1/M2/M3 (10 циклов) + 30 быстрых переключений режимов Зима/Межсезонье/Лето.
- **Результат:** 60 кликов за 1336ms. Страница осталась responsive. **0 JS-ошибок.**
- React state обновляется корректно, SVG-графики перерисовываются без артефактов.

### Versions page
- **Тест:** 60 быстрых переключений V1/V2/V3/V4 (15 циклов).
- **Результат:** 60 кликов за 999ms. Страница осталась responsive. **0 JS-ошибок.**
- Скриншот после стресса: `screenshots/stress-rapid-tabs.png`

### Вердикт: PASS
- Табы не используют анимации transition между состояниями (мгновенное переключение React state), поэтому rapid clicking не вызывает визуальных glitches.
- Нет race conditions, нет memory leaks при быстром переключении.

---

## 3. JS Disabled

### Проблема: severity CRITICAL

**ScrollReveal скрывает весь контент ниже hero при отключённом JS.**

- CSS-класс `.scroll-reveal` имеет `opacity: 0; transform: translateY(24px)`.
- Класс `.is-visible` добавляется JavaScript-ом через IntersectionObserver.
- Если JS выключен, IntersectionObserver не работает, и **12 из 12 ScrollReveal-обёрток остаются невидимыми** (`opacity: 0`).
- Пользователь видит только hero-секцию и пустую страницу ниже.

**Что видно без JS:**
- Header (навигация, hero-dial визуально работает как статичный SVG, но табы не переключаются)
- MetricStrip (если он вне ScrollReveal)
- SectionLinks

**Что НЕ видно:**
- Все секции: story, failure, real, masterplan, personas, machine, summer, flourishing, rulebook, risks, costs
- Footer

**Рекомендация:** Добавить CSS fallback:
```css
@media (scripting: none) {
  .scroll-reveal {
    opacity: 1 !important;
    transform: none !important;
  }
}
```
Или использовать `<noscript>` стилизацию.

---

## 4. Print Mode

### Что работает хорошо
- CSS `@media print` корректно скрывает: `.page-backdrop`, `.site-topline`, `.section-links`, `.atlas-footer`, `.appendix-actions`, `.gradient-mesh`, `.hero-particles`, `.section-divider`
- Body background переключается на белый (`#ffffff`), текст на чёрный (`#000000`)
- ScrollReveal переопределяется: `opacity: 1 !important; transform: none !important`
- `page-break-inside: avoid` на секциях

### Проблемы: severity MEDIUM

1. **Тёмный фон секций не полностью убирается.** CSS устанавливает `background: #ffffff` для `.home-hero-shell`, `.page-masthead`, `.atlas-section`, но `::before` pseudo-element с полупрозрачным gradient (`linear-gradient(135deg, rgba(255,255,255,0.05)...)`) не отключён в print. На экране это создаёт тёмный overlay поверх белого фона. Скриншот: `screenshots/stress-print-appendix.png`

2. **Muted text слишком бледный при печати.** Описания секций (`.section-intro p`, `.reason-card p` и т.д.) переключаются на `color: #2d2d2d`, но это всё ещё может быть слишком бледным при чёрно-белой печати.

3. **SVG-графики с тёмным фоном.** Все SVG-визуализации имеют `fill="#0f1d2d"` или `fill="#13202e"` rect-фоны. При печати они остаются тёмными, что тратит много чернил.

4. **Source disclosure summary скрыт** (`display: none`), но тело disclosure не раскрыто. При печати источники не видны. Нужно либо раскрывать все `<details>` в print, либо скрывать целиком.

5. **Eyebrow badges** сохраняют полупрозрачные цветные фоны (`rgba(240,194,127,0.18)`), которые на белом фоне плохо читаются.

---

## 5. Performance

### DOM Tree
| Метрика | Значение | Оценка |
|---------|----------|--------|
| Всего DOM-элементов | 1859 | Нормально (Google рекомендует < 1500, но 1859 приемлемо) |
| Max DOM depth | 12 | Хорошо (< 32 рекомендация) |
| SVG-элементов | 970 | **52% от всего DOM** — тяжело |
| CSS-правил | 210 | Отлично (один globals.css) |
| Интерактивных элементов | 42 | Нормально |

### Анимации
| Метрика | Значение | Оценка |
|---------|----------|--------|
| Активных анимаций | 20 | Многовато для одной страницы |
| Потенциальный layout thrashing | 11 | **Проблема** |

### Layout Thrashing — severity: MEDIUM

Обнаружены анимации свойства `left` на элементах `.eyebrow`:
```css
.eyebrow::after {
  animation: eyebrow-shimmer 6s ease-in-out infinite;
}
@keyframes eyebrow-shimmer {
  0%, 100% { left: -100%; }
  50% { left: 200%; }
}
```

Анимация `left` вызывает layout recalculation на каждом кадре. Каждый `.eyebrow` на странице (их минимум 11) создаёт отдельную анимацию. Рекомендуется заменить на `transform: translateX()` для GPU-ускоренной анимации:

```css
@keyframes eyebrow-shimmer {
  0%, 100% { transform: translateX(-200%); }
  50% { transform: translateX(400%); }
}
```

### SVG-нагрузка — severity: LOW

970 SVG-элементов из 1859 DOM-элементов (52%). Все графики -- inline SVG. Это увеличивает:
- Размер HTML-документа
- Время парсинга DOM
- Объём памяти

Но поскольку SVG-графики декларативные (нет JS-анимаций внутри), реальное влияние на производительность невелико.

### Другие анимации
- `gradient-mesh`: анимация `background-position` (60s infinite) — безопасно, GPU-ускорено
- `hero-particles::before/::after`: анимация `transform` — безопасно, GPU-ускорено
- `section-divider-glow`: анимация `opacity` — безопасно
- SVG-анимации (`tram-dash`, `ring-pulse`): `stroke-dashoffset` и `stroke-opacity` — безопасно

---

## 6. Memory: IntersectionObserver Cleanup

### Анализ кода

**ScrollReveal** (`atlas-interactives.tsx:35-75`):
```typescript
useEffect(() => {
  const el = ref.current;
  if (!el) return;
  const observer = new IntersectionObserver(...);
  observer.observe(el);
  return () => observer.disconnect(); // CLEANUP: корректно
}, [threshold]);
```
- `observer.unobserve(el)` вызывается при `isIntersecting` (одноразовое срабатывание)
- `observer.disconnect()` в cleanup useEffect
- **Вердикт: PASS** — корректная очистка

**CountUp** (`atlas-interactives.tsx:99-137`):
```typescript
useEffect(() => {
  const el = ref.current;
  if (!el || !isAnimatable) return;
  const observer = new IntersectionObserver(...);
  observer.observe(el);
  return () => observer.disconnect(); // CLEANUP: корректно
}, [value, duration, targetNum, isAnimatable, restStr]);
```
- `observer.unobserve(el)` при первом срабатывании
- `observer.disconnect()` в cleanup
- **Вердикт: PASS** — корректная очистка

### Потенциальная проблема: severity: LOW

CountUp имеет зависимости `[value, duration, targetNum, isAnimatable, restStr]` в useEffect. Если `value` изменится (например, при hot reload), создаётся новый observer, но предыдущий корректно отключается через cleanup. Однако `hasRun.current` ref не сбрасывается при re-run эффекта — анимация не перезапустится.

---

## 7. Edge Cases

### Пустые данные / отсутствующие source IDs

**getSourceLinks** (`atlas.ts:307-309`):
```typescript
export function getSourceLinks(sourceIds: string[]) {
  return sourceIds.map((sourceId) => sourcesById[sourceId]).filter(Boolean);
}
```
- Несуществующие sourceIds возвращают `undefined`, `filter(Boolean)` их удаляет
- Если все IDs невалидны, `SourceDisclosure` возвращает `null` (пустой массив -> `if (!sources.length) return null`)
- **Вердикт: SAFE** — тихое игнорирование. Нет crash, нет ошибок. Но также нет предупреждений в dev-режиме.

### Очень длинные строки

- Тест на overflow длинных текстов (>200 символов): **0 элементов с overflow**
- CSS использует `overflow-wrap: break-word`, `word-break: break-word`, `hyphens: auto` на h1 в мобильном breakpoint
- Таблицы в appendix: горизонтальный скролл корректно работает через `.table-shell` с `overflow-x: auto`

### Таблицы appendix на мобильных

Все 6 таблиц имеют горизонтальный скролл на 375px:

| Таблица | scrollWidth | clientWidth | Ratio |
|---------|-------------|-------------|-------|
| Metrics | 897px | 311px | 2.9x |
| Claims | 905px | 311px | 2.9x |
| Versions | 809px | 311px | 2.6x |
| Machines | 930px | 311px | 3.0x |
| Rulebook | 1031px | 311px | 3.3x |
| Phasing | 568px | 311px | 1.8x |

CSS хинт `scroll ->` показывается на `max-width: 780px`. Функционально работает корректно. severity: INFO — ожидаемое поведение для data tables.

### Console Errors

Проверены все 4 страницы (`/`, `/versions/`, `/machines/`, `/appendix/`) с полной прокруткой:
- **0 console errors**
- **0 page errors**

---

## Сводка проблем

| # | Проблема | Severity | Где |
|---|----------|----------|-----|
| 1 | ScrollReveal скрывает контент при JS disabled | **CRITICAL** | Все страницы |
| 2 | Горизонтальный overflow на 320px (section-links) | **HIGH** | Главная страница |
| 3 | Print: тёмный фон секций не убирается (::before pseudo) | **MEDIUM** | Все страницы |
| 4 | Print: SVG-графики с тёмным фоном тратят чернила | **MEDIUM** | Все страницы |
| 5 | Print: source-disclosure summary скрыт, контент тоже | **MEDIUM** | Все страницы |
| 6 | Layout thrashing: анимация `left` на `.eyebrow` (x11) | **MEDIUM** | Все страницы |
| 7 | Print: eyebrow badges плохо читаются на белом фоне | **LOW** | Все страницы |
| 8 | 970 SVG-элементов (52% DOM) на главной | **LOW** | Главная |
| 9 | CountUp hasRun ref не сбрасывается при value change | **LOW** | Главная |
| 10 | Отсутствующие sourceIds молча игнорируются (нет dev warning) | **INFO** | Все страницы |
| 11 | Таблицы appendix требуют горизонтальный скролл на mobile | **INFO** | Appendix |
| 12 | На 2560px боковые зоны пустоваты | **INFO** | Все страницы |

### Что прошло без проблем
- Rapid tab switching (120 кликов, 0 ошибок)
- IntersectionObserver cleanup (корректный disconnect в обоих компонентах)
- Нет console errors на всех страницах
- Нет горизонтального overflow на viewport >= 375px
- Грид-система корректно адаптируется на всех breakpoints
- Max DOM depth = 12 (хорошо)
- CSS-правил всего 210 (отлично)
