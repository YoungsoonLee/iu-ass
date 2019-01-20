'use strict';

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _v = require('./v1.0');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */
var api = new _koaRouter2.default();

// for versioning

api.use(_v2.default.routes());

module.exports = api;