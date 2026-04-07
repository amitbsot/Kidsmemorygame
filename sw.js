// שם המטמון - שנה אותו כדי לאלץ עדכון אצל משתמשים
const CACHE_NAME = 'kids-memory-game-v3';

// רשימת הקבצים שיש לשמור לאופליין (הנתיבים חייבים להיות מדויקים!)
const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'IMG_8097.png',
  'react.production.min.js',
  'react-dom.production.min.js',
  'babel.min.js',
  'tailwind.js'
];

// שלב ההתקנה - שמירת הקבצים במטמון
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// שלב ההפעלה - ניקוי מטמונים ישנים
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// שלב התפיסה (Fetch) - הגשת קבצים מהמטמון גם ללא אינטרנט
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // אם הקובץ נמצא במטמון, החזר אותו
        if (response) {
          return response;
        }
        // אחרת, נסה להביא אותו מהרשת
        return fetch(event.request);
      }
    )
  );
});
