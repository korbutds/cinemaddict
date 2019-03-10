import {createElement} from '../utils';

export default class BaseComponent {
  constructor(data) {
    if (new.target === BaseComponent) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
    this._data = data;
    this._element = null;
    this._state = {
      isRendered: false
    };
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  createListeners() {
    throw new Error(`You have to define createListeners.`);
  }
  removeListeners() {
    throw new Error(`You have to define removeListeners.`);
  }

  render() {
    if (!this._state.isRendered) {
      this._element = createElement(this.template);
      this.createListeners();
      this._state.isRendered = true;
    }
    return this._element;
  }

  unrender() {
    if (this._state.isRendered) {
      this.removeListeners();
      this._element = null;
      this._state.isRendered = false;
    }
  }
}
