// Service Worker实现本地离线功能
const CACHE_NAME = 'pet-collection-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/src/index.css',
  '/src/main.tsx',
  '/src/App.tsx'
];

// 安装Service Worker并缓存资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// 激活新的Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('Removing old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// 拦截网络请求并提供缓存资源
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 缓存命中，返回缓存资源
        if (response) {
          return response;
        }
        
        // 缓存未命中，发起网络请求
        return fetch(event.request).catch(() => {
          // 网络请求失败，返回离线页面
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
          return null;
        });
      })
  );
});