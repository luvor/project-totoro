import {
  costScenario,
  dailyCycle,
  districtSpec,
  energyCoreSpec,
  failureReasons,
  phases,
  typologies,
  type CostCategory
} from "@/data/concept";

type VisualFrameProps = {
  title: string;
  caption: string;
  children: React.ReactNode;
  className?: string;
};

function polar(cx: number, cy: number, radius: number, angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians)
  };
}

function sectorPath(
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number
) {
  const startOuter = polar(cx, cy, outerRadius, endAngle);
  const endOuter = polar(cx, cy, outerRadius, startAngle);
  const startInner = polar(cx, cy, innerRadius, endAngle);
  const endInner = polar(cx, cy, innerRadius, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 0 ${endOuter.x} ${endOuter.y}`,
    `L ${endInner.x} ${endInner.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 1 ${startInner.x} ${startInner.y}`,
    "Z"
  ].join(" ");
}

export function VisualFrame({ title, caption, children, className }: VisualFrameProps) {
  return (
    <figure className={`visual-frame ${className ?? ""}`.trim()}>
      <figcaption className="visual-caption">
        <span className="visual-title">{title}</span>
        <span className="visual-text">{caption}</span>
      </figcaption>
      <div className="visual-canvas">{children}</div>
    </figure>
  );
}

export function HeroPlanGraphic() {
  const sectors = new Array(districtSpec.quarters).fill(null).map((_, index) => {
    const start = index * 60 + 2;
    const end = start + 56;
    const mid = (start + end) / 2;
    const label = polar(220, 220, 152, mid);
    return {
      d: sectorPath(220, 220, 94, 188, start, end),
      label,
      title: `Квартал ${String(index + 1).padStart(2, "0")}`
    };
  });

  return (
    <svg viewBox="0 0 440 440" role="img" aria-labelledby="hero-diagram-title">
      <title id="hero-diagram-title">Радиальный генплан района с тепловым ядром и шестью кварталами</title>
      <defs>
        <linearGradient id="hero-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4d19a" />
          <stop offset="100%" stopColor="#e77b47" />
        </linearGradient>
        <radialGradient id="hero-core" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#fff6d6" />
          <stop offset="100%" stopColor="#ed925b" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="440" height="440" rx="34" fill="#0f1c2a" />
      <circle cx="220" cy="220" r="190" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
      <circle cx="220" cy="220" r="133" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <circle cx="220" cy="220" r="94" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="14" />
      {sectors.map((sector, index) => (
        <g key={sector.title}>
          <path
            d={sector.d}
            fill={index % 2 === 0 ? "rgba(150, 199, 215, 0.18)" : "rgba(255, 246, 214, 0.14)"}
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.5"
          />
          <text
            x={sector.label.x}
            y={sector.label.y}
            textAnchor="middle"
            fontSize="11"
            fill="#dbe7ee"
            letterSpacing="0.12em"
          >
            {sector.title}
          </text>
        </g>
      ))}
      <circle cx="220" cy="220" r="72" fill="url(#hero-core)" />
      <circle cx="220" cy="220" r="52" fill="rgba(15,28,42,0.14)" stroke="rgba(255,255,255,0.42)" />
      <circle cx="220" cy="220" r="108" fill="none" stroke="url(#hero-ring)" strokeWidth="3" strokeDasharray="8 8" />
      <text x="220" y="214" textAnchor="middle" fontSize="18" fontWeight="700" fill="#112031">
        ТЕПЛОВОЕ
      </text>
      <text x="220" y="238" textAnchor="middle" fontSize="18" fontWeight="700" fill="#112031">
        ЯДРО
      </text>
      <text x="220" y="38" textAnchor="middle" fontSize="12" fill="#dbe7ee" letterSpacing="0.2em">
        ТРАМВАЙНО-АВТОБУСНОЕ КОЛЬЦО
      </text>
      <path
        d="M 220 30 C 320 44, 390 110, 408 220 C 392 324, 320 395, 220 410 C 121 396, 48 320, 30 220 C 45 116, 116 46, 220 30"
        fill="none"
        stroke="rgba(231,123,71,0.6)"
        strokeWidth="5"
      />
    </svg>
  );
}

export function FailureGraphic() {
  const bars = [76, 68, 72, 64];

  return (
    <svg viewBox="0 0 560 300" role="img" aria-labelledby="failure-diagram-title">
      <title id="failure-diagram-title">Диаграмма причин, по которым холодные города ломают повседневную жизнь</title>
      <rect width="560" height="300" rx="30" fill="#132131" />
      <text x="32" y="42" fill="#f6f1e8" fontSize="17" fontWeight="700">
        4 зимних провала
      </text>
      <text x="32" y="66" fill="#8ca0b2" fontSize="12">
        Длиннее столбец = больше ежедневный ущерб
      </text>
      {failureReasons.map((reason, index) => {
        const x = 38 + index * 128;
        const barHeight = bars[index] * 2.1;
        return (
          <g key={reason.title}>
            <rect x={x} y={222 - barHeight} width="78" height={barHeight} rx="18" fill="#26455e" />
            <rect x={x} y={222 - barHeight} width="78" height={barHeight * 0.38} rx="18" fill="#e6b15b" />
            <text x={x} y="248" fill="#f6f1e8" fontSize="12" fontWeight="600">
              {String(index + 1).padStart(2, "0")}
            </text>
            <text x={x} y="266" fill="#b9c8d3" fontSize="12">
              {reason.title.slice(0, 15)}
            </text>
          </g>
        );
      })}
      <line x1="32" y1="222" x2="528" y2="222" stroke="rgba(255,255,255,0.14)" />
      <circle cx="486" cy="68" r="10" fill="#e6b15b" />
      <text x="504" y="72" fill="#b9c8d3" fontSize="12">
        зона быстрого повседневного ущерба
      </text>
    </svg>
  );
}

export function MasterPlanGraphic() {
  const quarterNames = [
    "Северный квартал",
    "Восточный пассаж",
    "Юго-восточный форум",
    "Южный сад",
    "Западный микс",
    "Северо-западный край"
  ];

  const points = [
    { x: 290, y: 88 },
    { x: 416, y: 174 },
    { x: 400, y: 326 },
    { x: 286, y: 410 },
    { x: 148, y: 364 },
    { x: 118, y: 196 }
  ];

  return (
    <svg viewBox="0 0 540 500" role="img" aria-labelledby="masterplan-title">
      <title id="masterplan-title">Генплан Теплового Кольца с шестью кварталами и центральным энергоядром</title>
      <rect width="540" height="500" rx="34" fill="#eef0eb" />
      <rect x="34" y="34" width="472" height="432" rx="28" fill="#d7e5da" />
      <circle cx="270" cy="250" r="166" fill="none" stroke="#0f1c2a" strokeWidth="14" strokeOpacity="0.12" />
      <circle cx="270" cy="250" r="122" fill="none" stroke="#e77b47" strokeWidth="16" strokeOpacity="0.8" />
      <circle cx="270" cy="250" r="82" fill="#f0c27f" />
      <circle cx="270" cy="250" r="52" fill="#163047" />
      <text x="270" y="245" textAnchor="middle" fontSize="16" fontWeight="700" fill="#f8f3e7">
        Тепловой
      </text>
      <text x="270" y="266" textAnchor="middle" fontSize="16" fontWeight="700" fill="#f8f3e7">
        собор
      </text>
      {points.map((point, index) => (
        <g key={quarterNames[index]}>
          <circle cx={point.x} cy={point.y} r="52" fill="#325c75" fillOpacity={0.9} />
          <circle cx={point.x} cy={point.y} r="36" fill="#9dd0da" fillOpacity={0.76} />
          <text x={point.x} y={point.y - 8} textAnchor="middle" fontSize="11" fill="#f8f3e7" fontWeight="700">
            {`Q${index + 1}`}
          </text>
          <text x={point.x} y={point.y + 12} textAnchor="middle" fontSize="8.5" fill="#eff5f7">
            {quarterNames[index]}
          </text>
        </g>
      ))}
      <path d="M 96 164 L 442 164" stroke="#163047" strokeOpacity="0.24" strokeWidth="8" strokeLinecap="round" />
      <path d="M 124 334 L 420 334" stroke="#163047" strokeOpacity="0.24" strokeWidth="8" strokeLinecap="round" />
      <path d="M 178 104 L 354 396" stroke="#163047" strokeOpacity="0.24" strokeWidth="8" strokeLinecap="round" />
      <text x="270" y="70" textAnchor="middle" fontSize="12" fontWeight="700" fill="#163047" letterSpacing="0.18em">
        6 КВАРТАЛОВ · 9.6 КМ КОЛЬЦА · 450 М ДО СЕРВИСА
      </text>
    </svg>
  );
}

export function AxonometricGraphic() {
  const blocks = [
    { x: 70, y: 250, w: 92, h: 38, rise: 54, fill: "#f4d19a" },
    { x: 168, y: 220, w: 112, h: 46, rise: 82, fill: "#7ab0bf" },
    { x: 286, y: 248, w: 102, h: 40, rise: 56, fill: "#cbe2db" },
    { x: 400, y: 190, w: 84, h: 34, rise: 108, fill: "#f29a66" }
  ];

  return (
    <svg viewBox="0 0 560 320" role="img" aria-labelledby="axon-title">
      <title id="axon-title">Аксонометрия типовой застройки с переходом от дворов к транспортному узлу</title>
      <rect width="560" height="320" rx="30" fill="#102030" />
      <path d="M 44 248 L 280 138 L 516 248 L 280 294 Z" fill="#17334a" />
      {blocks.map((block) => (
        <g key={`${block.x}-${block.y}`}>
          <polygon
            points={`${block.x},${block.y} ${block.x + block.w},${block.y - 52} ${block.x + block.w + 62},${block.y - 20} ${block.x + 62},${block.y + 30}`}
            fill={block.fill}
          />
          <polygon
            points={`${block.x + 62},${block.y + 30} ${block.x + block.w + 62},${block.y - 20} ${block.x + block.w + 62},${block.y - 20 - block.rise} ${block.x + 62},${block.y + 30 - block.rise}`}
            fill="rgba(12,21,31,0.36)"
          />
          <polygon
            points={`${block.x},${block.y} ${block.x + 62},${block.y + 30} ${block.x + 62},${block.y + 30 - block.rise} ${block.x},${block.y - block.rise}`}
            fill="rgba(255,255,255,0.12)"
          />
        </g>
      ))}
      <text x="42" y="44" fill="#f6f1e8" fontSize="18" fontWeight="700">
        Рост высоты
      </text>
      <text x="42" y="68" fill="#9eb2c0" fontSize="12">
        Низкий край района растёт к узлу, не продувая двор
      </text>
    </svg>
  );
}

export function EnergyCoreGraphic() {
  const bars = energyCoreSpec.stack.map((item, index) => ({
    ...item,
    y: 78 + index * 48
  }));

  return (
    <svg viewBox="0 0 620 390" role="img" aria-labelledby="energy-title">
      <title id="energy-title">Разрез теплового ядра с гибридной энергетической схемой</title>
      <rect width="620" height="390" rx="34" fill="#f7f2e8" />
      <rect x="38" y="52" width="246" height="286" rx="26" fill="#132131" />
      <circle cx="162" cy="142" r="74" fill="#f4d19a" />
      <circle cx="162" cy="142" r="44" fill="#ed925b" />
      <rect x="108" y="214" width="108" height="72" rx="22" fill="#26455e" />
      <text x="162" y="138" textAnchor="middle" fontSize="16" fontWeight="700" fill="#132131">
        Термальный
      </text>
      <text x="162" y="160" textAnchor="middle" fontSize="16" fontWeight="700" fill="#132131">
        атриум
      </text>
      <text x="162" y="258" textAnchor="middle" fontSize="14" fill="#eff6fa" fontWeight="600">
        Буфер 36 ч
      </text>
      <path d="M 260 108 C 330 108, 334 118, 384 118" stroke="#ed925b" strokeWidth="6" fill="none" />
      <path d="M 260 262 C 330 262, 334 246, 384 246" stroke="#7ab0bf" strokeWidth="6" fill="none" />
      <text x="40" y="34" fill="#132131" fontSize="18" fontWeight="700">
        Гибридное тепловое ядро
      </text>
      <text x="40" y="360" fill="#506170" fontSize="12">
        Публичный верхний слой + инженерная надёжность
      </text>
      {bars.map((bar) => (
        <g key={bar.label}>
          <text x="346" y={bar.y - 10} fill="#102030" fontSize="12" fontWeight="700">
            {bar.label}
          </text>
          <rect x="346" y={bar.y} width="210" height="20" rx="10" fill="#dbe3e7" />
          <rect x="346" y={bar.y} width={bar.share * 2.1} height="20" rx="10" fill="#26455e" />
          <text x="568" y={bar.y + 14} fill="#102030" fontSize="11" textAnchor="end">
            {bar.share}%
          </text>
          <text x="346" y={bar.y + 36} fill="#546474" fontSize="10">
            {bar.note}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function MobilityGraphic() {
  return (
    <svg viewBox="0 0 620 360" role="img" aria-labelledby="mobility-title">
      <title id="mobility-title">Схема зимней мобильности с галереями, транзитом и периметральным авто</title>
      <rect width="620" height="360" rx="34" fill="#102030" />
      <rect x="68" y="64" width="484" height="232" rx="28" fill="#17334a" />
      <rect x="124" y="108" width="372" height="144" rx="22" fill="none" stroke="#f4d19a" strokeWidth="6" strokeDasharray="10 12" />
      <rect x="168" y="140" width="284" height="80" rx="16" fill="rgba(244,209,154,0.14)" stroke="rgba(255,255,255,0.16)" />
      <circle cx="310" cy="180" r="42" fill="#f4d19a" />
      <text x="310" y="185" fill="#102030" fontSize="13" textAnchor="middle" fontWeight="700">
        Ядро
      </text>
      <text x="88" y="48" fill="#f6f1e8" fontSize="18" fontWeight="700">
        Зимняя мобильность
      </text>
      <text x="88" y="320" fill="#9eb2c0" fontSize="12">
        Авто по краю, жизнь внутри защищённого кольца
      </text>
      {[112, 212, 412, 512].map((x) => (
        <g key={x}>
          <rect x={x - 18} y="78" width="36" height="18" rx="9" fill="#e77b47" />
          <rect x={x - 18} y="264" width="36" height="18" rx="9" fill="#e77b47" />
        </g>
      ))}
      <path d="M 152 180 H 468" stroke="#9dd0da" strokeWidth="8" strokeLinecap="round" />
      <path d="M 310 116 V 244" stroke="#9dd0da" strokeWidth="8" strokeLinecap="round" />
      <text x="470" y="176" fill="#f6f1e8" fontSize="12">
        тёплая улица
      </text>
      <text x="320" y="116" fill="#f6f1e8" fontSize="12">
        step-free spine
      </text>
    </svg>
  );
}

export function HousingGraphic() {
  const columns = typologies.map((item, index) => ({
    ...item,
    x: 62 + index * 122,
    h: 60 + index * 32
  }));

  return (
    <svg viewBox="0 0 560 340" role="img" aria-labelledby="housing-title">
      <title id="housing-title">Типологии жилья от крайнего пояса к узлу общественного транспорта</title>
      <rect width="560" height="340" rx="30" fill="#f7f2e8" />
      <text x="36" y="42" fill="#102030" fontSize="18" fontWeight="700">
        Типологии вместо башни
      </text>
      <text x="36" y="66" fill="#60717f" fontSize="12">
        Высота меняется по задаче, а не ради коэффициента
      </text>
      <line x1="36" y1="270" x2="524" y2="270" stroke="#1f3850" strokeOpacity="0.18" />
      {columns.map((column) => (
        <g key={column.title}>
          <rect x={column.x} y={270 - column.h} width="72" height={column.h} rx="12" fill="#325c75" />
          <rect x={column.x + 10} y={270 - column.h + 12} width="52" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
          <text x={column.x} y="294" fill="#102030" fontSize="11" fontWeight="700">
            {column.title}
          </text>
          <text x={column.x} y="310" fill="#60717f" fontSize="10">
            {column.height}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function DailyCycleGraphic() {
  const points = dailyCycle.map((entry, index) => ({
    ...entry,
    x: 70 + index * 150,
    y: index % 2 === 0 ? 118 : 208
  }));

  return (
    <svg viewBox="0 0 560 300" role="img" aria-labelledby="daily-cycle-title">
      <title id="daily-cycle-title">Суточный цикл жизни района от утра до вечера</title>
      <rect width="560" height="300" rx="30" fill="#132131" />
      <path d="M 72 160 H 490" stroke="#e6b15b" strokeWidth="4" strokeLinecap="round" />
      {points.map((point) => (
        <g key={point.time}>
          <circle cx={point.x} cy={point.y} r="18" fill="#f4d19a" />
          <circle cx={point.x} cy="160" r="5" fill="#f6f1e8" />
          <path d={`M ${point.x} 160 L ${point.x} ${point.y}`} stroke="#e6b15b" strokeWidth="3" strokeDasharray="5 6" />
          <text x={point.x} y={point.y + 5} textAnchor="middle" fontSize="10" fontWeight="700" fill="#102030">
            {point.time}
          </text>
          <text x={point.x - 36} y={point.y + 38} fill="#f6f1e8" fontSize="11" fontWeight="700">
            {point.title}
          </text>
        </g>
      ))}
      <text x="36" y="40" fill="#f6f1e8" fontSize="18" fontWeight="700">
        Суточный цикл района
      </text>
      <text x="36" y="64" fill="#9eb2c0" fontSize="12">
        Комфорт доказывается не рендером, а тем как район держит обычный день
      </text>
    </svg>
  );
}

function scenarioTotal(key: keyof CostCategory) {
  return costScenario.categoryTotals.reduce((sum, category) => sum + Number(category[key]), 0);
}

function stackedHeights(key: "low" | "base" | "high") {
  const total = scenarioTotal(key);
  let current = 0;
  return costScenario.categoryTotals.map((category) => {
    const value = category[key];
    const height = (value / total) * 210;
    current += height;
    return {
      label: category.label,
      value,
      height,
      offset: current
    };
  });
}

export function CapexGraphic() {
  const palettes = ["#9dd0da", "#f4d19a", "#e77b47", "#325c75", "#5ea27c", "#d1d7db"];
  const scenarios: Array<"low" | "base" | "high"> = ["low", "base", "high"];

  return (
    <svg viewBox="0 0 620 380" role="img" aria-labelledby="capex-title">
      <title id="capex-title">Stacked bar chart по CAPEX для low, base и high сценариев</title>
      <rect width="620" height="380" rx="34" fill="#f7f2e8" />
      <text x="36" y="42" fill="#102030" fontSize="18" fontWeight="700">
        CAPEX build-out
      </text>
      <text x="36" y="66" fill="#60717f" fontSize="12">
        Low / Base / High без земли и стоимости капитала
      </text>
      {scenarios.map((scenario, index) => {
        const x = 110 + index * 150;
        const segments = stackedHeights(scenario);
        return (
          <g key={scenario}>
            <text x={x + 34} y="320" textAnchor="middle" fontSize="12" fontWeight="700" fill="#102030">
              {scenario.toUpperCase()}
            </text>
            {segments.map((segment, segmentIndex) => (
              <rect
                key={segment.label}
                x={x}
                y={292 - segment.offset}
                width="68"
                height={segment.height}
                rx="12"
                fill={palettes[segmentIndex]}
              />
            ))}
          </g>
        );
      })}
      {costScenario.categoryTotals.map((category, index) => (
        <g key={category.label}>
          <rect x="402" y={102 + index * 34} width="18" height="18" rx="6" fill={palettes[index]} />
          <text x="432" y={115 + index * 34} fill="#102030" fontSize="12">
            {category.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function PhaseGraphic() {
  return (
    <svg viewBox="0 0 620 340" role="img" aria-labelledby="phase-title">
      <title id="phase-title">Три волны развития района с указанием жителей, фокуса и бюджета</title>
      <rect width="620" height="340" rx="34" fill="#102030" />
      <text x="36" y="44" fill="#f6f1e8" fontSize="18" fontWeight="700">
        3 волны реализации
      </text>
      <text x="36" y="68" fill="#9eb2c0" fontSize="12">
        Каждая волна завершает рабочий кусок города
      </text>
      {phases.map((phase, index) => {
        const x = 42 + index * 190;
        const phaseLabels = ["ядро + 2 квартала", "кольцо + рабочие места", "периферия + резерв"];
        return (
          <g key={phase.phase}>
            <rect x={x} y="96" width="164" height="188" rx="24" fill={index === 1 ? "#f4d19a" : "#17334a"} />
            <text
              x={x + 20}
              y="126"
              fill={index === 1 ? "#102030" : "#f6f1e8"}
              fontSize="14"
              fontWeight="700"
            >
              {phase.phase}
            </text>
            <text x={x + 20} y="148" fill={index === 1 ? "#102030" : "#9eb2c0"} fontSize="12">
              {phase.residents}
            </text>
            <text x={x + 20} y="190" fill={index === 1 ? "#102030" : "#f6f1e8"} fontSize="12">
              {phaseLabels[index]}
            </text>
            <text
              x={x + 20}
              y="244"
              fill={index === 1 ? "#102030" : "#f4d19a"}
              fontSize="13"
              fontWeight="700"
            >
              {new Intl.NumberFormat("ru-RU", {
                notation: "compact",
                maximumFractionDigits: 1
              }).format(phase.capex)}
              {" ₸"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
