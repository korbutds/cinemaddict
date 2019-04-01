import {generateCards} from './mocks/cards';
import FILTER_DATA from './data/filter';
import FiltersComponent from './components/filters';
import CardsSectionsComponent from './components/cards-sections';

const CARDS_LIMIT_MAX = 7;
const mainElement = document.querySelector(`main`);
let cardsList = generateCards(CARDS_LIMIT_MAX);
let filtersComponent;
let cardsSectionsComponent;

const updateCardsList = (updatedCards) => {
  cardsList = updatedCards;
};

const addFilters = () => {
  filtersComponent = new FiltersComponent(FILTER_DATA);
  mainElement.insertBefore(filtersComponent.render(), mainElement.firstChild);
};

const addCards = () => {
  cardsSectionsComponent = new CardsSectionsComponent(cardsList);
  mainElement.appendChild(cardsSectionsComponent.render());
  cardsSectionsComponent.onChange = updateCardsList;
};

cardsList.forEach((card, index) => {
  card.id = index;
});

addFilters();
addCards();
