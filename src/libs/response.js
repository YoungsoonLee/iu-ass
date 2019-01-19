exports.error = (ctx, code, message) => {
    ctx.status = code;
    ctx.body = {
        Error: true,
        ErrorMessage: message
    }
}

exports.success = (ctx) => {
    ctx.status = 200;
    ctx.body = {
        'Success': true
    }
}

exports.successWithData = (ctx, resultData) => {
    ctx.status = 200;
    ctx.body = {
        "UserId": resultData[0]._id, /* eslint no-underscore-dangle: 0 */
        "TransactionCount": resultData[0].TransactionCount,
        "CurrencySum": resultData[0].CurrencySum
    }
}