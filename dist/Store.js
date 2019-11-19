'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storageAdapter = exports.memoryAdapter = exports.jsonAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _adapters = require('./adapters');

var _modules = require('./modules');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var state = new WeakMap();

exports.jsonAdapter = _adapters.jsonAdapter;
exports.memoryAdapter = _adapters.memoryAdapter;
exports.storageAdapter = _adapters.storageAdapter;

var Store = function () {
  function Store() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Store);

    var _props$adapter = props.adapter,
        Adapter = _props$adapter === undefined ? _adapters.jsonAdapter : _props$adapter,
        _props$autoSave = props.autoSave,
        autoSave = _props$autoSave === undefined ? true : _props$autoSave,
        _props$defaults = props.defaults,
        defaults = _props$defaults === undefined ? {} : _props$defaults,
        _props$filename = props.filename,
        filename = _props$filename === undefined ? 'store' : _props$filename,
        secret = props.secret;

    var adapter = new Adapter({ defaults: defaults, filename: filename });

    state.set(this, {
      adapter: adapter,
      autoSave: autoSave,
      data: adapter.read(),
      key: 'default',
      memoryPool: [],
      secret: secret
    });

    return this;
  }

  _createClass(Store, [{
    key: 'findOne',
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
    key: 'find',
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
    key: 'get',
    value: function get(key) {
      state.set(this, Object.assign(state.get(this), { key: key }));

      return this;
    }
  }, {
    key: 'push',
    value: function push() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _state$get = state.get(this),
          autoSave = _state$get.autoSave,
          key = _state$get.key,
          memoryPool = _state$get.memoryPool;

      if (autoSave) this.save(value);else memoryPool.push({ key: key, value: value });

      return value;
    }
  }, {
    key: 'save',
    value: function save(value) {
      var _state$get2 = state.get(this),
          adapter = _state$get2.adapter,
          data = _state$get2.data,
          key = _state$get2.key,
          _state$get2$memoryPoo = _state$get2.memoryPool,
          memoryPool = _state$get2$memoryPoo === undefined ? [] : _state$get2$memoryPoo,
          secret = _state$get2.secret;

      var isArray = data[key] === undefined || Array.isArray(data[key]);

      if (value) {
        if (isArray) data[key] = data[key] ? [].concat(_toConsumableArray(data[key]), [(0, _modules.encrypt)(value, secret)]) : [(0, _modules.encrypt)(value, secret)];else data[key] = Object.assign({}, data[key], (0, _modules.encrypt)(value, secret));
        adapter.write(data);
      } else if (memoryPool.length > 0) {
        memoryPool.forEach(function (item) {
          data[item.key] = data[item.key] ? [].concat(_toConsumableArray(data[item.key]), [(0, _modules.encrypt)(item.value, secret)]) : [(0, _modules.encrypt)(item.value, secret)];
        });
        adapter.write(data);
        state.set(this, Object.assign(state.get(this), { memoryPool: [] }));
      }
    }
  }, {
    key: 'update',
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
        var changes = void 0;

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
    key: 'remove',
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
    key: 'wipe',
    value: function wipe() {
      var _state$get5 = state.get(this),
          adapter = _state$get5.adapter;

      adapter.write();
    }
  }, {
    key: 'value',
    get: function get() {
      var _state$get6 = state.get(this),
          data = _state$get6.data,
          key = _state$get6.key,
          secret = _state$get6.secret;

      if (!secret) return data[key];

      return Array.isArray(data[key]) ? data[key].map(function (item) {
        return (0, _modules.decrypt)(item, secret);
      }) : (0, _modules.decrypt)(data[key], secret);
    }
  }]);

  return Store;
}();

exports.default = Store;