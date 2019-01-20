// routes common
import Router from 'koa-router';
import commonCtrl from './common.ctrl';

const common = new Router();
common.post('/ResetData', commonCtrl.ResetData);

module.exports = common;