"use client";

import { useEffect, useRef, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaRegistrar() {
  const [installable, setInstallable] = useState(false);
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      const manifestLink = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
      const basePath = manifestLink?.href
        ? new URL(manifestLink.href).pathname.replace("/manifest.json", "")
        : "";

      navigator.serviceWorker
        .register(`${basePath}/sw.js`, { scope: `${basePath}/` })
        .catch(() => {});
    }

    // Listen for install prompt
    function handleBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      // Only show if not previously dismissed this session
      if (!sessionStorage.getItem("pwa-dismissed")) {
        setInstallable(true);
      }
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Hide if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstallable(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  async function handleInstall() {
    const prompt = deferredPrompt.current;
    if (!prompt) return;

    await prompt.prompt();
    const { outcome } = await prompt.userChoice;

    if (outcome === "accepted") {
      setInstallable(false);
    }
    deferredPrompt.current = null;
  }

  function handleDismiss() {
    setDismissed(true);
    setInstallable(false);
    sessionStorage.setItem("pwa-dismissed", "1");
  }

  if (!installable || dismissed) return null;

  return (
    <div className="pwa-install-banner" role="alert">
      <p>Установить как приложение</p>
      <div className="pwa-install-actions">
        <button type="button" className="button-primary" onClick={handleInstall}>
          Установить
        </button>
        <button type="button" className="pwa-dismiss" onClick={handleDismiss} aria-label="Закрыть">
          Не сейчас
        </button>
      </div>
    </div>
  );
}
