/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */

import Router from 'koa-router';

require("babel-core/register");
require("babel-polyfill");

// for versioning
import v1 from './v1.0';

const api = new Router();
api.use(v1.routes());

module.exports = api;
