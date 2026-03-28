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

/* ---------- ROI Curve ---------- */
const ROICurve: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [startFrame, startFrame + 120],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Generate ROI curve points: negative early, crossing zero at ~50%, positive after
  const points: string[] = [];
  const width = 1200;
  const height = 400;
  const centerY = height * 0.55;

  for (let i = 0; i <= 100; i++) {
    const x = (i / 100) * width;
    // S-curve: starts negative, crosses zero around 48% (year 12), goes positive
    const t = i / 100;
    const y = centerY - (Math.tanh((t - 0.48) * 6) * centerY * 0.8);
    if (x <= progress * width) {
      points.push(`${x},${y}`);
    }
  }

  const polyline = points.join(" ");

  // Gradient ID
  const gradientStops = [
    { offset: "0%", color: COLORS.copper },
    { offset: "48%", color: COLORS.amber },
    { offset: "100%", color: COLORS.moss },
  ];

  return (
    <div style={{ position: "relative", width, height, margin: "0 auto" }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="roiGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            {gradientStops.map((s, i) => (
              <stop key={i} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
        </defs>
        {/* Zero line */}
        <line
          x1={0} y1={centerY} x2={width} y2={centerY}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={1}
          strokeDasharray="8,4"
        />
        {/* Year markers */}
        {[0, 5, 10, 12, 15, 20, 25].map((year) => {
          const x = (year / 25) * width;
          return (
            <g key={year}>
              <line x1={x} y1={centerY - 5} x2={x} y2={centerY + 5} stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
              <text x={x} y={centerY + 25} fill="rgba(255,255,255,0.5)" fontSize={14} textAnchor="middle" fontFamily="system-ui">
                {year === 12 ? "Год 12" : `${year}`}
              </text>
            </g>
          );
        })}
        {/* ROI curve */}
        <polyline
          points={polyline}
          fill="none"
          stroke="url(#roiGrad)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Glow behind curve */}
        <polyline
          points={polyline}
          fill="none"
          stroke="url(#roiGrad)"
          strokeWidth={8}
          strokeLinecap="round"
          opacity={0.3}
          filter="blur(4px)"
        />
      </svg>
      {/* Labels */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 40,
          color: COLORS.moss,
          fontSize: 18,
          fontFamily: "system-ui",
          opacity: progress > 0.9 ? 1 : 0,
        }}
      >
        +160% ROI
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          color: COLORS.copper,
          fontSize: 18,
          fontFamily: "system-ui",
          opacity: progress > 0.1 ? 1 : 0,
        }}
      >
        Инвестиции
      </div>
    </div>
  );
};

/* ---------- Cost Bar ---------- */
const CostBar: React.FC<{
  label: string;
  percentage: number;
  color: string;
  startFrame: number;
  index: number;
}> = ({ label, percentage, color, startFrame, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barProgress = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    delay: startFrame + index * 12,
    durationInFrames: 25,
  });

  const width = percentage * barProgress;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 16 }}>
      <div
        style={{
          width: 160,
          textAlign: "right",
          color: "rgba(255,255,255,0.7)",
          fontSize: 20,
          fontFamily: "system-ui",
        }}
      >
        {label}
      </div>
      <div
        style={{
          flex: 1,
          height: 36,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 8,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${width}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            borderRadius: 8,
            boxShadow: `0 0 20px ${color}33`,
          }}
        />
        <span
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "rgba(255,255,255,0.8)",
            fontSize: 16,
            fontFamily: "system-ui",
            fontWeight: 600,
          }}
        >
          {Math.round(width)}%
        </span>
      </div>
    </div>
  );
};

