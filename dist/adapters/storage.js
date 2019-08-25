"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var localStorage = window && window.localStorage ? window.localStorage : { getItem: function getItem() {}, setItem: function setItem() {} };

var storageAdapter = function () {
  function storageAdapter(_ref) {
    var _ref$defaults = _ref.defaults,
        defaults = _ref$defaults === undefined ? {} : _ref$defaults,
        filename = _ref.filename;

    _classCallCheck(this, storageAdapter);

    this.key = filename;
    if (!localStorage.getItem(this.key)) localStorage.setItem(this.key, JSON.stringify(defaults));

    return this;
  }

  _createClass(storageAdapter, [{
    key: "read",
    value: function read() {
      var key = this.key;

      var data = void 0;

      try {
        data = JSON.parse(localStorage.getItem(key));
      } catch (error) {
        throw new Error(key + " could not be loaded correctly.");
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
        throw new Error(key + " could not be saved correctly.");
      }
    }
  }]);

  return storageAdapter;
}();

exports.default = storageAdapter;