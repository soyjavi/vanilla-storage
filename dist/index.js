"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _Store["default"];
  }
});
Object.defineProperty(exports, "AsyncStore", {
  enumerable: true,
  get: function get() {
    return _AsyncStore["default"];
  }
});
Object.defineProperty(exports, "AsyncJsonAdapter", {
  enumerable: true,
  get: function get() {
    return _adapters.AsyncJsonAdapter;
  }
});
Object.defineProperty(exports, "JsonAdapter", {
  enumerable: true,
  get: function get() {
    return _adapters.JsonAdapter;
  }
});
Object.defineProperty(exports, "MemoryAdapter", {
  enumerable: true,
  get: function get() {
    return _adapters.MemoryAdapter;
  }
});
Object.defineProperty(exports, "StorageAdapter", {
  enumerable: true,
  get: function get() {
    return _adapters.StorageAdapter;
  }
});

var _Store = _interopRequireDefault(require("./Store"));

var _AsyncStore = _interopRequireDefault(require("./AsyncStore"));

var _adapters = require("./adapters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }