var _ = require('lodash');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var transaction = require('../utils/orm-db-transaction');

var getAll = function() {
    return transaction.doReadOnly(function(db) {
        var countryFind = Promise.promisify(db.models.Country.find);
        return await (countryFind({}, [ 'description', 'A' ]));
    });
};

module.exports = {
    getAll: getAll
};