const R = (n: number) => Math.round(n * 100) / 100;

export function isoPoint(
  cx: number,
  cy: number,
  x: number,
  y: number,
  z: number = 0,
  scale: number = 1
) {
  const iX = (x - y) * Math.cos(Math.PI / 6);
  const iY = (x + y) * Math.sin(Math.PI / 6) - z;
  return { x: R(cx + iX * scale), y: R(cy + iY * scale) };
}

export function IsoBuilding({
  cx, cy, w, d, h,
  scale = 1,
  wallColor = "#3a5f7a",
  roofColor = "#4a7a94",
  sideColor = "#2a4a62",
  opacity = 1,
}: {
  cx: number; cy: number; w: number; d: number; h: number;
  scale?: number; wallColor?: string; roofColor?: string; sideColor?: string; opacity?: number;
}) {
  const pts = (faces: { x: number; y: number }[]) => faces.map((p) => `${p.x},${p.y}`).join(" ");
  const top = [isoPoint(cx, cy, 0, 0, h, scale), isoPoint(cx, cy, w, 0, h, scale), isoPoint(cx, cy, w, d, h, scale), isoPoint(cx, cy, 0, d, h, scale)];
  const right = [isoPoint(cx, cy, w, 0, h, scale), isoPoint(cx, cy, w, d, h, scale), isoPoint(cx, cy, w, d, 0, scale), isoPoint(cx, cy, w, 0, 0, scale)];
  const left = [isoPoint(cx, cy, 0, d, h, scale), isoPoint(cx, cy, w, d, h, scale), isoPoint(cx, cy, w, d, 0, scale), isoPoint(cx, cy, 0, d, 0, scale)];

  return (
    <g opacity={opacity}>
      <polygon points={pts(left)} fill={sideColor} />
      <polygon points={pts(right)} fill={wallColor} />
      <polygon points={pts(top)} fill={roofColor} />
    </g>
  );
}

export function PersonWalking({ x, y, scale = 1, fill = "#1a3344", flip = false }: {
  x: number; y: number; scale?: number; fill?: string; flip?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -scale : scale},${scale})`}>
      <circle cx="0" cy="-12" r="2.2" fill={fill} />
      <path d="M0-9.5 L0-3 M-2.5 0 L0-3 L2.5 0 M-2-7 L2.5-5.5 M2-7 L-2.5-5.5" stroke={fill} strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </g>
  );
}

export function PersonSitting({ x, y, scale = 1, fill = "#1a3344" }: {
  x: number; y: number; scale?: number; fill?: string;
}) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <circle cx="0" cy="-9" r="2" fill={fill} />
      <path d="M0-7 L0-3 M0-3 L3-3 M0-3 L-1 0 M3-3 L4 0 M-1.5-5.5 L-3-4 M1.5-5.5 L3-4" stroke={fill} strokeWidth="1.1" strokeLinecap="round" fill="none" />
    </g>
  );
}

export function PersonChild({ x, y, scale = 1, fill = "#1a3344" }: {
  x: number; y: number; scale?: number; fill?: string;
}) {
  const s = scale * 0.7;
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <circle cx="0" cy="-9" r="2.4" fill={fill} />
      <path d="M0-6.5 L0-2 M-2 0 L0-2 L2 0 M-1.5-5 L2-4 M1.5-5 L-2-4" stroke={fill} strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </g>
  );
}

export function TreeDeciduous({ x, y, scale = 1, crownColor = "#6aad5a", trunkColor = "#5a4a3a" }: {
  x: number; y: number; scale?: number; crownColor?: string; trunkColor?: string;
}) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <rect x="-1" y="-4" width="2" height="8" rx="1" fill={trunkColor} />
      <ellipse cx="0" cy="-10" rx="7" ry="8" fill={crownColor} />
      <ellipse cx="-4" cy="-7" rx="5" ry="6" fill={crownColor} opacity="0.85" />
      <ellipse cx="4" cy="-8" rx="5" ry="5.5" fill={crownColor} opacity="0.85" />
    </g>
  );
}

export function TreeConifer({ x, y, scale = 1, color = "#3d8a5a", trunkColor = "#5a4a3a" }: {
  x: number; y: number; scale?: number; color?: string; trunkColor?: string;
}) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <rect x="-1" y="-2" width="2" height="6" rx="1" fill={trunkColor} />
      <polygon points="0,-18 -6,-5 6,-5" fill={color} />
      <polygon points="0,-14 -5,-3 5,-3" fill={color} opacity="0.9" />
      <polygon points="0,-10 -4,0 4,0" fill={color} opacity="0.8" />
    </g>
  );
}

export function IsoTree({ x, y, scale = 1, color = "#5aad5a", shadow = true }: {
  x: number; y: number; scale?: number; color?: string; shadow?: boolean;
}) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      {shadow && <ellipse cx="2" cy="3" rx="6" ry="3" fill="rgba(0,0,0,0.12)" />}
      <ellipse cx="0" cy="-4" rx="5.5" ry="5" fill={color} />
      <ellipse cx="0" cy="-6" rx="4" ry="3.5" fill={color} opacity="0.7" />
    </g>
  );
}

export function Bench({ x, y, scale = 1, fill = "#6a5a4a" }: {
  x: number; y: number; scale?: number; fill?: string;
}) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <rect x="-6" y="-2" width="12" height="2" rx="1" fill={fill} />
      <rect x="-5" y="0" width="1" height="3" fill={fill} />
      <rect x="4" y="0" width="1" height="3" fill={fill} />
    </g>
  );
}

export function LampPost({ x, y, scale = 1, fill = "#4a5a6a", lightColor = "#f0c27f" }: {
  x: number; y: number; scale?: number; fill?: string; lightColor?: string;
}) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <rect x="-0.5" y="-14" width="1" height="14" fill={fill} />
      <circle cx="0" cy="-15" r="2" fill={lightColor} opacity="0.6" />
      <circle cx="0" cy="-15" r="1" fill={lightColor} />
    </g>
  );
}
