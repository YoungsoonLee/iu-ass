import sha1 from 'node-sha1'

import config from '../config'

// check Verifier
// use node-sha1 for verifying hash
exports.compareHash = (TransactionId, UserId, CurrencyAmount, Verifier) => {
    const hashedData = sha1(config.secret+TransactionId+UserId+CurrencyAmount);
    console.log(hashedData)
    
    if (hashedData !== Verifier) {
        return false
    }

    return true
}

