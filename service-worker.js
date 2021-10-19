const CACHE_NAME = "mythpedia-v4";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/bali.html",
  "/pages/home.html",
  "/pages/java.html",
  "/pages/sund.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/img/bali.jpg",
  "/img/borobudur.png",
  "/img/home.png",
  "/img/indonesia.png",
  "/img/java.jpg",
  "/img/sunda.jpg",
  "/img/sunda.png",
  "/mythpedia-192.png",
  "/mythpedia-512.png",
  "/manifest.json"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });

  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  