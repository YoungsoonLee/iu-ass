'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _leaderboard = require('../../../models/leaderboard');

var _leaderboard2 = _interopRequireDefault(_leaderboard);

var _response = require('../../../libs/response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 4. Leaderboard Score Posting
exports.ScorePost = async function (ctx) {
    var body = ctx.request.body;

    // Check input JSON schema with Joi
    // Inputs: UserId, LeaderboardId, Score

    var schema = _joi2.default.object({
        UserId: _joi2.default.number().required(),
        LeaderboardId: _joi2.default.number().required(),
        Score: _joi2.default.number().required()
    });
    var resultCheckSchema = _joi2.default.validate(body, schema);

    // error schema of iput JSON
    if (resultCheckSchema.error) {
        _response2.default.error(ctx, 400, resultCheckSchema.error.details[0].message);
        return;
    }

    var UserId = body.UserId,
        LeaderboardId = body.LeaderboardId,
        Score = body.Score;
    // save or update

    try {
        await _leaderboard2.default.CreateOrUpdate(UserId, LeaderboardId, Score);
    } catch (e) {}
    // do nothing


    // get ranking
    var scorePost = await _leaderboard2.default.GetData(LeaderboardId, UserId);

    // return Success
    _response2.default.successWithData(ctx, scorePost);
};

// 5. Leaderboard Get
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
exports.LeaderboardGet = async function (ctx) {
    var body = ctx.request.body;

    // Check input JSON schema with Joi
    // Inputs: UserId, LeaderboardId, Offset, Limit

    var schema = _joi2.default.object({
        UserId: _joi2.default.number().required(),
        LeaderboardId: _joi2.default.number().required(),
        Offset: _joi2.default.number().required(),
        Limit: _joi2.default.number().required()
    });
    var resultCheckSchema = _joi2.default.validate(body, schema);

    // error schema of iput JSON
    if (resultCheckSchema.error) {
        _response2.default.error(ctx, 400, resultCheckSchema.error.details[0].message);
        return;
    }

    var UserId = body.UserId,
        LeaderboardId = body.LeaderboardId,
        Offset = body.Offset,
        Limit = body.Limit;

    var leaderGet = await _leaderboard2.default.GetEnties(LeaderboardId, UserId, Offset, Limit);

    _response2.default.successWithData(ctx, leaderGet);
};