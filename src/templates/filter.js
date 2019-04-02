export const createFilterTemplate = (filter) => (
  `<a href="${filter.href}"
      class="main-navigation__item
      ${filter.isActive ? `main-navigation__item--active` : ``}
      ${filter.isAdditional ? `main-navigation__item--additional` : ``}" id="${filter.id}">
        ${filter.title}
        ${filter.isCountable ? `<span class="main-navigation__item-count">${filter.count}</span>` : ``}
    </a>`
);

export const createFiltersTemplate = () => (
  `<nav class="main-navigation">

  </nav>`
);
