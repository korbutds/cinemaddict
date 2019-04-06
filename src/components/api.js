import CardModel from './card-model';

export default class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
    this._methods = {
      GET: `GET`,
      PUT: `PUT`
    };
  }

  _toJSON(response) {
    return response.json();
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  _load({url, method = this._methods.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(this._checkStatus)
      .catch((err) => {
        throw err;
      });
  }

  getData() {
    return this._load({url: `movies`})
      .then(this._toJSON)
      .then((data) => CardModel.parseData(data));
  }

  updateData({id, newData}) {
    return this._load({
      url: `movies/${id}`,
      method: this._methods.PUT,
      body: JSON.stringify(newData),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(this._toJSON)
      .then((data) => CardModel.parseData(data));
  }
}
