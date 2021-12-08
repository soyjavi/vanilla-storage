"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Storage = void 0;

var _adapters = require("./adapters");

var _modules = require("./modules");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// eslint-disable-next-line no-undef
var state = new WeakMap();

var Storage = /*#__PURE__*/function () {
  function Storage() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Storage);

    var _props$adapter = props.adapter,
        Adapter = _props$adapter === void 0 ? _adapters.JsonAdapter : _props$adapter,
        _props$autoSave = props.autoSave,
        autoSave = _props$autoSave === void 0 ? true : _props$autoSave,
        _props$defaults = props.defaults,
        defaults = _props$defaults === void 0 ? {} : _props$defaults,
        _props$filename = props.filename,
        filename = _props$filename === void 0 ? 'store' : _props$filename,
        secret = props.secret;
    var adapter = new Adapter({
      defaults: defaults,
      filename: filename
    });
    state.set(this, {
      adapter: adapter,
      autoSave: autoSave,
      data: adapter.read(),
      defaults: defaults,
      filename: filename,
      key: 'default',
      memoryPool: [],
      secret: secret
    });
    return this;
  }

  _createClass(Storage, [{
    key: "findOne",
    value: function findOne(query) {
      var queryFields = Object.keys(query);
      return this.value.find(function (row) {
        var found = !queryFields.some(function (field) {
          return !(row[field] === query[field]);
        });
        return found;
      });
    }
  }, {
    key: "find",
    value: function find() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var queryFields = Object.keys(query);
      var values = [];
      this.value.forEach(function (row) {
        var found = !queryFields.some(function (field) {
          return !(row[field] === query[field]);
        });
        if (found) values.push(row);
      });
      return values.length > 0 ? values : undefined;
    }
  }, {
    key: "get",
    value: function get(key) {
      state.set(this, Object.assign(state.get(this), {
        key: key
      }));
      return this;
    }
  }, {
    key: "push",
    value: function push() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _state$get = state.get(this),
          autoSave = _state$get.autoSave,
          key = _state$get.key,
          memoryPool = _state$get.memoryPool;

      if (autoSave) this.save(value);else memoryPool.push({
        key: key,
        value: value
      });
      return value;
    }
  }, {
    key: "save",
    value: function save(value) {
      var _state$get2 = state.get(this),
          adapter = _state$get2.adapter,
          data = _state$get2.data,
          key = _state$get2.key,
          _state$get2$memoryPoo = _state$get2.memoryPool,
          memoryPool = _state$get2$memoryPoo === void 0 ? [] : _state$get2$memoryPoo,
          secret = _state$get2.secret;

      var isArray = data[key] === undefined || Array.isArray(data[key]);

      if (value) {
        if (isArray) {
          data[key] = data[key] ? Array.isArray(value) ? [].concat(_toConsumableArray(data[key]), _toConsumableArray(value.map(function (item) {
            return (0, _modules.encrypt)(item, secret);
          }))) : [].concat(_toConsumableArray(data[key]), [(0, _modules.encrypt)(value, secret)]) : [(0, _modules.encrypt)(value, secret)];
        } else {
          if (secret && Object.keys(data[key]).length !== 0) data[key] = (0, _modules.decrypt)(data[key], secret);
          data[key] = (0, _modules.encrypt)(_objectSpread(_objectSpread({}, data[key]), value), secret);
        }

        adapter.write(data);
      } else if (memoryPool.length > 0) {
        memoryPool.forEach(function (item) {
          data[item.key] = data[item.key] ? [].concat(_toConsumableArray(data[item.key]), [(0, _modules.encrypt)(item.value, secret)]) : [(0, _modules.encrypt)(item.value, secret)];
        });
        adapter.write(data);
        state.set(this, Object.assign(state.get(this), {
          memoryPool: []
        }));
      }
    }
  }, {
    key: "update",
    value: function update(query, nextData) {
      var _state$get3 = state.get(this),
          adapter = _state$get3.adapter,
          data = _state$get3.data,
          key = _state$get3.key,
          secret = _state$get3.secret;

      var queryFields = Object.keys(query);
      var values = [];
      data[key] = this.value.map(function (row) {
        var found = !queryFields.some(function (field) {
          return !(row[field] === query[field]);
        });
        var changes;

        if (found) {
          changes = Object.assign(row, nextData);
          values.push(changes);
        }

        return changes || row;
      }).map(function (row) {
        return (0, _modules.encrypt)(row, secret);
      });
      if (values.length > 0) adapter.write(data);
      return values;
    }
  }, {
    key: "remove",
    value: function remove(query) {
      var _state$get4 = state.get(this),
          adapter = _state$get4.adapter,
          data = _state$get4.data,
          key = _state$get4.key,
          secret = _state$get4.secret;

      var queryFields = Object.keys(query);
      var values = [];
      data[key] = this.value.filter(function (row) {
        var found = !queryFields.some(function (field) {
          return !(row[field] === query[field]);
        });
        if (found) values.push(row);
        return !found;
      }).map(function (row) {
        return (0, _modules.encrypt)(row, secret);
      });
      if (values.length > 0) adapter.write(data);
      return values;
    }
  }, {
    key: "wipe",
    value: function wipe() {
      var _state$get5 = state.get(this),
          adapter = _state$get5.adapter,
          defaults = _state$get5.defaults;

      adapter.write(defaults);
      state.set(this, Object.assign(state.get(this), {
        data: defaults,
        memoryPool: []
      }));
    }
  }, {
    key: "value",
    get: function get() {
      var _state$get6 = state.get(this),
          data = _state$get6.data,
          key = _state$get6.key,
          filename = _state$get6.filename,
          secret = _state$get6.secret;

      if (!secret) return data[key];
      var decryptedValue;

      try {
        decryptedValue = Array.isArray(data[key]) ? data[key].map(function (item) {
          return (0, _modules.decrypt)(item, secret);
        }) : (0, _modules.decrypt)(data[key], secret);
      } catch (error) {
        throw Error("filename ".concat(filename, " can't be decrypted."));
      }

      return decryptedValue;
    }
  }]);

  return Storage;
}();

exports.Storage = Storage;