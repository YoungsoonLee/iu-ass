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
          ctx.body = {
            "UserId": resultData.UserId,
            "LeaderboardId": resultData.LeaderboardId,
            "Score": resultData.Score,
            "Rank": resultData.Rank
          }
          break;
        default:
          // code block
          ctx.body = {}
      }
    
}