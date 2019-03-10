import {createCardTemplate} from '../templates/cards';
import Initial from './initial';

export default class Card extends Initial {
  constructor(data) {
    super(data);

    this._onClick = null;
    this._onCommentsClick = this._onCommentsClick.bind(this);
  }

  get template() {
    return createCardTemplate(this._data);
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  _onCommentsClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  createListeners() {
    if (this._element) {
      this
        ._element
        .querySelector(`.film-card__comments`)
        .addEventListener(`click`, this._onCommentsClick);
    }
  }
}
