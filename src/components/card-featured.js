import {createCardTemplate} from '../templates/cards';
import CardMainComponent from './card-main';
import {createElement} from '../lib/element';

export default class CardFeaturedComponent extends CardMainComponent {
  get template() {
    return createCardTemplate(this._data, {
      description: false,
      controls: false
    });
  }

  createListeners() {
    if (this._element) {
      this
        ._element
        .querySelector(`.film-card__comments`)
        .addEventListener(`click`, this._onCommentsClick);
    }
  }

  removeListeners() {
    if (this._element) {
      this
        ._element
        .querySelector(`.film-card__comments`)
        .removeEventListener(`click`, this._onCommentsClick);
    }
  }

  render() {
    if (!this._state.isRendered) {
      this._element = createElement(this.template);
      this.createListeners();
      this._state.isRendered = true;
    }
    return this._element;
  }
}
