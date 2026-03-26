import { interpolate, useCurrentFrame, random } from "remotion";

interface ParticlesProps {
  count?: number;
  color?: string;
  startFrame: number;
  seed?: number;
  style?: React.CSSProperties;
}

export const Particles: React.FC<ParticlesProps> = ({
  count = 30,
  color = "#f0c27f",
  startFrame,
  seed = 0,
  style,
}) => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: count }, (_, i) => {
    const x = random(`x-${seed}-${i}`) * 100;
    const baseY = random(`y-${seed}-${i}`) * 100;
    const size = 2 + random(`size-${seed}-${i}`) * 4;
    const speed = 0.3 + random(`speed-${seed}-${i}`) * 0.7;
    const delay = random(`delay-${seed}-${i}`) * 30;

    const opacity = interpolate(
      frame,
      [startFrame + delay, startFrame + delay + 15, startFrame + delay + 60, startFrame + delay + 80],
      [0, 0.8, 0.6, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );

    const y = baseY - (frame - startFrame) * speed;

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: color,
          opacity,
          boxShadow: `0 0 ${size * 2}px ${color}`,
        }}
      />
    );
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        ...style,
      }}
    >
      {particles}
    </div>
  );
};
