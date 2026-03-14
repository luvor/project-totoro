import type { PersonaSeason, PersonaSpec } from "@/data/atlas";
import { Bench, PersonChild, PersonSitting, PersonWalking, TreeDeciduous, TreeConifer } from "./shared-shapes";

// Mini-scene backgrounds for each route step
function MiniScene({
  x,
  y,
  width,
  height,
  season,
  sceneType,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  season: PersonaSeason;
  sceneType: "home" | "transit" | "civic" | "park" | "work" | "school" | "shop" | "default";
}) {
  const isWinter = season === "winter";
  const groundColor = isWinter ? "#1e3448" : "#2a4a34";
  const skyColor = isWinter ? "#0e1a28" : "#1a2e22";
  const buildingColor = isWinter ? "#2a4a68" : "#2e5444";
  const accentColor = isWinter ? "#f0c27f" : "#8ec48d";

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="12" fill={skyColor} />

      <rect x={x} y={y + height - 20} width={width} height="20" fill={groundColor} />

      {sceneType === "home" && (
        <g>
          <rect x={x + 14} y={y + 22} width={width * 0.4} height={height - 42} rx="4" fill={buildingColor} />
          <rect x={x + 18} y={y + 28} width="10" height="12" rx="1" fill={accentColor} opacity="0.5" />
          <rect x={x + 32} y={y + 28} width="10" height="12" rx="1" fill={accentColor} opacity="0.3" />
          <rect x={x + 18} y={y + 44} width="10" height="12" rx="1" fill={accentColor} opacity="0.4" />
          <rect x={x + width * 0.55} y={y + 30} width={width * 0.3} height={height - 50} rx="4" fill={buildingColor} opacity="0.6" />
          <PersonWalking x={x + width * 0.5} y={y + height - 22} scale={0.7} fill={accentColor} />
        </g>
      )}

      {sceneType === "transit" && (
        <g>
          <rect x={x + 10} y={y + height - 50} width={width - 20} height="20" rx="10" fill={accentColor} opacity="0.5" />
          <rect x={x + 14} y={y + height - 54} width="6" height="34" rx="1" fill="#4a6a7a" />
          <rect x={x + width - 20} y={y + height - 54} width="6" height="34" rx="1" fill="#4a6a7a" />
          <rect x={x + 10} y={y + height - 58} width={width - 20} height="6" rx="3" fill="#4a6a7a" />
          <PersonWalking x={x + width * 0.35} y={y + height - 22} scale={0.65} fill="#dde8ef" />
          <PersonSitting x={x + width * 0.6} y={y + height - 24} scale={0.6} fill="#dde8ef" />
        </g>
      )}

      {sceneType === "civic" && (
        <g>
          <rect x={x + 8} y={y + 16} width={width - 16} height={height - 36} rx="6" fill={buildingColor} />
          <circle cx={x + width / 2} cy={y + height / 2 - 4} r="12" fill={accentColor} opacity="0.4" />
          <rect x={x + 14} y={y + 22} width={width * 0.3} height="8" rx="4" fill={accentColor} opacity="0.3" />
          <PersonWalking x={x + width * 0.3} y={y + height - 22} scale={0.65} fill="#dde8ef" />
          <PersonWalking x={x + width * 0.6} y={y + height - 22} scale={0.6} fill="#dde8ef" flip />
        </g>
      )}

      {sceneType === "park" && (
        <g>
          {isWinter ? (
            <TreeConifer x={x + width * 0.3} y={y + height - 22} scale={0.6} color="#4a7a5a" />
          ) : (
            <TreeDeciduous x={x + width * 0.3} y={y + height - 22} scale={0.7} crownColor="#5aad5a" />
          )}
          {isWinter ? (
            <TreeConifer x={x + width * 0.7} y={y + height - 22} scale={0.5} color="#3a6a4a" />
          ) : (
            <TreeDeciduous x={x + width * 0.7} y={y + height - 22} scale={0.6} crownColor="#6aba5a" />
          )}
          <Bench x={x + width * 0.5} y={y + height - 22} scale={0.5} fill="#8a7a6a" />
          <PersonChild x={x + width * 0.45} y={y + height - 22} scale={0.6} fill="#dde8ef" />
        </g>
      )}

      {sceneType === "work" && (
        <g>
          <rect x={x + 10} y={y + 12} width={width - 20} height={height - 32} rx="4" fill={buildingColor} />
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`win-${row}-${col}`}
                x={x + 16 + col * 18}
                y={y + 18 + row * 16}
                width="12"
                height="10"
                rx="1"
                fill={accentColor}
                opacity={0.2 + row * 0.1}
              />
            ))
          )}
          <PersonWalking x={x + width * 0.5} y={y + height - 22} scale={0.65} fill="#dde8ef" />
        </g>
      )}

      {sceneType === "school" && (
        <g>
          <rect x={x + 8} y={y + 20} width={width - 16} height={height - 40} rx="6" fill={buildingColor} />
          <rect x={x + 14} y={y + 24} width={width * 0.4} height="8" rx="4" fill={accentColor} opacity="0.4" />
          <PersonChild x={x + width * 0.35} y={y + height - 22} scale={0.6} fill="#dde8ef" />
          <PersonChild x={x + width * 0.55} y={y + height - 22} scale={0.55} fill="#dde8ef" />
          <PersonWalking x={x + width * 0.7} y={y + height - 22} scale={0.7} fill="#dde8ef" />
        </g>
      )}

      {sceneType === "shop" && (
        <g>
          <rect x={x + 10} y={y + 24} width={width - 20} height={height - 44} rx="4" fill={buildingColor} />
          <rect x={x + 14} y={y + height - 38} width={width - 28} height="16" rx="3" fill={accentColor} opacity="0.3" />
          <PersonWalking x={x + width * 0.4} y={y + height - 22} scale={0.65} fill="#dde8ef" />
        </g>
      )}

      {sceneType === "default" && (
        <g>
          <rect x={x + 12} y={y + 20} width={width * 0.4} height={height - 40} rx="4" fill={buildingColor} opacity="0.6" />
          <PersonWalking x={x + width * 0.6} y={y + height - 22} scale={0.65} fill="#dde8ef" />
        </g>
      )}

      {isWinter && (
        <rect x={x} y={y + height - 28} width={width} height="8" rx="4" fill={accentColor} opacity="0.15" />
      )}
    </g>
  );
}

