import {loadErrorTemplate} from '../templates/load-error';
import BaseComponent from './base';

export default class LoadErrorComponent extends BaseComponent {
  get template() {
    return loadErrorTemplate();
  }
}
