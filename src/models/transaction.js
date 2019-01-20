import mongoose from 'mongoose'

const Transaction = new mongoose.Schema({
    TransactionId: { type: Number, required: true, unique: true},
    UserId: { type: Number, required: true},
    CurrencyAmount: { type: Number, required: true}
})

// check TransactionId count
Transaction.statics.CountByTransactionId = function (TransactionId, cb) {
    return this.count({TransactionId}, cb);
};


Transaction.statics.CreateTransaction = function (TransactionId, UserId, CurrencyAmount, cb) {
    const transaction = new this();
    transaction.TransactionId = TransactionId;
    transaction.UserId = UserId;
    transaction.CurrencyAmount = CurrencyAmount;

    transaction.save(cb);
};

Transaction.statics.getTransactionData = async function (UserId)  {
    
    return this.aggregate([
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
    ], (err, resultData)=>{

        if (err) {
            return null;
        }
        return resultData;
    })
}

export default mongoose.model('Transaction', Transaction)