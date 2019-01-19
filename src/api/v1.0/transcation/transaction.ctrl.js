import Joi from 'joi'
import sha1 from 'node-sha1'

import Transaction from '../../../models/transaction'
import config from '../../../config'
import response from '../../../libs/response'

// 2. Transaction Recording
exports.postTransaction = async (ctx) => {
    const { body } = ctx.request;

    // Check input JSON schema with Joi
    // Inputs: TransactionId, UserId, CurrencyAmount, Verifier
    const schema = Joi.object({
        TransactionId: Joi.number().required(),
        UserId: Joi.number().required(),
        CurrencyAmount: Joi.number().required(),
        Verifier: Joi.string().required()
      });
    const resultCheckSchema = Joi.validate(body, schema);
    
    // error schema of iput JSON
    if(resultCheckSchema.error) {
        response.error(ctx,400, resultCheckSchema.error.details[0].message);
        return;
    }

    const { TransactionId, UserId, CurrencyAmount, Verifier} = body;
    // check duplicate TransactionId
    try {
        // TODO: seperate
        const count = await Transaction.collection.count({TransactionId})
        if(count !== 0) {
            response.error(ctx,400, 'already exist TransactionId');
            return;
        }
    } catch (e) {
        response.error(ctx,500, e.message);
        return;
    }

    // check Verifier
    // use node-sha1 for verifying hash
    // TODO: seperate
    const hashedData = sha1(config.secret+TransactionId+UserId+CurrencyAmount);
    console.log(hashedData)
    if (hashedData !== Verifier) {
        response.error(ctx,400, 'invalid Verifier');
        return;
    }

    // Save
    try {
        // TODO: seperate
        await new Transaction({TransactionId, UserId, CurrencyAmount}).save();
    } catch (e) {
        response.error(ctx,500, e.message);
        return;
    }

    // return Success
    response.success(ctx);
}

// 3. Transaction Data Querying
exports.postTransactionStats = async (ctx) => {
    const { body } = ctx.request;

    // Check input JSON schema with Joi
    // Inputs: UserId
    const schema = Joi.object({
        UserId: Joi.number().required()
      });
    const resultCheckSchema = Joi.validate(body, schema);
    
    // error schema of iput JSON
    if(resultCheckSchema.error) {
        response.error(ctx,400, resultCheckSchema.error.details[0].message);
        return;
    }

    const { UserId } = body;
    
    // Transaction Data querying
    let resultData = null;
    try {
        // TODO: serperate
        resultData = await Transaction.aggregate([
            { $match: {
                UserId
            }},
            { 
                $group: { 
                    _id: "$UserId",
                    TransactionCount: { $sum: 1 },
                    CurrencySum: { $sum: "$CurrencyAmount" }
                }
            }
        ]);

    }catch (e) {
        response.error(ctx,500, e.message);
        return;
    }
    
    if (resultData.length === 0) {
        response.error(ctx,400, 'Not exists UserId');
        return;
    }

    // return Success
    response.successWithData(ctx, resultData);
}