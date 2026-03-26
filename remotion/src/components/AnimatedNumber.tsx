import { interpolate, useCurrentFrame } from "remotion";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  startFrame: number;
  durationFrames?: number;
  style?: React.CSSProperties;
  decimals?: number;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  prefix = "",
  suffix = "",
  startFrame,
  durationFrames = 30,
  style,
  decimals = 0,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const currentValue = Math.round(value * progress * 10 ** decimals) / 10 ** decimals;
  const display = decimals > 0 ? currentValue.toFixed(decimals) : currentValue.toLocaleString("ru-RU");

  return (
    <span style={style}>
      {prefix}{display}{suffix}
    </span>
  );
};
