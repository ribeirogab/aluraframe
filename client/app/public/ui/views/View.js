System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      let View = class View {
        constructor(selector) {
          this._selector = selector;
        }

        template() {
          throw new Error('This method needs to be overwritten');
        }

        update(model) {
          this._selector.innerHTML = this.template(model);
        }
      };

      _export('View', View);
    }
  };
});
//# sourceMappingURL=View.js.map