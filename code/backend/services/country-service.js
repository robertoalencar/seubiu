const Promise = require('bluebird');
const doReadOnly = require('../utils/orm-db-transaction').doReadOnly;

const getAll = () => {
    return doReadOnly((db) => {
        const countryFind = Promise.promisify(db.models.Country.find);
        return countryFind({}, [ 'description', 'A' ]);
    });
};

module.exports = {
    getAll: getAll
};