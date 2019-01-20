/* eslint-disable guard-for-in */
/* eslint-disable no-const-assign */
/* eslint-disable no-restricted-syntax */
import Joi from 'joi'
import User from '../../../models/user'
import response from '../../../libs/response'

// 6. User Save
exports.UserSave = async (ctx) => {
    const { body } = ctx.request;

    // Check input JSON schema with Joi
    // Inputs: UserId, Data
    const schema = Joi.object({
        UserId: Joi.number().required(),
        Data: Joi.object().required()
      });
    const resultCheckSchema = Joi.validate(body, schema);
    
    // error schema of iput JSON
    if(resultCheckSchema.error) {
        response.error(ctx,400, resultCheckSchema.error.details[0].message);
        return;
    }

    const {UserId, Data} = body;
    // Svae or Update User
    const err = await User.Save(UserId, Data)
    if(err) {
        response.error(ctx,400, err.message);
        return;
    }

    // return Success
    response.success(ctx);
}


// 7. User Load
exports.UserLoad = async (ctx) => {
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

    const {UserId} = body;
    // get user
    const user =  await User.Load(UserId);
    // console.log(user)

    // return Success
    response.successWithData(ctx, user);

}