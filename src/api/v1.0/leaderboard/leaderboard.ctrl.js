/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import Joi from 'joi'
import Leaderboard from '../../../models/leaderboard'
import response from '../../../libs/response'

// 4. Leaderboard Score Posting
exports.ScorePost = async (ctx) => {
    const { body } = ctx.request;

    // Check input JSON schema with Joi
    // Inputs: UserId, LeaderboardId, Score
    const schema = Joi.object({
        UserId: Joi.number().required(),
        LeaderboardId: Joi.number().required(),
        Score: Joi.number().required()
      });
    const resultCheckSchema = Joi.validate(body, schema);
    
    // error schema of iput JSON
    if(resultCheckSchema.error) {
        response.error(ctx,400, resultCheckSchema.error.details[0].message);
        return;
    }

    const { UserId, LeaderboardId, Score} = body;
    // save or update
    try{
       await Leaderboard.CreateOrUpdate(UserId, LeaderboardId, Score);
    }catch (e) {
        // do nothing
    }

    // get ranking
    const scorePost =  await Leaderboard.GetData(LeaderboardId, UserId);

    // return Success
    response.successWithData(ctx, scorePost);
}


// 5. Leaderboard Get
exports.LeaderboardGet = async (ctx) => {
    const { body } = ctx.request;
    
    // Check input JSON schema with Joi
    // Inputs: UserId, LeaderboardId, Offset, Limit
    const schema = Joi.object({
        UserId: Joi.number().required(),
        LeaderboardId: Joi.number().required(),
        Offset: Joi.number().required(),
        Limit: Joi.number().required()
      });
    const resultCheckSchema = Joi.validate(body, schema);
    
    // error schema of iput JSON
    if(resultCheckSchema.error) {
        response.error(ctx,400, resultCheckSchema.error.details[0].message);
        return;
    }

    const { UserId, LeaderboardId, Offset, Limit} = body;
    const leaderGet =  await Leaderboard.GetEnties(LeaderboardId, UserId, Offset, Limit);

    response.successWithData(ctx, leaderGet)
}