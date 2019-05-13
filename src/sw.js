importScripts('serviceworker-cache-polyfill.js');

var CACHE_NAME = 'yeahmobi-manage-sys-v1.0';

// File want to cache
var urlsToCache = [
  '/css/bootstrap.min.css',
  '/font-awesome/css/font-awesome.min.css',
  '/js/chosen/chosen.css',
  '/css/datetimepicker.css',
  '/js/select2/select2.css',
  '/js/bootstrap-switch/css/bootstrapSwitch.css',
  '/js/bootstrap-editable/css/bootstrap-editable.css',
  '/js/multi-select/css/multi-select.css',
  '/css/newUI.css',
  '/css/highcharts.css',
  '/css/bootstrap-select.min.css',
  '/js/jquery.min.js',
  '/js/jquery.query.js',
  '/js/moment.min.js',
  '/js/bootstrap.min.js',
  '/js/select2/select2.min.js'
];


// Set the callback for the install step
self.oninstall = function (e) {
  console.log('[serviceWorker]: Installing...');
  // perform install steps
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('[serviceWorker]: Cache All');
        return cache.addAll(urlsToCache);
      })
      .then(function () {
        console.log('[serviceWorker]: Intalled And Skip Waiting on Install');
        return self.skipWaiting();
      })
  );
};

self.addEventListener("fetch", function(event) {});

self.onactivate = function (e) {

  console.log('[serviceWorker]: Actived');

  var whiteList = ['yeahmobi-manage-sys-v1.0'];

  e.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (whiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      )
    }).then(function () {
      console.log('[serviceWorker]: Clients Claims');
      return self.clients.claim();
    })
  );

};
