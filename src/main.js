import {generateRandomNumber} from './utils.js';
import {generateCards} from './mocks/cards.js';
import {createCardsTemplate} from './templates/cards.js';
import {createFilterTemplate} from './templates/filter.js';

const AmountLimit = {
  MIN: 2,
  MAX: 7
};

const filmsMainElement = document.querySelector(`.films-list .films-list__container`);
const filmsTopRatedElement = document.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);
const filmsMostCommentedElement = document.querySelector(`.films-list--extra:nth-child(3) .films-list__container`);
const filterElement = document.querySelector(`.main-navigation`);

const addFilterClickEventListener = () => {
  document.querySelectorAll(`.main-navigation__item:not(.main-navigation__item--additional)`).forEach((element) => {
    element.addEventListener(`click`, () => {
      filmsMainElement.innerHTML = createCardsTemplate(generateCards(generateRandomNumber(AmountLimit.MIN, AmountLimit.MAX)));
    });
  });
};

filmsMainElement.innerHTML = createCardsTemplate(generateCards(AmountLimit.MAX));
filmsTopRatedElement.innerHTML = createCardsTemplate(generateCards(AmountLimit.MIN),
    {description: false, controls: false});
filmsMostCommentedElement.innerHTML = createCardsTemplate(generateCards(AmountLimit.MIN),
    {description: false, controls: false});
filterElement.innerHTML = createFilterTemplate();

addFilterClickEventListener();
