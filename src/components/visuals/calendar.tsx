const months = [
  { label: "Янв", temp: -18, fill: "#6e90ab", mode: "heating" },
  { label: "Фев", temp: -15, fill: "#789ab0", mode: "heating" },
  { label: "Мар", temp: -6, fill: "#8aacbe", mode: "heating" },
  { label: "Апр", temp: 4, fill: "#a8c8a0", mode: "shoulder" },
  { label: "Май", temp: 12, fill: "#8ec48d", mode: "shoulder" },
  { label: "Июн", temp: 18, fill: "#7aba6a", mode: "cooling" },
  { label: "Июл", temp: 22, fill: "#efb069", mode: "cooling" },
  { label: "Авг", temp: 20, fill: "#ef9461", mode: "cooling" },
  { label: "Сен", temp: 12, fill: "#c4ba88", mode: "shoulder" },
  { label: "Окт", temp: 4, fill: "#8aa6b8", mode: "shoulder" },
  { label: "Ноя", temp: -6, fill: "#789ab0", mode: "heating" },
  { label: "Дек", temp: -14, fill: "#6a8aa6", mode: "heating" },
];

const modeColors: Record<string, string> = {
  heating: "#ef9461",
  cooling: "#7aaabe",
  shoulder: "#c4ba88",
};

const modeLabels: Record<string, string> = {
  heating: "Отопление",
  cooling: "Охлаждение",
  shoulder: "Межсезонье",
};

export function SeasonalCalendarGraphic() {
  const barWidth = 34;
  const gap = 7;
  const chartLeft = 32;
  const chartTop = 86;
  const chartHeight = 78;
  const tempMin = -20;
  const tempMax = 25;
  const tempRange = tempMax - tempMin;

  // Temperature curve points
  const curvePoints = months.map((m, i) => {
    const x = chartLeft + i * (barWidth + gap) + barWidth / 2;
    const y = chartTop + chartHeight - ((m.temp - tempMin) / tempRange) * chartHeight;
    return { x, y };
  });

  const curvePath =
    `M ${curvePoints[0].x} ${curvePoints[0].y}` +
    curvePoints
      .slice(1)
      .map((pt, i) => {
        const prev = curvePoints[i];
        const cpx1 = prev.x + (barWidth + gap) * 0.4;
        const cpx2 = pt.x - (barWidth + gap) * 0.4;
        return ` C ${cpx1} ${prev.y}, ${cpx2} ${pt.y}, ${pt.x} ${pt.y}`;
      })
      .join("");

  return (
    <svg viewBox="0 0 560 250" role="img" aria-labelledby="seasonal-calendar-title">
      <title id="seasonal-calendar-title">Годовой климатический календарь с температурной кривой</title>
      <rect width="560" height="250" rx="28" fill="#f1eee8" />

      <text x="32" y="36" fill="#1c3347" fontSize="16" fontWeight="700">
        Годовой климатический календарь
      </text>
      <text x="32" y="54" fill="#51697a" fontSize="11">
        Зима, жара, межсезонье — как operational modes одного города
      </text>

      {months.map((m, i) => (
        <rect
          key={`mode-${m.label}`}
          x={chartLeft + i * (barWidth + gap)}
          y={chartTop - 14}
          width={barWidth}
          height="6"
          rx="3"
          fill={modeColors[m.mode]}
          opacity="0.6"
        />
      ))}

      {months.map((m, i) => {
        const barHeight = Math.max(12, ((m.temp - tempMin) / tempRange) * chartHeight);
        const y = chartTop + chartHeight - barHeight;
        return (
          <g key={m.label}>
            <rect
              x={chartLeft + i * (barWidth + gap)}
              y={y}
              width={barWidth}
              height={barHeight}
              rx="8"
              fill={m.fill}
            />
            <text
              x={chartLeft + i * (barWidth + gap) + barWidth / 2}
              y={y - 4}
              textAnchor="middle"
              fontSize="8"
              fill="#1c3347"
              opacity="0.6"
            >
              {m.temp > 0 ? "+" : ""}{m.temp}°
            </text>
          </g>
        );
      })}

      <path d={curvePath} fill="none" stroke="#1c3347" strokeWidth="2" strokeOpacity="0.3" />
      {curvePoints.map((pt, i) => (
        <circle key={`dot-${i}`} cx={pt.x} cy={pt.y} r="2.5" fill="#1c3347" opacity="0.4" />
      ))}

      {months.map((m, i) => (
        <text
          key={`label-${m.label}`}
          x={chartLeft + i * (barWidth + gap) + barWidth / 2}
          y={chartTop + chartHeight + 18}
          textAnchor="middle"
          fill="#1c3347"
          fontSize="10"
        >
          {m.label}
        </text>
      ))}

      {Object.entries(modeLabels).map(([key, label], i) => (
        <g key={key}>
          <rect x={32 + i * 120} y={220} width="12" height="12" rx="4" fill={modeColors[key]} opacity="0.7" />
          <text x={50 + i * 120} y={230} fontSize="10" fill="#51697a">{label}</text>
        </g>
      ))}

      <line
        x1={chartLeft - 4}
        y1={chartTop + chartHeight - ((-tempMin) / tempRange) * chartHeight}
        x2={chartLeft + 12 * (barWidth + gap)}
        y2={chartTop + chartHeight - ((-tempMin) / tempRange) * chartHeight}
        stroke="#1c3347"
        strokeWidth="0.5"
        strokeOpacity="0.2"
        strokeDasharray="4 4"
      />
      <text
        x={chartLeft - 8}
        y={chartTop + chartHeight - ((-tempMin) / tempRange) * chartHeight + 3}
        textAnchor="end"
        fontSize="8"
        fill="#1c3347"
        opacity="0.4"
      >
        0°
      </text>
    </svg>
  );
}
