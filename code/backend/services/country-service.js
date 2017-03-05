var Promise = require('bluebird');
var doReadOnly = require('../utils/orm-db-transaction').doReadOnly;

var getAll = () => {
    return doReadOnly((db) => {
        var countryFind = Promise.promisify(db.models.Country.find);
        return countryFind({}, [ 'description', 'A' ]);
    });
};

module.exports = {
    getAll: getAll
};