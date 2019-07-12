'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.memoryAdapter = exports.storageAdapter = exports.jsonAdapter = undefined;

var _json = require('./json');

var _json2 = _interopRequireDefault(_json);

var _localStorage = require('./localStorage');

var _localStorage2 = _interopRequireDefault(_localStorage);

var _memory = require('./memory');

var _memory2 = _interopRequireDefault(_memory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.jsonAdapter = _json2.default;
exports.storageAdapter = _localStorage2.default;
exports.memoryAdapter = _memory2.default;
exports.default = _json2.default;