"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cryptoJs = require("crypto-js");

var _default = function _default() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var secret = arguments.length > 1 ? arguments[1] : undefined;
  if (!secret) return value;
  return _cryptoJs.AES.encrypt(JSON.stringify(value), secret).toString();
};

exports["default"] = _default;