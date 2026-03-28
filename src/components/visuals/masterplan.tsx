import type { ClimateModeId, QuarterSpec } from "@/data/atlas";
import { IsoTree, PersonWalking, TreeDeciduous } from "./shared-shapes";

const quarterNodes = [
  { id: "north", x: 300, y: 92 },
  { id: "east", x: 454, y: 186 },
  { id: "south-east", x: 428, y: 344 },
  { id: "south", x: 292, y: 428 },
  { id: "west", x: 142, y: 360 },
  { id: "north-west", x: 122, y: 198 },
];

const modePalette: Record<ClimateModeId, { bg: string; groundFill: string; accent: string; activeQ: string; road: string; treeFill: string; textDark: string }> = {
  winter: {
    bg: "#edf0eb",
    groundFill: "#d9e5df",
    accent: "#f0c27f",
    activeQ: "#f0c27f",
    road: "#1b354b",
    treeFill: "#8a7a6a",
    textDark: "#183147",
  },
  summer: {
    bg: "#ebf0e5",
    groundFill: "#c8ddb8",
    accent: "#6aad5a",
    activeQ: "#8ec48d",
    road: "#1b354b",
    treeFill: "#5aad5a",
    textDark: "#183147",
  },
  blizzard: {
    bg: "#e8ecf2",
    groundFill: "#d0dae6",
    accent: "#7aaabe",
    activeQ: "#9fc3da",
    road: "#1b354b",
    treeFill: "#8898a8",
    textDark: "#183147",
  },
  heat: {
    bg: "#f0ece5",
    groundFill: "#e0d5c6",
    accent: "#ef9461",
    activeQ: "#ef9461",
    road: "#1b354b",
    treeFill: "#7a9a5a",
    textDark: "#183147",
  },
};

// Building footprints for each quarter (architectural plan view)
const quarterFootprints: Record<string, Array<{ x: number; y: number; w: number; h: number; r?: number }>> = {
  north: [
    { x: -30, y: -20, w: 24, h: 16 },
    { x: 4, y: -24, w: 18, h: 20 },
    { x: -18, y: 4, w: 20, h: 12 },
    { x: 8, y: 2, w: 14, h: 14 },
  ],
  east: [
    { x: -28, y: -18, w: 22, h: 14 },
    { x: 2, y: -22, w: 16, h: 18 },
    { x: -20, y: 4, w: 18, h: 12 },
    { x: 4, y: 0, w: 20, h: 16 },
  ],
  "south-east": [
    { x: -26, y: -16, w: 20, h: 14 },
    { x: 0, y: -20, w: 18, h: 16 },
    { x: -22, y: 2, w: 16, h: 14 },
    { x: 2, y: 4, w: 22, h: 12 },
  ],
  south: [
    { x: -28, y: -18, w: 24, h: 14 },
    { x: 4, y: -22, w: 16, h: 18 },
    { x: -16, y: 2, w: 22, h: 14 },
    { x: 10, y: 4, w: 14, h: 12 },
  ],
  west: [
    { x: -24, y: -20, w: 20, h: 16 },
    { x: 2, y: -18, w: 18, h: 14 },
    { x: -20, y: 2, w: 16, h: 14 },
    { x: 4, y: 0, w: 20, h: 16 },
  ],
  "north-west": [
    { x: -26, y: -18, w: 22, h: 14 },
    { x: 2, y: -22, w: 16, h: 18 },
    { x: -18, y: 2, w: 20, h: 12 },
    { x: 6, y: 4, w: 14, h: 14 },
  ],
};

