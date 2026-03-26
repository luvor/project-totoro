export function FrostpunkThermalCore() {
  return (
    <svg viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Теплообменная инфраструктура — Frostpunk">
      <defs>
        <radialGradient id="fpt-bg" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#0d1a2e" />
          <stop offset="100%" stopColor="#060a14" />
        </radialGradient>

        <radialGradient id="fpt-core-heat" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.6" />
          <stop offset="30%" stopColor="#ea580c" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="fpt-ember" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ea580c" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="fpt-pipe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a5a7a" />
          <stop offset="50%" stopColor="#2a4a68" />
          <stop offset="100%" stopColor="#1a3a58" />
        </linearGradient>

        <linearGradient id="fpt-hot-pipe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ea580c" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0.3" />
        </linearGradient>

        <filter id="fpt-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="fpt-glow-sm" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="fpt-steam" x="-50%" y="-100%" width="200%" height="300%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        </filter>

        <filter id="fpt-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="1000" height="600" fill="url(#fpt-bg)" />

      {/* Ground plane */}
      <rect x="0" y="420" width="1000" height="180" fill="#0a1220" />
      <path d="M0 420 Q250 415 500 420 Q750 415 1000 420 L1000 422 L0 422Z" fill="#1a2e42" opacity="0.3" />

      {/* === LARGE CENTRAL HEAT EXCHANGER === */}
      {/* Main body — cylindrical tank */}
      <rect x="380" y="180" width="240" height="240" rx="12" fill="#1a2a3e" stroke="#2a4a68" strokeWidth="2" />

      {/* Central glow */}
      <g filter="url(#fpt-glow)">
        <circle cx="500" cy="300" r="80" fill="url(#fpt-core-heat)" />
      </g>

      {/* Core ember */}
      <g filter="url(#fpt-glow-sm)">
        <circle cx="500" cy="300" r="35" fill="url(#fpt-ember)" />
        <circle cx="500" cy="300" r="18" fill="#f59e0b" opacity="0.5" />
      </g>

      {/* Tank details — industrial panels */}
      <rect x="395" y="195" width="210" height="3" fill="#3a5a7a" opacity="0.5" />
      <rect x="395" y="410" width="210" height="3" fill="#3a5a7a" opacity="0.5" />
      <rect x="393" y="195" width="3" height="220" fill="#3a5a7a" opacity="0.4" />
      <rect x="607" y="195" width="3" height="220" fill="#3a5a7a" opacity="0.4" />

      {/* Rivets / bolts */}
      {[200, 230, 260, 290, 320, 350, 380, 405].map((y) =>
        [390, 612].map((x) => (
          <circle key={`bolt-${x}-${y}`} cx={x} cy={y} r="2" fill="#4a6a8a" opacity="0.4" />
        ))
      )}

      {/* Horizontal reinforcement bands */}
      {[240, 300, 360].map((y) => (
        <rect key={`band-${y}`} x="380" y={y} width="240" height="4" rx="1" fill="#2a4a68" opacity="0.5" />
      ))}

      {/* === SMOKESTACKS === */}
      <rect x="430" y="100" width="18" height="80" rx="3" fill="#2a3a4a" stroke="#3a5a7a" strokeWidth="1" />
      <rect x="470" y="80" width="20" height="100" rx="3" fill="#2a3a4a" stroke="#3a5a7a" strokeWidth="1" />
      <rect x="512" y="90" width="18" height="90" rx="3" fill="#2a3a4a" stroke="#3a5a7a" strokeWidth="1" />
      <rect x="552" y="110" width="16" height="70" rx="3" fill="#2a3a4a" stroke="#3a5a7a" strokeWidth="1" />

      {/* Stack rings */}
      {[
        [430, 105, 18], [430, 140, 18], [470, 85, 20], [470, 130, 20],
        [512, 95, 18], [512, 135, 18], [552, 115, 16], [552, 150, 16],
      ].map(([x, y, w], i) => (
        <rect key={`ring-${i}`} x={x} y={y} width={w} height="3" rx="1" fill="#4a6a8a" opacity="0.4" />
      ))}

      {/* === STEAM CLOUDS === */}
      <g filter="url(#fpt-steam)">
        <ellipse cx="440" cy="80" rx="25" ry="15" fill="white" opacity="0.06" />
        <ellipse cx="450" cy="55" rx="35" ry="20" fill="white" opacity="0.04" />
        <ellipse cx="480" cy="60" rx="30" ry="18" fill="white" opacity="0.05" />
        <ellipse cx="490" cy="35" rx="40" ry="22" fill="white" opacity="0.03" />
        <ellipse cx="520" cy="70" rx="25" ry="15" fill="white" opacity="0.05" />
        <ellipse cx="530" cy="45" rx="30" ry="18" fill="white" opacity="0.03" />
        <ellipse cx="560" cy="90" rx="20" ry="12" fill="white" opacity="0.04" />
        <ellipse cx="555" cy="65" rx="25" ry="15" fill="white" opacity="0.03" />
      </g>

      {/* === NETWORK OF PIPES RADIATING OUTWARD === */}

      {/* Left pipe cluster */}
      <g>
        {/* Main pipe */}
        <rect x="80" y="290" width="300" height="14" rx="7" fill="url(#fpt-pipe)" />
        <rect x="80" y="293" width="300" height="8" rx="4" fill="url(#fpt-hot-pipe)" />
        {/* Pipe supports */}
        {[120, 190, 260, 330].map((x) => (
          <g key={`lps-${x}`}>
            <rect x={x} y="304" width="4" height="25" fill="#2a3a4a" opacity="0.6" />
            <rect x={x - 2} y="326" width="8" height="4" rx="1" fill="#2a3a4a" opacity="0.5" />
          </g>
        ))}
        {/* Insulation marks */}
        {[100, 160, 220, 280, 340].map((x) => (
          <rect key={`ins-l-${x}`} x={x} y="288" width="6" height="18" rx="2" fill="#3a5a7a" opacity="0.3" />
        ))}
        {/* Secondary pipe below */}
        <rect x="60" y="340" width="320" height="10" rx="5" fill="url(#fpt-pipe)" opacity="0.7" />
        <rect x="60" y="342" width="320" height="6" rx="3" fill="url(#fpt-hot-pipe)" opacity="0.7" />
      </g>

      {/* Right pipe cluster */}
      <g>
        <rect x="620" y="290" width="320" height="14" rx="7" fill="url(#fpt-pipe)" />
        <rect x="620" y="293" width="320" height="8" rx="4" fill="url(#fpt-hot-pipe)" />
        {[660, 730, 800, 870].map((x) => (
          <g key={`rps-${x}`}>
            <rect x={x} y="304" width="4" height="25" fill="#2a3a4a" opacity="0.6" />
            <rect x={x - 2} y="326" width="8" height="4" rx="1" fill="#2a3a4a" opacity="0.5" />
          </g>
        ))}
        {[640, 700, 760, 820, 880].map((x) => (
          <rect key={`ins-r-${x}`} x={x} y="288" width="6" height="18" rx="2" fill="#3a5a7a" opacity="0.3" />
        ))}
        <rect x="620" y="340" width="340" height="10" rx="5" fill="url(#fpt-pipe)" opacity="0.7" />
        <rect x="620" y="342" width="340" height="6" rx="3" fill="url(#fpt-hot-pipe)" opacity="0.7" />
      </g>

      {/* Upper left pipe (diagonal) */}
      <line x1="380" y1="230" x2="150" y2="180" stroke="#2a4a68" strokeWidth="10" strokeLinecap="round" />
      <line x1="380" y1="230" x2="150" y2="180" stroke="#ea580c" strokeWidth="3" opacity="0.15" strokeLinecap="round" />

      {/* Upper right pipe (diagonal) */}
      <line x1="620" y1="230" x2="850" y2="180" stroke="#2a4a68" strokeWidth="10" strokeLinecap="round" />
      <line x1="620" y1="230" x2="850" y2="180" stroke="#ea580c" strokeWidth="3" opacity="0.15" strokeLinecap="round" />

      {/* Lower left pipe (diagonal) */}
      <line x1="400" y1="420" x2="180" y2="460" stroke="#2a4a68" strokeWidth="10" strokeLinecap="round" />
      <line x1="400" y1="420" x2="180" y2="460" stroke="#ea580c" strokeWidth="3" opacity="0.1" strokeLinecap="round" />

      {/* Lower right pipe (diagonal) */}
      <line x1="600" y1="420" x2="820" y2="460" stroke="#2a4a68" strokeWidth="10" strokeLinecap="round" />
      <line x1="600" y1="420" x2="820" y2="460" stroke="#ea580c" strokeWidth="3" opacity="0.1" strokeLinecap="round" />

      {/* === VALVES AND GAUGES === */}
      {/* Left valve cluster */}
      <g>
        <circle cx="180" cy="297" r="12" fill="#1a2a3e" stroke="#4a6a8a" strokeWidth="1.5" />
        <circle cx="180" cy="297" r="6" fill="#2a4a68" />
        <line x1="180" y1="285" x2="180" y2="275" stroke="#4a6a8a" strokeWidth="3" strokeLinecap="round" />
        <rect x="172" y="270" width="16" height="6" rx="2" fill="#3a5a7a" />
      </g>

      {/* Right valve cluster */}
      <g>
        <circle cx="820" cy="297" r="12" fill="#1a2a3e" stroke="#4a6a8a" strokeWidth="1.5" />
        <circle cx="820" cy="297" r="6" fill="#2a4a68" />
        <line x1="820" y1="285" x2="820" y2="275" stroke="#4a6a8a" strokeWidth="3" strokeLinecap="round" />
        <rect x="812" y="270" width="16" height="6" rx="2" fill="#3a5a7a" />
      </g>

      {/* Pressure gauges */}
      {[
        [340, 220], [660, 220], [300, 400], [700, 400],
      ].map(([x, y], i) => (
        <g key={`gauge-${i}`}>
          <circle cx={x} cy={y} r="14" fill="#0d1a2e" stroke="#3a5a7a" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="10" fill="#0a1220" />
          {/* Gauge needle */}
          <line x1={x} y1={y} x2={x + 7 * Math.cos(-0.5 + i * 0.4)} y2={y + 7 * Math.sin(-0.5 + i * 0.4)} stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round" />
          {/* Gauge center */}
          <circle cx={x} cy={y} r="2" fill="#f59e0b" opacity="0.6" />
          {/* Gauge markings */}
          {[0, 1, 2, 3, 4, 5].map((m) => {
            const a = -Math.PI * 0.75 + m * (Math.PI * 1.5) / 5;
            return (
              <line key={`gm-${i}-${m}`} x1={x + 8 * Math.cos(a)} y1={y + 8 * Math.sin(a)} x2={x + 10 * Math.cos(a)} y2={y + 10 * Math.sin(a)} stroke="#3a5a7a" strokeWidth="0.5" />
            );
          })}
        </g>
      ))}

      {/* Control panels */}
      <rect x="410" y="425" width="80" height="50" rx="4" fill="#1a2a3e" stroke="#2a4a68" strokeWidth="1" />
      {[420, 440, 460].map((x) => (
        <g key={`cp-${x}`}>
          <circle cx={x} cy="440" r="3" fill={x === 440 ? "#22c55e" : "#dc2626"} opacity={x === 440 ? 0.6 : 0.3} />
          <rect x={x - 5} y="450" width="10" height="3" rx="1" fill="#2a4a68" opacity="0.5" />
        </g>
      ))}

      <rect x="510" y="425" width="80" height="50" rx="4" fill="#1a2a3e" stroke="#2a4a68" strokeWidth="1" />
      {[520, 540, 560, 575].map((x, i) => (
        <rect key={`led-${x}`} x={x} y="435" width="6" height="8" rx="1" fill={i < 3 ? "#22c55e" : "#f59e0b"} opacity={0.3 + i * 0.1} />
      ))}
      <rect x="515" y="455" width="70" height="3" rx="1" fill="#06b6d4" opacity="0.2" />
      <rect x="515" y="462" width="50" height="3" rx="1" fill="#06b6d4" opacity="0.15" />

      {/* === WORKERS / ENGINEERS === */}
      {[
        [250, 415], [350, 418], [650, 416], [760, 420], [460, 480], [540, 478],
      ].map(([x, y], i) => (
        <g key={`worker-${i}`} transform={`translate(${x},${y}) scale(0.9)`}>
          <circle cx="0" cy="-10" r="2.5" fill="#f59e0b" opacity="0.4" />
          <path d="M0-7.5 L0-2 M-2 0 L0-2 L2 0" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3" />
          {/* Hard hat */}
          <rect x="-3" y="-13" width="6" height="2" rx="1" fill="#f59e0b" opacity="0.35" />
        </g>
      ))}

      {/* === AMBIENT GLOW ON FLOOR === */}
      <g filter="url(#fpt-soft)">
        <ellipse cx="500" cy="430" rx="120" ry="20" fill="#f59e0b" opacity="0.06" />
        <ellipse cx="500" cy="430" rx="60" ry="10" fill="#ea580c" opacity="0.05" />
      </g>

      {/* Pipe heat glow lines */}
      {[100, 200, 300, 700, 800, 900].map((x) => (
        <circle key={`phg-${x}`} cx={x} cy="297" r="8" fill="#f59e0b" opacity="0.04" filter="url(#fpt-soft)" />
      ))}

      {/* Vignette */}
      <rect width="1000" height="600" fill="none" stroke="#060a14" strokeWidth="60" strokeOpacity="0.5" rx="16" />
    </svg>
  );
}
