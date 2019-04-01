import {createCardTemplate} from '../templates/cards';
import BaseComponent from './base';

export default class CardMainComponent extends BaseComponent {
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

  removeListeners() {
    if (this._element) {
      this
        ._element
        .querySelector(`.film-card__comments`)
        .removeEventListener(`click`, this._onCommentsClick);
    }
  }

  update(data) {
    const commentsAmount = data.comments.length;
    this._data.commentsAmount = commentsAmount;
    this._data.popup.commentsList = data.comments;
    this._data.popup.yourRating = data.yourRating;
    this._element.querySelector(`.film-card__comments`).textContent =
      `${commentsAmount} ${commentsAmount === 1 ? `comment` : `comments`}`;
  }
}
