import {generateCards} from './mocks/cards';
import {getFilteredCards, setFiltersCounts} from './lib/filters';
import {setUserRank} from './lib/user-rank';
import FILTER_DATA from './data/filter';
import FiltersComponent from './components/filters';
import CardsSectionsComponent from './components/cards-sections';
import StatisticsComponent from './components/statistics';

const CARDS_LIMIT_MAX = 7;
const mainElement = document.querySelector(`main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const userRankElement = document.querySelector(`.profile__rating`);
let cardsList = generateCards(CARDS_LIMIT_MAX);
let filtersComponent;
let cardsSectionsComponent;
let statisticsComponent;

const updateCardsList = (updatedCards) => {
  cardsList = updatedCards;
  setFiltersCounts(cardsList);
  setUserRank(cardsList.filter((card) => card.isWatched).length);
};

const onFilterSelect = (id) => {
  if (cardsSectionsComponent._element) {
    cardsSectionsComponent.update(getFilteredCards(cardsList)[id]());
  } else {
    statisticsComponent.unrender();
    mainElement.removeChild(mainElement.lastChild);
    addCards();
    cardsSectionsComponent.update(getFilteredCards(cardsList)[id]());
  }
};

const addFilters = () => {
  filtersComponent = new FiltersComponent(FILTER_DATA);
  mainElement.insertBefore(filtersComponent.render(), mainElement.firstChild);
  filtersComponent.onSelect = onFilterSelect;
  setFiltersCounts(cardsList);
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

document.querySelector(`#stats`).addEventListener(`click`, () => {
  cardsSectionsComponent.unrender();
  mainElement.removeChild(mainElement.lastChild);
  statisticsComponent = new StatisticsComponent(cardsList);
  mainElement.appendChild(statisticsComponent.render());
});

footerStatisticsElement.innerHTML = `${cardsList.length} movies inside`;
userRankElement.innerHTML = setUserRank(cardsList.filter((card) => card.isWatched).length);
