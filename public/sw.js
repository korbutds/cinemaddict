const CACHE_NAME = `MOOWLE`;

self.addEventListener(`install`, (evt) => {
  const openCache = caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll([
        `./`,
        `./index.html`,
        `./bundle.js`,
        `./css/main.css`,
        `./css/normalize.css`,

        `./images/background.png`,

        `./images/icon-favorite.svg`,
        `./images/icon-watched.svg`,
        `./images/icon-watchlist.svg`,

        `./images/icon-favorite.png`,
        `./images/icon-watched.png`,
        `./images/icon-watchlist.png`,

        `./images/posters/accused.jpg`,
        `./images/posters/blackmail.jpg`,
        `./images/posters/blue-blazes.jpg`,
        `./images/posters/fuga-da-new-york.jpg`,
        `./images/posters/moonrise.jpg`,
        `./images/posters/three-friends.jpg`,
      ]);
    });
  evt.waitUntil(openCache);
});

self.addEventListener(`fetch`, (evt) => {
  console.log(`Handling fetch event for`, evt.request.url);
  evt.respondWith(
      caches.match(evt.request)
        .then((response) => {
          return response ? response : fetch(evt.request);
        })
        .catch((err) => {
          throw err;
        })
  );
});
