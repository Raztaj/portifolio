// Bump CACHE whenever the caching strategy changes; old caches are purged on activate.
const CACHE = "tk-systems-v2";
const PRECACHE = [
  "/",
  "/en",
  "/ar",
  "/portrait.png",
  "/icon-192.png",
  "/icon-512.png",
  "/icon-maskable-512.png",
  "/social-og.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

function store(request, res) {
  if (res && res.status === 200) {
    const copy = res.clone();
    caches.open(CACHE).then((cache) => cache.put(request, copy));
  }
  return res;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Pages: network first, fall back to cache (offline), then to the EN home.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => store(request, res))
        .catch(() =>
          caches.match(request).then((hit) => hit || caches.match("/en"))
        )
    );
    return;
  }

  // Content-hashed build assets never change: cache first.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches
        .match(request)
        .then((hit) => hit || fetch(request).then((res) => store(request, res)))
    );
    return;
  }

  // Everything else (images, optimizer output, icons) keeps a stable URL, so
  // serve the cached copy instantly but refresh it in the background.
  event.respondWith(
    caches.match(request).then((hit) => {
      const network = fetch(request)
        .then((res) => store(request, res))
        .catch(() => hit);
      if (hit) {
        event.waitUntil(network);
        return hit;
      }
      return network;
    })
  );
});
