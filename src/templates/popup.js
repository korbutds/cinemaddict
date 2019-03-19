import {createNumberRange} from '../utils.js';
import {EMOJIES} from '../constants.js';


const RATING_LIMIT_MAX = 9;
const RATINGS = createNumberRange(RATING_LIMIT_MAX);

const CONTROLS = [
  {
    id: `watchlist`,
    label: `Add to watchlist`
  },
  {
    id: `watched`,
    label: `Already watched`
  },
  {
    id: `favorite`,
    label: `Add to favorites`
  }
];

const generateDetailsTableData = (dataPopup) => ([
  {
    term: `Director`,
    cell: dataPopup.director
  },
  {
    term: `Writers`,
    cell: dataPopup.writers
  },
  {
    term: `Actors`,
    cell: dataPopup.actors
  },
  {
    term: `Release Date`,
    cell: dataPopup.releaseDay
  },
  {
    term: `Runtime`,
    cell: dataPopup.runtime
  },
  {
    term: `Country`,
    cell: dataPopup.country
  },
  {
    term: `Genres`,
    cell: createGenresList(dataPopup)
  }
]);

const createRatingElement = (data) => (
  RATINGS.map((rating) => (
    `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${rating}" id="rating-${rating}" ${rating === data.popup.yourRating ? `checked` : ``}>
    <label class="film-details__user-rating-label" for="rating-${rating}">${rating}</label>`
  ))
  .join(``)
);


const createGenresList = (data) => (
  data.genres.map((genre) => (
    `<span class="film-details__genre">${genre}</span>`
  )).join(``)
);

const createDetailsTableElement = (data) => (
  generateDetailsTableData(data.popup).map((detail) => (
    `<tr class="film-details__row">
      <td class="film-details__term">${detail.term}</td>
      <td class="film-details__cell">${detail.cell}</td>
    </tr>`
  ))
  .join(``)
);

const createControlsElement = () => (
  CONTROLS.map((control) => (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id="${control.id}" name="${control.id}" ${control.id === `watched` ? `checked` : ``}>
    <label for="${control.id}" class="film-details__control-label film-details__control-label--${control.id}">${control.label}</label>`
  ))
  .join(``)
);

const createEmojiesElement = () => (
  Object.keys(EMOJIES).map((value) => (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${value}" value="${value}" ${value === `neutral-face` ? `checked` : ``}>
    <label class="film-details__emoji-label" for="emoji-${value}">${EMOJIES[value]}</label>`
  ))
  .join(``)
);

const createCommentsElement = (data) => {
  return data.popup.comments.map((comment) => (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
      ${EMOJIES[comment.emoji]}
      </span>
      <div>
        <p class="film-details__comment-text">${comment.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${comment.date}</span>
        </p>
      </div>
    </li>`
  ))
  .join(``);
};

export const createPopupTemplate = (data) => (
  `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>

      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${data.image}" alt="${data.title}">
          <p class="film-details__age">${data.popup.ageLimit}</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${data.title}</h3>
              <p class="film-details__title-original">Original: ${data.popup.original}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${data.rating}</p>
              <p class="film-details__user-rating">Your rate ${data.popup.yourRating}</p>
            </div>
          </div>
          <table class="film-details__table">
            ${createDetailsTableElement(data)}
          </table>
          <p class="film-details__film-description">
            ${data.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        ${createControlsElement()}
      </section>

      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">1</span></h3>
        <ul class="film-details__comments-list">
          ${createCommentsElement(data)}
        </ul>
        <div class="film-details__new-comment">
          <div>
            <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
            <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">
            <div class="film-details__emoji-list">
              ${createEmojiesElement()}
            </div>
          </div>
          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
          </label>
        </div>
      </section>

      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
          <button class="film-details__watched-reset" type="button">undo</button>
        </div>
        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="${data.image}" alt="film-poster" class="film-details__user-rating-img">
          </div>
          <section class="film-details__user-rating-inner">
            <h3 class="film-details__user-rating-title">Incredibles 2</h3>
            <p class="film-details__user-rating-feelings">How you feel it?</p>
            <div class="film-details__user-rating-score">
              ${createRatingElement(data)}
            </div>
          </section>
        </div>
      </section>
    </form>
  </section>`
);
