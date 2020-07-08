"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AsyncJsonAdapter", {
  enumerable: true,
  get: function get() {
    return _asyncJson["default"];
  }
});
Object.defineProperty(exports, "JsonAdapter", {
  enumerable: true,
  get: function get() {
    return _json["default"];
  }
});
Object.defineProperty(exports, "MemoryAdapter", {
  enumerable: true,
  get: function get() {
    return _memory["default"];
  }
});
Object.defineProperty(exports, "StorageAdapter", {
  enumerable: true,
  get: function get() {
    return _storage["default"];
  }
});

var _asyncJson = _interopRequireDefault(require("./asyncJson"));

var _json = _interopRequireDefault(require("./json"));

var _memory = _interopRequireDefault(require("./memory"));

var _storage = _interopRequireDefault(require("./storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }