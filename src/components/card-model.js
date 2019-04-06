export default class CardModel {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`];
    this.rating = data[`film_info`][`total_rating`];
    this.year = data[`film_info`][`release`][`date`];
    this.duration = data[`film_info`][`runtime`] * 1000 * 60;
    this.genre = data[`film_info`][`genre`];
    this.image = data[`film_info`][`poster`];
    this.description = data[`film_info`][`description`];
    this.commentsAmount = data[`comments`].length;
    this.userDate = data[`user_details`][`watching_date`];
    this.isOnWatchlist = data[`user_details`][`watchlist`];
    this.isWatched = data[`user_details`][`already_watched`];
    this.isFavorite = data[`user_details`][`favorite`];
    this.popup = {
      director: data[`film_info`][`director`],
      writers: data[`film_info`][`writers`],
      actors: data[`film_info`][`actors`],
      releaseDay: data[`film_info`][`release`][`date`],
      runtime: data[`film_info`][`runtime`] * 1000 * 60,
      country: data[`film_info`][`release`][`release_country`],
      genres: data[`film_info`][`genre`],
      ageLimit: data[`film_info`][`age_rating`],
      original: data[`film_info`][`alternative_title`],
      yourRating: data[`user_details`][`personal_rating`],
      commentsList: data[`comments`]
    };
  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.popup.commentsList,
      'film_info': {
        'actors': this.popup.actors,
        'age_rating': this.popup.ageLimit,
        'alternative_title': this.popup.original,
        'description': this.description,
        'director': this.popup.director,
        'genre': this.genre,
        'poster': this.image,
        'release': {
          'date': this.popup.releaseDay,
          'release_country': this.popup.country
        },
        'runtime': this.duretion / 1000 / 60,
        'title': this.title,
        'total_rating': this.rating,
        'writers': this.popup.writers
      },
      'user_details': {
        'already_watched': this.isWatched,
        'favorite': this.isFavorite,
        'personal_rating': this.popup.yourRating,
        'watching_date': this.userDate,
        'watchlist': this.isOnWatchlist
      }
    };
  }

  static parseDatum(data) {
    return new CardModel(data);
  }

  static parseData(data) {
    return data.map(CardModel.parseDatum);
  }
}
