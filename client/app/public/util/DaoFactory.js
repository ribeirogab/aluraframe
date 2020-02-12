System.register(["./ConnectionFactory.js", "../domain/trades/TradeDao.js"], function (_export, _context) {
    "use strict";

    var ConnectionFactory, TradeDao;
    return {
        setters: [function (_ConnectionFactoryJs) {
            ConnectionFactory = _ConnectionFactoryJs.ConnectionFactory;
        }, function (_domainTradesTradeDaoJs) {
            TradeDao = _domainTradesTradeDaoJs.TradeDao;
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

            let getNegotiationDao = (() => {
                var _ref = _asyncToGenerator(function* () {
                    const connection = yield ConnectionFactory.getConnection();
                    return new TradeDao(connection);
                });

                return function getNegotiationDao() {
                    return _ref.apply(this, arguments);
                };
            })();

            _export("getNegotiationDao", getNegotiationDao);
        }
    };
});
//# sourceMappingURL=DaoFactory.js.map