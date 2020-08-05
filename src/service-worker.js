//menyimpan aset ke cache
// const { assets } = global.serviceWorkerOption;
const CACHE_NAME = "sporTech-pwa_v1";
var urlsToCache = [
  // ...assets,
  "/",
  "/[object Object]/icon_192x192.png",
  "/images/icons/icon-72.png",
  "/images/icons/icon-96.png",
  "/images/icons/icon-128.png",
  "/images/icons/icon-144.png",
  "/images/icons/icon-192.png",
  "/images/icons/icon-256.png",
  "/images/icons/icon-384.png",
  "/images/icons/icon-512.png",
  // "/images/bg.png",
  // "/images/logo.svg",
  "/images/notif.png",
  "/images/player.svg",
  "/src/images/bg.jpg",
  "/src/images/logo.svg",
  "/detailMatch.html",
  "/detailPlayer.html",
  "/detailTeam.html",
  "/dm.js",
  "/dp.js",
  "/dt.js",
  "/favorite.html",
  "/home.html",
  "/icon_72x72.png",
  "/icon_96x96.png",
  "/icon_128x128.png",
  "/icon_144x144.png",
  "/icon_256x256.png",
  "/icon_384x384.png",
  "/icon_512x512.png",
  "/index.html",
  "/index.js",
  "/manifest.json",
  "/matches.html",
  "/nav.html",
  "/standing.html",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://code.jquery.com/jquery-3.3.1.min.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

//menggunakan aset dari cache
self.addEventListener("fetch", function (event) {
  var base_url = "https://api.football-data.org/v2";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then(function (response) {
          return response || fetch(event.request);
        })
    );
  }
});

//mekanisme penghapusan cache lama
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

//siapkan dulu service worker untuk menerima datanya
self.addEventListener("push", function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "./images/notif.png",
    badge: "./images/notif.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("SporTech Notification", options)
  );
});
