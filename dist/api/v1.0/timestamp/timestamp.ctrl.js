'use strict';

// 1. Time Stamp
exports.GetTimestamp = async function (ctx) {
    var uts = Math.round(new Date().getTime() / 1000);
    ctx.body = {
        'Timestamp': uts
    };
};