import BaseComponent from './base';
import PopupComponent from './popup';
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

  _renderCards(containerElement, filteredData, callback) {
    this.components = filteredData.map((card) => {
      const cardComponent = callback(card);
      const container = document.querySelector(`body`);
      const popupComponent = new PopupComponent(card);
      cardComponent.onClick = () => {
        popupComponent.render();
        container.appendChild(popupComponent.element);
      };
      popupComponent.onClose = (newData) => {
        cardComponent.update(newData);
        const index = this._data.findIndex((item) => item.id === cardComponent._data.id);
        this._data[index] = Object.assign({}, newData);
        container.removeChild(popupComponent.element);
        popupComponent.unrender();
        if (typeof this._onChange === `function`) {
          this._onChange(this._data);
        }
      };
      return cardComponent;
    });

    this.components.forEach((component) => {
      containerElement.appendChild(component.render());
    });
  }

  render(filteredData, callback) {
    const element = super.render();
    this._renderCards(element, filteredData, callback);
    return element;
  }
}
