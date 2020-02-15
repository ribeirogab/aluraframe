webpackJsonp([0],{

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TradeService", function() { return TradeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Trade_js__ = __webpack_require__(3);



let TradeService = class TradeService {
  constructor() {
    this._http = new __WEBPACK_IMPORTED_MODULE_0__util__["c" /* HttpService */]();
  }

  import(week) {
    return this._http.get(`http://localhost:3000/negociacoes/${week}`).then(tradesArr => {
      return tradesArr.map(trade => new __WEBPACK_IMPORTED_MODULE_1__Trade_js__["a" /* Trade */](new Date(trade.data), trade.quantidade, trade.valor));
    }).catch(error => {
      console.log(error);
      new __WEBPACK_IMPORTED_MODULE_0__util__["a" /* ApplicationException */](`N foi possivel obter as negociacoes da semana${week === 'semana' !== -1 ? '' : ` ${week}`}.`);
    });
  }
};

/***/ })

});