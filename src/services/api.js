import CardModel from '../models/card-model';

const URL = `movies`;
const SYNCHRONIZATION_URL = `movies/sync`;
const CONTENT_TYPE = `application/json`;

const ResponseStatus = {
  MIN: 200,
  MAX: 300
};

const convertToJson = (response) => response.json();

export default class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
    this._methods = {
      GET: `GET`,
      PUT: `PUT`,
      POST: `POST`
    };
  }

  getData() {
    return this._load({url: URL})
      .then(convertToJson)
      .then(CardModel.parseData);
  }

  updateData({id, newData}) {
    return this._load({
      url: `${URL}/${id}`,
      method: this._methods.PUT,
      body: JSON.stringify(newData),
      headers: new Headers({'Content-Type': CONTENT_TYPE})
    })
      .then(convertToJson)
      .then(CardModel.parseDatum);
  }

  syncData({data}) {
    return this._load({
      url: SYNCHRONIZATION_URL,
      method: this._methods.POST,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': CONTENT_TYPE})
    })
      .then(convertToJson);
  }

  _load({url, method = this._methods.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(API.checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  static checkStatus(response) {
    if (response.status >= ResponseStatus.MIN && response.status < ResponseStatus.MAX) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }
}
