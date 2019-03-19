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
    this._data.comments = data.comments.length;
    this._data.popup.comments = data.comments;
    this._data.popup.yourRating = data.yourRating;
    this._element.querySelector(`.film-card__comments`).textContent = `${data.comments.length} ${data.comments.length === 1 ? `comment` : `comments`}`;
  }
}
