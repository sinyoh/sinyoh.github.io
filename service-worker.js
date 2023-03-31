const _cacheName = 'my_cache';
const _cacheNameDyn = 'my_cache_dyn';
//cached file
const _url = [
  '/',
  '/index.html',
  '/styles.css',
  '/images/about-header.jpg',
  '/images/contact-image.jpg',
  '/images/footer-background.png',
  '/images/header-background.jpg',
  '/images/logo.png',
  'https://code.getmdl.io/1.3.0/material.grey-pink.min.css',
   '/offline.html',
];

self.addEventListener('install', evt =>{
  evt.waitUntil(
    caches.open(_cacheName).then(caches=>{
      console.log('catching shell assets');
      caches.addAll(_url);
    })
  );
  console.log("test");
  
});


self.addEventListener('activate', evt =>{
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== _cacheName && key !== _cacheNameDyn)
        .map(key => caches.delete())
        )
    })
  );
});


self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes =>{
      return cacheRes || fetch(evt.request).then(async fetchRes =>{
        const cache = await caches.open(_cacheNameDyn);
        cache.put(evt.request.url, fetchRes);
        return fetchRes;
      });
    }).catch(() => caches.match('/offline.html'))
  );
});

