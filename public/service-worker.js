// Cache name & offline file name
const CACHE_NAME = 'static-cache-v2';
const FILES_TO_CACHE = [ '/offline.html' ];

// Add offline.html file to the cache
self.addEventListener('install', (evt) => {
	evt.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(FILES_TO_CACHE);
		})
	);
});

// Remove any unused cache
self.addEventListener('activate', (evt) => {
	evt.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key !== CACHE_NAME) {
						return caches.delete(key);
					}
				})
			);
		})
	);
});

//If the user does not have an internet connection, the offline.html file will be sent to the user
self.addEventListener('fetch', (evt) => {
	if (evt.request.mode !== 'navigate') {
		return;
	}
	evt.respondWith(
		fetch(evt.request).catch(() => {
			return caches.open(CACHE_NAME).then((cache) => {
				return cache.match('offline.html');
			});
		})
	);
});
