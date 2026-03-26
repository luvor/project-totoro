export function FrostpunkCityscape() {
  return (
    <svg viewBox="0 0 1200 700" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Город с высоты — Frostpunk">
      <defs>
        {/* Sky gradient */}
        <radialGradient id="fp-sky" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#0d1a2e" />
          <stop offset="100%" stopColor="#060a14" />
        </radialGradient>

        {/* Aurora */}
        <linearGradient id="fp-aurora" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
          <stop offset="25%" stopColor="#06b6d4" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.1" />
          <stop offset="75%" stopColor="#06b6d4" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>

        {/* Central generator glow */}
        <radialGradient id="fp-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
          <stop offset="30%" stopColor="#ea580c" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#ea580c" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
        </radialGradient>

        {/* Warm interior glow for galleries */}
        <linearGradient id="fp-gallery-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
        </linearGradient>

        {/* Snow ground gradient */}
        <radialGradient id="fp-ground" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#0d1117" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#060a14" />
        </radialGradient>

        {/* Glow filter */}
        <filter id="fp-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="fp-glow-sm" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="fp-steam" x="-50%" y="-100%" width="200%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
        </filter>
      </defs>

      {/* Background sky */}
      <rect width="1200" height="700" fill="url(#fp-sky)" />

      {/* Stars */}
      {[
        [100, 40], [250, 25], [380, 60], [520, 30], [680, 50], [800, 20],
        [950, 45], [1100, 35], [150, 80], [450, 15], [750, 70], [1050, 55],
        [200, 100], [600, 85], [900, 75], [350, 95], [1000, 90],
      ].map(([x, y], i) => (
        <circle key={`star-${i}`} cx={x} cy={y} r={i % 3 === 0 ? 1.5 : 1} fill="white" opacity={0.15 + (i % 4) * 0.1} />
      ))}

      {/* Aurora borealis */}
      <path d="M0 80 Q200 40 400 70 Q600 20 800 60 Q1000 30 1200 50 L1200 120 Q1000 70 800 100 Q600 60 400 110 Q200 80 0 120Z" fill="url(#fp-aurora)" />

      {/* Distant mountains / ice */}
      <path d="M0 280 L100 220 L200 260 L320 180 L420 240 L500 200 L600 250 L700 190 L820 230 L900 210 L1000 250 L1100 220 L1200 260 L1200 340 L0 340Z" fill="#0a1525" opacity="0.7" />

      {/* Ground plane — snow */}
      <ellipse cx="600" cy="430" rx="550" ry="260" fill="url(#fp-ground)" />

      {/* Snow terrain */}
      <path d="M50 380 Q300 340 600 360 Q900 340 1150 380 L1200 700 L0 700Z" fill="#0d1a2e" opacity="0.6" />
      <path d="M100 400 Q400 370 600 385 Q800 370 1100 400 L1200 700 L0 700Z" fill="#0a1525" opacity="0.4" />

      {/* Tram ring track */}
      <ellipse cx="600" cy="420" rx="350" ry="150" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="12 6" opacity="0.25" />
      <ellipse cx="600" cy="420" rx="352" ry="152" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.15" />

      {/* === CENTRAL THERMAL CORE === */}
      <g filter="url(#fp-glow)">
        <circle cx="600" cy="380" r="40" fill="#f59e0b" opacity="0.15" />
        <circle cx="600" cy="380" r="25" fill="#f59e0b" opacity="0.3" />
        <circle cx="600" cy="380" r="12" fill="#f59e0b" opacity="0.6" />
      </g>

      {/* Core structure */}
      <rect x="580" y="355" width="40" height="50" rx="3" fill="#1a2e42" stroke="#f59e0b" strokeWidth="1.5" opacity="0.9" />
      <rect x="588" y="345" width="24" height="12" rx="2" fill="#2a4050" stroke="#ea580c" strokeWidth="1" />
      {/* Smokestack */}
      <rect x="596" y="310" width="8" height="35" rx="2" fill="#2a3a4a" stroke="#f59e0b" strokeWidth="0.5" opacity="0.8" />

      {/* Steam from core */}
      <g filter="url(#fp-steam)">
        <ellipse cx="600" cy="295" rx="15" ry="8" fill="white" opacity="0.08" />
        <ellipse cx="605" cy="280" rx="20" ry="10" fill="white" opacity="0.05" />
        <ellipse cx="595" cy="265" rx="25" ry="12" fill="white" opacity="0.03" />
      </g>

      {/* === HEATING PIPES radiating from core === */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 600 + Math.cos(rad) * 50;
        const y1 = 380 + Math.sin(rad) * 25;
        const x2 = 600 + Math.cos(rad) * 280;
        const y2 = 380 + Math.sin(rad) * 120;
        return (
          <line key={`pipe-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="1.5" opacity="0.15" strokeDasharray="8 4" />
        );
      })}

      {/* === BUILDINGS — radiating outward === */}
      {/* North cluster */}
      <g>
        <rect x="560" y="250" width="32" height="55" rx="3" fill="#1a3248" stroke="#1e3a5f" strokeWidth="0.5" />
        <rect x="565" y="246" width="32" height="6" rx="1" fill="#c8d4e0" opacity="0.4" /> {/* Snow on roof */}
        {[258, 270, 282, 294].map((y, i) => (
          <rect key={`nw1-${i}`} x={564 + (i % 2) * 16} y={y} width="5" height="5" rx="1" fill="#f59e0b" opacity={0.3 + (i % 3) * 0.15} />
        ))}
      </g>
      <g>
        <rect x="610" y="240" width="28" height="60" rx="3" fill="#1e3a50" stroke="#1e3a5f" strokeWidth="0.5" />
        <rect x="613" y="236" width="28" height="6" rx="1" fill="#c8d4e0" opacity="0.35" />
        {[250, 262, 274, 286].map((y, i) => (
          <rect key={`nw2-${i}`} x={615 + (i % 2) * 12} y={y} width="4" height="5" rx="1" fill="#f59e0b" opacity={0.25 + (i % 3) * 0.15} />
        ))}
      </g>

      {/* East cluster */}
      <g>
        <rect x="780" y="340" width="35" height="50" rx="3" fill="#1a3248" stroke="#1e3a5f" strokeWidth="0.5" />
        <rect x="782" y="336" width="35" height="5" rx="1" fill="#c8d4e0" opacity="0.4" />
        {[348, 358, 368].map((y, i) => (
          <rect key={`ew1-${i}`} x={785 + (i % 2) * 14} y={y} width="5" height="5" rx="1" fill="#f59e0b" opacity={0.3 + (i % 2) * 0.2} />
        ))}
      </g>
      <g>
        <rect x="830" y="355" width="30" height="45" rx="3" fill="#1e3a50" stroke="#1e3a5f" strokeWidth="0.5" />
        <rect x="832" y="351" width="30" height="5" rx="1" fill="#c8d4e0" opacity="0.35" />
        {[362, 372, 382].map((y, i) => (
          <rect key={`ew2-${i}`} x={836 + (i % 2) * 12} y={y} width="4" height="5" rx="1" fill="#f59e0b" opacity={0.2 + (i % 3) * 0.15} />
        ))}
      </g>
      <g>
        <rect x="870" y="370" width="25" height="40" rx="3" fill="#162a40" stroke="#1e3a5f" strokeWidth="0.5" />
        <rect x="872" y="366" width="25" height="5" rx="1" fill="#c8d4e0" opacity="0.3" />
      </g>

      {/* West cluster */}
      <g>
        <rect x="340" y="345" width="35" height="48" rx="3" fill="#1a3248" stroke="#1e3a5f" strokeWidth="0.5" />
        <rect x="342" y="341" width="35" height="5" rx="1" fill="#c8d4e0" opacity="0.4" />
        {[352, 362, 372].map((y, i) => (
          <rect key={`ww1-${i}`} x={346 + (i % 2) * 14} y={y} width="5" height="5" rx="1" fill="#f59e0b" opacity={0.25 + (i % 2) * 0.2} />
        ))}
      </g>
      <g>
        <rect x="295" y="360" width="30" height="42" rx="3" fill="#1e3a50" stroke="#1e3a5f" strokeWidth="0.5" />
        <rect x="297" y="356" width="30" height="5" rx="1" fill="#c8d4e0" opacity="0.35" />
        {[366, 376].map((y, i) => (
          <rect key={`ww2-${i}`} x={300 + (i % 2) * 12} y={y} width="4" height="5" rx="1" fill="#f59e0b" opacity={0.3 + (i % 2) * 0.15} />
        ))}
      </g>
      <g>
        <rect x="260" y="375" width="25" height="35" rx="3" fill="#162a40" stroke="#1e3a5f" strokeWidth="0.5" />
        <rect x="262" y="371" width="25" height="5" rx="1" fill="#c8d4e0" opacity="0.3" />
      </g>

      {/* South cluster */}
      <g>
        <rect x="520" y="460" width="30" height="45" rx="3" fill="#1a3248" stroke="#1e3a5f" strokeWidth="0.5" />
        <rect x="522" y="456" width="30" height="5" rx="1" fill="#c8d4e0" opacity="0.4" />
        {[468, 478, 488].map((y, i) => (
          <rect key={`sw1-${i}`} x={525 + (i % 2) * 12} y={y} width="5" height="5" rx="1" fill="#f59e0b" opacity={0.3 + (i % 2) * 0.15} />
        ))}
      </g>
      <g>
        <rect x="570" y="470" width="35" height="50" rx="3" fill="#1e3a50" stroke="#1e3a5f" strokeWidth="0.5" />
        <rect x="572" y="466" width="35" height="5" rx="1" fill="#c8d4e0" opacity="0.35" />
        {[478, 490, 502].map((y, i) => (
          <rect key={`sw2-${i}`} x={576 + (i % 2) * 14} y={y} width="5" height="5" rx="1" fill="#f59e0b" opacity={0.25 + (i % 3) * 0.15} />
        ))}
      </g>
      <g>
        <rect x="620" y="465" width="28" height="40" rx="3" fill="#162a40" stroke="#1e3a5f" strokeWidth="0.5" />
        <rect x="622" y="461" width="28" height="5" rx="1" fill="#c8d4e0" opacity="0.3" />
      </g>

      {/* NE cluster */}
      <g>
        <rect x="720" y="280" width="30" height="50" rx="3" fill="#1a3248" stroke="#1e3a5f" strokeWidth="0.5" />
        <rect x="722" y="276" width="30" height="5" rx="1" fill="#c8d4e0" opacity="0.38" />
        {[288, 298, 308].map((y, i) => (
          <rect key={`ne1-${i}`} x={725 + (i % 2) * 12} y={y} width="4" height="5" rx="1" fill="#f59e0b" opacity={0.3 + (i % 2) * 0.15} />
        ))}
      </g>
      <g>
        <rect x="760" y="300" width="25" height="38" rx="3" fill="#1e3a50" stroke="#1e3a5f" strokeWidth="0.5" />
        <rect x="762" y="296" width="25" height="5" rx="1" fill="#c8d4e0" opacity="0.3" />
      </g>

      {/* NW cluster */}
      <g>
        <rect x="420" y="280" width="30" height="48" rx="3" fill="#1a3248" stroke="#1e3a5f" strokeWidth="0.5" />
        <rect x="422" y="276" width="30" height="5" rx="1" fill="#c8d4e0" opacity="0.38" />
        {[288, 298, 308].map((y, i) => (
          <rect key={`nw3-${i}`} x={425 + (i % 2) * 12} y={y} width="4" height="5" rx="1" fill="#f59e0b" opacity={0.28 + (i % 2) * 0.15} />
        ))}
      </g>
      <g>
        <rect x="390" y="300" width="22" height="35" rx="3" fill="#162a40" stroke="#1e3a5f" strokeWidth="0.5" />
        <rect x="392" y="296" width="22" height="5" rx="1" fill="#c8d4e0" opacity="0.3" />
      </g>

      {/* === HEATED GALLERY CORRIDORS (glass + steel, amber glow inside) === */}
      {/* Core to North */}
      <rect x="595" y="300" width="10" height="55" rx="2" fill="#f59e0b" opacity="0.12" stroke="#f59e0b" strokeWidth="0.8" strokeOpacity="0.3" />
      {/* Core to East */}
      <rect x="640" y="370" width="140" height="8" rx="2" fill="#f59e0b" opacity="0.1" stroke="#f59e0b" strokeWidth="0.8" strokeOpacity="0.25" />
      {/* Core to West */}
      <rect x="375" y="375" width="205" height="8" rx="2" fill="#f59e0b" opacity="0.1" stroke="#f59e0b" strokeWidth="0.8" strokeOpacity="0.25" />
      {/* Core to South */}
      <rect x="595" y="405" width="10" height="60" rx="2" fill="#f59e0b" opacity="0.1" stroke="#f59e0b" strokeWidth="0.8" strokeOpacity="0.25" />
      {/* Gallery NE diagonal */}
      <line x1="630" y1="360" x2="720" y2="300" stroke="#f59e0b" strokeWidth="6" opacity="0.08" strokeLinecap="round" />
      <line x1="630" y1="360" x2="720" y2="300" stroke="#f59e0b" strokeWidth="1" opacity="0.25" strokeLinecap="round" />
      {/* Gallery NW diagonal */}
      <line x1="570" y1="360" x2="450" y2="300" stroke="#f59e0b" strokeWidth="6" opacity="0.08" strokeLinecap="round" />
      <line x1="570" y1="360" x2="450" y2="300" stroke="#f59e0b" strokeWidth="1" opacity="0.25" strokeLinecap="round" />

      {/* === EVERGREEN TREES (snow-covered) === */}
      {[
        [480, 320], [510, 340], [690, 330], [730, 350], [380, 410], [350, 430],
        [850, 410], [880, 430], [540, 510], [650, 500], [460, 450], [760, 440],
        [310, 400], [900, 395], [430, 465], [710, 470],
      ].map(([x, y], i) => (
        <g key={`tree-${i}`} transform={`translate(${x},${y}) scale(${0.6 + (i % 3) * 0.15})`}>
          <polygon points="0,-14 -5,-2 5,-2" fill="#1a4a3a" opacity="0.7" />
          <polygon points="0,-10 -4,0 4,0" fill="#1a4a3a" opacity="0.6" />
          <rect x="-1" y="0" width="2" height="4" fill="#2a3a2a" opacity="0.5" />
          {/* Snow on tree */}
          <polygon points="0,-14 -3,-8 3,-8" fill="#c8d8e8" opacity="0.3" />
        </g>
      ))}

      {/* === PEOPLE as small dots on pathways === */}
      {[
        [500, 370], [530, 385], [670, 375], [700, 390], [450, 395],
        [750, 385], [550, 440], [640, 445], [560, 350], [640, 355],
        [400, 380], [800, 380], [580, 490], [620, 495],
      ].map(([x, y], i) => (
        <circle key={`person-${i}`} cx={x} cy={y} r={2} fill="#f59e0b" opacity={0.3 + (i % 3) * 0.15} />
      ))}

      {/* === TRAM on the ring === */}
      <g>
        <rect x="352" y="310" width="20" height="8" rx="4" fill="#06b6d4" opacity="0.5" stroke="#06b6d4" strokeWidth="0.5" />
        <rect x="355" y="312" width="4" height="4" rx="1" fill="#f59e0b" opacity="0.4" />
        <rect x="361" y="312" width="4" height="4" rx="1" fill="#f59e0b" opacity="0.35" />
      </g>
      {/* Second tram */}
      <g>
        <rect x="800" y="480" width="20" height="8" rx="4" fill="#06b6d4" opacity="0.4" stroke="#06b6d4" strokeWidth="0.5" />
        <rect x="803" y="482" width="4" height="4" rx="1" fill="#f59e0b" opacity="0.35" />
        <rect x="809" y="482" width="4" height="4" rx="1" fill="#f59e0b" opacity="0.3" />
      </g>

      {/* === SNOWFALL === */}
      {[
        [80, 150, 2], [160, 200, 1.5], [250, 130, 1], [340, 180, 2], [450, 160, 1.5],
        [550, 190, 1], [650, 140, 2], [740, 210, 1.5], [830, 170, 1], [920, 150, 2],
        [1020, 190, 1.5], [1100, 160, 1], [130, 250, 1.5], [300, 230, 1],
        [500, 240, 2], [700, 250, 1], [900, 240, 1.5], [1050, 230, 1],
        [200, 300, 1], [400, 320, 1.5], [800, 310, 1], [1000, 300, 1.5],
      ].map(([x, y, r], i) => (
        <circle key={`snow-${i}`} cx={x} cy={y} r={r} fill="white" opacity={0.1 + (i % 4) * 0.05} />
      ))}

      {/* Foreground snow detail */}
      <path d="M0 620 Q200 600 400 615 Q600 595 800 610 Q1000 600 1200 620 L1200 700 L0 700Z" fill="#0d1a2e" opacity="0.3" />

      {/* Vignette */}
      <rect width="1200" height="700" fill="none" stroke="#060a14" strokeWidth="80" strokeOpacity="0.4" rx="20" />
    </svg>
  );
}
