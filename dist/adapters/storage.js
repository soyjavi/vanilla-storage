"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StorageAdapter = /*#__PURE__*/function () {
  function StorageAdapter() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$defaults = _ref.defaults,
        defaults = _ref$defaults === void 0 ? {} : _ref$defaults,
        _ref$filename = _ref.filename,
        filename = _ref$filename === void 0 ? 'store' : _ref$filename;

    _classCallCheck(this, StorageAdapter);

    this.key = filename;
    if (!localStorage.getItem(this.key)) localStorage.setItem(this.key, JSON.stringify(defaults));
    return this;
  }

  _createClass(StorageAdapter, [{
    key: "read",
    value: function read() {
      var key = this.key;
      var data;

      try {
        data = JSON.parse(localStorage.getItem(key));
      } catch (error) {
        throw new Error("".concat(key, " could not be loaded correctly."));
      }

      return data;
    }
  }, {
    key: "write",
    value: function write() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var key = this.key;

      try {
        localStorage.setItem(this.key, JSON.stringify(data));
      } catch (error) {
        throw new Error("".concat(key, " could not be saved correctly."));
      }
    }
  }]);

  return StorageAdapter;
}();

exports["default"] = StorageAdapter;