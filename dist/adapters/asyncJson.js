"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncJsonAdapter = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var fs = {
  existsSync: function existsSync() {},
  mkdirSync: function mkdirSync() {},
  readFileSync: function readFileSync() {},
  writeFileSync: function writeFileSync() {}
};
var path = {
  resolve: function resolve() {}
};

try {
  if ((typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object') {
    fs = require('fs');
    path = require('path');
  }
} catch (error) {
  fs.error = error;
}

var AsyncJsonAdapter = /*#__PURE__*/function () {
  function AsyncJsonAdapter() {
    var _this = this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$defaults = _ref.defaults,
        defaults = _ref$defaults === void 0 ? {} : _ref$defaults,
        _ref$filename = _ref.filename,
        filename = _ref$filename === void 0 ? 'store' : _ref$filename;

    _classCallCheck(this, AsyncJsonAdapter);

    return new Promise(function (resolve) {
      var folder = path.resolve('.', 'store');
      _this.file = path.resolve('.', "store/".concat(filename, ".json"));
      if (!fs.existsSync(folder)) fs.mkdirSync(folder);

      if (!fs.existsSync(_this.file)) {
        _this.write(defaults);
      }

      return resolve(_this);
    });
  }

  _createClass(AsyncJsonAdapter, [{
    key: "read",
    value: function read() {
      var file = this.file;
      var data;
      return new Promise(function (resolve, reject) {
        try {
          data = JSON.parse(fs.readFileSync(file, 'utf8'));
          resolve(data);
        } catch (error) {
          reject(new Error("".concat(file, " could not be loaded correctly.")));
        }
      });
    }
  }, {
    key: "write",
    value: function write() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var file = this.file;
      return new Promise(function (resolve, reject) {
        try {
          fs.writeFileSync(file, JSON.stringify(data, null, 1), 'utf8');
          resolve();
        } catch (error) {
          reject(new Error("".concat(file, " could not be saved correctly.")));
        }
      });
    }
  }]);

  return AsyncJsonAdapter;
}();

exports.AsyncJsonAdapter = AsyncJsonAdapter;