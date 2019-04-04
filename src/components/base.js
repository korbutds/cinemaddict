import {createElement} from '../lib/element';
import cloneDeep from 'lodash.clonedeep';

export default class BaseComponent {
  constructor(data) {
    if (new.target === BaseComponent) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
    this._data = cloneDeep(data);
    this._element = null;
    this._state = {
      isRendered: false
    };
  }

  get element() {
    return this._element;
  }

  get template() {}

  setState(newState = {}) {
    this._state = Object.assign({}, this._state, newState);
  }

  createListeners() {}
  removeListeners() {}

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

  update(data) {
    this._data = Object.assign({}, data);
  }
}
