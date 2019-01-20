'use strict';

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _leaderboard = require('./leaderboard.ctrl');

var _leaderboard2 = _interopRequireDefault(_leaderboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// routes leaderboard
var leaderboard = new _koaRouter2.default();
leaderboard.post('/ScorePost', _leaderboard2.default.ScorePost);
leaderboard.post('/LeaderboardGet', _leaderboard2.default.LeaderboardGet);

module.exports = leaderboard;