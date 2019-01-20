'use strict';

var _leaderboard = require('../../../models/leaderboard');

var _leaderboard2 = _interopRequireDefault(_leaderboard);

var _transaction = require('../../../models/transaction');

var _transaction2 = _interopRequireDefault(_transaction);

var _user = require('../../../models/user');

var _user2 = _interopRequireDefault(_user);

var _response = require('../../../libs/response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 8. Data rest
/* eslint-disable no-unused-vars */
exports.ResetData = async function (ctx) {
    // just remove
    // do not check anything result after remove
    _leaderboard2.default.remove({}, function (err, result) {});
    _transaction2.default.remove({}, function (err, result) {});
    _user2.default.remove({}, function (err, result) {});

    _response2.default.success(ctx);
};