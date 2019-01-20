'use strict';

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _timestamp = require('./timestamp');

var _timestamp2 = _interopRequireDefault(_timestamp);

var _transcation = require('./transcation');

var _transcation2 = _interopRequireDefault(_transcation);

var _leaderboard = require('./leaderboard');

var _leaderboard2 = _interopRequireDefault(_leaderboard);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var endpoints = new _koaRouter2.default();

// add endpoints


// import endpoints
endpoints.use(_timestamp2.default.routes());
endpoints.use(_transcation2.default.routes());
endpoints.use(_leaderboard2.default.routes());
endpoints.use(_user2.default.routes());
endpoints.use(_common2.default.routes());

module.exports = endpoints;