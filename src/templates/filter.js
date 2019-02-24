import {generateRandomNumber} from '../utils.js';

const AmountLimit = {
  MIN: 0,
  MAX: 100
};

export const createFilterTemplate = () => (
  `<a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${generateRandomNumber(AmountLimit.MIN, AmountLimit.MAX)}</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${generateRandomNumber(AmountLimit.MIN, AmountLimit.MAX)}</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${generateRandomNumber(AmountLimit.MIN, AmountLimit.MAX)}</span></a>
  <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>`
);
