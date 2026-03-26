import { interpolate, useCurrentFrame } from "remotion";

interface FadeInProps {
  startFrame: number;
  durationFrames?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  startFrame,
  durationFrames = 20,
  children,
  style,
  direction = "up",
  distance = 30,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const offset = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [distance, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateMap = {
    up: `translateY(${offset}px)`,
    down: `translateY(${-offset}px)`,
    left: `translateX(${offset}px)`,
    right: `translateX(${-offset}px)`,
    none: "none",
  };

  return (
    <div
      style={{
        opacity,
        transform: translateMap[direction],
        ...style,
      }}
    >
      {children}
    </div>
  );
};
