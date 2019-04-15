import CardModel from '../models/card-model';

const createArrayFromObjectData = (object) => {
  return Object.keys(object).map((id) => object[id]);
};

export default class Provider {
  constructor({api, store}) {
    this._api = api;
    this._store = store;
    this._needSync = false;
  }

  getData() {
    if (this._isOnline()) {
      return this._api.getData()
        .then((data) => {
          data.map((it) => this._store.setItem({key: it.id, item: CardModel.toRAW(it)}));
          return data;
        });
    } else {
      const rawDataMap = this._store.getAll();
      const rawData = createArrayFromObjectData(rawDataMap);
      const data = CardModel.parseData(rawData);

      return Promise.resolve(data);
    }
  }

  updateData({id, newData}) {
    if (this._isOnline()) {
      return this._api.updateData({id, newData})
        .then((datum) => {
          this._store.setItem({key: datum.id, item: CardModel.toRAW(datum)});
          return datum;
        });
    } else {
      const datum = newData;
      this._needSync = true;
      this._store.setItem({key: datum.id, item: datum});
      return Promise.resolve(CardModel.parseDatum(datum));
    }
  }

  syncData() {
    return this._api.syncData({data: createArrayFromObjectData(this._store.getAll())});
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}
