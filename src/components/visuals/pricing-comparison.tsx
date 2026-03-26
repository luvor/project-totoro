export function PricingComparisonGraphic() {
  return (
    <svg
      viewBox="0 0 1200 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Сравнение обычного района и Теплового Кольца"
    >
      <defs>
        {/* Cold side gradient */}
        <linearGradient id="pc-cold-sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a5568" />
          <stop offset="100%" stopColor="#2d3748" />
        </linearGradient>

        {/* Warm side gradient */}
        <linearGradient id="pc-warm-sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a2e42" />
          <stop offset="100%" stopColor="#0d1a2e" />
        </linearGradient>

        {/* Warm ambient glow */}
        <radialGradient id="pc-core-glow" cx="75%" cy="55%" r="35%">
          <stop offset="0%" stopColor="#f0c27f" stopOpacity="0.25" />
          <stop offset="40%" stopColor="#ef9461" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ef9461" stopOpacity="0" />
        </radialGradient>

        {/* Cold wind */}
        <linearGradient id="pc-wind" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#86b6c8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#86b6c8" stopOpacity="0" />
        </linearGradient>

        {/* Gallery glow */}
        <linearGradient id="pc-gallery" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f0c27f" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#f0c27f" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#f0c27f" stopOpacity="0.5" />
        </linearGradient>

        <filter id="pc-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="pc-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>

        {/* Ground textures */}
        <linearGradient id="pc-cold-ground" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a5568" />
          <stop offset="100%" stopColor="#2d3748" />
        </linearGradient>

        <linearGradient id="pc-warm-ground" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0d1a2e" />
        </linearGradient>
      </defs>

      {/* ====== LEFT SIDE: Conventional District (cold, grey) ====== */}
      <rect x="0" y="0" width="600" height="600" fill="url(#pc-cold-sky)" />

      {/* Cold ground */}
      <path d="M0 320 Q150 300 300 310 Q450 300 600 320 L600 600 L0 600Z" fill="#374151" opacity="0.7" />
      <path d="M0 360 Q200 340 400 355 Q500 345 600 360 L600 600 L0 600Z" fill="#2d3748" opacity="0.5" />

      {/* Grey overcast clouds */}
      <ellipse cx="120" cy="60" rx="90" ry="25" fill="#6b7280" opacity="0.3" />
      <ellipse cx="300" cy="45" rx="110" ry="30" fill="#6b7280" opacity="0.25" />
      <ellipse cx="480" cy="70" rx="80" ry="22" fill="#6b7280" opacity="0.3" />

      {/* Wind indicators */}
      {[
        [40, 180], [80, 200], [30, 220], [90, 160], [60, 240],
        [120, 190], [50, 260], [100, 280],
      ].map(([x, y], i) => (
        <line
          key={`wind-${i}`}
          x1={x}
          y1={y}
          x2={x + 35 + (i % 3) * 10}
          y2={y - 3 + (i % 2) * 6}
          stroke="#86b6c8"
          strokeWidth={1 + (i % 2) * 0.5}
          opacity={0.2 + (i % 3) * 0.08}
          strokeLinecap="round"
        />
      ))}

      {/* Conventional buildings — boxy, grey, uniform */}
      {/* Row 1 */}
      <rect x="80" y="240" width="55" height="100" rx="2" fill="#4a5568" stroke="#374151" strokeWidth="1" />
      {[252, 268, 284, 300, 316].map((y, i) => (
        <g key={`b1w-${i}`}>
          <rect x={90} y={y} width="8" height="8" rx="1" fill="#6b7280" opacity="0.5" />
          <rect x={104} y={y} width="8" height="8" rx="1" fill="#6b7280" opacity="0.45" />
          <rect x={118} y={y} width="8" height="8" rx="1" fill="#6b7280" opacity="0.5" />
        </g>
      ))}

      <rect x="150" y="220" width="50" height="120" rx="2" fill="#4b5563" stroke="#374151" strokeWidth="1" />
      {[232, 248, 264, 280, 296, 312].map((y, i) => (
        <g key={`b2w-${i}`}>
          <rect x={158} y={y} width="7" height="8" rx="1" fill="#6b7280" opacity="0.45" />
          <rect x={172} y={y} width="7" height="8" rx="1" fill="#6b7280" opacity="0.5" />
          <rect x={186} y={y} width="7" height="8" rx="1" fill="#6b7280" opacity="0.45" />
        </g>
      ))}

      <rect x="215" y="255" width="45" height="85" rx="2" fill="#4a5568" stroke="#374151" strokeWidth="1" />
      {[268, 284, 300, 316].map((y, i) => (
        <g key={`b3w-${i}`}>
          <rect x={223} y={y} width="7" height="7" rx="1" fill="#6b7280" opacity="0.5" />
          <rect x={237} y={y} width="7" height="7" rx="1" fill="#6b7280" opacity="0.45" />
          <rect x={249} y={y} width="7" height="7" rx="1" fill="#6b7280" opacity="0.5" />
        </g>
      ))}

      {/* Row 2 */}
      <rect x="290" y="270" width="50" height="80" rx="2" fill="#4b5563" stroke="#374151" strokeWidth="1" />
      {[282, 296, 310, 324].map((y, i) => (
        <g key={`b4w-${i}`}>
          <rect x={298} y={y} width="7" height="7" rx="1" fill="#6b7280" opacity="0.45" />
          <rect x={312} y={y} width="7" height="7" rx="1" fill="#6b7280" opacity="0.5" />
          <rect x={326} y={y} width="7" height="7" rx="1" fill="#6b7280" opacity="0.45" />
        </g>
      ))}

      <rect x="360" y="250" width="55" height="90" rx="2" fill="#4a5568" stroke="#374151" strokeWidth="1" />
      {[262, 278, 294, 310, 322].map((y, i) => (
        <g key={`b5w-${i}`}>
          <rect x={368} y={y} width="8" height="8" rx="1" fill="#6b7280" opacity="0.5" />
          <rect x={382} y={y} width="8" height="8" rx="1" fill="#6b7280" opacity="0.45" />
          <rect x={398} y={y} width="8" height="8" rx="1" fill="#6b7280" opacity="0.5" />
        </g>
      ))}

      <rect x="430" y="275" width="45" height="65" rx="2" fill="#4b5563" stroke="#374151" strokeWidth="1" />
      {[288, 302, 318].map((y, i) => (
        <g key={`b6w-${i}`}>
          <rect x={438} y={y} width="7" height="7" rx="1" fill="#6b7280" opacity="0.45" />
          <rect x={452} y={y} width="7" height="7" rx="1" fill="#6b7280" opacity="0.5" />
        </g>
      ))}

      {/* Road with cars (cold side) */}
      <rect x="60" y="365" width="520" height="30" rx="2" fill="#374151" opacity="0.6" />
      <line x1="70" y1="380" x2="570" y2="380" stroke="#6b7280" strokeWidth="1" strokeDasharray="12 8" opacity="0.4" />

      {/* Cars */}
      {[
        [110, 372, "#6b7280"], [200, 382, "#4b5563"], [310, 374, "#6b7280"],
        [400, 384, "#4b5563"], [480, 376, "#6b7280"],
      ].map(([x, y, color], i) => (
        <g key={`car-${i}`}>
          <rect x={x as number} y={y as number} width="24" height="10" rx="3" fill={color as string} opacity="0.7" />
          <rect x={(x as number) + 3} y={(y as number) - 3} width="10" height="5" rx="2" fill={color as string} opacity="0.5" />
          {/* Exhaust */}
          <circle cx={(x as number) - 3} cy={(y as number) + 7} r="2" fill="#9ca3af" opacity="0.2" />
          <circle cx={(x as number) - 7} cy={(y as number) + 5} r="3" fill="#9ca3af" opacity="0.1" />
        </g>
      ))}

      {/* Bare asphalt — no greenery */}
      <rect x="100" y="410" width="400" height="4" rx="1" fill="#4b5563" opacity="0.3" />
      <rect x="120" y="430" width="350" height="3" rx="1" fill="#4b5563" opacity="0.2" />

      {/* Cold side labels */}
      <g>
        {/* Heating cost icon + label */}
        <g transform="translate(100, 470)">
          <circle cx="12" cy="12" r="14" fill="#ef4444" opacity="0.15" />
          <text x="12" y="16" textAnchor="middle" fontSize="14" fill="#ef4444" opacity="0.7" fontFamily="system-ui">$$$</text>
          <text x="36" y="17" fontSize="11" fill="#b3c1cd" opacity="0.7" fontFamily="system-ui">Отопление дорого</text>
        </g>

        {/* Property value icon */}
        <g transform="translate(100, 505)">
          <path d="M12 4 L22 12 L22 24 L2 24 L2 12Z" fill="#6b7280" opacity="0.35" stroke="#6b7280" strokeWidth="0.8" />
          <text x="12" y="19" textAnchor="middle" fontSize="8" fill="#9ca3af" opacity="0.5" fontFamily="system-ui">-</text>
          <text x="36" y="19" fontSize="11" fill="#b3c1cd" opacity="0.7" fontFamily="system-ui">Стоимость стагнирует</text>
        </g>

        {/* Air quality */}
        <g transform="translate(100, 540)">
          <circle cx="12" cy="12" r="14" fill="#6b7280" opacity="0.15" />
          <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#9ca3af" opacity="0.6" fontFamily="system-ui">CO2</text>
          <text x="36" y="17" fontSize="11" fill="#b3c1cd" opacity="0.7" fontFamily="system-ui">Выхлопы и пробки</text>
        </g>
      </g>

      {/* ====== DIVIDER ====== */}
      <line x1="600" y1="30" x2="600" y2="570" stroke="#ece4d6" strokeWidth="1" opacity="0.15" strokeDasharray="4 4" />

      {/* VS label */}
      <g transform="translate(600, 290)">
        <circle cx="0" cy="0" r="22" fill="#1a2e42" stroke="#ece4d6" strokeWidth="1" opacity="0.5" />
        <text x="0" y="5" textAnchor="middle" fontSize="14" fill="#ece4d6" opacity="0.7" fontWeight="bold" fontFamily="system-ui">VS</text>
      </g>

      {/* ====== RIGHT SIDE: Thermal Ring (warm, alive) ====== */}
      <rect x="600" y="0" width="600" height="600" fill="url(#pc-warm-sky)" />

      {/* Warm ambient glow overlay */}
      <rect x="600" y="0" width="600" height="600" fill="url(#pc-core-glow)" />

      {/* Warm ground */}
      <path d="M600 320 Q750 300 900 310 Q1050 300 1200 320 L1200 600 L600 600Z" fill="#1e3a5f" opacity="0.5" />
      <path d="M600 360 Q800 340 1000 355 Q1100 345 1200 360 L1200 600 L600 600Z" fill="#0d1a2e" opacity="0.4" />

      {/* Ring structure — the district ring */}
      <ellipse cx="900" cy="340" rx="200" ry="90" fill="none" stroke="#f0c27f" strokeWidth="2.5" opacity="0.2" />
      <ellipse cx="900" cy="340" rx="202" ry="92" fill="none" stroke="#ef9461" strokeWidth="0.8" opacity="0.12" />

      {/* Thermal core center */}
      <g filter="url(#pc-glow)">
        <circle cx="900" cy="320" r="30" fill="#f0c27f" opacity="0.12" />
        <circle cx="900" cy="320" r="18" fill="#f0c27f" opacity="0.25" />
        <circle cx="900" cy="320" r="8" fill="#f0c27f" opacity="0.5" />
      </g>

      {/* Core structure */}
      <rect x="886" y="305" width="28" height="35" rx="3" fill="#1a2e42" stroke="#f0c27f" strokeWidth="1.2" opacity="0.9" />
      <rect x="892" y="298" width="16" height="9" rx="2" fill="#2a4050" stroke="#ef9461" strokeWidth="0.8" />

      {/* Heated galleries radiating from core */}
      {[
        [900, 330, 760, 290], [900, 330, 1040, 290],
        [900, 340, 740, 370], [900, 340, 1060, 370],
        [900, 350, 800, 400], [900, 350, 1000, 400],
      ].map(([x1, y1, x2, y2], i) => (
        <g key={`gallery-${i}`}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f0c27f" strokeWidth="5" opacity="0.06" strokeLinecap="round" />
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f0c27f" strokeWidth="1.2" opacity="0.2" strokeLinecap="round" />
        </g>
      ))}

      {/* Warm buildings on the ring — varied, with warm windows */}
      {/* North-West */}
      <g>
        <rect x="725" y="250" width="40" height="55" rx="3" fill="#1a3248" stroke="#1e3a5f" strokeWidth="0.5" />
        {[260, 274, 288].map((y, i) => (
          <g key={`rbnw-${i}`}>
            <rect x={732} y={y} width="5" height="5" rx="1" fill="#f0c27f" opacity={0.35 + (i % 2) * 0.15} />
            <rect x={744} y={y} width="5" height="5" rx="1" fill="#f0c27f" opacity={0.3 + (i % 2) * 0.2} />
            <rect x={754} y={y} width="5" height="5" rx="1" fill="#f0c27f" opacity={0.35 + (i % 3) * 0.1} />
          </g>
        ))}
      </g>

      {/* North */}
      <g>
        <rect x="870" y="235" width="45" height="60" rx="3" fill="#1e3a50" stroke="#1e3a5f" strokeWidth="0.5" />
        {[246, 260, 274].map((y, i) => (
          <g key={`rbn-${i}`}>
            <rect x={878} y={y} width="5" height="6" rx="1" fill="#f0c27f" opacity={0.3 + (i % 2) * 0.2} />
            <rect x={890} y={y} width="5" height="6" rx="1" fill="#f0c27f" opacity={0.35 + (i % 2) * 0.15} />
            <rect x={902} y={y} width="5" height="6" rx="1" fill="#f0c27f" opacity={0.3 + (i % 3) * 0.15} />
          </g>
        ))}
      </g>

      {/* North-East */}
      <g>
        <rect x="1020" y="255" width="38" height="50" rx="3" fill="#1a3248" stroke="#1e3a5f" strokeWidth="0.5" />
        {[264, 278, 290].map((y, i) => (
          <g key={`rbne-${i}`}>
            <rect x={1027} y={y} width="5" height="5" rx="1" fill="#f0c27f" opacity={0.35 + (i % 2) * 0.15} />
            <rect x={1039} y={y} width="5" height="5" rx="1" fill="#f0c27f" opacity={0.3 + (i % 2) * 0.2} />
          </g>
        ))}
      </g>

      {/* West */}
      <g>
        <rect x="700" y="340" width="35" height="45" rx="3" fill="#1e3a50" stroke="#1e3a5f" strokeWidth="0.5" />
        {[350, 362, 374].map((y, i) => (
          <g key={`rbw-${i}`}>
            <rect x={707} y={y} width="5" height="5" rx="1" fill="#f0c27f" opacity={0.35 + (i % 2) * 0.15} />
            <rect x={719} y={y} width="5" height="5" rx="1" fill="#f0c27f" opacity={0.3 + (i % 2) * 0.2} />
          </g>
        ))}
      </g>

      {/* East */}
      <g>
        <rect x="1055" y="345" width="38" height="48" rx="3" fill="#1a3248" stroke="#1e3a5f" strokeWidth="0.5" />
        {[354, 366, 378].map((y, i) => (
          <g key={`rbe-${i}`}>
            <rect x={1062} y={y} width="5" height="5" rx="1" fill="#f0c27f" opacity={0.3 + (i % 2) * 0.2} />
            <rect x={1074} y={y} width="5" height="5" rx="1" fill="#f0c27f" opacity={0.35 + (i % 2) * 0.15} />
            <rect x={1083} y={y} width="5" height="5" rx="1" fill="#f0c27f" opacity={0.3 + (i % 3) * 0.1} />
          </g>
        ))}
      </g>

      {/* South-West */}
      <g>
        <rect x="775" y="388" width="35" height="42" rx="3" fill="#1e3a50" stroke="#1e3a5f" strokeWidth="0.5" />
        {[396, 408, 418].map((y, i) => (
          <g key={`rbsw-${i}`}>
            <rect x={782} y={y} width="5" height="5" rx="1" fill="#f0c27f" opacity={0.3 + (i % 2) * 0.2} />
            <rect x={794} y={y} width="5" height="5" rx="1" fill="#f0c27f" opacity={0.35 + (i % 2) * 0.15} />
          </g>
        ))}
      </g>

      {/* South-East */}
      <g>
        <rect x="985" y="390" width="35" height="42" rx="3" fill="#1a3248" stroke="#1e3a5f" strokeWidth="0.5" />
        {[398, 410, 420].map((y, i) => (
          <g key={`rbse-${i}`}>
            <rect x={992} y={y} width="5" height="5" rx="1" fill="#f0c27f" opacity={0.35 + (i % 2) * 0.15} />
            <rect x={1004} y={y} width="5" height="5" rx="1" fill="#f0c27f" opacity={0.3 + (i % 2) * 0.2} />
          </g>
        ))}
      </g>

      {/* Tram loop */}
      <ellipse cx="900" cy="340" rx="190" ry="85" fill="none" stroke="#86b6c8" strokeWidth="2" strokeDasharray="10 5" opacity="0.2" />

      {/* Tram */}
      <g>
        <rect x="710" y="300" width="18" height="7" rx="3.5" fill="#86b6c8" opacity="0.5" stroke="#86b6c8" strokeWidth="0.5" />
        <rect x="713" y="302" width="4" height="3" rx="1" fill="#f0c27f" opacity="0.4" />
        <rect x="719" y="302" width="4" height="3" rx="1" fill="#f0c27f" opacity="0.35" />
      </g>

      {/* Green parks (inside and around the ring) */}
      {[
        [820, 310, 0.7], [960, 315, 0.6], [850, 380, 0.65],
        [940, 385, 0.7], [890, 365, 0.55], [780, 350, 0.5],
        [1020, 355, 0.55], [830, 275, 0.5], [960, 280, 0.5],
      ].map(([x, y, s], i) => (
        <g key={`park-${i}`} transform={`translate(${x},${y}) scale(${s})`}>
          <ellipse cx="0" cy="0" rx="5" ry="4.5" fill="#9bcf87" opacity="0.5" />
          <ellipse cx="0" cy="-2" rx="3.5" ry="3" fill="#9bcf87" opacity="0.35" />
        </g>
      ))}

      {/* People walking in warm district */}
      {[
        [800, 330], [850, 350], [930, 355], [970, 340],
        [870, 310], [920, 370], [840, 390], [960, 395],
        [760, 315], [1030, 330],
      ].map(([x, y], i) => (
        <circle key={`wp-${i}`} cx={x} cy={y} r={1.8} fill="#f0c27f" opacity={0.35 + (i % 3) * 0.12} />
      ))}

      {/* Warm side labels */}
      <g>
        {/* Heating cost */}
        <g transform="translate(680, 470)">
          <circle cx="12" cy="12" r="14" fill="#9bcf87" opacity="0.15" />
          <text x="12" y="16" textAnchor="middle" fontSize="14" fill="#9bcf87" opacity="0.7" fontFamily="system-ui">$</text>
          <text x="36" y="17" fontSize="11" fill="#ece4d6" opacity="0.7" fontFamily="system-ui">-60% за отопление</text>
        </g>

        {/* Property value */}
        <g transform="translate(680, 505)">
          <path d="M12 4 L22 12 L22 24 L2 24 L2 12Z" fill="#f0c27f" opacity="0.3" stroke="#f0c27f" strokeWidth="0.8" />
          <text x="12" y="19" textAnchor="middle" fontSize="10" fill="#f0c27f" opacity="0.6" fontFamily="system-ui" fontWeight="bold">&uarr;</text>
          <text x="36" y="19" fontSize="11" fill="#ece4d6" opacity="0.7" fontFamily="system-ui">+25% к стоимости</text>
        </g>

        {/* Clean air */}
        <g transform="translate(680, 540)">
          <circle cx="12" cy="12" r="14" fill="#9bcf87" opacity="0.15" />
          <text x="12" y="17" textAnchor="middle" fontSize="10" fill="#9bcf87" opacity="0.7" fontFamily="system-ui">O2</text>
          <text x="36" y="17" fontSize="11" fill="#ece4d6" opacity="0.7" fontFamily="system-ui">Чистый воздух, трамвай</text>
        </g>
      </g>

      {/* Section titles */}
      <text x="300" y="50" textAnchor="middle" fontSize="16" fill="#b3c1cd" opacity="0.6" fontWeight="bold" fontFamily="system-ui" letterSpacing="2">
        ОБЫЧНЫЙ РАЙОН
      </text>
      <text x="900" y="50" textAnchor="middle" fontSize="16" fill="#f0c27f" opacity="0.65" fontWeight="bold" fontFamily="system-ui" letterSpacing="2">
        ТЕПЛОВОЕ КОЛЬЦО
      </text>

      {/* Subtle temperature indicators */}
      {/* Cold snowflake symbols on left */}
      {[
        [160, 140], [350, 120], [480, 155], [250, 170],
      ].map(([x, y], i) => (
        <text key={`snow-${i}`} x={x} y={y} fontSize="10" fill="#86b6c8" opacity={0.15 + (i % 3) * 0.05} fontFamily="system-ui">*</text>
      ))}

      {/* Warm particles on right */}
      {[
        [720, 130], [840, 110], [1000, 140], [1100, 120],
        [760, 170], [950, 160], [1060, 180],
      ].map(([x, y], i) => (
        <circle key={`warm-${i}`} cx={x} cy={y} r={1.2 + (i % 2) * 0.5} fill="#f0c27f" opacity={0.12 + (i % 3) * 0.06} />
      ))}

      {/* Vignette */}
      <rect width="1200" height="600" fill="none" stroke="#060a14" strokeWidth="40" strokeOpacity="0.3" rx="10" />
    </svg>
  );
}
