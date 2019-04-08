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

  _onSearchStart(evt) {
    evt.preventDefault();
    return typeof this._onSearch === `function` && this._onSearch(evt.target.value);
  }

  createListeners() {
    if (this._element) {
      this
        ._element
        .querySelector(`input`)
        .addEventListener(`input`, this._onSearchStart);
    }
  }

  removeListeners() {
    if (this._element) {
      this
        ._element
        .querySelector(`input`)
        .removeEventListener(`input`, this._onSearchStart);
    }
  }
}
