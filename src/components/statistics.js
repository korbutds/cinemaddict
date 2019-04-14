import {createStatisticsTemplate, createDurationTemplate, createAmountTemplate} from '../templates/statistics';
import {setUserRank} from '../lib/user-rank';
import BaseComponent from './base';
import ChartComponent from './chart';
import moment from 'moment';

const GENRE_FIELD_TEXT = `No genre`;

export default class StatisticsComponent extends BaseComponent {
  constructor(data) {
    super(data);
    this._filteredData = this._data.filter((item) => item.isWatched);
    this._onPeriodChange = this._onPeriodChange.bind(this);
  }

  get template() {
    return createStatisticsTemplate();
  }

  _getDataByPeriod() {
    return {
      'statistic-all-time': () => this._filteredData,
      'statistic-today': () => this._filteredData
        .filter((item) => moment(item.userDate) === moment()),
      'statistic-week': () => this._filteredData
        .filter((item) => moment(item.userDate).isAfter(moment().subtract(7, `days`))),
      'statistic-month': () => this._filteredData
        .filter((item) => moment(item.userDate).isAfter(moment().subtract(1, `month`))),
      'statistic-year': () => this._filteredData
        .filter((item) => moment(item.userDate).isAfter(moment().subtract(1, `year`)))
    };
  }

  _updateChart(filter) {
    const ctx = this._element.querySelector(`canvas`);
    const data = this._getDataByPeriod()[filter]();
    const labels = StatisticsComponent.getGenres(data);
    const counts = StatisticsComponent.getGenresCounts(data);
    const height = 50;
    this._element.querySelector(`.statistic__item-text.total`)
      .innerHTML = createAmountTemplate(data.length);
    this._element.querySelector(`.statistic__item-text.duration`)
      .innerHTML = createDurationTemplate(StatisticsComponent.getTotalDuration(data));
    this._element.querySelector(`.statistic__item-text.genre`)
      .innerHTML = `${StatisticsComponent.getTopGenre(data) !== undefined ? StatisticsComponent.getTopGenre(data) : GENRE_FIELD_TEXT}`;
    ctx.height = height * labels.length;
    this._chart = new ChartComponent({ctx, labels, counts});
    this._chart.render();
  }

  render() {
    const element = super.render();
    this._updateChart(`statistic-all-time`);
    element.querySelector(`.statistic__rank-label`).innerHTML = setUserRank(this._filteredData.length);
    return element;
  }

  createListeners() {
    if (this._element) {
      this._inputElements = this._element.querySelectorAll(`input`);

      this._inputElements.forEach((item) => {
        item.addEventListener(`change`, this._onPeriodChange);
      });
    }
  }

  removeListeners() {
    if (this._element) {
      this._inputElements.forEach((item) => {
        item.removeEventListener(`change`, this._onPeriodChange);
      });

      this._inputElements = null;
    }
  }

  _onPeriodChange(evt) {
    evt.preventDefault();
    this._chart.unrender();
    this._updateChart(evt.target.id);
  }

  static getGenres(data) {
    const genres = new Set();
    data.forEach((item) => {
      item.genre.forEach((genre) => {
        genres.add(genre);
      });
    });
    return Array.from(genres);
  }

  static getGenresCounts(data) {
    const counts = [];
    StatisticsComponent.getGenres(data).forEach((genre, index) => {
      counts[index] = data.filter((item) => {
        return item.genre.some((it) => it === genre);
      }).length;
    });
    return counts;
  }

  static getTotalDuration(data) {
    let duration = 0;
    data.forEach((item) => {
      duration += item.duration;
    });
    return duration;
  }

  static getTopGenre(data) {
    const counts = StatisticsComponent.getGenresCounts(data);
    const maxCount = Math.max(...counts);
    const index = counts.indexOf(maxCount);
    return StatisticsComponent.getGenres(data)[index];
  }
}
