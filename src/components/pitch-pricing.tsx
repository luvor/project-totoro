"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./pitch.module.css";
import { PricingComparisonGraphic } from "./visuals/pricing-comparison";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/* ─── Scroll-triggered reveal ─── */
function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.revealVisible : ""} ${className ?? ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Animated bar that fills on scroll ─── */
function AnimatedBar({ percent, color, label, amount, delay = 0 }: { percent: number; color: string; label: string; amount: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.pricingBarRow}>
      <div className={styles.pricingBarMeta}>
        <span className={styles.pricingBarLabel}>{label}</span>
        <span className={styles.pricingBarAmount}>{amount} &middot; {percent}%</span>
      </div>
      <div className={styles.pricingBarTrack}>
        <div
          className={styles.pricingBarFill}
          style={{
            width: visible ? `${percent}%` : "0%",
            background: color,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

/* ─── Animated counter ─── */
function Counter({ target, suffix, prefix = "" }: { target: number; suffix: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const startTime = performance.now();
          function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            if (target >= 1000) {
              setDisplay(Math.round(current).toLocaleString("ru-RU").replace(/\u00a0/g, " "));
            } else if (target % 1 !== 0) {
              setDisplay(current.toFixed(1));
            } else {
              setDisplay(String(Math.round(current)));
            }
            if (progress < 1) requestAnimationFrame(animate);
            else setDisplay(target >= 1000 ? target.toLocaleString("ru-RU").replace(/\u00a0/g, " ") : String(target));
          }
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{display}<span className={styles.pricingCounterUnit}>{suffix}</span>
    </span>
  );
}

/* ─── Animated counter for "cost of waiting" ─── */
function RunningCounter({ perSecond }: { perSecond: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const [active, setActive] = useState(false);
  const animRef = useRef<number>(0);
  const startRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplay("22 000 000 000");
      return;
    }

    startRef.current = performance.now();
    function tick(now: number) {
      const elapsed = (now - startRef.current) / 1000;
      const val = Math.round(elapsed * perSecond);
      setDisplay(val.toLocaleString("ru-RU").replace(/\u00a0/g, " "));
      animRef.current = requestAnimationFrame(tick);
    }
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [active, perSecond]);

  return <span ref={ref}>{display}</span>;
}

/* ─── Data ─── */
const comparisons = [
  { label: "Затраты на отопление", traditional: "100%", thermal: "45%", savings: "\u221255%", icon: "\u2744" },
  { label: "Срок инфраструктуры", traditional: "30 лет", thermal: "70 лет", savings: "+40 лет", icon: "\u23F3" },
  { label: "Расходы на здравоохранение", traditional: "100%", thermal: "62%", savings: "\u221238%", icon: "\u2764" },
  { label: "Рост стоимости недвижимости", traditional: "+2%/год", thermal: "+8%/год", savings: "4x", icon: "\u2191" },
];

const capexItems = [
  { label: "Жилая застройка", percent: 45, amount: "887 млрд ₸", color: "linear-gradient(90deg, var(--amber), var(--copper))" },
  { label: "Тепловая инфраструктура", percent: 20, amount: "394 млрд ₸", color: "linear-gradient(90deg, var(--copper), #e07040)" },
  { label: "Транспорт (трамвай)", percent: 15, amount: "296 млрд ₸", color: "linear-gradient(90deg, var(--steel), #6a9ab5)" },
  { label: "Зелёная инфраструктура", percent: 10, amount: "197 млрд ₸", color: "linear-gradient(90deg, var(--moss), #7ab86a)" },
  { label: "Общественные пространства", percent: 10, amount: "197 млрд ₸", color: "linear-gradient(90deg, var(--sand), #d4c9b8)" },
];

const includedItems = [
  { icon: "🏠", title: "Жильё", desc: "15 000 квартир с климат-контролем" },
  { icon: "🚋", title: "Трамвай", desc: "Кольцевая линия на 10 км" },
  { icon: "🔥", title: "Тепловое ядро", desc: "Центральный теплообменник" },
  { icon: "🌳", title: "Парки", desc: "40% зелёных территорий" },
  { icon: "🏥", title: "Здравоохранение", desc: "Клиника и поликлиника" },
  { icon: "🏫", title: "Образование", desc: "3 школы, 5 детских садов" },
];

/* ─── Loss aversion data ─── */
const lossItems = [
  { amount: "2,3 млн ₸", label: "/год на отоплении", icon: "🔥", sublabel: "разница vs. тепловое кольцо" },
  { amount: "1,2 млн ₸", label: "/год на здоровье", icon: "🏥", sublabel: "простуды, стресс от холода" },
  { amount: "+2%", label: "вместо +8%", icon: "📉", sublabel: "рост стоимости жилья в год" },
];

/* ─── Social proof data ─── */
const socialProofCities = [
  {
    city: "Copenhagen",
    district: "Nordhavn",
    flag: "🇩🇰",
    invested: "$2B",
    result: "+34% к стоимости за 5 лет",
    color: "var(--moss)",
  },
  {
    city: "Helsinki",
    district: "Kalasatama",
    flag: "🇫🇮",
    invested: "$1.5B",
    result: "−40% расходов на энергию",
    color: "var(--steel)",
  },
  {
    city: "Masdar City",
    district: "Abu Dhabi",
    flag: "🇦🇪",
    invested: "$22B",
    result: "Модель устойчивого города",
    color: "var(--amber)",
  },
];

/* ─── Pricing video with SVG fallback ─── */
function PricingVideo() {
  const [videoFailed, setVideoFailed] = useState(false);

  if (videoFailed) {
    return <ROIChart />;
  }

  return (
    <div style={{
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      background: "#060a14",
    }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={`${basePath}/videos/pricing-explainer-poster.webp`}
        onError={() => setVideoFailed(true)}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
        }}
      >
        <source src={`${basePath}/videos/pricing-explainer.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}

/* ─── ROI SVG Chart with hover tooltips ─── */
function ROIChart() {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const data = [
    { year: 0, val: -100 }, { year: 3, val: -72 }, { year: 6, val: -45 },
    { year: 9, val: -18 }, { year: 12, val: 0 }, { year: 15, val: 28 },
    { year: 20, val: 85 }, { year: 25, val: 160 },
  ];

  const w = 640, h = 300, px = 48, py = 32;
  const cw = w - px * 2, ch = h - py * 2;
  const minV = -120, maxV = 180, range = maxV - minV;

  const pts = data.map(d => ({
    x: px + (d.year / 25) * cw,
    y: py + ch - ((d.val - minV) / range) * ch,
    ...d,
  }));

  const zeroY = py + ch - ((0 - minV) / range) * ch;

  const lineD = pts.reduce((s, p, i) => {
    if (i === 0) return `M${p.x},${p.y}`;
    const prev = pts[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `${s} C${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
  }, "");

  const areaD = `${lineD} L${pts[pts.length - 1].x},${zeroY} L${pts[0].x},${zeroY} Z`;

  const breakevenPt = pts[4];

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${w} ${h}`}
      className={styles.pricingRoiSvg}
      aria-label="ROI timeline"
      onMouseLeave={() => setHoveredIdx(null)}
    >
      {/* grid lines */}
      {[-100, -50, 0, 50, 100, 150].map(v => {
        const y = py + ch - ((v - minV) / range) * ch;
        return (
          <g key={v}>
            <line x1={px} y1={y} x2={w - px} y2={y} stroke="var(--line)" strokeWidth="0.5" />
            <text x={px - 8} y={y + 4} fill="var(--muted)" fontSize="10" textAnchor="end" opacity="0.6">{v}%</text>
          </g>
        );
      })}
      {/* zero line highlighted */}
      <line x1={px} y1={zeroY} x2={w - px} y2={zeroY} stroke="var(--amber)" strokeWidth="1" opacity="0.4" strokeDasharray="6 4" />
      {/* area */}
      <path d={areaD} fill="url(#roiAreaGrad)" opacity={visible ? 0.25 : 0} style={{ transition: "opacity 1s ease 0.5s" }} />
      {/* line */}
      <path
        d={lineD} fill="none" stroke="url(#roiLineGrad)" strokeWidth="3" strokeLinecap="round"
        strokeDasharray="900" strokeDashoffset={visible ? 0 : 900}
        style={{ transition: "stroke-dashoffset 2.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s" }}
      />
      {/* data points with hover targets */}
      {pts.map((p, i) => (
        <g key={i} onMouseEnter={() => setHoveredIdx(i)} style={{ cursor: "pointer" }}>
          {/* Invisible larger hit area */}
          <circle cx={p.x} cy={p.y} r={16} fill="transparent" />
          {/* Visible dot */}
          <circle cx={p.x} cy={p.y} r={visible ? (hoveredIdx === i ? 6 : 4) : 0} fill={p.val >= 0 ? "var(--moss)" : "var(--copper)"} style={{ transition: `r 0.3s ease ${0.3 + i * 0.15}s` }} />
          {/* Hover tooltip */}
          {hoveredIdx === i && visible && (
            <g>
              <rect
                x={p.x - 48} y={p.y - 42}
                width="96" height="28"
                rx="6"
                fill="rgba(8, 17, 26, 0.9)"
                stroke={p.val >= 0 ? "var(--moss)" : "var(--copper)"}
                strokeWidth="1"
              />
              <text
                x={p.x} y={p.y - 24}
                fill="var(--text)" fontSize="11" fontWeight="600"
                textAnchor="middle" fontFamily="var(--font-display), system-ui"
              >
                Год {p.year}: {p.val >= 0 ? "+" : ""}{p.val}%
              </text>
            </g>
          )}
        </g>
      ))}
      {/* breakeven marker */}
      <circle cx={breakevenPt.x} cy={breakevenPt.y} r={visible ? 8 : 0} fill="var(--amber)" opacity="0.9" style={{ transition: "r 0.4s ease 1.6s" }} />
      <text x={breakevenPt.x} y={breakevenPt.y - 16} fill="var(--amber)" fontSize="12" fontWeight="700" textAnchor="middle" opacity={visible ? 1 : 0} style={{ transition: "opacity 0.4s ease 1.8s" }}>
        Год 12: безубыточность
      </text>
      {/* x-axis labels */}
      {pts.map((p, i) => (
        <text key={i} x={p.x} y={h - 8} fill="var(--muted)" fontSize="10" textAnchor="middle">{p.year}</text>
      ))}
      <text x={w / 2} y={h} fill="var(--muted)" fontSize="10" textAnchor="middle" opacity="0.5">лет</text>
      <defs>
        <linearGradient id="roiLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--copper)" />
          <stop offset="48%" stopColor="var(--amber)" />
          <stop offset="100%" stopColor="var(--moss)" />
        </linearGradient>
        <linearGradient id="roiAreaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--copper)" stopOpacity="0.3" />
          <stop offset="48%" stopColor="var(--amber)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--moss)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── useReducedMotion hook ─── */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/* ─── useScrollVisible hook ─── */
function useScrollVisible(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ═══════════════════════════════════════════
   ANIMATED VISUALIZATIONS (Task #11)
   ═══════════════════════════════════════════ */

/* ─── 1. Savings Calculator — Interactive slider ─── */
function SavingsCalculator() {
  const [years, setYears] = useState(12);
  const reducedMotion = useReducedMotion();
  const { ref, visible } = useScrollVisible(0.15);

  // Cumulative savings calculation
  // Annual savings: 2.3M + 1.2M ₸ heating + health + property appreciation delta
  const annualSavingsPerFamily = 3500000; // heating + health in tenge
  const families = 15000;
  const annualPropertyDelta = 0.06; // 8% vs 2% = 6% delta
  const avgPropertyValue = 205000000; // ~205 млн ₸

  const cumulativeSavings = (() => {
    let total = 0;
    for (let y = 1; y <= years; y++) {
      total += annualSavingsPerFamily * families;
      total += avgPropertyValue * annualPropertyDelta * families * (y / 30); // scaled appreciation
    }
    return total;
  })();

  const displaySavings = (cumulativeSavings / 1e12).toFixed(1);
  const barWidth = visible ? Math.min((years / 30) * 100, 100) : 0;

  return (
    <div ref={ref} style={{
      padding: 32,
      borderRadius: "var(--radius-xl)",
      border: "1px solid var(--line)",
      background: "linear-gradient(180deg, rgba(155, 207, 135, 0.04), rgba(8, 17, 26, 0.6))",
      backdropFilter: "blur(12px)",
      marginBottom: 32,
    }}>
      <h3 style={{
        margin: "0 0 8px",
        fontFamily: "var(--font-display), sans-serif",
        fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
        fontWeight: 700,
        letterSpacing: "-0.03em",
        color: "var(--text)",
      }}>
        Калькулятор экономии
      </h3>
      <p style={{ margin: "0 0 24px", color: "var(--muted)", fontSize: "0.9rem" }}>
        Передвигайте слайдер, чтобы увидеть совокупную экономию района
      </p>

      {/* Slider */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 12,
        }}>
          <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>Сколько лет?</span>
          <span style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "var(--amber)",
          }}>
            {years}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          value={years}
          onChange={e => setYears(Number(e.target.value))}
          aria-label="Количество лет"
          style={{
            width: "100%",
            height: 6,
            appearance: "none",
            WebkitAppearance: "none",
            background: `linear-gradient(to right, var(--amber) 0%, var(--amber) ${(years / 30) * 100}%, rgba(255,255,255,0.1) ${(years / 30) * 100}%, rgba(255,255,255,0.1) 100%)`,
            borderRadius: 3,
            outline: "none",
            cursor: "pointer",
          }}
        />
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 4,
        }}>
          <span style={{ color: "var(--muted)", fontSize: "0.75rem", opacity: 0.6 }}>1</span>
          <span style={{ color: "var(--muted)", fontSize: "0.75rem", opacity: 0.6 }}>30</span>
        </div>
      </div>

      {/* Result display */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 16,
      }}>
        <div style={{
          padding: "20px",
          borderRadius: "var(--radius-lg)",
          background: "rgba(155, 207, 135, 0.08)",
          border: "1px solid rgba(155, 207, 135, 0.15)",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
            fontWeight: 700,
            color: "var(--moss)",
            letterSpacing: "-0.03em",
            transition: reducedMotion ? "none" : "all 0.3s ease",
          }}>
            {displaySavings} трлн ₸
          </div>
          <div style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: 4 }}>
            совокупная экономия
          </div>
        </div>

        <div style={{
          padding: "20px",
          borderRadius: "var(--radius-lg)",
          background: "rgba(240, 194, 127, 0.06)",
          border: "1px solid rgba(240, 194, 127, 0.12)",
          textAlign: "center",
        }}>
          <div style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
            fontWeight: 700,
            color: "var(--amber)",
            letterSpacing: "-0.03em",
            transition: reducedMotion ? "none" : "all 0.3s ease",
          }}>
            {(cumulativeSavings / families / 1e6).toFixed(1)} млн ₸
          </div>
          <div style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: 4 }}>
            экономия на семью
          </div>
        </div>
      </div>

      {/* Visual progress bar */}
      <div style={{ marginTop: 20 }}>
        <div style={{
          height: 8,
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.06)",
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            borderRadius: 4,
            width: `${barWidth}%`,
            background: "linear-gradient(90deg, var(--moss), var(--amber))",
            transition: reducedMotion ? "width 0.1s ease" : "width 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }} />
        </div>
        {years >= 12 && (
          <div style={{
            marginTop: 8,
            textAlign: "center",
            color: "var(--moss)",
            fontSize: "0.85rem",
            fontWeight: 600,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}>
            {years >= 12 ? "Инвестиция уже окупилась!" : ""}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── 2. Cost Comparison Timeline — Dual-line SVG chart ─── */
function CostComparisonChart() {
  const { ref, visible } = useScrollVisible(0.2);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const w = 640, h = 320, px = 56, py = 32;
  const cw = w - px * 2, ch = h - py * 2;
  const maxYear = 25;
  const maxCost = 200; // thousands per household cumulative

  // Conventional: starts at 0, rises ~5M ₸/yr accelerating (maintenance + energy inflation)
  // Thermal Ring: starts at 0, rises ~2.9M ₸/yr initially, stabilizes after year 8
  const conventionalData = Array.from({ length: maxYear + 1 }, (_, y) => ({
    year: y,
    cost: y * 6 + y * y * 0.12, // accelerating (units = M ₸)
  }));

  const thermalData = Array.from({ length: maxYear + 1 }, (_, y) => ({
    year: y,
    cost: y <= 8 ? y * 3.5 : 28 + (y - 8) * 1.8, // stabilizing after year 8 (units = M ₸)
  }));

  const toX = (year: number) => px + (year / maxYear) * cw;
  const toY = (cost: number) => py + ch - (cost / maxCost) * ch;

  const conventionalPath = conventionalData
    .map((d, i) => `${i === 0 ? "M" : "L"}${toX(d.year)},${toY(d.cost)}`)
    .join(" ");

  const thermalPath = thermalData
    .map((d, i) => `${i === 0 ? "M" : "L"}${toX(d.year)},${toY(d.cost)}`)
    .join(" ");

  // Crossover year (where conventional cumulative > thermal cumulative)
  // This happens around year 12
  const crossoverYear = 12;
  const crossoverX = toX(crossoverYear);
  const crossoverY = toY(conventionalData[crossoverYear].cost);

  return (
    <div ref={ref} style={{
      padding: 32,
      borderRadius: "var(--radius-xl)",
      border: "1px solid var(--line)",
      background: "linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(8, 17, 26, 0.6))",
      backdropFilter: "blur(12px)",
      marginBottom: 32,
    }}>
      <h3 style={{
        margin: "0 0 8px",
        fontFamily: "var(--font-display), sans-serif",
        fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
        fontWeight: 700,
        letterSpacing: "-0.03em",
        color: "var(--text)",
      }}>
        Сравнение расходов во времени
      </h3>
      <div style={{
        display: "flex",
        gap: 20,
        marginBottom: 16,
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "var(--muted)" }}>
          <span style={{ width: 12, height: 3, borderRadius: 2, background: "#7a8694", display: "inline-block" }} />
          Обычный район
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "var(--amber)" }}>
          <span style={{ width: 12, height: 3, borderRadius: 2, background: "var(--amber)", display: "inline-block" }} />
          Тепловое Кольцо
        </span>
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        aria-label="Сравнение совокупных расходов обычного района и Теплового Кольца"
        onMouseLeave={() => setHoveredYear(null)}
      >
        {/* Grid lines */}
        {[0, 50, 100, 150, 200].map(v => {
          const y = toY(v);
          return (
            <g key={v}>
              <line x1={px} y1={y} x2={w - px} y2={y} stroke="var(--line)" strokeWidth="0.5" />
              <text x={px - 8} y={y + 4} fill="var(--muted)" fontSize="9" textAnchor="end" opacity="0.6">{v}М₸</text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {[0, 5, 10, 15, 20, 25].map(y => (
          <text key={y} x={toX(y)} y={h - 6} fill="var(--muted)" fontSize="9" textAnchor="middle">{y}</text>
        ))}
        <text x={w / 2} y={h} fill="var(--muted)" fontSize="9" textAnchor="middle" opacity="0.5">лет</text>

        {/* Shaded area between curves showing savings */}
        <path
          d={`${thermalPath} ${conventionalData
            .slice()
            .reverse()
            .map((d, i) => `L${toX(d.year)},${toY(d.cost)}`)
            .join(" ")} Z`}
          fill="var(--moss)"
          opacity={visible ? 0.08 : 0}
          style={{ transition: "opacity 1s ease 0.5s" }}
        />

        {/* Conventional line — grey, rising */}
        <path
          d={conventionalPath}
          fill="none"
          stroke="#7a8694"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset={visible ? 0 : 1000}
          style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s" }}
        />

        {/* Thermal Ring line — amber, stabilizing */}
        <path
          d={thermalPath}
          fill="none"
          stroke="var(--amber)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="1000"
          strokeDashoffset={visible ? 0 : 1000}
          style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.22, 1, 0.36, 1) 0.6s" }}
        />

        {/* Crossover point with pulse */}
        <circle
          cx={crossoverX}
          cy={crossoverY}
          r={visible ? 6 : 0}
          fill="var(--moss)"
          opacity="0.9"
          style={{ transition: "r 0.5s ease 1.8s" }}
        />
        <circle
          cx={crossoverX}
          cy={crossoverY}
          r={visible ? 14 : 0}
          fill="none"
          stroke="var(--moss)"
          strokeWidth="1.5"
          opacity={visible ? 0.3 : 0}
          style={{ transition: "r 0.6s ease 2s, opacity 0.6s ease 2s" }}
        />
        <text
          x={crossoverX}
          y={crossoverY - 20}
          fill="var(--moss)"
          fontSize="11"
          fontWeight="700"
          textAnchor="middle"
          opacity={visible ? 1 : 0}
          style={{ transition: "opacity 0.4s ease 2.2s" }}
        >
          Пересечение: год {crossoverYear}
        </text>

        {/* Hover targets */}
        {Array.from({ length: maxYear + 1 }, (_, y) => (
          <rect
            key={y}
            x={toX(y) - cw / maxYear / 2}
            y={py}
            width={cw / maxYear}
            height={ch}
            fill="transparent"
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoveredYear(y)}
          />
        ))}

        {/* Hover tooltip */}
        {hoveredYear !== null && visible && (
          <g>
            <line
              x1={toX(hoveredYear)} y1={py}
              x2={toX(hoveredYear)} y2={py + ch}
              stroke="var(--line)" strokeWidth="1" strokeDasharray="4 3"
            />
            <rect
              x={toX(hoveredYear) - 64}
              y={py - 2}
              width="128" height="42"
              rx="6"
              fill="rgba(8, 17, 26, 0.92)"
              stroke="var(--line)"
              strokeWidth="1"
            />
            <text x={toX(hoveredYear)} y={py + 14} fill="#7a8694" fontSize="10" textAnchor="middle" fontFamily="var(--font-display), system-ui">
              Обычный: {Math.round(conventionalData[hoveredYear].cost)} млн ₸
            </text>
            <text x={toX(hoveredYear)} y={py + 30} fill="var(--amber)" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="var(--font-display), system-ui">
              Кольцо: {Math.round(thermalData[hoveredYear].cost)} млн ₸
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

/* ─── 3. Donut Chart — Animated CAPEX breakdown ─── */
function DonutChart() {
  const { ref, visible } = useScrollVisible(0.2);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 110;
  const innerR = 70;
  const gap = 0.02; // gap between segments in radians

  const colors = ["var(--amber)", "var(--copper)", "var(--steel)", "var(--moss)", "var(--sand)"];

  // Build arc paths
  let currentAngle = -Math.PI / 2;
  const segments = capexItems.map((item, i) => {
    const angle = (item.percent / 100) * Math.PI * 2 - gap;
    const startAngle = currentAngle + gap / 2;
    const endAngle = startAngle + angle;
    currentAngle = endAngle + gap / 2;

    const x1o = cx + outerR * Math.cos(startAngle);
    const y1o = cy + outerR * Math.sin(startAngle);
    const x2o = cx + outerR * Math.cos(endAngle);
    const y2o = cy + outerR * Math.sin(endAngle);
    const x1i = cx + innerR * Math.cos(endAngle);
    const y1i = cy + innerR * Math.sin(endAngle);
    const x2i = cx + innerR * Math.cos(startAngle);
    const y2i = cy + innerR * Math.sin(startAngle);

    const largeArc = angle > Math.PI ? 1 : 0;

    const d = [
      `M${x1o},${y1o}`,
      `A${outerR},${outerR} 0 ${largeArc} 1 ${x2o},${y2o}`,
      `L${x1i},${y1i}`,
      `A${innerR},${innerR} 0 ${largeArc} 0 ${x2i},${y2i}`,
      "Z",
    ].join(" ");

    // Label position
    const midAngle = (startAngle + endAngle) / 2;
    const labelR = (outerR + innerR) / 2;
    const lx = cx + labelR * Math.cos(midAngle);
    const ly = cy + labelR * Math.sin(midAngle);

    return { d, color: colors[i], label: item.label, percent: item.percent, amount: item.amount, lx, ly, midAngle };
  });

  return (
    <div ref={ref} style={{
      padding: 32,
      borderRadius: "var(--radius-xl)",
      border: "1px solid var(--line)",
      background: "linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(8, 17, 26, 0.6))",
      backdropFilter: "blur(12px)",
      marginBottom: 32,
    }}>
      <h3 style={{
        margin: "0 0 20px",
        fontFamily: "var(--font-display), sans-serif",
        fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
        fontWeight: 700,
        letterSpacing: "-0.03em",
        color: "var(--text)",
      }}>
        Распределение инвестиций
      </h3>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
      }}>
        {/* SVG Donut */}
        <svg
          viewBox={`0 0 ${size} ${size}`}
          style={{ width: "min(280px, 60vw)", height: "auto" }}
          aria-label="Структура инвестиций — диаграмма"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {segments.map((seg, i) => (
            <path
              key={i}
              d={seg.d}
              fill={seg.color}
              opacity={hoveredIdx === null || hoveredIdx === i ? 0.85 : 0.3}
              style={{
                transform: visible ? "scale(1)" : "scale(0)",
                transformOrigin: `${cx}px ${cy}px`,
                transition: `transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + i * 0.15}s, opacity 0.3s ease`,
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredIdx(i)}
            />
          ))}
          {/* Center text */}
          <text
            x={cx} y={cy - 6}
            textAnchor="middle"
            fill="var(--amber)"
            fontSize="20"
            fontWeight="700"
            fontFamily="var(--font-display), system-ui"
            opacity={visible ? 1 : 0}
            style={{ transition: "opacity 0.5s ease 1s" }}
          >
            {hoveredIdx !== null ? segments[hoveredIdx].amount : "1,97 трлн ₸"}
          </text>
          <text
            x={cx} y={cy + 14}
            textAnchor="middle"
            fill="var(--muted)"
            fontSize="10"
            opacity={visible ? 0.7 : 0}
            style={{ transition: "opacity 0.5s ease 1.1s" }}
          >
            {hoveredIdx !== null ? segments[hoveredIdx].label : "Общий CAPEX"}
          </text>
        </svg>

        {/* Legend */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          minWidth: 180,
        }}>
          {segments.map((seg, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 12px",
                borderRadius: "var(--radius-sm)",
                background: hoveredIdx === i ? "rgba(255, 255, 255, 0.05)" : "transparent",
                transition: "background 0.2s ease",
                cursor: "pointer",
              }}
            >
              <span style={{
                width: 10,
                height: 10,
                borderRadius: 3,
                background: seg.color,
                flexShrink: 0,
              }} />
              <span style={{ fontSize: "0.88rem", color: "var(--text)", flex: 1 }}>{seg.label}</span>
              <span style={{
                fontSize: "0.82rem",
                color: "var(--muted)",
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 600,
              }}>{seg.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── 4. Property Value Bars — Animated divergence over 10 years ─── */
function PropertyValueBars() {
  const { ref, visible } = useScrollVisible(0.2);

  const years = [1, 2, 3, 5, 7, 10];
  const conventionalRate = 1.02;
  const thermalRate = 1.08;
  const baseValue = 205; // 205 млн ₸

  const data = years.map(y => ({
    year: y,
    conventional: Math.round(baseValue * Math.pow(conventionalRate, y)),
    thermal: Math.round(baseValue * Math.pow(thermalRate, y)),
  }));

  const maxVal = data[data.length - 1].thermal;

  return (
    <div ref={ref} style={{
      padding: 32,
      borderRadius: "var(--radius-xl)",
      border: "1px solid var(--line)",
      background: "linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(8, 17, 26, 0.6))",
      backdropFilter: "blur(12px)",
      marginBottom: 32,
    }}>
      <h3 style={{
        margin: "0 0 8px",
        fontFamily: "var(--font-display), sans-serif",
        fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
        fontWeight: 700,
        letterSpacing: "-0.03em",
        color: "var(--text)",
      }}>
        Рост стоимости недвижимости
      </h3>
      <p style={{ margin: "0 0 24px", color: "var(--muted)", fontSize: "0.9rem" }}>
        Квартира 205 млн ₸ — обычный район (+2%/год) vs Тепловое Кольцо (+8%/год)
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {data.map((d, i) => {
          const convWidth = (d.conventional / maxVal) * 100;
          const thermWidth = (d.thermal / maxVal) * 100;
          const delta = d.thermal - d.conventional;

          return (
            <div key={d.year}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 6,
              }}>
                <span style={{
                  fontSize: "0.85rem",
                  color: "var(--text)",
                  fontWeight: 600,
                }}>
                  Год {d.year}
                </span>
                <span style={{
                  fontSize: "0.78rem",
                  color: "var(--moss)",
                  fontWeight: 700,
                }}>
                  +{delta.toLocaleString("ru-RU").replace(/\u00a0/g, " ")} млн ₸
                </span>
              </div>

              {/* Conventional bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ width: 60, fontSize: "0.72rem", color: "#7a8694", textAlign: "right", flexShrink: 0 }}>
                  Обычный
                </span>
                <div style={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  background: "rgba(255, 255, 255, 0.06)",
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    borderRadius: 4,
                    width: visible ? `${convWidth}%` : "0%",
                    background: "#7a8694",
                    transition: `width 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + i * 0.15}s`,
                  }} />
                </div>
                <span style={{
                  width: 52,
                  fontSize: "0.78rem",
                  color: "#7a8694",
                  fontFamily: "var(--font-display), sans-serif",
                  fontWeight: 600,
                  flexShrink: 0,
                }}>
                  {d.conventional} М₸
                </span>
              </div>

              {/* Thermal bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 60, fontSize: "0.72rem", color: "var(--amber)", textAlign: "right", flexShrink: 0 }}>
                  Кольцо
                </span>
                <div style={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  background: "rgba(255, 255, 255, 0.06)",
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    borderRadius: 4,
                    width: visible ? `${thermWidth}%` : "0%",
                    background: "linear-gradient(90deg, var(--amber), var(--moss))",
                    transition: `width 1.4s cubic-bezier(0.22, 1, 0.36, 1) ${0.3 + i * 0.15}s`,
                  }} />
                </div>
                <span style={{
                  width: 52,
                  fontSize: "0.78rem",
                  color: "var(--amber)",
                  fontFamily: "var(--font-display), sans-serif",
                  fontWeight: 600,
                  flexShrink: 0,
                }}>
                  {d.thermal} М₸
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Final dramatic callout */}
      <div style={{
        marginTop: 24,
        padding: "16px 20px",
        borderRadius: "var(--radius-lg)",
        background: "rgba(155, 207, 135, 0.08)",
        border: "1px solid rgba(155, 207, 135, 0.15)",
        textAlign: "center",
      }}>
        <span style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: "1.2rem",
          fontWeight: 700,
          color: "var(--moss)",
        }}>
          +{(data[data.length - 1].thermal - data[data.length - 1].conventional).toLocaleString("ru-RU").replace(/\u00a0/g, " ")} млн ₸
        </span>
        <span style={{ color: "var(--muted)", fontSize: "0.88rem", marginLeft: 8 }}>
          разница за 10 лет на каждую квартиру
        </span>
      </div>
    </div>
  );
}

/* ─── Expandable section for progressive disclosure ─── */
function ExpandableSection({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{
      border: "1px solid var(--line)",
      borderRadius: "var(--radius-lg)",
      background: "rgba(255, 255, 255, 0.02)",
      overflow: "hidden",
      marginBottom: 16,
    }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "18px 24px",
          background: "none",
          border: "none",
          color: "var(--text)",
          cursor: "pointer",
          fontFamily: "var(--font-display), sans-serif",
          fontSize: "1rem",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          textAlign: "left",
        }}
      >
        {title}
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.06)",
          color: "var(--amber)",
          fontSize: "0.85rem",
          transform: open ? "rotate(180deg)" : "rotate(0)",
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          flexShrink: 0,
        }}>
          ▼
        </span>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: open ? 1200 : 0,
          overflow: "hidden",
          transition: "max-height 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div style={{ padding: "0 24px 24px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PRICING SECTION — Psychology-optimized
   ═══════════════════════════════════════════ */
export function PitchPricing() {
  return (
    <section className={styles.section} aria-label="Экономика района">
      <Reveal>
        <span className={styles.sectionKicker}>Экономика</span>
        <h2 className={styles.sectionTitle}>Инвестиция в&nbsp;будущее</h2>
      </Reveal>

      {/* ══════════════════════════════════════
         1. ANCHORING — Lead with big number, then reframe
         ══════════════════════════════════════ */}
      <Reveal>
        <div style={{
          textAlign: "center",
          padding: "48px 24px 40px",
          marginBottom: 32,
          border: "1px solid var(--line)",
          borderRadius: "var(--radius-xl)",
          background: "linear-gradient(180deg, rgba(240, 194, 127, 0.06), rgba(8, 17, 26, 0.7))",
          backdropFilter: "blur(12px)",
        }}>
          {/* Big anchor number */}
          <div style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2.8rem, 7vw, 5rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            background: "linear-gradient(135deg, var(--amber), var(--copper))",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 16,
          }}>
            <Counter target={1.97} suffix=" трлн ₸" prefix="" />
          </div>

          {/* Reframe arrow */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 20,
          }}>
            <div style={{ width: 40, height: 1, background: "var(--line)" }} />
            <span style={{ color: "var(--muted)", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              это всего
            </span>
            <div style={{ width: 40, height: 1, background: "var(--line)" }} />
          </div>

          {/* Reframed numbers */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
            maxWidth: 800,
            margin: "0 auto",
          }}>
            <div style={{
              padding: "20px 16px",
              borderRadius: "var(--radius-lg)",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(240, 194, 127, 0.15)",
            }}>
              <div style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                fontWeight: 700,
                color: "var(--text)",
                letterSpacing: "-0.03em",
              }}>
                <Counter target={32.8} suffix=" млн ₸" prefix="" />
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: 4 }}>
                на жителя
              </div>
            </div>

            <div style={{
              padding: "20px 16px",
              borderRadius: "var(--radius-lg)",
              background: "rgba(155, 207, 135, 0.06)",
              border: "1px solid rgba(155, 207, 135, 0.15)",
            }}>
              <div style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                fontWeight: 700,
                color: "var(--moss)",
                letterSpacing: "-0.03em",
              }}>
                дешевле авто
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: 4 }}>
                за 70 лет комфорта
              </div>
            </div>

            <div style={{
              padding: "20px 16px",
              borderRadius: "var(--radius-lg)",
              background: "rgba(240, 194, 127, 0.06)",
              border: "1px solid rgba(240, 194, 127, 0.1)",
            }}>
              <div style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                fontWeight: 700,
                color: "var(--amber)",
                letterSpacing: "-0.03em",
              }}>
                <Counter target={12} suffix=" лет" prefix="" />
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.9rem", marginTop: 4 }}>
                до безубыточности
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ══════════════════════════════════════
         2. LOSS AVERSION — "Цена бездействия" BEFORE ROI
         ══════════════════════════════════════ */}
      <Reveal>
        <div style={{
          padding: "32px",
          marginBottom: 32,
          border: "1px solid rgba(239, 148, 97, 0.25)",
          borderRadius: "var(--radius-xl)",
          background: "linear-gradient(135deg, rgba(239, 148, 97, 0.08), rgba(8, 17, 26, 0.8))",
          backdropFilter: "blur(12px)",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
          }}>
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(239, 148, 97, 0.15)",
              fontSize: "1rem",
            }}>
              ⚠
            </span>
            <h3 style={{
              margin: 0,
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--copper)",
            }}>
              Цена бездействия
            </h3>
          </div>
          <p style={{
            color: "var(--muted)",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            margin: "0 0 24px",
          }}>
            Без Теплового Кольца каждая семья теряет:
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}>
            {lossItems.map((item, i) => (
              <Reveal key={i} delay={i * 120}>
                <div style={{
                  padding: "20px",
                  borderRadius: "var(--radius-lg)",
                  background: "rgba(239, 148, 97, 0.04)",
                  border: "1px solid rgba(239, 148, 97, 0.12)",
                  transition: "border-color 0.3s ease, transform 0.3s ease",
                }}>
                  <div style={{ fontSize: "1.3rem", marginBottom: 8 }}>{item.icon}</div>
                  <div style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "var(--copper)",
                    letterSpacing: "-0.02em",
                    marginBottom: 4,
                  }}>
                    {item.amount}<span style={{ fontSize: "0.7em", fontWeight: 400, color: "var(--muted)" }}>{item.label}</span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--muted)", opacity: 0.7 }}>{item.sublabel}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ══════════════════════════════════════
         6. URGENCY — "Стоимость ожидания" counter
         ══════════════════════════════════════ */}
      <Reveal>
        <div style={{
          textAlign: "center",
          padding: "28px 24px",
          marginBottom: 32,
          borderRadius: "var(--radius-xl)",
          border: "1px solid rgba(239, 148, 97, 0.2)",
          background: "linear-gradient(135deg, rgba(239, 148, 97, 0.05), rgba(8, 17, 26, 0.6))",
        }}>
          <div style={{
            color: "var(--muted)",
            fontSize: "0.85rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 12,
          }}>
            Каждый год задержки =
          </div>
          <div style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 700,
            color: "var(--copper)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginBottom: 8,
          }}>
            22 млрд ₸
          </div>
          <div style={{
            color: "var(--muted)",
            fontSize: "0.9rem",
            marginBottom: 16,
          }}>
            потерянной экономии для жителей
          </div>
          <div style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: 6,
            padding: "12px 24px",
            borderRadius: "var(--radius-lg)",
            background: "rgba(239, 148, 97, 0.08)",
            border: "1px solid rgba(239, 148, 97, 0.15)",
          }}>
            <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
              Пока вы на этой странице, упущено:
            </span>
            <span style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "1.2rem",
              fontWeight: 700,
              color: "var(--copper)",
            }}>
              <RunningCounter perSecond={702} /> ₸
            </span>
          </div>
        </div>
      </Reveal>

      {/* ── Visual comparison graphic ── */}
      <Reveal>
        <div className={styles.pricingVisualCompare}>
          <PricingComparisonGraphic />
        </div>
      </Reveal>

      {/* ═══════════════════════════════════════
         4. VISUAL HIERARCHY — +160% ROI as hero element
         ═══════════════════════════════════════ */}
      <Reveal>
        <div style={{
          textAlign: "center",
          padding: "56px 24px",
          marginBottom: 32,
          borderRadius: "var(--radius-xl)",
          border: "1px solid rgba(240, 194, 127, 0.3)",
          background: "radial-gradient(ellipse at center, rgba(240, 194, 127, 0.1), rgba(8, 17, 26, 0.8))",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Ambient glow behind the number */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 50% 50%, rgba(240, 194, 127, 0.12) 0%, transparent 60%)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative" }}>
            <div style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(4rem, 12vw, 8rem)",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              background: "linear-gradient(135deg, var(--amber), var(--copper))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 40px rgba(240, 194, 127, 0.3))",
              marginBottom: 12,
            }}>
              +<Counter target={160} suffix="%" prefix="" />
            </div>
            <div style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
              fontWeight: 600,
              color: "var(--text)",
              letterSpacing: "-0.02em",
              marginBottom: 6,
            }}>
              возврат инвестиций к 25 году
            </div>
            <div style={{
              color: "var(--muted)",
              fontSize: "0.9rem",
            }}>
              за счёт экономии на энергии, здоровье и росте стоимости недвижимости
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── Pricing explainer video ── */}
      <Reveal delay={50}>
        <div style={{ marginBottom: 32 }}>
          <PricingVideo />
        </div>
      </Reveal>

      {/* ── ROI timeline (interactive SVG chart) ── */}
      <Reveal delay={100}>
        <div className={styles.pricingRoi}>
          <h3 className={styles.pricingCapexTitle}>Возврат инвестиций</h3>
          <p className={styles.pricingRoiSub}>
            Безубыточность на <strong>12-м году</strong>. К 25 году — <strong>+160%</strong> возврата.
          </p>
          <ROIChart />
        </div>
      </Reveal>

      {/* ══════════════════════════════════════
         3. SOCIAL PROOF — Cities that already invested
         ══════════════════════════════════════ */}
      <Reveal>
        <div style={{
          marginBottom: 32,
        }}>
          <h3 style={{
            margin: "0 0 20px",
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--text)",
          }}>
            Города, которые уже инвестировали
          </h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}>
            {socialProofCities.map((c, i) => (
              <Reveal key={i} delay={i * 120}>
                <div style={{
                  padding: "24px",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--line)",
                  background: "linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(8, 17, 26, 0.6))",
                  transition: "border-color 0.3s ease, transform 0.3s ease",
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 14,
                  }}>
                    <span style={{ fontSize: "1.6rem" }}>{c.flag}</span>
                    <div>
                      <div style={{
                        fontFamily: "var(--font-display), sans-serif",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "var(--text)",
                        letterSpacing: "-0.02em",
                      }}>
                        {c.city}
                      </div>
                      <div style={{
                        fontSize: "0.8rem",
                        color: "var(--muted)",
                      }}>
                        {c.district}
                      </div>
                    </div>
                  </div>
                  <div style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: c.color,
                    letterSpacing: "-0.02em",
                    marginBottom: 6,
                  }}>
                    {c.invested}
                  </div>
                  <div style={{
                    fontSize: "0.88rem",
                    color: "var(--moss)",
                    fontWeight: 500,
                  }}>
                    {c.result}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── Comparison table (card-style rows) ── */}
      <Reveal>
        <div className={styles.pricingCompare}>
          <div className={styles.pricingCompareHead}>
            <div className={styles.pricingCompareHeadCell} />
            <div className={styles.pricingCompareHeadCell}>
              <span className={styles.pricingDot} style={{ background: "var(--muted)" }} />
              Обычный район
            </div>
            <div className={`${styles.pricingCompareHeadCell} ${styles.pricingAccent}`}>
              <span className={styles.pricingDot} style={{ background: "var(--amber)" }} />
              Тепловое Кольцо
            </div>
          </div>
          {comparisons.map((c, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className={styles.pricingCompareRow}>
                <div className={styles.pricingCompareMetric}>
                  <span className={styles.pricingCompareIcon}>{c.icon}</span>
                  {c.label}
                </div>
                <div className={styles.pricingCompareVal} style={{ color: "#7a8694" }}>
                  {c.traditional}
                </div>
                <div className={`${styles.pricingCompareVal} ${styles.pricingAccent}`}>
                  {c.thermal}
                  <span className={styles.pricingSavings}>{c.savings}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* ══════════════════════════════════════
         ANIMATED DATA VISUALIZATIONS
         ══════════════════════════════════════ */}

      {/* Interactive savings calculator */}
      <Reveal>
        <SavingsCalculator />
      </Reveal>

      {/* Cost comparison dual-line chart */}
      <Reveal>
        <CostComparisonChart />
      </Reveal>

      {/* Animated CAPEX donut chart */}
      <Reveal>
        <DonutChart />
      </Reveal>

      {/* Property value divergence bars */}
      <Reveal>
        <PropertyValueBars />
      </Reveal>

      {/* ══════════════════════════════════════
         5. PROGRESSIVE DISCLOSURE — Expandable details
         ══════════════════════════════════════ */}

      {/* CAPEX breakdown — expandable */}
      <Reveal delay={100}>
        <ExpandableSection title="Подробнее: Структура CAPEX (1,97 трлн ₸)">
          <div style={{ marginBottom: 20 }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 16,
              marginBottom: 24,
            }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--amber)",
              }}>
                <Counter target={1.97} suffix=" трлн ₸" prefix="~" />
                <span style={{
                  fontSize: "0.78rem",
                  fontWeight: 400,
                  color: "var(--muted)",
                  marginTop: 2,
                }}>на 60 000 жителей</span>
              </div>
            </div>
            {capexItems.map((item, i) => (
              <AnimatedBar
                key={i}
                percent={item.percent}
                color={item.color}
                label={item.label}
                amount={item.amount}
                delay={i * 140}
              />
            ))}
          </div>
        </ExpandableSection>
      </Reveal>

      {/* What's included — expandable */}
      <Reveal delay={100}>
        <ExpandableSection title="Подробнее: Что входит в инвестицию">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
          }}>
            {includedItems.map((item, i) => (
              <div key={i} className={styles.pricingIncludedItem}>
                <span className={styles.pricingIncludedIcon}>{item.icon}</span>
                <span className={styles.pricingIncludedTitle}>{item.title}</span>
                <span className={styles.pricingIncludedDesc}>{item.desc}</span>
              </div>
            ))}
          </div>
        </ExpandableSection>
      </Reveal>

      {/* ── Per-unit callouts (kept but enhanced) ── */}
      <div className={styles.pricingCallouts}>
        <Reveal delay={0} className={styles.pricingCallout}>
          <span className={styles.pricingCalloutVal}>
            <Counter target={32.8} suffix=" млн ₸" prefix="" />
          </span>
          <span className={styles.pricingCalloutLabel}>на жителя</span>
          <span className={styles.pricingCalloutNote}>дополнительно vs обычный район</span>
        </Reveal>
        <Reveal delay={150} className={styles.pricingCallout}>
          <span className={styles.pricingCalloutVal}>
            <Counter target={99} suffix=" тыс ₸/м²" prefix="+" />
          </span>
          <span className={styles.pricingCalloutLabel}>доплата за площадь</span>
          <span className={styles.pricingCalloutNote}>климатическая инфраструктура</span>
        </Reveal>
        <Reveal delay={300} className={styles.pricingCallout}>
          <span className={styles.pricingCalloutVal}>
            <Counter target={55} suffix="%" prefix="" />
          </span>
          <span className={styles.pricingCalloutLabel}>экономия на отоплении</span>
          <span className={styles.pricingCalloutNote}>ежегодно, с первого года</span>
        </Reveal>
      </div>
    </section>
  );
}
