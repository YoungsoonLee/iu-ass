'use strict';

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _transaction = require('./transaction.ctrl');

var _transaction2 = _interopRequireDefault(_transaction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// routes transaction
var transaction = new _koaRouter2.default();
transaction.post('/Transaction', _transaction2.default.postTransaction);
transaction.post('/TransactionStats', _transaction2.default.postTransactionStats);

module.exports = transaction;