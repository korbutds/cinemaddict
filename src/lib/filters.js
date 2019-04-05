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

export const getFiltersCount = (cards) => {
  return {
    0: () => getFilteredCards(cards)[`watchlist`]().length,
    1: () => getFilteredCards(cards)[`history`]().length,
    2: () => getFilteredCards(cards)[`favorites`]().length
  };
};

export const setFiltersCounts = (cards) => {
  document.querySelectorAll(`.main-navigation__item-count`)
    .forEach((item, index) => {
      item.innerHTML = getFiltersCount(cards)[index]();
    });
};
