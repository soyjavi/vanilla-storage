"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "jsonAdapter", {
  enumerable: true,
  get: function get() {
    return _json["default"];
  }
});
Object.defineProperty(exports, "memoryAdapter", {
  enumerable: true,
  get: function get() {
    return _memory["default"];
  }
});
Object.defineProperty(exports, "storageAdapter", {
  enumerable: true,
  get: function get() {
    return _storage["default"];
  }
});
exports["default"] = void 0;

var _json = _interopRequireDefault(require("./json"));

var _memory = _interopRequireDefault(require("./memory"));

var _storage = _interopRequireDefault(require("./storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _json["default"];
exports["default"] = _default;