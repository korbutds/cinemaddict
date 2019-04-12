import {createLoadInProgressTemplate} from '../templates/load-in-process';
import BaseComponent from './base';

export default class LoadInProcessComponent extends BaseComponent {
  get template() {
    return createLoadInProgressTemplate();
  }
}
