import {createCardTemplate} from '../templates/cards';
import {createElement} from '../utils';

export default class Card {
  constructor(data) {
    this._data = data;
    this._element = null;

    this._onClick = null;
    this._onCommentsClick = this._onCommentsClick.bind(this);
  }

  get element() {
    return this._element;
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

  _bind() {
    if (this._element) {
      this
        ._element
        .querySelector(`.film-card__comments`)
        .addEventListener(`click`, this._onCommentsClick);
    }
  }

  render() {
    this._element = createElement(this.template);
    this._bind();
    return this._element;
  }
}
