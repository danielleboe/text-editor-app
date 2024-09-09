const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies'); // Import if needed
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache and route files
precacheAndRoute(self.__WB_MANIFEST);

// Cache first strategy for page navigation
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Stale-while-revalidate strategy for assets
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60, // Cache up to 60 items
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
      }),
    ],
  })
);
