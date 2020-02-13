System.register(['./controllers/TradeController.js'], function (_export, _context) {
  "use strict";

  var currentInstance;
  return {
    setters: [function (_controllersTradeControllerJs) {
      currentInstance = _controllersTradeControllerJs.currentInstance;
    }],
    execute: function () {

      const tradeController = currentInstance();

      const $ = document.querySelector.bind(document);

      $('.form').addEventListener('submit', tradeController.add.bind(tradeController));

      $('#btnDelete').addEventListener('click', tradeController.delete.bind(tradeController));

      $('#btnImport').addEventListener('click', tradeController.import.bind(tradeController));
    }
  };
});
//# sourceMappingURL=index.js.map