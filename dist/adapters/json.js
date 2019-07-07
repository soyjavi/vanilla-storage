'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var folder = _path2.default.resolve('.', 'store');

var JsonAdapter = function () {
  function JsonAdapter(_ref) {
    var _ref$defaults = _ref.defaults,
        defaults = _ref$defaults === undefined ? {} : _ref$defaults,
        filename = _ref.filename;

    _classCallCheck(this, JsonAdapter);

    this.file = _path2.default.resolve('.', 'store/' + filename + '.json');

    if (!_fs2.default.existsSync(folder)) _fs2.default.mkdirSync(folder);
    if (!_fs2.default.existsSync(this.file)) {
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
        data = JSON.parse(_fs2.default.readFileSync(file, 'utf8'));
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
        _fs2.default.writeFileSync(file, JSON.stringify(data, null, 1), 'utf8');
      } catch (error) {
        throw new Error(file + ' could not be saved correctly.');
      }
    }
  }]);

  return JsonAdapter;
}();

exports.default = JsonAdapter;