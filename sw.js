const CACHE_NAME = "couch-batata-v46";
const APP_URL = new URL("./index.html", self.registration.scope).href;
const APP_SHELL = [
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192-v2.png",
  "./icon-512-v2.png",
  "./icon-maskable-512-v2.png",
  "./apple-touch-icon-v2.png",
  "./mascot-v2.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Prefer the latest HTML while online, then fall back to the installed copy.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(APP_URL, response.clone()));
          return response;
        })
        .catch(() => caches.match(APP_URL))
    );
    return;
  }

  // Static assets are cache-first and refreshed quietly in the background.
  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request).then(response => {
        if (response.ok) caches.open(CACHE_NAME).then(cache => cache.put(request, response.clone()));
        return response;
      }).catch(() => cached || Response.error());
      return cached || network;
    })
  );
});
