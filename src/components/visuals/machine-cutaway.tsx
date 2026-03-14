import type { MachineSpec, MachineSummerState } from "@/data/atlas";
import { PersonWalking } from "./shared-shapes";

export function MachineCutawayGraphic({
  machine,
  mode,
}: {
  machine: MachineSpec;
  mode: "winterMode" | "shoulderMode" | "summerMode";
}) {
  const label = mode === "winterMode" ? "Зима" : mode === "summerMode" ? "Лето" : "Межсезонье";
  const description = machine[mode];
  const isSummer = mode === "summerMode";
  const isWinter = mode === "winterMode";

  const accentColor = isWinter ? "#f0c27f" : isSummer ? "#8ec48d" : "#9fc3da";
  const flowColor = isWinter ? "#ef9461" : isSummer ? "#7aaabe" : "#b8a87a";

  return (
    <svg viewBox="0 0 580 420" role="img" aria-labelledby="machine-cutaway-title">
      <title id="machine-cutaway-title">{`Архитектурный разрез климатической машины: ${label}`}</title>
      <defs>
        <linearGradient id="underground-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2e42" />
          <stop offset="100%" stopColor="#0e1a28" />
        </linearGradient>
        <linearGradient id={`flow-grad-${mode}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={flowColor} stopOpacity="0" />
          <stop offset="50%" stopColor={flowColor} stopOpacity="0.8" />
          <stop offset="100%" stopColor={flowColor} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="580" height="420" rx="34" fill="#0f1d2d" />

      <rect x="38" y="232" width="504" height="4" rx="2" fill="#2a4a62" />

      <rect x="38" y="236" width="504" height="142" rx="0" fill="url(#underground-grad)" />

      <rect x="80" y="260" width="120" height="70" rx="14" fill="#1d3248" stroke="#2a4a62" strokeWidth="1.5" />
      <rect x="92" y="274" width="96" height="12" rx="6" fill={flowColor} opacity="0.4" />
      <rect x="92" y="294" width="96" height="12" rx="6" fill={flowColor} opacity="0.25" />
      <text x="140" y="256" textAnchor="middle" fontSize="9" fill="#8aa8be" letterSpacing="0.08em">STORAGE</text>

      <line x1="200" y1="290" x2="280" y2="290" stroke={flowColor} strokeWidth="4" strokeDasharray="8 4" opacity="0.5" />
      <line x1="380" y1="290" x2="460" y2="290" stroke={flowColor} strokeWidth="4" strokeDasharray="8 4" opacity="0.5" />

      <rect x="280" y="256" width="100" height="78" rx="14" fill="#1d3248" stroke="#2a4a62" strokeWidth="1.5" />
      <circle cx="330" cy="290" r="22" fill={accentColor} opacity="0.3" />
      <circle cx="330" cy="290" r="12" fill={accentColor} opacity="0.6" />
      <text x="330" y="256" textAnchor="middle" fontSize="9" fill="#8aa8be" letterSpacing="0.08em">
        {isWinter ? "ИСТОЧНИКИ" : isSummer ? "COOLING" : "BALANCE"}
      </text>

      <rect x="420" y="260" width="100" height="70" rx="14" fill="#1d3248" stroke="#2a4a62" strokeWidth="1.5" />
      <rect x="434" y="278" width="72" height="8" rx="4" fill={flowColor} opacity="0.35" />
      <rect x="434" y="294" width="52" height="8" rx="4" fill={flowColor} opacity="0.2" />
      <text x="470" y="256" textAnchor="middle" fontSize="9" fill="#8aa8be" letterSpacing="0.08em">РАСПРЕДЕЛЕНИЕ</text>

      <g className="energy-flow-arrows">
        <path d={`M 140 ${isWinter ? 260 : 336} L 140 ${isWinter ? 220 : 350}`} stroke={flowColor} strokeWidth="2" strokeDasharray="4 3" opacity="0.4" />
        <path d={`M 330 ${isWinter ? 256 : 336} L 330 ${isWinter ? 220 : 350}`} stroke={flowColor} strokeWidth="2" strokeDasharray="4 3" opacity="0.4" />
        <path d={`M 470 ${isWinter ? 260 : 336} L 470 ${isWinter ? 220 : 350}`} stroke={flowColor} strokeWidth="2" strokeDasharray="4 3" opacity="0.4" />
      </g>

      <rect x="68" y="160" width="160" height="72" rx="12" fill="#15283b" stroke="#2a4a62" strokeWidth="1" />
      <rect x="78" y="170" width="60" height="20" rx="4" fill={accentColor} opacity="0.15" />
      <rect x="148" y="170" width="68" height="20" rx="4" fill={accentColor} opacity="0.1" />
      <text x="148" y="220" textAnchor="middle" fontSize="9" fill="#ccdae6">
        {machine.publicProgram[0] ?? "Public program"}
      </text>

      <rect x="260" y="128" width="200" height="104" rx="14" fill="#15283b" stroke="#2a4a62" strokeWidth="1" />
      {[0, 1, 2, 3].map((col) => (
        <g key={`win-col-${col}`}>
          <rect x={276 + col * 44} y={142} width="28" height="18" rx="3" fill={accentColor} opacity="0.12" />
          <rect x={276 + col * 44} y={168} width="28" height="18" rx="3" fill={accentColor} opacity="0.08" />
        </g>
      ))}
      <rect x="336" y="200" width="36" height="32" rx="6" fill={accentColor} opacity="0.2" />

      <PersonWalking x={310} y={228} scale={0.8} fill="#dce7ef" />
      <PersonWalking x={380} y={228} scale={0.75} fill="#dce7ef" flip />
      <PersonWalking x={120} y={228} scale={0.7} fill="#dce7ef" />

      <rect x="264" y="110" width="192" height="20" rx="4" fill="#1a3248" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={`solar-${i}`} x={272 + i * 36} y={112} width="28" height="16" rx="2" fill="#3a5a6a" />
      ))}

      <rect x="72" y="144" width="156" height="18" rx="4" fill="#2a5a3a" opacity="0.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse key={`plant-${i}`} cx={92 + i * 28} cy={148} rx="8" ry="5" fill="#5aad5a" opacity="0.4" />
      ))}

      <rect x="480" y="128" width="56" height="40" rx="8" fill="#1a3248" stroke="#2a4a62" strokeWidth="1" />
      <circle cx="508" cy="148" r="10" fill={accentColor} opacity="0.2" />
      <text x="508" y="180" textAnchor="middle" fontSize="7" fill="#8aa8be">оборудование</text>

      <text x="546" y="148" textAnchor="end" fontSize="8" fill="#5a7a8a" opacity="0.6">КРЫША</text>
      <text x="546" y="200" textAnchor="end" fontSize="8" fill="#5a7a8a" opacity="0.6">НАЗЕМНЫЙ</text>
      <text x="546" y="290" textAnchor="end" fontSize="8" fill="#5a7a8a" opacity="0.6">ПОДЗЕМНЫЙ</text>

      <text x="54" y="38" fill="#f7f4ee" fontSize="16" fontWeight="700">
        {machine.label} · {machine.title}
      </text>
      <text x="54" y="58" fill="#9db2c2" fontSize="11">
        {label}: {description}
      </text>

      <rect x="54" y="386" width="472" height="24" rx="12" fill="rgba(255,255,255,0.04)" />
      <text x="72" y="402" fill="#7a9aae" fontSize="10">
        Failure mode: {machine.failureMode}
      </text>

      <rect x="38" y="232" width="504" height="4" rx="2" fill={`url(#flow-grad-${mode})`} />
    </svg>
  );
}

export function TechnologyBarsGraphic({ machine }: { machine: MachineSpec }) {
  const barColors = ["#ef9461", "#7aaabe", "#8ec48d", "#f0c27f", "#b8a8d8", "#d8a888"];

  return (
    <svg viewBox="0 0 580 300" role="img" aria-labelledby="tech-bars-title">
      <title id="tech-bars-title">Сравнение технологических долей климатической машины</title>
      <rect width="580" height="300" rx="30" fill="#eef1ec" />
      <text x="34" y="40" fill="#1a3244" fontSize="16" fontWeight="700">
        Technology mix
      </text>
      <text x="34" y="60" fill="#50687c" fontSize="11">
        Доли условны — объясняют логику сценария, не EPC-спецификацию.
      </text>
      {machine.technologyMix.map((item, index) => {
        const y = 84 + index * 36;
        const barWidth = (item.share / 100) * 300;
        const color = barColors[index % barColors.length];
        return (
          <g key={item.label}>
            <text x="34" y={y + 16} fill="#20384b" fontSize="11">
              {item.label}
            </text>
            <rect x="210" y={y} width="320" height="22" rx="11" fill="#d8e1da" />
            <rect x="210" y={y} width={barWidth} height="22" rx="11" fill={color} />
            <text x="540" y={y + 15} textAnchor="end" fill="#20384b" fontSize="12" fontWeight="700">
              {item.share}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function NuclearSummerGraphic({ state }: { state: MachineSummerState }) {
  const colors = ["#ef9461", "#7aaabe", "#8ec48d", "#f0c27f", "#b8a8d8"];
  let offset = 0;

  return (
    <svg viewBox="0 0 580 320" role="img" aria-labelledby="nuclear-summer-title">
      <title id="nuclear-summer-title">Летний режим атомного сценария</title>
      <rect width="580" height="320" rx="30" fill="#eef0eb" />
      <text x="34" y="38" fill="#173147" fontSize="16" fontWeight="700">
        Атомный сценарий летом
      </text>
      <text x="34" y="58" fill="#536b7e" fontSize="11">
        {state.label}: {state.summary}
      </text>

      <rect x="34" y="82" width="512" height="42" rx="21" fill="#d7e2dd" />
      {state.mix.map((item, index) => {
        const width = item.share * 5.12;
        const x = 34 + offset;
        offset += width;
        return (
          <rect
            key={item.label}
            x={x}
            y="82"
            width={width}
            height="42"
            rx={index === 0 ? "21" : index === state.mix.length - 1 ? "21" : "0"}
            fill={colors[index % colors.length]}
          />
        );
      })}

      {state.mix.map((item, index) => {
        const y = 152 + index * 26;
        return (
          <g key={`${item.label}-legend`}>
            <rect x="34" y={y - 7} width="14" height="14" rx="4" fill={colors[index % colors.length]} />
            <text x="56" y={y + 4} fill="#173147" fontSize="11">
              {item.label}
            </text>
            <text x="530" y={y + 4} textAnchor="end" fill="#173147" fontSize="12" fontWeight="700">
              {item.share}%
            </text>
          </g>
        );
      })}

      <text x="34" y="296" fill="#536b7e" fontSize="10">
        Режим системы меняется от тёплого дня до жаркой недели — cooling, storage, ГВС и export играют разную роль.
      </text>
    </svg>
  );
}
