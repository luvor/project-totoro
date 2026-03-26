"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./pitch.module.css";

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

/* ─── Data ─── */
const comparisons = [
  { label: "Затраты на отопление", traditional: "100%", thermal: "45%", savings: "\u221255%", icon: "\u2744" },
  { label: "Срок инфраструктуры", traditional: "30 лет", thermal: "70 лет", savings: "+40 лет", icon: "\u23F3" },
  { label: "Расходы на здравоохранение", traditional: "100%", thermal: "62%", savings: "\u221238%", icon: "\u2764" },
  { label: "Рост стоимости недвижимости", traditional: "+2%/год", thermal: "+8%/год", savings: "4x", icon: "\u2191" },
];

const capexItems = [
  { label: "Жилая застройка", percent: 45, amount: "$1.08B", color: "linear-gradient(90deg, var(--amber), var(--copper))" },
  { label: "Тепловая инфраструктура", percent: 20, amount: "$480M", color: "linear-gradient(90deg, var(--copper), #e07040)" },
  { label: "Транспорт (трамвай)", percent: 15, amount: "$360M", color: "linear-gradient(90deg, var(--steel), #6a9ab5)" },
  { label: "Зелёная инфраструктура", percent: 10, amount: "$240M", color: "linear-gradient(90deg, var(--moss), #7ab86a)" },
  { label: "Общественные пространства", percent: 10, amount: "$240M", color: "linear-gradient(90deg, var(--sand), #d4c9b8)" },
];

/* ─── ROI SVG Chart ─── */
function ROIChart() {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

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
    <svg ref={ref} viewBox={`0 0 ${w} ${h}`} className={styles.pricingRoiSvg} aria-label="ROI timeline">
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
      {/* data points */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={visible ? 4 : 0} fill={p.val >= 0 ? "var(--moss)" : "var(--copper)"} style={{ transition: `r 0.3s ease ${0.3 + i * 0.15}s` }} />
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

/* ═══════════════════════════════════════════
   PRICING SECTION
   ═══════════════════════════════════════════ */
export function PitchPricing() {
  return (
    <section className={styles.section} aria-label="Экономика района">
      <Reveal>
        <span className={styles.sectionKicker}>Экономика</span>
        <h2 className={styles.sectionTitle}>Инвестиция в&nbsp;будущее</h2>
      </Reveal>

      {/* ── Comparison table ── */}
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
                <div className={styles.pricingCompareVal}>{c.traditional}</div>
                <div className={`${styles.pricingCompareVal} ${styles.pricingAccent}`}>
                  {c.thermal}
                  <span className={styles.pricingSavings}>{c.savings}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* ── CAPEX breakdown ── */}
      <Reveal delay={100}>
        <div className={styles.pricingCapex}>
          <div className={styles.pricingCapexHead}>
            <h3 className={styles.pricingCapexTitle}>Структура CAPEX</h3>
            <div className={styles.pricingCapexTotal}>
              <Counter target={2.4} suffix=" млрд $" prefix="~" />
              <span className={styles.pricingCapexSub}>на 60 000 жителей</span>
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
      </Reveal>

      {/* ── ROI timeline ── */}
      <Reveal delay={200}>
        <div className={styles.pricingRoi}>
          <h3 className={styles.pricingCapexTitle}>Возврат инвестиций</h3>
          <p className={styles.pricingRoiSub}>
            Безубыточность на <strong>12-м году</strong>. К 25 году — <strong>+160%</strong> возврата за счёт экономии на энергии, здоровье и росте стоимости недвижимости.
          </p>
          <ROIChart />
        </div>
      </Reveal>

      {/* ── Per-unit callouts ── */}
      <div className={styles.pricingCallouts}>
        <Reveal delay={0} className={styles.pricingCallout}>
          <span className={styles.pricingCalloutVal}>
            <Counter target={40000} suffix="" prefix="$" />
          </span>
          <span className={styles.pricingCalloutLabel}>на жителя</span>
          <span className={styles.pricingCalloutNote}>дополнительно vs обычный район</span>
        </Reveal>
        <Reveal delay={150} className={styles.pricingCallout}>
          <span className={styles.pricingCalloutVal}>
            <Counter target={120} suffix="/м²" prefix="+$" />
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
