'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// connect mongo db
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(_config2.default.database);

// Create Koa Application
var app = new _koa2.default();

app.use((0, _koaLogger2.default)()).use((0, _koaBodyparser2.default)());

// router
var router = new _koaRouter2.default();
router.use(_api2.default.routes());

app.use(router.routes());
app.use(router.allowedMethods()); // only allow get,put,post,delete,head

// Start the application
app.listen(_config2.default.port, function () {
  console.log('The server is running at http://localhost:' + _config2.default.port + '/');
});
exports.default = app;