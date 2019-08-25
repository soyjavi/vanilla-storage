'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storageAdapter = exports.memoryAdapter = exports.jsonAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _adapters = require('./adapters');

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
        filename = _props$filename === undefined ? 'store' : _props$filename;

    var adapter = new Adapter({ defaults: defaults, filename: filename });

    state.set(this, {
      adapter: adapter,
      autoSave: autoSave,
      data: adapter.read(),
      key: 'default',
      memoryPool: []
    });

    return this;
  }

  _createClass(Store, [{
    key: 'findOne',
    value: function findOne(query) {
      var _state$get = state.get(this),
          data = _state$get.data,
          key = _state$get.key;

      var queryFields = Object.keys(query);

      return data[key].find(function (row) {
        var found = true;

        queryFields.some(function (field) {
          found = row[field] === query[field];
          return !found;
        });

        return found;
      });
    }
  }, {
    key: 'find',
    value: function find() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _state$get2 = state.get(this),
          data = _state$get2.data,
          key = _state$get2.key;

      var queryFields = Object.keys(query);
      var values = [];

      data[key].forEach(function (row) {
        var found = true;

        queryFields.some(function (field) {
          found = row[field] === query[field];
          return !found;
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

      var _state$get3 = state.get(this),
          autoSave = _state$get3.autoSave,
          key = _state$get3.key,
          memoryPool = _state$get3.memoryPool;

      if (autoSave) this.save(value);else memoryPool.push({ key: key, value: value });

      return value;
    }
  }, {
    key: 'save',
    value: function save(value) {
      var _state$get4 = state.get(this),
          adapter = _state$get4.adapter,
          data = _state$get4.data,
          key = _state$get4.key,
          _state$get4$memoryPoo = _state$get4.memoryPool,
          memoryPool = _state$get4$memoryPoo === undefined ? [] : _state$get4$memoryPoo;

      if (value) {
        data[key] = data[key] ? [].concat(_toConsumableArray(data[key]), [value]) : [value];
        adapter.write(data);
      } else if (memoryPool.length > 0) {
        memoryPool.forEach(function (item) {
          data[item.key] = data[item.key] ? [].concat(_toConsumableArray(data[item.key]), [item.value]) : [item.value];
        });
        adapter.write(data);
        state.set(this, Object.assign(state.get(this), { memoryPool: [] }));
      }
    }
  }, {
    key: 'update',
    value: function update(query, nextData) {
      var _state$get5 = state.get(this),
          adapter = _state$get5.adapter,
          data = _state$get5.data,
          key = _state$get5.key;

      var queryFields = Object.keys(query);
      var values = [];

      data[key] = data[key].map(function (row) {
        var found = true;
        var changes = void 0;

        queryFields.some(function (field) {
          found = row[field] === query[field];
          return !found;
        });

        if (found) {
          changes = Object.assign(row, nextData);
          values.push(changes);
        }

        return changes || row;
      });

      if (values.length > 0) adapter.write(data);

      return values;
    }
  }, {
    key: 'wipe',
    value: function wipe() {
      var _state$get6 = state.get(this),
          adapter = _state$get6.adapter;

      adapter.write();
    }
  }, {
    key: 'value',
    get: function get() {
      var _state$get7 = state.get(this),
          data = _state$get7.data,
          key = _state$get7.key;

      return data[key];
    }
  }]);

  return Store;
}();

exports.default = Store;