import Router from 'koa-router';

// for versioning
import v1 from './v1.0';

const api = new Router();
api.use(v1.routes());

module.exports = api;
