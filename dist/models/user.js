'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = new _mongoose2.default.Schema({
    UserId: { type: Number, required: true },
    Data: { type: Object, required: true }
}); /* eslint-disable no-const-assign */
/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */


User.statics.Save = async function (UserId, Data) {
    var _this = this;

    var newData = {};
    for (var prop in Data) {
        newData[prop] = Data[prop];
    }

    var finalUpdateData = {};
    this.findOne({ UserId: UserId }, function (errfind, result) {
        if (errfind) {
            return errfind;
        }
        if (result) {
            for (var _prop in result.Data) {
                if (newData[_prop]) {
                    finalUpdateData[_prop] = newData[_prop];
                } else {
                    finalUpdateData[_prop] = result.Data[_prop];
                }
            }

            // eslint-disable-next-line no-unused-vars
            _this.findOneAndUpdate({ UserId: UserId }, { $set: { Data: finalUpdateData } }, { upsert: false }, function (errUpdate) {
                if (errUpdate) {
                    return errUpdate;
                }
            });
        } else {
            var user = new _this();
            user.UserId = UserId;
            user.Data = Data;
            user.save();
        }
    });
};

// Get Rank of UserId 
User.statics.Load = async function (UserId) {

    var doc = await this.findOne({ UserId: UserId });
    // let resultData = {}
    if (doc) {
        return doc.Data;
        // eslint-disable-next-line no-else-return
    } else {
        return {};
    }

    // return resultData
};

exports.default = _mongoose2.default.model('User', User);