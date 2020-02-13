System.register(['../domain/index.js', '../ui/index.js', '../util/index.js'], function (_export, _context) {
  "use strict";

  var Trade, TradeList, TradeService, DateConverter, Message, MessageView, TradesView, Bind, getNegotiationDao, getExceptionMessage, debounce, controller;
  return {
    setters: [function (_domainIndexJs) {
      Trade = _domainIndexJs.Trade;
      TradeList = _domainIndexJs.TradeList;
      TradeService = _domainIndexJs.TradeService;
    }, function (_uiIndexJs) {
      DateConverter = _uiIndexJs.DateConverter;
      Message = _uiIndexJs.Message;
      MessageView = _uiIndexJs.MessageView;
      TradesView = _uiIndexJs.TradesView;
    }, function (_utilIndexJs) {
      Bind = _utilIndexJs.Bind;
      getNegotiationDao = _utilIndexJs.getNegotiationDao;
      getExceptionMessage = _utilIndexJs.getExceptionMessage;
      debounce = _utilIndexJs.debounce;
      controller = _utilIndexJs.controller;
    }],
    execute: function () {
      function _asyncToGenerator(fn) {
        return function () {
          var gen = fn.apply(this, arguments);
          return new Promise(function (resolve, reject) {
            function step(key, arg) {
              try {
                var info = gen[key](arg);
                var value = info.value;
              } catch (error) {
                reject(error);
                return;
              }

              if (info.done) {
                resolve(value);
              } else {
                return Promise.resolve(value).then(function (value) {
                  step("next", value);
                }, function (err) {
                  step("throw", err);
                });
              }
            }

            return step("next");
          });
        };
      }

      function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
          desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
          desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
          return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
          desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
          desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
          Object['define' + 'Property'](target, property, desc);
          desc = null;
        }

        return desc;
      }

      var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

      let TradeController = (_dec = controller('#data', '#quantidade', '#valor'), _dec2 = debounce(250), _dec3 = debounce(1000), _dec(_class = (_class2 = class TradeController {
        constructor(inputDate, inputAmount, inputValue) {
          this._inputDate = inputDate;
          this._inputAmount = inputAmount;
          this._inputValue = inputValue;

          const $ = document.querySelector.bind(document);

          this._tradeList = new Bind(new TradeList(), new TradesView($('#tradesView')), 'add', 'delete', 'import', 'order', 'reverse');

          this._message = new Bind(new Message(), new MessageView($('#messageView')), 'text');

          this._service = new TradeService();
          this._currentOrder = '';

          this._init();
        }

        _init() {
          var _this = this;

          return _asyncToGenerator(function* () {
            try {
              const dao = yield getNegotiationDao();
              const negotiations = yield dao.listAll();
              negotiations.forEach(function (negotiation) {
                _this._tradeList.add(negotiation);
              });
            } catch (error) {
              _this._message.text = getExceptionMessage(error);
            }
          })();
        }

        add(event) {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            try {
              event.preventDefault();
              const dao = yield getNegotiationDao();
              yield dao.add(_this2._createTrade());
              _this2._tradeList.add(_this2._createTrade());
              _this2._message.text = 'Trades successfully added!';
              _this2._resetForm();
              console.log(_this2._tradeList);
            } catch (error) {
              _this2._message.text = getExceptionMessage(error);
            }
          })();
        }

        delete() {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            try {
              const dao = yield getNegotiationDao();
              yield dao.deleteAll();
              _this3._tradeList.delete();
              _this3._message.text = 'Successfully deleted!';
            } catch (error) {
              _this3._message.text = getExceptionMessage(error);
            }
          })();
        }

        import() {
          var _this4 = this;

          return _asyncToGenerator(function* () {
            try {
              const negotiationsArr = yield Promise.all([_this4._service.import('semana'), _this4._service.import('anterior'), _this4._service.import('retrasada')]);
              negotiationsArr.reduce(function (flatArr, arr) {
                return flatArr.concat(arr);
              }, []).filter(function (newNegotiation) {
                return !_this4._tradeList.list.some(function (existingNegotiation) {
                  return newNegotiation.equals(existingNegotiation);
                });
              }).map(function (negotiation) {
                return _this4._tradeList.add(negotiation);
              });
              _this4._message.text = 'Trades imported successfully';
            } catch (error) {
              _this4._message.text = getExceptionMessage(error);
            }
          })();
        }

        order(column) {
          if (this._currentOrder === column) {
            this._tradeList.reverse();
          } else {
            this._tradeList.order((a, b) => a[column] - b[column]);
          }
          this._currentOrder = column;
        }

        _createTrade() {
          return new Trade(DateConverter.textToDate(this._inputDate.value), parseInt(this._inputAmount.value), parseFloat(this._inputValue.value));
        }

        _resetForm() {
          this._inputDate.value = '16/09/2000';
          this._inputAmount.value = 7;
          this._inputValue.value = 5;
          this._inputDate.focus();
        }
      }, (_applyDecoratedDescriptor(_class2.prototype, 'add', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'add'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'import', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'import'), _class2.prototype)), _class2)) || _class);


      const tradeController = new TradeController();

      function currentInstance() {
        return tradeController;
      }

      _export('currentInstance', currentInstance);
    }
  };
});
//# sourceMappingURL=TradeController.js.map