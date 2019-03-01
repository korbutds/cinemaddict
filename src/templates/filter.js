import {generateRandomNumber} from '../utils.js';

const AMOUNT_LIMIT_MIN = 0;
const AMOUNT_LIMIT_MAX = 100;

const filters = [
  {
    href: `#all`,
    isActive: true,
    title: `All movies`,
    isCountable: false,
    isAdditional: false
  },
  {
    href: `#watchlist`,
    isActive: false,
    title: `Watchlist`,
    isCountable: true,
    isAdditional: false
  },
  {
    href: `#history`,
    isActive: false,
    title: `History`,
    isCountable: true,
    isAdditional: false
  },
  {
    href: `#favorites`,
    isActive: false,
    title: `Favorites`,
    isCountable: true,
    isAdditional: false
  },
  {
    href: `#stats`,
    isActive: false,
    title: `Stats`,
    isCountable: false,
    isAdditional: true
  }
];

export const createFilterTemplate = () => (
  filters.map((filter) => (
    `<a href="${filter.href}"
      class="main-navigation__item
      ${filter.isActive ? `main-navigation__item--active` : ``}
      ${filter.isAdditional ? `main-navigation__item--additional` : ``}">
        ${filter.title}
        ${filter.isCountable ? `<span class="main-navigation__item-count">${generateRandomNumber(AMOUNT_LIMIT_MIN, AMOUNT_LIMIT_MAX)}</span>` : ``}
    </a>`
  )).join(``)
);
