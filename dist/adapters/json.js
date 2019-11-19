'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
  if ((typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object') {
    fs = require('fs'); // eslint-disable-line
    path = require('path'); // eslint-disable-line
  }
} catch (error) {
  fs.error = error;
}

var folder = path.resolve('.', 'store');

var JsonAdapter = function () {
  function JsonAdapter(_ref) {
    var _ref$defaults = _ref.defaults,
        defaults = _ref$defaults === undefined ? {} : _ref$defaults,
        filename = _ref.filename;

    _classCallCheck(this, JsonAdapter);

    this.file = path.resolve('.', 'store/' + filename + '.json');

    if (!fs.existsSync(folder)) fs.mkdirSync(folder);
    if (!fs.existsSync(this.file)) {
      this.write(defaults);
    }

    return this;
  }

  _createClass(JsonAdapter, [{
    key: 'read',
    value: function read() {
      var file = this.file;

      var data = void 0;

      try {
        data = JSON.parse(fs.readFileSync(file, 'utf8'));
      } catch (error) {
        throw new Error(file + ' could not be loaded correctly.');
      }

      return data;
    }
  }, {
    key: 'write',
    value: function write() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var file = this.file;


      try {
        fs.writeFileSync(file, JSON.stringify(data, null, 1), 'utf8');
      } catch (error) {
        throw new Error(file + ' could not be saved correctly.');
      }
    }
  }]);

  return JsonAdapter;
}();

exports.default = JsonAdapter;