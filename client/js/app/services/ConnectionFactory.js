const ConnectionFactory = (function() {
  const stores = ['negotiations']
  const version = 1
  const dbName = 'aluraframe'
  let connection = null
  let close = null

  return class ConnectionFactory {
    constructor() {
      throw new Error('ConnectionFactory must not be instantiated')
    }

    static getConnection() {
      return new Promise((resolve, reject) => {
        const openRequest = window.indexedDB.open(dbName, version)

        openRequest.onupgradeneeded = e => {
          console.log('Successfully connected in IndexedDB')

          ConnectionFactory._createStores(e.target.result)
        }

        openRequest.onsuccess = e => {
          console.log('Successfully connection.')
          if (!connection) {
            connection = e.target.result
            close = connection.close.bind(connection)
            connection.close = function() {
              throw new Error('You cannot directly close this connection!')
            }
          }
          resolve(connection)
        }

        openRequest.onerror = e => {
          console.error(`Error connection.\nError: ${e.target.error}`)
          reject(e.target.error.name)
        }
      })
    }

    static _createStores(connection) {
      stores.forEach(store => {
        if (connection.objectStoreNames.contains(store)) {
          connection.deleteObjectStore(store)
        }

        connection.createObjectStore(store, {
          autoIncrement: true
        })
      })
    }

    static closeConnection(){
      if(connection) {
        close()
        console.log('This connection has been closed.')
        connection = null
      }
    }
  }
})()
