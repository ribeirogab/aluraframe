System.register(["../../util/HttpService.js", "./Negotiation.js"], function (_export, _context) {
  "use strict";

  var HttpService, Negotiation;
  return {
    setters: [function (_utilHttpServiceJs) {
      HttpService = _utilHttpServiceJs.HttpService;
    }, function (_NegotiationJs) {
      Negotiation = _NegotiationJs.Negotiation;
    }],
    execute: function () {
      class NegotiationService {
        constructor() {
          this._http = new HttpService();
        }

        import(week) {
          return this._http.get(`negociacoes/${week}`).then(negotiationsArr => {
            return negotiationsArr.map(negotiation => new Negotiation(new Date(negotiation.data), negotiation.quantidade, negotiation.valor));
          }).catch(error => {
            console.log(error);
            throw new Error(`N foi possivel obter as negociacoes da semana${week === 'semana' !== -1 ? '' : ` ${week}`}.`);
          });
        }
      }

      _export("NegotiationService", NegotiationService);
    }
  };
});
//# sourceMappingURL=NegotiationService.js.map