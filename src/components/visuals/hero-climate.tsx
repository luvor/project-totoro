import type { ClimateModeId } from "@/data/atlas";
import { IsoBuilding, IsoTree, PersonWalking } from "./shared-shapes";

const modePalette: Record<
  ClimateModeId,
  {
    sky: string;
    skyGrad: string;
    ground: string;
    glow: string;
    building: string;
    buildingSide: string;
    roof: string;
    accent: string;
    treeColor: string;
    textColor: string;
    tramColor: string;
    warmOverlay: string;
  }
> = {
  winter: {
    sky: "#0a1520",
    skyGrad: "#162840",
    ground: "#1a2e42",
    glow: "#f0c27f",
    building: "#2a4a68",
    buildingSide: "#1a3248",
    roof: "#d4c8b8",
    accent: "#f0c27f",
    treeColor: "#6a5a4a",
    textColor: "#eef4f6",
    tramColor: "#f0c27f",
    warmOverlay: "rgba(240,194,127,0.06)",
  },
  summer: {
    sky: "#0e1e1a",
    skyGrad: "#1a3828",
    ground: "#1e3a28",
    glow: "#8ec48d",
    building: "#2e5040",
    buildingSide: "#1e3a2e",
    roof: "#c8d8b8",
    accent: "#8ec48d",
    treeColor: "#5aad5a",
    textColor: "#eef6ef",
    tramColor: "#8ec48d",
    warmOverlay: "rgba(142,196,141,0.06)",
  },
  blizzard: {
    sky: "#0c1828",
    skyGrad: "#1a2e4a",
    ground: "#18304a",
    glow: "#9fc3da",
    building: "#3a5a78",
    buildingSide: "#2a4262",
    roof: "#e8eef4",
    accent: "#9fc3da",
    treeColor: "#8898a8",
    textColor: "#f3f9fc",
    tramColor: "#9fc3da",
    warmOverlay: "rgba(159,195,218,0.08)",
  },
  heat: {
    sky: "#1e1410",
    skyGrad: "#3a2a1e",
    ground: "#2e2218",
    glow: "#ef9461",
    building: "#5a4030",
    buildingSide: "#3a2a20",
    roof: "#dac8a8",
    accent: "#ef9461",
    treeColor: "#7a9a5a",
    textColor: "#fff4ec",
    tramColor: "#ef9461",
    warmOverlay: "rgba(239,148,97,0.08)",
  },
};

// Quarter layout: isometric building clusters arranged in a ring
type QuarterLayout = {
  id: string;
  label: string;
  buildings: Array<{ x: number; y: number; w: number; d: number; h: number }>;
  trees: Array<{ x: number; y: number; s: number }>;
  people: Array<{ x: number; y: number; flip?: boolean }>;
};

const quarterLayouts: QuarterLayout[] = [
  {
    id: "north",
    label: "Север",
    buildings: [
      { x: 228, y: 62, w: 18, d: 12, h: 22 },
      { x: 252, y: 56, w: 14, d: 10, h: 28 },
      { x: 270, y: 68, w: 16, d: 8, h: 18 },
      { x: 240, y: 78, w: 10, d: 12, h: 14 },
    ],
    trees: [
      { x: 222, y: 80, s: 0.6 },
      { x: 278, y: 56, s: 0.5 },
    ],
    people: [{ x: 248, y: 92, flip: false }],
  },
  {
    id: "east",
    label: "Восток",
    buildings: [
      { x: 350, y: 130, w: 16, d: 10, h: 20 },
      { x: 372, y: 122, w: 12, d: 14, h: 26 },
      { x: 362, y: 148, w: 14, d: 10, h: 16 },
      { x: 386, y: 140, w: 10, d: 10, h: 22 },
    ],
    trees: [
      { x: 345, y: 158, s: 0.55 },
      { x: 395, y: 128, s: 0.5 },
    ],
    people: [{ x: 370, y: 162, flip: true }],
  },
  {
    id: "south-east",
    label: "ЮВ",
    buildings: [
      { x: 346, y: 258, w: 14, d: 12, h: 18 },
      { x: 366, y: 250, w: 12, d: 10, h: 24 },
      { x: 356, y: 274, w: 16, d: 8, h: 14 },
      { x: 380, y: 266, w: 10, d: 12, h: 20 },
    ],
    trees: [
      { x: 340, y: 286, s: 0.6 },
      { x: 390, y: 252, s: 0.45 },
    ],
    people: [{ x: 362, y: 290, flip: false }],
  },
  {
    id: "south",
    label: "Юг",
    buildings: [
      { x: 222, y: 340, w: 18, d: 10, h: 22 },
      { x: 244, y: 334, w: 14, d: 12, h: 28 },
      { x: 264, y: 346, w: 12, d: 10, h: 16 },
      { x: 236, y: 356, w: 10, d: 8, h: 14 },
    ],
    trees: [
      { x: 216, y: 362, s: 0.55 },
      { x: 280, y: 340, s: 0.5 },
    ],
    people: [{ x: 252, y: 370, flip: true }],
  },
  {
    id: "west",
    label: "Запад",
    buildings: [
      { x: 114, y: 268, w: 16, d: 12, h: 24 },
      { x: 136, y: 260, w: 12, d: 10, h: 18 },
      { x: 126, y: 284, w: 14, d: 8, h: 20 },
      { x: 100, y: 278, w: 10, d: 10, h: 14 },
    ],
    trees: [
      { x: 95, y: 296, s: 0.6 },
      { x: 148, y: 262, s: 0.5 },
    ],
    people: [{ x: 130, y: 298, flip: false }],
  },
  {
    id: "north-west",
    label: "СЗ",
    buildings: [
      { x: 108, y: 130, w: 14, d: 12, h: 20 },
      { x: 128, y: 122, w: 12, d: 10, h: 26 },
      { x: 118, y: 148, w: 16, d: 8, h: 16 },
      { x: 96, y: 140, w: 10, d: 12, h: 18 },
    ],
    trees: [
      { x: 90, y: 160, s: 0.55 },
      { x: 142, y: 126, s: 0.5 },
    ],
    people: [{ x: 120, y: 166, flip: true }],
  },
];

