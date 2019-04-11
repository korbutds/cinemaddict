import BaseComponent from './base';
import PopupComponent from './popup';
import CardComponent from './card';
import {createCardsSectionTemplate} from '../templates/cards';

export default class CardsSectionComponent extends BaseComponent {
  constructor(data, controls) {
    super(data);

    this._controls = controls;
  }

  get template() {
    return createCardsSectionTemplate();
  }

  set onCardChange(fn) {
    this._onCardChange = fn;
  }

  set onCommentSubmit(fn) {
    this._onCommentSubmit = fn;
  }

  set onRatingSubmit(fn) {
    this._onRatingSubmit = fn;
  }

  _renderCards(containerElement, filteredData) {
    this.components = filteredData.map((card) => {
      const cardComponent = new CardComponent(card, this._controls);
      const container = document.querySelector(`body`);
      const popupComponent = new PopupComponent(card);

      const updateCardData = (newData) => {
        cardComponent.update(newData);
        popupComponent.update(newData);
        const index = this._data.findIndex((item) => item.id === cardComponent._data.id);
        this._data[index] = Object.assign({}, newData);
        if (typeof this._onCardChange === `function`) {
          this._onCardChange(this._data[index], cardComponent._data.id);
        }
      };

      const submitComment = (newData, popup) => {
        cardComponent.update(newData);
        const index = this._data.findIndex((item) => item.id === cardComponent._data.id);
        this._data[index] = Object.assign({}, newData);
        if (typeof this._onCommentSubmit === `function`) {
          this._onCommentSubmit(this._data[index], cardComponent._data.id, popup);
        }
      };

      const submitRating = (newData, popup) => {
        cardComponent.update(newData);
        const index = this._data.findIndex((item) => item.id === cardComponent._data.id);
        this._data[index] = Object.assign({}, newData);
        if (typeof this._onRatingSubmit === `function`) {
          this._onRatingSubmit(this._data[index], cardComponent._data.id, popup);
        }
      };

      cardComponent.onMarkAsWatched = updateCardData;
      cardComponent.onAddToWatchList = updateCardData;
      cardComponent.onAddToFavorite = updateCardData;

      cardComponent.onClick = () => {
        if (document.querySelector(`.film-details`)) {
          container.removeChild(container.lastChild);
          popupComponent.unrender();
        }
        popupComponent._data = Object.assign({}, cardComponent._data);
        container.appendChild(popupComponent.render());
      };

      popupComponent.onCommentSubmit = submitComment;
      popupComponent.onRatingSubmit = submitRating;

      popupComponent.onClose = (newData) => {
        container.removeChild(popupComponent.element);
        popupComponent.unrender();
        updateCardData(newData);
      };
      return cardComponent;
    });

    this.components.forEach((component) => {
      containerElement.appendChild(component.render());
    });
  }

  render(filteredData) {
    const element = super.render();
    this._renderCards(element, filteredData);
    return element;
  }
}
