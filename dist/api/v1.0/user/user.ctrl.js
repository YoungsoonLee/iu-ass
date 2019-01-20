'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _user = require('../../../models/user');

var _user2 = _interopRequireDefault(_user);

var _response = require('../../../libs/response');

var _response2 = _interopRequireDefault(_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 6. User Save
exports.UserSave = async function (ctx) {
    var body = ctx.request.body;

    // Check input JSON schema with Joi
    // Inputs: UserId, Data

    var schema = _joi2.default.object({
        UserId: _joi2.default.number().required(),
        Data: _joi2.default.object().required()
    });
    var resultCheckSchema = _joi2.default.validate(body, schema);

    // error schema of iput JSON
    if (resultCheckSchema.error) {
        _response2.default.error(ctx, 400, resultCheckSchema.error.details[0].message);
        return;
    }

    var UserId = body.UserId,
        Data = body.Data;
    // Svae or Update User

    var err = await _user2.default.Save(UserId, Data);
    if (err) {
        _response2.default.error(ctx, 400, err.message);
        return;
    }

    // return Success
    _response2.default.success(ctx);
};

// 7. User Load
/* eslint-disable guard-for-in */
/* eslint-disable no-const-assign */
/* eslint-disable no-restricted-syntax */
exports.UserLoad = async function (ctx) {
    var body = ctx.request.body;

    // Check input JSON schema with Joi
    // Inputs: UserId

    var schema = _joi2.default.object({
        UserId: _joi2.default.number().required()
    });
    var resultCheckSchema = _joi2.default.validate(body, schema);

    // error schema of iput JSON
    if (resultCheckSchema.error) {
        _response2.default.error(ctx, 400, resultCheckSchema.error.details[0].message);
        return;
    }

    var UserId = body.UserId;
    // get user

    var user = await _user2.default.Load(UserId);
    // console.log(user)

    // return Success
    _response2.default.successWithData(ctx, user);
};