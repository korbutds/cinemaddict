import {createFilterTemplate} from '../templates/filter';
import {createElement} from '../utils';

export default class Filter {
  constructor(data) {
    this._data = data;
    this._element = null;

    this._onClick = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  get element() {
    return this._element;
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

  _bind() {
    if (this._element) {
      this
        ._element
        .querySelectorAll(`.main-navigation__item:not(.main-navigation__item--additional)`)
        .forEach((element) => {
          element.addEventListener(`click`, this._onFilterClick);
        });
    }
  }

  render() {
    this._element = createElement(this.template);
    this._bind();
    return this._element;
  }
}
