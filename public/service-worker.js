
const CACHE_NAME = "product-showcase-v2";

const STATIC_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./logo192.png",
  "./logo512.png"
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_FILES);
    })
  );

  self.skipWaiting();
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );

  self.clients.claim();
});

// Fetch event
self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  // Handle API requests separately
  if (request.url.includes("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, copy);
            });
          }

          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            return cached || new Response(
              JSON.stringify({
                message: "You are offline. Data is unavailable."
              }),
              {
                status: 503,
                headers: {
                  "Content-Type": "application/json"
                }
              }
            );
          });
        })
    );

    return;
  }

  // Handle product images and other resources
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const networkRequest = fetch(request)
        .then((response) => {
          if (response && (response.ok || response.type === "opaque")) {
            const copy = response.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, copy);
            });
          }

          return response;
        });

      return cachedResponse || networkRequest.catch(() => {
        if (request.destination === "image") {
          return new Response("", { status: 503 });
        }

        return new Response("You are offline.", {
          status: 503
        });
      });
    })
  );
});
