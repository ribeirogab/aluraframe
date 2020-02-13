System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      let connection = null;
      const stores = ['trades'];
      let close = null;

      let ConnectionFactory = class ConnectionFactory {
        constructor() {
          throw new Error('This class cannot be instantiated!');
        }
        static getConnection() {
          return new Promise((resolve, reject) => {
            const openRequest = indexedDB.open('jscangaceiro', 1);

            if (connection) return resolve(connection);

            openRequest.onupgradeneeded = e => {
              ConnectionFactory._createStores(e.target.result);
            };

            openRequest.onsuccess = e => {
              connection = e.target.result;
              close = connection.close.bind(connection);
              connection.close = () => {
                throw new Error('You cannot directly close this connection!');
              };
              resolve(e.target.result);
            };

            openRequest.onerror = e => {
              console.log(e.target.error);
              reject(e.target.error.name);
            };
          });
        }

        static _createStores(connection) {
          stores.forEach(store => {
            if (connection.objectStoreNames.contains(store)) {
              connection.deleteObjectStore(store);
            }
            connection.createObjectStore(store, {
              autoIncrement: true
            });
          });
        }

        static closeConnection() {
          if (connection) {
            close();
          }
        }
      };

      _export('ConnectionFactory', ConnectionFactory);
    }
  };
});
//# sourceMappingURL=ConnectionFactory.js.map