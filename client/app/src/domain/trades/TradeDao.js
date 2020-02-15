import { Trade } from "./Trade";

export class TradeDao{
  constructor(connection){
    this._connection = connection
    this._store = 'trades'
  }

  add(trades){
    return new Promise((resolve, reject) => {
      const request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .add(trades)

      request.onsuccess = e => resolve()

      request.onerror = e => {
        console.log(e.target.error)
        reject(e.target.error.name)
      }
    })
  }

  deleteAll() {
    return new Promise((resolve, reject) => {
      const request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .clear()

      request.onsuccess = e => resolve()

      request.onerror = e => {
        reject(e.target.error)
      }
    })
  }

  listAll(){
    return new Promise((resolve, reject) => {
      const trades = []
      const request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .openCursor()

      request.onsuccess = e => {
        const current = e.target.result
        if(current){
          trades.push(
            new Trade(
              current.value._date,
              current.value._amount,
              current.value._value,
            )
          )
          current.continue()
        } else {
          resolve(trades)
        }
      }

      request.onerror = e => {
        console.log(e.target.error)
        reject(e.target.error.name)
      }
    })
  }
}