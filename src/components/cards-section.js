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

      const updateData = (newData) => {
        cardComponent.update(newData);
        const index = this._data.findIndex((item) => item.id === cardComponent._data.id);
        this._data[index] = Object.assign({}, newData);
        this._dataIndex = index;
      };

      const update = (newData) => {
        updateData(newData);
        if (typeof this._onCardChange === `function`) {
          this._onCardChange(this._data[this._dataIndex], cardComponent._data.id);
        }
      };

      const submitComment = (newData, popup) => {
        updateData(newData);
        if (typeof this._onCommentSubmit === `function`) {
          this._onCommentSubmit(this._data[this._dataIndex], cardComponent._data.id, popup);
        }
      };

      const submitRating = (newData, popup) => {
        updateData(newData);
        if (typeof this._onRatingSubmit === `function`) {
          this._onRatingSubmit(this._data[this._dataIndex], cardComponent._data.id, popup);
        }
      };

      cardComponent.onMarkAsWatched = update;
      cardComponent.onAddToWatchList = update;
      cardComponent.onAddToFavorite = update;

      cardComponent.onClick = () => {
        if (document.querySelector(`.film-details`)) {
          container.removeChild(container.lastChild);
        }
        popupComponent.unrender();
        popupComponent._data = Object.assign({}, cardComponent._data);
        container.appendChild(popupComponent.render());
      };

      popupComponent.onCommentSubmit = submitComment;
      popupComponent.onRatingSubmit = submitRating;

      popupComponent.onClose = (newData) => {
        container.removeChild(popupComponent.element);
        popupComponent.unrender();
        update(newData);
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
