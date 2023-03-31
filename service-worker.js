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

self.addEventListener('install', function (event) {
  console.log('sw installed')
  event.waitUntil(
    caches.open(_cacheName).then(function (cache) {
      console.log('tes');
      return cache.addAll(_url);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('sw activated')
)};


self.addEventListener('fetch', function (event) {
  try {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        console.log('tes2')
        return response || fetch(event.request);
      })
    );
  } catch (error) {
    console.log(error);
  }
});
