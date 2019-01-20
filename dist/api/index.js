"use strict";

var _koaRouter = require("koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _v = require("./v1.0");

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-core/register"); /* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */

require("babel-polyfill");

// for versioning


var api = new _koaRouter2.default();
api.use(_v2.default.routes());

module.exports = api;