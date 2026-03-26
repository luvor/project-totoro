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

/* ─── Problem Section ─── */
const problems = [
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M8 56 L32 8 L56 56 Z" stroke="var(--copper)" strokeWidth="2" fill="none" />
        <line x1="20" y1="40" x2="44" y2="40" stroke="var(--copper)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M26 48 Q32 36 38 48" stroke="var(--copper)" strokeWidth="1.5" fill="none" />
        <circle cx="32" cy="24" r="3" fill="var(--copper)" opacity="0.6" />
      </svg>
    ),
    title: "Ветер ломает город",
    text: "Пустыри и длинные фасады усиливают холод и толкают к машине"
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="6" stroke="var(--copper)" strokeWidth="1.5" fill="none" />
        <circle cx="48" cy="48" r="6" stroke="var(--copper)" strokeWidth="1.5" fill="none" />
        <circle cx="48" cy="16" r="4" stroke="var(--copper)" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="48" r="4" stroke="var(--copper)" strokeWidth="1.5" fill="none" />
        <line x1="22" y1="16" x2="44" y2="16" stroke="var(--copper)" strokeWidth="1" opacity="0.4" strokeDasharray="3 3" />
        <line x1="16" y1="22" x2="16" y2="44" stroke="var(--copper)" strokeWidth="1" opacity="0.4" strokeDasharray="3 3" />
        <line x1="48" y1="22" x2="48" y2="44" stroke="var(--copper)" strokeWidth="1" opacity="0.4" strokeDasharray="3 3" />
        <line x1="22" y1="48" x2="44" y2="48" stroke="var(--copper)" strokeWidth="1" opacity="0.4" strokeDasharray="3 3" />
      </svg>
    ),
    title: "Сервис разнесён по карте",
    text: "Школа, работа и досуг в разных концах — жизнь уходит на логистику"
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="32" r="20" stroke="var(--copper)" strokeWidth="1.5" fill="none" />
        <path d="M32 12 L32 8" stroke="var(--copper)" strokeWidth="2" />
        <path d="M32 56 L32 52" stroke="var(--copper)" strokeWidth="2" />
        <path d="M12 32 L8 32" stroke="var(--copper)" strokeWidth="2" />
        <path d="M56 32 L52 32" stroke="var(--copper)" strokeWidth="2" />
        <path d="M24 26 Q32 20 40 26 Q36 34 32 38 Q28 34 24 26Z" fill="var(--copper)" opacity="0.3" />
        <circle cx="32" cy="28" r="3" fill="var(--copper)" opacity="0.6" />
      </svg>
    ),
    title: "Перегрев летом",
    text: "Площади без тени и бликующий бетон убивают пешеходность в жару"
  },
  {
    icon: (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <rect x="12" y="28" width="40" height="4" rx="2" stroke="var(--copper)" strokeWidth="1.5" fill="none" />
        <path d="M20 28 L20 20 L24 20" stroke="var(--copper)" strokeWidth="1.5" />
        <path d="M44 28 L44 20 L40 20" stroke="var(--copper)" strokeWidth="1.5" />
        <rect x="22" y="36" width="20" height="8" rx="2" stroke="var(--copper)" strokeWidth="1" fill="var(--copper)" opacity="0.15" />
        <line x1="18" y1="50" x2="46" y2="50" stroke="var(--copper)" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
        <path d="M28 44 L28 50" stroke="var(--copper)" strokeWidth="1" opacity="0.4" />
        <path d="M36 44 L36 50" stroke="var(--copper)" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    title: "Доступность запоздала",
    text: "Без step-free логики с самого начала зима ломает среду первой"
  }
];

