const md5 = require('md5');

const password = process.argv[2];

if (password) {
    console.log('Encrypted password: ' + md5(password));
} else {
    console.log('Usage: node generate-md5-passwd <password>');
}


