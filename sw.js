const CACHE_NAME = 'hacker-recon-v2';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
  'https://fonts.bunny.net/css?family=inter:400,500,600,700|jetbrains-mono:400,500,600&display=swap',
  'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github-dark.min.css',
  'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/lib/highlight.min.js',
  'https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js',
  'https://cdn.jsdelivr.net/npm/jsrsasign@11.1.0/lib/jsrsasign-all-min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;
      return fetch(event.request).catch(() => {
        // Offline fallback could go here
      });
    })
  );
});
