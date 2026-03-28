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
  glass: "#3b82f6",
  snow: "#e2e8f0",
  dark: "#0a0a0f",
};

/* ---------- Section 1: Covered Gallery (frames 0-120) ---------- */
const CoveredGallery: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame, [startFrame, startFrame + 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Building height animation
  const buildScale = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    delay: startFrame + 5,
    durationInFrames: 25,
  });

  // Warm glow pulse inside gallery
  const glowPulse = Math.sin(frame * 0.08) * 0.15 + 0.85;

  // Walking figure position
  const figureX = interpolate(frame, [startFrame + 30, startFrame + 110], [300, 1100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.glass} stopOpacity={0.4} />
            <stop offset="100%" stopColor={COLORS.glass} stopOpacity={0.1} />
          </linearGradient>
          <radialGradient id="warmGlow" cx="50%" cy="70%">
            <stop offset="0%" stopColor={COLORS.amber} stopOpacity={0.3 * glowPulse} />
            <stop offset="100%" stopColor={COLORS.amber} stopOpacity={0} />
          </radialGradient>
          <linearGradient id="buildingGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
        </defs>

        {/* Ground / snow */}
        <rect x={0} y={700} width={1920} height={380} fill="#1e293b" />
        <rect x={0} y={695} width={1920} height={10} fill="rgba(255,255,255,0.05)" />

        {/* Left building */}
        <g style={{ transform: `scaleY(${buildScale})`, transformOrigin: "0 700px" }}>
          <rect x={100} y={200} width={300} height={500} rx={8} fill="url(#buildingGrad)" />
          {/* Windows */}
          {[0, 1, 2, 3, 4].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`lw-${row}-${col}`}
                x={140 + col * 85}
                y={240 + row * 90}
                width={50}
                height={60}
                rx={4}
                fill={COLORS.amber}
                opacity={0.15 + Math.sin(frame * 0.05 + row + col) * 0.1}
              />
            ))
          )}
        </g>

        {/* Right building */}
        <g style={{ transform: `scaleY(${buildScale})`, transformOrigin: "0 700px" }}>
          <rect x={1520} y={250} width={300} height={450} rx={8} fill="url(#buildingGrad)" />
          {/* Windows */}
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`rw-${row}-${col}`}
                x={1560 + col * 85}
                y={290 + row * 90}
                width={50}
                height={60}
                rx={4}
                fill={COLORS.amber}
                opacity={0.15 + Math.sin(frame * 0.05 + row + col + 2) * 0.1}
              />
            ))
          )}
        </g>

        {/* Glass gallery arch connecting buildings */}
        <g opacity={interpolate(frame, [startFrame + 10, startFrame + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          {/* Glass arch structure */}
          <path
            d="M 400 700 L 400 350 Q 400 250 500 220 L 960 180 Q 960 180 1420 220 Q 1520 250 1520 350 L 1520 700"
            fill="url(#glassGrad)"
            stroke={COLORS.glass}
            strokeWidth={2}
            opacity={0.6}
          />
          {/* Arch ribs */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const x = 480 + i * 130;
            const topY = interpolate(i, [0, 3.5, 7], [310, 195, 310]);
            return (
              <line
                key={`rib-${i}`}
                x1={x}
                y1={700}
                x2={x}
                y2={topY}
                stroke={COLORS.glass}
                strokeWidth={1.5}
                opacity={0.3}
              />
            );
          })}
          {/* Floor inside gallery */}
          <rect x={400} y={680} width={1120} height={20} rx={2} fill={COLORS.amber} opacity={0.08} />
          {/* Warm glow inside */}
          <ellipse cx={960} cy={500} rx={500} ry={200} fill="url(#warmGlow)" />
        </g>

        {/* Walking figure inside gallery */}
        <g opacity={interpolate(frame, [startFrame + 30, startFrame + 40], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          <ellipse cx={figureX} cy={670} rx={8} ry={4} fill="rgba(0,0,0,0.3)" />
          <line x1={figureX} y1={670} x2={figureX} y2={635} stroke="rgba(255,255,255,0.6)" strokeWidth={3} strokeLinecap="round" />
          <circle cx={figureX} cy={628} r={7} fill="rgba(255,255,255,0.6)" />
        </g>
      </svg>

      {/* Metric overlay */}
      <FadeIn startFrame={startFrame + 50} durationFrames={20} direction="up">
        <div
          style={{
            position: "absolute",
            bottom: 160,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(12px)",
              padding: "20px 48px",
              borderRadius: 16,
              border: `1px solid ${COLORS.amber}44`,
              display: "flex",
              alignItems: "baseline",
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: COLORS.amber,
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              <AnimatedNumber
                value={12}
                suffix=" km"
                startFrame={startFrame + 55}
                durationFrames={35}
                decimals={0}
              />
            </span>
            <span
              style={{
                fontSize: 22,
                color: "rgba(255,255,255,0.6)",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              крытых галерей
            </span>
          </div>
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};

/* ---------- Section 2: Pedestrian Route (frames 120-240) ---------- */
const PedestrianRoute: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    delay: startFrame,
    durationInFrames: 25,
  });

  // Tree sway
  const sway = Math.sin(frame * 0.04) * 3;

  // Pedestrians walking
  const ped1X = interpolate(frame, [startFrame + 20, startFrame + 110], [200, 900], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ped2X = interpolate(frame, [startFrame + 35, startFrame + 115], [1700, 1000], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
        </defs>

        {/* Ground */}
        <rect x={0} y={680} width={1920} height={400} fill="#1a2332" />

        {/* Pathway */}
        <rect x={300} y={680} width={1320} height={30} rx={4} fill="rgba(255,255,255,0.06)" />
        <rect x={350} y={685} width={1220} height={20} rx={3} fill="rgba(155,207,135,0.08)" />

        {/* Wind screens — transparent panels */}
        {[400, 700, 1000, 1300].map((x, i) => (
          <g key={`screen-${i}`} opacity={enter}>
            <rect
              x={x}
              y={380}
              width={12}
              height={300}
              rx={2}
              fill="url(#screenGrad)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={1}
            />
            <rect
              x={x - 80}
              y={380}
              width={172}
              height={300}
              rx={4}
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={0.5}
            />
          </g>
        ))}

        {/* Trees */}
        {[250, 550, 850, 1150, 1450, 1700].map((x, i) => (
          <g
            key={`tree-${i}`}
            style={{
              transform: `rotate(${sway * (i % 2 === 0 ? 1 : -1)}deg)`,
              transformOrigin: `${x}px 680px`,
            }}
            opacity={interpolate(frame, [startFrame + 10 + i * 5, startFrame + 20 + i * 5], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          >
            {/* Trunk */}
            <rect x={x - 4} y={560} width={8} height={120} rx={3} fill="#5b4a3a" />
            {/* Canopy */}
            <ellipse cx={x} cy={520} rx={45 + i * 3} ry={55} fill={COLORS.moss} opacity={0.35} />
            <ellipse cx={x - 10} cy={500} rx={35} ry={40} fill={COLORS.moss} opacity={0.25} />
          </g>
        ))}

        {/* Pedestrian 1 */}
        <g opacity={interpolate(frame, [startFrame + 20, startFrame + 28], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          <ellipse cx={ped1X} cy={672} rx={8} ry={3} fill="rgba(0,0,0,0.2)" />
          <line x1={ped1X} y1={672} x2={ped1X} y2={638} stroke="rgba(255,255,255,0.6)" strokeWidth={3} strokeLinecap="round" />
          <circle cx={ped1X} cy={631} r={7} fill="rgba(255,255,255,0.6)" />
        </g>

        {/* Pedestrian 2 (walking opposite direction) */}
        <g opacity={interpolate(frame, [startFrame + 35, startFrame + 43], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          <ellipse cx={ped2X} cy={672} rx={7} ry={3} fill="rgba(0,0,0,0.15)" />
          <line x1={ped2X} y1={672} x2={ped2X} y2={642} stroke="rgba(255,255,255,0.5)" strokeWidth={2.5} strokeLinecap="round" />
          <circle cx={ped2X} cy={636} r={6} fill="rgba(255,255,255,0.5)" />
        </g>
      </svg>

      {/* Section label */}
      <FadeIn startFrame={startFrame + 5} durationFrames={20} direction="down">
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 0,
            right: 0,
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)",
              padding: "12px 36px",
              borderRadius: 12,
              border: `1px solid ${COLORS.moss}33`,
            }}
          >
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: COLORS.moss,
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "0.03em",
              }}
            >
              Пешеходный маршрут
            </span>
          </div>
        </div>
      </FadeIn>

      {/* Wind protection info */}
      <FadeIn startFrame={startFrame + 60} durationFrames={20} direction="up">
        <div
          style={{
            position: "absolute",
            bottom: 160,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(12px)",
              padding: "16px 40px",
              borderRadius: 14,
              border: `1px solid ${COLORS.moss}44`,
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <span
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.6)",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              ветрозащита до
            </span>
            <span
              style={{
                fontSize: 42,
                fontWeight: 800,
                color: COLORS.moss,
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              -60%
            </span>
            <span
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.6)",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              скорости ветра
            </span>
          </div>
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};

/* ---------- Section 3: Tram Corridor (frames 240-360) ---------- */
const TramCorridor: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    delay: startFrame,
    durationInFrames: 25,
  });

  // Tram arrival animation
  const tramX = interpolate(frame, [startFrame + 40, startFrame + 90], [1920, 700], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const tramOpacity = interpolate(frame, [startFrame + 40, startFrame + 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Track drawing
  const trackLength = interpolate(frame, [startFrame + 5, startFrame + 40], [0, 1920], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="tramGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={COLORS.steel} />
            <stop offset="100%" stopColor={COLORS.glass} />
          </linearGradient>
        </defs>

        {/* Ground */}
        <rect x={0} y={650} width={1920} height={430} fill="#1a2332" />

        {/* Tracks */}
        <g opacity={enter}>
          <rect x={0} y={640} width={trackLength} height={4} rx={2} fill="rgba(255,255,255,0.2)" />
          <rect x={0} y={660} width={trackLength} height={4} rx={2} fill="rgba(255,255,255,0.2)" />
          {/* Sleepers */}
          {Array.from({ length: Math.floor(trackLength / 40) }, (_, i) => (
            <rect
              key={`sleeper-${i}`}
              x={i * 40}
              y={636}
              width={24}
              height={32}
              rx={2}
              fill="rgba(255,255,255,0.06)"
            />
          ))}
        </g>

        {/* Station platform */}
        <g opacity={interpolate(frame, [startFrame + 15, startFrame + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
          {/* Platform base */}
          <rect x={550} y={600} width={500} height={50} rx={6} fill="#2a3444" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
          {/* Platform edge marking */}
          <rect x={550} y={645} width={500} height={4} rx={2} fill={COLORS.steel} opacity={0.4} />
          {/* Shelter */}
          <rect x={620} y={420} width={360} height={180} rx={8} fill="rgba(59,130,246,0.08)" stroke={COLORS.steel} strokeWidth={1.5} opacity={0.5} />
          {/* Shelter roof */}
          <rect x={600} y={415} width={400} height={8} rx={4} fill={COLORS.steel} opacity={0.4} />
          {/* Shelter pillars */}
          <rect x={630} y={420} width={4} height={180} fill={COLORS.steel} opacity={0.3} />
          <rect x={970} y={420} width={4} height={180} fill={COLORS.steel} opacity={0.3} />
          {/* Waiting figures */}
          {[700, 780, 860].map((x, i) => (
            <g key={`wait-${i}`} opacity={0.5}>
              <line x1={x} y1={595} x2={x} y2={560} stroke="rgba(255,255,255,0.5)" strokeWidth={2.5} strokeLinecap="round" />
              <circle cx={x} cy={553} r={6} fill="rgba(255,255,255,0.5)" />
            </g>
          ))}
        </g>

        {/* Tram */}
        <g opacity={tramOpacity} style={{ transform: `translateX(${tramX - 700}px)` }}>
          {/* Body */}
          <rect x={600} y={530} width={320} height={115} rx={16} fill="url(#tramGrad)" opacity={0.85} />
          {/* Windows */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={`tw-${i}`}
              x={625 + i * 58}
              y={545}
              width={42}
              height={50}
              rx={6}
              fill="rgba(255,255,255,0.2)"
            />
          ))}
          {/* Light strip */}
          <rect x={610} y={640} width={300} height={3} rx={1.5} fill={COLORS.amber} opacity={0.6} />
          {/* Roof equipment */}
          <rect x={720} y={520} width={80} height={12} rx={4} fill="rgba(255,255,255,0.15)" />
          {/* Pantograph */}
          <line x1={760} y1={520} x2={760} y2={480} stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
          <line x1={745} y1={480} x2={775} y2={480} stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
        </g>

        {/* Overhead wire */}
        <line x1={0} y1={478} x2={1920} y2={478} stroke="rgba(255,255,255,0.1)" strokeWidth={1.5}
          opacity={interpolate(frame, [startFrame + 10, startFrame + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />
      </svg>

      {/* Metric overlay */}
      <FadeIn startFrame={startFrame + 65} durationFrames={20} direction="up">
        <div
          style={{
            position: "absolute",
            bottom: 160,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(12px)",
              padding: "20px 48px",
              borderRadius: 16,
              border: `1px solid ${COLORS.steel}44`,
              display: "flex",
              alignItems: "baseline",
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: COLORS.steel,
                fontFamily: "system-ui, sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              <AnimatedNumber
                value={9.6}
                suffix=" km"
                startFrame={startFrame + 70}
                durationFrames={35}
                decimals={1}
              />
            </span>
            <span
              style={{
                fontSize: 22,
                color: "rgba(255,255,255,0.6)",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              трамвайное кольцо
            </span>
          </div>
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};

/* ---------- Main Composition ---------- */
export const CorridorWalkthrough: React.FC = () => {
  const frame = useCurrentFrame();

  // Section visibility with crossfade
  const showGallery = frame < 130;
  const showPedestrian = frame >= 110 && frame < 250;
  const showTram = frame >= 230;

  const galleryOpacity = interpolate(frame, [0, 10, 110, 130], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pedestrianOpacity = interpolate(frame, [110, 125, 230, 250], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tramOpacity = interpolate(frame, [230, 245, 345, 360], [0, 1, 1, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
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
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            Коридоры Теплового Кольца
          </div>
          <div
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.5)",
              marginTop: 8,
            }}
          >
            3 типа связей — от галерей до трамвая
          </div>
        </div>
      </FadeIn>

      {/* Section 1: Covered Gallery */}
      {showGallery && (
        <AbsoluteFill style={{ opacity: galleryOpacity }}>
          <CoveredGallery startFrame={5} />
        </AbsoluteFill>
      )}

      {/* Section 2: Pedestrian Route */}
      {showPedestrian && (
        <AbsoluteFill style={{ opacity: pedestrianOpacity }}>
          <PedestrianRoute startFrame={115} />
        </AbsoluteFill>
      )}

      {/* Section 3: Tram Corridor */}
      {showTram && (
        <AbsoluteFill style={{ opacity: tramOpacity }}>
          <TramCorridor startFrame={235} />
        </AbsoluteFill>
      )}

      {/* Section indicators at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 32,
          zIndex: 10,
        }}
      >
        {[
          { label: "Крытая галерея", color: COLORS.amber, active: frame < 120 },
          { label: "Пешеходный", color: COLORS.moss, active: frame >= 120 && frame < 240 },
          { label: "Трамвайный", color: COLORS.steel, active: frame >= 240 },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: "8px 20px",
              borderRadius: 10,
              border: `1px solid ${item.active ? item.color : "rgba(255,255,255,0.1)"}`,
              background: item.active ? `${item.color}18` : "rgba(0,0,0,0.3)",
              transition: "all 0.3s",
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: item.active ? item.color : "rgba(255,255,255,0.3)",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Snow particles — throughout, heavier in gallery section */}
      <Particles count={35} color={COLORS.snow} startFrame={10} seed={101} />
      <Particles count={20} color={COLORS.snow} startFrame={60} seed={102} />
      <Particles count={15} color="rgba(255,255,255,0.5)" startFrame={150} seed={103} />
      <Particles count={15} color="rgba(255,255,255,0.4)" startFrame={260} seed={104} />
    </AbsoluteFill>
  );
};
