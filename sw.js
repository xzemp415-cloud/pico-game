const CACHE_NAME = 'pico-v2';
const ICON_URL = 'https://i.ibb.co/9mrY7cH4/IMG-5798.jpg';
const ASSETS = [
    './',
    './index.html',
    'https://i.ibb.co/9mrY7cH4/IMG-5798.jpg'
];

// установка: кэшируем файлы
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

// отдача файлов: офлайн-режим
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// планировщик уведомлений
self.addEventListener('activate', (event) => {
    const schedule = [
        { time: '2026-06-01T22:02:00', title: 'Ещё не стало скучно?', body: 'Не пропустите ежедневные награды!' },
        { time: '2026-06-06T05:06:00', title: 'И полетели...', body: 'Успейте себя прожарить до конца сезона!' },
        { time: '2026-06-15T12:52:00', title: 'Сезон скоро заканчивается!', body: 'Надеюсь ты ничего не пропустил!' },
        { time: '2026-07-01T00:00:00', title: 'Сезон закончился', body: 'Масштабного лета уже нет... но нет повода расстраиваться!' }
    ];

    const now = new Date();
    
    schedule.forEach(item => {
        const triggerTime = new Date(item.time);
        if (triggerTime > now) {
            const delay = triggerTime - now;
            setTimeout(() => {
                self.registration.showNotification(item.title, {
                    body: item.body,
                    icon: ICON_URL
                });
            }, delay);
        }
    });
});
