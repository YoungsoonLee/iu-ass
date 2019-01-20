'use strict';

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _user = require('./user.ctrl');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// routes user
var user = new _koaRouter2.default();
user.post('/UserSave', _user2.default.UserSave);
user.post('/UserLoad', _user2.default.UserLoad);

module.exports = user;