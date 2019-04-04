import BaseComponent from './base';
import CardsSectionComponent from './cards-section';
import {createCardsSectionsTemplate} from '../templates/cards';

export default class CardsSectionsComponent extends BaseComponent {
  constructor(data) {
    super(data);
    this._initialCount = 5;
    this._showMoreStep = 5;
    this._mainComponent = null;
    this._featuredByCommentsComponent = null;
    this._featuredByRatingComponent = null;
    this._showMoreButtonStatus = true;
    this._onShowMoreClick = this._onShowMoreClick.bind(this);
  }

  get template() {
    return createCardsSectionsTemplate();
  }

  set onChange(fn) {
    this._onChange = fn;
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

  _updateMainBlockElement() {
    this._element.querySelector(`#films-main-list`).removeChild(this._mainComponent._element);
    this._mainComponent.unrender();
    this._element.querySelector(`#films-main-list`)
      .insertBefore(this._mainComponent.render(this._filteredData.slice(0, this._initialCount), this._getNewCardElement), this._element.querySelector(`.films-list__show-more`));
  }

  _onShowMoreClick() {
    this._initialCount = (this._filteredData.length > (this._initialCount + this._showMoreStep))
      ? this._initialCount += this._showMoreStep
      : this._filteredData.length;
    if (this._initialCount === this._filteredData.length) {
      this._showMoreButtonStatus = false;
      this._element.querySelector(`.films-list__show-more`).classList.add(`visually-hidden`);
    }
    this._updateMainBlockElement();
  }

  _updateComponent(component, updatedData, id, controls) {
    const componentIndex = component.components.findIndex((item) => item._data.id === id);
    if (componentIndex !== -1) {
      component.components[componentIndex].update(updatedData, controls);
    }
  }

  createListeners() {
    this._element.querySelector(`.films-list__show-more`)
      .addEventListener(`click`, this._onShowMoreClick);
  }

  removeListeners() {
    this._element.querySelector(`.films-list__show-more`)
      .addEventListener(`click`, this._onShowMoreClick);
  }

  render() {
    const element = super.render();
    this._filteredData = this._data;
    const noControls = {description: false, controls: false};
    const updateData = (updatedData, id) => {
      const index = this._data.findIndex((item) => item.id === id);
      this._data[index] = Object.assign({}, updatedData);
      if (typeof this._onChange === `function`) {
        this._onChange(this._data[index], id);
      }
      this._updateComponent(this._mainComponent, updatedData, id);
      this._updateComponent(this._featuredByCommentsComponent, updatedData, id, noControls);
      this._updateComponent(this._featuredByRatingComponent, updatedData, id, noControls);
    };
    this._mainComponent = new CardsSectionComponent(this._data);
    this._featuredByCommentsComponent = new CardsSectionComponent(this._data);
    this._featuredByRatingComponent = new CardsSectionComponent(this._data);

    element.querySelector(`#films-main-list`)
      .insertBefore(this._mainComponent.render(this._data.slice(0, this._initialCount)), element.querySelector(`.films-list__show-more`));
    this._mainComponent.onChange = updateData;

    element.querySelector(`#films-rated-list`)
      .insertAdjacentElement(`beforeend`, this._featuredByRatingComponent.render(this._filterCardsByRating(), noControls));
    this._featuredByRatingComponent.onChange = updateData;

    element.querySelector(`#films-commented-list`)
      .insertAdjacentElement(`beforeend`, this._featuredByCommentsComponent.render(this._filterCardsByComments(), noControls));
    this._featuredByCommentsComponent.onChange = updateData;
    return element;
  }

  update(filteredData) {
    this._initialCount = this._showMoreStep;
    this._filteredData = filteredData;
    if (!this._showMoreButtonStatus) {
      this._showMoreButtonStatus = true;
      this._element.querySelector(`.films-list__show-more`).classList.remove(`visually-hidden`);
    }
    this._updateMainBlockElement();
  }
}
