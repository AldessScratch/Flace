// service-worker.js

const CACHE_NAME = 'my-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/matiere.html',
  '/st.html',
  '/info.html',
  '/learn',
  '/learn/index.html',
  '/style.css',
  '/js/main.js',
  '/js/script.js',
  '/js/modal.js',
  '/learn/library.html',
  '/img/texture.png',
  '/img/math/MAT-ARI-0001.png',
  '/img/faviconcolor-fixed.png',
  '/img/math/MAT-ARI-0011.png',
  '/img/0.png',
  '/img/1.png',
  '/img/2.png',
  '/img/3.png',
  '/img/4.png',
  '/img/5.png',
  '/api/math.json',
  '/api/lv1.json',
  '/api/lv2.json',
  '/api/hg.json',
  '/api/svt.json',
  '/api/fra.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        // If the request is in the cache and the device is offline, return the cached response
        if (cachedResponse && !navigator.onLine) {
          return cachedResponse;
        }

        // If the device is online, fetch the resource from the network
        return fetch(event.request).then((networkResponse) => {
          // Update the cache with the new response
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }).catch(() => {
          // If fetching from the network fails, return the cached response (if available)
          if (cachedResponse) {
            return cachedResponse;
          }
        });
      });
    })
  );
});
