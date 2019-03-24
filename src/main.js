import {generateRandomNumber} from './utils';
import {generateCards} from './mocks/cards';
import FILTER_DATA from './data/filter';

import CardComponent from './components/card';
import CardFeaturedComponent from './components/card-featured';
import FilterComponent from './components/filter';
import PopupComponent from './components/popup';

const CARDS_LIMIT_MIN = 2;
const CARDS_LIMIT_MAX = 7;

const filmsMainElement = document.querySelector(`.films-list .films-list__container`);
const filmsTopRatedElement = document.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);
const filmsMostCommentedElement = document.querySelector(`.films-list--extra:nth-child(3) .films-list__container`);
const bodyElement = document.querySelector(`body`);
const mainElement = document.querySelector(`main`);

const setEventListeners = (cardComponent, popupComponent) => {
  cardComponent.onClick = () => {
    popupComponent.render();
    bodyElement.appendChild(popupComponent.element);
  };
  popupComponent.onClose = (newData) => {
    cardComponent.update({comments: newData.comments, yourRating: newData.yourRating});
    bodyElement.removeChild(popupComponent.element);
    popupComponent.unrender();
  };
};

const addFeaturedCards = (limit, container) => {
  generateCards(limit).forEach((data) => {
    const cardFeaturedComponent = new CardFeaturedComponent(data);
    const cardFeaturedElement = cardFeaturedComponent.render();
    const popupComponent = new PopupComponent(data);
    setEventListeners(cardFeaturedComponent, popupComponent);
    container.appendChild(cardFeaturedElement);
  });
};

const addCards = (limit, container) => {
  generateCards(limit).forEach((data) => {
    const cardComponent = new CardComponent(data);
    const cardElement = cardComponent.render();
    const popupComponent = new PopupComponent(data);
    const popupElement = popupComponent.render();
    setEventListeners(cardComponent, popupComponent, popupElement);
    container.appendChild(cardElement);
  });
};

const addFilter = (data) => {
  const filterComponent = new FilterComponent(data);
  const filterElement = filterComponent.render();
  mainElement.insertBefore(filterElement, mainElement.firstChild);
  filterComponent.onClick = () => {
    filmsMainElement.innerHTML = ``;
    addCards(generateRandomNumber(CARDS_LIMIT_MIN, CARDS_LIMIT_MAX), filmsMainElement);
  };
};

addCards(CARDS_LIMIT_MAX, filmsMainElement);
addFeaturedCards(CARDS_LIMIT_MIN, filmsTopRatedElement);
addFeaturedCards(CARDS_LIMIT_MIN, filmsMostCommentedElement);
addFilter(FILTER_DATA);
