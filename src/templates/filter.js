export const createFilterTemplate = (filters) => (
  filters.map((filter) => (
    `<a href="${filter.href}"
      class="main-navigation__item
      ${filter.isActive ? `main-navigation__item--active` : ``}
      ${filter.isAdditional ? `main-navigation__item--additional` : ``}">
        ${filter.title}
        ${filter.isCountable ? `<span class="main-navigation__item-count">${filter.count}</span>` : ``}
    </a>`
  )).join(``)
);
