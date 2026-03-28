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
  dark: "#0a0a0f",
};

const machines = [
  {
    id: "M1",
    title: "Hybrid Climate CHP",
    subtitle: "Гибридная ТЭЦ",
    color: COLORS.amber,
    confidence: "high",
    capex: "base",
    mix: [
      { label: "Тепловые насосы", share: 36 },
      { label: "Waste heat", share: 18 },
      { label: "Электрокотлы", share: 14 },
      { label: "Storage", share: 14 },
      { label: "Резерв", share: 18 },
    ],
  },
  {
    id: "M2",
    title: "Nuclear-Fed Loop",
    subtitle: "Атомный контур",
    color: COLORS.steel,
    confidence: "medium",
    capex: "upper-mid",
    mix: [
      { label: "Атомный ввод", share: 42 },
      { label: "Теплообмен", share: 16 },
      { label: "Absorption cool.", share: 12 },
      { label: "Electric cool.", share: 10 },
      { label: "Local backup", share: 20 },
    ],
  },
  {
    id: "M3",
    title: "All-Electric Loop",
    subtitle: "Электрический контур",
    color: COLORS.moss,
    confidence: "medium",
    capex: "high",
    mix: [
      { label: "Heat pumps", share: 44 },
      { label: "Ambient loops", share: 18 },
      { label: "Seasonal storage", share: 18 },
      { label: "Electric boilers", share: 10 },
      { label: "Backup", share: 10 },
    ],
  },
];

const MixBar: React.FC<{
  item: { label: string; share: number };
  color: string;
  startFrame: number;
  index: number;
}> = ({ item, color, startFrame, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barProgress = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    delay: startFrame + index * 8,
    durationInFrames: 20,
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
      <div style={{ width: 130, textAlign: "right", color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "system-ui" }}>
        {item.label}
      </div>
      <div style={{ flex: 1, height: 20, background: "rgba(255,255,255,0.04)", borderRadius: 4, overflow: "hidden" }}>
        <div
          style={{
            width: `${item.share * barProgress}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            borderRadius: 4,
          }}
        />
      </div>
      <div style={{ width: 40, textAlign: "right", color: "rgba(255,255,255,0.5)", fontSize: 13, fontFamily: "system-ui", fontWeight: 600 }}>
        {Math.round(item.share * barProgress)}%
      </div>
    </div>
  );
};

const MachineCard: React.FC<{
  machine: typeof machines[0];
  index: number;
  startFrame: number;
  x: number;
}> = ({ machine, index, startFrame, x }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({ frame, fps, from: 0.8, to: 1, delay: startFrame, durationInFrames: 20 });
  const cardOpacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 200,
        width: 520,
        padding: 36,
        borderRadius: 20,
        border: `1px solid ${machine.color}33`,
        background: `linear-gradient(135deg, ${machine.color}0a, rgba(10, 10, 15, 0.9))`,
        backdropFilter: "blur(12px)",
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: `${machine.color}20`,
            border: `1px solid ${machine.color}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: machine.color,
            fontSize: 20,
            fontWeight: 800,
            fontFamily: "system-ui",
          }}
        >
          {machine.id}
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "system-ui", letterSpacing: "-0.02em" }}>
            {machine.title}
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", fontFamily: "system-ui", marginTop: 2 }}>
            {machine.subtitle}
          </div>
        </div>
      </div>

      {/* Badges */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <div
          style={{
            padding: "5px 12px",
            borderRadius: 8,
            background: machine.confidence === "high" ? "rgba(155, 207, 135, 0.15)" : "rgba(240, 194, 127, 0.15)",
            color: machine.confidence === "high" ? COLORS.moss : COLORS.amber,
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "system-ui",
          }}
        >
          {machine.confidence}
        </div>
        <div
          style={{
            padding: "5px 12px",
            borderRadius: 8,
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.6)",
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "system-ui",
          }}
        >
          CAPEX: {machine.capex}
        </div>
      </div>

      {/* Technology mix bars */}
      {machine.mix.map((item, i) => (
        <MixBar key={item.label} item={item} color={machine.color} startFrame={startFrame + 15} index={i} />
      ))}
    </div>
  );
};

export const MachineScenarios: React.FC = () => {
  const frame = useCurrentFrame();

  // Show machines one by one: M1 (0-180), M2 (150-330), M3 (300-450)
  const showM1 = frame < 180;
  const showM2 = frame >= 120 && frame < 330;
  const showM3 = frame >= 270;

  const m1Opacity = interpolate(frame, [0, 15, 150, 180], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const m2Opacity = interpolate(frame, [120, 135, 300, 330], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const m3Opacity = interpolate(frame, [270, 285, 430, 450], [0, 1, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.dark, fontFamily: "system-ui, sans-serif" }}>
      {/* Grid */}
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
        <div style={{ position: "absolute", top: 48, left: 0, right: 0, textAlign: "center" }}>
          <div style={{ fontSize: 42, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>
            Три климатических машины
          </div>
          <div style={{ fontSize: 20, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>
            Один город — три инженерных пути
          </div>
        </div>
      </FadeIn>

      {/* Machine cards with cross-fade */}
      {showM1 && (
        <div style={{ opacity: m1Opacity }}>
          <MachineCard machine={machines[0]} index={0} startFrame={15} x={700} />
        </div>
      )}
      {showM2 && (
        <div style={{ opacity: m2Opacity }}>
          <MachineCard machine={machines[1]} index={1} startFrame={135} x={700} />
        </div>
      )}
      {showM3 && (
        <div style={{ opacity: m3Opacity }}>
          <MachineCard machine={machines[2]} index={2} startFrame={285} x={700} />
        </div>
      )}

      {/* Bottom comparison strip — appears at end */}
      {frame >= 380 && (
        <FadeIn startFrame={380} durationFrames={20} direction="up">
          <div
            style={{
              position: "absolute",
              bottom: 48,
              left: 120,
              right: 120,
              display: "flex",
              justifyContent: "space-between",
              gap: 32,
            }}
          >
            {machines.map((m) => (
              <div
                key={m.id}
                style={{
                  flex: 1,
                  padding: "16px 24px",
                  borderRadius: 14,
                  border: `1px solid ${m.color}33`,
                  background: "rgba(10, 10, 15, 0.8)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700, color: m.color }}>{m.id}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{m.subtitle}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      <Particles count={15} color={COLORS.amber} startFrame={100} seed={33} />
      <Particles count={15} color={COLORS.steel} startFrame={220} seed={44} />
      <Particles count={15} color={COLORS.moss} startFrame={340} seed={55} />
    </AbsoluteFill>
  );
};
