import {createCardTemplate} from '../templates/cards';
import BaseComponent from './base';

const BUTTONS_CHECKED_BORDER = `1px solid white`;

const CommentsAmountText = {
  SINGULAR: `comment`,
  PLURAL: `comments`
};

export default class CardComponent extends BaseComponent {
  constructor(data, controls) {
    super(data);

    this.setState({
      isOnWatchlist: data.isOnWatchlist,
      isWatched: data.isWatched,
      isFavorite: data.isFavorite
    });

    this._withControls = controls.value;
    this._controls = controls;
    this._onClick = null;
    this._onCommentsClick = this._onCommentsClick.bind(this);

    this._onMarkAsWatchedButtonClick = this._onMarkAsWatchedButtonClick.bind(this);
    this._onAddToWatchListButtonClick = this._onAddToWatchListButtonClick.bind(this);
    this._onAddToFavoriteButtonClick = this._onAddToFavoriteButtonClick.bind(this);
  }

  get template() {
    return createCardTemplate(this._data, this._controls);
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

  _setButtonsBorder() {
    this._addToWatchedElement.style.border = this._state.isWatched ? BUTTONS_CHECKED_BORDER : ``;
    this._addToFavoriteElement.style.border = this._state.isFavorite ? BUTTONS_CHECKED_BORDER : ``;
    this._addToWatchlistElement.style.border = this._state.isOnWatchlist ? BUTTONS_CHECKED_BORDER : ``;
  }

  render() {
    const element = super.render();
    if (this._withControls) {
      this._setButtonsBorder();
    }
    return element;
  }

  update(data) {
    super.update(data);
    this.setState({
      isOnWatchlist: this._data.isOnWatchlist,
      isWatched: this._data.isWatched,
      isFavorite: this._data.isFavorite
    });
    if (this._withControls) {
      this._setButtonsBorder();
    }
    this._commentsElement.textContent =
      `${data.commentsAmount} ${data.commentsAmount === 1 ? CommentsAmountText.SINGULAR : CommentsAmountText.PLURAL}`;
  }

  createListeners() {
    if (this._element) {
      this._commentsElement = this._element.querySelector(`.film-card__comments`);

      this._commentsElement.addEventListener(`click`, this._onCommentsClick);

      if (this._withControls) {
        this._addToWatchlistElement = this._element.querySelector(`.film-card__controls-item--add-to-watchlist`);
        this._addToWatchedElement = this._element.querySelector(`.film-card__controls-item--mark-as-watched`);
        this._addToFavoriteElement = this._element.querySelector(`.film-card__controls-item--favorite`);

        this._addToWatchlistElement.addEventListener(`click`, this._onAddToWatchListButtonClick);
        this._addToWatchedElement.addEventListener(`click`, this._onMarkAsWatchedButtonClick);
        this._addToFavoriteElement.addEventListener(`click`, this._onAddToFavoriteButtonClick);
      }
    }
  }

  removeListeners() {
    if (this._element) {
      this._commentsElement.removeEventListener(`click`, this._onCommentsClick);

      if (this._withControls) {
        this._addToWatchlistElement.removeEventListener(`click`, this._onAddToWatchListButtonClick);
        this._addToWatchedElement.removeEventListener(`click`, this._onMarkAsWatchedButtonClick);
        this._addToFavoriteElement.removeEventListener(`click`, this._onAddToFavoriteButtonClick);

        this._addToWatchlistElement = null;
        this._addToWatchedElement = null;
        this._addToFavoriteElement = null;
      }
      this._commentsElement = null;
    }
  }

  _onCommentsClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  _onMarkAsWatchedButtonClick(evt) {
    evt.preventDefault();
    const isWatchedState = !this._state.isWatched;
    this.setState({
      isWatched: isWatchedState,
    });
    this._data.isWatched = isWatchedState;
    this._setButtonsBorder();
    if (typeof this._onMarkAsWatched === `function`) {
      this._onMarkAsWatched(this._data);
    }
  }

  _onAddToWatchListButtonClick(evt) {
    evt.preventDefault();
    const isOnWatchlistState = !this._state.isOnWatchlist;
    this.setState({
      isOnWatchlist: isOnWatchlistState,
    });
    this._data.isOnWatchlist = isOnWatchlistState;
    this._setButtonsBorder();
    if (typeof this._onAddToWatchList === `function`) {
      this._onAddToWatchList(this._data);
    }
  }

  _onAddToFavoriteButtonClick(evt) {
    evt.preventDefault();
    const isFavoriteState = !this._state.isFavorite;
    this.setState({
      isFavorite: isFavoriteState,
    });
    this._data.isFavorite = isFavoriteState;
    this._setButtonsBorder();
    if (typeof this._onAddToFavorite === `function`) {
      this._onAddToFavorite(this._data);
    }
  }
}
