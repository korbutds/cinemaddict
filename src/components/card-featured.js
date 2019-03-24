import {createCardTemplate} from '../templates/cards';
import CardComponent from './card';

export default class CardFeaturedComponent extends CardComponent {
  get template() {
    return createCardTemplate(this._data, {
      description: false,
      controls: false
    });
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
