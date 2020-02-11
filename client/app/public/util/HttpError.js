System.register(["./ApplicationException.js"], function (_export, _context) {
  "use strict";

  var ApplicationException;
  return {
    setters: [function (_ApplicationExceptionJs) {
      ApplicationException = _ApplicationExceptionJs.ApplicationException;
    }],
    execute: function () {
      class HttpError extends ApplicationException {
        constructor() {
          super('http Error');
        }
      }

      _export("HttpError", HttpError);
    }
  };
});
//# sourceMappingURL=HttpError.js.map