export function PitchProblem() {
  return (
    <section className={styles.section} aria-label="Проблема">
      <Reveal>
        <span className={styles.sectionKicker}>Проблема</span>
        <h2 className={styles.sectionTitle}>Почему города проигрывают климату</h2>
      </Reveal>
      <div className={styles.problemGrid}>
        {problems.map((p, i) => (
          <Reveal key={i} delay={i * 120} className={styles.problemCard}>
            <div className={styles.problemIcon}>{p.icon}</div>
            <h3 className={styles.problemCardTitle}>{p.title}</h3>
            <p className={styles.problemCardText}>{p.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Metrics Section ─── */
function AnimatedCounter({ target, suffix }: { target: string; suffix: string }) {
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
          const numericTarget = parseFloat(target.replace(/\s/g, "").replace(",", "."));
          if (isNaN(numericTarget)) {
            setDisplay(target);
            observer.disconnect();
            return;
          }
          const duration = 1600;
          const startTime = performance.now();
          const isFloat = target.includes(".") || target.includes(",");

          function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericTarget * eased;

            if (isFloat) {
              setDisplay(current.toFixed(1).replace(".", ","));
            } else {
              setDisplay(Math.round(current).toLocaleString("ru-RU").replace(/\u00a0/g, " "));
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplay(target);
            }
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
    <span ref={ref} className={styles.metricValue}>
      {display}
      <span className={styles.metricUnit}>{suffix}</span>
    </span>
  );
}

const keyMetrics = [
  { value: "60 000", unit: "жителей", label: "Население района" },
  { value: "5,4", unit: "км\u00B2", label: "Площадь" },
  { value: "450", unit: "м", label: "До базового сервиса" },
  { value: "12", unit: "км", label: "Зимних галерей" },
  { value: "78", unit: "%", label: "Покрытие тенью летом" },
  { value: "9,6", unit: "км", label: "Трамвайное кольцо" }
];

export function PitchMetrics() {
  return (
    <section className={styles.section} aria-label="Метрики">
      <Reveal>
        <span className={styles.sectionKicker}>Решение</span>
        <h2 className={styles.sectionTitle}>Город в цифрах</h2>
      </Reveal>
      <div className={styles.metricsGrid}>
        {keyMetrics.map((m, i) => (
          <Reveal key={i} delay={i * 100} className={styles.metricTile}>
            <AnimatedCounter target={m.value} suffix={m.unit} />
            <span className={styles.metricLabel}>{m.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── How It Works Section ─── */
const concepts = [
  {
    icon: (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <circle cx="40" cy="40" r="30" stroke="var(--amber)" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
        <circle cx="40" cy="40" r="16" fill="var(--amber)" opacity="0.12" />
        <path d="M28 40 Q34 28 40 32 Q46 36 52 24" stroke="var(--amber)" strokeWidth="2" fill="none" />
        <circle cx="40" cy="40" r="4" fill="var(--amber)" opacity="0.7" />
      </svg>
    ),
    title: "Тепловое кольцо",
    text: "Климатическая машина встроена в городскую ткань — тепло и прохлада становятся видимой частью архитектуры"
  },
  {
    icon: (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <rect x="12" y="24" width="22" height="32" rx="4" stroke="var(--moss)" strokeWidth="1.5" fill="var(--moss)" fillOpacity="0.08" />
        <rect x="46" y="18" width="22" height="38" rx="4" stroke="var(--moss)" strokeWidth="1.5" fill="var(--moss)" fillOpacity="0.08" />
        <line x1="34" y1="36" x2="46" y2="36" stroke="var(--moss)" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="34" y1="44" x2="46" y2="44" stroke="var(--moss)" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="23" cy="36" r="4" fill="var(--moss)" opacity="0.4" />
        <circle cx="57" cy="34" r="4" fill="var(--moss)" opacity="0.4" />
      </svg>
    ),
    title: "6 кварталов",
    text: "Каждый квартал самодостаточен — школа, еда, медицина и спорт в 5 минутах пешком"
  },
  {
    icon: (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <path d="M16 60 Q24 20 40 40 Q56 60 64 20" stroke="var(--steel)" strokeWidth="2" fill="none" />
        <circle cx="16" cy="60" r="4" fill="var(--steel)" opacity="0.5" />
        <circle cx="40" cy="40" r="4" fill="var(--steel)" opacity="0.5" />
        <circle cx="64" cy="20" r="4" fill="var(--steel)" opacity="0.5" />
        <path d="M10 68 L70 68" stroke="var(--steel)" strokeWidth="1" opacity="0.2" />
        <text x="12" y="76" fill="var(--steel)" fontSize="8" opacity="0.5">-40</text>
        <text x="56" y="76" fill="var(--steel)" fontSize="8" opacity="0.5">+35</text>
      </svg>
    ),
    title: "4 климатических режима",
    text: "Зима, лето, пурга и жара — город переключает инфраструктуру под каждый сезон"
  },
  {
    icon: (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <path d="M20 60 L20 30 Q20 20 30 20 L50 20 Q60 20 60 30 L60 60" stroke="var(--sand)" strokeWidth="1.5" fill="none" />
        <line x1="20" y1="60" x2="60" y2="60" stroke="var(--sand)" strokeWidth="1.5" />
        <path d="M30 60 L30 42" stroke="var(--sand)" strokeWidth="1" opacity="0.5" />
        <path d="M40 60 L40 36" stroke="var(--sand)" strokeWidth="1" opacity="0.5" />
        <path d="M50 60 L50 42" stroke="var(--sand)" strokeWidth="1" opacity="0.5" />
        <ellipse cx="40" cy="14" rx="14" ry="6" fill="var(--moss)" opacity="0.25" />
        <ellipse cx="34" cy="12" rx="8" ry="4" fill="var(--moss)" opacity="0.2" />
        <ellipse cx="48" cy="13" rx="7" ry="3" fill="var(--moss)" opacity="0.2" />
      </svg>
    ),
    title: "Зелень работает",
    text: "Деревья, тень и прохлада — не декор, а инфраструктура микроклимата до каждого дома за 180 м"
  }
];

export function PitchHowItWorks() {
  return (
    <section className={styles.section} aria-label="Как это работает">
      <Reveal>
        <span className={styles.sectionKicker}>Как это работает</span>
        <h2 className={styles.sectionTitle}>Четыре принципа</h2>
      </Reveal>
      <div className={styles.conceptsGrid}>
        {concepts.map((c, i) => (
          <Reveal key={i} delay={i * 140} className={styles.conceptCard}>
            <div className={styles.conceptIcon}>{c.icon}</div>
            <h3 className={styles.conceptCardTitle}>{c.title}</h3>
            <p className={styles.conceptCardText}>{c.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Life in District Visualization ─── */
export function PitchLife() {
  return (
    <section className={styles.section} aria-label="Жизнь в районе">
      <Reveal>
        <span className={styles.sectionKicker}>Результат</span>
        <h2 className={styles.sectionTitle}>Жизнь в Тепловом Кольце</h2>
      </Reveal>
      <div className={styles.lifeGrid}>
        <Reveal delay={0} className={styles.lifeCard}>
          <div className={styles.lifeVisual}>
            <svg viewBox="0 0 200 120" fill="none" aria-hidden="true">
              {/* Winter scene */}
              <rect x="0" y="0" width="200" height="120" rx="12" fill="var(--surface)" />
              <path d="M0 90 Q50 70 100 85 Q150 100 200 80 L200 120 L0 120Z" fill="var(--steel)" opacity="0.1" />
              {/* Buildings */}
              <rect x="20" y="40" width="30" height="50" rx="3" fill="var(--steel)" opacity="0.2" />
              <rect x="60" y="30" width="25" height="60" rx="3" fill="var(--steel)" opacity="0.15" />
              <rect x="95" y="45" width="35" height="45" rx="3" fill="var(--steel)" opacity="0.2" />
              <rect x="140" y="35" width="28" height="55" rx="3" fill="var(--steel)" opacity="0.15" />
              {/* Gallery connection */}
              <path d="M50 65 L60 65" stroke="var(--amber)" strokeWidth="2" opacity="0.6" />
              <path d="M85 65 L95 65" stroke="var(--amber)" strokeWidth="2" opacity="0.6" />
              <path d="M130 65 L140 65" stroke="var(--amber)" strokeWidth="2" opacity="0.6" />
              {/* Warm windows */}
              <rect x="28" y="48" width="6" height="6" rx="1" fill="var(--amber)" opacity="0.5" />
              <rect x="38" y="48" width="6" height="6" rx="1" fill="var(--amber)" opacity="0.4" />
              <rect x="28" y="60" width="6" height="6" rx="1" fill="var(--amber)" opacity="0.3" />
              <rect x="38" y="60" width="6" height="6" rx="1" fill="var(--amber)" opacity="0.5" />
              {/* Snowflakes */}
              <circle cx="75" cy="18" r="2" fill="white" opacity="0.3" />
              <circle cx="120" cy="12" r="1.5" fill="white" opacity="0.25" />
              <circle cx="160" cy="20" r="2" fill="white" opacity="0.2" />
              <circle cx="45" cy="15" r="1.5" fill="white" opacity="0.3" />
            </svg>
          </div>
          <h3 className={styles.lifeCardTitle}>Зимний комфорт</h3>
          <p className={styles.lifeCardText}>
            Защищённые галереи связывают кварталы. Тёплые civic-интерьеры открыты для всех.
            Маршрут до школы или работы не требует машины даже в &minus;40.
          </p>
        </Reveal>

        <Reveal delay={160} className={styles.lifeCard}>
          <div className={styles.lifeVisual}>
            <svg viewBox="0 0 200 120" fill="none" aria-hidden="true">
              {/* Summer scene */}
              <rect x="0" y="0" width="200" height="120" rx="12" fill="var(--surface)" />
              {/* Buildings */}
              <rect x="30" y="40" width="30" height="50" rx="3" fill="var(--moss)" opacity="0.15" />
              <rect x="110" y="35" width="35" height="55" rx="3" fill="var(--moss)" opacity="0.15" />
              {/* Trees canopy */}
              <ellipse cx="80" cy="38" rx="22" ry="16" fill="var(--moss)" opacity="0.25" />
              <ellipse cx="68" cy="42" rx="15" ry="12" fill="var(--moss)" opacity="0.2" />
              <ellipse cx="92" cy="40" rx="16" ry="14" fill="var(--moss)" opacity="0.2" />
              <line x1="80" y1="54" x2="80" y2="90" stroke="var(--moss)" strokeWidth="2" opacity="0.3" />
              {/* Shadow on ground */}
              <ellipse cx="80" cy="92" rx="28" ry="6" fill="var(--moss)" opacity="0.1" />
              {/* People path */}
              <circle cx="55" cy="85" r="3" fill="var(--amber)" opacity="0.5" />
              <circle cx="100" cy="82" r="3" fill="var(--amber)" opacity="0.4" />
              <circle cx="140" cy="86" r="3" fill="var(--amber)" opacity="0.5" />
              {/* Shade lines */}
              <path d="M60 90 L100 90" stroke="var(--moss)" strokeWidth="1" strokeDasharray="4 3" opacity="0.3" />
              {/* Sun */}
              <circle cx="170" cy="20" r="10" fill="var(--amber)" opacity="0.2" />
              <circle cx="170" cy="20" r="5" fill="var(--amber)" opacity="0.4" />
            </svg>
          </div>
          <h3 className={styles.lifeCardTitle}>Летняя прохлада</h3>
          <p className={styles.lifeCardText}>
            Теневые маршруты, прохладные сады и breeze-коридоры.
            78% дневных маршрутов под тенью деревьев и аркад.
          </p>
        </Reveal>

        <Reveal delay={320} className={styles.lifeCard}>
          <div className={styles.lifeVisual}>
            <svg viewBox="0 0 200 120" fill="none" aria-hidden="true">
              {/* Accessibility scene */}
              <rect x="0" y="0" width="200" height="120" rx="12" fill="var(--surface)" />
              {/* Flat path */}
              <path d="M10 80 L190 80" stroke="var(--steel)" strokeWidth="2" opacity="0.3" />
              {/* Tram */}
              <rect x="70" y="64" width="60" height="16" rx="8" fill="var(--steel)" opacity="0.2" stroke="var(--steel)" strokeWidth="1" />
              <circle cx="82" cy="80" r="4" fill="var(--steel)" opacity="0.3" />
              <circle cx="118" cy="80" r="4" fill="var(--steel)" opacity="0.3" />
              <rect x="78" y="68" width="8" height="8" rx="1" fill="var(--amber)" opacity="0.3" />
              <rect x="90" y="68" width="8" height="8" rx="1" fill="var(--amber)" opacity="0.25" />
              <rect x="102" y="68" width="8" height="8" rx="1" fill="var(--amber)" opacity="0.3" />
              <rect x="114" y="68" width="8" height="8" rx="1" fill="var(--amber)" opacity="0.25" />
              {/* Distance markers */}
              <text x="20" y="100" fill="var(--muted)" fontSize="8" opacity="0.5">0</text>
              <text x="90" y="100" fill="var(--muted)" fontSize="8" opacity="0.5">450м</text>
              <text x="165" y="100" fill="var(--muted)" fontSize="8" opacity="0.5">900м</text>
              {/* Service icons */}
              <circle cx="30" cy="45" r="12" fill="var(--moss)" opacity="0.15" stroke="var(--moss)" strokeWidth="1" />
              <text x="24" y="49" fill="var(--moss)" fontSize="10" opacity="0.6">+</text>
              <circle cx="100" cy="40" r="14" fill="var(--amber)" opacity="0.12" stroke="var(--amber)" strokeWidth="1" />
              <rect x="93" y="35" width="14" height="10" rx="2" fill="none" stroke="var(--amber)" strokeWidth="1" opacity="0.5" />
              <circle cx="170" cy="45" r="12" fill="var(--steel)" opacity="0.15" stroke="var(--steel)" strokeWidth="1" />
              <path d="M165 45 L175 45 M170 40 L170 50" stroke="var(--steel)" strokeWidth="1" opacity="0.5" />
              {/* Connecting lines */}
              <path d="M30 57 L30 80" stroke="var(--moss)" strokeWidth="1" strokeDasharray="2 3" opacity="0.3" />
              <path d="M100 54 L100 64" stroke="var(--amber)" strokeWidth="1" strokeDasharray="2 3" opacity="0.3" />
              <path d="M170 57 L170 80" stroke="var(--steel)" strokeWidth="1" strokeDasharray="2 3" opacity="0.3" />
            </svg>
          </div>
          <h3 className={styles.lifeCardTitle}>Всё рядом</h3>
          <p className={styles.lifeCardText}>
            100% маршрутов без ступеней. Трамвайное кольцо 9,6 км.
            Ребёнок доходит до школы сам, а пожилой человек — до клиники за 5 минут.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
export function PitchCTA() {
  return (
    <section className={styles.ctaSection} aria-label="Призыв к действию">
      <Reveal>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Хотите увидеть весь проект?</h2>
          <p className={styles.ctaText}>
            Полный атлас района: генплан, кварталы, климатическая машина,
            сценарии энергии, стоимость и все источники
          </p>
          <a href="/detailed" className={styles.ctaButton}>
            <span>Полное исследование</span>
            <svg className={styles.ctaArrow} width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M5 11h12M13 7l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
