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

  _onMarkAsWatchedButtonClick() {
    const isWatched = !this._state.isWatched;
    this.setState({
      isWatched,
    });
    this._data.isWatched = this._state.isWatched;
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
  }
}
