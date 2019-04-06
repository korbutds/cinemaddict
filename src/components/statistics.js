import {createStatisticsTemplate, createDurationTemplate, createAmountTemplate} from '../templates/statistics';
import {setUserRank} from '../lib/user-rank';
import BaseComponent from './base';
import ChartComponent from './chart';
import moment from 'moment';

export default class StatisticsComponent extends BaseComponent {
  constructor(data) {
    super(data);
    this._filteredData = this._data.filter((item) => item.isWatched);
    this._onPeriodChange = this._onPeriodChange.bind(this);
  }

  _getGenres(data) {
    const genres = new Set();
    data.forEach((item) => {
      item.genre.forEach((genre) => {
        genres.add(genre);
      });
    });
    return Array.from(genres);
  }

  _getGenresCounts(data) {
    const counts = [];
    this._getGenres(data).forEach((genre, index) => {
      counts[index] = data.filter((item) => {
        return item.genre.some((it) => it === genre);
      }).length;
    });
    return counts;
  }

  _getDataByPeriod() {
    return {
      'statistic-all-time': () => this._filteredData,
      'statistic-today': () => this._filteredData
        .filter((item) => item.userDate === moment()),
      'statistic-week': () => this._filteredData
        .filter((item) => item.userDate.isAfter(moment().subtract(7, `days`))),
      'statistic-month': () => this._filteredData
        .filter((item) => item.userDate.isAfter(moment().subtract(1, `month`))),
      'statistic-year': () => this._filteredData
        .filter((item) => item.userDate.isAfter(moment().subtract(1, `year`)))
    };
  }

  _getTotalDuration(data) {
    let duration = 0;
    data.forEach((item) => {
      duration += item.duration;
    });
    return duration;
  }

  _getTopGenre(data) {
    const counts = this._getGenresCounts(data);
    const max = Math.max(...counts);
    const index = counts.indexOf(max);
    return this._getGenres(data)[index];
  }

  _updateChart(filter) {
    const ctx = this._element.querySelector(`canvas`);
    const data = this._getDataByPeriod()[filter]();
    const labels = this._getGenres(data);
    const counts = this._getGenresCounts(data);
    const height = 50;
    this._element.querySelector(`.statistic__item-text.total`)
      .innerHTML = createAmountTemplate(data.length);
    this._element.querySelector(`.statistic__item-text.duration`)
      .innerHTML = createDurationTemplate(this._getTotalDuration(data));
    this._element.querySelector(`.statistic__item-text.genre`)
      .innerHTML = `${this._getTopGenre(data) !== undefined ? this._getTopGenre(data) : `No genre`}`;
    ctx.height = height * labels.length;
    this._chart = new ChartComponent({ctx, labels, counts});
    this._chart.render();
  }

  _onPeriodChange(evt) {
    evt.preventDefault();
    this._chart.unrender();
    this._updateChart(evt.target.id);
  }

  get template() {
    return createStatisticsTemplate();
  }

  createListeners() {
    if (this._element) {
      this._element
        .querySelectorAll(`input`).forEach((item) => {
          item.addEventListener(`change`, this._onPeriodChange);
        });
    }
  }

  removeListeners() {
    if (this._element) {
      this._element
        .querySelectorAll(`input`).forEach((item) => {
          item.removeEventListener(`change`, this._onPeriodChange);
        });
    }
  }

  render() {
    const element = super.render();
    this._updateChart(`statistic-all-time`);
    element.querySelector(`.statistic__rank-label`).innerHTML = setUserRank(this._filteredData.length);
    return element;
  }
}
