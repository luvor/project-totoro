"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./pitch.module.css";

interface VisionToggleProps {
  sellingImage: { src: string; alt: string };
  engineeringImage: { src: string; alt: string };
  caption?: string;
}

type Tab = "vision" | "engineering";

export function VisionToggle({ sellingImage, engineeringImage, caption }: VisionToggleProps) {
  const [active, setActive] = useState<Tab>("vision");
  const tabsRef = useRef<HTMLDivElement>(null);

  const switchTo = useCallback((tab: Tab) => {
    setActive(tab);
  }, []);

  /* Keyboard: arrow keys switch between tabs */
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        setActive(prev => (prev === "vision" ? "engineering" : "vision"));
      }
    },
    [],
  );

  /* Focus the newly-active tab button when active changes via keyboard */
  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const btn = container.querySelector<HTMLButtonElement>(
      `[data-tab="${active}"]`,
    );
    if (btn && container.contains(document.activeElement)) {
      btn.focus();
    }
  }, [active]);

  const isVision = active === "vision";

  return (
    <div className={styles.visionToggle}>
      {/* Tab bar */}
      <div
        ref={tabsRef}
        className={styles.visionTabs}
        role="tablist"
        aria-label="Vision / Engineering toggle"
        onKeyDown={onKeyDown}
      >
        <button
          role="tab"
          data-tab="vision"
          aria-selected={isVision}
          tabIndex={isVision ? 0 : -1}
          className={`${styles.visionTab} ${isVision ? styles.visionTabActive : ""}`}
          onClick={() => switchTo("vision")}
        >
          <span aria-hidden="true">&#10022;</span> Vision
        </button>
        <button
          role="tab"
          data-tab="engineering"
          aria-selected={!isVision}
          tabIndex={!isVision ? 0 : -1}
          className={`${styles.visionTab} ${!isVision ? styles.visionTabEngActive : ""}`}
          onClick={() => switchTo("engineering")}
        >
          <span aria-hidden="true">&#9881;</span> Engineering
        </button>
      </div>

      {/* Image panels */}
      <div className={styles.visionPanels}>
        <div
          role="tabpanel"
          aria-label="Vision render"
          className={`${styles.visionPanel} ${isVision ? styles.visionPanelActive : ""}`}
        >
          <Image
            src={sellingImage.src}
            alt={sellingImage.alt}
            width={1200}
            height={675}
            className={styles.visionImage}
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
        </div>
        <div
          role="tabpanel"
          aria-label="Engineering render"
          className={`${styles.visionPanel} ${!isVision ? styles.visionPanelActive : ""}`}
        >
          <Image
            src={engineeringImage.src}
            alt={engineeringImage.alt}
            width={1200}
            height={675}
            className={styles.visionImage}
            sizes="(max-width: 1024px) 100vw, 1200px"
          />
        </div>
      </div>

      {/* Caption */}
      {caption && <p className={styles.visionCaption}>{caption}</p>}
    </div>
  );
}
