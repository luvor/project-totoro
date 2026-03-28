import type { ClimateModeId } from "@/data/atlas";

/**
 * Трамвайный коридор 9.6 км — кольцевая линия с остановками.
 * Вид сверху (план), рельсы, остановки, трамваи.
 */

const palette: Record<ClimateModeId, {
  bg: string; ground: string; rail: string; railGlow: string;
  tram: string; tramWindow: string; stop: string;
  building: string; text: string; accent: string;
}> = {
  winter: {
    bg: "#0a1520", ground: "#1a2e42", rail: "#4a6a8a",
    railGlow: "rgba(6,182,212,0.12)", tram: "#06b6d4",
    tramWindow: "#f0c27f", stop: "#f0c27f",
    building: "#2a4a68", text: "#eef4f6", accent: "#f0c27f",
  },
  summer: {
    bg: "#0e1e1a", ground: "#1e3a28", rail: "#3a6a4a",
    railGlow: "rgba(106,173,90,0.1)", tram: "#5aad5a",
    tramWindow: "#8ec48d", stop: "#8ec48d",
    building: "#2e5040", text: "#eef6ef", accent: "#8ec48d",
  },
  blizzard: {
    bg: "#0c1828", ground: "#18304a", rail: "#5a7a9a",
    railGlow: "rgba(90,154,181,0.12)", tram: "#5a9ab5",
    tramWindow: "#9fc3da", stop: "#9fc3da",
    building: "#3a5a78", text: "#f3f9fc", accent: "#9fc3da",
  },
  heat: {
    bg: "#1e1410", ground: "#2e2218", rail: "#6a5040",
    railGlow: "rgba(239,148,97,0.1)", tram: "#d97a4a",
    tramWindow: "#ef9461", stop: "#ef9461",
    building: "#5a4030", text: "#fff4ec", accent: "#ef9461",
  },
};

const tramLoopPath =
  "M 290 70 C 420 55, 510 120, 520 200 C 530 290, 510 360, 470 410 C 420 465, 340 490, 290 490 C 230 490, 155 460, 110 410 C 70 360, 55 280, 65 200 C 75 120, 160 58, 290 70 Z";

const stops = [
  { x: 290, y: 66,  label: "Север",  people: 3 },
  { x: 522, y: 198, label: "Восток", people: 2 },
  { x: 472, y: 412, label: "ЮВ",     people: 2 },
  { x: 290, y: 492, label: "Юг",     people: 3 },
  { x: 108, y: 412, label: "Запад",  people: 2 },
  { x: 63,  y: 198, label: "СЗ",     people: 2 },
];

// Tram positions along the loop (approximate)
const trams = [
  { x: 420, y: 90,  angle: 20 },
  { x: 530, y: 310, angle: 95 },
  { x: 190, y: 485, angle: 175 },
];

// Building silhouettes near stops
const buildingGroups: Array<Array<{ dx: number; dy: number; w: number; h: number }>> = [
  [{ dx: -30, dy: -35, w: 16, h: 12 }, { dx: 14, dy: -38, w: 12, h: 14 }],
  [{ dx: 18, dy: -20, w: 14, h: 16 }, { dx: 18, dy: 4, w: 12, h: 12 }],
  [{ dx: 14, dy: 14, w: 16, h: 12 }, { dx: -8, dy: 18, w: 14, h: 10 }],
  [{ dx: -20, dy: 16, w: 18, h: 12 }, { dx: 8, dy: 18, w: 12, h: 14 }],
  [{ dx: -34, dy: -10, w: 14, h: 14 }, { dx: -34, dy: 10, w: 12, h: 12 }],
  [{ dx: -36, dy: -16, w: 16, h: 12 }, { dx: -32, dy: 4, w: 12, h: 14 }],
];

