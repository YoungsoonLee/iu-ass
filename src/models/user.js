/* eslint-disable no-const-assign */
/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
import mongoose from 'mongoose'

const User = new mongoose.Schema({
    UserId: { type: Number, required: true},
    Data: { type: Object, required: true}
})


User.statics.Save = async function(UserId, Data) {
    const newData = {}
    for (const prop in Data) {
        newData[prop] = Data[prop]
    }

    const finalUpdateData = {};
    this.findOne({UserId}, (errfind, result) => {
        if (errfind) {
            return errfind
        }
        if(result){
            for (const prop in result.Data) {
                if(newData[prop]) {
                finalUpdateData[prop] = newData[prop]
                }else{
                    finalUpdateData[prop] = result.Data[prop]
                }
            }

            // eslint-disable-next-line no-unused-vars
            this.findOneAndUpdate({UserId}, {$set:{Data: finalUpdateData}}, {upsert:false}, (errUpdate) => {
                if (errUpdate) {
                    return errUpdate
                }
            });

        }else{
            const user = new this();
            user.UserId = UserId
            user.Data = Data
            user.save();
        }
    });
}


// Get Rank of UserId 
User.statics.Load = async function(UserId) {
    
    const doc = await this.collection.findOne({UserId}); 
    // let resultData = {}
    if (doc) {
        return doc.Data
    // eslint-disable-next-line no-else-return
    }else{
        return {}
    }

    // return resultData
}

export default mongoose.model('User', User)