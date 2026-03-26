"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./pitch.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const slides = [
  {
    src: `${basePath}/images/renders/selling-aerial-summer.webp`,
    alt: "Район с высоты: зелёные крыши, солнечные панели, уютные дворы",
    caption: "Район с высоты: зелёные крыши, солнечные панели, уютные дворы",
  },
  {
    src: `${basePath}/images/renders/selling-gallery-interior.webp`,
    alt: "Внутри галереи: тепло, свет, кофейни и книжные",
    caption: "Внутри галереи: тепло, свет, кофейни и книжные",
  },
  {
    src: `${basePath}/images/renders/selling-street-summer.webp`,
    alt: "Летняя улица: деревья, кафе, трамвай, велодорожки",
    caption: "Летняя улица: деревья, кафе, трамвай, велодорожки",
  },
  {
    src: `${basePath}/images/renders/selling-playground.webp`,
    alt: "Детская площадка под стеклянным куполом",
    caption: "Детская площадка под стеклянным куполом",
  },
  {
    src: `${basePath}/images/renders/selling-tram.webp`,
    alt: "Скандинавский трамвай: берёза, кожа, панорамные окна",
    caption: "Скандинавский трамвай: берёза, кожа, панорамные окна",
  },
  {
    src: `${basePath}/images/renders/selling-street-winter.webp`,
    alt: "Зимний уют: тёплый свет галерей, праздничная атмосфера",
    caption: "Зимний уют: тёплый свет галерей, праздничная атмосфера",
  },
  {
    src: `${basePath}/images/renders/hero-summer-aerial.webp`,
    alt: "Лето: теневые маршруты и прохладные сады",
    caption: "Лето: теневые маршруты и прохладные сады",
  },
  {
    src: `${basePath}/images/renders/gallery-tram.webp`,
    alt: "Трамвайное кольцо связывает все кварталы",
    caption: "Трамвайное кольцо связывает все кварталы",
  },
];

/* Ken Burns variants — each slide gets a different zoom+pan direction */
const kenBurnsVariants = [
  styles.kenBurnsA,
  styles.kenBurnsB,
  styles.kenBurnsC,
  styles.kenBurnsD,
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

  /* Keyboard navigation */
  useEffect(() => {
    if (!isVisible) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") { next(); e.preventDefault(); }
      else if (e.key === "ArrowLeft") { prev(); e.preventDefault(); }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isVisible, next, prev]);

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
              className={`${styles.cinemaImage} ${
                i === current ? kenBurnsVariants[i % kenBurnsVariants.length] : ""
              }`}
              priority={i === 0}
            />
          </div>
        ))}

        {/* Dark gradient overlay for readability */}
        <div className={styles.cinemaOverlay} />

        {/* ─── Caption with typewriter effect + glow backdrop ─── */}
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

      {/* ─── Progress line + dots ─── */}
      <div className={styles.cinemaControls}>
        {/* Linear progress bar */}
        <div className={styles.cinemaProgressBar}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={`${styles.cinemaProgressSegment} ${
                i < current ? styles.cinemaProgressDone :
                i === current ? styles.cinemaProgressCurrent : ""
              }`}
              onClick={() => goTo(i)}
              aria-label={`Слайд ${i + 1}`}
            >
              {i === current && !isPaused && isVisible && (
                <div
                  className={styles.cinemaProgressFill}
                  style={{ animationDuration: `${SLIDE_DURATION}ms` }}
                />
              )}
            </button>
          ))}
        </div>
        <div className={styles.cinemaControlsMeta}>
          <span className={styles.cinemaCounter}>
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          {isPaused && (
            <span className={styles.cinemaPaused}>Пауза</span>
          )}
        </div>
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
