import {generateRandomNumber} from '../utils.js';

const AMOUNT_LIMIT_MIN = 0;
const AMOUNT_LIMIT_MAX = 100;

export default [
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
    count: generateRandomNumber(AMOUNT_LIMIT_MIN, AMOUNT_LIMIT_MAX),
    isCountable: true,
    isAdditional: false
  },
  {
    href: `#history`,
    isActive: false,
    title: `History`,
    count: generateRandomNumber(AMOUNT_LIMIT_MIN, AMOUNT_LIMIT_MAX),
    isCountable: true,
    isAdditional: false
  },
  {
    href: `#favorites`,
    isActive: false,
    title: `Favorites`,
    count: generateRandomNumber(AMOUNT_LIMIT_MIN, AMOUNT_LIMIT_MAX),
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
