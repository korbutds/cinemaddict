import {createCardTemplate} from '../templates/cards';
import Card from './card';

export default class CardFeatured extends Card {
  get template() {
    return createCardTemplate(this._data, {
      description: false,
      controls: false
    });
  }
}
