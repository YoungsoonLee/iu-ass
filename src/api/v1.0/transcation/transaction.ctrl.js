import Joi from 'joi'
import Transaction from '../../../models/transaction'
import response from '../../../libs/response'
import libs from '../../../libs/common'

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
        const count = await Transaction.CountByTransactionId(TransactionId);
        if(count !== 0) {
            response.error(ctx,400, 'already exist TransactionId');
            return;
        }
    } catch (e) {
        response.error(ctx,500, e.message);
        return;
    }

    // check Verifier
    if(!libs.compareHash(TransactionId, UserId, CurrencyAmount, Verifier)) {
        response.error(ctx,400, 'invalid Verifier');
        return;
    }

    // Save
    try {
        await Transaction.CreateTransaction(TransactionId, UserId, CurrencyAmount);
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
       resultData = await Transaction.getTransactionData(UserId)
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