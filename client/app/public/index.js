System.register(['./controllers/TradeController.js'], function (_export, _context) {
  "use strict";

  var currentInstance;
  return {
    setters: [function (_controllersTradeControllerJs) {
      currentInstance = _controllersTradeControllerJs.currentInstance;
    }],
    execute: function () {

      const negotiationController = currentInstance();

      const $ = document.querySelector.bind(document);

      $('.form').addEventListener('submit', negotiationController.add.bind(negotiationController));

      $('#btnDelete').addEventListener('click', negotiationController.delete.bind(negotiationController));

      $('#btnImport').addEventListener('click', negotiationController.import.bind(negotiationController));
    }
  };
});
//# sourceMappingURL=index.js.map