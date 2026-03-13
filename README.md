# Тепловое Кольцо

Русский статический микросайт на `Next.js` про концепт нового холодноклиматического района на краю Астаны.

## Что внутри

- лонгрид с 8 секциями и data-driven SVG-визуалами
- отдельный print-friendly `appendix`
- typed-данные в [`src/data/concept.ts`](./src/data/concept.ts)
- static export через `next build`

## Запуск

```bash
source ~/.nvm/nvm.sh
nvm use 24.14.0
npm install
npm run dev
```

## Сборка

```bash
source ~/.nvm/nvm.sh
nvm use 24.14.0
npm run build
```

Статический результат появляется в `out/`.

## Структура

- `src/app/page.tsx` — основной лонгрид
- `src/app/appendix/page.tsx` — printable appendix
- `src/components/visuals.tsx` — все обязательные SVG-схемы
- `src/components/site-blocks.tsx` — повторно используемые контентные блоки
- `src/data/concept.ts` — все параметры района, правила, CAPEX и ссылки на benchmark-источники
