import CardModel from '../models/card-model';

const URL = `movies`;
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
      PUT: `PUT`
    };
  }

  static checkStatus(response) {
    if (response.status >= ResponseStatus.MIN && response.status < ResponseStatus.MAX) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  _load({url, method = this._methods.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(API.checkStatus)
      .catch((err) => {
        throw err;
      });
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
}
