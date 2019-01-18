import Joi from 'joi'
import sha1 from 'node-sha1'

import Transaction from '../../../models/transaction'
import config from '../../../config'

exports.postTransaction = async (ctx) => {
    const { body } = ctx.request;

    // TODO: make a module !!!
    // Check input JSON schema with Joi
    //  TransactionId
    //  UserId
    //  CurrencyAmount
    //  Verifier
    const schema = Joi.object({
        TransactionId: Joi.number().required(),
        UserId: Joi.number().required(),
        CurrencyAmount: Joi.number().required(),
        Verifier: Joi.string().required()
      });
    const resultCheckSchema = Joi.validate(body, schema);
    
    // error schema of iput JSON
    if(resultCheckSchema.error) {
        ctx.status = 400;
        ctx.body = {
            Error: true,
            ErrorMessage: resultCheckSchema.error.details[0].message
        }
        return;
    }

    const { TransactionId, UserId, CurrencyAmount, Verifier} = body;
    // const { TransactionId, } = body;

    // check duplicate TransactionId
    try {
        const count = await Transaction.collection.count({TransactionId})
        // TODO:  make a module
        if(count !== 0) {
            ctx.status = 409; // Conflict
            ctx.body = {
                message: 'already exist TransactionId'
            }
            return;
        }
    } catch (e) {
        // TODO:  make a module
        ctx.status = 500; // Internal server error
        ctx.body = {
            message: e.message
        }
        return;
    }

    // check Verifier
    // use node-sha1 for verifying hash
    const hashedData = sha1(config.secret+TransactionId+UserId+CurrencyAmount);
    if (hashedData !== Verifier) {
        ctx.status = 400; 
        ctx.body = {
            message: 'invalid Verifier'
        }
        return;
    }

    // Save
    try {
        await new Transaction(body).save();
    } catch (e) {
        // TODO:  make a module
        ctx.status = 500; // Internal server error
        ctx.body = {
            message: e.message
        }
        return;
    }

    // return Success
    ctx.body = {
        'Success': true
    };
}