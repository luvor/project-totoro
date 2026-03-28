import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FadeIn } from "../components/FadeIn";
import { Particles } from "../components/Particles";

const COLORS = {
  amber: "#f0c27f",
  copper: "#ef9461",
  moss: "#9bcf87",
  steel: "#86b6c8",
  sand: "#d4c9b8",
  dark: "#0a0a0f",
};

const quarters = [
  { id: "Q1", label: "Северный квартал", pop: "~9 500", role: "Семейное жильё", color: COLORS.amber, cx: 960, cy: 280 },
  { id: "Q2", label: "Восточный пассаж", pop: "~10 000", role: "Mixed-use фронт", color: COLORS.copper, cx: 1280, cy: 480 },
  { id: "Q3", label: "Юго-восточный форум", pop: "~10 500", role: "Культурный узел", color: COLORS.steel, cx: 1200, cy: 720 },
  { id: "Q4", label: "Южный сад", pop: "~9 000", role: "Зелёный квартал", color: COLORS.moss, cx: 760, cy: 780 },
  { id: "Q5", label: "Западный микс", pop: "~10 500", role: "Малый бизнес", color: COLORS.sand, cx: 620, cy: 520 },
  { id: "Q6", label: "С-З край", pop: "~10 500", role: "Переход к степи", color: COLORS.copper, cx: 700, cy: 320 },
];

const QuarterNode: React.FC<{
  quarter: typeof quarters[0];
  index: number;
}> = ({ quarter, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appearDelay = 60 + index * 25;
  const scale = spring({ frame, fps, from: 0, to: 1, delay: appearDelay, durationInFrames: 20 });
  const opacity = interpolate(frame, [appearDelay, appearDelay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <g
      style={{ opacity, transform: `scale(${scale})`, transformOrigin: `${quarter.cx}px ${quarter.cy}px` }}
    >
      {/* Outer glow */}
      <circle cx={quarter.cx} cy={quarter.cy} r={80} fill={quarter.color} opacity={0.08} />
      {/* Main circle */}
      <circle cx={quarter.cx} cy={quarter.cy} r={55} fill="none" stroke={quarter.color} strokeWidth={2} opacity={0.6} />
      <circle cx={quarter.cx} cy={quarter.cy} r={55} fill={`${quarter.color}15`} />
      {/* Label */}
      <text
        x={quarter.cx}
        y={quarter.cy - 14}
        fill="#ffffff"
        fontSize={18}
        fontWeight={700}
        textAnchor="middle"
        fontFamily="system-ui"
      >
        {quarter.id}
      </text>
      <text
        x={quarter.cx}
        y={quarter.cy + 8}
        fill="rgba(255,255,255,0.7)"
        fontSize={13}
        textAnchor="middle"
        fontFamily="system-ui"
      >
        {quarter.pop}
      </text>
      <text
        x={quarter.cx}
        y={quarter.cy + 26}
        fill={quarter.color}
        fontSize={11}
        textAnchor="middle"
        fontFamily="system-ui"
      >
        {quarter.role}
      </text>
    </g>
  );
};

export const MasterplanOverview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Tram ring animation
  const ringProgress = interpolate(frame, [30, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Core glow
  const coreScale = spring({ frame, fps, from: 0, to: 1, delay: 20, durationInFrames: 30 });
  const corePulse = interpolate(frame, [0, durationInFrames], [0, Math.PI * 8]);
  const corePulseOpacity = 0.3 + Math.sin(corePulse) * 0.15;

  // Title
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stats bar at bottom
  const statsDelay = 220;
  const statsOpacity = interpolate(frame, [statsDelay, statsDelay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark }}>
      {/* Grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Title */}
      <FadeIn startFrame={0} durationFrames={20} direction="down">
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: titleOpacity,
          }}
        >
          <div style={{ fontSize: 42, fontWeight: 700, color: "#fff", fontFamily: "system-ui", letterSpacing: "-0.03em" }}>
            Генплан Теплового Кольца
          </div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.5)", marginTop: 8, fontFamily: "system-ui" }}>
            6 кварталов · 60 000 жителей · 5,4 км²
          </div>
        </div>
      </FadeIn>

      {/* Main SVG diagram */}
      <svg
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {/* Tram ring */}
        <ellipse
          cx={960}
          cy={520}
          rx={360}
          ry={300}
          fill="none"
          stroke={COLORS.amber}
          strokeWidth={2}
          strokeDasharray={`${ringProgress * 2200} ${2200}`}
          opacity={0.5}
        />
        <ellipse
          cx={960}
          cy={520}
          rx={360}
          ry={300}
          fill="none"
          stroke={COLORS.amber}
          strokeWidth={6}
          strokeDasharray={`${ringProgress * 2200} ${2200}`}
          opacity={0.1}
          filter="url(#ringGlow)"
        />

        {/* Core */}
        <circle
          cx={960}
          cy={520}
          r={70 * coreScale}
          fill={`${COLORS.amber}18`}
          stroke={COLORS.amber}
          strokeWidth={1.5}
          opacity={corePulseOpacity}
        />
        <circle cx={960} cy={520} r={30 * coreScale} fill={COLORS.amber} opacity={0.4} />
        <text
          x={960}
          y={525}
          fill="#ffffff"
          fontSize={16}
          fontWeight={700}
          textAnchor="middle"
          fontFamily="system-ui"
          opacity={coreScale}
        >
          ЯДРО
        </text>

        {/* Connection lines from core to quarters */}
        {quarters.map((q, i) => {
          const lineOpacity = interpolate(frame, [55 + i * 25, 65 + i * 25], [0, 0.3], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <line
              key={q.id}
              x1={960}
              y1={520}
              x2={q.cx}
              y2={q.cy}
              stroke={q.color}
              strokeWidth={1}
              strokeDasharray="6 4"
              opacity={lineOpacity}
            />
          );
        })}

        {/* Quarter nodes */}
        {quarters.map((q, i) => (
          <QuarterNode key={q.id} quarter={q} index={i} />
        ))}

        <defs>
          <filter id="ringGlow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
      </svg>

      {/* Stats bar */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: statsOpacity,
        }}
      >
        {[
          { value: "9,6 км", label: "трамвайное кольцо" },
          { value: "450 м", label: "до базового сервиса" },
          { value: "12 км", label: "зимних галерей" },
          { value: "78%", label: "покрытие тенью" },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.amber, fontFamily: "system-ui", letterSpacing: "-0.02em" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontFamily: "system-ui", marginTop: 4 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Particles */}
      <Particles count={20} color={COLORS.amber} startFrame={200} seed={77} />
    </AbsoluteFill>
  );
};
