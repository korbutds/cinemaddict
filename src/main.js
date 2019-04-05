import {generateCards} from './mocks/cards';
import {getFilteredCards, setFiltersCounts} from './lib/filters';
import {setUserRank} from './lib/user-rank';
import FILTER_DATA from './data/filter';
import FiltersComponent from './components/filters';
import CardsSectionsComponent from './components/cards-sections';
import StatisticsComponent from './components/statistics';

const CARDS_LIMIT_MAX = 21;
const mainElement = document.querySelector(`main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const userRankElement = document.querySelector(`.profile__rating`);
const searchElement = document.querySelector(`.search__field`);
let cardsList = generateCards(CARDS_LIMIT_MAX);
let filtersComponent;
let cardsSectionsComponent;
let statisticsComponent;

const updateCardsList = (updatedData, id) => {
  const index = cardsList.findIndex((item) => item.id === id);
  cardsList[index] = Object.assign({}, updatedData);
  setFiltersCounts(cardsList);
  userRankElement.innerHTML = setUserRank(cardsList.filter((card) => card.isWatched).length);
};

const onFilterSelect = (id) => {
  if (cardsSectionsComponent._element) {
    cardsSectionsComponent.update(getFilteredCards(cardsList)[id]());
    searchElement.value = ``;
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
  searchElement.value = ``;
});

searchElement.addEventListener(`input`, (evt) => {
  if (evt.target.value) {
    cardsSectionsComponent.onSearch(evt.target.value);
  } else {
    cardsSectionsComponent.updateMainBlockElement();
  }
});

footerStatisticsElement.innerHTML = `${cardsList.length} movies inside`;
userRankElement.innerHTML = setUserRank(cardsList.filter((card) => card.isWatched).length);
