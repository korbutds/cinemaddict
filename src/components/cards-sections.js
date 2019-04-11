import BaseComponent from './base';
import CardsSectionComponent from './cards-section';
import {createCardsSectionsTemplate} from '../templates/cards';

const SHOW_MORE_STEP = 5;
const FEATURED_CARDS_AMOUNT = 2;

export default class CardsSectionsComponent extends BaseComponent {
  constructor(data) {
    super(data);
    this._initialCount = SHOW_MORE_STEP;
    this._showMoreStep = SHOW_MORE_STEP;
    this._allCardsSectionComponent = null;
    this._featuredByCommentsComponent = null;
    this._featuredByRatingComponent = null;
    this._showMoreButtonStatus = true;
    this._onShowMoreClick = this._onShowMoreClick.bind(this);
  }

  get template() {
    return createCardsSectionsTemplate();
  }

  set onCardsChange(fn) {
    this._onCardsChange = fn;
  }

  set onCommentSubmit(fn) {
    this._onCommentSubmit = fn;
  }

  set onRatingSubmit(fn) {
    this._onRatingSubmit = fn;
  }

  _filterCardsBy(attribute) {
    return this
      ._data
      .slice()
      .sort((a, b) => b[attribute] - a[attribute])
      .slice(0, FEATURED_CARDS_AMOUNT);
  }

  _replaceMainBlockElements(data) {
    this._element.querySelector(`#films-main-list`).removeChild(this._allCardsSectionComponent._element);
    this._allCardsSectionComponent.unrender();
    this._element.querySelector(`#films-main-list`)
      .insertBefore(this._allCardsSectionComponent.render(data, this._getNewCardElement), this._element.querySelector(`.films-list__show-more`));
  }

  _onShowMoreClick() {
    if (this._filteredData.length > (this._initialCount + this._showMoreStep)) {
      this._initialCount += this._showMoreStep;
    } else {
      this._initialCount = this._filteredData.length;
    }
    if (this._initialCount === this._filteredData.length) {
      this._showMoreButtonStatus = false;
      this._element.querySelector(`.films-list__show-more`).classList.add(`visually-hidden`);
    }
    this.updateMainBlockElement();
  }

  _updateComponent(component, updatedData, id) {
    const componentIndex = component.components.findIndex((item) => item._data.id === id);
    if (componentIndex !== -1) {
      component.components[componentIndex].update(updatedData);
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

    const noControls = {value: false, description: false, controls: false};
    const controls = {value: true, description: true, controls: true};

    const updateData = (updatedData, id) => {
      const index = this._data.findIndex((item) => item.id === id);
      this._data[index] = Object.assign({}, updatedData);
      if (typeof this._onCardsChange === `function`) {
        this._onCardsChange(this._data[index], id);
      }
      this._updateComponent(this._allCardsSectionComponent, updatedData, id);
      this._updateComponent(this._featuredByCommentsComponent, updatedData, id);
      this._updateComponent(this._featuredByRatingComponent, updatedData, id);
    };

    const submitComment = (newData, id, popup) => {
      const index = this._data.findIndex((item) => item.id === id);
      this._data[index] = Object.assign({}, newData);
      if (typeof this._onCommentSubmit === `function`) {
        this._onCommentSubmit(this._data[index], id, popup);
      }
    };

    const submitRating = (newData, id, popup) => {
      const index = this._data.findIndex((item) => item.id === id);
      this._data[index] = Object.assign({}, newData);
      if (typeof this._onRatingSubmit === `function`) {
        this._onRatingSubmit(this._data[index], id, popup);
      }
    };

    this._allCardsSectionComponent = new CardsSectionComponent(this._data, controls);
    this._featuredByCommentsComponent = new CardsSectionComponent(this._data, noControls);
    this._featuredByRatingComponent = new CardsSectionComponent(this._data, noControls);

    element.querySelector(`#films-main-list`)
      .insertBefore(this._allCardsSectionComponent.render(this._data.slice(0, this._initialCount)), element.querySelector(`.films-list__show-more`));
    element.querySelector(`#films-rated-list`)
      .insertAdjacentElement(`beforeend`, this._featuredByRatingComponent.render(this._filterCardsBy(`rating`), noControls));

    element.querySelector(`#films-commented-list`)
      .insertAdjacentElement(`beforeend`, this._featuredByCommentsComponent.render(this._filterCardsBy(`commentsAmount`), noControls));

    this._allCardsSectionComponent.onCardChange = updateData;
    this._allCardsSectionComponent.onCommentSubmit = submitComment;
    this._allCardsSectionComponent.onRatingSubmit = submitRating;

    this._featuredByRatingComponent.onCardChange = updateData;
    this._featuredByRatingComponent.onCommentSubmit = submitComment;
    this._featuredByRatingComponent.onRatingSubmit = submitRating;

    this._featuredByCommentsComponent.onCardChange = updateData;
    this._featuredByCommentsComponent.onCommentSubmit = submitComment;
    this._featuredByCommentsComponent.onRatingSubmit = submitRating;

    return element;
  }

  onSearch(value) {
    const initialData = this._data.slice();
    const resultData = initialData
      .filter((item) => item.title.toLowerCase().search(value.toLowerCase()) !== -1);
    this._replaceMainBlockElements(resultData);
    this._element.querySelector(`.films-list__show-more`).classList.add(`visually-hidden`);
  }

  updateMainBlockElement() {
    if (this._initialCount < this._filteredData.length) {
      this._showMoreButtonStatus = true;
      this._element.querySelector(`.films-list__show-more`).classList.remove(`visually-hidden`);
    } else {
      this._showMoreButtonStatus = false;
      this._element.querySelector(`.films-list__show-more`).classList.add(`visually-hidden`);
    }
    this._replaceMainBlockElements(this._filteredData.slice(0, this._initialCount));
  }

  update(filteredData) {
    this._initialCount = this._showMoreStep;
    this._filteredData = filteredData;
    this.updateMainBlockElement();
  }
}
