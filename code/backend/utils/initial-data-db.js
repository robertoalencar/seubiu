const await = require('asyncawait/await');
const Promise = require('bluebird');

module.exports = (db) => {

    const countryCreate = Promise.promisify(db.models.Country.create);
    const country = await (countryCreate({
        'description': 'Brasil'
    }));

    const stateCreate = Promise.promisify(db.models.State.create);
    const state = await (stateCreate({
        'description': 'Pernambuco',
        'shortCode': 'PE',
        'country_id': country.id
    }));

    const cityCreate = Promise.promisify(db.models.City.create);
    const city1 = await (cityCreate({
        'description': 'Recife',
        'state_id': state.id
    }));

    const city2 = await (cityCreate({
        'description': 'Olinda',
        'state_id': state.id
    }));

    const deviceTypeCreate = Promise.promisify(db.models.DeviceType.create);
    const deviceType = await (deviceTypeCreate({
        'description': 'Android'
    }));

    const professionCreate = Promise.promisify(db.models.Profession.create);
    const profession1 = await (professionCreate({
        'description': 'Eletricista',
        'active': true
    }));

    const profession2 = await (professionCreate({
        'description': 'Encanador',
        'active': true
    }));

    const serviceCreate = Promise.promisify(db.models.Service.create);
    const service1 = await (serviceCreate({
        'description': 'Aterramento',
        'active': true,
        'profession_id': profession1.id
    }));

    const service2 = await (serviceCreate({
        'description': 'Instalação de chuveiro elétrico',
        'active': true,
        'profession_id': profession1.id
    }));

    const service3 = await (serviceCreate({
        'description': 'Desentupimento',
        'active': true,
        'profession_id': profession2.id
    }));

    const userStatusCreate = Promise.promisify(db.models.UserStatus.create);
    const userStatus1 = await (userStatusCreate({
        'description': 'New'
    }));

    const userStatus2 = await (userStatusCreate({
        'description': 'Active'
    }));

    const userStatus3 = await (userStatusCreate({
        'description': 'Blocked'
    }));

    const requestStatusCreate = Promise.promisify(db.models.RequestStatus.create);
    const requestStatus1 = await (requestStatusCreate({
        'description': 'New'
    }));

    const requestStatus2 = await (requestStatusCreate({
        'description': 'Waiting'
    }));

    const requestStatus3 = await (requestStatusCreate({
        'description': 'Active'
    }));

    const requestStatus4 = await (requestStatusCreate({
        'description': 'Finished'
    }));

    const requestStatus5 = await (requestStatusCreate({
        'description': 'Closed'
    }));
};