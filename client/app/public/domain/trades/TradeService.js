System.register(["../../util/HttpService.js", "./Trade.js", "../../util/ApplicationException.js"], function (_export, _context) {
  "use strict";

  var HttpService, Trade, ApplicationException;
  return {
    setters: [function (_utilHttpServiceJs) {
      HttpService = _utilHttpServiceJs.HttpService;
    }, function (_TradeJs) {
      Trade = _TradeJs.Trade;
    }, function (_utilApplicationExceptionJs) {
      ApplicationException = _utilApplicationExceptionJs.ApplicationException;
    }],
    execute: function () {
      class TradeService {
        constructor() {
          this._http = new HttpService();
        }

        import(week) {
          return this._http.get(`negociacoes/${week}`).then(tradesArr => {
            return tradesArr.map(trade => new Trade(new Date(trade.data), trade.quantidade, trade.valor));
          }).catch(error => {
            console.log(error);
            new ApplicationException(`N foi possivel obter as negociacoes da semana${week === 'semana' !== -1 ? '' : ` ${week}`}.`);
          });
        }
      }

      _export("TradeService", TradeService);
    }
  };
});
//# sourceMappingURL=TradeService.js.map