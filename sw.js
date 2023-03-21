const cacheName = "cartao";
var filesToCache = [
    './',
    './manifest.webmanifest',
    './index.html',
    './main.css',
    './js/main.js'
];

// Inicia o Service Worker e armazena em cache o conteúdo do app
self.addEventListener('install', function(e){
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            return cache.addAll(filesToCache);
        })
    );
    self.skipWaiting();
});

// Servidor de armazenamento de cache quando estiver offline
self.addEventListener('fetch', function(){
    e.respondWith(
        caches.match(e.request).then(function(response){
            return response || fetch(e.request);
        })
    );
});