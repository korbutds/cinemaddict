import {createPopupTemplate, createCommentElement} from '../templates/popup';
import {createElement} from '../lib/element';
import BaseComponent from './base';

export default class PopupComponent extends BaseComponent {
  constructor(data) {
    super(data);

    this.setState({
      isOnWatchlist: data.isOnWatchlist,
      isWatched: data.isWatched,
      isFavorite: data.isFavorite
    });

    this._onClose = null;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onEscClick = this._onEscClick.bind(this);
    this._onRatingChange = this._onRatingChange.bind(this);
    this._onCommentAdd = this._onCommentAdd.bind(this);
    this._onCommentRemove = this._onCommentRemove.bind(this);
    this._onMarkAsWatchedButtonClick = this._onMarkAsWatchedButtonClick.bind(this);
    this._onAddToWatchListButtonClick = this._onAddToWatchListButtonClick.bind(this);
    this._onAddToFavoriteButtonClick = this._onAddToFavoriteButtonClick.bind(this);
  }

  get template() {
    return createPopupTemplate(this._data);
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  set onCommentSubmit(fn) {
    this._onCommentSubmit = fn;
  }

  _onMarkAsWatchedButtonClick() {
    const isWatched = !this._state.isWatched;
    this.setState({
      isWatched,
    });
    this._data.isWatched = this._state.isWatched;
    this._element.querySelector(`.film-details__watched-status`)
      .innerHTML = this._data.isWatched ? `Already watched` : `Will watch`;
  }

  _onAddToWatchListButtonClick() {
    const isOnWatchlist = !this._state.isOnWatchlist;
    this.setState({
      isOnWatchlist,
    });
    this._data.isOnWatchlist = this._state.isOnWatchlist;
  }

  _onAddToFavoriteButtonClick() {
    const isFavorite = !this._state.isFavorite;
    this.setState({
      isFavorite,
    });
    this._data.isFavorite = this._state.isFavorite;
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    this._data.commentsAmount = this._data.popup.commentsList.length;
    if (typeof this._onClose === `function`) {
      this._onClose(this._data);
    }
  }

  _onEscClick(evt) {
    if (evt.keyCode === 27) {
      this._data.commentsAmount = this._data.popup.commentsList.length;
      if (typeof this._onClose === `function`) {
        this._onClose(this._data);
      }
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

  _getEmojiValue() {
    const emojiElement = this._element.querySelector(`.film-details__emoji-list`);
    let emojiValue;
    emojiElement.querySelectorAll(`input`).forEach((item) => {
      if (item.checked) {
        emojiValue = item.value;
      }
    });
    return emojiValue;
  }

  _unblockComment() {
    const inputElement = this._element.querySelector(`.film-details__comment-input`);
    const emojiValue = this._getEmojiValue();
    inputElement.disabled = false;
    inputElement.style.border = `1px solid #979797`;
    this._element.querySelector(`.film-details__comments-list`)
      .appendChild(this._createComment({comment: inputElement.value, author: `Your comment`,
        date: new Date(), emotion: emojiValue}));
    this._element.querySelector(`.film-details__user-rating-controls`)
      .classList.remove(`visually-hidden`);
    this._element.querySelector(`.film-details__watched-status`)
      .innerHTML = this._data.isWatched ? `Already watched` : `Will watch`;
    this._element.querySelector(`.film-details__comments-count`).innerHTML = this._data.popup.commentsList.length;
    inputElement.value = ``;
  }

  _onCommentAdd(evt) {
    const inputElement = this._element.querySelector(`.film-details__comment-input`);
    if ((evt.keyCode === 13 && evt.ctrlKey) && inputElement.value) {
      const emojiValue = this._getEmojiValue();
      this._data.popup.commentsList.push({comment: inputElement.value, author: `Your comment`,
        date: new Date(), emotion: emojiValue});
      inputElement.disabled = true;
      inputElement.style.border = `3px solid #8B0000`;
      if (typeof this._onCommentSubmit === `function`) {
        this._onCommentSubmit(this._data, this._unblockComment);
      }
    }
  }

  _isYourComment() {
    return this._data.popup.commentsList.some((comment) => comment.author === `Your comment`);
  }

  _onCommentRemove() {
    if (this._isYourComment()) {
      const container = this._element.querySelector(`.film-details__comments-list`);
      this._data.popup.commentsList.pop();
      container.removeChild(container.querySelector(`.film-details__comment:last-child`));
      this._element.querySelector(`.film-details__comments-count`).innerHTML = this._data.popup.commentsList.length;
      if (!this._isYourComment()) {
        this._element.querySelector(`.film-details__user-rating-controls`)
          .classList.add(`visually-hidden`);
      }
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
      this
        ._element.querySelector(`#list`)
        .addEventListener(`change`, this._onAddToWatchListButtonClick);
      this
        ._element.querySelector(`#watched`)
        .addEventListener(`change`, this._onMarkAsWatchedButtonClick);
      this
        ._element.querySelector(`#favorite`)
        .addEventListener(`change`, this._onAddToFavoriteButtonClick);
      window.addEventListener(`keydown`, this._onEscClick);
      this
        ._element.querySelector(`.film-details__watched-reset`)
        .addEventListener(`click`, this._onCommentRemove);
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
      .removeEventListener(`keydown`, this._onCommentAdd);
    this
      ._element.querySelector(`#list`)
      .removeEventListener(`change`, this._onAddToWatchListButtonClick);
    this
      ._element.querySelector(`#watched`)
      .removeEventListener(`change`, this._onMarkAsWatchedButtonClick);
    this
      ._element.querySelector(`#favorite`)
      .removeEventListener(`change`, this._onAddToFavoriteButtonClick);
    window.removeEventListener(`keydown`, this._onEscClick);
    this
      ._element.querySelector(`.film-details__watched-reset`)
      .addEventListener(`click`, this._onCommentRemove);
  }
}
