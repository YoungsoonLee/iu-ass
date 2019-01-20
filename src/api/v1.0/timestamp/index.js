// routes timestamp
import Router from 'koa-router';
import timestampCtrl from './timestamp.ctrl';

const timestamp = new Router();
timestamp.get('/Timestamp', timestampCtrl.GetTimestamp);

module.exports = timestamp;