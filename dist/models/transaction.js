"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Transaction = new _mongoose2.default.Schema({
    TransactionId: { type: Number, required: true, unique: true },
    UserId: { type: Number, required: true },
    CurrencyAmount: { type: Number, required: true }
});

// check TransactionId count
Transaction.statics.CountByTransactionId = function (TransactionId, cb) {
    return this.count({ TransactionId: TransactionId }, cb);
};

Transaction.statics.CreateTransaction = function (TransactionId, UserId, CurrencyAmount, cb) {
    var transaction = new this();
    transaction.TransactionId = TransactionId;
    transaction.UserId = UserId;
    transaction.CurrencyAmount = CurrencyAmount;

    transaction.save(cb);
};

Transaction.statics.getTransactionData = async function (UserId) {

    return this.aggregate([{ $match: {
            UserId: UserId
        } }, {
        $group: {
            _id: "$UserId",
            TransactionCount: { $sum: 1 },
            CurrencySum: { $sum: "$CurrencyAmount" }
        }
    }], function (err, resultData) {

        if (err) {
            return null;
        }
        return resultData;
    });
};

exports.default = _mongoose2.default.model('Transaction', Transaction);