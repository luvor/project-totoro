export function MetricsInfographic() {
  const bars = [
    { label: "Доступ к свету", value: 92, color: "#f0c27f", unit: "%" },
    { label: "Деревья < 200м", value: 98, color: "#89b26e", unit: "%" },
    { label: "Step-free маршруты", value: 100, color: "#92bdd2", unit: "%" },
    { label: "Летняя тень", value: 85, color: "#ef9461", unit: "%" },
    { label: "Активный фасад", value: 78, color: "#86b6c8", unit: "%" },
    { label: "Дети до площадки", value: 95, color: "#9bcf87", unit: "%" },
  ];

  const barWidth = 320;
  const barHeight = 18;
  const startY = 90;
  const gap = 44;

  return (
    <svg viewBox="0 0 560 400" role="img" aria-labelledby="metrics-infographic-title" className="detailed-svg-graphic">
      <title id="metrics-infographic-title">Ключевые метрики качества среды района</title>
      <rect width="560" height="400" rx="30" fill="#0f1d2c" />

      <text x="40" y="44" fontSize="14" fontWeight="700" fill="#f7f4ee">Метрики среды</text>
      <text x="40" y="62" fontSize="10" fill="#9eb3c2">Ключевые показатели качества жизни в районе</text>

      {bars.map((bar, i) => {
        const y = startY + i * gap;
        const filledWidth = (bar.value / 100) * barWidth;
        return (
          <g key={bar.label}>
            <text x="40" y={y - 6} fontSize="11" fill="#f7f4ee" opacity="0.9">
              {bar.label}
            </text>
            <text x={40 + barWidth + 16} y={y + barHeight / 2 + 4} fontSize="12" fontWeight="700" fill={bar.color}>
              {bar.value}{bar.unit}
            </text>
            <rect
              x="40"
              y={y}
              width={barWidth}
              height={barHeight}
              rx="9"
              fill="rgba(255,255,255,0.06)"
            />
            <rect
              x="40"
              y={y}
              width={filledWidth}
              height={barHeight}
              rx="9"
              fill={bar.color}
              opacity="0.7"
            />
            <rect
              x="40"
              y={y}
              width={filledWidth}
              height={barHeight / 2}
              rx="9"
              fill={bar.color}
              opacity="0.15"
            />
          </g>
        );
      })}

      <line x1="40" y1={startY + bars.length * gap + 6} x2={40 + barWidth} y2={startY + bars.length * gap + 6} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <text x="40" y={startY + bars.length * gap + 24} fontSize="9" fill="#9eb3c2" opacity="0.6">
        Данные из atlas benchmark / Flagship-сценарий
      </text>
    </svg>
  );
}

export function ClimateModesGraphic() {
  const modes = [
    {
      id: "winter",
      label: "Зима",
      temp: "-35\u00B0C",
      icon: "M 0 -12 L 0 12 M -10 -6 L 10 6 M -10 6 L 10 -6",
      color: "#92bdd2",
      features: ["Ветрозащита", "Тепловое кольцо", "Step-free"],
    },
    {
      id: "summer",
      label: "Лето",
      temp: "+30\u00B0C",
      icon: "M 0 0 m -8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0",
      color: "#f0c27f",
      features: ["Тень 85%", "Night purge", "Cooling commons"],
    },
    {
      id: "blizzard",
      label: "Пурга",
      temp: "-40\u00B0C",
      icon: "M -8 -4 Q 0 -10 8 -4 Q 0 2 -8 -4 M -6 4 Q 0 -2 6 4",
      color: "#86b6c8",
      features: ["Fallback-путь", "Ядро работает", "Минимум 4ч"],
    },
    {
      id: "heat",
      label: "Жара",
      temp: "+35\u00B0C",
      icon: "M 0 -10 Q 6 -4 0 2 Q -6 -4 0 -10 M 0 2 L 0 10",
      color: "#ef9461",
      features: ["Canopy активен", "Фонтаны", "Ночной режим"],
    },
  ];

  const cardW = 120;
  const startX = 40;
  const gap = 130;

  return (
    <svg viewBox="0 0 580 320" role="img" aria-labelledby="climate-modes-title" className="detailed-svg-graphic">
      <title id="climate-modes-title">Четыре климатических режима района и их ключевые стратегии</title>
      <rect width="580" height="320" rx="30" fill="#0f1d2c" />

      <text x="40" y="44" fontSize="14" fontWeight="700" fill="#f7f4ee">Климатические режимы</text>
      <text x="40" y="62" fontSize="10" fill="#9eb3c2">Четыре сценария работы городской инфраструктуры</text>

      {modes.map((mode, i) => {
        const x = startX + i * gap;
        const y = 90;
        return (
          <g key={mode.id}>
            <rect
              x={x}
              y={y}
              width={cardW}
              height={200}
              rx="16"
              fill="rgba(255,255,255,0.04)"
              stroke={mode.color}
              strokeWidth="1"
              strokeOpacity="0.3"
            />

            <circle cx={x + cardW / 2} cy={y + 40} r="22" fill={mode.color} opacity="0.15" />
            <g transform={`translate(${x + cardW / 2}, ${y + 40})`}>
              <path d={mode.icon} stroke={mode.color} strokeWidth="1.5" fill="none" opacity="0.8" />
            </g>

            <text x={x + cardW / 2} y={y + 76} textAnchor="middle" fontSize="12" fontWeight="700" fill="#f7f4ee">
              {mode.label}
            </text>
            <text x={x + cardW / 2} y={y + 92} textAnchor="middle" fontSize="10" fill={mode.color} opacity="0.8">
              {mode.temp}
            </text>

            <line x1={x + 16} y1={y + 102} x2={x + cardW - 16} y2={y + 102} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

            {mode.features.map((feat, fi) => (
              <g key={feat}>
                <circle cx={x + 20} cy={y + 120 + fi * 22} r="2.5" fill={mode.color} opacity="0.5" />
                <text x={x + 30} y={y + 124 + fi * 22} fontSize="9" fill="#b3c1cd">
                  {feat}
                </text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
