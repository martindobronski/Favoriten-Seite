// ── SERVICE WORKER – Meine Favoriten PWA ────────────────────────────────────
const CACHE_NAME = 'favoriten-v1';

// Dateien, die beim Installieren gecacht werden
const ASSETS_TO_CACHE = [
  '/index.html',
  '/app.js',
  '/styles.css',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// ── INSTALL: Alle Assets vorsorglich cachen ──────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting()) // Sofort aktiv werden
  );
});

// ── ACTIVATE: Alten Cache löschen ────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim()) // Sofort Kontrolle übernehmen
  );
});

// ── FETCH: Cache-first, dann Netzwerk ────────────────────────────────────────
self.addEventListener('fetch', event => {
  // Nur GET-Anfragen behandeln
  if (event.request.method !== 'GET') return;

  // Nur gleiche Herkunft (kein Cross-Origin wie externe Favicons)
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      // Nicht im Cache: Netzwerk versuchen und Antwort cachen
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) return response;

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });

        return response;
      }).catch(() => {
        // Offline-Fallback: index.html zurückgeben
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      });
    })
  );
});
