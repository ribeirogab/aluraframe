System.register(["../../util/ApplicationException.js"], function (_export, _context) {
  "use strict";

  var ApplicationException;
  return {
    setters: [function (_utilApplicationExceptionJs) {
      ApplicationException = _utilApplicationExceptionJs.ApplicationException;
    }],
    execute: function () {
      class InvalidDateException extends ApplicationException {
        constructor() {
          super('This date is not in DD-MM-YYYY format');
        }
      }

      _export("InvalidDateException", InvalidDateException);
    }
  };
});
//# sourceMappingURL=InvalidDateException.js.map