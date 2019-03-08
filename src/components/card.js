import {createCardTemplate} from '../templates/cards';

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
    const newElement = document.createElement(`div`);
    newElement.innerHTML = this.template;
    this._element = newElement.firstChild;
    this._bind();
    return this._element;
  }
}
