/* eslint-disable no-unused-vars */
import Leaderboard from '../../../models/leaderboard'
import Transaction from '../../../models/transaction'
import User from '../../../models/user'
import response from '../../../libs/response'

// 8. Data rest
exports.ResetData = async (ctx) => {
    // just remove
    // do not check anything result after remove
    Leaderboard.remove({}, (err, result)=>{});
    Transaction.remove({}, (err, result)=>{});
    User.remove({}, (err, result)=>{});

    response.success(ctx)

}