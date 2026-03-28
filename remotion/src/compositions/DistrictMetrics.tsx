import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FadeIn } from "../components/FadeIn";
import { AnimatedNumber } from "../components/AnimatedNumber";
import { Particles } from "../components/Particles";

const COLORS = {
  amber: "#f0c27f",
  copper: "#ef9461",
  moss: "#9bcf87",
  steel: "#86b6c8",
  dark: "#0a0a0f",
};

const metrics = [
  { value: 60000, suffix: "", label: "жителей", prefix: "", decimals: 0, color: COLORS.amber },
  { value: 5.4, suffix: " км²", label: "площадь района", prefix: "", decimals: 1, color: COLORS.steel },
  { value: 450, suffix: " м", label: "до базового сервиса", prefix: "", decimals: 0, color: COLORS.moss },
  { value: 12, suffix: " км", label: "зимних галерей", prefix: "", decimals: 0, color: COLORS.copper },
  { value: 78, suffix: "%", label: "покрытие тенью летом", prefix: "", decimals: 0, color: COLORS.moss },
  { value: 9.6, suffix: " км", label: "трамвайное кольцо", prefix: "", decimals: 1, color: COLORS.amber },
];

const MetricCard: React.FC<{
  metric: typeof metrics[0];
  index: number;
  startFrame: number;
}> = ({ metric, index, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = startFrame + index * 20;
  const scale = spring({ frame, fps, from: 0.7, to: 1, delay, durationInFrames: 20 });
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Grid position: 3 columns, 2 rows
  const col = index % 3;
  const row = Math.floor(index / 3);
  const x = 160 + col * 560;
  const y = 300 + row * 280;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 480,
        padding: "36px 40px",
        borderRadius: 20,
        border: `1px solid ${metric.color}33`,
        background: `linear-gradient(135deg, ${metric.color}08, rgba(10, 10, 15, 0.85))`,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 800,
          color: metric.color,
          fontFamily: "system-ui",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        <AnimatedNumber
          value={metric.value}
          prefix={metric.prefix}
          suffix={metric.suffix}
          startFrame={delay + 5}
          durationFrames={40}
          decimals={metric.decimals}
        />
      </div>
      <div
        style={{
          fontSize: 18,
          color: "rgba(255,255,255,0.6)",
          fontFamily: "system-ui",
          marginTop: 10,
        }}
      >
        {metric.label}
      </div>
    </div>
  );
};

export const DistrictMetrics: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark, fontFamily: "system-ui, sans-serif" }}>
      {/* Grid bg */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Title */}
      <FadeIn startFrame={0} durationFrames={20} direction="down">
        <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center" }}>
          <div style={{ fontSize: 48, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>
            Тепловое Кольцо в цифрах
          </div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.5)", marginTop: 10 }}>
            Ключевые метрики flagship-района
          </div>
        </div>
      </FadeIn>

      {/* Metric cards */}
      {metrics.map((m, i) => (
        <MetricCard key={i} metric={m} index={i} startFrame={30} />
      ))}

      {/* Bottom tagline */}
      {frame >= 200 && (
        <FadeIn startFrame={200} durationFrames={25} direction="up">
          <div
            style={{
              position: "absolute",
              bottom: 60,
              left: 0,
              right: 0,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
              Город, который помогает жить полной жизнью круглый год
            </div>
          </div>
        </FadeIn>
      )}

      <Particles count={25} color={COLORS.amber} startFrame={150} seed={88} />
      <Particles count={15} color={COLORS.moss} startFrame={180} seed={99} />
    </AbsoluteFill>
  );
};
