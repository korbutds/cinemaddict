import {createPopupTemplate, createCommentElement} from '../templates/popup';
import {createElement} from '../utils.js';
import BaseComponent from './base';

export default class PopupComponent extends BaseComponent {
  constructor(data) {
    super(data);

    this._onClose = null;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onRatingChange = this._onRatingChange.bind(this);
    this._onCommentAdd = this._onCommentAdd.bind(this);
  }

  get template() {
    return createPopupTemplate(this._data);
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onClose === `function`) {
      this._onClose({comments: this._data.popup.commentsList, yourRating: this._data.popup.yourRating});
    }
  }

  _onRatingChange(evt) {
    this._data.popup.yourRating = evt.target.value;
    this._element.querySelector(`.film-details__user-rating`).textContent = `Your rate ${this._data.popup.yourRating}`;
  }

  _createComment(comment) {
    const template = createCommentElement(comment);
    return createElement(template);
  }

  _onCommentAdd(evt) {
    const inputElement = this._element.querySelector(`.film-details__comment-input`);
    const emojiElement = this._element.querySelector(`.film-details__emoji-list`);
    let emojiValue;
    if ((evt.keyCode === 13 && evt.ctrlKey) && inputElement.value) {
      emojiElement.querySelectorAll(`input`).forEach((item) => {
        if (item.checked) {
          emojiValue = item.value;
        }
      });
      this._data.popup.commentsList.push({text: inputElement.value, author: `Your comment`,
        date: new Date(), emoji: emojiValue});
      this._element.querySelector(`.film-details__comments-list`)
        .appendChild(this._createComment({text: inputElement.value, author: `Your comment`,
          date: new Date(), emoji: emojiValue}));
      inputElement.value = ``;
    }
  }

  createListeners() {
    if (this._element) {
      this
        ._element
        .querySelector(`.film-details__close-btn`)
        .addEventListener(`click`, this._onCloseButtonClick);

      this
        ._element
        .querySelectorAll(`.film-details__user-rating-input`)
        .forEach((input) => {
          input.addEventListener(`click`, this._onRatingChange);
        });

      this
        ._element
        .querySelector(`.film-details__comments-wrap`)
        .addEventListener(`keydown`, this._onCommentAdd);
    }
  }

  removeListeners() {
    this
      ._element
      .querySelector(`.film-details__close-btn`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);

    this
      ._element
      .querySelectorAll(`.film-details__user-rating-input`)
      .forEach((input) => {
        input.removeEventListener(`click`, this._onRatingChange);
      });

    this
      ._element
      .querySelector(`.film-details__comments-wrap`)
      .addEventListener(`keydown`, this._onCommentAdd);
  }

  update(data) {
    this._data.commentsAmount = data.comments.length;
    this._data.popup.commentsList = data.comments;
    this._data.popup.yourRating = data.yourRating;
  }
}
