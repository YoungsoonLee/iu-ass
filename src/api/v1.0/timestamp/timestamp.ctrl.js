// 1. Time Stamp
exports.GetTimestamp = async (ctx) => {
    const uts = Math.round((new Date()).getTime() / 1000);
    ctx.body = {
        'Timestamp': uts
    };
}