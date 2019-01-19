// routes leaderboard
import Router from 'koa-router';
import leaderboardCtrl from './leaderboard.ctrl';

const leaderboard = new Router();
leaderboard.post('/ScorePost', leaderboardCtrl.ScorePost);
leaderboard.post('/LeaderboardGet', leaderboardCtrl.LeaderboardGet);

module.exports = leaderboard;