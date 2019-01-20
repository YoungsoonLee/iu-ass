"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Leaderboard = new _mongoose2.default.Schema({
    UserId: { type: Number, required: true },
    LeaderboardId: { type: Number, required: true },
    Score: { type: Number, required: true }
});

// unique index UserId and LeaderboardId
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
Leaderboard.index({ UserId: 1, LeaderboardId: 1 }, { unique: true });
// index Score for ranking
Leaderboard.index({ Score: -1 });

// save or update
Leaderboard.statics.CreateOrUpdate = async function (UserId, LeaderboardId, Score) {
    return this.findOneAndUpdate({ UserId: UserId, LeaderboardId: LeaderboardId, Score: { $lte: Score } }, { $set: { Score: Score } }, { upsert: true });
};

// Get Rank of UserId 
Leaderboard.statics.GetData = async function (LeaderboardId, UserId) {

    var doc = await this.findOne({ LeaderboardId: LeaderboardId, UserId: UserId });
    var n = await this.find({ LeaderboardId: LeaderboardId, Score: { $gt: doc.Score } }).count(); // This is the number of documents with a higher score
    var ranking = n + 1; // ranking is nexts

    var resultData = {
        "UserId": doc.UserId,
        "LeaderboardId": doc.LeaderboardId,
        "Score": doc.Score,
        "Rank": ranking
    };

    return resultData;
};

// GetEnties
// eslint-disable-next-line no-unused-vars
Leaderboard.statics.GetEnties = async function (LeaderboardId, UserId, Offset, Limit) {

    // call Leaderboard.GetData
    var resultData = await this.GetData(LeaderboardId, UserId);

    // Get Entries with for each
    resultData.Entries = [];

    var doc = await this.find({ LeaderboardId: LeaderboardId }).sort({ Score: -1 }).skip(Offset).limit(Limit);

    for (var i = 0; i < doc.length; i++) {
        var n = await this.find({ LeaderboardId: LeaderboardId, Score: { $gt: doc[i].Score } }).count(); // This is the number of documents with a higher score
        var ranking = n + 1; // ranking is nexts

        var entryData = {
            "UserId": doc[i].UserId,
            "Score": doc[i].Score,
            "Rank": ranking
        };

        resultData.Entries.push(entryData);
    }

    return resultData;
};

exports.default = _mongoose2.default.model('Leaderboard', Leaderboard);