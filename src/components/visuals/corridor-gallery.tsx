import type { ClimateModeId } from "@/data/atlas";

/**
 * Сеть крытых тёплых галерей (12 км) — план вида сверху.
 * Стеклянные своды между зданиями, тёплый свет внутри, снег/ветер снаружи.
 */

const palette: Record<ClimateModeId, {
  bg: string; ground: string; gallery: string; galleryGlow: string;
  glass: string; building: string; buildingDark: string;
  text: string; accent: string; snow: string;
}> = {
  winter: {
    bg: "#0a1520", ground: "#1a2e42", gallery: "#f0c27f",
    galleryGlow: "rgba(240,194,127,0.25)", glass: "#3b82f6",
    building: "#2a4a68", buildingDark: "#1a3248",
    text: "#eef4f6", accent: "#f0c27f", snow: "#c8d8e8",
  },
  summer: {
    bg: "#0e1e1a", ground: "#1e3a28", gallery: "#8ec48d",
    galleryGlow: "rgba(142,196,141,0.2)", glass: "#6aad5a",
    building: "#2e5040", buildingDark: "#1e3a2e",
    text: "#eef6ef", accent: "#8ec48d", snow: "#c8d8b8",
  },
  blizzard: {
    bg: "#0c1828", ground: "#18304a", gallery: "#9fc3da",
    galleryGlow: "rgba(159,195,218,0.25)", glass: "#5a9ab5",
    building: "#3a5a78", buildingDark: "#2a4262",
    text: "#f3f9fc", accent: "#9fc3da", snow: "#e8eef4",
  },
  heat: {
    bg: "#1e1410", ground: "#2e2218", gallery: "#ef9461",
    galleryGlow: "rgba(239,148,97,0.2)", glass: "#d97a4a",
    building: "#5a4030", buildingDark: "#3a2a20",
    text: "#fff4ec", accent: "#ef9461", snow: "#dac8a8",
  },
};

// Quarters positioned around the central cathedral
const quarters = [
  { id: "north",      cx: 300, cy: 90  },
  { id: "east",       cx: 480, cy: 215 },
  { id: "south-east", cx: 440, cy: 380 },
  { id: "south",      cx: 260, cy: 440 },
  { id: "west",       cx: 110, cy: 330 },
  { id: "north-west", cx: 120, cy: 170 },
];

// Gallery routes connecting quarters through the central hub
const galleryRoutes: Array<{ from: number; to: number; label: string }> = [
  { from: 0, to: 1, label: "2.1 км" },
  { from: 1, to: 2, label: "1.8 км" },
  { from: 2, to: 3, label: "1.6 км" },
  { from: 3, to: 4, label: "2.0 км" },
  { from: 4, to: 5, label: "1.9 км" },
  { from: 5, to: 0, label: "2.6 км" },
];

// Building footprints near each quarter
const buildingClusters: Array<Array<{ dx: number; dy: number; w: number; h: number }>> = [
  [{ dx: -22, dy: -14, w: 18, h: 12 }, { dx: 6, dy: -18, w: 14, h: 16 }, { dx: -16, dy: 6, w: 20, h: 10 }],
  [{ dx: -20, dy: -12, w: 16, h: 14 }, { dx: 4, dy: -16, w: 18, h: 12 }, { dx: -10, dy: 6, w: 14, h: 12 }],
  [{ dx: -18, dy: -14, w: 14, h: 12 }, { dx: 2, dy: -12, w: 16, h: 14 }, { dx: -14, dy: 4, w: 18, h: 10 }],
  [{ dx: -22, dy: -12, w: 18, h: 10 }, { dx: 4, dy: -16, w: 14, h: 14 }, { dx: -10, dy: 4, w: 16, h: 12 }],
  [{ dx: -16, dy: -16, w: 14, h: 14 }, { dx: 4, dy: -12, w: 16, h: 10 }, { dx: -18, dy: 4, w: 20, h: 12 }],
  [{ dx: -20, dy: -14, w: 16, h: 12 }, { dx: 2, dy: -18, w: 14, h: 16 }, { dx: -12, dy: 4, w: 18, h: 10 }],
];

