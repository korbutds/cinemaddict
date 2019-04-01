import CardFeaturedComponent from './card-featured';
import CardsComponent from './cards';

export default class CardsFeaturedByCommentsComponent extends CardsComponent {
  _setComponent(card) {
    return new CardFeaturedComponent(card);
  }

  _filterData() {
    const filteredData = this._data.slice();
    return filteredData.sort(function (a, b) {
      return b.commentsAmount - a.commentsAmount;
    }).slice(0, 2);
  }
}
