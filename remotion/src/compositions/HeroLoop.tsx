import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { FadeIn } from "../components/FadeIn";
import { Particles } from "../components/Particles";

const COLORS = {
  amber: "#f0c27f",
  copper: "#ef9461",
  steel: "#86b6c8",
};

const DataOverlay: React.FC<{
  text: string;
  startFrame: number;
  endFrame: number;
}> = ({ text, startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, from: 0, to: 1, delay: startFrame, durationInFrames: 20 });
  const exit = interpolate(
    frame,
    [endFrame - 10, endFrame],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(enter, exit);
  const scale = interpolate(enter, [0, 1], [0.8, 1]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 200,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(12px)",
          padding: "24px 64px",
          borderRadius: 16,
          border: `1px solid ${COLORS.amber}44`,
        }}
      >
        <span
          style={{
            color: COLORS.amber,
            fontSize: 64,
            fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export const HeroLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Slow zoom: 1.0 → 1.15 over full duration, ease back at loop point
  const zoomProgress = interpolate(
    frame,
    [0, durationInFrames * 0.9, durationInFrames],
    [1, 1.15, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtle pan
  const panX = interpolate(frame, [0, durationInFrames], [0, -30]);
  const panY = interpolate(frame, [0, durationInFrames], [0, -15]);

  // District glow pulse (frames 180-270)
  const glowOpacity = interpolate(
    frame,
    [180, 210, 240, 270],
    [0, 0.3, 0.2, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Loop fade (last 30 frames fade out, first 15 frames fade in)
  const loopFade = interpolate(
    frame,
    [0, 15, 270, 300],
    [0.85, 1, 1, 0.85],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0f" }}>
      {/* Background aerial image with zoom + pan */}
      <AbsoluteFill
        style={{
          transform: `scale(${zoomProgress}) translate(${panX}px, ${panY}px)`,
          opacity: loopFade,
        }}
      >
        <Img
          src={staticFile("images/renders/selling-aerial-summer.webp")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>

      {/* Warm vignette overlay */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, rgba(10, 10, 15, 0.7) 100%)`,
        }}
      />

      {/* District glow pulse */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 60%, ${COLORS.amber}${Math.round(glowOpacity * 255).toString(16).padStart(2, "0")} 0%, transparent 60%)`,
        }}
      />

      {/* Data overlays sequence */}
      <DataOverlay text="60 000 жителей" startFrame={90} endFrame={130} />
      <DataOverlay text="от -40 до +35 C" startFrame={120} endFrame={160} />
      <DataOverlay text="окупаемость 12 лет" startFrame={150} endFrame={180} />

      {/* Warm amber particles (frames 180-270) */}
      <Particles
        count={40}
        color={COLORS.amber}
        startFrame={180}
        seed={42}
      />
      <Particles
        count={20}
        color={COLORS.copper}
        startFrame={195}
        seed={99}
      />

      {/* Title bar at top */}
      <FadeIn startFrame={5} durationFrames={30} direction="down">
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)",
              padding: "16px 48px",
              borderRadius: 12,
              border: `1px solid ${COLORS.steel}33`,
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontSize: 28,
                fontWeight: 600,
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Project Totoro — Smart District
            </span>
          </div>
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};
