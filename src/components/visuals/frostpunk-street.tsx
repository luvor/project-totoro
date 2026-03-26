export function FrostpunkStreet() {
  return (
    <svg viewBox="0 0 1200 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Улица с отапливаемой галереей — Frostpunk">
      <defs>
        <linearGradient id="fps-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#060a14" />
          <stop offset="100%" stopColor="#0d1a2e" />
        </linearGradient>

        <linearGradient id="fps-gallery-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0d1a2e" stopOpacity="0.6" />
        </linearGradient>

        <radialGradient id="fps-warm-light" cx="50%" cy="70%" r="60%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="fps-lamp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>

        <filter id="fps-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="fps-blur" x="-50%" y="-100%" width="200%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
        </filter>

        <filter id="fps-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>

        {/* Blizzard pattern */}
        <linearGradient id="fps-blizzard" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="30%" stopColor="white" stopOpacity="0.03" />
          <stop offset="50%" stopColor="white" stopOpacity="0.06" />
          <stop offset="70%" stopColor="white" stopOpacity="0.03" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="1200" height="500" fill="url(#fps-sky)" />

      {/* Blizzard effect across sky */}
      <rect width="1200" height="300" fill="url(#fps-blizzard)" opacity="0.5" />

      {/* === LEFT SIDE BUILDINGS === */}
      {/* Building 1 — tall */}
      <rect x="0" y="80" width="160" height="420" fill="#0f1e30" stroke="#1a2e42" strokeWidth="0.5" />
      <rect x="0" y="75" width="160" height="8" rx="1" fill="#b8c8d8" opacity="0.3" /> {/* Snow on roof */}
      {/* Windows */}
      {[110, 140, 170, 200, 230, 260, 290, 320, 350, 380].map((y) =>
        [20, 50, 80, 110, 135].map((x, xi) => (
          <rect key={`lw-${y}-${xi}`} x={x} y={y} width="14" height="18" rx="1" fill="#f59e0b" opacity={0.15 + ((y + xi) % 4) * 0.1} />
        ))
      )}
      {/* Steam pipes on building */}
      <rect x="150" y="120" width="6" height="380" rx="2" fill="#2a3a4a" opacity="0.6" />
      <rect x="152" y="120" width="2" height="380" fill="#ea580c" opacity="0.1" />

      {/* Building 2 — shorter */}
      <rect x="170" y="160" width="120" height="340" fill="#0d1825" stroke="#1a2e42" strokeWidth="0.5" />
      <rect x="170" y="155" width="120" height="7" rx="1" fill="#b8c8d8" opacity="0.25" />
      {[190, 220, 250, 280, 310, 340, 370, 400].map((y) =>
        [185, 215, 250, 270].map((x, xi) => (
          <rect key={`lw2-${y}-${xi}`} x={x} y={y} width="12" height="16" rx="1" fill="#f59e0b" opacity={0.12 + ((y + xi) % 3) * 0.1} />
        ))
      )}

      {/* === RIGHT SIDE BUILDINGS === */}
      {/* Building 3 — tall */}
      <rect x="880" y="100" width="160" height="400" fill="#0f1e30" stroke="#1a2e42" strokeWidth="0.5" />
      <rect x="880" y="95" width="160" height="8" rx="1" fill="#b8c8d8" opacity="0.3" />
      {[130, 160, 190, 220, 250, 280, 310, 340, 370, 400].map((y) =>
        [895, 925, 955, 985, 1015].map((x, xi) => (
          <rect key={`rw-${y}-${xi}`} x={x} y={y} width="14" height="18" rx="1" fill="#f59e0b" opacity={0.12 + ((y + xi) % 4) * 0.1} />
        ))
      )}
      {/* Steam pipes */}
      <rect x="876" y="140" width="6" height="360" rx="2" fill="#2a3a4a" opacity="0.6" />
      <rect x="878" y="140" width="2" height="360" fill="#ea580c" opacity="0.1" />

      {/* Building 4 */}
      <rect x="1050" y="140" width="150" height="360" fill="#0d1825" stroke="#1a2e42" strokeWidth="0.5" />
      <rect x="1050" y="135" width="150" height="7" rx="1" fill="#b8c8d8" opacity="0.25" />
      {[170, 200, 230, 260, 290, 320, 350, 380, 410].map((y) =>
        [1065, 1095, 1125, 1155].map((x, xi) => (
          <rect key={`rw2-${y}-${xi}`} x={x} y={y} width="12" height="16" rx="1" fill="#f59e0b" opacity={0.1 + ((y + xi) % 3) * 0.1} />
        ))
      )}

      {/* === GROUND / STREET === */}
      <rect x="0" y="430" width="1200" height="70" fill="#0a1420" />
      <rect x="290" y="428" width="580" height="4" fill="#1a2e42" opacity="0.5" /> {/* Curb */}

      {/* === HEATED GLASS GALLERY (CENTER) === */}
      {/* Gallery structure — glass arch */}
      <path d="M350 430 L350 200 Q600 120 850 200 L850 430Z" fill="url(#fps-gallery-glass)" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.3" />

      {/* Gallery warm interior glow */}
      <path d="M360 425 L360 210 Q600 135 840 210 L840 425Z" fill="url(#fps-warm-light)" />

      {/* Glass panel divisions — vertical */}
      {[400, 450, 500, 550, 600, 650, 700, 750, 800].map((x) => (
        <line key={`gpv-${x}`} x1={x} y1={430} x2={x} y2={200 + Math.abs(600 - x) * 0.16} stroke="#3b82f6" strokeWidth="0.5" opacity="0.2" />
      ))}
      {/* Glass panel divisions — horizontal */}
      {[250, 300, 350, 400].map((y) => (
        <line key={`gph-${y}`} x1={350 + Math.max(0, (y - 200) * 0.2)} y1={y} x2={850 - Math.max(0, (y - 200) * 0.2)} y2={y} stroke="#3b82f6" strokeWidth="0.5" opacity="0.15" />
      ))}

      {/* Steel frame arches */}
      <path d="M350 430 L350 200 Q600 120 850 200 L850 430" fill="none" stroke="#4a6a8a" strokeWidth="3" opacity="0.4" />
      <path d="M380 430 L380 215 Q600 140 820 215 L820 430" fill="none" stroke="#4a6a8a" strokeWidth="1.5" opacity="0.2" />

      {/* === PEOPLE INSIDE GALLERY (warm, comfortable) === */}
      {[
        [420, 410, false], [460, 415, true], [500, 408, false], [540, 412, true],
        [580, 406, false], [620, 414, true], [660, 408, false], [700, 410, true],
        [740, 412, false], [780, 416, true],
      ].map(([x, y, flip], i) => (
        <g key={`gp-${i}`} transform={`translate(${x},${y}) scale(${flip ? -0.8 : 0.8}, 0.8)`}>
          <circle cx="0" cy="-10" r="2.5" fill="#f59e0b" opacity="0.5" />
          <path d="M0-7.5 L0-2 M-2.5 1 L0-2 L2.5 1 M-2-5.5 L2-4 M2-5.5 L-2-4" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4" />
        </g>
      ))}

      {/* Interior warm floor reflections */}
      <rect x="380" y="425" width="440" height="5" rx="2" fill="#f59e0b" opacity="0.06" />

      {/* === STREET LIGHTS === */}
      {[310, 890].map((x) => (
        <g key={`lamp-${x}`}>
          <rect x={x - 1} y="350" width="2" height="80" fill="#4a5a6a" opacity="0.6" />
          <circle cx={x} cy="348" r="4" fill="#f59e0b" opacity="0.5" />
          <circle cx={x} cy="348" r="12" fill="#f59e0b" opacity="0.08" filter="url(#fps-soft)" />
        </g>
      ))}

      {/* === TRAM TRACKS === */}
      <line x1="300" y1="450" x2="900" y2="450" stroke="#4a5a6a" strokeWidth="2" opacity="0.3" />
      <line x1="300" y1="458" x2="900" y2="458" stroke="#4a5a6a" strokeWidth="2" opacity="0.3" />
      {/* Track ties */}
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={`tie-${i}`} x={310 + i * 30} y="448" width="2" height="12" fill="#4a5a6a" opacity="0.2" />
      ))}

      {/* === TRAM === */}
      <g>
        <rect x="500" y="438" width="80" height="24" rx="8" fill="#06b6d4" opacity="0.5" stroke="#06b6d4" strokeWidth="1" />
        {[508, 524, 540, 556].map((x) => (
          <rect key={`tw-${x}`} x={x} y="442" width="10" height="14" rx="2" fill="#f59e0b" opacity="0.3" />
        ))}
        {/* Pantograph */}
        <line x1="540" y1="438" x2="540" y2="425" stroke="#4a5a6a" strokeWidth="1.5" opacity="0.5" />
        <line x1="535" y1="425" x2="545" y2="425" stroke="#4a5a6a" strokeWidth="1.5" opacity="0.5" />
      </g>

      {/* === STEAM FROM PIPES === */}
      <g filter="url(#fps-blur)">
        <ellipse cx="153" cy="105" rx="18" ry="10" fill="white" opacity="0.05" />
        <ellipse cx="160" cy="85" rx="22" ry="12" fill="white" opacity="0.03" />
        <ellipse cx="878" cy="125" rx="18" ry="10" fill="white" opacity="0.05" />
        <ellipse cx="870" cy="105" rx="22" ry="12" fill="white" opacity="0.03" />
      </g>

      {/* === HEAVY SNOWFALL / BLIZZARD === */}
      {Array.from({ length: 60 }).map((_, i) => {
        const x = (i * 73 + 17) % 1200;
        const y = (i * 41 + 23) % 400;
        const r = 1 + (i % 3) * 0.5;
        const opacity = 0.08 + (i % 5) * 0.03;
        return <circle key={`bliz-${i}`} cx={x} cy={y} r={r} fill="white" opacity={opacity} />;
      })}

      {/* Wind-driven snow streaks */}
      {Array.from({ length: 15 }).map((_, i) => {
        const x = (i * 97 + 50) % 1200;
        const y = (i * 53 + 30) % 350;
        return (
          <line key={`streak-${i}`} x1={x} y1={y} x2={x + 30 + (i % 3) * 10} y2={y + 5} stroke="white" strokeWidth="0.5" opacity={0.05 + (i % 4) * 0.02} />
        );
      })}

      {/* Snow accumulation on ground edges */}
      <path d="M0 430 Q150 425 300 430 Q350 428 400 430" fill="#b8c8d8" opacity="0.08" />
      <path d="M800 430 Q900 425 1000 430 Q1100 428 1200 430 L1200 432 L800 432Z" fill="#b8c8d8" opacity="0.08" />

      {/* Foreground snow on street */}
      <path d="M0 470 Q300 465 600 472 Q900 465 1200 470 L1200 500 L0 500Z" fill="#0a1420" opacity="0.5" />
    </svg>
  );
}
