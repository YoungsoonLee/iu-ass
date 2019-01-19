// routes user
import Router from 'koa-router';
import userCtrl from './user.ctrl';

const user = new Router();
user.post('/UserSave', userCtrl.UserSave);

module.exports = user;