function guessSceneType(step: string): "home" | "transit" | "civic" | "park" | "work" | "school" | "shop" | "default" {
  const lower = step.toLowerCase();
  if (lower.includes("дом") || lower.includes("home") || lower.includes("квартир")) return "home";
  if (lower.includes("трамва") || lower.includes("tram") || lower.includes("останов") || lower.includes("transit")) return "transit";
  if (lower.includes("собор") || lower.includes("civic") || lower.includes("библиотек") || lower.includes("центр") || lower.includes("cathedral")) return "civic";
  if (lower.includes("парк") || lower.includes("park") || lower.includes("сад") || lower.includes("garden") || lower.includes("двор")) return "park";
  if (lower.includes("офис") || lower.includes("work") || lower.includes("коворк") || lower.includes("работ")) return "work";
  if (lower.includes("школ") || lower.includes("school") || lower.includes("сад") || lower.includes("детс")) return "school";
  if (lower.includes("магаз") || lower.includes("shop") || lower.includes("рынок") || lower.includes("market")) return "shop";
  return "default";
}

export function PersonaRouteGraphic({
  persona,
  season,
}: {
  persona: PersonaSpec;
  season: PersonaSeason;
}) {
  const route = persona.seasonRoutes[season];
  const isWinter = season === "winter";
  const accent = isWinter ? "#f0c27f" : "#8ec48d";
  const bgColor = isWinter ? "#0e1a28" : "#12231a";
  const mutedText = isWinter ? "#a9b9c7" : "#9ab8a4";

  const steps = route.route.slice(0, 4);
  const sceneWidth = 110;
  const sceneHeight = 100;
  const gap = 16;
  const totalWidth = steps.length * sceneWidth + (steps.length - 1) * gap;
  const startX = (560 - totalWidth) / 2;

  return (
    <svg viewBox="0 0 560 360" role="img" aria-labelledby="persona-title">
      <title id="persona-title">{`Маршрут повседневности: ${persona.name}`}</title>

      <rect width="560" height="360" rx="32" fill={bgColor} />

      <text x="32" y="40" fill="#f7f4ee" fontSize="18" fontWeight="700">
        {persona.name}
      </text>
      <text x="32" y="60" fill={mutedText} fontSize="11">
        {isWinter ? "Зимний маршрут" : "Летний маршрут"} · {route.minutes} мин · {route.modeMix}
      </text>

      <path
        d={steps
          .map((_, i) => {
            const x = startX + i * (sceneWidth + gap) + sceneWidth / 2;
            const y = 130;
            return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
          })
          .join(" ")}
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeDasharray="6 4"
        strokeOpacity="0.4"
      />

      {steps.map((step, index) => {
        const x = startX + index * (sceneWidth + gap);
        const y = 80;
        const sceneType = guessSceneType(step);

        return (
          <g key={`step-${index}`}>
            <MiniScene
              x={x}
              y={y}
              width={sceneWidth}
              height={sceneHeight}
              season={season}
              sceneType={sceneType}
            />

            <circle cx={x + sceneWidth / 2} cy={y - 6} r="10" fill={accent} />
            <text x={x + sceneWidth / 2} y={y - 2} textAnchor="middle" fontSize="10" fontWeight="700" fill="#102030">
              {index + 1}
            </text>

            <text x={x + sceneWidth / 2} y={y + sceneHeight + 16} textAnchor="middle" fontSize="9" fill="#f7f4ee" fontWeight="600">
              {step.length > 20 ? step.slice(0, 18) + "..." : step}
            </text>
            {step.length > 20 && (
              <text x={x + sceneWidth / 2} y={y + sceneHeight + 28} textAnchor="middle" fontSize="8" fill={mutedText}>
                {step.slice(18, 38)}
              </text>
            )}

            {index < steps.length - 1 && (
              <path
                d={`M ${x + sceneWidth + 2} ${y + sceneHeight / 2} L ${x + sceneWidth + gap - 2} ${y + sceneHeight / 2}`}
                fill="none"
                stroke={accent}
                strokeWidth="1.5"
                markerEnd="none"
                opacity="0.5"
              />
            )}
          </g>
        );
      })}

      <rect x="32" y="284" width="496" height="52" rx="16" fill="rgba(255,255,255,0.06)" />
      <g>
        <text x="52" y="306" fill={mutedText} fontSize="10">Время</text>
        <text x="52" y="324" fill="#f7f4ee" fontSize="15" fontWeight="700">{route.minutes} мин</text>

        <text x="180" y="306" fill={mutedText} fontSize="10">Режим</text>
        <text x="180" y="324" fill="#f7f4ee" fontSize="15" fontWeight="700">{route.modeMix}</text>

        <text x="320" y="306" fill={mutedText} fontSize="10">
          {isWinter ? "Cold exposure" : "Shade exposure"}
        </text>
        <text x="320" y="324" fill="#f7f4ee" fontSize="15" fontWeight="700">
          {isWinter ? route.coldExposure : route.shadeExposure}
        </text>
      </g>

      <circle cx="528" cy="40" r="14" fill={accent} opacity="0.2" />
      <text x="528" y="44" textAnchor="middle" fontSize="14" fill={accent}>
        {isWinter ? "\u2744" : "\u2600"}
      </text>
    </svg>
  );
}
