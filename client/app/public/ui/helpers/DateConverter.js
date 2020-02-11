System.register(["./InvalidDateException.js"], function (_export, _context) {
  "use strict";

  var InvalidDateException;
  return {
    setters: [function (_InvalidDateExceptionJs) {
      InvalidDateException = _InvalidDateExceptionJs.InvalidDateException;
    }],
    execute: function () {
      class DateConverter {
        static textToDate(text) {
          if (!/\d{2}\/\d{2}\/\d{4}$/.test(text)) {
            throw new InvalidDateException();
          }
          return new Date(text.split('/').reverse());
        }

        static dateToText(date) {
          return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        }
      }

      _export("DateConverter", DateConverter);
    }
  };
});
//# sourceMappingURL=DateConverter.js.map