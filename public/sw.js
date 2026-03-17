/// <reference lib="webworker" />

const CACHE_NAME = "totoro-atlas-v2";

// Derive basePath from SW scope (works with GitHub Pages sub-path deploys)
const BASE = self.registration.scope.replace(/\/$/, "");

// All page HTML files to precache at install time
const PRECACHE_PAGES = [
  `${BASE}/`,
  `${BASE}/versions/`,
  `${BASE}/machines/`,
  `${BASE}/appendix/`
];

function isStaticAsset(pathname) {
  return (
    pathname.includes("/_next/static/") ||
    pathname.endsWith(".woff2") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".png")
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        Promise.allSettled(
          PRECACHE_PAGES.map((url) =>
            fetch(url).then((res) => {
              if (res.ok) cache.put(url, res);
            })
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;
  if (!request.url.startsWith(self.location.origin)) return;

  const url = new URL(request.url);

  // Cache-first for static assets (JS chunks, fonts, images)
  if (isStaticAsset(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;

        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch {
          return new Response("", { status: 503 });
        }
      })
    );
    return;
  }

  // Network-first with offline fallback for navigation
  if (request.mode === "navigate") {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        try {
          const networkResponse = await fetch(request);
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch {
          const cached = await cache.match(request);
          if (cached) return cached;
          // Fallback to home page if specific page not cached
          const homeFallback = await cache.match(`${BASE}/`);
          return homeFallback || new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } });
        }
      })
    );
    return;
  }

  // Stale-while-revalidate for everything else
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(() => null);

      // Always return something valid
      if (cached) return cached;
      const networkResult = await fetchPromise;
      return networkResult || new Response("", { status: 503 });
    })
  );
});
