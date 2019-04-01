import BaseComponent from './base';
import PopupComponent from './popup';
import {createCardsTemplate} from '../templates/cards';

export default class CardsComponent extends BaseComponent {
  constructor(data) {
    super(data);
  }

  get template() {
    return createCardsTemplate();
  }

  set onChange(fn) {
    this._onChange = fn;
  }

  _filterData() {}
  _setComponent() {}

  _renderCards(containerElement) {
    this.components = this._filterData().map((card) => {
      const cardComponent = this._setComponent(card);
      const container = document.querySelector(`body`);
      const popupComponent = new PopupComponent(card);
      cardComponent.onClick = () => {
        popupComponent.render();
        container.appendChild(popupComponent.element);
      };
      popupComponent.onClose = (newData) => {
        cardComponent.update({comments: newData.comments, yourRating: newData.yourRating});
        const index = this._data.findIndex((item) => item.id === cardComponent._data.id);
        this._data[index] = Object.assign({}, cardComponent._data);
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

  render() {
    const element = super.render();
    this._renderCards(element);
    return element;
  }
}
