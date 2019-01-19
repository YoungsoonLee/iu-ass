// routes transaction
import Router from 'koa-router';
import leaderboardCtrl from './leaderboard.ctrl';

const leaderboard = new Router();
leaderboard.post('/ScorePost', leaderboardCtrl.ScorePost);

module.exports = leaderboard;