// Tram loop as an SVG path around the district
const tramLoopPath =
  "M 250 90 C 320 75, 390 110, 400 170 C 410 230, 400 280, 380 310 C 350 360, 290 380, 250 380 C 200 380, 150 350, 120 310 C 95 270, 90 220, 100 170 C 115 110, 175 80, 250 90 Z";

const tramStops = [
  { x: 250, y: 86, label: "Север" },
  { x: 398, y: 168, label: "Восток" },
  { x: 382, y: 308, label: "ЮВ" },
  { x: 250, y: 382, label: "Юг" },
  { x: 102, y: 308, label: "Запад" },
  { x: 100, y: 168, label: "СЗ" },
];

export function HeroClimateGraphic({ mode }: { mode: ClimateModeId }) {
  const p = modePalette[mode];
  const isWinter = mode === "winter" || mode === "blizzard";

  return (
    <svg viewBox="0 0 500 480" role="img" aria-labelledby="hero-climate-title">
      <title id="hero-climate-title">
        Изометрический вид климатического города: шесть кварталов вокруг центрального собора
      </title>
      <defs>
        <radialGradient id={`hero-sky-${mode}`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor={p.skyGrad} />
          <stop offset="100%" stopColor={p.sky} />
        </radialGradient>
        <radialGradient id={`hero-glow-${mode}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.4" />
          <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`cathedral-core-${mode}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffaed" />
          <stop offset="60%" stopColor={p.glow} />
          <stop offset="100%" stopColor={p.accent} stopOpacity="0.6" />
        </radialGradient>
        <filter id="hero-blur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        {mode === "blizzard" && (
          <filter id="blizzard-overlay">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="monoNoise" />
            <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
          </filter>
        )}
      </defs>

      <rect width="500" height="480" rx="32" fill={`url(#hero-sky-${mode})`} />

      <circle cx="250" cy="220" r="160" fill={`url(#hero-glow-${mode})`} />

      <ellipse cx="250" cy="240" rx="210" ry="120" fill={p.ground} opacity="0.5" />
      <ellipse cx="250" cy="240" rx="210" ry="120" fill="none" stroke={p.accent} strokeWidth="1" strokeOpacity="0.2" />

      <line x1="250" y1="100" x2="250" y2="380" stroke={p.ground} strokeWidth="6" strokeOpacity="0.6" />
      <line x1="100" y1="200" x2="400" y2="200" stroke={p.ground} strokeWidth="5" strokeOpacity="0.5" />
      <line x1="110" y1="300" x2="390" y2="300" stroke={p.ground} strokeWidth="5" strokeOpacity="0.5" />

      <path
        d={tramLoopPath}
        fill="none"
        stroke={p.tramColor}
        strokeWidth="3"
        strokeDasharray={mode === "blizzard" ? "4 8" : "8 6"}
        strokeOpacity="0.6"
        className="tram-loop-path"
      />

      {tramStops.map((stop) => (
        <g key={stop.label}>
          <circle cx={stop.x} cy={stop.y} r="4" fill={p.accent} opacity="0.8" />
          <circle cx={stop.x} cy={stop.y} r="2" fill={p.sky} />
        </g>
      ))}

      {/* Heated gallery corridors between quarters (winter/blizzard: solid warm; summer/heat: subtle) */}
      {[
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      ].map(([a, b]) => {
        const from = quarterLayouts[a];
        const to = quarterLayouts[b];
        const fx = from.buildings[0].x + 10;
        const fy = from.buildings[0].y + 10;
        const tx = to.buildings[0].x + 10;
        const ty = to.buildings[0].y + 10;
        return (
          <g key={`corridor-${a}-${b}`}>
            {isWinter && (
              <line
                x1={fx} y1={fy} x2={tx} y2={ty}
                stroke={p.glow}
                strokeWidth="5"
                strokeOpacity="0.06"
                strokeLinecap="round"
              />
            )}
            <line
              x1={fx} y1={fy} x2={tx} y2={ty}
              stroke={p.accent}
              strokeWidth={isWinter ? "1.5" : "0.8"}
              strokeOpacity={isWinter ? "0.4" : "0.15"}
              strokeLinecap="round"
              strokeDasharray={isWinter ? "0" : "4 6"}
            />
          </g>
        );
      })}

      {quarterLayouts.map((quarter) => (
        <g key={quarter.id}>
          {quarter.buildings.map((b, i) => (
            <IsoBuilding
              key={`${quarter.id}-b-${i}`}
              cx={b.x}
              cy={b.y}
              w={b.w}
              d={b.d}
              h={b.h}
              scale={0.6}
              wallColor={p.building}
              sideColor={p.buildingSide}
              roofColor={p.roof}
            />
          ))}
          {quarter.trees.map((t, i) =>
            isWinter ? (
              <g key={`${quarter.id}-t-${i}`} transform={`translate(${t.x},${t.y})`}>
                <line x1="0" y1="2" x2="0" y2="-6" stroke={p.treeColor} strokeWidth="1.2" />
                <line x1="0" y1="-4" x2="-3" y2="-8" stroke={p.treeColor} strokeWidth="0.8" />
                <line x1="0" y1="-4" x2="3" y2="-7" stroke={p.treeColor} strokeWidth="0.8" />
              </g>
            ) : (
              <IsoTree
                key={`${quarter.id}-t-${i}`}
                x={t.x}
                y={t.y}
                scale={t.s}
                color={p.treeColor}
              />
            )
          )}
          {quarter.people.map((person, i) => (
            <PersonWalking
              key={`${quarter.id}-p-${i}`}
              x={person.x}
              y={person.y}
              scale={0.8}
              fill={p.textColor}
              flip={person.flip}
            />
          ))}
        </g>
      ))}

      <g>
        <circle cx="250" cy="210" r="50" fill={p.glow} opacity="0.15" filter="url(#hero-blur)" />

        <IsoBuilding
          cx={218}
          cy={194}
          w={40}
          d={30}
          h={8}
          scale={0.85}
          wallColor="#3a5a6a"
          sideColor="#2a4a5a"
          roofColor={p.accent}
          opacity={0.9}
        />
        <IsoBuilding
          cx={230}
          cy={196}
          w={18}
          d={14}
          h={32}
          scale={0.85}
          wallColor="#4a6a7a"
          sideColor="#3a5a6a"
          roofColor={p.glow}
        />
        <polygon
          points={`250,148 244,178 256,178`}
          fill={p.glow}
          opacity="0.9"
        />
        <ellipse
          cx="250"
          cy="215"
          rx="42"
          ry="22"
          fill="none"
          stroke={p.glow}
          strokeWidth="2.5"
          strokeOpacity="0.6"
          className="cathedral-ring"
        />
      </g>

      <text x="250" y="440" textAnchor="middle" fontSize="11" fill={p.textColor} letterSpacing="0.2em" opacity="0.7">
        {mode === "winter" && "ЗИМА · ТЁПЛЫЕ МАРШРУТЫ · ВЕТРОЗАЩИТА"}
        {mode === "summer" && "ЛЕТО · ТЕНЬ · COOLING COMMONS · ЗЕЛЁНЫЙ CANOPY"}
        {mode === "blizzard" && "ПУРГА · FALLBACK МАРШРУТЫ · STEP-FREE"}
        {mode === "heat" && "ЖАРА · ПРОХЛАДНЫЕ УБЕЖИЩА · SHADED PASSAGES"}
      </text>

      {quarterLayouts.map((quarter) => {
        const labelPos = {
          north: { x: 250, y: 54 },
          east: { x: 410, y: 146 },
          "south-east": { x: 404, y: 290 },
          south: { x: 250, y: 400 },
          west: { x: 82, y: 290 },
          "north-west": { x: 82, y: 146 },
        }[quarter.id] ?? { x: 250, y: 250 };

        return (
          <text
            key={`label-${quarter.id}`}
            x={labelPos.x}
            y={labelPos.y}
            textAnchor="middle"
            fontSize="9"
            fill={p.textColor}
            opacity="0.55"
            letterSpacing="0.12em"
          >
            {quarter.label}
          </text>
        );
      })}

      {mode === "heat" && (
        <rect width="500" height="480" rx="32" fill="rgba(239,148,97,0.04)" />
      )}

      {mode === "blizzard" && (
        <g opacity="0.3">
          {Array.from({ length: 40 }).map((_, i) => (
            <circle
              key={`snow-${i}`}
              cx={30 + (i * 127) % 440}
              cy={20 + (i * 89) % 420}
              r={1 + (i % 3) * 0.5}
              fill="#fff"
              opacity={0.3 + (i % 4) * 0.15}
            />
          ))}
        </g>
      )}

      <text x="250" y="30" textAnchor="middle" fontSize="10" fill={p.textColor} letterSpacing="0.18em" opacity="0.5">
        6 КВАРТАЛОВ · YEAR-ROUND CLIMATE LOOP
      </text>

      <rect width="500" height="480" rx="32" fill={p.warmOverlay} pointerEvents="none" />
    </svg>
  );
}
