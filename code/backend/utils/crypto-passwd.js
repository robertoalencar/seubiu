var cryptoUtil = require('./crypto-util');

var password = process.argv[2];

if (password) {
    console.log('Encrypted password: ' + cryptoUtil.encrypt(password));
} else {
    console.log('Usage: node crypto-passwd <password>');
}


