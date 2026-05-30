const CACHE_NAME = 'mapharmacie-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663709730129/X2yA9oaXDva86skUkjKjPC/pharmacy_logo-SzCktMgQwAF2YiJMhusx3r.webp',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663709730129/X2yA9oaXDva86skUkjKjPC/pharmacy_hero-56BieDkmGYhtAhEq5FXHAT.webp',
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663709730129/X2yA9oaXDva86skUkjKjPC/medicine_catalog-UckdoKG4tp4fUgSwtJAeCv.webp'
];

// Installation
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activation
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch
self.addEventListener('fetch', event => {
  // Ignorer les requêtes non-GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourner le cache s'il existe
        if (response) {
          return response;
        }

        return fetch(event.request).then(response => {
          // Ne pas cacher les réponses non-valides
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          // Cloner la réponse
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Retourner une page hors ligne si disponible
        return new Response('Vous êtes hors ligne', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      })
  );
});
