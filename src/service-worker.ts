// Service Worker实现本地离线功能，支持PWA特性
const CACHE_NAME = 'pet-collection-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/index.css'
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

// 激活新的Service Worker并清理旧缓存
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
    }).then(() => {
      // 允许Service Worker立即获得控制权
      return self.clients.claim();
    })
  );
});

// 拦截网络请求并提供缓存资源
self.addEventListener('fetch', (event) => {
  // 忽略DevTools请求
  if (event.request.url.includes('chrome-extension://')) {
    return;
  }
  
  // 对于导航请求，返回index.html
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // 首先尝试网络请求
          const networkResponse = await fetch(event.request);
          // 更新缓存
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        } catch (error) {
          // 网络请求失败，返回缓存的index.html
          const cachedResponse = await caches.match('/');
          return cachedResponse || new Response('Offline', {
            status: 200,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
      })()
    );
    return;
  }

  // 对于静态资源，使用缓存优先策略
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // 缓存命中，返回缓存资源
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // 缓存未命中，发起网络请求并缓存结果
        return fetch(event.request).then((networkResponse) => {
          // 只缓存成功的响应
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          // 网络请求失败，返回默认图像或错误响应
          if (event.request.headers.get('accept')?.includes('image/')) {
            return new Response('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%23e5e7eb"/><text x="60" y="60" font-family="Arial" font-size="16" text-anchor="middle" dominant-baseline="middle" fill="%236b7280">离线</text></svg>', {
              headers: { 'Content-Type': 'image/svg+xml' }
            });
          }
          return new Response('离线状态', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
  );
});

// 处理推送通知
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/favicon.ico',
      badge: '/favicon.ico'
    });
  }
});