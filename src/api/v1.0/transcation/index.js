// routes transaction
import Router from 'koa-router';
import transactionCtrl from './transaction.ctrl';

const transaction = new Router();
transaction.post('/Transaction', transactionCtrl.postTransaction);

module.exports = transaction;