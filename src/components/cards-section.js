import BaseComponent from './base';
import PopupComponent from './popup';
import CardComponent from './card';
import {createCardsSectionTemplate} from '../templates/cards';

const popupContainerElement = document.querySelector(`body`);

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
      const popupComponent = new PopupComponent(card);

      const updateCardData = (newData) => {
        const index = this._data.findIndex((item) => item.id === cardComponent._data.id);
        cardComponent.update(newData);
        popupComponent.update(newData);
        if (index !== -1) {
          this._data[index] = Object.assign({}, newData);
          if (typeof this._onCardChange === `function`) {
            this._onCardChange(this._data[index], cardComponent._data.id);
          }
        }
      };

      const submitComment = (newData, popup) => {
        const index = this._data.findIndex((item) => item.id === cardComponent._data.id);
        cardComponent.update(newData);
        if (index !== -1) {
          this._data[index] = Object.assign({}, newData);
          if (typeof this._onCommentSubmit === `function`) {
            this._onCommentSubmit(this._data[index], cardComponent._data.id, popup);
          }
        }
      };

      const submitRating = (newData, popup) => {
        const index = this._data.findIndex((item) => item.id === cardComponent._data.id);
        cardComponent.update(newData);
        if (index !== -1) {
          this._data[index] = Object.assign({}, newData);
          if (typeof this._onRatingSubmit === `function`) {
            this._onRatingSubmit(this._data[index], cardComponent._data.id, popup);
          }
        }
      };

      cardComponent.onMarkAsWatched = updateCardData;
      cardComponent.onAddToWatchList = updateCardData;
      cardComponent.onAddToFavorite = updateCardData;

      cardComponent.onClick = () => {
        if (document.querySelector(`.film-details`)) {
          popupContainerElement.removeChild(popupContainerElement.lastChild);
          popupComponent.unrender();
        }
        popupComponent._data = Object.assign({}, cardComponent._data);
        popupContainerElement.appendChild(popupComponent.render());
      };

      popupComponent.onCommentSubmit = submitComment;
      popupComponent.onRatingSubmit = submitRating;

      popupComponent.onClose = (newData) => {
        popupContainerElement.removeChild(popupContainerElement.lastChild);
        popupComponent.unrender();
        updateCardData(newData);
      };
      return cardComponent;
    });

    const getCardsSectionDocumentFragment = () => {
      const documentFragment = document.createDocumentFragment();
      this.components.forEach((component) => {
        documentFragment.appendChild(component.render());
      });
      return documentFragment;
    };

    containerElement.appendChild(getCardsSectionDocumentFragment());
  }

  render(filteredData) {
    const element = super.render();
    this._renderCards(element, filteredData);
    return element;
  }
}
