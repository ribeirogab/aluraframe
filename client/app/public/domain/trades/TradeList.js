System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      let TradeList = class TradeList {
        constructor() {
          this._list = [];

          Object.freeze(this);
        }

        get list() {
          return [].concat(this._list);
        }

        get totalVolume() {
          return this._list.reduce((total, trade) => total + trade.volume, 0.0);
        }

        add(trade) {
          this._list.push(trade);
        }

        delete() {
          this._list.length = 0;
        }

        order(criterion) {
          this._list.sort(criterion);
        }

        reverse() {
          this._list.reverse();
        }
      };

      _export("TradeList", TradeList);
    }
  };
});
//# sourceMappingURL=TradeList.js.map