import {createFilterTemplate} from '../templates/filter';
import BaseComponent from './base';

export default class FilterComponent extends BaseComponent {
  constructor(data) {
    super(data);

    this._onClick = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  get template() {
    return createFilterTemplate(this._data);
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  _onFilterClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  createListeners() {
    if (this._element) {
      this
        ._element
        .querySelectorAll(`.main-navigation__item:not(.main-navigation__item--additional)`)
        .forEach((element) => {
          element.addEventListener(`click`, this._onFilterClick);
        });
    }
  }

  removeListeners() {
    if (this._element) {
      this
        ._element
        .querySelectorAll(`.main-navigation__item:not(.main-navigation__item--additional)`)
        .forEach((element) => {
          element.removeEventListener(`click`, this._onFilterClick);
        });
    }
  }
}
