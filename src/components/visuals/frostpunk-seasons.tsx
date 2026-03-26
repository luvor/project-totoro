export function FrostpunkSeasons() {
  return (
    <svg viewBox="0 0 1200 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Зима и лето — два режима города">
      <defs>
        {/* Winter sky */}
        <linearGradient id="fpss-winter-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#060a14" />
          <stop offset="100%" stopColor="#0d1a2e" />
        </linearGradient>

        {/* Summer sky */}
        <linearGradient id="fpss-summer-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a3828" />
          <stop offset="60%" stopColor="#0e2a1a" />
          <stop offset="100%" stopColor="#0a1a10" />
        </linearGradient>

        {/* Warm gallery glow */}
        <radialGradient id="fpss-warm" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>

        {/* Summer sun glow */}
        <radialGradient id="fpss-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
          <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>

        <filter id="fpss-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="fpss-steam" x="-50%" y="-100%" width="200%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
        </filter>

        <filter id="fpss-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>

        <clipPath id="fpss-left-clip">
          <rect x="0" y="0" width="590" height="500" />
        </clipPath>
        <clipPath id="fpss-right-clip">
          <rect x="610" y="0" width="590" height="500" />
        </clipPath>
      </defs>

      {/* ════════════════════════════════════════════
           LEFT PANEL — WINTER
         ════════════════════════════════════════════ */}
      <g clipPath="url(#fpss-left-clip)">
        {/* Winter sky */}
        <rect x="0" y="0" width="590" height="500" fill="url(#fpss-winter-sky)" />

        {/* Stars */}
        {[
          [50, 30], [120, 50], [200, 25], [280, 60], [350, 35], [430, 45], [510, 20], [80, 80], [300, 70], [470, 55],
        ].map(([x, y], i) => (
          <circle key={`wstar-${i}`} cx={x} cy={y} r={1 + (i % 2) * 0.5} fill="white" opacity={0.15 + (i % 3) * 0.08} />
        ))}

        {/* Ground — snowy */}
        <rect x="0" y="340" width="590" height="160" fill="#0a1525" />
        <path d="M0 340 Q150 330 300 340 Q450 332 590 340 L590 345 L0 345Z" fill="#1a2e42" opacity="0.3" />

        {/* Buildings */}
        <rect x="30" y="180" width="60" height="160" rx="3" fill="#0f1e30" stroke="#1a2e42" strokeWidth="0.5" />
        <rect x="30" y="176" width="60" height="6" rx="1" fill="#c8d8e8" opacity="0.3" /> {/* Snow */}
        {[195, 215, 235, 255, 275, 295, 315].map((y) =>
          [40, 60, 75].map((x, xi) => (
            <rect key={`wbw1-${y}-${xi}`} x={x} y={y} width="8" height="10" rx="1" fill="#f59e0b" opacity={0.15 + ((y + xi) % 3) * 0.12} />
          ))
        )}

        <rect x="110" y="200" width="55" height="140" rx="3" fill="#0d1825" stroke="#1a2e42" strokeWidth="0.5" />
        <rect x="110" y="196" width="55" height="5" rx="1" fill="#c8d8e8" opacity="0.25" />
        {[212, 232, 252, 272, 292, 312].map((y) =>
          [118, 138].map((x, xi) => (
            <rect key={`wbw2-${y}-${xi}`} x={x} y={y} width="8" height="10" rx="1" fill="#f59e0b" opacity={0.12 + ((y + xi) % 4) * 0.1} />
          ))
        )}

        <rect x="400" y="190" width="65" height="150" rx="3" fill="#0f1e30" stroke="#1a2e42" strokeWidth="0.5" />
        <rect x="400" y="186" width="65" height="6" rx="1" fill="#c8d8e8" opacity="0.3" />
        {[205, 225, 245, 265, 285, 305, 320].map((y) =>
          [410, 430, 448].map((x, xi) => (
            <rect key={`wbw3-${y}-${xi}`} x={x} y={y} width="8" height="10" rx="1" fill="#f59e0b" opacity={0.15 + ((y + xi) % 3) * 0.1} />
          ))
        )}

        <rect x="480" y="210" width="50" height="130" rx="3" fill="#0d1825" stroke="#1a2e42" strokeWidth="0.5" />
        <rect x="480" y="206" width="50" height="5" rx="1" fill="#c8d8e8" opacity="0.25" />
        {[222, 242, 262, 282, 302, 320].map((y) =>
          [488, 508].map((x, xi) => (
            <rect key={`wbw4-${y}-${xi}`} x={x} y={y} width="7" height="9" rx="1" fill="#f59e0b" opacity={0.12 + ((y + xi) % 3) * 0.1} />
          ))
        )}

        {/* Steam pipes on buildings */}
        <rect x="88" y="200" width="4" height="140" rx="1.5" fill="#2a3a4a" opacity="0.5" />
        <rect x="462" y="210" width="4" height="130" rx="1.5" fill="#2a3a4a" opacity="0.5" />

        {/* Steam */}
        <g filter="url(#fpss-steam)">
          <ellipse cx="90" cy="190" rx="12" ry="8" fill="white" opacity="0.05" />
          <ellipse cx="464" cy="200" rx="12" ry="8" fill="white" opacity="0.05" />
        </g>

        {/* Heated gallery connecting buildings */}
        <rect x="165" y="310" width="235" height="30" rx="6" fill="#0d1825" stroke="#3b82f6" strokeWidth="0.8" strokeOpacity="0.3" />
        {/* Gallery glass panels */}
        {[180, 210, 240, 270, 300, 330, 360].map((x) => (
          <line key={`wgp-${x}`} x1={x} y1="312" x2={x} y2="338" stroke="#3b82f6" strokeWidth="0.4" opacity="0.2" />
        ))}
        {/* Gallery warm interior */}
        <rect x="170" y="315" width="225" height="20" rx="4" fill="#f59e0b" opacity="0.06" />

        {/* People inside gallery */}
        {[200, 240, 280, 320, 360].map((x, i) => (
          <circle key={`wgpers-${i}`} cx={x} cy="328" r="2.5" fill="#f59e0b" opacity={0.3 + (i % 2) * 0.15} />
        ))}

        {/* Snow-covered trees */}
        {[
          [190, 365], [250, 370], [340, 360], [450, 375], [540, 365],
        ].map(([x, y], i) => (
          <g key={`wtree-${i}`} transform={`translate(${x},${y}) scale(0.7)`}>
            <polygon points="0,-16 -6,-2 6,-2" fill="#1a4a3a" opacity="0.6" />
            <polygon points="0,-12 -5,0 5,0" fill="#1a4a3a" opacity="0.5" />
            <rect x="-1" y="0" width="2" height="5" fill="#2a3a2a" opacity="0.4" />
            <polygon points="0,-16 -3,-10 3,-10" fill="#c8d8e8" opacity="0.25" />
          </g>
        ))}

        {/* Snowfall */}
        {Array.from({ length: 25 }).map((_, i) => {
          const x = (i * 47 + 13) % 580;
          const y = (i * 37 + 19) % 330;
          return <circle key={`wsnow-${i}`} cx={x} cy={y} r={1 + (i % 3) * 0.4} fill="white" opacity={0.08 + (i % 4) * 0.03} />;
        })}

        {/* "ZIMA" label */}
        <text x="295" y="475" fill="#06b6d4" fontSize="14" fontFamily="sans-serif" textAnchor="middle" opacity="0.4" letterSpacing="3">
          ЗИМА
        </text>
      </g>

      {/* ════════════════════════════════════════════
           CENTER DIVIDER
         ════════════════════════════════════════════ */}
      <rect x="590" y="0" width="20" height="500" fill="#0a0f1a" />
      <line x1="600" y1="20" x2="600" y2="480" stroke="#3b82f6" strokeWidth="1" opacity="0.2" strokeDasharray="6 4" />
      {/* Divider gradient overlays */}
      <rect x="585" y="0" width="10" height="500" fill="url(#fpss-winter-sky)" opacity="0.5" />
      <rect x="605" y="0" width="10" height="500" fill="url(#fpss-summer-sky)" opacity="0.5" />

      {/* ════════════════════════════════════════════
           RIGHT PANEL — SUMMER
         ════════════════════════════════════════════ */}
      <g clipPath="url(#fpss-right-clip)">
        {/* Summer sky */}
        <rect x="610" y="0" width="590" height="500" fill="url(#fpss-summer-sky)" />

        {/* Golden sun */}
        <g filter="url(#fpss-soft)">
          <circle cx="1100" cy="60" r="30" fill="url(#fpss-sun)" />
          <circle cx="1100" cy="60" r="14" fill="#f59e0b" opacity="0.4" />
          <circle cx="1100" cy="60" r="6" fill="#f59e0b" opacity="0.6" />
        </g>

        {/* Ground — green */}
        <rect x="610" y="340" width="590" height="160" fill="#0a1a10" />
        <path d="M610 340 Q760 332 910 340 Q1060 334 1200 340 L1200 345 L610 345Z" fill="#1a3a28" opacity="0.3" />

        {/* Buildings (same positions, different colors) */}
        <rect x="640" y="180" width="60" height="160" rx="3" fill="#1a3828" stroke="#2a4a38" strokeWidth="0.5" />
        {[195, 215, 235, 255, 275, 295, 315].map((y) =>
          [650, 670, 685].map((x, xi) => (
            <rect key={`sbw1-${y}-${xi}`} x={x} y={y} width="8" height="10" rx="1" fill="#f59e0b" opacity={0.08 + ((y + xi) % 3) * 0.06} />
          ))
        )}

        <rect x="720" y="200" width="55" height="140" rx="3" fill="#162a1e" stroke="#2a4a38" strokeWidth="0.5" />
        {[212, 232, 252, 272, 292, 312].map((y) =>
          [728, 748].map((x, xi) => (
            <rect key={`sbw2-${y}-${xi}`} x={x} y={y} width="8" height="10" rx="1" fill="#f59e0b" opacity={0.08 + ((y + xi) % 4) * 0.06} />
          ))
        )}

        <rect x="1010" y="190" width="65" height="150" rx="3" fill="#1a3828" stroke="#2a4a38" strokeWidth="0.5" />
        {[205, 225, 245, 265, 285, 305, 320].map((y) =>
          [1020, 1040, 1058].map((x, xi) => (
            <rect key={`sbw3-${y}-${xi}`} x={x} y={y} width="8" height="10" rx="1" fill="#f59e0b" opacity={0.08 + ((y + xi) % 3) * 0.06} />
          ))
        )}

        <rect x="1090" y="210" width="50" height="130" rx="3" fill="#162a1e" stroke="#2a4a38" strokeWidth="0.5" />
        {[222, 242, 262, 282, 302, 320].map((y) =>
          [1098, 1118].map((x, xi) => (
            <rect key={`sbw4-${y}-${xi}`} x={x} y={y} width="7" height="9" rx="1" fill="#f59e0b" opacity={0.06 + ((y + xi) % 3) * 0.06} />
          ))
        )}

        {/* Shade structures (replacing heated gallery) */}
        <rect x="775" y="300" width="235" height="10" rx="3" fill="#2a4a38" opacity="0.6" />
        {[790, 820, 850, 880, 910, 940, 970].map((x) => (
          <line key={`shade-${x}`} x1={x} y1="310" x2={x} y2="340" stroke="#2a4a38" strokeWidth="1" opacity="0.3" />
        ))}
        {/* Shadow on ground from shade structure */}
        <ellipse cx="892" cy="350" rx="120" ry="12" fill="#0a1a10" opacity="0.4" />

        {/* Green deciduous trees */}
        {[
          [800, 350], [860, 355], [950, 345], [1060, 360], [1150, 350], [750, 360],
        ].map(([x, y], i) => (
          <g key={`stree-${i}`} transform={`translate(${x},${y})`}>
            <rect x="-1.5" y="-4" width="3" height="10" rx="1" fill="#3a5a3a" opacity="0.6" />
            <ellipse cx="0" cy="-12" rx={8 + (i % 2) * 3} ry={7 + (i % 2) * 2} fill="#3a8a4a" opacity="0.5" />
            <ellipse cx={-3 + (i % 2) * 2} cy="-10" rx={5 + (i % 2) * 2} ry={5 + (i % 2)} fill="#4aad5a" opacity="0.4" />
            <ellipse cx={3 - (i % 2) * 2} cy="-11" rx={4 + (i % 2)} ry={4 + (i % 2)} fill="#3a9a4a" opacity="0.35" />
          </g>
        ))}

        {/* Outdoor dining / cafe */}
        <g>
          {/* Tables */}
          {[830, 870, 910].map((x, i) => (
            <g key={`table-${i}`}>
              <rect x={x - 8} y="365" width="16" height="2" rx="1" fill="#4a6a4a" opacity="0.5" />
              <rect x={x - 1} y="367" width="2" height="6" fill="#4a6a4a" opacity="0.4" />
              {/* People at tables */}
              <circle cx={x - 5} cy="362" r="2" fill="#8ec48d" opacity="0.4" />
              <circle cx={x + 5} cy="362" r="2" fill="#8ec48d" opacity="0.35" />
            </g>
          ))}
        </g>

        {/* People walking outside */}
        {[
          [700, 370], [760, 375], [980, 368], [1050, 372], [1130, 380],
        ].map(([x, y], i) => (
          <circle key={`spers-${i}`} cx={x} cy={y} r="2.5" fill="#8ec48d" opacity={0.3 + (i % 2) * 0.15} />
        ))}

        {/* Water feature */}
        <ellipse cx="920" cy="390" rx="30" ry="8" fill="#06b6d4" opacity="0.12" />
        <ellipse cx="920" cy="388" rx="20" ry="5" fill="#06b6d4" opacity="0.08" />

        {/* Tram */}
        <rect x="650" y="395" width="50" height="14" rx="7" fill="#8ec48d" opacity="0.4" stroke="#8ec48d" strokeWidth="0.5" />
        {[658, 672, 686].map((x) => (
          <rect key={`stw-${x}`} x={x} y="399" width="6" height="6" rx="1" fill="#f59e0b" opacity="0.15" />
        ))}
        {/* Tram track */}
        <line x1="630" y1="410" x2="1180" y2="410" stroke="#3a5a3a" strokeWidth="1.5" opacity="0.2" />

        {/* Warm golden light hint */}
        <rect x="610" y="0" width="590" height="500" fill="#f59e0b" opacity="0.015" />

        {/* "LETO" label */}
        <text x="905" y="475" fill="#8ec48d" fontSize="14" fontFamily="sans-serif" textAnchor="middle" opacity="0.4" letterSpacing="3">
          ЛЕТО
        </text>
      </g>
    </svg>
  );
}
