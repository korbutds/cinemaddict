import {generateRandomNumber} from '../utils.js';

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
  `Lorem, ipsum pharetra quam ut pharetra duis`
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
  `Lorem ipsum quisque, donec morbi sed pharetra massa et ultricies leo et magna, ipsum sapien, bibendum commodo fusce sagittis quam ipsum risus nulla: et.`,
  `Lorem ipsum mattis justo proin maecenas, morbi sapien massa sapien elementum lorem magna ornare, sapien lorem.`,
  `Lorem ipsum massa in adipiscing mattis nec nibh enim ornare molestie sodales mattis congue leo non magna proin, non tempus maecenas.`,
  `Lorem ipsum malesuada elementum amet ut quisque enim adipiscing gravida eros magna duis ornare rutrum cursus ipsum malesuada.`,
  `Lorem ipsum, nec gravida odio sodales congue nam justo, quisque ligula cursus nibh auctor: porta a arcu cursus fusce porttitor: cursus tempus enim.`,
  `Lorem ipsum quam, cursus lorem orci adipiscing - odio, ut in vivamus nec ligula eros elementum at.`,
  `Lorem ipsum porta porttitor nec odio nec nam, eget fusce lorem ultricies risus lorem, lectus vitae integer gravida ligula porttitor sit curabitur.`
];

const generateRandomRatingValue = () => {
  return (Math.random() * (RatingLimit.MAX - RatingLimit.MIN) + RatingLimit.MIN).toFixed(1);
};

const getRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const createRandomData = () => (
  {
    title: getRandomArrayElement(TITLES),
    rating: generateRandomRatingValue(),
    year: generateRandomNumber(YearsLimit.MIN, YearsLimit.MAX),
    duration: generateRandomNumber(HoursLimit.MIN, HoursLimit.MAX) + `h `
      + generateRandomNumber(MinutesLimit.MIN, MinutesLimit.MAX) + `m`,
    genre: getRandomArrayElement(GENRES),
    image: getRandomArrayElement(IMAGES),
    description: getRandomArrayElement(DESCRIPTIONS),
    comments: generateRandomNumber(CommentsLimit.MIN, CommentsLimit.MAX)
  }
);

const createNumberRange = (limit) => (
  Array.from(new Array(limit), (_, i) => i)
);

export const createCardsMockData = (limit) => (
  createNumberRange(limit).map(() => createRandomData())
);
