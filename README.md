# Тепловое Кольцо

Русский статический atlas-site на `Next.js` про семейство климатических городских сценариев для холодного климата.

## Что внутри

- главная flagship-история на `/`
- лаборатория версий на `/versions/`
- лаборатория климатических машин на `/machines/`
- print-friendly provenance appendix на `/appendix/`
- structured content в [`content/`](./content/)
- typed data-layer в [`src/data/atlas.ts`](./src/data/atlas.ts)
- prebuild validation через `npm run atlas:check`
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
npm run atlas:check
npm run build
```

Статический результат появляется в `out/`.

## Структура

- `content/*.json` — source of truth для версий, машин, метрик, claims, правил и персонажей
- `src/data/atlas.ts` — typed data-layer и derived helpers
- `src/app/page.tsx` — flagship-longread
- `src/app/versions/page.tsx` — compare-страница для версий развития
- `src/app/machines/page.tsx` — compare-страница для machine scenarios
- `src/app/appendix/page.tsx` — методика, provenance, таблицы и печать
- `src/components/atlas-ui.tsx` — shared editorial UI и trust-компоненты
- `src/components/atlas-interactives.tsx` — client-side интерактивы
- `src/components/atlas-visuals.tsx` — SVG-atlas visuals
- `scripts/build.mjs` — prebuild validation контента
