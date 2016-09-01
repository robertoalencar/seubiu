var crypto = require('crypto');

var algorithm = 'aes256';
var key = '0kcjpd2H84nXQ7VI998zNhOIkH3o1h8Q';

module.exports = {

    encrypt: function(text) {
        var cipher = crypto.createCipher(algorithm, key);
        return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    },

    decrypt: function(encrypted) {
        var decipher = crypto.createDecipher(algorithm, key);
        return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8')
    }

};