/* ---------- Main Composition ---------- */
export const PricingExplainer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section visibility
  const showBigNumber = frame >= 0 && frame < 90;
  const showROI = frame >= 90 && frame < 210;
  const showBars = frame >= 210 && frame < 330;
  const showFinal = frame >= 330;

  // Big number scale animation
  const bigScale = spring({ frame, fps, from: 0.5, to: 1, delay: 10, durationInFrames: 25 });

  // Reframe: big number shrinks, per-capita appears
  const reframeProgress = interpolate(
    frame,
    [45, 70],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Section transitions
  const sectionFade = (start: number, end: number) => {
    const fadeIn = interpolate(frame, [start, start + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const fadeOut = interpolate(frame, [end - 15, end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return Math.min(fadeIn, fadeOut);
  };

  const costItems = [
    { label: "Жилой фонд", percentage: 45, color: COLORS.amber },
    { label: "Термальная", percentage: 20, color: COLORS.copper },
    { label: "Транспорт", percentage: 15, color: COLORS.steel },
    { label: "Озеленение", percentage: 10, color: COLORS.moss },
    { label: "Социальное", percentage: 10, color: "#b8a9c9" },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.dark,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Subtle grid background */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Section 1: Big Number (frames 0-90) */}
      {showBigNumber && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: sectionFade(0, 90),
          }}
        >
          <div
            style={{
              transform: `scale(${bigScale * (1 - reframeProgress * 0.4)})`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 140,
                fontWeight: 800,
                color: COLORS.amber,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              1,97 трлн ₸
            </div>
            <div
              style={{
                fontSize: 28,
                color: "rgba(255,255,255,0.5)",
                marginTop: 16,
              }}
            >
              общий бюджет проекта
            </div>
          </div>

          {/* Per-capita reframe */}
          <FadeIn startFrame={50} durationFrames={20} direction="up">
            <div
              style={{
                marginTop: 60,
                textAlign: "center",
                opacity: reframeProgress,
              }}
            >
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 700,
                  color: COLORS.copper,
                  letterSpacing: "-0.02em",
                }}
              >
                32,8 млн ₸
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: "rgba(255,255,255,0.6)",
                  marginTop: 8,
                }}
              >
                на жителя
              </div>
            </div>
          </FadeIn>
        </AbsoluteFill>
      )}

      {/* Section 2: ROI Curve (frames 90-210) */}
      {showROI && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 120px",
            opacity: sectionFade(90, 210),
          }}
        >
          <FadeIn startFrame={90} durationFrames={20} direction="none">
            <div
              style={{
                fontSize: 36,
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: 40,
                textAlign: "center",
              }}
            >
              Кривая возврата инвестиций
            </div>
          </FadeIn>
          <ROICurve startFrame={100} />
        </AbsoluteFill>
      )}

      {/* Section 3: Cost Bars (frames 210-330) */}
      {showBars && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 200px",
            opacity: sectionFade(210, 330),
          }}
        >
          <FadeIn startFrame={210} durationFrames={20} direction="none">
            <div
              style={{
                fontSize: 36,
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: 48,
                textAlign: "center",
              }}
            >
              Структура расходов
            </div>
          </FadeIn>
          {costItems.map((item, i) => (
            <CostBar
              key={item.label}
              label={item.label}
              percentage={item.percentage}
              color={item.color}
              startFrame={220}
              index={i}
            />
          ))}
        </AbsoluteFill>
      )}

      {/* Section 4: Final (frames 330-450) */}
      {showFinal && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [330, 345], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <FadeIn startFrame={335} durationFrames={25} direction="up">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
                Год 12
              </div>
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 800,
                  color: COLORS.moss,
                  letterSpacing: "-0.02em",
                }}
              >
                Безубыточность
              </div>
            </div>
          </FadeIn>

          <FadeIn startFrame={370} durationFrames={25} direction="up">
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <div style={{ fontSize: 32, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
                Год 25
              </div>
              <div
                style={{
                  fontSize: 80,
                  fontWeight: 800,
                  color: COLORS.amber,
                  letterSpacing: "-0.02em",
                }}
              >
                +160%
              </div>
            </div>
          </FadeIn>

          {/* Celebration particles */}
          <Particles count={50} color={COLORS.amber} startFrame={380} seed={1} />
          <Particles count={30} color={COLORS.moss} startFrame={390} seed={2} />
          <Particles count={20} color={COLORS.copper} startFrame={400} seed={3} />
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
