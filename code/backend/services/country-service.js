const Promise = require('bluebird');
const doReadOnly = require('../utils/orm-db-transaction').doReadOnly;

const getAll = () => {
    return doReadOnly((db) => {
        var countryFind = Promise.promisify(db.models.Country.find);
        return countryFind({}, [ 'description', 'A' ]);
    });
};

module.exports = {
    getAll: getAll
};