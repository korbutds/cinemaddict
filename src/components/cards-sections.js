import BaseComponent from './base';
import CardMainComponent from './card-main';
import CardsSectionComponent from './cards-section';
import CardFeaturedComponent from './card-featured';
import {createCardsSectionsTemplate} from '../templates/cards';

export default class CardsSectionsComponent extends BaseComponent {
  constructor(data) {
    super(data);
    this._mainComponent = null;
    this._featuredByCommentsComponent = null;
    this._featuredByRatingComponent = null;
  }

  get template() {
    return createCardsSectionsTemplate();
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  _getNewCardElement(card) {
    return new CardMainComponent(card);
  }

  _getNewCardFeaturedElement(card) {
    return new CardFeaturedComponent(card);
  }

  _filterCardsByComments() {
    const filteredData = this._data.slice();
    return filteredData.sort(function (a, b) {
      return b.commentsAmount - a.commentsAmount;
    }).slice(0, 2);
  }

  _filterCardsByRating() {
    const filteredData = this._data.slice();
    return filteredData.sort(function (a, b) {
      return b.rating - a.rating;
    }).slice(0, 2);
  }

  render() {
    const element = super.render();
    const updateData = (updatedData) => {
      this._data = updatedData;
      if (typeof this._onChange === `function`) {
        this._onChange(this._data);
      }
    };
    this._mainComponent = new CardsSectionComponent(this._data);
    this._featuredByCommentsComponent = new CardsSectionComponent(this._data);
    this._featuredByRatingComponent = new CardsSectionComponent(this._data);

    element.querySelector(`#films-main-list`)
      .insertBefore(this._mainComponent.render(this._data, this._getNewCardElement), element.querySelector(`.films-list__show-more`));
    this._mainComponent.onChange = updateData;

    element.querySelector(`#films-rated-list`)
      .insertAdjacentElement(`beforeend`, this._featuredByRatingComponent.render(this._filterCardsByRating(), this._getNewCardFeaturedElement));
    this._featuredByRatingComponent.onChange = updateData;

    element.querySelector(`#films-commented-list`)
      .insertAdjacentElement(`beforeend`, this._featuredByCommentsComponent.render(this._filterCardsByComments(), this._getNewCardFeaturedElement));
    this._featuredByCommentsComponent.onChange = updateData;
    return element;
  }
}
