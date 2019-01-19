import mongoose from 'mongoose'

const Leaderboard = new mongoose.Schema({
    UserId: { type: Number, required: true},
    LeaderboardId: { type: Number, required: true},
    Score: { type: Number, required: true}
})

Leaderboard.index({ UserId: 1, LeaderboardId: 1 }, { unique: true })

// save or update
Leaderboard.statics.CreateOrUpdate = async function (UserId, LeaderboardId, Score) {
    return this.findOneAndUpdate({UserId, LeaderboardId, Score: {$lte: Score}}, {$set: {Score}}, {upsert: true});
};

// Get Rank of UserId
Leaderboard.statics.GetRank = async function(LeaderboardId, UserId) {
    const doc = await this.collection.findOne({LeaderboardId, UserId}); 
    const n = await this.find({Score : {$gt : doc.Score}}).count(); // This is the number of documents with a higher score
    const ranking = n+1; // ranking is next
    
    /*
    const resultData = {
        "UserId": doc.UserId,
        "LeaderboardId": doc.LeaderboardId,
        "Score": doc.Score,
        "Rank": ranking
    }

    return resultData
    */

    doc.Rank = ranking
    return doc
}

export default mongoose.model('Leaderboard', Leaderboard)