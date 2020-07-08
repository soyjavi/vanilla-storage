"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// eslint-disable-next-line no-undef
var state = new WeakMap();

var AsyncStore = /*#__PURE__*/function () {
  function AsyncStore() {
    var _this = this;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, AsyncStore);

    var _props$adapter = props.adapter,
        Adapter = _props$adapter === void 0 ? _adapters.AsyncJsonAdapter : _props$adapter,
        _props$autoSave = props.autoSave,
        autoSave = _props$autoSave === void 0 ? true : _props$autoSave,
        _props$defaults = props.defaults,
        defaults = _props$defaults === void 0 ? {} : _props$defaults,
        _props$filename = props.filename,
        filename = _props$filename === void 0 ? 'store' : _props$filename,
        secret = props.secret;
    return new Promise( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve) {
        var adapter;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return new Adapter({
                  defaults: defaults,
                  filename: filename
                });

              case 2:
                adapter = _context.sent;
                _context.t0 = state;
                _context.t1 = _this;
                _context.t2 = adapter;
                _context.t3 = autoSave;
                _context.next = 9;
                return adapter.read();

              case 9:
                _context.t4 = _context.sent;
                _context.t5 = filename;
                _context.t6 = [];
                _context.t7 = secret;
                _context.t8 = {
                  adapter: _context.t2,
                  autoSave: _context.t3,
                  data: _context.t4,
                  filename: _context.t5,
                  key: 'default',
                  memoryPool: _context.t6,
                  secret: _context.t7
                };

                _context.t0.set.call(_context.t0, _context.t1, _context.t8);

                resolve(_this);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  _createClass(AsyncStore, [{
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
    value: function () {
      var _push = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var value,
            _state$get,
            autoSave,
            key,
            memoryPool,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                value = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                _state$get = state.get(this), autoSave = _state$get.autoSave, key = _state$get.key, memoryPool = _state$get.memoryPool;

                if (!autoSave) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 5;
                return this.save(value);

              case 5:
                _context2.next = 8;
                break;

              case 7:
                memoryPool.push({
                  key: key,
                  value: value
                });

              case 8:
                return _context2.abrupt("return", value);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function push() {
        return _push.apply(this, arguments);
      }

      return push;
    }()
  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(value) {
        var _state$get2, adapter, data, key, _state$get2$memoryPoo, memoryPool, secret, isArray;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _state$get2 = state.get(this), adapter = _state$get2.adapter, data = _state$get2.data, key = _state$get2.key, _state$get2$memoryPoo = _state$get2.memoryPool, memoryPool = _state$get2$memoryPoo === void 0 ? [] : _state$get2$memoryPoo, secret = _state$get2.secret;
                isArray = data[key] === undefined || Array.isArray(data[key]);

                if (!value) {
                  _context3.next = 8;
                  break;
                }

                if (isArray) data[key] = data[key] ? [].concat(_toConsumableArray(data[key]), [(0, _modules.encrypt)(value, secret)]) : [(0, _modules.encrypt)(value, secret)];else {
                  if (secret && Object.keys(data[key]).length !== 0) data[key] = (0, _modules.decrypt)(data[key], secret);
                  data[key] = (0, _modules.encrypt)(_objectSpread(_objectSpread({}, data[key]), value), secret);
                }
                _context3.next = 6;
                return adapter.write(data);

              case 6:
                _context3.next = 13;
                break;

              case 8:
                if (!(memoryPool.length > 0)) {
                  _context3.next = 13;
                  break;
                }

                memoryPool.forEach(function (item) {
                  data[item.key] = data[item.key] ? [].concat(_toConsumableArray(data[item.key]), [(0, _modules.encrypt)(item.value, secret)]) : [(0, _modules.encrypt)(item.value, secret)];
                });
                _context3.next = 12;
                return adapter.write(data);

              case 12:
                state.set(this, Object.assign(state.get(this), {
                  memoryPool: []
                }));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function save(_x2) {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(query, nextData) {
        var _state$get3, adapter, data, key, secret, queryFields, values;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _state$get3 = state.get(this), adapter = _state$get3.adapter, data = _state$get3.data, key = _state$get3.key, secret = _state$get3.secret;
                queryFields = Object.keys(query);
                values = [];
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

                if (!(values.length > 0)) {
                  _context4.next = 7;
                  break;
                }

                _context4.next = 7;
                return adapter.write(data);

              case 7:
                return _context4.abrupt("return", values);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function update(_x3, _x4) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(query) {
        var _state$get4, adapter, data, key, secret, queryFields, values;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _state$get4 = state.get(this), adapter = _state$get4.adapter, data = _state$get4.data, key = _state$get4.key, secret = _state$get4.secret;
                queryFields = Object.keys(query);
                values = [];
                data[key] = this.value.filter(function (row) {
                  var found = !queryFields.some(function (field) {
                    return !(row[field] === query[field]);
                  });
                  if (found) values.push(row);
                  return !found;
                }).map(function (row) {
                  return (0, _modules.encrypt)(row, secret);
                });

                if (!(values.length > 0)) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 7;
                return adapter.write(data);

              case 7:
                return _context5.abrupt("return", values);

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function remove(_x5) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
  }, {
    key: "wipe",
    value: function () {
      var _wipe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _state$get5, adapter;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _state$get5 = state.get(this), adapter = _state$get5.adapter;
                _context6.next = 3;
                return adapter.write();

              case 3:
                state.set(this, Object.assign(state.get(this), {
                  data: {},
                  memoryPool: []
                }));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function wipe() {
        return _wipe.apply(this, arguments);
      }

      return wipe;
    }()
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

  return AsyncStore;
}();

exports["default"] = AsyncStore;