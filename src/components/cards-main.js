import CardMainComponent from './card-main';
import CardsComponent from './cards';

export default class CardsMainComponent extends CardsComponent {
  _setComponent(card) {
    return new CardMainComponent(card);
  }

  _filterData() {
    return this._data;
  }
}
