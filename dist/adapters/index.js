"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncJson = require("./asyncJson");

Object.keys(_asyncJson).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _asyncJson[key];
    }
  });
});

var _json = require("./json");

Object.keys(_json).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _json[key];
    }
  });
});

var _memory = require("./memory");

Object.keys(_memory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _memory[key];
    }
  });
});

var _storage = require("./storage");

Object.keys(_storage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _storage[key];
    }
  });
});