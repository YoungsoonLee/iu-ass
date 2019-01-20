'use strict';

var _nodeSha = require('node-sha1');

var _nodeSha2 = _interopRequireDefault(_nodeSha);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// check Verifier
// use node-sha1 for verifying hash
exports.compareHash = function (TransactionId, UserId, CurrencyAmount, Verifier) {
    var hashedData = (0, _nodeSha2.default)(_config2.default.secret + TransactionId + UserId + CurrencyAmount);
    console.log(hashedData);

    if (hashedData !== Verifier) {
        return false;
    }

    return true;
};