import {createPopupTemplate} from '../templates/popup';
import Initial from './initial';

export default class Popup extends Initial {
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

  createListeners() {
    if (this._element) {
      this
        ._element
        .querySelector(`.film-details__close-btn`)
        .addEventListener(`click`, this._onCloseButtonClick);
    }
  }

  removeListeners() {
    this
      ._element
      .querySelector(`.film-details__close-btn`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
  }
}
