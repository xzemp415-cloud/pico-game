const CACHE_NAME = 'pico-cache-v1';
// файлы, которые нужно сохранить для работы без интернета
const ASSETS = [
  'index.html',
  'manifest.json',
  'https://i.ibb.co/TDKZK4rz/IMG-1949.jpg', // твоя фоновая картинка меню
  'https://i.ibb.co/zH4YXq3H/IMG-4539.jpg'   // иконка игры
];

// устанавливаем service worker и кэшируем ресурсы
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// активируем и чистим старый кэш, если он изменится
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// перехватываем запросы: если интернета нет, берём файлы из кэша
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

