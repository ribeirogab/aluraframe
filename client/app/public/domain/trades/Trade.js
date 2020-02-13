System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      let Trade = class Trade {
        constructor(_date, _amount, _value) {
          this._date = new Date(_date.getTime());
          Object.assign(this, { _amount, _value });

          Object.freeze(this);
        }

        get volume() {
          return this._amount * this._value;
        }

        get date() {
          return new Date(this._date.getTime());
        }

        get amount() {
          return this._amount;
        }

        get value() {
          return this._value;
        }

        equals(trade) {
          return JSON.stringify(this) === JSON.stringify(trade);
        }
      };

      _export("Trade", Trade);
    }
  };
});
//# sourceMappingURL=Trade.js.map