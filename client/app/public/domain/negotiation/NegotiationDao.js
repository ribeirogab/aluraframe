System.register(['./Trade.js'], function (_export, _context) {
  "use strict";

  var Trade;
  return {
    setters: [function (_TradeJs) {
      Trade = _TradeJs.Trade;
    }],
    execute: function () {
      class TradeDao {
        constructor(connection) {
          this._connection = connection;
          this._store = 'negotiations';
        }

        add(negotiation) {
          return new Promise((resolve, reject) => {
            const request = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).add(negotiation);

            request.onsuccess = e => resolve();

            request.onerror = e => {
              console.log(e.target.error);
              reject(e.target.error.name);
            };
          });
        }

        deleteAll() {
          return new Promise((resolve, reject) => {
            const request = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).clear();

            request.onsuccess = e => resolve();

            request.onerror = e => {
              reject(e.target.error);
            };
          });
        }

        listAll() {
          return new Promise((resolve, reject) => {
            const negotiations = [];
            const request = this._connection.transaction([this._store], 'readwrite').objectStore(this._store).openCursor();

            request.onsuccess = e => {
              const current = e.target.result;
              if (current) {
                negotiations.push(new Trade(current.value._date, current.value._amount, current.value._value));
                current.continue();
              } else {
                resolve(negotiations);
              }
            };

            request.onerror = e => {
              console.log(e.target.error);
              reject(e.target.error.name);
            };
          });
        }
      }

      _export('TradeDao', TradeDao);
    }
  };
});
//# sourceMappingURL=NegotiationDao.js.map