// Tree positions relative to quarter center
const quarterTrees: Record<string, Array<{ dx: number; dy: number; s: number }>> = {
  north: [{ dx: -36, dy: -8, s: 0.8 }, { dx: 28, dy: 12, s: 0.7 }, { dx: -8, dy: 20, s: 0.6 }],
  east: [{ dx: -34, dy: 10, s: 0.7 }, { dx: 26, dy: -10, s: 0.8 }, { dx: 8, dy: 22, s: 0.6 }],
  "south-east": [{ dx: -30, dy: -6, s: 0.7 }, { dx: 28, dy: 8, s: 0.6 }, { dx: -12, dy: 22, s: 0.7 }],
  south: [{ dx: -34, dy: 10, s: 0.7 }, { dx: 30, dy: -8, s: 0.6 }, { dx: 0, dy: 24, s: 0.8 }],
  west: [{ dx: -28, dy: -12, s: 0.8 }, { dx: 26, dy: 8, s: 0.7 }, { dx: -6, dy: 22, s: 0.6 }],
  "north-west": [{ dx: -32, dy: 6, s: 0.7 }, { dx: 24, dy: -8, s: 0.7 }, { dx: 6, dy: 20, s: 0.6 }],
};

export function MasterplanGraphic({
  activeQuarter,
  mode,
}: {
  activeQuarter: QuarterSpec;
  mode: ClimateModeId;
}) {
  const palette = modePalette[mode];
  const isSummer = mode === "summer" || mode === "heat";

  return (
    <svg viewBox="0 0 580 520" role="img" aria-labelledby="masterplan-title">
      <title id="masterplan-title">Генплан Теплового Кольца с выделенным кварталом и центральным климатическим собором</title>

      <rect width="580" height="520" rx="36" fill={palette.bg} />
      <rect x="32" y="32" width="516" height="456" rx="28" fill={palette.groundFill} />

      <ellipse cx="290" cy="260" rx="220" ry="190" fill={isSummer ? "rgba(106,173,90,0.12)" : "rgba(180,200,170,0.1)"} />
      <path
        d="M 80 180 Q 140 120, 220 100 Q 320 78, 420 110 Q 500 140, 510 240 Q 520 350, 440 410 Q 360 460, 260 450 Q 140 440, 80 360 Q 50 290, 80 180 Z"
        fill={isSummer ? "rgba(106,173,90,0.08)" : "rgba(160,190,150,0.06)"}
      />

      <path d="M 96 172 L 482 172" stroke={palette.road} strokeOpacity="0.14" strokeWidth="8" strokeLinecap="round" />
      <path d="M 132 350 L 446 350" stroke={palette.road} strokeOpacity="0.14" strokeWidth="8" strokeLinecap="round" />
      <path d="M 174 110 L 372 402" stroke={palette.road} strokeOpacity="0.14" strokeWidth="8" strokeLinecap="round" />
      <path d="M 410 110 L 182 402" stroke={palette.road} strokeOpacity="0.14" strokeWidth="7" strokeLinecap="round" />

      <circle cx="290" cy="260" r="148" fill="none" stroke={palette.accent} strokeWidth="4" strokeDasharray="12 8" strokeOpacity="0.5" />

      {/* Gallery corridors connecting adjacent quarters */}
      {[
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
      ].map(([a, b]) => {
        const from = quarterNodes[a];
        const to = quarterNodes[b];
        return (
          <g key={`gallery-${a}-${b}`}>
            <line
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke={palette.accent}
              strokeWidth="6"
              strokeOpacity="0.08"
              strokeLinecap="round"
            />
            <line
              x1={from.x} y1={from.y} x2={to.x} y2={to.y}
              stroke={palette.accent}
              strokeWidth="1.5"
              strokeOpacity="0.35"
              strokeLinecap="round"
              strokeDasharray={isSummer ? "6 4" : "0"}
            />
          </g>
        );
      })}

      {quarterNodes.map((node) => (
        <g key={`stop-${node.id}`}>
          <circle cx={node.x} cy={node.y} r="6" fill="#fff" stroke={palette.accent} strokeWidth="2" />
          <circle cx={node.x} cy={node.y} r="2.5" fill={palette.accent} />
        </g>
      ))}

      {quarterNodes.map((node) => {
        const isActive = node.id === activeQuarter.id;
        const footprints = quarterFootprints[node.id] ?? [];
        const trees = quarterTrees[node.id] ?? [];

        return (
          <g key={node.id}>
            {isActive && (
              <circle cx={node.x} cy={node.y} r="56" fill={palette.activeQ} fillOpacity="0.15" stroke={palette.activeQ} strokeWidth="2" strokeOpacity="0.4" />
            )}

            {footprints.map((fp, i) => (
              <rect
                key={`fp-${node.id}-${i}`}
                x={node.x + fp.x}
                y={node.y + fp.y}
                width={fp.w}
                height={fp.h}
                rx="3"
                fill={isActive ? palette.activeQ : "#315a73"}
                fillOpacity={isActive ? 0.7 : 0.45}
                stroke={isActive ? palette.activeQ : "#1b354b"}
                strokeWidth="1"
                strokeOpacity={isActive ? 0.8 : 0.3}
              />
            ))}

            {isSummer &&
              trees.map((t, i) => (
                <IsoTree
                  key={`tree-${node.id}-${i}`}
                  x={node.x + t.dx}
                  y={node.y + t.dy}
                  scale={t.s}
                  color={palette.treeFill}
                  shadow={false}
                />
              ))}

            {isActive && (
              <>
                <PersonWalking x={node.x - 14} y={node.y + 32} scale={0.65} fill={palette.textDark} />
                <PersonWalking x={node.x + 10} y={node.y + 28} scale={0.6} fill={palette.textDark} flip />
              </>
            )}

            <text
              x={node.x}
              y={node.y + (isActive ? -38 : -32)}
              textAnchor="middle"
              fontSize={isActive ? "11" : "9"}
              fontWeight={isActive ? "700" : "400"}
              fill={palette.textDark}
              opacity={isActive ? 1 : 0.6}
            >
              {node.id === activeQuarter.id ? activeQuarter.shortLabel : node.id.replace("-", " ").slice(0, 2).toUpperCase()}
            </text>
          </g>
        );
      })}

      <g>
        <circle cx="290" cy="260" r="58" fill={isSummer ? "#c8dda0" : palette.accent} fillOpacity="0.3" />
        <circle cx="290" cy="260" r="42" fill={palette.accent} fillOpacity="0.6" />
        <rect x="268" y="242" width="44" height="36" rx="6" fill="#163047" />
        <rect x="274" y="248" width="32" height="6" rx="3" fill={palette.accent} opacity="0.7" />
        <rect x="274" y="258" width="32" height="6" rx="3" fill={palette.accent} opacity="0.5" />
        <circle cx="290" cy="276" r="4" fill={palette.accent} opacity="0.8" />
        <text x="290" y="296" textAnchor="middle" fontSize="9" fontWeight="700" fill={palette.textDark} opacity="0.8">
          КЛИМАТИЧЕСКИЙ СОБОР
        </text>
      </g>

      <text x="48" y="60" fontSize="15" fontWeight="700" fill={palette.textDark}>
        {isSummer ? "Летний режим генплана" : mode === "blizzard" ? "Генплан в режиме пурги" : "Климатический генплан"}
      </text>
      <text x="48" y="84" fontSize="12" fill="#43637a">
        {isSummer
          ? "Теневые связи, cooling commons и зелёный canopy"
          : mode === "blizzard"
            ? "Fallback-маршруты, step-free continuity и ветрозащита"
            : "Civic-узлы, короткие маршруты и общественный климатический центр"}
      </text>

      <rect x="42" y="430" width="250" height="34" rx="17" fill="#ffffff" fillOpacity="0.74" />
      <text x="58" y="451" fontSize="12" fontWeight="700" fill={palette.textDark}>
        {activeQuarter.title}
      </text>
      <text x="310" y="451" fontSize="12" fill={palette.textDark} opacity="0.7">
        {isSummer ? activeQuarter.summerRole : activeQuarter.winterRole}
      </text>

      <line x1="420" y1="490" x2="500" y2="490" stroke={palette.textDark} strokeWidth="1.5" strokeOpacity="0.3" />
      <text x="460" y="486" textAnchor="middle" fontSize="8" fill={palette.textDark} opacity="0.4">
        500 м
      </text>

      {isSummer && (
        <>
          <TreeDeciduous x={60} y={440} scale={0.5} crownColor={palette.treeFill} />
          <TreeDeciduous x={520} y={80} scale={0.45} crownColor={palette.treeFill} />
          <TreeDeciduous x={530} y={440} scale={0.55} crownColor={palette.treeFill} />
        </>
      )}
    </svg>
  );
}
