const _cacheName = 'my_cache';

//cached file
const _url = [
  '/',
  '/styles.css',
  '/images/about-header.jpg',
  '/images/contact-image.jpg',
  '/images/footer-background.png',
  '/images/header-background.jpg',
  '/images/logo.png',
  'https://code.getmdl.io/1.3.0/material.grey-pink.min.css',
];

self.addEventListener('install', evt =>{
  evt.waitUntil(
    caches.open(_cacheName).then(caches=>{
      console.log('catching shell assets');
      caches.addAll(_url);
    })
  )
});

self.addEventListener('activate', function (event) {
  console.log('sw activated')
});


self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes =>{
      return cacheRes || fetch(evt.request);
    })
  )
});
