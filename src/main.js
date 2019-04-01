import {generateCards} from './mocks/cards';
import FILTER_DATA from './data/filter';
import CardsMainComponent from './components/cards-main';
import CardsFeaturedByRatingComponent from './components/cards-featured-by-rating';
import CardsFeaturedByCommentsComponent from './components/cards-featured-by-comments';
import FiltersComponent from './components/filters';

const CARDS_LIMIT_MAX = 7;
const mainElement = document.querySelector(`main`);
let cardsList = generateCards(CARDS_LIMIT_MAX);
let filtersComponent;
let cardsMainComponent;
let cardsFeaturedByRatingComponent;
let cardsFeaturedByCommentsComponent;

const updateCardsList = (updatedCards) => {
  cardsList = updatedCards;
};

const addCardsMainComponent = () => {
  const containerElement = document.querySelector(`#films-main-list`);
  const referenceElement = document.querySelector(`.films-list__show-more`);
  cardsMainComponent = new CardsMainComponent(cardsList);
  containerElement.insertBefore(cardsMainComponent.render(), referenceElement);
  cardsMainComponent.onChange = updateCardsList;
};

const addCardsFeaturedByRatingComponent = () => {
  const containerElement = document.querySelector(`#films-rated-list`);
  cardsFeaturedByRatingComponent = new CardsFeaturedByRatingComponent(cardsList);
  containerElement.insertAdjacentElement(`beforeend`, cardsFeaturedByRatingComponent.render());
  cardsFeaturedByRatingComponent.onChange = updateCardsList;
};

const addCardsFeaturedByCommentsComponent = () => {
  const containerElement = document.querySelector(`#films-commented-list`);
  cardsFeaturedByCommentsComponent = new CardsFeaturedByCommentsComponent(cardsList);
  containerElement.insertAdjacentElement(`beforeend`, cardsFeaturedByCommentsComponent.render());
  cardsFeaturedByCommentsComponent.onChange = updateCardsList;
};


const addFilters = () => {
  filtersComponent = new FiltersComponent(FILTER_DATA);
  mainElement.insertBefore(filtersComponent.render(), mainElement.firstChild);
};

cardsList.forEach((card, index) => {
  card.id = index;
});
addFilters();
addCardsMainComponent();
addCardsFeaturedByRatingComponent();
addCardsFeaturedByCommentsComponent();
