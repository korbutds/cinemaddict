import {createSearchTemplate} from '../templates/search';
import BaseComponent from './base';

export default class SearchComponent extends BaseComponent {
  constructor(data) {
    super(data);
    this._onSearchStart = this._onSearchStart.bind(this);
  }

  get template() {
    return createSearchTemplate();
  }

  set onSearch(fn) {
    this._onSearch = fn;
  }

  createListeners() {
    if (this._element) {
      this._inputElement = this._element.querySelector(`input`);
      this._inputElement.addEventListener(`input`, this._onSearchStart);
    }
  }

  removeListeners() {
    if (this._element) {
      this._inputElement.removeEventListener(`input`, this._onSearchStart);
      this._inputElement = null;
    }
  }

  _onSearchStart(evt) {
    evt.preventDefault();
    return typeof this._onSearch === `function` && this._onSearch(evt.target.value);
  }
}
