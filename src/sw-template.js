/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.loadModule('workbox-background-sync');

const { precache, precacheAndRoute } = workbox.precaching;

/* eslint-disable-next-line */
precacheAndRoute(self.__WB_MANIFEST);
precache(['https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap']);

const { registerRoute } = workbox.routing;
const { NetworkFirst, NetworkOnly, CacheOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;

//**

//** NetworkFirst */

//**

const cacheNetworkFirst = ['/api/v1/renewalAuthN', '/api/v1/tasks'];
registerRoute(({ request, url }) => {
  if (cacheNetworkFirst.includes(url.pathname)) return true;
  return false;
}, new NetworkFirst());

//**

//** cacheFirst */

//**

const cacheOnly = [
  'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap',
];
registerRoute(({ request, url }) => {
  console.log('cache Only', url.pathname);

  if (cacheOnly.includes(url.href)) return true;
  return false;
}, new CacheOnly());

//**

//** OFFLINE REQUEST */

//**
const bgSyncPlugin = new BackgroundSyncPlugin('offline-task', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
  new RegExp('https://todo-api-ml.up.railway.app/api/v1/tasks'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'POST'
);

registerRoute(
  new RegExp('https://todo-api-ml.up.railway.app/api/v1/tasks'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'PATCH'
);

registerRoute(
  new RegExp('https://todo-api-ml.up.railway.app/api/v1/tasks'),
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  'DELETE'
);

//another way

//registerRoute(new RegExp(`${baseUrl}/renewalAuthN`), new NetworkFirst());
