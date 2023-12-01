// Service Worker pour que flace marche hors connexion


// Choose a cache name
const cacheName = 'cache-v3';
// List the files to precache
const precacheResources = ['/', '/index.html', '/matiere.html', '/st.html', '/learn', '/learn/index.html', '/style.css', '/js/main.js', '/js/script.js', '/js/modal.js', '/learn/library.html', '/img/texture.png',  '/img/math/MAT-ARI-0001.png', '/img/faviconcolor-fixed.png', '/img/math/MAT-ARI-0011.png', '/img/0.png', '/img/1.png', '/api/math.json', '/api/lv2.json'];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(cacheName);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});


// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    }),
  );
});
