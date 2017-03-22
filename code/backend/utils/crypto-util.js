const crypto = require('crypto');

const algorithm = 'aes256';
const key = '0kcjpd2H84nXQ7VI998zNhOIkH3o1h8Q';

module.exports = {

    encrypt: (text) => {
        const cipher = crypto.createCipher(algorithm, key);
        return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    },

    decrypt: (encrypted) => {
        const decipher = crypto.createDecipher(algorithm, key);
        return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
    }

};