export function CorridorGalleryGraphic({ mode }: { mode: ClimateModeId }) {
  const p = palette[mode];
  const isWinter = mode === "winter" || mode === "blizzard";
  const center = { x: 290, y: 265 };

  return (
    <svg viewBox="0 0 580 520" role="img" aria-labelledby="corridor-gallery-title">
      <title id="corridor-gallery-title">
        Сеть крытых тёплых галерей: 12 км стеклянных переходов между кварталами
      </title>

      <defs>
        <radialGradient id={`cg-bg-${mode}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={p.ground} />
          <stop offset="100%" stopColor={p.bg} />
        </radialGradient>
        <radialGradient id={`cg-glow-${mode}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.gallery} stopOpacity="0.5" />
          <stop offset="100%" stopColor={p.gallery} stopOpacity="0" />
        </radialGradient>
        <filter id="cg-blur">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="cg-glow-f">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="580" height="520" rx="32" fill={`url(#cg-bg-${mode})`} />

      {/* Subtle ground ellipse */}
      <ellipse cx={center.x} cy={center.y} rx="240" ry="210" fill={p.ground} opacity="0.3" />

      {/* Gallery route glow layer (behind everything) */}
      {galleryRoutes.map((route, i) => {
        const from = quarters[route.from];
        const to = quarters[route.to];
        return (
          <line
            key={`glow-${i}`}
            x1={from.cx} y1={from.cy}
            x2={to.cx} y2={to.cy}
            stroke={p.gallery}
            strokeWidth="14"
            opacity="0.08"
            strokeLinecap="round"
            filter="url(#cg-blur)"
          />
        );
      })}

      {/* Gallery routes — main lines */}
      {galleryRoutes.map((route, i) => {
        const from = quarters[route.from];
        const to = quarters[route.to];
        const mx = (from.cx + to.cx) / 2;
        const my = (from.cy + to.cy) / 2;
        return (
          <g key={`route-${i}`}>
            {/* Glass envelope */}
            <line
              x1={from.cx} y1={from.cy}
              x2={to.cx} y2={to.cy}
              stroke={p.galleryGlow}
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Steel frame */}
            <line
              x1={from.cx} y1={from.cy}
              x2={to.cx} y2={to.cy}
              stroke={p.glass}
              strokeWidth="2.5"
              strokeOpacity="0.5"
              strokeLinecap="round"
            />
            {/* Warm light inside */}
            <line
              x1={from.cx} y1={from.cy}
              x2={to.cx} y2={to.cy}
              stroke={p.gallery}
              strokeWidth="1.5"
              strokeOpacity="0.8"
              strokeLinecap="round"
              strokeDasharray={isWinter ? "0" : "6 4"}
            />
            {/* Distance label */}
            <text
              x={mx}
              y={my - 8}
              textAnchor="middle"
              fontSize="7"
              fill={p.gallery}
              opacity="0.7"
            >
              {route.label}
            </text>
          </g>
        );
      })}

      {/* Building clusters at each quarter */}
      {quarters.map((q, qi) => (
        <g key={`q-${q.id}`}>
          {buildingClusters[qi].map((b, bi) => (
            <rect
              key={`b-${qi}-${bi}`}
              x={q.cx + b.dx}
              y={q.cy + b.dy}
              width={b.w}
              height={b.h}
              rx="3"
              fill={p.building}
              stroke={p.buildingDark}
              strokeWidth="1"
              opacity="0.7"
            />
          ))}
          {/* Windows on buildings */}
          {buildingClusters[qi].map((b, bi) => {
            const wx = q.cx + b.dx + 3;
            const wy = q.cy + b.dy + 3;
            return (
              <g key={`w-${qi}-${bi}`}>
                <rect x={wx} y={wy} width="3" height="3" rx="0.5" fill={p.gallery} opacity={0.25 + (bi % 3) * 0.1} />
                <rect x={wx + 5} y={wy} width="3" height="3" rx="0.5" fill={p.gallery} opacity={0.2 + (bi % 2) * 0.1} />
                {b.h > 11 && (
                  <rect x={wx} y={wy + 5} width="3" height="3" rx="0.5" fill={p.gallery} opacity={0.15 + (bi % 3) * 0.1} />
                )}
              </g>
            );
          })}
        </g>
      ))}

      {/* Gallery junction nodes at each quarter */}
      {quarters.map((q) => (
        <g key={`node-${q.id}`}>
          <circle cx={q.cx} cy={q.cy} r="8" fill={p.gallery} opacity="0.15" filter="url(#cg-glow-f)" />
          <circle cx={q.cx} cy={q.cy} r="5" fill={p.bg} stroke={p.gallery} strokeWidth="1.5" />
          <circle cx={q.cx} cy={q.cy} r="2" fill={p.gallery} opacity="0.8" />
        </g>
      ))}

      {/* Central cathedral node */}
      <circle cx={center.x} cy={center.y} r="20" fill={`url(#cg-glow-${mode})`} />
      <circle cx={center.x} cy={center.y} r="12" fill={p.bg} stroke={p.gallery} strokeWidth="2" />
      <circle cx={center.x} cy={center.y} r="5" fill={p.gallery} opacity="0.7" />

      {/* Hub spokes — from center to each quarter */}
      {quarters.map((q, i) => (
        <line
          key={`spoke-${i}`}
          x1={center.x} y1={center.y}
          x2={q.cx} y2={q.cy}
          stroke={p.gallery}
          strokeWidth="1"
          strokeOpacity="0.2"
          strokeDasharray="4 6"
        />
      ))}

      {/* Quarter labels */}
      {quarters.map((q) => {
        const label = {
          north: "Север", east: "Восток", "south-east": "ЮВ",
          south: "Юг", west: "Запад", "north-west": "СЗ",
        }[q.id] ?? q.id;
        const labelY = q.cy > center.y ? q.cy + 28 : q.cy - 24;
        return (
          <text
            key={`label-${q.id}`}
            x={q.cx}
            y={labelY}
            textAnchor="middle"
            fontSize="9"
            fill={p.text}
            opacity="0.6"
            letterSpacing="0.1em"
          >
            {label}
          </text>
        );
      })}

      {/* Blizzard / winter snow particles */}
      {isWinter && (
        <g opacity="0.25">
          {Array.from({ length: 30 }).map((_, i) => (
            <circle
              key={`snow-${i}`}
              cx={25 + (i * 131) % 530}
              cy={15 + (i * 83) % 490}
              r={1 + (i % 3) * 0.5}
              fill={p.snow}
              opacity={0.3 + (i % 4) * 0.15}
            />
          ))}
        </g>
      )}

      {/* Wind streaks for blizzard */}
      {mode === "blizzard" && (
        <g opacity="0.12">
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`wind-${i}`}
              x1={20 + (i * 97) % 500}
              y1={30 + (i * 67) % 440}
              x2={50 + (i * 97) % 500}
              y2={35 + (i * 67) % 440}
              stroke="white"
              strokeWidth="0.6"
            />
          ))}
        </g>
      )}

      {/* Title */}
      <text x="290" y="28" textAnchor="middle" fontSize="10" fill={p.text} letterSpacing="0.15em" opacity="0.6">
        {isWinter ? "12 КМ КРЫТЫХ ТЁПЛЫХ ГАЛЕРЕЙ" : "12 КМ ТЕНЕВЫХ МАРШРУТОВ"}
      </text>

      {/* Legend */}
      <g transform="translate(40, 490)">
        <line x1="0" y1="0" x2="20" y2="0" stroke={p.gallery} strokeWidth="2.5" opacity="0.8" />
        <text x="26" y="4" fontSize="8" fill={p.text} opacity="0.5">Крытая галерея</text>
        <line x1="130" y1="0" x2="150" y2="0" stroke={p.gallery} strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
        <text x="156" y="4" fontSize="8" fill={p.text} opacity="0.5">Связь с ядром</text>
        <circle cx="290" cy="0" r="4" fill={p.bg} stroke={p.gallery} strokeWidth="1.5" />
        <text x="300" y="4" fontSize="8" fill={p.text} opacity="0.5">Узел-вход</text>
      </g>
    </svg>
  );
}
