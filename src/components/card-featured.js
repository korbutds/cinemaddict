import {createCardTemplate} from '../templates/cards';
import CardMainComponent from './card-main';

export default class CardFeaturedComponent extends CardMainComponent {
  get template() {
    return createCardTemplate(this._data, {
      description: false,
      controls: false
    });
  }
}
