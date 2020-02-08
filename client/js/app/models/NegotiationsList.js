class NegotiationList{
  constructor(){
    this._negotiations = []
  }

  get negotiations(){
    return [].concat(this._negotiations)
  }

  get totalVolume() {
    return this._negotiations.reduce((total, n) => total + n.volume, 0.0);
  }

  add(negotiation){
    this._negotiations.push(negotiation)
  }

  delete(){
    this._negotiations = []
  }

  order(criterion){
    this._negotiations.sort(criterion)
  }

  reverse(){
    this._negotiations.reverse()
  }
}