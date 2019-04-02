export const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);
export const generateRandomBoolean = () => Math.random() >= 0.5;
export const generateRandomFixedValue = (min, max) => (Math.random() * (max - min) + min).toFixed(1);
export const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];
export const createNumberRange = (limit) => Array.from(new Array(limit), (_, i) => i + 1);

export const generateRandomArray = (array, amount) => array.sort(() => Math.random() - 0.5).slice(0, amount).join(` `);

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const getFilteredCards = (cardsList) => {
  return {
    'all': () => cardsList,
    'watchlist': () => cardsList
        .filter((card) => card.isOnWatchlist),
    'history': () => cardsList
        .filter((card) => card.isWatched),
    'favorites': () => cardsList
          .filter((card) => card.isFavorite)
  };
};
