import {createPopupTemplate} from '../templates/popup';
import Card from './card';

export default class Popup extends Card {
  constructor(data) {
    super(data);

    this._onClose = null;
    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
  }

  get template() {
    return createPopupTemplate(this._data);
  }

  set onClose(fn) {
    this._onClose = fn;
  }

  _onCloseButtonClick() {
    return typeof this._onClose === `function` && this._onClose();
  }

  _bind() {
    if (this._element) {
      this
        ._element
        .querySelector(`.film-details__close-btn`)
        .addEventListener(`click`, this._onCloseButtonClick);
    }
  }

  _unbind() {
    this
      ._element
      .querySelector(`.film-details__close-btn`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
  }

  unrender() {
    this._unbind();
    this._element = null;
  }
}
