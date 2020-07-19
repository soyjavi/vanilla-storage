"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemoryAdapter = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MemoryAdapter = /*#__PURE__*/function () {
  function MemoryAdapter() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$defaults = _ref.defaults,
        defaults = _ref$defaults === void 0 ? {} : _ref$defaults;

    _classCallCheck(this, MemoryAdapter);

    this.store = defaults;
    return this;
  }

  _createClass(MemoryAdapter, [{
    key: "read",
    value: function read() {
      return this.store;
    }
  }, {
    key: "write",
    value: function write() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.store = data;
    }
  }]);

  return MemoryAdapter;
}();

exports.MemoryAdapter = MemoryAdapter;