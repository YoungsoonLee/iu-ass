import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import logger from 'koa-logger';
import mongoose from 'mongoose';

import api from './api';
import config from './config'

// connect mongo db
mongoose.Promise = global.Promise
mongoose.connect(config.database)

// Create Koa Application
const app = new Koa();

app
  .use(logger())
  .use(bodyParser())

// router
const router = new Router();
router.use(api.routes());

app.use(router.routes());
app.use(router.allowedMethods()); // only allow get,put,post,delete,head

// Start the application
app.listen(config.port, () => {
    console.log(`The server is running at http://localhost:${config.port}/`)
  }
);
export default app;
