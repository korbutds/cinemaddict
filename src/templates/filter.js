import {generateRandomNumber} from '../utils.js';

const AMOUNT_LIMIT_MIN = 0;
const AMOUNT_LIMIT_MAX = 100;

const filters = [
  {
    href: `#all`,
    activation: true,
    title: `All movies`,
    amount: false,
    additional: false
  },
  {
    href: `#watchlist`,
    activation: false,
    title: `Watchlist`,
    amount: true,
    additional: false
  },
  {
    href: `#history`,
    activation: false,
    title: `History`,
    amount: true,
    additional: false
  },
  {
    href: `#favorites`,
    activation: false,
    title: `Favorites`,
    amount: true,
    additional: false
  },
  {
    href: `#stats`,
    activation: false,
    title: `Stats`,
    amount: false,
    additional: true
  }
];

export const createFilterTemplate = () => (
  filters.map((filter) => (
    `<a href="${filter.href}"
      class="main-navigation__item
      ${filter.activation ? `main-navigation__item--active` : ``}
      ${filter.additional ? `main-navigation__item--additional` : ``}">
        ${filter.title}
        ${filter.amount ? `<span class="main-navigation__item-count">${generateRandomNumber(AMOUNT_LIMIT_MIN, AMOUNT_LIMIT_MAX)}</span>` : ``}
    </a>`
  )).join(``)
);
