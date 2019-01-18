import mongoose from 'mongoose'
/*
import bcrypt from 'bcrypt'
import config from '../../config'
import jwt from 'jsonwebtoken'
*/


const Transaction = new mongoose.Schema({
    TransactionId: { type: Number, required: true, unique: true},
    UserId: { type: Number, required: true},
    CurrencyAmount: { type: Number, required: true},
    Verifier: { type: Number, required: true}
})

/*
Transaction.statics.findByTransactionId = (TransactionId) => {
    return this.findOne({TransactionId});
};
*/
export default mongoose.model('Transaction', Transaction)