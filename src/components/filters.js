import {createFiltersTemplate} from '../templates/filter';
import BaseComponent from './base';
import FilterComponent from './filter';

export default class FiltersComponent extends BaseComponent {
  constructor(data) {
    super(data);
  }

  get template() {
    return createFiltersTemplate();
  }

  set onSelect(fn) {
    this._onSelect = fn;
  }

  renderFilters(containerElement) {
    this.components = this._data.map((filter) => {
      const component = new FilterComponent(filter);
      if (filter.id !== `stats`) {
        component.onClick = (filterId) => {
          if (typeof this._onSelect === `function`) {
            this._onSelect(filterId);
          }
        };
      }
      return component;
    });

    const getFiltersDocumentFragment = () => {
      const documentFragment = document.createDocumentFragment();
      this.components.forEach((component) => {
        documentFragment.appendChild(component.render());
      });
      return documentFragment;
    };

    containerElement.appendChild(getFiltersDocumentFragment());
  }

  render() {
    const element = super.render();
    this.renderFilters(element);
    return element;
  }
}
