"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Storage = require("./Storage");

Object.keys(_Storage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Storage[key];
    }
  });
});

var _AsyncStorage = require("./AsyncStorage");

Object.keys(_AsyncStorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AsyncStorage[key];
    }
  });
});

var _adapters = require("./adapters");

Object.keys(_adapters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _adapters[key];
    }
  });
});