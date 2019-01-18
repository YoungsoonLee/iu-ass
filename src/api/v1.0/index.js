import Router from 'koa-router';

// import endpoints
import timestamp from './timestamp';
import transaction from './transcation';

const endpoints = new Router();

// add endpoints
endpoints.use(timestamp.routes());
endpoints.use(transaction.routes());

module.exports = endpoints;