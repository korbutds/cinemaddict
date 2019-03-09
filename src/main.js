import {generateRandomNumber} from './utils';
import {generateCards} from './mocks/cards';
import FILTER_DATA from './data/filter';

import Card from './components/card';
import CardFeatured from './components/card-featured';
import Filter from './components/filter';
import Popup from './components/popup';

const CARDS_LIMIT_MIN = 2;
const CARDS_LIMIT_MAX = 7;

const filmsMainElement = document.querySelector(`.films-list .films-list__container`);
const filmsTopRatedElement = document.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);
const filmsMostCommentedElement = document.querySelector(`.films-list--extra:nth-child(3) .films-list__container`);
const bodyElement = document.querySelector(`body`);
const mainElement = document.querySelector(`main`);

const setEventListeners = (cardComponent, popupComponent, popupElement) => {
  cardComponent.onClick = () => {
    popupComponent.render();
    bodyElement.appendChild(popupElement);
  };
  popupComponent.onClose = () => {
    popupComponent.unrender();
    bodyElement.removeChild(popupElement);
  };
};

const addFeaturedCards = (limit, container) => {
  generateCards(limit).forEach((data) => {
    const cardFeaturedComponent = new CardFeatured(data);
    const cardFeaturedElement = cardFeaturedComponent.render();
    const popupComponent = new Popup(data);
    const popupElement = popupComponent.render();
    setEventListeners(cardFeaturedComponent, popupComponent, popupElement);
    container.appendChild(cardFeaturedElement);
  });
};

const addCards = (limit, container) => {
  generateCards(limit).forEach((data) => {
    const cardComponent = new Card(data);
    const cardElement = cardComponent.render();
    const popupComponent = new Popup(data);
    const popupElement = popupComponent.render();
    setEventListeners(cardComponent, popupComponent, popupElement);
    container.appendChild(cardElement);
  });
};

const addFilter = (data) => {
  const filterComponent = new Filter(data);
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
