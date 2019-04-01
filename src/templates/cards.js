import moment from 'moment';

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

const getDurationFromMins = (min) => {
  return Math.trunc(min / 60) + `h ` + (min % 60) + `m`;
};

export const createCardTemplate = (data, options = defaultTemplateOptions) => (
  `<article class="film-card ${!options.controls ? `film-card--no-controls` : ``} ">
    <h3 class="film-card__title">${data.title}</h3>
    <p class="film-card__rating">${data.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${moment(`${data.year.getFullYear()}`).format(`YYYY`)}</span>
      <span class="film-card__duration">${getDurationFromMins(Math.round(moment.duration(data.duration).asMinutes()))}</span>
      <span class="film-card__genre">${data.genre}</span>
    </p>
    <img src="${data.image}" alt="" class="film-card__poster">
    ${options.description ? createDescriptionTemplate(data) : ``}
    <button class="film-card__comments">${data.commentsAmount} ${data.commentsAmount === 1 ? `comment` : `comments`}</button>
    ${options.controls ? createFormTemplate() : ``}
  </article>`
);

export const createCardsSectionTemplate = () => (
  `<div class="films-list__container">

  </div>`
);

export const createCardsSectionsTemplate = () => (
  `<section class="films">
    <section class="films-list" id="films-main-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <!--MAIN-->

      <button class="films-list__show-more">Show more</button>
    </section>

    <section class="films-list--extra" id="films-rated-list">
      <h2 class="films-list__title">Top rated</h2>

      <!--EXTRA-->

    </section>

    <section class="films-list--extra" id="films-commented-list">
      <h2 class="films-list__title">Most commented</h2>

      <!--EXTRA-->

    </section>
  </section>`
);
