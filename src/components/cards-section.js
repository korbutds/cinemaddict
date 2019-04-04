import BaseComponent from './base';
import PopupComponent from './popup';
import CardComponent from './card';
import {createCardsSectionTemplate} from '../templates/cards';

export default class CardsSectionComponent extends BaseComponent {
  constructor(data) {
    super(data);
  }

  get template() {
    return createCardsSectionTemplate();
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  _renderCards(containerElement, filteredData, controls) {
    this.components = filteredData.map((card) => {
      const cardComponent = new CardComponent(card);
      const container = document.querySelector(`body`);
      const popupComponent = new PopupComponent(card);
      const update = (newData) => {
        cardComponent.update(newData, controls);
        const index = this._data.findIndex((item) => item.id === cardComponent._data.id);
        this._data[index] = Object.assign({}, newData);
        if (typeof this._onChange === `function`) {
          this._onChange(this._data[index], cardComponent._data.id);
        }
      };
      cardComponent.onClick = () => {
        if (document.querySelector(`.film-details`)) {
          container.removeChild(container.lastChild);
        }
        popupComponent.unrender();
        popupComponent._data = Object.assign({}, cardComponent._data);
        container.appendChild(popupComponent.render());
      };
      cardComponent.onMarkAsWatched = update;
      cardComponent.onAddToWatchList = update;
      cardComponent.onAddToFavorite = update;
      popupComponent.onClose = (newData) => {
        container.removeChild(popupComponent.element);
        popupComponent.unrender();
        update(newData);
      };
      return cardComponent;
    });

    this.components.forEach((component) => {
      containerElement.appendChild(component.render(controls));
    });
  }

  render(filteredData, controls) {
    const element = super.render();
    this._renderCards(element, filteredData, controls);
    return element;
  }
}
