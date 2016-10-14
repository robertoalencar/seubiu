var cryptoUtil = require('../../utils/crypto-util');

describe('crypto-util', function() {
    var text = 'test';
    var encrypted = 'e361d2f62b2bb7b89030f0f0b8aa746e';

    it('should encrypt', function() {
        expect(cryptoUtil.encrypt(text)).toEqual(encrypted);
    });

    it('should decrypt', function() {
        expect(cryptoUtil.decrypt(encrypted)).toEqual(text );
    });
});