"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./pitch.module.css";

const slides = [
  {
    src: "/images/renders/frostpunk-aerial.webp",
    alt: "Кольцевой арктический район с высоты",
    caption: "Вид с высоты: кольцевая структура района, тепловое ядро и трамвайная петля",
  },
  {
    src: "/images/renders/frostpunk-gallery.webp",
    alt: "Отапливаемая стеклянная галерея изнутри",
    caption: "Зимние галереи: тепло и свет внутри, метель снаружи",
  },
  {
    src: "/images/renders/frostpunk-thermal.webp",
    alt: "Теплообменная инфраструктура района",
    caption: "Тепловое ядро: центральный теплообменник и сеть распределения",
  },
  {
    src: "/images/renders/frostpunk-summer.webp",
    alt: "Район летом: парки, тень, открытые кафе",
    caption: "Лето: теневые маршруты, прохладные сады и открытые террасы",
  },
];

const SLIDE_DURATION = 5000;

export function PitchCinema() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [captionKey, setCaptionKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  /* Start/stop the auto-cycle only when visible */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setCaptionKey(k => k + 1);
  }, []);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  /* Auto-advance timer */
  useEffect(() => {
    if (isPaused || !isVisible) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }
    timerRef.current = setInterval(next, SLIDE_DURATION);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, isVisible, next]);

  return (
    <section
      ref={sectionRef}
      className={styles.cinemaSection}
      aria-label="Кинематографическая галерея"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ─── Slides ─── */}
      <div className={styles.cinemaViewport}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`${styles.cinemaSlide} ${i === current ? styles.cinemaSlideActive : ""}`}
            aria-hidden={i !== current}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={1920}
              height={1080}
              className={`${styles.cinemaImage} ${i === current ? styles.cinemaImageActive : ""}`}
              priority={i === 0}
            />
          </div>
        ))}

        {/* Dark gradient overlay for readability */}
        <div className={styles.cinemaOverlay} />

        {/* ─── Caption with typewriter effect ─── */}
        <div className={styles.cinemaCaptionWrap}>
          <TypewriterCaption key={captionKey} text={slides[current].caption} />
        </div>

        {/* ─── Arrows ─── */}
        <button className={`${styles.cinemaArrow} ${styles.cinemaArrowLeft}`} onClick={prev} aria-label="Предыдущий слайд">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M18 6l-8 8 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button className={`${styles.cinemaArrow} ${styles.cinemaArrowRight}`} onClick={next} aria-label="Следующий слайд">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M10 6l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      {/* ─── Progress bar + dots ─── */}
      <div className={styles.cinemaControls}>
        <div className={styles.cinemaDots}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={`${styles.cinemaDot} ${i === current ? styles.cinemaDotActive : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Слайд ${i + 1}`}
            >
              {i === current && !isPaused && isVisible && (
                <svg className={styles.cinemaDotProgress} viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="var(--amber)" strokeWidth="2"
                    strokeDasharray="100.53" strokeDashoffset="100.53"
                    className={styles.cinemaDotCircle}
                    style={{ animationDuration: `${SLIDE_DURATION}ms` }}
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
        {isPaused && (
          <span className={styles.cinemaPaused}>Пауза</span>
        )}
      </div>
    </section>
  );
}

/* ─── Typewriter caption ─── */
function TypewriterCaption({ text }: { text: string }) {
  const [displayedLen, setDisplayedLen] = useState(0);

  useEffect(() => {
    setDisplayedLen(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedLen(i);
      if (i >= text.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className={styles.cinemaCaption}>
      {text.slice(0, displayedLen)}
      <span className={styles.cinemaCursor} aria-hidden="true">|</span>
    </p>
  );
}
