import {createCardTemplate} from '../templates/cards';
import {createElement} from '../lib/element';
import BaseComponent from './base';

export default class CardComponent extends BaseComponent {
  constructor(data) {
    super(data);

    this.setState({
      isOnWatchlist: data.isOnWatchlist,
      isWatched: data.isWatched,
      isFavorite: data.isFavorite
    });

    this._onClick = null;
    this._onCommentsClick = this._onCommentsClick.bind(this);

    this._onMarkAsWatchedButtonClick = this._onMarkAsWatchedButtonClick.bind(this);
    this._onAddToWatchListButtonClick = this._onAddToWatchListButtonClick.bind(this);
    this._onAddToFavoriteButtonClick = this._onAddToFavoriteButtonClick.bind(this);
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  set onAddToWatchList(fn) {
    this._onAddToWatchList = fn;
  }

  set onMarkAsWatched(fn) {
    this._onMarkAsWatched = fn;
  }

  set onAddToFavorite(fn) {
    this._onAddToFavorite = fn;
  }

  _onCommentsClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  _onMarkAsWatchedButtonClick(evt) {
    evt.preventDefault();
    const isWatched = !this._state.isWatched;
    this.setState({
      isWatched,
    });
    this._data.isWatched = this._state.isWatched;
    this._setButtonsOutline(this._element);
    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched(this._data);
    }
  }

  _onAddToWatchListButtonClick(evt) {
    evt.preventDefault();
    const isOnWatchlist = !this._state.isOnWatchlist;
    this.setState({
      isOnWatchlist,
    });
    this._data.isOnWatchlist = this._state.isOnWatchlist;
    this._setButtonsOutline(this._element);
    if (typeof this._onAddToWatchList === `function`) {
      this._onAddToWatchList(this._data);
    }
  }

  _onAddToFavoriteButtonClick(evt) {
    evt.preventDefault();
    const isFavorite = !this._state.isFavorite;
    this.setState({
      isFavorite,
    });
    this._data.isFavorite = this._state.isFavorite;
    this._setButtonsOutline(this._element);
    if (typeof this._onAddToFavorite === `function`) {
      this._onAddToFavorite(this._data);
    }
  }

  _setButtonsOutline(element) {
    element.querySelector(`.film-card__controls-item--mark-as-watched`).style.outline = this._state.isWatched ? `1px solid white` : ``;
    element.querySelector(`.film-card__controls-item--favorite`).style.outline = this._state.isFavorite ? `1px solid white` : ``;
    element.querySelector(`.film-card__controls-item--add-to-watchlist`).style.outline = this._state.isOnWatchlist ? `1px solid white` : ``;
  }

  createListeners() {
    if (this._element) {
      this
        ._element
        .querySelector(`.film-card__comments`)
        .addEventListener(`click`, this._onCommentsClick);
      if (this._controls) {
        this
          ._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
          .addEventListener(`click`, this._onAddToWatchListButtonClick);
        this
          ._element.querySelector(`.film-card__controls-item--mark-as-watched`)
          .addEventListener(`click`, this._onMarkAsWatchedButtonClick);
        this
          ._element.querySelector(`.film-card__controls-item--favorite`)
          .addEventListener(`click`, this._onAddToFavoriteButtonClick);
      }
    }
  }

  removeListeners() {
    if (this._element) {
      this
        ._element
        .querySelector(`.film-card__comments`)
        .removeEventListener(`click`, this._onCommentsClick);
      if (this._controls) {
        this
          ._element.querySelector(`.film-card__controls-item--add-to-watchlist`)
          .removeEventListener(`click`, this._onAddToWatchListButtonClick);
        this
          ._element.querySelector(`.film-card__controls-item--mark-as-watched`)
          .removeEventListener(`click`, this._onMarkAsWatchedButtonClick);
        this
          ._element.querySelector(`.film-card__controls-item--favorite`)
          .removeEventListener(`click`, this._onAddToFavoriteButtonClick);
      }
    }
  }

  update(data, controls) {
    super.update(data);
    this.setState({
      isOnWatchlist: this._data.isOnWatchlist,
      isWatched: this._data.isWatched,
      isFavorite: this._data.isFavorite
    });
    if (!controls) {
      this._setButtonsOutline(this._element);
    }
    this._element.querySelector(`.film-card__comments`).textContent =
      `${data.commentsAmount} ${data.commentsAmount === 1 ? `comment` : `comments`}`;
  }

  render(controls) {
    if (!this._state.isRendered) {
      this._controls = !controls;
      this._element = createElement(createCardTemplate(this._data, controls));
      this.createListeners();
      this._state.isRendered = true;
      if (!controls) {
        this._setButtonsOutline(this._element);
      }
    }
    return this._element;
  }
}
