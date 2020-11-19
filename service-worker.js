importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox) {
     console.log(`Workbox berhasil dimuat`);
     workbox.precaching.precacheAndRoute([
        { url: '/', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/css/materialize.min.css', revision: '1' },
        { url: '/css/main.css', revision: '1' },
        { url: '/js/materialize.min.js', revision: '1' },
        { url: '/js/api.js', revision: '1' },
        { url: '/js/db.js', revision: '1' },
        { url: '/js/idb.js', revision: '1' },
        { url: '/js/save-button.js', revision: '1' },
        { url: '/js/sw.js', revision: '1' },
        { url: '/nav.html', revision: '3' },
        { url: '/index.html', revision: '3' },
        { url: '/detil-match.html', revision: '1' },
        { url: '/detil-team.html', revision: '1' },
        { url: '/component/allTeam.js', revision: '1' },
        { url: '/component/detailMatch.js', revision: '1' },
        { url: '/component/detailTeam.js', revision: '1' },
        { url: '/component/matches.js', revision: '1' },
        { url: '/component/showKlasement.js', revision: '1' },
    ]);

    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'fonts-google',
        })
    );

    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images',
            plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            }),
            ],
        }),
    );

    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'Premiere-League-v1'
        })
    );
} else {
    console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message !';
    }
    var options = {
      body: body,
      icon: 'assets/icon/icon-96.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
