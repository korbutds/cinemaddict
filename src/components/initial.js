import {createElement} from '../utils';

export default class Initial {
  constructor(data) {
    if (new.target === Initial) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
    this._data = data;
    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  createListeners() {}
  removeListeners() {}

  render() {
    this._element = createElement(this.template);
    this.createListeners();
    return this._element;
  }

  unrender() {
    this.removeListeners();
    this._element = null;
  }
}
