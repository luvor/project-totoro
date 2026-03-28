import type { ClimateModeId } from "@/data/atlas";
import { PersonWalking, TreeConifer, LampPost, Bench } from "./shared-shapes";

/**
 * Пешеходные маршруты с ветрозащитными экранами — вид сверху / лёгкая аксонометрия.
 */

const palette: Record<ClimateModeId, {
  bg: string; ground: string; path: string; pathGlow: string;
  screen: string; screenGlass: string; tree: string;
  text: string; accent: string; person: string;
}> = {
  winter: {
    bg: "#0a1520", ground: "#1a2e42", path: "#f0c27f",
    pathGlow: "rgba(240,194,127,0.15)", screen: "#4a6a8a",
    screenGlass: "rgba(59,130,246,0.3)", tree: "#6a5a4a",
    text: "#eef4f6", accent: "#f0c27f", person: "#eef4f6",
  },
  summer: {
    bg: "#0e1e1a", ground: "#1e3a28", path: "#8ec48d",
    pathGlow: "rgba(142,196,141,0.12)", screen: "#3a6a4a",
    screenGlass: "rgba(106,173,90,0.25)", tree: "#5aad5a",
    text: "#eef6ef", accent: "#8ec48d", person: "#eef6ef",
  },
  blizzard: {
    bg: "#0c1828", ground: "#18304a", path: "#9fc3da",
    pathGlow: "rgba(159,195,218,0.15)", screen: "#5a7a9a",
    screenGlass: "rgba(90,154,181,0.35)", tree: "#8898a8",
    text: "#f3f9fc", accent: "#9fc3da", person: "#f3f9fc",
  },
  heat: {
    bg: "#1e1410", ground: "#2e2218", path: "#ef9461",
    pathGlow: "rgba(239,148,97,0.12)", screen: "#6a5040",
    screenGlass: "rgba(217,122,74,0.25)", tree: "#7a9a5a",
    text: "#fff4ec", accent: "#ef9461", person: "#fff4ec",
  },
};

// Path segments: the pedestrian route runs left-to-right with bends
const pathSegments = [
  "M 40 260 L 160 260",
  "M 160 260 Q 190 260 200 240",
  "M 200 240 L 280 160",
  "M 280 160 Q 290 148 310 148",
  "M 310 148 L 440 148",
  "M 440 148 Q 460 148 470 162",
  "M 470 162 L 520 230",
  "M 520 230 Q 528 244 548 244",
  "M 548 244 L 660 244",
];
const fullPath = pathSegments.join(" ");

// Wind screen positions along the path
const windScreens = [
  { x: 80, y: 240, w: 30, h: 3, angle: 0 },
  { x: 140, y: 240, w: 25, h: 3, angle: 0 },
  { x: 230, y: 210, w: 28, h: 3, angle: -40 },
  { x: 260, y: 180, w: 26, h: 3, angle: -40 },
  { x: 340, y: 130, w: 32, h: 3, angle: 0 },
  { x: 400, y: 130, w: 30, h: 3, angle: 0 },
  { x: 490, y: 190, w: 28, h: 3, angle: 38 },
  { x: 580, y: 226, w: 30, h: 3, angle: 0 },
  { x: 640, y: 226, w: 25, h: 3, angle: 0 },
];

