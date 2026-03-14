export { HeroClimateGraphic } from "./visuals/hero-climate";
export { MasterplanGraphic } from "./visuals/masterplan";
export { PersonaRouteGraphic } from "./visuals/persona-route";
export { MachineCutawayGraphic, TechnologyBarsGraphic, NuclearSummerGraphic } from "./visuals/machine-cutaway";
export { SummerStreetGraphic } from "./visuals/summer-street";
export { FlourishingWheelGraphic } from "./visuals/flourishing";
export { SeasonalCalendarGraphic } from "./visuals/calendar";
export { ResilienceGraphic } from "./visuals/resilience";

import type { VariantSpec } from "@/data/atlas";

export function RuleOverlayGraphic({ activeRuleTitle }: { activeRuleTitle: string }) {
  return (
    <svg viewBox="0 0 560 360" role="img" aria-labelledby="rule-overlay-title">
      <title id="rule-overlay-title">Наложение кодекса города на генплан и public realm</title>
      <defs>
        <radialGradient id="rule-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef9461" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ef9461" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="560" height="360" rx="30" fill="#0f1d2d" />
      <rect x="46" y="52" width="468" height="256" rx="26" fill="#173149" />

      <circle cx="282" cy="180" r="92" fill="url(#rule-glow)" />
      <circle cx="282" cy="180" r="92" fill="none" stroke="#ef9461" strokeWidth="3" strokeOpacity="0.6" strokeDasharray="8 4" />
      <circle cx="282" cy="180" r="44" fill="#f0c27f" opacity="0.8" />
      <circle cx="282" cy="180" r="22" fill="#163047" />

      <path d="M 116 180 H 448" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeDasharray="2 6" />
      <path d="M 176 108 L 392 252" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeDasharray="2 6" />
      <path d="M 390 108 L 176 252" stroke="rgba(255,255,255,0.1)" strokeWidth="4" strokeDasharray="2 6" />

      <rect x="108" y="120" width="108" height="72" rx="16" fill="rgba(255,255,255,0.05)" stroke="#ef9461" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="334" y="126" width="94" height="80" rx="16" fill="rgba(255,255,255,0.05)" stroke="#8fc879" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="228" y="218" width="100" height="62" rx="16" fill="rgba(255,255,255,0.05)" stroke="#92bdd2" strokeWidth="1.5" strokeDasharray="4 3" />

      <text x="162" y="142" textAnchor="middle" fontSize="8" fill="#ef9461" opacity="0.7">ЗАПРЕЩЕНО</text>
      <text x="381" y="148" textAnchor="middle" fontSize="8" fill="#8fc879" opacity="0.7">ОБЯЗАТЕЛЬНО</text>
      <text x="278" y="240" textAnchor="middle" fontSize="8" fill="#92bdd2" opacity="0.7">ПРОВЕРКА</text>

      <rect x="74" y="286" width="412" height="32" rx="16" fill="rgba(255,255,255,0.06)" />
      <circle cx="92" cy="302" r="4" fill="#ef9461" />
      <text x="104" y="306" fill="#f7f4ee" fontSize="11">
        {activeRuleTitle}
      </text>
    </svg>
  );
}

