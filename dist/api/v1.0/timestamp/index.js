'use strict';

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _timestamp = require('./timestamp.ctrl');

var _timestamp2 = _interopRequireDefault(_timestamp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// routes timestamp
var timestamp = new _koaRouter2.default();
timestamp.get('/Timestamp', _timestamp2.default.GetTimestamp);

module.exports = timestamp;