export function CorridorPedestrianGraphic({ mode }: { mode: ClimateModeId }) {
  const p = palette[mode];
  const isWinter = mode === "winter" || mode === "blizzard";

  return (
    <svg viewBox="0 0 700 400" role="img" aria-labelledby="corridor-ped-title">
      <title id="corridor-ped-title">
        Пешеходный маршрут с ветрозащитными экранами и озеленением
      </title>

      <defs>
        <linearGradient id={`cp-bg-${mode}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.bg} />
          <stop offset="100%" stopColor={p.ground} />
        </linearGradient>
        <filter id="cp-path-glow">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="cp-screen-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="700" height="400" rx="28" fill={`url(#cp-bg-${mode})`} />

      {/* Ground plane */}
      <rect x="20" y="100" width="660" height="260" rx="16" fill={p.ground} opacity="0.25" />

      {/* Path glow */}
      <path
        d={fullPath}
        fill="none"
        stroke={p.pathGlow}
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#cp-path-glow)"
      />

      {/* Path surface */}
      <path
        d={fullPath}
        fill="none"
        stroke={p.path}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />
      <path
        d={fullPath}
        fill="none"
        stroke={p.path}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />

      {/* Wind protection screens */}
      {windScreens.map((s, i) => (
        <g key={`screen-${i}`} transform={`translate(${s.x},${s.y}) rotate(${s.angle})`}>
          {/* Screen base */}
          <rect
            x={-s.w / 2} y={-s.h / 2}
            width={s.w} height={s.h}
            rx="1.5"
            fill={p.screen}
            opacity="0.7"
          />
          {/* Glass panel */}
          <rect
            x={-s.w / 2} y={-s.h / 2 - 8}
            width={s.w} height="8"
            rx="1"
            fill={p.screenGlass}
            stroke={p.screen}
            strokeWidth="0.5"
          />
          {/* Vertical supports */}
          <line x1={-s.w / 2 + 2} y1={-s.h / 2 - 8} x2={-s.w / 2 + 2} y2={s.h / 2} stroke={p.screen} strokeWidth="0.8" opacity="0.6" />
          <line x1={s.w / 2 - 2} y1={-s.h / 2 - 8} x2={s.w / 2 - 2} y2={s.h / 2} stroke={p.screen} strokeWidth="0.8" opacity="0.6" />
        </g>
      ))}

      {/* Trees along the path */}
      {isWinter ? (
        <>
          <TreeConifer x={100} y={290} scale={0.7} color={p.tree} />
          <TreeConifer x={180} y={300} scale={0.6} color={p.tree} />
          <TreeConifer x={320} y={110} scale={0.65} color={p.tree} />
          <TreeConifer x={380} y={115} scale={0.55} color={p.tree} />
          <TreeConifer x={500} y={280} scale={0.6} color={p.tree} />
          <TreeConifer x={600} y={270} scale={0.7} color={p.tree} />
        </>
      ) : (
        <>
          <TreeConifer x={100} y={290} scale={0.7} color={p.tree} />
          <TreeConifer x={180} y={300} scale={0.6} color={p.tree} />
          <TreeConifer x={320} y={110} scale={0.65} color={p.tree} />
          <TreeConifer x={380} y={115} scale={0.55} color={p.tree} />
          <TreeConifer x={500} y={280} scale={0.6} color={p.tree} />
          <TreeConifer x={600} y={270} scale={0.7} color={p.tree} />
        </>
      )}

      {/* Benches */}
      <Bench x={120} y={275} scale={0.7} fill={p.screen} />
      <Bench x={360} y={165} scale={0.7} fill={p.screen} />
      <Bench x={610} y={260} scale={0.7} fill={p.screen} />

      {/* Lamp posts */}
      <LampPost x={90} y={260} scale={0.6} fill={p.screen} lightColor={p.accent} />
      <LampPost x={200} y={238} scale={0.6} fill={p.screen} lightColor={p.accent} />
      <LampPost x={350} y={148} scale={0.6} fill={p.screen} lightColor={p.accent} />
      <LampPost x={480} y={178} scale={0.6} fill={p.screen} lightColor={p.accent} />
      <LampPost x={590} y={244} scale={0.6} fill={p.screen} lightColor={p.accent} />

      {/* People walking */}
      <PersonWalking x={110} y={262} scale={0.65} fill={p.person} />
      <PersonWalking x={170} y={258} scale={0.6} fill={p.person} flip />
      <PersonWalking x={300} y={168} scale={0.6} fill={p.person} />
      <PersonWalking x={370} y={150} scale={0.55} fill={p.person} flip />
      <PersonWalking x={430} y={148} scale={0.6} fill={p.person} />
      <PersonWalking x={540} y={240} scale={0.6} fill={p.person} flip />
      <PersonWalking x={630} y={246} scale={0.65} fill={p.person} />

      {/* Blizzard effects */}
      {mode === "blizzard" && (
        <g opacity="0.2">
          {Array.from({ length: 25 }).map((_, i) => (
            <circle
              key={`snow-${i}`}
              cx={20 + (i * 109) % 660}
              cy={10 + (i * 71) % 380}
              r={1 + (i % 3) * 0.5}
              fill="white"
              opacity={0.3 + (i % 4) * 0.12}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`wind-${i}`}
              x1={30 + (i * 89) % 620}
              y1={40 + (i * 53) % 320}
              x2={65 + (i * 89) % 620}
              y2={44 + (i * 53) % 320}
              stroke="white"
              strokeWidth="0.6"
              opacity="0.15"
            />
          ))}
        </g>
      )}

      {/* Title */}
      <text x="350" y="30" textAnchor="middle" fontSize="10" fill={p.text} letterSpacing="0.15em" opacity="0.6">
        {isWinter ? "ВЕТРОЗАЩИТНЫЙ ПЕШЕХОДНЫЙ МАРШРУТ" : "ТЕНЕВОЙ ПЕШЕХОДНЫЙ МАРШРУТ"}
      </text>

      {/* Annotations */}
      <g opacity="0.5">
        <line x1={80} y1={232} x2={80} y2={215} stroke={p.accent} strokeWidth="0.5" />
        <text x={80} y={212} textAnchor="middle" fontSize="7" fill={p.accent}>
          {isWinter ? "ветрозащита" : "тень"}
        </text>

        <line x1={360} y1={122} x2={360} y2={105} stroke={p.accent} strokeWidth="0.5" />
        <text x={360} y={102} textAnchor="middle" fontSize="7" fill={p.accent}>
          скамейка
        </text>
      </g>

      {/* Legend */}
      <g transform="translate(40, 375)">
        <rect x="0" y="-4" width="16" height="8" rx="1" fill={p.screenGlass} stroke={p.screen} strokeWidth="0.5" />
        <text x="22" y="4" fontSize="8" fill={p.text} opacity="0.5">Ветрозащитный экран</text>
        <line x1="160" y1="0" x2="178" y2="0" stroke={p.path} strokeWidth="2" opacity="0.7" />
        <text x="184" y="4" fontSize="8" fill={p.text} opacity="0.5">Пешеходный путь</text>
      </g>
    </svg>
  );
}
