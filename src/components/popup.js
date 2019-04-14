import {createPopupTemplate, createCommentTemplate} from '../templates/popup';
import {createElement} from '../lib/element';
import BaseComponent from './base';


const RATING_FIELD_TEXT = `Your rate`;
const AUTHOR_FIELD_TEXT = `Your comment`;

const KeyCode = {
  ESC: 27,
  ENTER: 13
};
const CommentBorderSetting = {
  ERROR: `3px solid #8B0000`,
  DEFAULT: `1px solid #979797`
};
const RatingElementColor = {
  DEFAULT: `#d8d8d8`,
  ERROR: `#8B0000`,
  CHECKED: `#ffe800`
};
const IsWatchedButtonText = {
  YES: `Already watched`,
  NO: `Will watch`
};

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
    this._onCommentsKeydown = this._onCommentsKeydown.bind(this);
    this._onCommentRemove = this._onCommentRemove.bind(this);
    this._onMarkAsWatchedButtonClick = this._onMarkAsWatchedButtonClick.bind(this);
    this._onAddToWatchListButtonClick = this._onAddToWatchListButtonClick.bind(this);
    this._onAddToFavoriteButtonClick = this._onAddToFavoriteButtonClick.bind(this);
    this._onCommentFormInput = this._onCommentFormInput.bind(this);
    this.enableCommentForm = this.enableCommentForm.bind(this);
    this.showCommentSubmitError = this.showCommentSubmitError.bind(this);
    this.showNewRating = this.showNewRating.bind(this);
    this.showRatingSubmitError = this.showRatingSubmitError.bind(this);
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

  set onRatingSubmit(fn) {
    this._onRatingSubmit = fn;
  }

  _toggleCardProperty(propertyName) {
    const value = !this._state[propertyName];
    this.setState({propertyName: value});
    this._data[propertyName] = value;

  }

  _setRatingElementsDisbility(value) {
    this._ratingElements.forEach((item) => {
      item.disabled = value;
    });
  }

  _getEmojiValue() {
    const emojiElement = this._element.querySelector(`.film-details__emoji-list`);
    const inputElements = emojiElement.querySelectorAll(`input`);
    const checkedElement = Array.from(inputElements).find((element) => element.checked);
    return checkedElement.value;
  }

  _isYourComment() {
    return this._data.popup.commentsList.some((comment) => comment.author === AUTHOR_FIELD_TEXT);
  }

  _addComment(comment) {
    this._data.popup.commentsList.push({
      comment,
      author: AUTHOR_FIELD_TEXT,
      date: new Date(),
      emotion: this._getEmojiValue()
    });
  }

  showNewRating() {
    this._element.querySelector(`.film-details__user-rating`).textContent = `${RATING_FIELD_TEXT} ${this._data.popup.yourRating}`;
    this._setRatingElementsDisbility(false);
    this._element.querySelector(`[for="${this._ratingElement.id}"]`)
      .style.backgroundColor = RatingElementColor.CHECKED;
  }

  showRatingSubmitError() {
    const labelElement = this._element.querySelector(`[for="${this._ratingElement.id}"]`);
    this._element
      .querySelector(`[value="${this._previousRatingValue}"]`).checked = true;
    this._data.popup.yourRating = this._previousRatingValue;
    labelElement.classList.add(`shake`);
    this._setRatingElementsDisbility(false);
    labelElement.style.backgroundColor = RatingElementColor.ERROR;
  }

  enableCommentForm() {
    this._commentInputElement.disabled = false;
    this._commentsListElement
      .appendChild(PopupComponent.createComment({comment: this._commentInputElement.value, author: AUTHOR_FIELD_TEXT,
        date: new Date(), emotion: this._getEmojiValue()}));
    this._userControlsElement
      .classList.remove(`visually-hidden`);
    this._watchedStatusElement
      .innerHTML = this._data.isWatched ? IsWatchedButtonText.YES : IsWatchedButtonText.NO;
    this._commentsCountElement.innerHTML = this._data.popup.commentsList.length;
    this._commentInputElement.value = ``;
  }

  showCommentSubmitError() {
    this._data.popup.commentsList.pop();
    this._commentInputElement.style.border = CommentBorderSetting.ERROR;
    this._element.querySelector(`.film-details__add-emoji-label`).classList.add(`shake`);
    this._commentInputElement.disabled = false;
    this._commentInputElement.addEventListener(`input`, this._onCommentFormInput);
  }

  render() {
    const element = super.render();
    this._commentsListElement = element.querySelector(`.film-details__comments-list`);
    this._commentInputElement = element.querySelector(`.film-details__comment-input`);
    this._userControlsElement = element.querySelector(`.film-details__user-rating-controls`);
    this._commentsCountElement = element.querySelector(`.film-details__comments-count`);
    this._watchedStatusElement = this._element.querySelector(`.film-details__watched-status`);
    return element;
  }

  update(data) {
    super.update(data);
    this.setState({
      isOnWatchlist: this._data.isOnWatchlist,
      isWatched: this._data.isWatched,
      isFavorite: this._data.isFavorite
    });
  }

  createListeners() {
    if (this._element) {
      this._closeButtonElement = this._element.querySelector(`.film-details__close-btn`);
      this._ratingElements = this._element.querySelectorAll(`.film-details__user-rating-input`);
      this._commentsElement = this._element.querySelector(`.film-details__comments-wrap`);
      this._addToListElement = this._element.querySelector(`#list`);
      this._addToWatchedElement = this._element.querySelector(`#watched`);
      this._addToFavoriteElement = this._element.querySelector(`#favorite`);
      this._removeCommentElement = this._element.querySelector(`.film-details__watched-reset`);

      this._closeButtonElement.addEventListener(`click`, this._onCloseButtonClick);
      this._ratingElements.forEach((input) => {
        input.addEventListener(`click`, this._onRatingChange);
      });
      this._commentsElement.addEventListener(`keydown`, this._onCommentsKeydown);
      this._addToListElement.addEventListener(`change`, this._onAddToWatchListButtonClick);
      this._addToWatchedElement.addEventListener(`change`, this._onMarkAsWatchedButtonClick);
      this._addToFavoriteElement.addEventListener(`change`, this._onAddToFavoriteButtonClick);
      this._removeCommentElement.addEventListener(`click`, this._onCommentRemove);
      window.addEventListener(`keydown`, this._onEscClick);
    }
  }

  removeListeners() {
    if (this._element) {
      this._closeButtonElement.removeEventListener(`submit`, this._onSubmitButtonClick);
      this._ratingElements.forEach((input) => {
        input.removeEventListener(`click`, this._onRatingChange);
      });
      this._commentsElement.removeEventListener(`keydown`, this._onCommentsKeydown);
      this._addToListElement.removeEventListener(`change`, this._onAddToWatchListButtonClick);
      this._addToWatchedElement.removeEventListener(`change`, this._onMarkAsWatchedButtonClick);
      this._addToFavoriteElement.removeEventListener(`change`, this._onAddToFavoriteButtonClick);
      this._removeCommentElement.removeEventListener(`click`, this._onCommentRemove);
      window.removeEventListener(`keydown`, this._onEscClick);

      this._closeButtonElement = null;
      this._ratingElements = null;
      this._commentsElement = null;
      this._addToListElement = null;
      this._addToWatchedElement = null;
      this._addToFavoriteElement = null;
      this._removeCommentElement = null;
    }
  }

  _onMarkAsWatchedButtonClick() {
    this._toggleCardProperty(`isWatched`);
    this._watchedStatusElement
      .innerHTML = this._data.isWatched ? IsWatchedButtonText.YES : IsWatchedButtonText.NO;
  }

  _onAddToWatchListButtonClick() {
    this._toggleCardProperty(`isOnWatchlist`);
  }

  _onAddToFavoriteButtonClick() {
    this._toggleCardProperty(`isFavorite`);
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();
    this._data.commentsAmount = this._data.popup.commentsList.length;
    if (typeof this._onClose === `function`) {
      this._onClose(this._data);
    }
  }

  _onEscClick(evt) {
    if (evt.keyCode === KeyCode.ESC) {
      this._onCloseButtonClick(evt);
    }
  }

  _onCommentFormInput() {
    this._commentInputElement.style.border = CommentBorderSetting.DEFAULT;
  }

  _onCommentsKeydown(evt) {
    if (evt.keyCode === KeyCode.ENTER && evt.ctrlKey && this._commentInputElement.value) {
      this._commentInputElement.style.border = CommentBorderSetting.DEFAULT;
      this._addComment(this._commentInputElement.value);
      this._commentInputElement.removeEventListener(`input`, this._onCommentFormInput);
      this._commentInputElement.disabled = true;
      if (typeof this._onCommentSubmit === `function`) {
        this._onCommentSubmit(this._data, this);
      }
    }
  }

  _onCommentRemove() {
    if (this._isYourComment()) {
      let index;

      this._data.popup.commentsList.forEach((item, id) => {
        if (item.author === AUTHOR_FIELD_TEXT) {
          index = id;
        }
      });

      this._data.popup.commentsList.splice(index, 1);
      this._commentsListElement
        .removeChild(this._commentsListElement.querySelector(`.film-details__comment:nth-child(${index + 1})`));
      this._commentsCountElement.innerHTML = this._data.popup.commentsList.length;

      if (!this._isYourComment()) {
        this._userControlsElement.classList.add(`visually-hidden`);
      }
    }
  }

  _onRatingChange(evt) {
    this._previousRatingValue = this._data.popup.yourRating;
    this._data.popup.yourRating = evt.target.value;
    this._ratingElement = evt.target;
    this._setRatingElementsDisbility(true);
    this._element.querySelectorAll(`.film-details__user-rating-label`).forEach((element) => {
      element.style.backgroundColor = RatingElementColor.DEFAULT;
    });
    if (typeof this._onRatingSubmit === `function`) {
      this._onRatingSubmit(this._data, this);
    }
  }

  static createComment(comment) {
    return createElement(
        createCommentTemplate(comment)
    );
  }
}
