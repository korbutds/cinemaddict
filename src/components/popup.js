import {createPopupTemplate} from '../templates/popup';
import {EMOJIES} from '../constants.js';
import BaseComponent from './base';
import moment from 'moment';

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
    const newData = {
      comments: this._data.popup.comments,
      yourRating: this._data.popup.yourRating
    };
    if (typeof this._onClose === `function`) {
      this._onClose(newData);
    }
  }

  _onRatingChange(evt) {
    this._data.popup.yourRating = evt.target.value;
    this._element.querySelector(`.film-details__user-rating`).textContent = `Your rate ${this._data.popup.yourRating}`;
  }

  _createComment(comment) {
    const template = `<li class="film-details__comment">
       <span class="film-details__comment-emoji">
       ${EMOJIES[comment.emoji]}
       </span>
       <div>
         <p class="film-details__comment-text">${comment.text}</p>
         <p class="film-details__comment-info">
           <span class="film-details__comment-author">${comment.author}</span>
           <span class="film-details__comment-day">${moment(comment.date, `YYYYMMDD`).fromNow()}</span>
         </p>
       </div>
     </li>`;
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  }

  _onCommentAdd(evt) {
    if (evt.keyCode === 13 && evt.ctrlKey) {
      const input = this._element.querySelector(`.film-details__comment-input`);
      if (input.value) {
        const emojiElement = this._element.querySelector(`.film-details__emoji-list`);
        let emojiValue;
        emojiElement.querySelectorAll(`input`).forEach((item) => {
          if (item.checked) {
            emojiValue = item.value;
          }
        });
        const newComment = {
          text: input.value,
          author: `Your comment`,
          date: new Date(),
          emoji: emojiValue
        };
        this._data.popup.comments.push(newComment);
        this._element.querySelector(`.film-details__comments-list`)
          .appendChild(this._createComment(newComment));
        input.value = ``;
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
    this._data.comments = data.comments.length;
    this._data.popup.comments = data.comments;
    this._data.popup.yourRating = data.yourRating;
  }
}
