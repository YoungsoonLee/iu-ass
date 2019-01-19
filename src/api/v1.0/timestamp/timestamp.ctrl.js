// 1. Time Stamp
exports.getTimestamp = async (ctx) => {
    const uts = Math.round((new Date()).getTime() / 1000);
    ctx.body = {
        'Timestamp': uts
    };
}