System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      let ApplicationException = class ApplicationException extends Error {
        constructor(msg = '') {
          super(msg);
          this.name = this.constructor.name;
        }
      };

      _export('ApplicationException', ApplicationException);

      const excepetion = ApplicationException;

      function isApplicationException(err) {
        return err instanceof excepetion || Object.getPrototypeOf(err) instanceof excepetion;
      }

      _export('isApplicationException', isApplicationException);

      function getExceptionMessage(err) {
        if (isApplicationException(err)) {
          return err.message;
        } else {
          console.error(err);
          return 'Could not perform the operation!';
        }
      }

      _export('getExceptionMessage', getExceptionMessage);
    }
  };
});
//# sourceMappingURL=ApplicationException.js.map