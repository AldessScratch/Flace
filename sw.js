// Service Worker pour que flace marche hors connexion
const CACHE_NAME = 'my-cache-v1';
const CACHE_FILES = ['/', '/index.html', '/matiere.html', '/st.html', '/learn', '/learn/index.html', '/style.css', '/js/main.js', '/js/script.js', '/js/modal.js', '/learn/library.html', '/img/texture.png',  '/img/math/MAT-ARI-0001.png', '/img/faviconcolor-fixed.png', '/img/math/MAT-ARI-0011.png', '/img/0.png', '/img/1.png', '/api/math.json', '/api/lv2.json'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(CACHE_FILES);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Check if the device is offline before deciding to fetch from the network
        if (!navigator.onLine && response) {
          return response;
        }

        // Fetch from the network and update the cache
        return fetch(event.request)
          .then(networkResponse => {
            // Update the cache with the latest response
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, networkResponse));

            return networkResponse.clone();
          })
          .catch(error => {
            console.error('Error fetching:', error);
          });
      })
      .catch(error => {
        console.error('Error matching request in cache:', error);
      })
  );
});
