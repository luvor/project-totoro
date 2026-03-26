"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import styles from "./pitch.module.css";

/* ─── Snow particles ─── */
function SnowParticles() {
  const flakes = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 3,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.3,
    })),
  []);

  return (
    <div className={styles.heroParticles} aria-hidden="true">
      {flakes.map(f => (
        <div
          key={f.id}
          className={styles.snowflake}
          style={{
            left: f.left,
            width: `${f.size}px`,
            height: `${f.size}px`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            opacity: f.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Parallax scroll hook ─── */
function useParallax(factor: number) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setOffset(window.scrollY * factor);
          ticking = false;
        });
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [factor]);

  return offset;
}

export function PitchHero() {
  const ringRef = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);
  const parallaxRing = useParallax(0.15);
  const parallaxContent = useParallax(0.06);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Animated gradient background */}
      <div className={styles.heroGradientFlow} aria-hidden="true" />

      {/* Snow particles */}
      <SnowParticles />

      <div
        className={styles.heroRing}
        style={{ transform: `translateY(${parallaxRing}px)` }}
      >
        <svg
          ref={ringRef}
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles.ringSvg} ${visible ? styles.ringVisible : ""}`}
          aria-hidden="true"
        >
          {/* Outer glow ring */}
          <circle
            cx="400"
            cy="400"
            r="340"
            stroke="url(#ringGrad)"
            strokeWidth="1.5"
            opacity="0.3"
            className={styles.ringPulse}
          />
          {/* Main thermal ring */}
          <circle
            cx="400"
            cy="400"
            r="280"
            stroke="url(#ringGradMain)"
            strokeWidth="3"
            strokeDasharray="8 16"
            className={styles.ringRotate}
          />
          {/* Inner ring */}
          <circle
            cx="400"
            cy="400"
            r="220"
            stroke="url(#ringGradInner)"
            strokeWidth="1"
            strokeDasharray="4 12"
            className={styles.ringRotateReverse}
          />
          {/* Quarter nodes */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const cx = 400 + 280 * Math.cos(rad);
            const cy = 400 + 280 * Math.sin(rad);
            return (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r="8"
                  fill="url(#nodeGrad)"
                  className={styles.nodeGlow}
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r="3"
                  fill="var(--amber)"
                />
              </g>
            );
          })}
          {/* Connecting radial lines */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 400 + 225 * Math.cos(rad);
            const y1 = 400 + 225 * Math.sin(rad);
            const x2 = 400 + 335 * Math.cos(rad);
            const y2 = 400 + 335 * Math.sin(rad);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--steel)"
                strokeWidth="0.5"
                opacity="0.2"
              />
            );
          })}
          {/* Center warmth */}
          <circle cx="400" cy="400" r="60" fill="url(#centerWarmth)" opacity="0.6" />
          <circle cx="400" cy="400" r="24" fill="url(#centerCore)" />
          {/* Tram loop path */}
          <ellipse
            cx="400"
            cy="400"
            rx="160"
            ry="140"
            stroke="var(--moss)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            fill="none"
            opacity="0.3"
            className={styles.ringRotateSlow}
          />
          <defs>
            <radialGradient id="ringGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--copper)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ringGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--amber)" />
              <stop offset="50%" stopColor="var(--copper)" />
              <stop offset="100%" stopColor="var(--steel)" />
            </linearGradient>
            <linearGradient id="ringGradInner" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--steel)" />
              <stop offset="100%" stopColor="var(--moss)" />
            </linearGradient>
            <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--amber)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="centerWarmth" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--amber)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="centerCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--amber)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--copper)" stopOpacity="0.4" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div
        className={`${styles.heroContent} ${visible ? styles.heroContentVisible : ""}`}
        style={{ transform: visible ? `translateY(${parallaxContent}px)` : undefined }}
      >
        <span className={styles.heroKicker}>Климатический город</span>
        <h1 className={styles.heroTitle}>
          Тепловое
          <br />
          Кольцо
        </h1>
        <p className={styles.heroTagline}>
          Город, который помогает жить полной жизнью
          <br />
          круглый год — от &minus;40 до +35
        </p>
      </div>
      <div className={styles.heroScroll} aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
