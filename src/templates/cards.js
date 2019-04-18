import moment from 'moment';
import {COMMENTS_CONTROL_AMOUNT, CommentsAmountText} from '../lib/card';

const DESCRIPTION_LENGTH = 136;
const DESCRIPTION_REDUCTION_INDICATOR = `...`;
const MOMENT_YEAR_FORMAT_VALUE = `YYYY`;
const DURATION_DIVIDER = 60;
const DurationMark = {
  HOUR: `h`,
  MINUTE: `m`
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
  return Math.trunc(min / DURATION_DIVIDER) + DurationMark.HOUR + ` ` + (min % DURATION_DIVIDER) + DurationMark.MINUTE;
};

export const createCardTemplate = (data, options) => (
  `<article class="film-card ${!options.controls ? `film-card--no-controls` : ``} ">
    <h3 class="film-card__title">${data.title}</h3></br>
    <p class="film-card__rating">${data.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${moment(data.year).format(MOMENT_YEAR_FORMAT_VALUE)}</span>
      <span class="film-card__duration">${getDurationFromMins(Math.round(moment.duration(data.duration).asMinutes()))}</span>
    </p>
    <img src="${data.image}" alt="" class="film-card__poster">
    ${createDescriptionTemplate(data).length > DESCRIPTION_LENGTH
    ? createDescriptionTemplate(data).substring(0, DESCRIPTION_LENGTH) : createDescriptionTemplate(data)} ${createDescriptionTemplate(data).length > DESCRIPTION_LENGTH
    ? DESCRIPTION_REDUCTION_INDICATOR : ``}</br>
    <button class="film-card__comments">${data.commentsAmount} ${data.commentsAmount === COMMENTS_CONTROL_AMOUNT ? CommentsAmountText.SINGULAR : CommentsAmountText.PLURAL}</button>
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
