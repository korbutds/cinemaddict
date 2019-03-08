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
const filterElement = document.querySelector(`.main-navigation`);
const bodyElement = document.querySelector(`body`);

const setEventListeners = (componentCard, componentPopup, elementPopup) => {
  componentCard.onClick = () => {
    componentPopup.render();
    bodyElement.appendChild(elementPopup);
  };
  componentPopup.onClose = () => {
    componentPopup.unrender();
    bodyElement.removeChild(elementPopup);
  };
};

const addFeaturedCards = (limit, container) => {
  generateCards(limit).forEach((data) => {
    const componentCardFeatured = new CardFeatured(data);
    const elementCardFeatured = componentCardFeatured.render();
    const componentPopup = new Popup(data);
    const elementPopup = componentPopup.render();
    setEventListeners(componentCardFeatured, componentPopup, elementPopup);
    container.appendChild(elementCardFeatured);
  });
};

const addCards = (limit, container) => {
  generateCards(limit).forEach((data) => {
    const componentCard = new Card(data);
    const elementCard = componentCard.render();
    const componentPopup = new Popup(data);
    const elementPopup = componentPopup.render();
    setEventListeners(componentCard, componentPopup, elementPopup);
    container.appendChild(elementCard);
  });
};

const addFilter = (data) => {
  const componentFilter = new Filter(data);
  const elementCard = componentFilter.render();
  elementCard.forEach((element) => {
    filterElement.appendChild(element);
  });
  componentFilter.onClick = () => {
    filmsMainElement.innerHTML = ``;
    addCards(generateRandomNumber(CARDS_LIMIT_MIN, CARDS_LIMIT_MAX), filmsMainElement);
  };
};

addCards(CARDS_LIMIT_MAX, filmsMainElement);
addFeaturedCards(CARDS_LIMIT_MIN, filmsTopRatedElement);
addFeaturedCards(CARDS_LIMIT_MIN, filmsMostCommentedElement);
addFilter(FILTER_DATA);
