const R = (n: number) => Math.round(n * 100) / 100;

function polar(cx: number, cy: number, radius: number, angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return { x: R(cx + radius * Math.cos(radians)), y: R(cy + radius * Math.sin(radians)) };
}

const nodes = [
  { title: "Light", angle: 0, fill: "#f0c27f", iconPath: "M0-6 L0 6 M-6 0 L6 0 M-4-4 L4 4 M4-4 L-4 4" },
  { title: "Movement", angle: 60, fill: "#86c5d8", iconPath: "M-4 4 L-1 0 L2 2 L5-2" },
  { title: "Nature", angle: 120, fill: "#92c67c", iconPath: "M0-4 Q-5 0 0 6 Q5 0 0-4 M0-4 L0 6" },
  { title: "Social", angle: 180, fill: "#ef9461", iconPath: "M-3-2 A2 2 0 1 1 -3-2.01 M3-2 A2 2 0 1 1 3-2.01 M-3 1 L-3 5 M3 1 L3 5" },
  { title: "Rest", angle: 240, fill: "#9eafe1", iconPath: "M2-5 A5 5 0 1 0 2 5 A3.5 3.5 0 1 1 2-5" },
  { title: "Growth", angle: 300, fill: "#d7c7ef", iconPath: "M0 6 L0-2 M0-2 Q-5-4-3-8 M0-2 Q5-4 3-8" },
];

function ConnectionLine({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="4 4" />
  );
}

export function FlourishingWheelGraphic() {
  const cx = 270;
  const cy = 220;
  const outerRadius = 142;
  const nodePositions = nodes.map((n) => polar(cx, cy, outerRadius, n.angle));

  return (
    <svg viewBox="0 0 540 420" role="img" aria-labelledby="flourishing-title">
      <title id="flourishing-title">Human Flourishing OS: шесть систем городской среды</title>
      <defs>
        <filter id="hex-glow">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <rect width="540" height="420" rx="30" fill="#13202e" />

      {nodePositions.map((pos, i) => (
        <line
          key={`radial-${i}`}
          x1={cx}
          y1={cy}
          x2={pos.x}
          y2={pos.y}
          stroke={nodes[i].fill}
          strokeWidth="1"
          strokeOpacity="0.12"
        />
      ))}

      {nodePositions.map((pos, i) => {
        const next = nodePositions[(i + 1) % nodePositions.length];
        return (
          <ConnectionLine
            key={`conn-${i}`}
            x1={pos.x}
            y1={pos.y}
            x2={next.x}
            y2={next.y}
            color={nodes[i].fill}
          />
        );
      })}

      <circle cx={cx} cy={cy} r={outerRadius + 10} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      <polygon
        points={Array.from({ length: 6 })
          .map((_, i) => {
            const p = polar(cx, cy, 62, i * 60);
            return `${p.x},${p.y}`;
          })
          .join(" ")}
        fill="#1a3048"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="1.5"
      />
      <text x={cx} y={cy - 8} textAnchor="middle" fill="#f7f4ee" fontSize="16" fontWeight="700">
        Human
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#f7f4ee" fontSize="16" fontWeight="700">
        Flourishing OS
      </text>

      {nodes.map((node, i) => {
        const pos = nodePositions[i];
        const hexPoints = Array.from({ length: 6 })
          .map((_, j) => {
            const p = polar(pos.x, pos.y, 32, j * 60 + 30);
            return `${p.x},${p.y}`;
          })
          .join(" ");

        return (
          <g key={node.title}>
            <circle cx={pos.x} cy={pos.y} r="28" fill={node.fill} opacity="0.1" filter="url(#hex-glow)" />

            <polygon
              points={hexPoints}
              fill={node.fill}
              opacity="0.9"
            />

            <g transform={`translate(${pos.x},${pos.y - 4})`}>
              <path d={node.iconPath} fill="none" stroke="#102030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            <text x={pos.x} y={pos.y + 14} textAnchor="middle" fill="#102030" fontSize="9" fontWeight="700">
              {node.title}
            </text>
          </g>
        );
      })}

      <g opacity="0.5">
        {nodes.map((node, i) => (
          <g key={`legend-${node.title}`}>
            <rect x={32 + i * 82} y={390} width="10" height="10" rx="3" fill={node.fill} />
            <text x={46 + i * 82} y={399} fontSize="9" fill="#9ab0c0">
              {node.title}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
