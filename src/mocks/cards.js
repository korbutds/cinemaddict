import {generateRandomNumber} from '../utils.js';

const DESCRIPTION_LIMIT_MIN = 1;
const DESCRIPTION_LIMIT_MAX = 3;

const YEARS_LIMIT_MIN = 2010;
const YEARS_LIMIT_MAX = 2019;

const RATING_LIMIT_MIN = 0.1;
const RATING_LIMIT_MAX = 10;

const HOURS_LIMIT_MIN = 1;
const HOURS_LIMIT_MAX = 5;

const MINUTES_LIMIT_MIN = 0;
const MINUTES_LIMIT_MAX = 59;

const COMMENTS_LIMIT_MIN = 0;
const COMMENTS_LIMIT_MAX = 15;

const IMAGES = [
  `./images/posters/three-friends.jpg`,
  `./images/posters/moonrise.jpg`,
  `./images/posters/fuga-da-new-york.jpg`,
  `./images/posters/blue-blazes.jpg`,
  `./images/posters/accused.jpg`,
  `./images/posters/blackmail.jpg`
];

const TITLES = [
  `Lorem ipsum rutrum quisque malesuada donec malesuada`,
  `Lorem ipsum ligula risus sodales commodo sit`,
  `Lorem ipsum sagittis fusce, sodales magna mauris`,
  `Lorem ipsum vivamus ipsum vitae maecenas et`,
  `Lorem ipsum maecenas: ligula justo arcu porta`,
  `Lorem ipsum at: arcu, tempus urna vivamus`,
  `Lorem, ipsum pharetra quam ut pharetra duis`,
  `Inani utroque ad eos. Eam te veri.`,
  `Lorem ipsum dolor sit amet, at eam.`,
  `Lorem ipsum dolor sit amet, malis harum.`,
  `Lorem ipsum dolor sit amet, principes signiferumque.`,
  `Aliquam tincidunt, ex vitae laoreet lacinia, tortor.`,
  `Ius sumo prodesset ex, has ea consul.`,
  `Ut pro nemore essent omittam, per mollis.`
];

const GENRES = [
  `Comedy`,
  `Adventure`,
  `Musical`,
  `Crime`,
  `Western`,
  `Epic`,
  `Drama`
];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const generateRandomRatingValue = () => (Math.random() * (RATING_LIMIT_MAX - RATING_LIMIT_MIN) + RATING_LIMIT_MIN).toFixed(1);
const generateDescription = () => DESCRIPTIONS.sort(() => Math.random() - 0.5).slice(0, generateRandomNumber(DESCRIPTION_LIMIT_MIN, DESCRIPTION_LIMIT_MAX)).join(` `);

const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

const createNumberRange = (limit) => Array.from(new Array(limit), (_, i) => i);

const generateCard = () => (
  {
    title: getRandomArrayElement(TITLES),
    rating: generateRandomRatingValue(),
    year: generateRandomNumber(YEARS_LIMIT_MIN, YEARS_LIMIT_MAX),
    duration: {
      hours: generateRandomNumber(HOURS_LIMIT_MIN, HOURS_LIMIT_MAX),
      minutes: generateRandomNumber(MINUTES_LIMIT_MIN, MINUTES_LIMIT_MAX)
    },
    genre: getRandomArrayElement(GENRES),
    image: getRandomArrayElement(IMAGES),
    description: generateDescription(),
    comments: generateRandomNumber(COMMENTS_LIMIT_MIN, COMMENTS_LIMIT_MAX)
  }
);

export const generateCards = (limit) => createNumberRange(limit).map(generateCard);
