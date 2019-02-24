const defaultTemplateOptions = {
  description: true,
  controls: true
};


const controls = [
  {
    modifier: `add-to-watchlist`,
    title: `WL`
  },
  {
    modifier: `mark-as-watched`,
    title: `WTCCHD`
  },
  {
    modifier: `favorite`,
    title: `FAV`
  },
];

const createFormTemplate = () => (
  `<form class="film-card__controls">
    ${controls.map((control) => (
    `<button class="film-card__controls-item button film-card__controls-item--${control.modifier}">${control.title}</button>`
  )).join(``)}
  </form>`
);

const createDescriptionTemplate = (card) => (
  `<p class="film-card__description">
    ${card.description}
  </p>`
);

export const createCardsTemplate = (cards, options = defaultTemplateOptions) => (
  cards.map((card) => (
    `<article class="film-card ${!options.controls ? `film-card--no-controls` : ``} ">
      <h3 class="film-card__title">${card.title}</h3>
      <p class="film-card__rating">${card.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${card.year}</span>
        <span class="film-card__duration">${card.duration}</span>
        <span class="film-card__genre">${card.genre}</span>
      </p>
      <img src="${card.image}" alt="" class="film-card__poster">
      ${options.description ? createDescriptionTemplate(card) : ``}
      <button class="film-card__comments">${card.comments} comments</button>
      ${options.controls ? createFormTemplate() : ``}
    </article>`
  )).join(``)
);
