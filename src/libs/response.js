// for response error
exports.error = (ctx, code, message) => {
    ctx.status = code;
    ctx.body = {
        Error: true,
        ErrorMessage: message
    }
}

// for response success without any data
exports.success = (ctx) => {
    ctx.status = 200;
    ctx.body = {
        'Success': true
    }
}

// for response success with data
exports.successWithData = (ctx, resultData) => {
    
    ctx.status = 200;

    switch(ctx.request.url) {
        case '/TransactionStats':
          // code block
          ctx.body = {
            "UserId": resultData[0]._id, /* eslint no-underscore-dangle: 0 */
            "TransactionCount": resultData[0].TransactionCount,
            "CurrencySum": resultData[0].CurrencySum
          }
          break;
        case '/ScorePost':
          // code block
          ctx.body = resultData
          break;
        case '/UserLoad':
          // code block
          ctx.body = resultData
          break;
        default:
          // code block
          ctx.body = {}
      }
    
}