'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _transaction = require('../../../models/transaction');

var _transaction2 = _interopRequireDefault(_transaction);

var _response = require('../../../libs/response');

var _response2 = _interopRequireDefault(_response);

var _common = require('../../../libs/common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 2. Transaction Recording
exports.postTransaction = async function (ctx) {
    var body = ctx.request.body;

    // Check input JSON schema with Joi
    // Inputs: TransactionId, UserId, CurrencyAmount, Verifier

    var schema = _joi2.default.object({
        TransactionId: _joi2.default.number().required(),
        UserId: _joi2.default.number().required(),
        CurrencyAmount: _joi2.default.number().required(),
        Verifier: _joi2.default.string().required()
    });
    var resultCheckSchema = _joi2.default.validate(body, schema);

    // error schema of iput JSON
    if (resultCheckSchema.error) {
        _response2.default.error(ctx, 400, resultCheckSchema.error.details[0].message);
        return;
    }

    var TransactionId = body.TransactionId,
        UserId = body.UserId,
        CurrencyAmount = body.CurrencyAmount,
        Verifier = body.Verifier;
    // check duplicate TransactionId

    try {
        var count = await _transaction2.default.CountByTransactionId(TransactionId);
        if (count !== 0) {
            _response2.default.error(ctx, 400, 'already exist TransactionId');
            return;
        }
    } catch (e) {
        _response2.default.error(ctx, 500, e.message);
        return;
    }

    // check Verifier
    if (!_common2.default.compareHash(TransactionId, UserId, CurrencyAmount, Verifier)) {
        _response2.default.error(ctx, 400, 'invalid Verifier');
        return;
    }

    // Save
    try {
        await _transaction2.default.CreateTransaction(TransactionId, UserId, CurrencyAmount);
    } catch (e) {
        _response2.default.error(ctx, 500, e.message);
        return;
    }

    // return Success
    _response2.default.success(ctx);
};

// 3. Transaction Data Querying
exports.postTransactionStats = async function (ctx) {
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
    // Transaction Data querying

    var resultData = null;
    try {
        resultData = await _transaction2.default.getTransactionData(UserId);
    } catch (e) {
        _response2.default.error(ctx, 500, e.message);
        return;
    }

    // Not exists UserId
    if (resultData.length === 0) {
        _response2.default.error(ctx, 400, 'Not exists UserId');
        return;
    }

    // return Success
    _response2.default.successWithData(ctx, resultData);
};