export function CorridorTransportGraphic({ mode }: { mode: ClimateModeId }) {
  const p = palette[mode];
  const isWinter = mode === "winter" || mode === "blizzard";

  return (
    <svg viewBox="0 0 580 560" role="img" aria-labelledby="corridor-transport-title">
      <title id="corridor-transport-title">
        Трамвайный коридор: кольцевая линия 9.6 км с 6 остановками
      </title>

      <defs>
        <radialGradient id={`ct-bg-${mode}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={p.ground} />
          <stop offset="100%" stopColor={p.bg} />
        </radialGradient>
        <radialGradient id={`ct-core-${mode}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.accent} stopOpacity="0.4" />
          <stop offset="100%" stopColor={p.accent} stopOpacity="0" />
        </radialGradient>
        <filter id="ct-glow">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id="ct-rail-glow">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="580" height="560" rx="32" fill={`url(#ct-bg-${mode})`} />

      {/* Ground ellipse */}
      <ellipse cx="290" cy="280" rx="250" ry="230" fill={p.ground} opacity="0.2" />

      {/* Rail glow */}
      <path
        d={tramLoopPath}
        fill="none"
        stroke={p.railGlow}
        strokeWidth="20"
        filter="url(#ct-rail-glow)"
      />

      {/* Rail tracks — outer */}
      <path
        d={tramLoopPath}
        fill="none"
        stroke={p.rail}
        strokeWidth="4"
        strokeOpacity="0.4"
      />
      {/* Rail tracks — inner dashed */}
      <path
        d={tramLoopPath}
        fill="none"
        stroke={p.tram}
        strokeWidth="2"
        strokeDasharray={isWinter ? "8 6" : "12 8"}
        strokeOpacity="0.6"
      />

      {/* Distance markers along the track */}
      <text x="420" y="80" fontSize="7" fill={p.tram} opacity="0.5" textAnchor="middle">2.4 км</text>
      <text x="530" y="310" fontSize="7" fill={p.tram} opacity="0.5" textAnchor="middle">1.6 км</text>
      <text x="400" y="470" fontSize="7" fill={p.tram} opacity="0.5" textAnchor="middle">1.4 км</text>
      <text x="190" y="500" fontSize="7" fill={p.tram} opacity="0.5" textAnchor="middle">1.8 км</text>
      <text x="68" y="320" fontSize="7" fill={p.tram} opacity="0.5" textAnchor="middle">1.6 км</text>
      <text x="140" y="100" fontSize="7" fill={p.tram} opacity="0.5" textAnchor="middle">0.8 км</text>

      {/* Building silhouettes near stops */}
      {stops.map((stop, si) => (
        <g key={`bg-${si}`}>
          {buildingGroups[si].map((b, bi) => (
            <rect
              key={`b-${si}-${bi}`}
              x={stop.x + b.dx}
              y={stop.y + b.dy}
              width={b.w}
              height={b.h}
              rx="2"
              fill={p.building}
              opacity="0.4"
            />
          ))}
        </g>
      ))}

      {/* Trams */}
      {trams.map((tram, i) => (
        <g key={`tram-${i}`} transform={`translate(${tram.x},${tram.y}) rotate(${tram.angle})`}>
          <rect x="-14" y="-5" width="28" height="10" rx="5" fill={p.tram} opacity="0.6" stroke={p.tram} strokeWidth="0.8" />
          {/* Windows */}
          <rect x="-10" y="-3" width="5" height="6" rx="1" fill={p.tramWindow} opacity="0.4" />
          <rect x="-3" y="-3" width="5" height="6" rx="1" fill={p.tramWindow} opacity="0.35" />
          <rect x="4" y="-3" width="5" height="6" rx="1" fill={p.tramWindow} opacity="0.3" />
          {/* Pantograph */}
          <line x1="0" y1="-5" x2="0" y2="-10" stroke={p.rail} strokeWidth="1" opacity="0.5" />
          <line x1="-3" y1="-10" x2="3" y2="-10" stroke={p.rail} strokeWidth="1" opacity="0.5" />
        </g>
      ))}

      {/* Stops */}
      {stops.map((stop) => (
        <g key={`stop-${stop.label}`}>
          {/* Stop glow */}
          <circle cx={stop.x} cy={stop.y} r="14" fill={p.stop} opacity="0.1" filter="url(#ct-glow)" />
          {/* Stop marker */}
          <circle cx={stop.x} cy={stop.y} r="8" fill={p.bg} stroke={p.stop} strokeWidth="2" />
          <circle cx={stop.x} cy={stop.y} r="3.5" fill={p.stop} opacity="0.7" />
          {/* Waiting people dots */}
          {Array.from({ length: stop.people }).map((_, pi) => (
            <circle
              key={`person-${stop.label}-${pi}`}
              cx={stop.x + 14 + pi * 6}
              cy={stop.y + (pi % 2 === 0 ? -3 : 3)}
              r="2"
              fill={p.accent}
              opacity={0.3 + pi * 0.1}
            />
          ))}
          {/* Stop label */}
          <text
            x={stop.x}
            y={stop.y + (stop.y < 280 ? -16 : 22)}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill={p.text}
            opacity="0.7"
          >
            {stop.label}
          </text>
        </g>
      ))}

      {/* Central node */}
      <circle cx="290" cy="280" r="24" fill={`url(#ct-core-${mode})`} />
      <circle cx="290" cy="280" r="14" fill={p.bg} stroke={p.accent} strokeWidth="2" />
      <circle cx="290" cy="280" r="6" fill={p.accent} opacity="0.6" />
      <text x="290" y="312" textAnchor="middle" fontSize="8" fontWeight="700" fill={p.text} opacity="0.6">
        СОБОР
      </text>

      {/* Blizzard snow */}
      {isWinter && (
        <g opacity="0.2">
          {Array.from({ length: 30 }).map((_, i) => (
            <circle
              key={`snow-${i}`}
              cx={20 + (i * 127) % 540}
              cy={15 + (i * 79) % 530}
              r={1 + (i % 3) * 0.5}
              fill="white"
              opacity={0.25 + (i % 4) * 0.12}
            />
          ))}
        </g>
      )}

      {/* Title */}
      <text x="290" y="28" textAnchor="middle" fontSize="10" fill={p.text} letterSpacing="0.15em" opacity="0.6">
        ТРАМВАЙНОЕ КОЛЬЦО · 9.6 КМ · 6 ОСТАНОВОК
      </text>

      {/* Legend */}
      <g transform="translate(40, 535)">
        <line x1="0" y1="0" x2="18" y2="0" stroke={p.tram} strokeWidth="2" strokeDasharray="8 6" opacity="0.6" />
        <text x="24" y="4" fontSize="8" fill={p.text} opacity="0.5">Трамвайная линия</text>
        <circle cx="160" cy="0" r="4" fill={p.bg} stroke={p.stop} strokeWidth="1.5" />
        <text x="170" y="4" fontSize="8" fill={p.text} opacity="0.5">Остановка</text>
        <rect x="240" y="-4" width="12" height="8" rx="4" fill={p.tram} opacity="0.5" />
        <text x="258" y="4" fontSize="8" fill={p.text} opacity="0.5">Трамвай</text>
      </g>

      {/* Metrics bar */}
      <g transform="translate(40, 510)">
        <text x="0" y="0" fontSize="8" fill={p.accent} opacity="0.6">
          Интервал: 8 мин · Скорость: 25 км/ч · Полный круг: 24 мин
        </text>
      </g>
    </svg>
  );
}
