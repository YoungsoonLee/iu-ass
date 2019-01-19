import Joi from 'joi'
import Leaderboard from '../../../models/leaderboard'
import response from '../../../libs/response'
// import libs from '../../../libs/common'

// 4. Leaderboard Score Posting
exports.ScorePost = async (ctx) => {
    const { body } = ctx.request;

    // Check input JSON schema with Joi
    // Inputs: TransactionId, UserId, CurrencyAmount, Verifier
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
        // nothing
    }

    // get ranks
    const ranking =  await Leaderboard.GetRank(LeaderboardId, UserId);
    console.log(ranking)

    // return Success
    response.successWithData2(ctx, ranking);
}