var Promise = require('bluebird');
var doReadOnly = require('../utils/orm-db-transaction').doReadOnly;

var getAll = function() {
    return doReadOnly(function(db) {
        var countryFind = Promise.promisify(db.models.Country.find);
        return countryFind({}, [ 'description', 'A' ]);
    });
};

module.exports = {
    getAll: getAll
};