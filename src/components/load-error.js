import {createLoadErrorTemplate} from '../templates/load-error';
import BaseComponent from './base';

export default class LoadErrorComponent extends BaseComponent {
  get template() {
    return createLoadErrorTemplate();
  }
}
