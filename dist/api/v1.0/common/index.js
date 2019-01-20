'use strict';

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _common = require('./common.ctrl');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// routes common
var common = new _koaRouter2.default();
common.post('/ResetData', _common2.default.ResetData);

module.exports = common;