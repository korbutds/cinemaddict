import {generateRandomNumber} from '../utils.js';

const descriptionLimit = {
  MIN: 1,
  MAX: 3
};

const YearsLimit = {
  MIN: 2010,
  MAX: 2019
};

const RatingLimit = {
  MIN: 0.1,
  MAX: 10
};

const HoursLimit = {
  MIN: 1,
  MAX: 5
};

const MinutesLimit = {
  MIN: 0,
  MAX: 59
};

const CommentsLimit = {
  MIN: 0,
  MAX: 15
};

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

const generateRandomRatingValue = () => (Math.random() * (RatingLimit.MAX - RatingLimit.MIN) + RatingLimit.MIN).toFixed(1);
const generateDescription = () => DESCRIPTIONS.sort(() => Math.random() - 0.5).slice(0, generateRandomNumber(descriptionLimit.MIN, descriptionLimit.MAX)).join(` `);

const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

const createNumberRange = (limit) => Array.from(new Array(limit), (_, i) => i);

const generateCard = () => (
  {
    title: getRandomArrayElement(TITLES),
    rating: generateRandomRatingValue(),
    year: generateRandomNumber(YearsLimit.MIN, YearsLimit.MAX),
    duration: {
      hours: generateRandomNumber(HoursLimit.MIN, HoursLimit.MAX),
      minutes: generateRandomNumber(MinutesLimit.MIN, MinutesLimit.MAX)
    },
    genre: getRandomArrayElement(GENRES),
    image: getRandomArrayElement(IMAGES),
    description: generateDescription(),
    comments: generateRandomNumber(CommentsLimit.MIN, CommentsLimit.MAX)
  }
);

export const generateCards = (limit) => (
  createNumberRange(limit).map(() => generateCard())
);