export function VariantClusterGraphic({
  variants,
  activeVariantId,
}: {
  variants: VariantSpec[];
  activeVariantId: string;
}) {
  const positions = [
    { x: 154, y: 150, r: 66 },
    { x: 388, y: 140, r: 56 },
    { x: 170, y: 334, r: 72 },
    { x: 392, y: 330, r: 50 },
  ];

  return (
    <svg viewBox="0 0 560 420" role="img" aria-labelledby="variant-cluster-title">
      <title id="variant-cluster-title">Сравнение четырёх версий развития одной климатической идеи</title>
      <rect width="560" height="420" rx="30" fill="#eef0eb" />

      {positions.map((pos, i) => {
        const next = positions[(i + 1) % positions.length];
        return (
          <line
            key={`conn-${i}`}
            x1={pos.x}
            y1={pos.y}
            x2={next.x}
            y2={next.y}
            stroke="#315b73"
            strokeWidth="1"
            strokeOpacity="0.2"
            strokeDasharray="4 4"
          />
        );
      })}

      {variants.map((variant, index) => {
        const position = positions[index];
        if (!position) return null;
        const active = variant.id === activeVariantId;
        return (
          <g key={variant.id}>
            {active && (
              <circle cx={position.x} cy={position.y} r={position.r + 16} fill="none" stroke="#ef9461" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="6 4" />
            )}
            <circle cx={position.x} cy={position.y} r={position.r + (active ? 10 : 0)} fill={active ? "#ef9461" : "#315b73"} fillOpacity={0.9} />
            <circle cx={position.x} cy={position.y} r={position.r * 0.58} fill={active ? "#112030" : "#f0c27f"} />
            <text x={position.x} y={position.y - 4} textAnchor="middle" fill="#f7f4ee" fontSize="14" fontWeight="700">
              {variant.label}
            </text>
            <text x={position.x} y={position.y + 16} textAnchor="middle" fill="#f7f4ee" fontSize="10">
              {variant.title.slice(0, 14)}
            </text>
          </g>
        );
      })}
      <text x="38" y="40" fill="#1b3348" fontSize="16" fontWeight="700">
        4 версии развития
      </text>
      <text x="38" y="60" fill="#4f6678" fontSize="11">
        Один общий язык, разные уровни бюджета, масштаба и климатической насыщенности.
      </text>
    </svg>
  );
}

export function CompactVillageGraphic() {
  return (
    <svg viewBox="0 0 560 360" role="img" aria-labelledby="compact-village-title">
      <title id="compact-village-title">Компактный климатический посёлок с civic spine, зимними садами и зелёным поясом</title>
      <rect width="560" height="360" rx="30" fill="#13202e" />

      <ellipse cx="280" cy="192" rx="220" ry="118" fill="#1a2e3e" />
      <ellipse cx="280" cy="192" rx="180" ry="84" fill="#253e4a" />

      <rect x="120" y="170" width="320" height="44" rx="22" fill="rgba(240,194,127,0.2)" />
      <line x1="140" y1="192" x2="420" y2="192" stroke="#f0c27f" strokeWidth="2" strokeDasharray="8 4" strokeOpacity="0.5" />

      {[160, 210, 260, 310, 360].map((bx, i) => (
        <g key={`building-${i}`}>
          <rect x={bx} y={172 - (i % 2) * 8} width={28 + (i % 3) * 4} height={40 + (i % 2) * 8} rx="4" fill="#3a5a6a" opacity="0.8" />
          <rect x={bx + 4} y={176 - (i % 2) * 8} width={8} height={6} rx="1" fill="#f0c27f" opacity="0.2" />
        </g>
      ))}

      <ellipse cx="200" cy="130" rx="30" ry="20" fill="#89b26e" opacity="0.3" stroke="#89b26e" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
      <ellipse cx="360" cy="130" rx="26" ry="18" fill="#89b26e" opacity="0.3" stroke="#89b26e" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
      <text x="200" y="134" textAnchor="middle" fontSize="7" fill="#89b26e" opacity="0.7">зимний сад</text>
      <text x="360" y="134" textAnchor="middle" fontSize="7" fill="#89b26e" opacity="0.7">зимний сад</text>

      <circle cx="100" cy="192" r="22" fill="#89b26e" opacity="0.3" />
      <circle cx="460" cy="192" r="22" fill="#89b26e" opacity="0.3" />
      <circle cx="280" cy="72" r="20" fill="#89b26e" opacity="0.3" />
      <circle cx="280" cy="310" r="20" fill="#89b26e" opacity="0.3" />

      <text x="36" y="40" fill="#f7f4ee" fontSize="16" fontWeight="700">
        Compact Climate Village
      </text>
      <text x="36" y="60" fill="#9eb3c2" fontSize="11">
        Компактность допустима при daylight, деревьях, пористости и shared climate commons.
      </text>
      <text x="280" y="248" textAnchor="middle" fontSize="8" fill="#9eb3c2" opacity="0.6">CIVIC SPINE</text>
    </svg>
  );
}
