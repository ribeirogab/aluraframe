class NegotiationDao{
  constructor(connection){
    this._connection = connection
    this._store = 'negotiations'
  }

  add(negotiation){
    return new Promise((resolve, reject) => {
        const request = this._connection
          .transaction([this._store], 'readwrite')
          .objectStore(this._store)
          .add(negotiation)

        request.onsuccess = e => resolve('Negotiation successfully added')

        request.onerror = e => {
          console.log(e.target.error)
          reject(e.target.error.name)
        }
    })
  }

  listAll(){
    return new Promise((resolve, reject) => {
      const negotiations = []
      const cursor = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .openCursor()

      cursor.onsuccess = e => {
        const current = e.target.result
        
        if(current){
          negotiations.push(
            new Negotiation(
              current.value._date,
              current.value._amount,
              current.value._value
            )
          )
          current.continue()
        } else {
          resolve(negotiations)
        }
      }

      cursor.onerror = e => {
        console.log(e.target.error)
        reject(e.target.error.name)
      }

    })
  }

  deleteAll(){
    return new Promise((resolve, reject) => {
      const request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .clear()

      request.onsuccess = e => resolve('Deletado com sucesso!')


      request.onerror = e => {
        console.log(e.target.error)
        reject('Nao foi possivel deletar')
      }
    })
  }
}