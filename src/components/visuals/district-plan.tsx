export function DistrictPlanGraphic() {
  const zones = [
    { id: "residential-n", label: "Жилой N", x: 220, y: 80, w: 140, h: 70, fill: "#315b73", opacity: 0.6 },
    { id: "civic-center", label: "Civic Центр", x: 200, y: 180, w: 180, h: 80, fill: "#f0c27f", opacity: 0.5 },
    { id: "green-belt-w", label: "Зелёный пояс", x: 60, y: 120, w: 100, h: 180, fill: "#89b26e", opacity: 0.35 },
    { id: "residential-e", label: "Жилой E", x: 420, y: 100, w: 120, h: 90, fill: "#315b73", opacity: 0.5 },
    { id: "commercial", label: "Торговля", x: 400, y: 220, w: 140, h: 60, fill: "#92bdd2", opacity: 0.4 },
    { id: "residential-s", label: "Жилой S", x: 180, y: 290, w: 160, h: 70, fill: "#315b73", opacity: 0.5 },
    { id: "park", label: "Парк", x: 380, y: 310, w: 100, h: 70, fill: "#89b26e", opacity: 0.4 },
  ];

  const roads = [
    "M 60 170 H 540",
    "M 60 280 H 540",
    "M 180 50 V 400",
    "M 380 50 V 400",
    "M 280 170 V 280",
  ];

  return (
    <svg viewBox="0 0 600 440" role="img" aria-labelledby="district-plan-title" className="detailed-svg-graphic">
      <title id="district-plan-title">Генплан района: зонирование, улицы и ключевые связи</title>
      <defs>
        <linearGradient id="dp-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f1d2c" />
          <stop offset="100%" stopColor="#122132" />
        </linearGradient>
        <filter id="dp-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="600" height="440" rx="30" fill="url(#dp-bg)" />
      <rect x="30" y="30" width="540" height="380" rx="22" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {roads.map((d, i) => (
        <path key={`road-${i}`} d={d} stroke="rgba(255,255,255,0.08)" strokeWidth="3" strokeLinecap="round" />
      ))}

      {zones.map((zone) => (
        <g key={zone.id}>
          <rect
            x={zone.x}
            y={zone.y}
            width={zone.w}
            height={zone.h}
            rx="12"
            fill={zone.fill}
            opacity={zone.opacity}
            stroke={zone.fill}
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
          <text
            x={zone.x + zone.w / 2}
            y={zone.y + zone.h / 2 + 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="#f7f4ee"
            opacity="0.85"
          >
            {zone.label}
          </text>
        </g>
      ))}

      {/* Transport corridor overlay — tram ring */}
      <ellipse
        cx="290" cy="220" rx="170" ry="140"
        fill="none"
        stroke="#06b6d4"
        strokeWidth="3"
        strokeDasharray="10 6"
        strokeOpacity="0.3"
      />
      <ellipse
        cx="290" cy="220" rx="172" ry="142"
        fill="none"
        stroke="#06b6d4"
        strokeWidth="1"
        strokeOpacity="0.12"
      />
      {/* Tram stop markers on the ring */}
      {[
        { x: 290, y: 80 }, { x: 460, y: 170 }, { x: 430, y: 340 },
        { x: 290, y: 360 }, { x: 120, y: 310 }, { x: 122, y: 140 },
      ].map((s, i) => (
        <g key={`tram-stop-${i}`}>
          <circle cx={s.x} cy={s.y} r="5" fill="#0f1d2c" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.5" />
          <circle cx={s.x} cy={s.y} r="2" fill="#06b6d4" opacity="0.6" />
        </g>
      ))}

      <circle cx="290" cy="220" r="20" fill="#f0c27f" opacity="0.3" filter="url(#dp-glow)" />
      <circle cx="290" cy="220" r="12" fill="#f0c27f" opacity="0.7" />
      <circle cx="290" cy="220" r="6" fill="#0f1d2c" />

      <text x="46" y="56" fontSize="14" fontWeight="700" fill="#f7f4ee">Генплан района</text>
      <text x="46" y="74" fontSize="10" fill="#9eb3c2">Зонирование, улицы и климатический центр</text>

      <g transform="translate(46, 400)">
        <circle cx="0" cy="0" r="4" fill="#315b73" opacity="0.6" />
        <text x="10" y="4" fontSize="9" fill="#9eb3c2">Жилое</text>
        <circle cx="70" cy="0" r="4" fill="#f0c27f" opacity="0.5" />
        <text x="80" y="4" fontSize="9" fill="#9eb3c2">Civic</text>
        <circle cx="125" cy="0" r="4" fill="#89b26e" opacity="0.4" />
        <text x="135" y="4" fontSize="9" fill="#9eb3c2">Зелёная</text>
        <circle cx="195" cy="0" r="4" fill="#92bdd2" opacity="0.4" />
        <text x="205" y="4" fontSize="9" fill="#9eb3c2">Торговля</text>
        <circle cx="270" cy="0" r="4" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="2 1.5" />
        <text x="280" y="4" fontSize="9" fill="#9eb3c2">Трамвай</text>
      </g>
    </svg>
  );
}

export function ZoneLayoutGraphic() {
  const rings = [
    { r: 160, label: "Зелёный пояс", color: "#89b26e", dash: "6 4" },
    { r: 120, label: "Жилые кварталы", color: "#315b73", dash: "4 4" },
    { r: 75, label: "Активная зона", color: "#92bdd2", dash: "3 3" },
    { r: 32, label: "Ядро", color: "#f0c27f", dash: "0" },
  ];

  const radialPaths = [0, 60, 120, 180, 240, 300].map((angle) => {
    const rad = (angle * Math.PI) / 180;
    const x2 = 280 + Math.cos(rad) * 165;
    const y2 = 200 + Math.sin(rad) * 165;
    return `M 280 200 L ${x2} ${y2}`;
  });

  const nodePositions = [
    { x: 280, y: 42, label: "N" },
    { x: 423, y: 119, label: "NE" },
    { x: 423, y: 281, label: "SE" },
    { x: 280, y: 358, label: "S" },
    { x: 137, y: 281, label: "SW" },
    { x: 137, y: 119, label: "NW" },
  ];

  return (
    <svg viewBox="0 0 560 420" role="img" aria-labelledby="zone-layout-title" className="detailed-svg-graphic">
      <title id="zone-layout-title">Радиальная структура района: зоны от ядра к зелёному поясу</title>
      <rect width="560" height="420" rx="30" fill="#0f1d2c" />

      {radialPaths.map((d, i) => (
        <path key={`radial-${i}`} d={d} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}

      {rings.map((ring) => (
        <g key={ring.label}>
          <circle
            cx="280"
            cy="200"
            r={ring.r}
            fill={ring.r === 32 ? ring.color : "none"}
            fillOpacity={ring.r === 32 ? 0.3 : 0}
            stroke={ring.color}
            strokeWidth={ring.r === 32 ? 2.5 : 1.5}
            strokeOpacity="0.5"
            strokeDasharray={ring.dash}
          />
        </g>
      ))}

      {nodePositions.map((node) => (
        <g key={node.label}>
          <circle cx={node.x} cy={node.y} r="14" fill="rgba(255,255,255,0.06)" stroke="#92bdd2" strokeWidth="1" strokeOpacity="0.4" />
          <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="9" fontWeight="600" fill="#92bdd2" opacity="0.8">
            {node.label}
          </text>
        </g>
      ))}

      <circle cx="280" cy="200" r="16" fill="#f0c27f" opacity="0.7" />
      <circle cx="280" cy="200" r="8" fill="#0f1d2c" />

      <text x="280" y="200" textAnchor="middle" dominantBaseline="central" fontSize="6" fontWeight="700" fill="#f0c27f">
        C
      </text>

      {rings.map((ring, i) => (
        <text
          key={`label-${i}`}
          x="500"
          y={54 + i * 22}
          fontSize="10"
          fill={ring.color}
          opacity="0.8"
        >
          <tspan fontWeight="600">{ring.label}</tspan>
        </text>
      ))}

      {rings.map((ring, i) => (
        <line key={`legend-line-${i}`} x1="480" y1={51 + i * 22} x2="494" y2={51 + i * 22} stroke={ring.color} strokeWidth="2" strokeOpacity="0.6" strokeDasharray={ring.dash || "0"} />
      ))}

      <text x="40" y="44" fontSize="14" fontWeight="700" fill="#f7f4ee">Радиальная структура</text>
      <text x="40" y="62" fontSize="10" fill="#9eb3c2">Концентрические зоны от ядра к зелёному поясу</text>
    </svg>
  );
}
