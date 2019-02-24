const setChangableDataForTemplate = (card, controls) => {
  if (controls) {
    return ({
      buttons: `<form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist"><!--Add to watchlist--> WL</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched"><!--Mark as watched-->WTCHD</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite"><!--Mark as favorite-->FAV</button>
      </form>`,
      description: `<p class="film-card__description">${card.description}</p>`,
      parameter: ``
    });
  } else {
    return ({
      buttons: ``,
      description: ``,
      parameter: `film-card--no-controls`
    });
  }
};

export const createCardsTemplate = (cards, controls) => (
  cards.map((card) => (
    `<article class="film-card ${setChangableDataForTemplate(card, controls).parameter}">
      <h3 class="film-card__title">${card.title}</h3>
      <p class="film-card__rating">${card.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${card.year}</span>
        <span class="film-card__duration">${card.duration}</span>
        <span class="film-card__genre">${card.genre}</span>
      </p>
      <img src="${card.image}" alt="" class="film-card__poster">
      ${setChangableDataForTemplate(card, controls).description}
      <button class="film-card__comments">${card.comments} comments</button>
      ${setChangableDataForTemplate(card, controls).buttons}
    </article>`
  )).join(``)
);
