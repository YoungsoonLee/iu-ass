import Router from 'koa-router';

// import endpoints
import timestamp from './timestamp';
import transaction from './transcation';
import leaderboard from './leaderboard';

const endpoints = new Router();

// add endpoints
endpoints.use(timestamp.routes());
endpoints.use(transaction.routes());
endpoints.use(leaderboard.routes());

module.exports = endpoints;