importScripts('serviceworker-cache-polyfill.js');

var CACHE_NAME = 'yeahmobi-manage-sys-v1.0';

// File want to cache
var urlsToCache = [
  '/asset/css/bootstrap.min.css',
  '/asset/font-awesome/css/font-awesome.min.css',
  '/asset/js/chosen/chosen.css',
  '/asset/css/datetimepicker.css',
  '/asset/js/select2/select2.css',
  '/asset/js/bootstrap-switch/css/bootstrapSwitch.css',
  '/asset/js/bootstrap-editable/css/bootstrap-editable.css',
  '/asset/js/multi-select/css/multi-select.css',
  '/asset/css/newUI.css',
  '/asset/css/highcharts.css',
  '/asset/css/bootstrap-select.min.css',
  '/asset/js/jquery.min.js',
  '/asset/js/jquery.query.js',
  '/asset/js/moment.min.js',
  '/asset/js/bootstrap.min.js',
  '/asset/js/select2/select2.min.js'
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
