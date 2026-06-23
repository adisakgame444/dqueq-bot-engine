// Minimal service worker for PWA standalone mode on Android
// This allows Chrome to treat the web app as installable and open without the URL bar

const CACHE_NAME = "dqueue-app-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Pass through all requests to the network
  event.respondWith(fetch(event.request));
});
