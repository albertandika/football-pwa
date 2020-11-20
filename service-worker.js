importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');


if (workbox) {
    console.log('Yeay! workbox is loaded');
} else {
    console.log('Opps! Workbox is not loaded');
}


workbox.precaching.precacheAndRoute([
    { url: '/', revision: '2' },
    { url: '/manifest.json', revision: '2' },
    { url: '/css/materialize.min.css', revision: '2' },
    { url: '/css/main.css', revision: '2' },
    { url: '/js/materialize.min.js', revision: '2' },
    { url: '/js/api.js', revision: '3' },
    { url: '/js/db.js', revision: '2' },
    { url: '/js/idb.js', revision: '2' },
    { url: '/js/nav.js', revision: '2' },
    { url: '/js/save-button.js', revision: '2' },
    { url: '/js/sw.js', revision: '2' },
    { url: '/nav.html', revision: '4' },
    { url: '/index.html', revision: '4' },
    { url: '/detil-match.html', revision: '2' },
    { url: '/detil-team.html', revision: '2' },
    { url: '/component/allTeam.js', revision: '2' },
    { url: '/component/detailMatch.js', revision: '2' },
    { url: '/component/detailTeam.js', revision: '2' },
    { url: '/component/matches.js', revision: '2' },
    { url: '/component/showKlasement.js', revision: '2' },
    { url: '/pages/home.html', revision: '2' },
    { url: '/pages/matches.html', revision: '2' },
    { url: '/pages/favorite.html', revision: '2' },
    { url: '/pages/klasemen.html', revision: '2' }
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'fonts-google',
    })
);

workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'api-football',
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
        cacheName: 'pages-Premiere-League-v1'
    })
)


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
