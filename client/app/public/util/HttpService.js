System.register([], function (_export, _context) {
  "use strict";

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

  return {
    setters: [],
    execute: function () {
      class HttpService {
        get(url) {
          var _this = this;

          return _asyncToGenerator(function* () {
            const res = yield _this._handleErrors((yield fetch(url)));
            return res.json();
          })();
        }

        post(url, data) {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            const res = yield fetch(url, {
              headers: { 'Content-type': 'application/json' },
              method: 'post',
              body: JSON.stringify(data)
            });
            return yield _this2._handleErrors(res);
          })();
        }

        _handleErrors(res) {
          return _asyncToGenerator(function* () {
            if (!res.ok) throw new Error(res.statusText);
            return res;
          })();
        }
      }

      _export('HttpService', HttpService);
    }
  };
});
//# sourceMappingURL=HttpService.js.map