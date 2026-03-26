"use client";

export function CTADistrictGlow() {
  return (
    <svg
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Тепловое Кольцо — схема района с пульсацией"
    >
      <defs>
        {/* Ambient background */}
        <radialGradient id="cta-bg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#1a2e42" />
          <stop offset="100%" stopColor="#0a1525" />
        </radialGradient>

        {/* Core thermal glow */}
        <radialGradient id="cta-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0c27f" stopOpacity="0.7" />
          <stop offset="30%" stopColor="#ef9461" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#ef9461" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ef9461" stopOpacity="0" />
        </radialGradient>

        {/* Pulse ring gradient */}
        <radialGradient id="cta-pulse" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#f0c27f" stopOpacity="0" />
          <stop offset="85%" stopColor="#f0c27f" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#f0c27f" stopOpacity="0" />
        </radialGradient>

        {/* Node glow */}
        <radialGradient id="cta-node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f0c27f" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#ef9461" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#ef9461" stopOpacity="0" />
        </radialGradient>

        {/* Tram line gradient */}
        <linearGradient id="cta-tram-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#86b6c8" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#86b6c8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#86b6c8" stopOpacity="0.4" />
        </linearGradient>

        <filter id="cta-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="cta-glow-lg" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="cta-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
        </filter>

        {/* Pulse animation */}
        <style>{`
          @keyframes cta-pulse-expand {
            0% { transform: scale(0.3); opacity: 0.4; }
            50% { opacity: 0.15; }
            100% { transform: scale(1.2); opacity: 0; }
          }
          @keyframes cta-pulse-expand-2 {
            0% { transform: scale(0.3); opacity: 0.3; }
            50% { opacity: 0.1; }
            100% { transform: scale(1.4); opacity: 0; }
          }
          @keyframes cta-node-breathe {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
          @keyframes cta-core-breathe {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 0.9; }
          }
          @keyframes cta-tram-move {
            0% { offset-distance: 0%; }
            100% { offset-distance: 100%; }
          }
          .cta-pulse-1 {
            animation: cta-pulse-expand 4s ease-out infinite;
            transform-origin: 400px 400px;
          }
          .cta-pulse-2 {
            animation: cta-pulse-expand-2 4s ease-out infinite 1.5s;
            transform-origin: 400px 400px;
          }
          .cta-pulse-3 {
            animation: cta-pulse-expand 4s ease-out infinite 3s;
            transform-origin: 400px 400px;
          }
          .cta-node-glow {
            animation: cta-node-breathe 3s ease-in-out infinite;
          }
          .cta-node-glow-d1 { animation-delay: 0.5s; }
          .cta-node-glow-d2 { animation-delay: 1.0s; }
          .cta-node-glow-d3 { animation-delay: 1.5s; }
          .cta-node-glow-d4 { animation-delay: 2.0s; }
          .cta-node-glow-d5 { animation-delay: 2.5s; }
          .cta-core-glow {
            animation: cta-core-breathe 3s ease-in-out infinite;
          }
        `}</style>
      </defs>

      {/* Background */}
      <rect width="800" height="800" fill="url(#cta-bg)" />

      {/* Subtle grid pattern */}
      {Array.from({ length: 16 }, (_, i) => (
        <line key={`grid-h-${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#1e3a5f" strokeWidth="0.3" opacity="0.2" />
      ))}
      {Array.from({ length: 16 }, (_, i) => (
        <line key={`grid-v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="800" stroke="#1e3a5f" strokeWidth="0.3" opacity="0.2" />
      ))}

      {/* Radiating heat lines from center — subtle */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 400 + Math.cos(angle) * 40;
        const y1 = 400 + Math.sin(angle) * 40;
        const x2 = 400 + Math.cos(angle) * 320;
        const y2 = 400 + Math.sin(angle) * 320;
        return (
          <line
            key={`heat-line-${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#f0c27f"
            strokeWidth="0.5"
            opacity="0.06"
            strokeDasharray="4 8"
          />
        );
      })}

      {/* Pulse rings expanding from center */}
      <circle className="cta-pulse-1" cx="400" cy="400" r="200" fill="none" stroke="#f0c27f" strokeWidth="2" />
      <circle className="cta-pulse-2" cx="400" cy="400" r="200" fill="none" stroke="#ef9461" strokeWidth="1.5" />
      <circle className="cta-pulse-3" cx="400" cy="400" r="200" fill="none" stroke="#f0c27f" strokeWidth="1" />

      {/* Main ring structure */}
      <circle cx="400" cy="400" r="200" fill="none" stroke="#f0c27f" strokeWidth="2" opacity="0.25" />
      <circle cx="400" cy="400" r="204" fill="none" stroke="#ef9461" strokeWidth="0.5" opacity="0.12" />
      <circle cx="400" cy="400" r="196" fill="none" stroke="#f0c27f" strokeWidth="0.5" opacity="0.12" />

      {/* Inner secondary ring */}
      <circle cx="400" cy="400" r="120" fill="none" stroke="#f0c27f" strokeWidth="0.8" opacity="0.1" strokeDasharray="6 4" />

      {/* Tram loop — slightly offset from main ring */}
      <circle cx="400" cy="400" r="215" fill="none" stroke="#86b6c8" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.18" />

      {/* Tram vehicle on the loop */}
      {[45, 195].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const tx = 400 + Math.cos(rad) * 215;
        const ty = 400 + Math.sin(rad) * 215;
        const rotation = angle + 90;
        return (
          <g key={`tram-${i}`} transform={`translate(${tx},${ty}) rotate(${rotation})`}>
            <rect x="-8" y="-3" width="16" height="6" rx="3" fill="#86b6c8" opacity="0.45" />
            <rect x="-5" y="-1.5" width="4" height="3" rx="1" fill="#f0c27f" opacity="0.35" />
            <rect x="1" y="-1.5" width="4" height="3" rx="1" fill="#f0c27f" opacity="0.3" />
          </g>
        );
      })}

      {/* 6 Quarter nodes on the ring */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const nx = 400 + Math.cos(rad) * 200;
        const ny = 400 + Math.sin(rad) * 200;
        return (
          <g key={`node-${i}`}>
            {/* Node glow halo */}
            <circle
              className={`cta-node-glow cta-node-glow-d${i % 6}`}
              cx={nx} cy={ny} r="22"
              fill="url(#cta-node-glow)"
            />
            {/* Node building cluster */}
            <rect
              x={nx - 12} y={ny - 14} width="24" height="20" rx="3"
              fill="#1a3248" stroke="#f0c27f" strokeWidth="0.8" opacity="0.75"
            />
            {/* Warm windows */}
            <rect x={nx - 8} y={ny - 10} width="4" height="4" rx="1" fill="#f0c27f" opacity={0.35 + (i % 2) * 0.15} />
            <rect x={nx + 1} y={ny - 10} width="4" height="4" rx="1" fill="#f0c27f" opacity={0.3 + (i % 3) * 0.1} />
            <rect x={nx - 8} y={ny - 2} width="4" height="4" rx="1" fill="#f0c27f" opacity={0.3 + (i % 2) * 0.1} />
            <rect x={nx + 1} y={ny - 2} width="4" height="4" rx="1" fill="#f0c27f" opacity={0.35 + (i % 3) * 0.1} />
            {/* Secondary smaller building */}
            <rect
              x={nx + 8} y={ny - 8} width="10" height="14" rx="2"
              fill="#162a40" stroke="#f0c27f" strokeWidth="0.5" opacity="0.6"
            />
            <rect x={nx + 10} y={ny - 5} width="3" height="3" rx="0.5" fill="#f0c27f" opacity="0.3" />
            <rect x={nx + 10} y={ny + 1} width="3" height="3" rx="0.5" fill="#f0c27f" opacity="0.25" />
            {/* Gallery connection to center */}
            <line
              x1={nx} y1={ny}
              x2={400 + Math.cos(rad) * 50} y2={400 + Math.sin(rad) * 50}
              stroke="#f0c27f" strokeWidth="3" opacity="0.05" strokeLinecap="round"
            />
            <line
              x1={nx} y1={ny}
              x2={400 + Math.cos(rad) * 50} y2={400 + Math.sin(rad) * 50}
              stroke="#f0c27f" strokeWidth="0.8" opacity="0.15" strokeLinecap="round"
            />
          </g>
        );
      })}

      {/* Green parks between nodes */}
      {[30, 90, 150, 210, 270, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const px = 400 + Math.cos(rad) * 165;
        const py = 400 + Math.sin(rad) * 165;
        return (
          <g key={`park-${i}`}>
            <ellipse cx={px} cy={py} rx="10" ry="8" fill="#9bcf87" opacity="0.18" />
            <ellipse cx={px - 3} cy={py - 2} rx="6" ry="5" fill="#9bcf87" opacity="0.12" />
            <ellipse cx={px + 4} cy={py + 1} rx="5" ry="4" fill="#9bcf87" opacity="0.1" />
          </g>
        );
      })}

      {/* Central thermal core */}
      <g filter="url(#cta-glow-lg)">
        <circle className="cta-core-glow" cx="400" cy="400" r="35" fill="#f0c27f" opacity="0.1" />
      </g>
      <g filter="url(#cta-glow)">
        <circle className="cta-core-glow" cx="400" cy="400" r="22" fill="#f0c27f" opacity="0.2" />
      </g>
      <circle cx="400" cy="400" r="12" fill="#f0c27f" opacity="0.4" />
      <circle cx="400" cy="400" r="6" fill="#f0c27f" opacity="0.65" />

      {/* Core structure icon */}
      <rect x="390" y="388" width="20" height="24" rx="3" fill="#1a2e42" stroke="#f0c27f" strokeWidth="1" opacity="0.85" />
      <rect x="394" y="383" width="12" height="7" rx="1.5" fill="#2a4050" stroke="#ef9461" strokeWidth="0.6" />
      {/* Smokestack */}
      <rect x="398" y="372" width="4" height="12" rx="1" fill="#2a3a4a" stroke="#f0c27f" strokeWidth="0.3" opacity="0.7" />

      {/* Steam wisps */}
      <g filter="url(#cta-soft)">
        <ellipse cx="400" cy="365" rx="8" ry="4" fill="white" opacity="0.05" />
        <ellipse cx="402" cy="358" rx="10" ry="5" fill="white" opacity="0.03" />
      </g>

      {/* Outer ambient dots — distant context */}
      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const dist = 290 + (i % 3) * 20;
        const x = 400 + Math.cos(angle) * dist;
        const y = 400 + Math.sin(angle) * dist;
        return (
          <circle
            key={`ambient-${i}`}
            cx={x} cy={y} r={1 + (i % 2) * 0.5}
            fill="#ece4d6" opacity={0.06 + (i % 4) * 0.02}
          />
        );
      })}

      {/* Subtle vignette */}
      <rect width="800" height="800" fill="none" stroke="#060a14" strokeWidth="60" strokeOpacity="0.4" rx="15" />
    </svg>
  );
}
