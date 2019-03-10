import {createCardTemplate} from '../templates/cards';
import CardComponent from './card';

export default class CardFeaturedComponent extends CardComponent {
  get template() {
    return createCardTemplate(this._data, {
      description: false,
      controls: false
    });
  }
}
