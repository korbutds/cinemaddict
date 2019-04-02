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

  render() {
    const element = super.render();
    this.renderFilters(element);
    return element;
  }

  renderFilters(containerElement) {
    this.components = this._data.map((filter) => {
      const component = new FilterComponent(filter);
      component.onClick = (filterId) => {
        if (typeof this._onSelect === `function`) {
          this._onSelect(filterId);
        }
      };
      return component;
    });
    this.components.forEach((component) => {
      containerElement.appendChild(component.render());
    });
  }
}
