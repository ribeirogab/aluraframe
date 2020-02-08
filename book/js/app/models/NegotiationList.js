class NegotiationList {
  constructor() {
    this._list = []

    Object.freeze(this)
  }

  get list() {
    return [].concat(this._list)
  }

  get totalVolume() {
    return this._list.reduce((total, n) => total + n.volume, 0.0);
  }

  add(negotiation) {
    this._list.push(negotiation)
  }

  delete() {
    this._list.length = 0
  }

  order(criterion) {
    this._list.sort(criterion)
  }

  reverse(){
    this._list.reverse()
  }
}